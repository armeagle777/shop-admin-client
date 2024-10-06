import { format } from 'date-fns';
import { Card, Typography } from 'antd';
import {
  GiftOutlined,
  SkinOutlined,
  SmileOutlined,
  FieldTimeOutlined,
} from '@ant-design/icons';

import { ANT_TEXT_TYPES } from '../../../utils/constants';
import translations from '../../../utils/translations/am.json';

const CustomerHystory = ({ createdAt, ordersSums, isLoading, ordersCount }) => {
  const { CUSTOMER_PAGE } = translations;
  const { Text } = Typography;

  return (
    <Card
      loading={isLoading}
      title={CUSTOMER_PAGE.CARD_TITLE}
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
              {CUSTOMER_PAGE.HYSTORY_REGISTER_TITLE}
            </Text>
            <Text type={ANT_TEXT_TYPES.SECONDARY} style={{ fontSize: 16 }}>
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
              {CUSTOMER_PAGE.HYSTORY_COUNT_TITLE}
            </Text>
            <Text type={ANT_TEXT_TYPES.SECONDARY} style={{ fontSize: 16 }}>
              {ordersCount} - {CUSTOMER_PAGE.HYSTORY_COUNT_TEXT}
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
              {CUSTOMER_PAGE.HYSTORY_AMOUNT_TITLE}
            </Text>
            <Text type={ANT_TEXT_TYPES.SECONDARY} style={{ fontSize: 16 }}>
              {ordersSums.net_cost.toLocaleString()}
              {CUSTOMER_PAGE.HYSTORY_AMOUNT_TEXT}
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
              {CUSTOMER_PAGE.HYSTORY_INCOME_TITLE}
            </Text>
            <Text type={ANT_TEXT_TYPES.SECONDARY} style={{ fontSize: 16 }}>
              {ordersSums.profit.toLocaleString()}
              {CUSTOMER_PAGE.HYSTORY_INCOME_TEXT}
            </Text>
          </div>
        </div>
      </div>
    </Card>
  );
};

export default CustomerHystory;
