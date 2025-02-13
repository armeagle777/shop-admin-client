import React from 'react';
import { Avatar, FloatButton, Input, List, Skeleton, Space } from 'antd';
import { DeleteOutlined, PhoneOutlined, PlusOutlined } from '@ant-design/icons';

import { Link } from 'react-router-dom';
import { formatImageUrl } from '../../utils/helpers';
import { PopConfirm } from '../../components';

const IconText = ({ icon, text }) => (
  <Space>
    {React.createElement(icon)}
    {text}
  </Space>
);

const CustomersMobileView = ({
  isLoading,
  searchTerm,
  modifiedData,
  handleDelete,
  showProgress,
  handleSearch,
  onPageChange,
  currentPage,
  totalCount,
  setSearchTerm,
  allowPopConfirm,
  setAllowPopConfirm,
  onOpenCustomerModal,
}) => {
  const { Search } = Input;
  const handleInputChange = (e) => {
    setSearchTerm(e.target.value);
  };
  return (
    <>
      <Search
        placeholder="Որոնում"
        allowClear
        enterButton="Որոնել"
        size="large"
        value={searchTerm}
        onChange={handleInputChange}
        onSearch={handleSearch}
      />
      <List
        pagination={{
          position: 'bottom',
          align: 'center',
          onChange: onPageChange,
          current: currentPage,
          total: totalCount,
        }}
        size="large"
        dataSource={modifiedData}
        itemLayout="vertical"
        renderItem={(item, index) => {
          const {
            key,
            phone_number,
            orders,
            first_name,
            last_name,
            contacts,
            addresses,
            Avatar: avatarImage,
          } = { ...item };
          const avatarUrl = avatarImage?.data?.attributes?.url || '';

          return (
            <List.Item
              key={key}
              actions={
                !isLoading
                  ? [
                      //   <Button
                      //       icon={<EditOutlined />}
                      //       size='small'
                      //       title='Խմբագրել'
                      //       type='default'
                      //   />,
                      <PopConfirm
                        loading={isLoading}
                        itemId={key}
                        onConfirm={handleDelete}
                        showProgress={showProgress}
                        allowPopConfirm={allowPopConfirm}
                        setAllowPopConfirm={setAllowPopConfirm}
                        icon={<DeleteOutlined />}
                        buttonTitle="Հեռացնել"
                      />,
                      <IconText
                        icon={PhoneOutlined}
                        text={
                          <a href={`tel:${phone_number}`}>{phone_number}</a>
                        }
                        key="list-vertical-total-orders"
                      />,
                    ]
                  : undefined
              }
            >
              <Skeleton loading={isLoading} active avatar>
                <List.Item.Meta
                  avatar={<Avatar src={formatImageUrl(avatarUrl)} />}
                  title={
                    <Link to={`/customers/${key}`}>
                      {first_name} {last_name}
                    </Link>
                  }
                  description={
                    addresses?.data.length
                      ? addresses?.data[0].attributes.street
                      : ''
                  }
                />
              </Skeleton>
            </List.Item>
          );
        }}
      />
      <FloatButton
        shape="circle"
        type="primary"
        style={{
          right: 20,
          bottom: 20,
          outline: 'none',
        }}
        onClick={onOpenCustomerModal}
        icon={<PlusOutlined />}
      />
    </>
  );
};

export default CustomersMobileView;
