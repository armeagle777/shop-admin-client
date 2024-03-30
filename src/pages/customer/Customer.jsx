import delve from 'dlv';
import { useParams } from 'react-router-dom';
import { BrowserView, MobileView } from 'react-device-detect';

import { NotFound } from '../';
import { useCustomerData } from '../../hooks';
import { ALERT_TYPES, Alert } from '../../components';
import CustomerMobileView from './CustomerMobileView';
import CustomerBrowserView from './CustomerBrowserView';
import translations from '../../utils/translations/am.json';
import { calculateOrdersSum, formatTimelineItems } from './Customer.helpers';

const Customer = () => {
  const { customerId } = useParams();
  const { data, isLoading, isError, error } = useCustomerData({ customerId });
  const { CUSTOMER_PAGE, SHARED } = translations;

  if (isError) {
    return error.response?.status === 404 ? (
      <NotFound
        redirectUrl="/customers"
        message={CUSTOMER_PAGE.NOT_FOUND_MESSAGE}
        redirectButtonText={CUSTOMER_PAGE.REDIRECT_BUTTON_TEXT}
      />
    ) : (
      <Alert type={ALERT_TYPES.ERROR} message={SHARED.ALERT_ERROR_MESSAGE} />
    );
  }

  const info = delve(data, 'data.attributes');

  const {
    orders,
    Avatar,
    contacts,
    segments,
    createdAt,
    last_name,
    addresses,
    first_name,
    phone_number,
    orders_count,
  } = {
    ...info,
  };
  const ordersInfo = delve(orders, 'data');
  const ordersCount = ordersInfo?.length || 0;
  const ordersSums = calculateOrdersSum(ordersInfo);
  const timeLineItems = formatTimelineItems(ordersInfo);

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
          customerId={customerId}
          phone_number={phone_number}
        />
      </MobileView>
    </>
  );
};

export default Customer;
