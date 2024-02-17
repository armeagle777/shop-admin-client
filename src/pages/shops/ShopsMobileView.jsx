import React from 'react';
import { Avatar, Button, FloatButton, List, Skeleton, Space } from 'antd';
import { DeleteOutlined, EditOutlined, PlusOutlined, StarOutlined } from '@ant-design/icons';
import PopConfirm from '../../components/shared/popConfirm/PopConfirm';

const IconText = ({ icon, text }) => (
  <Space>
    {React.createElement(icon)}
    {text}
  </Space>
);

const ShopsMobileView = ({
  modifiedData,
  isLoading,
  onOpenShopModal,
  handleDelete,
  showProgress,
  allowPopConfirm,
  setAllowPopConfirm,
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
          const { key, logo, name, url, orders } = { ...item };
          const avatarUrl = logo?.data?.attributes?.url;
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
                        icon={StarOutlined}
                        text={`${orders?.data?.length || 0} Պատվեր`}
                        key="list-vertical-total-orders"
                      />,
                    ]
                  : undefined
              }
            >
              <Skeleton loading={isLoading} active avatar>
                <List.Item.Meta
                  avatar={<Avatar src={avatarUrl} />}
                  title={
                    <a target="_blank" href={url}>
                      {name}
                    </a>
                  }
                  // description={item.description}
                />
                {/* {item.content} */}
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
        onClick={onOpenShopModal}
        icon={<PlusOutlined />}
      />
    </>
  );
};

export default ShopsMobileView;
