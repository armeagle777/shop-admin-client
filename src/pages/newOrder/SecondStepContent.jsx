import { DownloadOutlined, PlusOutlined } from '@ant-design/icons';
import { Button, Cascader, Form, Input, Select, Space } from 'antd';
import React from 'react';

const SecondStepContent = () => {
    const options = [
        {
            value: 1,
            label: 'ՀՀ',
            children: [
                {
                    value: 8,
                    label: 'Կոտայք',
                    children: [
                        {
                            value: 'Աբովյան',
                            label: 'Աբովյան',
                        },
                        {
                            value: 3,
                            label: 'Գառնի',
                        },
                    ],
                },
            ],
        },
        {
            value: 2,
            label: 'ԼՂՀ',
            children: [
                {
                    value: 'Ասկերան',
                    label: 'Ասկերան',
                    children: [
                        {
                            value: 'Պատարա',
                            label: 'Պատարա',
                        },
                        {
                            value: 'Ասկերան',
                            label: 'Ասկերան',
                        },
                    ],
                },
                {
                    value: 'Մարտակերտ',
                    label: 'Մարտակերտ',
                    children: [
                        {
                            value: 'Մարտակերտ',
                            label: 'Մարտակերտ',
                        },
                        {
                            value: 'Դրմբոն',
                            label: 'Դրմբոն',
                        },
                    ],
                },
            ],
        },
    ];
    const onChange = (value, selectedOptions) => {
        console.log(value, selectedOptions);
    };

    const filter = (inputValue, path) =>
        path.some(
            (option) =>
                option.label.toLowerCase().indexOf(inputValue.toLowerCase()) >
                -1
        );
    return (
        <>
            <Form.Item
                name='reference_url'
                label='Ապրանքի link-ը'
                rules={[
                    {
                        whitespace: true,
                    },
                ]}
            >
                <Input />
            </Form.Item>
            <Form.Item
                name='tracking_id'
                label='Բեռնակրման համար'
                rules={[
                    {
                        whitespace: true,
                    },
                ]}
            >
                <Input />
            </Form.Item>
            <Form.Item name={['address', 'district']} label='Հասցե:երկիր'>
                <Cascader
                    options={options}
                    onChange={onChange}
                    placeholder='Երկիր/մարզ/համայնք'
                    showSearch={{
                        filter,
                    }}
                    onSearch={(value) => console.log(value)}
                />
            </Form.Item>
            <Form.Item name={['address', 'street']} label='Հասցե: փողոց'>
                <Input placeholder='Մուտքագրել հասցեն' />
            </Form.Item>
            <Form.Item name={['address', 'index']} label='Հասցե։ինդեքս'>
                <Input placeholder='index' />
            </Form.Item>
            <Form.Item
                label='Հաճախորդ'
                rules={[
                    {
                        required: true,
                        message: 'Պարտադիր դաշտ է',
                    },
                ]}
            >
                <Space.Compact
                    style={{
                        width: '100%',
                    }}
                >
                    <Form.Item
                        name='customer'
                        rules={[
                            {
                                required: true,
                                message: 'Պարտադիր դաշտ է',
                            },
                        ]}
                    >
                        <Select
                            showSearch
                            style={{
                                width: 200,
                            }}
                            placeholder='Search to Select'
                            optionFilterProp='children'
                            filterOption={(input, option) =>
                                (option?.label ?? '').includes(input)
                            }
                            filterSort={(optionA, optionB) =>
                                (optionA?.label ?? '')
                                    .toLowerCase()
                                    .localeCompare(
                                        (optionB?.label ?? '').toLowerCase()
                                    )
                            }
                            options={[
                                {
                                    value: 21,
                                    label: 'Not Identified',
                                },
                                {
                                    value: 22,
                                    label: 'Closed',
                                },
                                {
                                    value: 23,
                                    label: 'Communicated',
                                },
                                {
                                    value: 24,
                                    label: 'Identified',
                                },
                                {
                                    value: 25,
                                    label: 'Resolved',
                                },
                                {
                                    value: 26,
                                    label: 'Cancelled',
                                },
                            ]}
                        />
                    </Form.Item>
                    <Form.Item>
                        <Button
                            type='primary'
                            icon={<PlusOutlined />}
                            size='medium'
                        />
                    </Form.Item>
                </Space.Compact>
            </Form.Item>
        </>
    );
};

export default SecondStepContent;
