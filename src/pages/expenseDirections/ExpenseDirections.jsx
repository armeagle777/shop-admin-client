import { useState } from 'react';
import { toast } from 'react-toastify';
import { Button, Form, Input, Space } from 'antd';
import { DeleteOutlined, EditOutlined } from '@ant-design/icons';
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import {
    addExpenseDirection,
    deleteExpenseDirections,
    getExpenseDirections,
} from '../../api/serverApi';
import { messages } from '../../utils/constants';
import Alert from '../../components/alert/Alert';
import Table from '../../components/table/Table';
import PopConfirm from '../../components/shared/popConfirm/PopConfirm';

const ExpenseDirections = () => {
    const queryClient = useQueryClient();
    const [showProgress, setShowProgress] = useState(false);
    const [allowPopConfirm, setAllowPopConfirm] = useState(false);
    const { data, isLoading, isError, error } = useQuery(
        ['expense-directions'],
        () => getExpenseDirections(),
        {
            keepPreviousData: false,
        }
    );

    const validateMessages = {
        required: '${label} պարտադիր է!',
        types: {
            email: '${label}֊ի ֆորմատը սխալ է',
            number: '${label} is not a valid number!',
        },
    };

    const { data: expenseDirections = [], meta } = { ...data };
    const modifiedData = expenseDirections.map(({ id, attributes }) => ({
        key: id,
        ...attributes,
    }));

    const [form] = Form.useForm();
    const [newDirectionForm] = Form.useForm();

    const deleteItemMutation = useMutation(
        (itemId) => deleteExpenseDirections(itemId),
        {
            onSuccess: () => {
                queryClient.invalidateQueries('expense-directions');
                toast.success(messages.shops.deleteSuccess, {
                    progress: undefined,
                });
                setShowProgress(false);
                setAllowPopConfirm(false);
            },
            onError: () => {
                toast.error(messages.shops.deleteError, {
                    progress: undefined,
                });
                setShowProgress(false);
                setAllowPopConfirm(false);
            },
        }
    );

    const handleDelete = (id) => {
        setShowProgress(true);
        deleteItemMutation.mutate(id);
    };

    const onFinish = (values) => {
        addItemMutation.mutate(values);
    };

    const addItemMutation = useMutation((item) => addExpenseDirection(item), {
        onSuccess: (data) => {
            queryClient.invalidateQueries('expense-directions');
            toast.success(messages.customers.createSuccess, {
                progress: undefined,
            });
            newDirectionForm.resetFields();
        },
        onError: (error, variables, context, mutation) => {
            console.log('err:::::: ', error);

            toast.error(error.response?.data?.error?.message || error.message, {
                progress: undefined,
            });
        },
    });

    const columns = [
        {
            title: 'Ուղղություն',
            dataIndex: 'name',
            width: '25%',
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
            <Form
                name='add-expenses-direction'
                validateMessages={validateMessages}
                onFinish={onFinish}
                labelCol={{
                    span: 8,
                }}
                form={newDirectionForm}
                wrapperCol={{
                    span: 20,
                }}
                style={{
                    maxWidth: 600,
                }}
            >
                <Form.Item
                    name='name'
                    rules={[
                        {
                            required: true,
                        },
                    ]}
                    style={{
                        display: 'inline-block',
                        width: 'calc(50% - 8px)',
                        marginRight: 8,
                    }}
                >
                    <Input placeholder='Նոր ծախսի ուղղություն' />
                </Form.Item>
                <Button
                    type='primary'
                    htmlType='submit'
                    loading={addItemMutation.isLoading}
                    style={{ marginBottom: 16 }}
                >
                    Ավելացնել
                </Button>
            </Form>
            <Table
                loading={!!isLoading}
                columns={columns}
                dataSource={modifiedData}
                form={form}
                size='medium'
            />
        </>
    );
};
export default ExpenseDirections;
