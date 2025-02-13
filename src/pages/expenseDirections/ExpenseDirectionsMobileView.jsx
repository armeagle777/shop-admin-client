import { Button, Form, Input, List, Skeleton, Space } from 'antd';
import {
  PlusOutlined,
  DeleteOutlined,
  DollarOutlined,
} from '@ant-design/icons';

import { PopConfirm } from '../../components';
import React from 'react';

const IconText = ({ icon, text }) => (
  <Space>
    {React.createElement(icon)}
    {text}
  </Space>
);

const ExpenseDirectionsMobileView = ({
  validateMessages,
  onFinish,
  newDirectionForm,
  addItemMutation,
  isLoading,
  modifiedData,
  handleDelete,
  showProgress,
  allowPopConfirm,
  setAllowPopConfirm,
  totalCount,
  currentPage,
  onPageChange,
}) => {
  return (
    <Space direction="vertical" style={{ width: '100%' }}>
      <Form
        name="add-category"
        validateMessages={validateMessages}
        onFinish={onFinish}
        form={newDirectionForm}
      >
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
            <Input placeholder="Նոր ուղղություն" />
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
          current: currentPage,
          total: totalCount,
          onChange: onPageChange,
        }}
        size="large"
        dataSource={modifiedData}
        itemLayout="vertical"
        renderItem={(item, index) => {
          const { key, name, expenses } = { ...item };
          const totalExpense = expenses?.data.reduce((acc, el) => {
            acc += el.attributes.amount;
            return acc;
          }, 0);
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
                        icon={DollarOutlined}
                        text={`${totalExpense} դրամ`}
                        key="list-vertical-total-expenses"
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

export default ExpenseDirectionsMobileView;
