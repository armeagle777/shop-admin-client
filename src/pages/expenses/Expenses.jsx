import { useState } from 'react';
import { toast } from 'react-toastify';
import { DeleteOutlined, EditOutlined } from '@ant-design/icons';
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import { Button, DatePicker, Form, InputNumber, Select, Space } from 'antd';
import {
    addExpense,
    deleteExpense,
    getExpenseDirections,
    getExpenses,
} from '../../api/serverApi';
import { messages } from '../../utils/constants';
import Alert from '../../components/alert/Alert';
import PopConfirm from '../../components/shared/popConfirm/PopConfirm';
import Table from '../../components/table/Table';
import { format } from 'date-fns';

const Expenses = () => {
    const [showProgress, setShowProgress] = useState(false);
    const [allowPopConfirm, setAllowPopConfirm] = useState(false);
    const { data, isFetching, isLoading, isError, error } = useQuery(
        ['expenses'],
        () => getExpenses(),
        {
            keepPreviousData: false,
        }
    );
    const { data: expenses = [], meta } = { ...data };
    const modifiedData = expenses.map(({ id, attributes }) => ({
        key: id,
        ...attributes,
    }));

    const {
        data: eDirections,
        isFetching: eDFetching,
        isLoading: eDIsLoading,
        _,
        __,
    } = useQuery(['expense-directions'], () => getExpenseDirections(), {
        keepPreviousData: true,
    });
    const isAddButtonDisabled = eDFetching || eDIsLoading;
    const { data: expenseDirections = [], meta: eDMeta } = { ...eDirections };
    const eDOptions = expenseDirections.map(({ id, attributes }) => ({
        value: id,
        label: attributes.name,
    }));

    const queryClient = useQueryClient();

    const [form] = Form.useForm();
    const [newExpenseForm] = Form.useForm();

    const dateFormat = 'DD/MM/YYYY';
    const validateMessages = {
        required: '${label} պարտադիր է!',
        types: {
            email: '${label}֊ի ֆորմատը սխալ է',
            number: '${label} is not a valid number!',
        },
        number: {
            range: '${label} must be between ${min} and ${max}',
        },
    };

    const deleteItemMutation = useMutation((itemId) => deleteExpense(itemId), {
        onSuccess: () => {
            queryClient.invalidateQueries('expenses');
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
    });

    const addItemMutation = useMutation((item) => addExpense(item), {
        onSuccess: (data) => {
            queryClient.invalidateQueries('expenses');
            toast.success(messages.customers.createSuccess, {
                progress: undefined,
            });
            newExpenseForm.resetFields();
        },
        onError: (error, variables, context, mutation) => {
            console.log('err:::::: ', error);

            toast.error(error.response?.data?.error?.message || error.message, {
                progress: undefined,
            });
        },
    });

    const handleDelete = (id) => {
        setShowProgress(true);
        deleteItemMutation.mutate(id);
    };

    const onFinish = (values) => {
        const expenseDate = values.expense_date;
        values.expense_date = expenseDate
            ? new Date(expenseDate.$d).toISOString()
            : new Date().toISOString();

        addItemMutation.mutate(values);
    };

    const columns = [
        {
            title: 'Ուղղություն',
            dataIndex: 'direction',
            render: (item) => item.data.attributes.name,
            width: '25%',
        },
        {
            title: 'Գումար',
            dataIndex: 'amount',
            width: '25%',
        },
        {
            title: 'Ա/թ',
            dataIndex: 'createdAt',
            render: (_, record) => {
                const create_date = record.createdAt;
                return format(new Date(create_date), 'dd-MM-yyy');
            },
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
                form={newExpenseForm}
                wrapperCol={{
                    span: 20,
                }}
                style={{
                    maxWidth: 900,
                }}
            >
                <Form.Item
                    name='amount'
                    rules={[
                        {
                            required: true,
                        },
                    ]}
                    style={{
                        display: 'inline-block',
                        width: '100px',
                    }}
                >
                    <InputNumber min={0} placeholder='Գումար' />
                </Form.Item>
                <Form.Item
                    name='direction'
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
                        placeholder='Ուղղություն'
                        optionFilterProp='children'
                        filterOption={(input, option) =>
                            (option?.label.toLowerCase() ?? '').includes(
                                input.toLocaleLowerCase()
                            )
                        }
                        filterSort={(optionA, optionB) =>
                            (optionA?.label ?? '')
                                .toLowerCase()
                                .localeCompare(
                                    (optionB?.label ?? '').toLowerCase()
                                )
                        }
                        options={eDOptions}
                    />
                </Form.Item>

                <Form.Item
                    name='expense_date'
                    style={{
                        display: 'inline-block',
                        width: '320px',
                    }}
                >
                    <DatePicker
                        format={dateFormat}
                        placeholder='Ընտրեք ամսաթիվը'
                        style={{ width: '100%' }}
                    />
                </Form.Item>
                <Button
                    type='primary'
                    htmlType='submit'
                    loading={addItemMutation.isLoading}
                    style={{ marginBottom: 16 }}
                    disabled={isAddButtonDisabled}
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

export default Expenses;
