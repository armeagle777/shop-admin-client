import { PlusOutlined } from '@ant-design/icons';
import { Button, Form, Select, InputNumber, DatePicker } from 'antd';
import axios from 'axios';
import React, { useState } from 'react';
import { isMobile } from 'react-device-detect';

const layout = {
  labelCol: {
    span: 8,
  },
  wrapperCol: {
    span: 16,
  },
};

const validateMessages = {
  required: '${label} պարտադիր է!',
  types: {
    email: '${label}֊ի ֆորմատը սխալ է',
    number: '${label} is not a valid number!',
  },
};

const AddExpenseForm = ({ onSubmit, onCancel, isLoadingAdd, form, eDOptions, dateFormat }) => {
  const onFinish = (values) => {
    onSubmit(values);
  };

  return (
    <Form
      {...layout}
      name="add-expenses-direction"
      validateMessages={validateMessages}
      onFinish={onFinish}
      labelCol={{
        span: 8,
      }}
      form={form}
    >
      <Form.Item
        name="amount"
        rules={[
          {
            required: true,
          },
        ]}
        style={{
          display: 'inline-block',
          width: '200px',
        }}
      >
        <InputNumber min={0} placeholder="Գումար" />
      </Form.Item>
      <Form.Item
        name="direction"
        rules={[
          {
            required: true,
          },
        ]}
        style={{
          display: 'inline-block',
          width: '220px',
        }}
      >
        <Select
          showSearch
          style={{
            width: 200,
          }}
          placeholder="Ուղղություն"
          optionFilterProp="children"
          filterOption={(input, option) => (option?.label.toLowerCase() ?? '').includes(input.toLocaleLowerCase())}
          filterSort={(optionA, optionB) =>
            (optionA?.label ?? '').toLowerCase().localeCompare((optionB?.label ?? '').toLowerCase())
          }
          options={eDOptions}
        />
      </Form.Item>

      <Form.Item
        name="expense_date"
        style={{
          display: 'inline-block',
          width: '320px',
        }}
      >
        <DatePicker format={dateFormat} placeholder="Ընտրեք ամսաթիվը" style={{ width: '100%' }} />
      </Form.Item>
      {/* <Button
        type="primary"
        htmlType="submit"
        loading={addItemMutation.isLoading}
        style={{ marginBottom: 16 }}
        disabled={isAddButtonDisabled}
      >
        Ավելացնել
      </Button> */}

      <Form.Item
        wrapperCol={{
          ...layout.wrapperCol,
          offset: isMobile ? 2 : 12,
        }}
      >
        <Button onClick={onCancel} style={{ marginRight: 10 }}>
          Չեղարկել
        </Button>
        <Button type="primary" htmlType="submit" loading={isLoadingAdd}>
          Հաստատել
        </Button>
      </Form.Item>
    </Form>
  );
};

export default AddExpenseForm;
