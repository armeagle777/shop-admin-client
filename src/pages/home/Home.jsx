import React from 'react';
import {
    ConfigProvider,
    theme,
    Button,
    Card,
    Space,
    Typography,
    Statistic,
} from 'antd';
import delve from 'dlv';
import { isAfter, isBefore, isEqual } from 'date-fns';

import { BrowserView } from 'react-device-detect';
import { GiftOutlined, UsergroupAddOutlined } from '@ant-design/icons';
import CountUp from 'react-countup';
import {
    AreaChart,
    Area,
    XAxis,
    YAxis,
    CartesianGrid,
    Tooltip,
    ResponsiveContainer,
    PieChart,
    Pie,
    Cell,
} from 'recharts';
import { useQuery } from '@tanstack/react-query';
import { getCustomers, getOrders } from '../../api/serverApi';




const Home = () => {
    const { data:customers } = useQuery(
        ['customers'],
        () => getCustomers(),
        {
            keepPreviousData: true,
        }
    );
    const customersCount = delve(customers,'meta.pagination.total')

    const {
        data :orders
    } = useQuery(['orders'], () => getOrders(), {
        keepPreviousData: false,
    });
 
    
    
    const ordersCount = orders?.length
    const julyStartDate = new Date('2023-07-01');
    const julyEndDate = new Date('2023-07-31');

    const augustStartDate = new Date('2023-08-01');
    const augustEndDate = new Date('2023-08-31');

    const julyOrders = orders?.filter((item) => {
        const itemDate = new Date(item?.attributes?.order_date);
        return isAfter(itemDate, julyStartDate) && isBefore(itemDate, julyEndDate);
    });
    const julyData = julyOrders?.reduce((acc,el)=>{
        const selling_price = delve(el,'attributes.selling_price')
        const net_cost = delve(el,'attributes.net_cost')

        acc.vajarq += net_cost
        acc.ekamut += (selling_price - net_cost)

        return acc

    },{vajarq:0,ekamut:0})

    console.log('julyData:::::: ',julyData);
    

    const augustOrders = orders?.filter((item) => {
        const itemDate = new Date(item?.attributes?.order_date);
        return isAfter(itemDate, augustStartDate) && isBefore(itemDate, augustEndDate);
    });

    const augustData = augustOrders?.reduce((acc,el)=>{
        const selling_price = delve(el,'attributes.selling_price')
        const net_cost = delve(el,'attributes.net_cost')

        acc.vajarq += net_cost
        acc.ekamut += (selling_price - net_cost)

        return acc

    },{vajarq:0,ekamut:0})

    const data = [
        {
            name: 'Հունվար',
            Ծախս: 0,
            Եկամուտ: 0,
            Վաճառք: 0,
        },
        {
            name: 'Փետրվար',
            Ծախս: 0,
            Եկամուտ: 0,
            Վաճառք: 0,
        },
        {
            name: 'Մարտ',
            Ծախս: 0,
            Եկամուտ: 0,
            Վաճառք: 0,
        },
        {
            name: 'Ապրիլ',
            Ծախս: 0,
            Եկամուտ: 0,
            Վաճառք: 0,
        },
        {
            name: 'Մայիս',
            Ծախս: 0,
            Եկամուտ: 0,
            Վաճառք: 0,
        },
        {
            name: 'Հունիս',
            Ծախս: 0,
            Եկամուտ: 0,
            Վաճառք: 0,
        },
        {
            name: 'Հուլիս',
            Ծախս: 0,
            Եկամուտ: julyData?.ekamut || 0,
            Վաճառք: julyData?.vajarq || 0,
        },
        {
            name: 'Օգոստոս',
            Ծախս: 0,
            Եկամուտ: augustData?.ekamut || 0,
            Վաճառք: augustData?.vajarq || 0,
        },
        {
            name: 'Սեպտեմբեր',
            Ծախս: 0,
            Եկամուտ: 0,
            Վաճառք: 0,
        },
        {
            name: 'Հոկտեմբեր',
            Ծախս: 0,
            Եկամուտ: 0,
            Վաճառք: 0,
        },
        {
            name: 'Նոյեմբեր',
            Ծախս: 0,
            Եկամուտ: 0,
            Վաճառք: 0,
        },
        {
            name: 'Դեկտեմբեր',
            Ծախս: 0,
            Եկամուտ: 0,
            Վաճառք: 0,
        },
    ];
  
    
    const { Text } = Typography;
    const formatter = (value) => <CountUp end={value} separator=',' />;
    return (
        <BrowserView>
            <div style={{ width: '100%', display: 'flex' }}>
                <div style={{ width: '50%', paddingRight: 10 }}>
                    <div style={{ display: 'flex', gap: 20 }}>
                        <div
                            style={{
                                border: '1px solid #ccc',
                                borderRadius: '10px',
                                height: 90,
                                width: '50%',
                                display: 'flex',
                                justifyContent: 'space-between',
                            }}
                        >
                            <div
                                style={{
                                    width: 80,
                                    height: '100%',
                                    background: '#FFC107',
                                    borderRadius: '10px 0 100% 10px',
                                    display: 'flex',
                                    alignItems: 'center',
                                    justifyContent: 'center',
                                }}
                            >
                                <Text
                                    style={{
                                        fontSize: 40,
                                        lineHeight: '100%',
                                    }}
                                >
                                    ֏
                                </Text>
                            </div>
                            <div
                                style={{
                                    paddingRight: 20,
                                    height: '100%',
                                    display: 'flex',
                                    flexDirection: 'column',
                                    justifyContent: 'center',
                                    alignItems: 'flex-end',
                                }}
                            >
                                <Statistic
                                    title='Ամսական Եկամուտ'
                                    value={2400}
                                    formatter={formatter}
                                />
                            </div>
                        </div>
                        <div
                            style={{
                                border: '1px solid #ccc',
                                borderRadius: '10px',
                                height: 90,
                                width: '50%',
                                display: 'flex',
                                justifyContent: 'space-between',
                                padding: 0,
                            }}
                        >
                            <div
                                style={{
                                    background: '#DC3545',
                                    width: 80,
                                    height: '100%',
                                    borderRadius: '10px 0 100% 10px',
                                    display: 'flex',
                                    alignItems: 'center',
                                    justifyContent: 'center',
                                }}
                            >
                                <Text
                                    style={{
                                        fontSize: 40,
                                        lineHeight: '100%',
                                    }}
                                >
                                    <GiftOutlined />
                                </Text>
                            </div>
                            <div
                                style={{
                                    paddingRight: 20,
                                    height: '100%',
                                    display: 'flex',
                                    flexDirection: 'column',
                                    justifyContent: 'center',
                                    alignItems: 'flex-end',
                                }}
                            >
                                <Statistic
                                    title='Պատվեր'
                                    value={ordersCount || 0}
                                    formatter={formatter}
                                />
                            </div>
                        </div>
                    </div>
                    <div style={{ width: '100%', height: 400, marginTop: 30 }}>
                        <ResponsiveContainer width='100%' height='100%'>
                            <AreaChart
                                width={500}
                                height={400}
                                data={data}
                                margin={{
                                    top: 10,
                                    right: 30,
                                    left: 0,
                                    bottom: 0,
                                }}
                            >
                                <CartesianGrid strokeDasharray='3 3' />
                                <XAxis dataKey='name' />
                                <YAxis />
                                <Tooltip />
                                <Area
                                    type='monotone'
                                    dataKey='Ծախս'
                                    stackId='1'
                                    stroke='#8884d8'
                                    fill='#8884d8'
                                />
                                <Area
                                    type='monotone'
                                    dataKey='Եկամուտ'
                                    stackId='1'
                                    stroke='#82ca9d'
                                    fill='#82ca9d'
                                />
                                <Area
                                    type='monotone'
                                    dataKey='Վաճառք'
                                    stackId='1'
                                    stroke='#ffc658'
                                    fill='#ffc658'
                                />
                            </AreaChart>
                        </ResponsiveContainer>
                    </div>
                </div>
                <div style={{ width: '50%', paddingLeft: 10 }}>
                    <div style={{ display: 'flex', gap: 20 }}>
                        <div
                            style={{
                                border: '1px solid #ccc',
                                borderRadius: '10px',
                                height: 90,
                                width: '50%',
                                display: 'flex',
                                justifyContent: 'space-between',
                            }}
                        >
                            <div
                                style={{
                                    width: 80,
                                    height: '100%',
                                    background: '#0D6EFD',
                                    borderRadius: '10px 0 100% 10px',
                                    display: 'flex',
                                    alignItems: 'center',
                                    justifyContent: 'center',
                                }}
                            >
                                <Text
                                    style={{
                                        fontSize: 40,
                                        lineHeight: '100%',
                                    }}
                                >
                                    <UsergroupAddOutlined />
                                </Text>
                            </div>
                            <div
                                style={{
                                    paddingRight: 20,
                                    height: '100%',
                                    display: 'flex',
                                    flexDirection: 'column',
                                    justifyContent: 'center',
                                    alignItems: 'flex-end',
                                }}
                            >
                                <Statistic
                                    title='Հաճախորդ'
                                    value={customersCount || 0}
                                    formatter={formatter}
                                />
                            </div>
                        </div>
                        <div
                            style={{
                                border: '1px solid #ccc',
                                borderRadius: '10px',
                                height: 90,
                                width: '50%',
                                display: 'flex',
                                justifyContent: 'space-between',
                                padding: 0,
                            }}
                        >
                            <div
                                style={{
                                    background: '#198754',
                                    width: 80,
                                    height: '100%',
                                    borderRadius: '10px 0 100% 10px',
                                    display: 'flex',
                                    alignItems: 'center',
                                    justifyContent: 'center',
                                }}
                            >
                                <Text
                                    style={{
                                        fontSize: 40,
                                        lineHeight: '100%',
                                    }}
                                >
                                    <GiftOutlined />
                                </Text>
                            </div>
                            <div
                                style={{
                                    paddingRight: 20,
                                    height: '100%',
                                    display: 'flex',
                                    flexDirection: 'column',
                                    justifyContent: 'center',
                                    alignItems: 'flex-end',
                                }}
                            >
                                <Statistic
                                    title='Նոր հաճախորդ'
                                    value={customersCount? Math.ceil(customersCount * 15 / 100) : 0}
                                    formatter={formatter}
                                />
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </BrowserView>
    );
};

export default Home;
