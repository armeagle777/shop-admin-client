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
import { getCustomers, getExpenses, getOrders } from '../../api/serverApi';

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

    const expenses = expensesResponse?.data;

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

    function getFirstDayOfMonth(year, month) {
        return new Date(year, month, 1);
    }

    function getLastDayOfMonth(year, month) {
        return new Date(year, month + 1, 0);
    }

    function getCurrentYearAndPast11Months() {
        const months = [
            'January',
            'February',
            'March',
            'April',
            'May',
            'June',
            'July',
            'August',
            'September',
            'October',
            'November',
            'December',
        ];

        const currentDate = new Date();
        let currentYear = currentDate.getFullYear();
        let currentMonth = currentDate.getMonth();
        const currentMonthName = months[currentMonth];

        const monthsData = [];

        for (let i = 0; i < 12; i++) {
            const monthName = months[currentMonth];
            monthsData.push({
                month: monthName,
                startDate: getFirstDayOfMonth(currentYear, currentMonth),
                endDate: getLastDayOfMonth(currentYear, currentMonth),
            });

            if (currentMonth === 0) {
                currentYear--; // Decrement the year if the current month is January
                currentMonth = 11; // Set the current month to December
            } else {
                currentMonth--; // Move to the previous month
            }
        }

        return monthsData.reverse(); // Reverse the order to get past months first
    }

    const julyStartDate = new Date('2023-07-01');
    const julyEndDate = new Date('2023-07-31');

    const augustStartDate = new Date('2023-08-01');
    const augustEndDate = new Date('2023-08-31');

    const septemberStartDate = new Date('2023-09-01');
    const septemberEndDate = new Date('2023-09-30');

    const julyOrders = deliveredOrders?.filter((item) => {
        const itemDate = new Date(item?.attributes?.deliver_date);
        return (
            isAfter(itemDate, julyStartDate) && isBefore(itemDate, julyEndDate)
        );
    });
    const julyExpenses = expenses
        ?.filter((item) => {
            const itemDate = new Date(item?.attributes?.expense_date);
            return (
                isAfter(itemDate, julyStartDate) &&
                isBefore(itemDate, julyEndDate)
            );
        })
        ?.reduce((acc, el) => {
            acc += el.attributes.amount;
            return acc;
        }, 0);

    const julyData = julyOrders?.reduce(
        (acc, el) => {
            const selling_price = delve(el, 'attributes.selling_price');
            const net_cost = delve(el, 'attributes.net_cost');

            acc.shahuyt += selling_price;
            acc.inqnarjeq += net_cost;

            return acc;
        },
        { shahuyt: 0, inqnarjeq: 0 }
    );

    const augustOrders = deliveredOrders?.filter((item) => {
        const itemDate = new Date(item?.attributes?.deliver_date);
        return (
            isAfter(itemDate, augustStartDate) &&
            isBefore(itemDate, augustEndDate)
        );
    });

    const augustExpenses = expenses
        ?.filter((item) => {
            const itemDate = new Date(item?.attributes?.expense_date);
            return (
                isAfter(itemDate, augustStartDate) &&
                isBefore(itemDate, augustEndDate)
            );
        })
        ?.reduce((acc, el) => {
            acc += el.attributes.amount;
            return acc;
        }, 0);

    const augustData = augustOrders?.reduce(
        (acc, el) => {
            const selling_price = delve(el, 'attributes.selling_price');
            const net_cost = delve(el, 'attributes.net_cost');

            acc.shahuyt += selling_price;
            acc.inqnarjeq += net_cost;

            return acc;
        },
        { shahuyt: 0, inqnarjeq: 0 }
    );

    const septemberOrders = deliveredOrders?.filter((item) => {
        const itemDate = new Date(item?.attributes?.deliver_date);
        return (
            isAfter(itemDate, septemberStartDate) &&
            isBefore(itemDate, septemberEndDate)
        );
    });
    const septemberExpenses = expenses
        ?.filter((item) => {
            const itemDate = new Date(item?.attributes?.expense_date);
            return (
                isAfter(itemDate, septemberStartDate) &&
                isBefore(itemDate, septemberEndDate)
            );
        })
        ?.reduce((acc, el) => {
            acc += el.attributes.amount;
            return acc;
        }, 0);
    const septemberData = septemberOrders?.reduce(
        (acc, el) => {
            const selling_price = delve(el, 'attributes.selling_price');
            const net_cost = delve(el, 'attributes.net_cost');

            acc.shahuyt += selling_price;
            acc.inqnarjeq += net_cost;

            return acc;
        },
        { shahuyt: 0, inqnarjeq: 0 }
    );

    const data = [
        {
            name: 'Հունվար',
            Ծախս: 0,
            Ինքնարժեք: 0,
            Շահույթ: 0,
        },
        {
            name: 'Փետրվար',
            Ծախս: 0,
            Ինքնարժեք: 0,
            Շահույթ: 0,
        },
        {
            name: 'Մարտ',
            Ծախս: 0,
            Ինքնարժեք: 0,
            Շահույթ: 0,
        },
        {
            name: 'Ապրիլ',
            Ծախս: 0,
            Ինքնարժեք: 0,
            Շահույթ: 0,
        },
        {
            name: 'Մայիս',
            Ծախս: 0,
            Ինքնարժեք: 0,
            Շահույթ: 0,
        },
        {
            name: 'Հունիս',
            Ծախս: 0,
            Ինքնարժեք: 0,
            Շահույթ: 0,
        },
        {
            name: 'Հուլիս',
            Ծախս: julyExpenses || 0,
            Ինքնարժեք: julyData?.inqnarjeq || 0,
            Շահույթ: julyData?.shahuyt || 0,
        },
        {
            name: 'Օգոստոս',
            Ծախս: augustExpenses || 0,
            Ինքնարժեք: augustData?.inqnarjeq || 0,
            Շահույթ: augustData?.shahuyt || 0,
        },
        {
            name: 'Սեպտեմբեր',
            Ծախս: septemberExpenses || 0,
            Ինքնարժեք: septemberData?.inqnarjeq || 0,
            Շահույթ: septemberData?.shahuyt || 0,
        },
        {
            name: 'Հոկտեմբեր',
            Ծախս: 0,
            Ինքնարժեք: 0,
            Շահույթ: 0,
        },
        {
            name: 'Նոյեմբեր',
            Ծախս: 0,
            Ինքնարժեք: 0,
            Շահույթ: 0,
        },
        {
            name: 'Դեկտեմբեր',
            Ծախս: 0,
            Ինքնարժեք: 0,
            Շահույթ: 0,
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
                                    value={
                                        septemberExpenses && septemberData
                                            ? septemberData?.shahuyt -
                                              septemberData?.inqnarjeq -
                                              septemberExpenses
                                            : 0
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
                                    title='Մնացորդ'
                                    value={
                                        availableOrdersSum && orderedOrdersSum
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
    );
};

export default Home;
