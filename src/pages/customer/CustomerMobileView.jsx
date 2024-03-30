import { Skeleton, Space } from 'antd';

import { EditCustomerForm } from '../../components';

const CustomerMobileView = ({
  error,
  Avatar,
  isError,
  contacts,
  addresses,
  last_name,
  isLoading,
  first_name,
  customerId,
  phone_number,
}) => {
  return (
    <>
      <div style={{ width: '100%', display: 'flex' }}>
        <div style={{ width: '80%' }}>
          {isLoading ? (
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
              error={error}
              Avatar={Avatar}
              isError={isError}
              contacts={contacts}
              last_name={last_name}
              addresses={addresses}
              isLoading={isLoading}
              isFetching={isFetching}
              first_name={first_name}
              customerId={customerId}
              phone_number={phone_number}
            />
          )}
        </div>
      </div>
    </>
  );
};

export default CustomerMobileView;
