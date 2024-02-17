import React from 'react';
import { DeleteOutlined, EditOutlined, PlusOutlined, StarOutlined } from '@ant-design/icons';
import { Button, Form, Input, List, Skeleton, Space } from 'antd';
import PopConfirm from '../../components/shared/popConfirm/PopConfirm';

const IconText = ({ icon, text }) => (
  <Space>
    {React.createElement(icon)}
    {text}
  </Space>
);

const CategoriesMobileView = ({
  validateMessages,
  onFinish,
  newCategoryForm,
  addItemMutation,
  isLoading,
  modifiedData,
  handleDelete,
  showProgress,
  allowPopConfirm,
  setAllowPopConfirm,
}) => {
  return (
    <Space direction="vertical" style={{ width: '100%' }}>
      <Form name="add-category" validateMessages={validateMessages} onFinish={onFinish} form={newCategoryForm}>
        <Space.Compact block style={{ justifyContent: 'center' }}>
          <Form.Item
            name="name"
            rules={[
              {
                required: true,
              },
            ]}
            style={{
              width: '80%',
            }}
          >
            <Input placeholder="Նոր կատեգորիա" />
          </Form.Item>
          <Button
            style={{ outline: 'none' }}
            type="primary"
            htmlType="submit"
            icon={<PlusOutlined />}
            loading={addItemMutation.isLoading}
          />
        </Space.Compact>
      </Form>
      <List
        pagination={{
          position: 'bottom',
          align: 'center',
        }}
        size="large"
        dataSource={modifiedData}
        itemLayout="vertical"
        renderItem={(item, index) => {
          const { key, name, orders } = { ...item };
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
                        key="list-vertical-total-categories"
                      />,
                    ]
                  : undefined
              }
            >
              <Skeleton loading={isLoading} active>
                <List.Item.Meta title={name} />
              </Skeleton>
            </List.Item>
          );
        }}
      />
    </Space>
  );
};

export default CategoriesMobileView;
