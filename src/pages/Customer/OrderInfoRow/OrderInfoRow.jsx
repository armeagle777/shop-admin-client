import { datesMap, statusesMap } from '../Customer.constants';

const OrderInfoRow = ({ info, id, status }) => {
  return (
    <>
      <p>{new Date(info[datesMap[status]]).toLocaleString()}</p>
      <p>Պատվեր N {id}</p>
      <p>
        {info.net_cost.toLocaleString()}֏ -{info.selling_price.toLocaleString()}
        ֏ - {statusesMap[status]}
      </p>
    </>
  );
};

export default OrderInfoRow;
