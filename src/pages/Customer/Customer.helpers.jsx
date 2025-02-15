import delve from 'dlv';

import { OrderInfoRow } from './OrderInfoRow';
import { colorsMap } from './Customer.constants';
import { ORDER_STATUSES_MAP } from '../../utils/constants';

export const calculateOrdersSum = (ordersInfo) =>
  ordersInfo
    ? ordersInfo.reduce(
        (acc, el) => {
          const status = el?.status;
          const net_cost = el?.net_cost || 0;
          const selling_price = el.selling_price || 0;
          const profit = selling_price - net_cost;

          if (
            status !== ORDER_STATUSES_MAP.CANCELED &&
            status !== ORDER_STATUSES_MAP.RETURNED
          )
            acc.net_cost += net_cost;
          acc.profit += profit;

          return acc;
        },
        { net_cost: 0, profit: 0 },
      )
    : { net_cost: 0, profit: 0 };

export const formatTimelineItems = (ordersInfo) =>
  ordersInfo
    ? ordersInfo.map((el) => {
        const status = el.status;

        return {
          color: colorsMap[status],
          children: <OrderInfoRow info={el} id={el.id} status={status} />,
        };
      })
    : [];
