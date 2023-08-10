import { useEffect, useState } from 'react';
import { useQuery } from '@tanstack/react-query';
import { Button, Form, Tabs } from 'antd';
import { useLocation, useNavigate } from 'react-router-dom';
import { getOrders } from '../../api/serverApi';
import { filterTabsValue, items, tabFilterValues } from './Orders.constants';
import OrderesTable from './OrderesTable';

import './orders.styles.css';

const Orders = () => {
    const navigate = useNavigate();
    const location = useLocation();
    const queryParams = new URLSearchParams(location.search);
    const [form] = Form.useForm();
    const [filter, setFilter] = useState(
        queryParams.get('filter') || 'ORDERED'
    );
    const handleNavigate = () => {
        navigate('/orders/new-order');
    };

    useEffect(() => {
        const updatedParams = new URLSearchParams(location.search);
        if (filter) {
            updatedParams.set('filter', filter);
        } else {
            updatedParams.delete('filter');
        }
        window.history.replaceState(
            {},
            '',
            `${location.pathname}?${updatedParams}`
        );
    }, [filter, location]);

    const {
        data = [],
        isLoading,
        isError,
        error,
    } = useQuery(['orders', { filter }], () => getOrders(), {
        keepPreviousData: true,
    });

    const onTabChange = (e) => {
        setFilter(tabFilterValues[e]);
    };

    const filteredData = data.filter((o) => o?.attributes?.status === filter);

    return (
        <>
            <Tabs
                tabBarExtraContent={{
                    left: (
                        <Button
                            type='primary'
                            htmlType='submit'
                            onClick={handleNavigate}
                            className='tabs-extra-demo-button'
                        >
                            Ավելացնել
                        </Button>
                    ),
                }}
                items={items}
                tabBarGutter={20}
                onChange={onTabChange}
                defaultActiveKey={filterTabsValue[filter] || 1}
            />
            <OrderesTable
                data={filteredData}
                isLoading={isLoading}
                error={error}
                isError={isError}
                form={form}
                filter={filter}
            />
        </>
    );
};

export default Orders;
