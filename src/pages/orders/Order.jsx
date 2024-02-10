import { FieldTimeOutlined, GiftOutlined, SkinOutlined, SmileOutlined } from '@ant-design/icons';
import { useQuery } from '@tanstack/react-query';
import { Card, Skeleton, Space, Timeline, Typography } from 'antd';
import { format } from 'date-fns';
import delve from 'dlv';
import React from 'react';
import { BrowserView, MobileView } from 'react-device-detect';
import { useParams } from 'react-router-dom';
import { getCustomerById, getOrderById } from '../../api/serverApi';
import Alert from '../../components/alert/Alert';
import NotFound from '../notFound/NotFound';
import EditCustomerForm from '../customers/EditCustomerForm';
import EditOrderForm from './EditOrderForm';

const colorsMap = {
  ORDERED: 'gray',
  AVAILABLE: 'blue',
  DELIVERED: 'green',
  CANCELED: 'red',
  RETURNED: 'red',
};

const datesMap = {
  ORDERED: 'order_date',
  AVAILABLE: 'received_date',
  DELIVERED: 'deliver_date',
  CANCELED: 'cancel_date',
  RETURNED: 'return_date',
};

const statusesMap = {
  ORDERED: 'պատվիրված',
  AVAILABLE: 'առկա',
  DELIVERED: 'առաքված',
  CANCELED: 'չեղարկված',
  RETURNED: 'վերադարձված',
};

const Order = () => {
  const { orderId } = useParams();
  const { data, isLoading, isFetching, isError, error } = useQuery(['orders', orderId], () => getOrderById(orderId), {
    keepPreviousData: true,
  });

  if (isError) {
    return <Alert type="error" message={error.message} />;
  }

  if (data && data.data?.length === 0) {
    return <NotFound message="Նման հաճապորդ գոյություն չունի" />;
  }
  const { Text, Link } = Typography;

  const info = delve(data, 'data.attributes');

  const {
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
  } = {
    ...info,
  };

  return (
    <>
      <BrowserView>
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
          </div>
        </div>
      </BrowserView>
      <MobileView>Mobile</MobileView>
    </>
  );
};

export default Order;
