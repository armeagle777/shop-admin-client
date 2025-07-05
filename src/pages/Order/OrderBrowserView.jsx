import { EditOrderForm, OrderFormSkileton } from '../../components';

const OrderBrowserView = ({
  name,
  shop,
  status,
  images,
  orderId,
  category,
  isActive,
  net_cost,
  customer,
  isLoading,
  createdAt,
  updatedAt,
  isFetching,
  order_date,
  description,
  return_date,
  cancel_date,
  tracking_id,
  deliver_date,
  received_date,
  reference_url,
  selling_price,
  comment,
}) => {
  return (
    <>
      <div style={{ width: '100%', display: 'flex' }}>
        <div style={{ width: '70%' }}>
          {isLoading || isFetching ? (
            <OrderFormSkileton />
          ) : (
            <EditOrderForm
              name={name}
              shop={shop}
              status={status}
              images={images}
              orderId={orderId}
              category={category}
              net_cost={net_cost}
              isActive={isActive}
              customer={customer}
              comment={comment}
              createdAt={createdAt}
              updatedAt={updatedAt}
              order_date={order_date}
              tracking_id={tracking_id}
              return_date={return_date}
              description={description}
              cancel_date={cancel_date}
              deliver_date={deliver_date}
              received_date={received_date}
              reference_url={reference_url}
              selling_price={selling_price}
            />
          )}
        </div>
      </div>
    </>
  );
};

export default OrderBrowserView;
