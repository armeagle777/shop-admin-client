import { DownloadOutlined, PlusOutlined } from '@ant-design/icons';
import { Button, Cascader, Form, Input, Select, Space } from 'antd';
import React from 'react';

const SecondStepContent = ({ countriesOptions, customerOptions }) => {
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
                    options={countriesOptions}
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
                                (option?.label?.toLowerCase() ?? '').includes(
                                    input.toLowerCase()
                                )
                            }
                            filterSort={(optionA, optionB) =>
                                (optionA?.label ?? '')
                                    .toLowerCase()
                                    .localeCompare(
                                        (optionB?.label ?? '').toLowerCase()
                                    )
                            }
                            options={customerOptions}
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
