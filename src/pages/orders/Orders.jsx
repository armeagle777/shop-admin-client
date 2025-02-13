import React, { useEffect, useState } from 'react';
import { toast } from 'react-toastify';
import { PlusOutlined } from '@ant-design/icons';
import { BrowserView, MobileView } from 'react-device-detect';
import { useLocation, useNavigate } from 'react-router-dom';
import { FloatButton, Form, Input, Segmented } from 'antd';
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';

import { OrdersTable } from '../../components';
import {
  DEFAULT_PAGE,
  DEFAULT_PAGE_SIZE,
  messages,
} from '../../utils/constants';
import OrdersMobileView from './OrdersMobileView';
import { deleteOrder, getOrders } from '../../api/serverApi';
import {
  setgmentOptions,
  filterSegmentValues,
  segmentFilterValues,
  setgmentMobileOptions,
} from './Orders.constants';

import './orders.styles.css';

const Orders = () => {
  const [page, setPage] = useState(DEFAULT_PAGE);
  const [pageSize, setPageSize] = useState(DEFAULT_PAGE_SIZE);
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

  const queryClient = useQueryClient();
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
    window.history.replaceState(
      {},
      '',
      `${location.pathname}?${updatedParams}`,
    );
  }, [filter, location]);

  const { data, isLoading, isError, error } = useQuery(
    ['orders', filter, queryString, page, pageSize],
    () => getOrders({ filter, query: queryString, page, pageSize }),
    {
      keepPreviousData: false,
    },
  );

  const { data: ordersData = [], meta } = { ...data };
  const handleInputChange = (e) => {
    setSearchTerm(e.target.value);
    if (e.target.value === '') setQueryString('');
  };
  const onSegmentChange = (e) => {
    setPage(DEFAULT_PAGE);
    setPageSize(DEFAULT_PAGE_SIZE);
    setFilter(segmentFilterValues[e]);
    setQueryString('');
    setSearchTerm('');
  };
  const { Search } = Input;

  const handleDelete = (id) => {
    setShowProgress(true);
    deleteItemMutation.mutate(id);
  };

  const deleteItemMutation = useMutation((itemId) => deleteOrder(itemId), {
    onSuccess: () => {
      queryClient.invalidateQueries(['orders']);
      toast.success(messages.shops.deleteSuccess, {
        progress: undefined,
      });
      setShowProgress(false);
      setAllowPopConfirm(false);
    },
    onError: () => {
      toast.error(messages.shops.deleteError, {
        progress: undefined,
      });
      setShowProgress(false);
      setAllowPopConfirm(false);
    },
  });

  const pageChangeHandle = (page, pageSize) => {
    setPage(page);
  };

  const pageSizeChangeHandler = (current, size) => {
    setPageSize(size);
  };

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
        <OrdersTable
          data={ordersData}
          queryString={queryString}
          isLoading={isLoading}
          error={error}
          isError={isError}
          form={form}
          filter={filter}
          totalCount={meta?.pagination?.total}
          pageSize={meta?.pagination?.pageSize}
          currentPage={meta?.pagination?.page}
          onPageChange={pageChangeHandle}
          onPageSizeChange={pageSizeChangeHandler}
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
        <OrdersMobileView
          queryString={queryString}
          showProgress={showProgress}
          setShowProgress={setShowProgress}
          filteredData={ordersData}
          handleDelete={handleDelete}
          filter={filter}
          totalCount={meta?.pagination?.total}
          currentPage={meta?.pagination?.page}
          onPageChange={pageChangeHandle}
        />
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
