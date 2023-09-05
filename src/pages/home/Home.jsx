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

const data = [
    {
        name: 'Page A',
        uv: 4000,
        pv: 2400,
        amt: 2400,
    },
    {
        name: 'Page B',
        uv: 3000,
        pv: 1398,
        amt: 2210,
    },
    {
        name: 'Page C',
        uv: 2000,
        pv: 9800,
        amt: 2290,
    },
    {
        name: 'Page D',
        uv: 2780,
        pv: 3908,
        amt: 2000,
    },
    {
        name: 'Page E',
        uv: 1890,
        pv: 4800,
        amt: 2181,
    },
    {
        name: 'Page F',
        uv: 2390,
        pv: 3800,
        amt: 2500,
    },
    {
        name: 'Page G',
        uv: 3490,
        pv: 4300,
        amt: 2100,
    },
];

const Home = () => {
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
                                    value={112893}
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
                                    dataKey='uv'
                                    stackId='1'
                                    stroke='#8884d8'
                                    fill='#8884d8'
                                />
                                <Area
                                    type='monotone'
                                    dataKey='pv'
                                    stackId='1'
                                    stroke='#82ca9d'
                                    fill='#82ca9d'
                                />
                                <Area
                                    type='monotone'
                                    dataKey='amt'
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
                                    value={112893}
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
