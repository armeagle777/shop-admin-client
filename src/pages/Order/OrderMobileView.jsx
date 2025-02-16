import { Skeleton, Space, Typography } from 'antd';

import { EditOrderForm } from '../../components';

const OrderMobileView = ({
  isLoading,
  isFetching,
  orderId,
  cancel_date,
  category,
  createdAt,
  customer,
  deliver_date,
  description,
  images,
  isActive,
  name,
  net_cost,
  order_date,
  received_date,
  reference_url,
  return_date,
  selling_price,
  shop,
  status,
  tracking_id,
  updatedAt,
}) => {
  return (
    <>
      <div style={{ width: '100%', display: 'flex' }}>
        {/* <div style={{ width: '95%' }}> */}
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
          <EditOrderForm
            orderId={orderId}
            cancel_date={cancel_date}
            category={category}
            createdAt={createdAt}
            customer={customer}
            deliver_date={deliver_date}
            description={description}
            images={images}
            isActive={isActive}
            name={name}
            net_cost={net_cost}
            order_date={order_date}
            received_date={received_date}
            reference_url={reference_url}
            return_date={return_date}
            selling_price={selling_price}
            shop={shop}
            status={status}
            tracking_id={tracking_id}
            updatedAt={updatedAt}
          />
        )}
        {/* </div> */}
      </div>
    </>
  );
};

export default OrderMobileView;
