import { DownloadOutlined, PlusOutlined } from '@ant-design/icons';
import {
    Button,
    Cascader,
    DatePicker,
    Form,
    Input,
    Modal,
    Select,
    Space,
} from 'antd';
import React, { useState } from 'react';
import AddCustomerForm from '../../components/shared/addCutomerForm/AddCustomerForm';
import { addCustomer } from '../../api/serverApi';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { toast } from 'react-toastify';
import { messages } from '../../utils/constants';

const SecondStepContent = ({ countriesOptions, customerOptions }) => {
    const [showAddCustomerModal, setShowAddCustomerModal] = useState(false);

    const [addCustomerForm] = Form.useForm();
    const onOpenCustomerModal = () => {
        setShowAddCustomerModal(true);
    };
    const onCloseCustomerModal = () => {
        setShowAddCustomerModal(false);
    };
    const dateFormat = 'DD/MM/YYYY';
    const queryClient = useQueryClient();
    const addItemMutation = useMutation((item) => addCustomer(item), {
        onSuccess: (data) => {
            if (data.data?.error) {
                return toast.error(data.data?.error || 'Սխալ է տեղի ունեցել', {
                    progress: undefined,
                });
            }
            queryClient.invalidateQueries('customers');
            toast.success(messages.customers.createSuccess, {
                progress: undefined,
            });
            setShowAddCustomerModal(false);
            addCustomerForm.resetFields();
        },
        onError: (error, variables, context, mutation) => {
            console.log('err:::::: ', error);

            toast.error(error.response?.data?.error?.message || error.message, {
                progress: undefined,
            });
        },
    });
    const onSubmit = (values) => {
        addItemMutation.mutate(values);
    };

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
            <Form.Item name='order_date' label='Պատվերի ա/թ'>
                <DatePicker
                    format={dateFormat}
                    placeholder='Ընտրեք ամսաթիվը'
                    style={{ width: '100%' }}
                />
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
                                width: 370,
                            }}
                            placeholder='Որոնել'
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
                            onClick={onOpenCustomerModal}
                        />
                    </Form.Item>
                </Space.Compact>
            </Form.Item>
            <Modal
                title='Ավելացնել նոր հաճախորդ'
                centered
                open={showAddCustomerModal}
                onCancel={onCloseCustomerModal}
                width={800}
                footer={null}
            >
                <AddCustomerForm
                    onCancel={onCloseCustomerModal}
                    onSubmit={onSubmit}
                    isLoadingAdd={addItemMutation.isLoading}
                    form={addCustomerForm}
                />
            </Modal>
        </>
    );
};

export default SecondStepContent;
