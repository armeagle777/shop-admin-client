import React from 'react';
import delve from 'dlv';
import { Space, Descriptions, Card, Typography } from 'antd';
import { useQuery } from '@tanstack/react-query';
import { BrowserView, MobileView } from 'react-device-detect';
import { useParams } from 'react-router-dom';
import { getCustomerById } from '../../api/serverApi';
import Alert from '../../components/alert/Alert';
import NotFound from '../notFound/NotFound';
import EditCustomerForm from './EditCustomerForm';
import { FieldTimeOutlined } from '@ant-design/icons';

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
    const { Text, Link } = Typography;

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
    return (
        <>
            <BrowserView>
                <div style={{ width: '100%', display: 'flex' }}>
                    <div style={{ width: '70%' }}>
                        <EditCustomerForm
                            customerId={customerId}
                            isLoading={isLoading}
                            isFetching={isFetching}
                            isError={isError}
                            error={error}
                            first_name={first_name}
                            last_name={last_name}
                            phone_number={phone_number}
                            Avatar={Avatar}
                            addresses={addresses}
                            contacts={contacts}
                        />
                    </div>

                    <div
                        style={{
                            width: '30%',
                            padding: '0 10px',
                        }}
                    >
                        <Card
                            title='Պատմություն'
                            style={{
                                width: '100%',
                            }}
                        >
                            <div
                                style={{
                                    width: '100%',
                                    display: 'flex',
                                }}
                            >
                                <div
                                    style={{
                                        width: '50%',
                                        display: 'flex',
                                        flexDirection: 'column',
                                    }}
                                >
                                    <div
                                        style={{
                                            display: 'flex',
                                            flexDirection: 'column',
                                        }}
                                    >
                                        <Text style={{ fontSize: 16 }}>
                                            <FieldTimeOutlined
                                                style={{ marginRight: 8 }}
                                            />
                                            Գրանցվել է
                                        </Text>
                                        <Text
                                            type='secondary'
                                            style={{ fontSize: 16 }}
                                        >
                                            8/31/2023
                                        </Text>
                                    </div>
                                    <div
                                        style={{
                                            display: 'flex',
                                            flexDirection: 'column',
                                        }}
                                    >
                                        <Text style={{ fontSize: 16 }}>
                                            <FieldTimeOutlined
                                                style={{ marginRight: 8 }}
                                            />
                                            Last seen
                                        </Text>
                                        <Text
                                            type='secondary'
                                            style={{ fontSize: 16 }}
                                        >
                                            9/3/2023
                                        </Text>
                                    </div>
                                </div>
                                <div
                                    style={{
                                        width: '50%',
                                        display: 'flex',
                                        flexDirection: 'column',
                                    }}
                                >
                                    <div>
                                        <Text>0 orders</Text>
                                    </div>
                                    <div>
                                        <Text>0 reviews</Text>
                                    </div>
                                </div>
                            </div>
                        </Card>
                    </div>
                </div>
            </BrowserView>
            <MobileView>Mobile</MobileView>
        </>
    );
};

export default Customer;
