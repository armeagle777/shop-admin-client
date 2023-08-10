import { PlusOutlined } from '@ant-design/icons';
import { Button, Form, Input, Upload } from 'antd';
import axios from 'axios';
import React, { useState } from 'react';

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

const AddShopForm = ({ onSubmit, onCancel, isLoadingAdd, form }) => {
    const [uploadedFileId, setUploadedFileId] = useState(undefined);

    const fileUploadUrl = `${import.meta.env.VITE_SERVER_URL}/upload`;

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
            name='create-shop'
            onFinish={onFinish}
            style={{
                maxWidth: 600,
            }}
            validateMessages={validateMessages}
            form={form}
        >
            <Form.Item
                name={['shop', 'logo']}
                label='Նկար'
                valuePropName={['shop', 'logo']}
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
                        form.setFieldValue(['shop', 'logo'], fileId);
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
                name={['shop', 'name']}
                label='Խանութի անունը'
                rules={[
                    {
                        required: true,
                    },
                ]}
            >
                <Input />
            </Form.Item>
            <Form.Item
                name={['shop', 'url']}
                label='Խանութի url-ը'
                rules={[
                    {
                        required: true,
                    },
                ]}
            >
                <Input />
            </Form.Item>
            <Form.Item
                wrapperCol={{
                    ...layout.wrapperCol,
                    offset: 12,
                }}
            >
                <Button onClick={onCancel} style={{ marginRight: 10 }}>
                    Չեղարկել
                </Button>
                <Button type='primary' htmlType='submit' loading={isLoadingAdd}>
                    Հաստատել
                </Button>
            </Form.Item>
        </Form>
    );
};

export default AddShopForm;
