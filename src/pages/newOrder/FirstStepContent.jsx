import { PlusOutlined } from '@ant-design/icons';
import { Button, Form, Input, InputNumber, Select, Space } from 'antd';
import React from 'react';

const FirstStepContent = ({ setFormValues }) => {
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
                label='Նկարագրություն'
                rules={[
                    {
                        required: true,
                        message: 'Նկարագրությունը պարտադիր դաշտ է',
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
                        width: 150,
                    }}
                    // onChange={handleChange}
                    options={[
                        {
                            value: 1,
                            label: 'Jack',
                        },
                        {
                            value: 2,
                            label: 'Lucy',
                        },
                        {
                            value: 3,
                            label: 'yiminghe',
                        },
                        {
                            value: 4,
                            label: 'Disabled',
                        },
                    ]}
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
                        width: 150,
                    }}
                    // onChange={handleChange}
                    options={[
                        {
                            value: 4,
                            label: 'Jack',
                        },
                        {
                            value: 5,
                            label: 'Lucy',
                        },
                        {
                            value: 6,
                            label: 'yiminghe',
                        },
                        {
                            value: 7,
                            label: 'Disabled',
                        },
                    ]}
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
