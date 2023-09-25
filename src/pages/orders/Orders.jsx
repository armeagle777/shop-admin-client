import { useQuery } from '@tanstack/react-query';
import { FloatButton, Form, Segmented } from 'antd';
import React, { useEffect, useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { getOrders } from '../../api/serverApi';
import OrderesTable from './OrderesTable';
import {
    filterSegmentValues,
    segmentFilterValues,
    setgmentOptions,
    setgmentMobileOptions,
} from './Orders.constants';

import { PlusOutlined } from '@ant-design/icons';
import { BrowserView, MobileView } from 'react-device-detect';
import OrdersMobileView from './OrdersMobileView';
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
    } = useQuery(['orders', { filter }], () => getOrders(filter), {
        keepPreviousData: false,
    });

    const onSegmentChange = (e) => {
        setFilter(segmentFilterValues[e]);
    };

    return (
        <>
            <BrowserView>
                <Segmented
                    onChange={onSegmentChange}
                    block
                    options={setgmentOptions}
                    defaultValue={filterSegmentValues[filter]}
                    style={{ marginBottom: 10 }}
                />
                <OrderesTable
                    data={data}
                    isLoading={isLoading}
                    error={error}
                    isError={isError}
                    form={form}
                    filter={filter}
                />
            </BrowserView>
            <MobileView>
                <Segmented
                    onChange={onSegmentChange}
                    block
                    options={setgmentMobileOptions}
                    defaultValue={filterSegmentValues[filter]}
                    style={{ marginBottom: 10 }}
                />
                <OrdersMobileView filteredData={data} />
            </MobileView>
            <FloatButton
                shape='square'
                type='primary'
                style={{
                    // right: isMobile ? 20 : 150,
                    position: 'fixed',
                    right: 0,
                    bottom: 200,
                }}
                onClick={handleNavigate}
                icon={<PlusOutlined />}
                tooltip={<div>Ավելացնել</div>}
            />
        </>
    );
};

export default Orders;
