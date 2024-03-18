import delve from 'dlv';
import { useQuery } from '@tanstack/react-query';
import { BrowserView, MobileView } from 'react-device-detect';
import { useParams } from 'react-router-dom';

import { NotFound } from '../';
import { Alert } from '../../components';
import { getCustomerById } from '../../api/serverApi';
import CustomerMobileView from './CustomerMobileView';
import CustomerBrowserView from './CustomerBrowserView';
import { colorsMap, datesMap, statusesMap } from './Customer.constants';

const Customer = () => {
  const { customerId } = useParams();
  const { data, isLoading, isFetching, isError, error } = useQuery(
    ['customers', customerId],
    () => getCustomerById(customerId),
    {
      keepPreviousData: true,
    },
  );

  if (isError) {
    return error.response?.status === 404 ? (
      <NotFound
        message="Չի գտնվել"
        redirectUrl="/customers"
        redirectButtonText="Հաճախորդներ"
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
    first_name,
    last_name,
    phone_number,
    Avatar,
    addresses,
    contacts,
    orders,
    segments,
    orders_count,
    createdAt,
  } = {
    ...info,
  };
  const ordersInfo = delve(orders, 'data');
  const ordersCount = ordersInfo?.length || 0;
  const ordersSums = ordersInfo
    ? ordersInfo.reduce(
        (acc, el) => {
          const status = delve(el, 'attributes.status');
          const net_cost = delve(el, 'attributes.net_cost') || 0;
          const selling_price = delve(el, 'attributes.selling_price') || 0;
          const profit = selling_price - net_cost;
          if (status !== 'CANCELED' && status !== 'RETURNED')
            acc.net_cost += net_cost;
          acc.profit += profit;

          return acc;
        },
        { net_cost: 0, profit: 0 },
      )
    : { net_cost: 0, profit: 0 };
  const timeLineItems = ordersInfo
    ? ordersInfo.map((el) => {
        const info = delve(el, 'attributes');
        const status = info.status;

        return {
          color: colorsMap[status],
          children: (
            <>
              <p>{new Date(info[datesMap[status]]).toLocaleString()}</p>
              <p>Պատվեր N {el.id}</p>
              <p>
                {info.net_cost.toLocaleString()}֏ -{' '}
                {info.selling_price.toLocaleString()}֏ - {statusesMap[status]}
              </p>
            </>
          ),
        };
      })
    : [];

  return (
    <>
      <BrowserView>
        <CustomerBrowserView
          error={error}
          Avatar={Avatar}
          isError={isError}
          contacts={contacts}
          addresses={addresses}
          last_name={last_name}
          createdAt={createdAt}
          isLoading={isLoading}
          first_name={first_name}
          isFetching={isFetching}
          customerId={customerId}
          ordersSums={ordersSums}
          ordersCount={ordersCount}
          phone_number={phone_number}
          timeLineItems={timeLineItems}
        />
      </BrowserView>
      <MobileView>
        <CustomerMobileView
          error={error}
          Avatar={Avatar}
          isError={isError}
          contacts={contacts}
          addresses={addresses}
          last_name={last_name}
          isLoading={isLoading}
          first_name={first_name}
          isFetching={isFetching}
          customerId={customerId}
          phone_number={phone_number}
        />
      </MobileView>
    </>
  );
};

export default Customer;
