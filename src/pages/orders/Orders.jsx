import { useQuery } from '@tanstack/react-query';
import { FloatButton, Form, Segmented, Input } from 'antd';
import React, { useEffect, useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { getOrders } from '../../api/serverApi';
import OrderesTable from './OrderesTable';
import { filterSegmentValues, segmentFilterValues, setgmentOptions, setgmentMobileOptions } from './Orders.constants';

import { PlusOutlined } from '@ant-design/icons';
import { BrowserView, MobileView } from 'react-device-detect';
import OrdersMobileView from './OrdersMobileView';
import './orders.styles.css';

const Orders = () => {
  const [showProgress, setShowProgress] = useState(false);
  const [searchTerm, setSearchTerm] = useState('');
  const [queryString, setQueryString] = useState('');
  const [allowPopConfirm, setAllowPopConfirm] = useState(false);
  const navigate = useNavigate();
  const location = useLocation();
  const queryParams = new URLSearchParams(location.search);
  const [form] = Form.useForm();
  const [filter, setFilter] = useState(queryParams.get('filter') || 'ORDERED');
  const handleNavigate = () => {
    navigate('/orders/new-order');
  };
  const handleSearch = () => {
    const url = new URL(window.location);

    if (searchTerm.trim() === '') {
      url.searchParams.delete('query');
    } else {
      url.searchParams.set('query', searchTerm);
    }

    window.history.pushState({}, '', url);
    setQueryString(searchTerm.trim());
  };

  useEffect(() => {
    const url = new URL(window.location);
    const query = url.searchParams.get('query');
    setSearchTerm(query || '');
    setQueryString(query);
  }, []);

  useEffect(() => {
    const updatedParams = new URLSearchParams(location.search);
    if (filter) {
      updatedParams.set('filter', filter);
    } else {
      updatedParams.delete('filter');
    }
    window.history.replaceState({}, '', `${location.pathname}?${updatedParams}`);
  }, [filter, location]);

  const {
    data = [],
    isLoading,
    isError,
    error,
  } = useQuery(['orders', filter, queryString], () => getOrders({ filter, query: queryString }), {
    keepPreviousData: false,
  });
  const handleInputChange = (e) => {
    setSearchTerm(e.target.value);
    if (e.target.value === '') setQueryString('');
  };
  const onSegmentChange = (e) => {
    setFilter(segmentFilterValues[e]);
    setQueryString('');
    setSearchTerm('');
  };
  const { Search } = Input;

  return (
    <>
      <BrowserView>
        <div style={{ width: 400, marginBottom: 20 }}>
          <Search
            placeholder="Որոնում"
            allowClear={false}
            enterButton="Որոնել"
            size="large"
            value={searchTerm}
            onChange={handleInputChange}
            onSearch={handleSearch}
          />
        </div>
        <Segmented
          onChange={onSegmentChange}
          block
          options={setgmentOptions}
          defaultValue={filterSegmentValues[filter]}
          style={{ marginBottom: 10 }}
        />
        <OrderesTable
          data={data}
          queryString={queryString}
          isLoading={isLoading}
          error={error}
          isError={isError}
          form={form}
          filter={filter}
        />
      </BrowserView>
      <MobileView>
        <Search
          placeholder="Որոնում"
          allowClear={false}
          enterButton="Որոնել"
          size="large"
          value={searchTerm}
          onChange={handleInputChange}
          onSearch={handleSearch}
          style={{ marginBottom: 10 }}
        />
        <Segmented
          onChange={onSegmentChange}
          block
          options={setgmentMobileOptions}
          defaultValue={filterSegmentValues[filter]}
          style={{ marginBottom: 10 }}
        />
        <OrdersMobileView showProgress={showProgress} filteredData={data} />
      </MobileView>
      <FloatButton
        shape="square"
        type="primary"
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
