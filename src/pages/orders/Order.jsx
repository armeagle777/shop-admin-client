import { useQuery } from '@tanstack/react-query';
import { Skeleton, Space, Typography } from 'antd';
import delve from 'dlv';
import React from 'react';
import { BrowserView, MobileView } from 'react-device-detect';
import { useParams } from 'react-router-dom';
import { getOrderById } from '../../api/serverApi';
import Alert from '../../components/alert/Alert';
import NotFound from '../notFound/NotFound';
import EditOrderForm from './EditOrderForm';
import OrderBrowserView from './OrderBrowserView';
import OrderMobileView from './OrderMobileView';

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
    return error.response?.status === 404 ? (
      <NotFound message="Չի գտնվել" redirectUrl="/orders" redirectButtonText="Պատվերներ" />
    ) : (
      <Alert type="error" message={error.message} />
    );
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
        <OrderBrowserView
          isLoading={isLoading}
          isFetching={isFetching}
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
      </BrowserView>
      <MobileView>
        <OrderMobileView
          isLoading={isLoading}
          isFetching={isFetching}
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
      </MobileView>
    </>
  );
};

export default Order;
