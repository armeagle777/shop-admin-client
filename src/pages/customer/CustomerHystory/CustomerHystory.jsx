import { format } from 'date-fns';
import { Card, Typography } from 'antd';
import {
  GiftOutlined,
  SkinOutlined,
  SmileOutlined,
  FieldTimeOutlined,
} from '@ant-design/icons';

const CustomerHystory = ({ createdAt, ordersSums, isLoading, ordersCount }) => {
  const { Text } = Typography;
  console.log('createdAt:::::: ', createdAt);

  return (
    <Card
      loading={isLoading}
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
  );
};

export default CustomerHystory;
