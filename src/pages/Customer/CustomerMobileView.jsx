import { CustomerSkeleton } from '.';
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
            <CustomerSkeleton />
          ) : (
            <EditCustomerForm
              error={error}
              Avatar={Avatar}
              isError={isError}
              contacts={contacts}
              last_name={last_name}
              addresses={addresses}
              isLoading={isLoading}
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
