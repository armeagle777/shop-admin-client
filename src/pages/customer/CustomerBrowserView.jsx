import { Timeline, Typography } from 'antd';

import { EditCustomerForm } from '../../components';
import { CustomerSkeleton, TimelineSkeleton, CustomerHystory } from './';
import {
  brViewContainerStyles,
  brContentContainerstyles,
} from './Customer.constants';

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
  customerId,
  ordersSums,
  ordersCount,
  phone_number,
  timeLineItems,
}) => {
  return (
    <>
      <div style={brViewContainerStyles}>
        <div style={brContentContainerstyles}>
          {isLoading ? (
            <CustomerSkeleton />
          ) : (
            <EditCustomerForm
              error={error}
              Avatar={Avatar}
              isError={isError}
              contacts={contacts}
              last_name={last_name}
              addresses={addresses}
              isLoading={isLoading}
              first_name={first_name}
              customerId={customerId}
              phone_number={phone_number}
            />
          )}
        </div>

        <div
          style={{
            width: '30%',
            padding: '0 20px',
          }}
        >
          <CustomerHystory
            createdAt={createdAt}
            isLoading={isLoading}
            ordersSums={ordersSums}
            ordersCount={ordersCount}
          />
          {isLoading ? (
            <TimelineSkeleton />
          ) : (
            <Timeline items={timeLineItems} />
          )}
        </div>
      </div>
    </>
  );
};

export default CustomerBrowserView;
