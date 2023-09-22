import React, { useMemo } from 'react';
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

import { BrowserView, MobileView } from 'react-device-detect';
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
    Line,
    ComposedChart,
    Legend,
} from 'recharts';
import { useQuery } from '@tanstack/react-query';
import { getCustomers, getExpenses, getOrders } from '../../api/serverApi';
import { getCurrentYearAndPast11Months } from './Home.helpers';

const Home = () => {
    const { data: customers } = useQuery(['customers'], () => getCustomers(), {
        keepPreviousData: true,
    });
    const customersCount = delve(customers, 'meta.pagination.total');

    const { data: orders } = useQuery(['orders'], () => getOrders(), {
        keepPreviousData: false,
    });

    const { data: expensesResponse } = useQuery(
        ['expenses'],
        () => getExpenses(),
        {
            keepPreviousData: false,
        }
    );

    const expenses = expensesResponse?.data?.filter(
        (ex) =>
            ex.attributes.direction.data.id !== 23 &&
            ex.attributes.direction.data.id !== 30
    );

    const { data: availableOrders } = useQuery(
        ['orders', { filter: 'AVAILABLE' }],
        () => getOrders('AVAILABLE'),
        {
            keepPreviousData: false,
        }
    );
    const { data: orderedOrders } = useQuery(
        ['orders', { filter: 'ORDERED' }],
        () => getOrders('ORDERED'),
        {
            keepPreviousData: false,
        }
    );

    const { data: deliveredOrders } = useQuery(
        ['orders', { filter: 'DELIVERED' }],
        () => getOrders('DELIVERED'),
        {
            keepPreviousData: false,
        }
    );

    const availableOrdersSum = availableOrders
        ?.filter((o) => o.attributes.category.data.id !== 18)
        ?.reduce((acc, el) => {
            acc += el.attributes.net_cost;

            return acc;
        }, 0);

    const orderedOrdersSum = orderedOrders
        ?.filter((o) => o.attributes.category.data.id !== 18)
        ?.reduce((acc, el) => {
            acc += el.attributes.net_cost;

            return acc;
        }, 0);

    const ordersCount = orders?.length;

    const chartData = useMemo(
        () => getCurrentYearAndPast11Months(expenses, deliveredOrders),
        [expenses, deliveredOrders]
    );

    const { Text } = Typography;
    const formatter = (value) => <CountUp end={value} separator=',' />;
    return (
        <>
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
                                        value={
                                            0
                                            // septemberExpenses && septemberData
                                            //     ? septemberData?.shahuyt -
                                            //       septemberData?.inqnarjeq -
                                            //       septemberExpenses
                                            //     : 0
                                        }
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
                        <div
                            style={{
                                width: '100%',
                                height: 400,
                                marginTop: 30,
                            }}
                        >
                            <ResponsiveContainer width='100%' height='100%'>
                                <ComposedChart
                                    width={500}
                                    height={400}
                                    data={chartData}
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
                                    <Legend />
                                    <Area
                                        type='monotone'
                                        dataKey='Ծախսեր'
                                        stackId='1'
                                        stroke='#8884d8'
                                        fill='#8884d8'
                                    />
                                    <Area
                                        type='monotone'
                                        dataKey='Ինքնարժեք'
                                        stackId='1'
                                        stroke='#82ca9d'
                                        fill='#82ca9d'
                                    />
                                    <Area
                                        type='monotone'
                                        dataKey='Շահույթ'
                                        stackId='1'
                                        stroke='#ffc658'
                                        fill='#ffc658'
                                    />
                                    <Line
                                        type='monotone'
                                        dataKey='Զուտ եկամուտ'
                                        stroke='rgb(220, 53, 69)'
                                    />
                                </ComposedChart>
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
                                        title='Մնացորդ'
                                        value={
                                            availableOrdersSum &&
                                            orderedOrdersSum
                                                ? availableOrdersSum +
                                                  orderedOrdersSum
                                                : 0
                                        }
                                        formatter={formatter}
                                    />
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </BrowserView>
            <MobileView>
                <div
                    style={{
                        width: '100%',
                        paddingRight: 10,
                        display: 'flex',
                        flexDirection: 'column',
                        rowGap: 15,
                    }}
                >
                    <div
                        style={{
                            border: '1px solid #ccc',
                            borderRadius: '10px',
                            height: 90,
                            width: '100%',
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
                                value={
                                    0
                                    // septemberExpenses && septemberData
                                    //     ? septemberData?.shahuyt -
                                    //       septemberData?.inqnarjeq -
                                    //       septemberExpenses
                                    //     : 0
                                }
                                formatter={formatter}
                            />
                        </div>
                    </div>
                    <div
                        style={{
                            border: '1px solid #ccc',
                            borderRadius: '10px',
                            height: 90,
                            width: '100%',
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
                    <div
                        style={{
                            border: '1px solid #ccc',
                            borderRadius: '10px',
                            height: 90,
                            width: '100%',
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
                            width: '100%',
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
                                title='Մնացորդ'
                                value={
                                    availableOrdersSum && orderedOrdersSum
                                        ? availableOrdersSum + orderedOrdersSum
                                        : 0
                                }
                                formatter={formatter}
                            />
                        </div>
                    </div>
                    <div
                        style={{
                            width: '100%',
                            height: 400,
                        }}
                    >
                        <ResponsiveContainer width='100%' height='100%'>
                            <ComposedChart
                                width={500}
                                height={400}
                                data={chartData}
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
                                <Legend />
                                <Area
                                    type='monotone'
                                    dataKey='Ծախսեր'
                                    stackId='1'
                                    stroke='#8884d8'
                                    fill='#8884d8'
                                />
                                <Area
                                    type='monotone'
                                    dataKey='Ինքնարժեք'
                                    stackId='1'
                                    stroke='#82ca9d'
                                    fill='#82ca9d'
                                />
                                <Area
                                    type='monotone'
                                    dataKey='Շահույթ'
                                    stackId='1'
                                    stroke='#ffc658'
                                    fill='#ffc658'
                                />
                                <Line
                                    type='monotone'
                                    dataKey='Զուտ եկամուտ'
                                    stroke='rgb(220, 53, 69)'
                                />
                            </ComposedChart>
                        </ResponsiveContainer>
                    </div>
                </div>
            </MobileView>
        </>
    );
};

export default Home;
