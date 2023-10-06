import { PlusOutlined } from '@ant-design/icons';
import { Button, Form, Input, InputNumber, Select, Space } from 'antd';
import React from 'react';

const FirstStepContent = ({
    setFormValues,
    categoriesOptions,
    shopsOptions,
}) => {
    return (
        <>
            <Form.Item
                name='name'
                label='Անուն'
                rules={[
                    {
                        required: true,
                        message: 'Պատվերի անունը պարտադիր է',
                        whitespace: true,
                    },
                ]}
            >
                <Input />
            </Form.Item>
            <Form.Item
                name='description'
                label='Չափս'
                rules={[
                    {
                        required: true,
                        message: 'Չափսը պարտադիր դաշտ է',
                        whitespace: true,
                    },
                ]}
            >
                <Input />
            </Form.Item>
            <Form.Item
                name='category'
                label='Կատեգորիա'
                rules={[
                    {
                        required: true,
                        message: 'Կատեգորիան պարտադիր է',
                    },
                ]}
            >
                <Select
                    // defaultValue='lucy'
                    style={{
                        width: 300,
                    }}
                    // onChange={handleChange}
                    options={categoriesOptions}
                />
            </Form.Item>
            <Form.Item
                name='shop'
                label='Խանութ'
                rules={[
                    {
                        required: true,
                        message: 'Խանութը պարտադիր դաշտ է',
                    },
                ]}
            >
                <Select
                    // defaultValue='lucy'
                    style={{
                        width: 300,
                    }}
                    // onChange={handleChange}
                    options={shopsOptions}
                />
            </Form.Item>
            <Form.Item
                name='net_cost'
                label='Ինքնարժեք'
                rules={[
                    {
                        type: 'number',
                        min: 0,
                        required: true,
                        message: 'Ինքնարժեքը պարտադիր դաշտ է',
                    },
                ]}
            >
                <InputNumber />
            </Form.Item>
            <Form.Item
                name='selling_price'
                label='Վաճառքի գին'
                rules={[
                    {
                        type: 'number',
                        min: 0,
                        required: true,
                        message: 'Վաճառքի գինը պարտադիր դաշտ է',
                    },
                ]}
            >
                <InputNumber />
            </Form.Item>
        </>
    );
};

export default FirstStepContent;
