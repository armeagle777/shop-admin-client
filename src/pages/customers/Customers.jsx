import { useState } from 'react';
import { toast } from 'react-toastify';
import { DeleteOutlined, EditOutlined } from '@ant-design/icons';
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import { Avatar, Button, Form, Modal, Space } from 'antd';
import { messages } from '../../utils/constants';
import { generateRandomColor } from '../../utils/helpers';
import { addCustomer, deleteCustomer, getCustomers } from '../../api/serverApi';
import Alert from '../../components/alert/Alert';
import AddCustomerForm from '../../components/shared/addCutomerForm/AddCustomerForm';
import PopConfirm from '../../components/shared/popConfirm/PopConfirm';
import Table from '../../components/table/Table';

const Customers = () => {
    const [showAddCustomerModal, setShowAddCustomerModal] = useState(false);
    const [showProgress, setShowProgress] = useState(false);
    const [allowPopConfirm, setAllowPopConfirm] = useState(false);
    const { data, isLoading, isError, error } = useQuery(
        ['customers'],
        () => getCustomers(),
        {
            keepPreviousData: true,
        }
    );
    const queryClient = useQueryClient();
    const [addCustomerForm] = Form.useForm();
    const { data: customers = [], meta } = { ...data };
    const modifiedData = customers.map(({ id, attributes }) => ({
        key: id,
        ...attributes,
    }));

    const [form] = Form.useForm();

    const onOpenCustomerModal = () => {
        setShowAddCustomerModal(true);
    };

    const onCloseCustomerModal = () => {
        setShowAddCustomerModal(false);
    };

    const onSubmit = (values) => {
        addItemMutation.mutate(values);
    };

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

    const deleteItemMutation = useMutation((itemId) => deleteCustomer(itemId), {
        onSuccess: () => {
            queryClient.invalidateQueries('customers');
            toast.success(messages.customers.deleteSuccess, {
                progress: undefined,
            });
            setShowProgress(false);
            setAllowPopConfirm(false);
        },
        onError: () => {
            toast.error(messages.customers.deleteError, {
                progress: undefined,
            });
            setShowProgress(false);
            setAllowPopConfirm(false);
        },
    });

    const handleDelete = (id) => {
        setShowProgress(true);
        deleteItemMutation.mutate(id);
    };

    const columns = [
        {
            title: 'Անուն Ազգանուն',
            dataIndex: 'full_name',
            width: '25%',
            render: (_, record) => (
                <span>
                    {record.first_name} {record.last_name}
                </span>
            ),
        },
        {
            title: 'Նկար',
            dataIndex: 'Avatar',
            width: '10%',
            render: (_, record) => {
                const src =
                    record.Avatar.data?.attributes?.formats?.thumbnail?.url ||
                    '';
                return (
                    <Avatar
                        style={{
                            backgroundColor: generateRandomColor(),
                            verticalAlign: 'middle',
                            border: 'none',
                        }}
                        size='large'
                        gap={2}
                        src={src}
                    >
                        {record.first_name || ''}
                    </Avatar>
                );
            },
        },
        {
            title: 'Հեռ․',
            dataIndex: 'phone_number',
            width: '40%',
        },

        {
            title: 'Գործողություններ',
            dataIndex: 'operation',
            render: (_, record) => {
                const itemId = record.key;
                return (
                    <Space>
                        <Button
                            icon={<EditOutlined />}
                            size='small'
                            title='Խմբագրել'
                            type='default'
                        />
                        <PopConfirm
                            loading={isLoading}
                            itemId={itemId}
                            onConfirm={handleDelete}
                            showProgress={showProgress}
                            allowPopConfirm={allowPopConfirm}
                            setAllowPopConfirm={setAllowPopConfirm}
                            icon={<DeleteOutlined />}
                            buttonTitle='Հեռացնել'
                        />
                    </Space>
                );
            },
        },
    ];

    if (isError) {
        return <Alert type='error' message={error.message} />;
    }

    return (
        <>
            <Button
                onClick={onOpenCustomerModal}
                type='primary'
                style={{
                    marginBottom: 16,
                }}
            >
                Ավելացնել
            </Button>
            <Table
                loading={!!isLoading}
                columns={columns}
                dataSource={modifiedData}
                form={form}
            />

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
export default Customers;
