import { useQuery } from '@tanstack/react-query';
import React from 'react';
import { BrowserView, MobileView } from 'react-device-detect';
import { useParams } from 'react-router-dom';
import { getCustomerById } from '../../api/serverApi';
import Alert from '../../components/alert/Alert';
import NotFound from '../notFound/NotFound';
import EditCustomerForm from './EditCustomerForm';

const Customer = () => {
    const { customerId } = useParams();
    const { data, isLoading, isFetching, isError, error } = useQuery(
        ['customers', customerId],
        () => getCustomerById(customerId),
        {
            keepPreviousData: true,
        }
    );

    if (isError) {
        return <Alert type='error' message={error.message} />;
    }

    if (data && data.data?.length === 0) {
        return <NotFound message='Նման հաճապորդ գոյություն չունի' />;
    }

    return (
        <>
            <BrowserView>
                <div style={{ width: '100%', display: 'flex' }}>
                    <div style={{ width: '70%' }}>
                        <EditCustomerForm
                            customerData={data}
                            customerId={customerId}
                            isLoading={isLoading}
                            isFetching={isFetching}
                            isError={isError}
                            error={error}
                        />
                    </div>

                    <div
                        style={{ width: '30%', outline: '1px solid yellow' }}
                    ></div>
                </div>
            </BrowserView>
            <MobileView>Mobile</MobileView>
        </>
    );
};

export default Customer;
