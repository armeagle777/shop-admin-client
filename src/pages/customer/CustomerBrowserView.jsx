import { format } from 'date-fns';
import { Card, Skeleton, Space, Timeline, Typography } from 'antd';
import {
  GiftOutlined,
  SkinOutlined,
  SmileOutlined,
  FieldTimeOutlined,
} from '@ant-design/icons';

import { EditCustomerForm } from '../../components';

const CustomerBrowserView = ({
  error,
  Avatar,
  isError,
  contacts,
  addresses,
  last_name,
  createdAt,
  isLoading,
  first_name,
  isFetching,
  customerId,
  ordersSums,
  ordersCount,
  phone_number,
  timeLineItems,
}) => {
  const { Text, Link } = Typography;
  return (
    <>
      <div style={{ width: '100%', display: 'flex' }}>
        <div style={{ width: '70%' }}>
          {isLoading || isFetching ? (
            <Space
              direction="vertical"
              style={{
                width: '80%',
                paddingLeft: 130,
              }}
            >
              <Space>
                <Skeleton.Image active />
                <Skeleton.Node active />
              </Space>
              <Skeleton.Input active size="large" block />
              <Skeleton.Input active size="large" block />
              <Skeleton.Input active size="large" block />
              <Skeleton.Input active size="large" block />
              <Skeleton.Input active size="large" block />
              <Skeleton.Input active size="large" block />
              <Skeleton.Input active size="large" block />
              <Skeleton paragraph={{ rows: 2 }} />
              <Space style={{ paddingLeft: 100 }}>
                <Skeleton.Button active size="large" shape="square" block />
                <Skeleton.Button active size="large" shape="square" block />
              </Space>
            </Space>
          ) : (
            <EditCustomerForm
              customerId={customerId}
              isLoading={isLoading}
              isFetching={isFetching}
              isError={isError}
              error={error}
              first_name={first_name}
              last_name={last_name}
              phone_number={phone_number}
              Avatar={Avatar}
              addresses={addresses}
              contacts={contacts}
            />
          )}
        </div>

        <div
          style={{
            width: '30%',
            padding: '0 20px',
          }}
        >
          <Card
            loading={isLoading || isFetching}
            title="Պատմություն"
            style={{
              width: '100%',
              marginBottom: '20px',
            }}
          >
            <div
              style={{
                width: '100%',
                display: 'flex',
              }}
            >
              <div
                style={{
                  width: '50%',
                  display: 'flex',
                  flexDirection: 'column',
                }}
              >
                <div
                  style={{
                    display: 'flex',
                    flexDirection: 'column',
                  }}
                >
                  <Text style={{ fontSize: 16 }}>
                    <FieldTimeOutlined style={{ marginRight: 8 }} />
                    Գրանցվել է
                  </Text>
                  <Text type="secondary" style={{ fontSize: 16 }}>
                    {createdAt && format(new Date(createdAt), 'dd-MM-yyy')}
                  </Text>
                </div>
                <div
                  style={{
                    display: 'flex',
                    flexDirection: 'column',
                  }}
                >
                  <Text style={{ fontSize: 16 }}>
                    <SkinOutlined style={{ marginRight: 8 }} />
                    Քանակը
                  </Text>
                  <Text type="secondary" style={{ fontSize: 16 }}>
                    {ordersCount} - Պատվեր
                  </Text>
                </div>
              </div>
              <div
                style={{
                  width: '50%',
                  display: 'flex',
                  flexDirection: 'column',
                }}
              >
                <div
                  style={{
                    display: 'flex',
                    flexDirection: 'column',
                  }}
                >
                  <Text style={{ fontSize: 16 }}>
                    <GiftOutlined style={{ marginRight: 8 }} />
                    Գումարը
                  </Text>
                  <Text type="secondary" style={{ fontSize: 16 }}>
                    {ordersSums.net_cost.toLocaleString()}դ. Պատվեր
                  </Text>
                </div>
                <div
                  style={{
                    display: 'flex',
                    flexDirection: 'column',
                  }}
                >
                  <Text style={{ fontSize: 16 }}>
                    <SmileOutlined style={{ marginRight: 8 }} />
                    Եկամուտ
                  </Text>
                  <Text type="secondary" style={{ fontSize: 16 }}>
                    {ordersSums.profit.toLocaleString()}դ. Եկամուտ
                  </Text>
                </div>
              </div>
            </div>
          </Card>
          {isLoading || isFetching ? (
            <Skeleton
              paragraph={{
                rows: 6,
              }}
            />
          ) : (
            <Timeline items={timeLineItems} />
          )}
        </div>
      </div>
    </>
  );
};

export default CustomerBrowserView;
