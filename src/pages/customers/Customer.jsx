import React from 'react';
import delve from 'dlv';
import { Space, Descriptions, Card, Typography, Skeleton } from 'antd';
import { useQuery } from '@tanstack/react-query';
import { BrowserView, MobileView } from 'react-device-detect';
import { useParams } from 'react-router-dom';
import { getCustomerById } from '../../api/serverApi';
import Alert from '../../components/alert/Alert';
import NotFound from '../notFound/NotFound';
import EditCustomerForm from './EditCustomerForm';
import { DollarOutlined, FieldTimeOutlined, SkinOutlined } from '@ant-design/icons';
import { format } from 'date-fns';
import { SmileOutlined } from '@ant-design/icons';
import { Timeline } from 'antd';
import { FaTshirt } from 'react-icons/fa';
import { BiDollar } from 'react-icons/bi';

const colorsMap = {
    'ORDERED':'gray',
    'AVAILABLE':'blue',
    'DELIVERED':'green',
    'CANCELED':'red',
    'RETURNED':'red'
}

const datesMap = {
    'ORDERED':'order_date',
    'AVAILABLE':'received_date',
    'DELIVERED':'deliver_date',
    'CANCELED':'cancel_date',
    'RETURNED':'return_date'
}

const statusesMap = {
    'ORDERED':'պատվիրված',
    'AVAILABLE':'առկա',
    'DELIVERED':'առաքված',
    'CANCELED':'չեղարկված',
    'RETURNED':'վերադարձված'
}

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
    const ordersInfo = delve(orders,'data')
    const ordersCount = ordersInfo?.length || 0
    const ordersSum = ordersInfo ? ordersInfo.reduce((acc,el)=>{
        const sum = delve(el,'attributes.selling_price') || 0
        acc += sum
        return acc
    },0) : 0
    const timeLineItems = ordersInfo ? ordersInfo.map(el => {
        const info = delve(el,'attributes')
        const status=info.status
 
        return {
            color:colorsMap[status],
            children:(
            <>
                <p>{new Date(info[datesMap[status]]).toLocaleString()}</p>
                <p>Պատվեր N {el.id}</p>
                <p>${info.net_cost} - ${info.selling_price} - {statusesMap[status]}</p>
            </>
        )}
    }) : [] 
    // [
    //     {
    //         color: 'green',
    //         children: 'Create a services site 2015-09-01',
    //     },
    //     {
    //         color: 'red',
    //         children: (
    //         <>
    //             <p>Saturday, Mar 11, 2023, 5:34 AM</p>
    //             <p>Order #T9D3AP</p>
    //             <p>6 items - $477.58 - delivered</p>
    //         </>
    //         ),
    //     },
    //     {
    //         children: (
    //         <>
    //             <p>Technical testing 1</p>
    //             <p>Technical testing 2</p>
    //             <p>Technical testing 3 2015-09-01</p>
    //         </>
    //         ),
    //     },
    //     {
    //         color: 'gray',
    //         children: (
    //         <>
    //             <p>Technical testing 1</p>
    //             <p>Technical testing 2</p>
    //             <p>Technical testing 3 2015-09-01</p>
    //         </>
    //         ),
    //     },
    //     ]

    console.log('ordersInfo:::::: ',ordersInfo)
    
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
                            padding: '0 20px',
                        }}
                    >
                        <Card
                        loading={isLoading || isFetching}
                            title='Պատմություն'
                            style={{
                                width: '100%',
                                marginBottom:'20px'
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
                                            {createdAt && format(new Date(createdAt), 'dd-MM-yyy')}
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
                                        <Text><SkinOutlined style={{ marginRight: 8 }}/> {ordersCount} - Պատվեր</Text>
                                    </div>
                                    <div style={{marginTop:30, }}>
                                        <Text><DollarOutlined />{ordersSum}դ. Պատվեր</Text>
                                    </div>
                                </div>
                            </div>
                        </Card>
                        {isLoading || isFetching ? <Skeleton
   
    paragraph={{
      rows: 6,
    }}
  /> : <Timeline
  items={timeLineItems}
/>}
                        
                    </div>
                </div>
            </BrowserView>
            <MobileView>Mobile</MobileView>
        </>
    );
};

export default Customer;
