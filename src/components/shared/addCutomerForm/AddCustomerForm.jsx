import React, { useEffect, useState } from 'react';
import axios from 'axios';
import {
    Button,
    Form,
    Input,
    InputNumber,
    Upload,
    Space,
    Select,
    Cascader,
} from 'antd';
import { PlusOutlined, MinusCircleOutlined } from '@ant-design/icons';
import { useQuery } from '@tanstack/react-query';
import { getCountries } from '../../../api/serverApi';
import { formatCountriesData } from '../../../utils/helpers';

const layout = {
    labelCol: {
        span: 8,
    },
    wrapperCol: {
        span: 16,
    },
};

const validatePhoneNumber = (rule, value, callback) => {
    const emailRegex = /^(\d{6})$/;
    if (!value || emailRegex.test(value)) {
        callback();
    } else {
        callback('Հեռախոսահամարի ճիշտ ֆորմատն է XXYYZZ:');
    }
};

const validateMessages = {
    required: '${label} պարտադիր է!',
    types: {
        email: '${label}֊ի ֆորմատը սխալ է',
        number: '${label} is not a valid number!',
    },
    // number: {
    //     range: '${label} must be between ${min} and ${max}',
    // },
};

const prefixSelector = (
    <Form.Item name='phone_code' noStyle>
        <Select style={{ width: 70 }}>
            <Select.Option value='010'>010</Select.Option>
            <Select.Option value='011'>011</Select.Option>
            <Select.Option value='012'>012</Select.Option>
            <Select.Option value='033'>033</Select.Option>
            <Select.Option value='041'>041</Select.Option>
            <Select.Option value='044'>044</Select.Option>
            <Select.Option value='055'>055</Select.Option>
            <Select.Option value='077'>077</Select.Option>
            <Select.Option value='091'>091</Select.Option>
            <Select.Option value='093'>093</Select.Option>
            <Select.Option value='094'>094</Select.Option>
            <Select.Option value='095'>095</Select.Option>
            <Select.Option value='096'>096</Select.Option>
            <Select.Option value='097'>097</Select.Option>
            <Select.Option value='098'>098</Select.Option>
            <Select.Option value='099'>099</Select.Option>
        </Select>
    </Form.Item>
);

const AddCustomerForm = ({ onSubmit, onCancel, isLoadingAdd, form }) => {
    const [uploadedFileId, setUploadedFileId] = useState(undefined);
    const {
        data: countries,
        isLoading,
        isFetching,
        error,
        isError,
    } = useQuery(['countries'], getCountries, {
        keepPreviousData: true,
    });

    const disabledSubmitButton = isLoading || isFetching;

    const countriesOptions = formatCountriesData(countries);

    const fileUploadUrl = `${import.meta.env.VITE_SERVER_URL}/upload`;
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

    const onFinish = (values) => {
        onSubmit(values);
    };

    const normFile = (e) => {
        console.log('e:::::: ', e);

        if (Array.isArray(e)) {
            return e;
        }
        return e?.files;
    };

    return (
        <Form
            {...layout}
            name='create-customer'
            onFinish={onFinish}
            style={{
                maxWidth: 600,
            }}
            validateMessages={validateMessages}
            initialValues={{ phone_code: '093' }}
            form={form}
        >
            <Form.Item
                name={['customer', 'image']}
                label='Նկար'
                valuePropName={['customer', 'image']}
                getValueFromEvent={normFile}
            >
                <Upload
                    accept='.png,.jpeg,.jpg'
                    name='files'
                    action={fileUploadUrl}
                    listType='picture-card'
                    multiple={false}
                    maxCount={1}
                    onChange={async (res) => {
                        if (!res.file?.response) return;
                        const fileId = res.file?.response[0].id;
                        setUploadedFileId(fileId);
                        form.setFieldValue(['customer', 'image'], fileId);
                    }}
                    onRemove={async (file) => {
                        if (!uploadedFileId) return;
                        const res = await axios.delete(
                            `${fileUploadUrl}/files/${uploadedFileId}`
                        );
                    }}
                >
                    <div>
                        <PlusOutlined />
                        <div
                            style={{
                                marginTop: 8,
                            }}
                        >
                            Բեռնել
                        </div>
                    </div>
                </Upload>
            </Form.Item>
            <Form.Item
                name={['customer', 'first_name']}
                label='Անուն'
                rules={[
                    {
                        required: true,
                    },
                ]}
            >
                <Input />
            </Form.Item>
            <Form.Item
                name={['customer', 'last_name']}
                label='Ազգանուն'
                rules={[
                    {
                        required: true,
                    },
                ]}
            >
                <Input />
            </Form.Item>
            <Form.Item
                name={['customer', 'phone', 'number']}
                label='Հեռ․'
                rules={[
                    {
                        required: true,
                    },
                    {
                        validator: validatePhoneNumber,
                    },
                ]}
                extra={<span>ճիշտ ֆորմատն է 887755</span>}
            >
                <Input addonBefore={prefixSelector} style={{ width: '100%' }} />
            </Form.Item>
            <Form.Item label='Հասցե'>
                <Form.Item
                    name={['customer', 'address', 'district']}
                    style={{
                        display: 'inline-block',
                        width: 'calc(50% - 8px)',
                    }}
                >
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
                <Form.Item
                    name={['customer', 'address', 'street']}
                    style={{
                        display: 'inline-block',
                        width: 'calc(30% - 8px)',
                        margin: '0 8px',
                    }}
                >
                    <Input placeholder='Մուտքագրել հասցեն' />
                </Form.Item>
                <Form.Item
                    name={['customer', 'address', 'index']}
                    style={{
                        display: 'inline-block',
                        width: 'calc(20% - 8px)',
                    }}
                >
                    <Input placeholder='index' />
                </Form.Item>
            </Form.Item>
            <Form.List name={['customer', 'contacts']}>
                {(fields, { add, remove }) => (
                    <div
                        style={{
                            width: '100%',
                            display: 'flex',
                            flexDirection: 'column',
                            alignItems: 'center',
                            justifyContent: 'flex-start',
                            gap: 5,
                        }}
                    >
                        {fields.map(({ key, name, ...restField }) => (
                            <div
                                key={key}
                                style={{
                                    display: 'flex',
                                    flexDirection: 'row',
                                    justifyContent: 'space-between',
                                    width: '35%',
                                    height: 35,
                                }}
                            >
                                <Form.Item
                                    key={key}
                                    {...restField}
                                    name={[name, 'phone_number']}
                                    rules={[
                                        {
                                            required: true,
                                            message: 'Missing first name',
                                        },
                                    ]}
                                >
                                    <Input
                                        placeholder='Կոնտակտ'
                                        style={{ minWidth: '180px' }}
                                    />
                                </Form.Item>
                                <MinusCircleOutlined
                                    onClick={() => remove(name)}
                                />
                            </div>
                        ))}
                        <Form.Item>
                            <Button
                                type='dashed'
                                onClick={() => add()}
                                // block
                                icon={<PlusOutlined />}
                            >
                                Կոնտակտ
                            </Button>
                        </Form.Item>
                    </div>
                )}
            </Form.List>
            <Form.Item
                wrapperCol={{
                    ...layout.wrapperCol,
                    offset: 12,
                }}
            >
                <Button onClick={onCancel} style={{ marginRight: 10 }}>
                    Չեղարկել
                </Button>
                <Button
                    type='primary'
                    htmlType='submit'
                    loading={isLoadingAdd}
                    disabled={disabledSubmitButton}
                >
                    Հաստատել
                </Button>
            </Form.Item>
        </Form>
    );
};

export default AddCustomerForm;
