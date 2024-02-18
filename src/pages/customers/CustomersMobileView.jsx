import React from 'react';
import { Avatar, Button, FloatButton, List, Skeleton, Space } from 'antd';
import { DeleteOutlined, EditOutlined, PlusOutlined, PhoneOutlined } from '@ant-design/icons';
import PopConfirm from '../../components/shared/popConfirm/PopConfirm';
import { Link } from 'react-router-dom';
import { formatImageUrl } from '../../utils/helpers';

const IconText = ({ icon, text }) => (
  <Space>
    {React.createElement(icon)}
    {text}
  </Space>
);

const CustomersMobileView = ({
  setAllowPopConfirm,
  allowPopConfirm,
  modifiedData,
  isLoading,
  handleDelete,
  showProgress,
  onOpenCustomerModal,
}) => {
  return (
    <>
      <List
        pagination={{
          position: 'bottom',
          align: 'center',
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
          console.log('addresses:::::: ', addresses);

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
                        text={<a href={`tel:${phone_number}`}>{phone_number}</a>}
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
                  description={addresses?.data ? addresses?.data[0].attributes.street : ''}
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
