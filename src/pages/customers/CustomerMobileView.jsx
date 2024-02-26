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
import { DollarOutlined, FieldTimeOutlined, GiftOutlined, SkinOutlined } from '@ant-design/icons';
import { format } from 'date-fns';
import { SmileOutlined } from '@ant-design/icons';
import { Timeline } from 'antd';
import { FaTshirt } from 'react-icons/fa';
import { BiDollar } from 'react-icons/bi';

const CustomerMobileView = ({
  error,
  Avatar,
  isError,
  contacts,
  addresses,
  last_name,
  isLoading,
  first_name,
  isFetching,
  customerId,
  phone_number,
}) => {
  const { Text, Link } = Typography;
  return (
    <>
      <div style={{ width: '100%', display: 'flex' }}>
        <div style={{ width: '80%' }}>
          {isLoading || isFetching ? (
            <Space
              direction="vertical"
              style={{
                width: '80%',
                paddingLeft: 130,
              }}
            >
              <Space>
                <Skeleton.Image active />
                <Skeleton.Node active />
              </Space>
              <Skeleton.Input active size="large" block />
              <Skeleton.Input active size="large" block />
              <Skeleton.Input active size="large" block />
              <Skeleton.Input active size="large" block />
              <Skeleton.Input active size="large" block />
              <Skeleton.Input active size="large" block />
              <Skeleton.Input active size="large" block />
              <Skeleton paragraph={{ rows: 2 }} />
              <Space style={{ paddingLeft: 100 }}>
                <Skeleton.Button active size="large" shape="square" block />
                <Skeleton.Button active size="large" shape="square" block />
              </Space>
            </Space>
          ) : (
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
          )}
        </div>
      </div>
    </>
  );
};

export default CustomerMobileView;
