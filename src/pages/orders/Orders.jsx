import { useQuery } from '@tanstack/react-query';
import {
    Avatar,
    FloatButton,
    Form,
    List,
    Segmented,
    Space,
    Typography,
} from 'antd';
import React, { useEffect, useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { getOrders } from '../../api/serverApi';
import OrderesTable from './OrderesTable';
import {
    filterSegmentValues,
    segmentFilterValues,
    setgmentOptions,
    tabFilterValues,
} from './Orders.constants';

import {
    LikeOutlined,
    MessageOutlined,
    PlusOutlined,
    StarOutlined,
} from '@ant-design/icons';
import { BrowserView, MobileView, isMobile } from 'react-device-detect';
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

    const onSegmentChange = (e) => {
        setFilter(segmentFilterValues[e]);
    };

    const filteredData = data.filter((o) => o?.attributes?.status === filter);

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
                    data={filteredData}
                    isLoading={isLoading}
                    error={error}
                    isError={isError}
                    form={form}
                    filter={filter}
                />
            </BrowserView>
            <MobileView></MobileView>
            <FloatButton
                shape='circle'
                type='primary'
                style={{
                    right: isMobile ? 20 : 94,
                }}
                onClick={handleNavigate}
                icon={<PlusOutlined />}
                tooltip={<div>Ավելացնել</div>}
            />
        </>
    );
};

export default Orders;
