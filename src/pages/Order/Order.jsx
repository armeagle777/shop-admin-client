import delve from 'dlv';
import { useParams } from 'react-router-dom';
import { BrowserView, MobileView } from 'react-device-detect';

import { Alert } from '../../components';
import { NotFound } from '..';
import OrderBrowserView from './OrderBrowserView';
import OrderMobileView from './OrderMobileView';
import { useOrderData } from '../../hooks';

const Order = () => {
  const { orderId } = useParams();
  const { data, isLoading, isFetching, isError, error } = useOrderData({
    orderId,
  });

  if (isError) {
    return error.response?.status === 404 ? (
      <NotFound
        message="Չի գտնվել"
        redirectUrl="/orders"
        redirectButtonText="Պատվերներ"
      />
    ) : (
      <Alert type="error" message={error.message} />
    );
  }

  if (data && data.data?.length === 0) {
    return <NotFound message="Նման հաճապորդ գոյություն չունի" />;
  }

  const info = delve(data, 'data.attributes');

  const {
    shop,
    name,
    status,
    images,
    customer,
    net_cost,
    category,
    isActive,
    createdAt,
    updatedAt,
    comment,
    order_date,
    description,
    return_date,
    tracking_id,
    cancel_date,
    deliver_date,
    received_date,
    selling_price,
    reference_url,
  } = {
    ...info,
  };

  return (
    <>
      <BrowserView>
        <OrderBrowserView
          name={name}
          shop={shop}
          status={status}
          images={images}
          orderId={orderId}
          isActive={isActive}
          net_cost={net_cost}
          customer={customer}
          category={category}
          createdAt={createdAt}
          isLoading={isLoading}
          updatedAt={updatedAt}
          order_date={order_date}
          isFetching={isFetching}
          comment={comment}
          tracking_id={tracking_id}
          return_date={return_date}
          description={description}
          cancel_date={cancel_date}
          deliver_date={deliver_date}
          received_date={received_date}
          reference_url={reference_url}
          selling_price={selling_price}
        />
      </BrowserView>
      <MobileView>
        <OrderMobileView
          name={name}
          shop={shop}
          images={images}
          status={status}
          orderId={orderId}
          isActive={isActive}
          net_cost={net_cost}
          category={category}
          comment={comment}
          customer={customer}
          updatedAt={updatedAt}
          createdAt={createdAt}
          isLoading={isLoading}
          order_date={order_date}
          isFetching={isFetching}
          description={description}
          return_date={return_date}
          tracking_id={tracking_id}
          cancel_date={cancel_date}
          deliver_date={deliver_date}
          received_date={received_date}
          reference_url={reference_url}
          selling_price={selling_price}
        />
      </MobileView>
    </>
  );
};

export default Order;
