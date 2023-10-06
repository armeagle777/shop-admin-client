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
import { BrowserView, MobileView } from 'react-device-detect';
import ExpenseDirectionsBrowserView from './ExpenseDirectionsBrowserView';
import ExpenseDirectionsMobileView from './ExpenseDirectionsMobileView';

const ExpenseDirections = () => {
    const queryClient = useQueryClient();
    const [showProgress, setShowProgress] = useState(false);
    const [allowPopConfirm, setAllowPopConfirm] = useState(false);
    const {
        data = { data: [] },
        isLoading,
        isFetching,
        isError,
        error,
    } = useQuery(['expense-directions'], () => getExpenseDirections(), {
        keepPreviousData: false,
    });

    const validateMessages = {
        required: '${label} պարտադիր է!',
        types: {
            email: '${label}֊ի ֆորմատը սխալ է',
            number: '${label} is not a valid number!',
        },
    };

    const { data: expenseDirections, meta } = { ...data };
    const modifiedData = expenseDirections.map(({ id, attributes }) => ({
        key: id,
        ...attributes,
    }));


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

    if (isError) {
        return <Alert type='error' message={error.message} />;
    }

    return (
        <>
            <BrowserView>
                <ExpenseDirectionsBrowserView
                    validateMessages={validateMessages}
                    onFinish={onFinish}
                    newDirectionForm={newDirectionForm}
                    addItemMutation={addItemMutation}
                    isLoading={isLoading || isFetching}
                    modifiedData={modifiedData}
                    handleDelete={handleDelete}
                    showProgress={showProgress}
                    allowPopConfirm={allowPopConfirm}
                    setAllowPopConfirm={setAllowPopConfirm}
                />
            </BrowserView>
            <MobileView>
                <ExpenseDirectionsMobileView
                    validateMessages={validateMessages}
                    onFinish={onFinish}
                    newDirectionForm={newDirectionForm}
                    addItemMutation={addItemMutation}
                    isLoading={isLoading || isFetching}
                    modifiedData={modifiedData}
                    handleDelete={handleDelete}
                    showProgress={showProgress}
                    allowPopConfirm={allowPopConfirm}
                    setAllowPopConfirm={setAllowPopConfirm}
                />
            </MobileView>
        </>
    );
};
export default ExpenseDirections;
