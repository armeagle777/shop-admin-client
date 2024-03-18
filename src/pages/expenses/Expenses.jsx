import { useState } from 'react';
import { toast } from 'react-toastify';
import { Button, Form, Modal, Space } from 'antd';
import { BrowserView, MobileView } from 'react-device-detect';
import { DeleteOutlined, EditOutlined } from '@ant-design/icons';
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';

import { messages } from '../../utils/constants';
import ExpensesMobileView from './ExpensesMobileView';
import ExpensesBrowserView from './ExpensesBrowserView';
import { Alert, PopConfirm, AddExpenseForm } from '../../components';
import {
  addExpense,
  getExpenses,
  deleteExpense,
  getExpenseDirections,
} from '../../api/serverApi';

const Expenses = () => {
  const [showProgress, setShowProgress] = useState(false);
  const [showExpenseModal, setShowExpenseModal] = useState(false);
  const [allowPopConfirm, setAllowPopConfirm] = useState(false);
  const { data, isFetching, isLoading, isError, error } = useQuery(
    ['expenses'],
    () => getExpenses(),
    {
      keepPreviousData: false,
    },
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

  const onOpenExpenseModal = () => {
    setShowExpenseModal(true);
  };

  const onCloseExpenseModal = () => {
    setShowExpenseModal(false);
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
      setShowExpenseModal(false);
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
    values.expense_date = expenseDate ? new Date(expenseDate.$d) : new Date();

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
      dataIndex: 'expense_date',
      // render: (_, record) => {
      //     const create_date = record.expense_date;
      //     console.log('new Date(create_date):::::: ',new Date(create_date));

      //     return format(new Date(create_date), 'dd-MM-yyy');
      // },
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
              size="small"
              title="Խմբագրել"
              type="default"
            />
            <PopConfirm
              loading={isLoading}
              itemId={itemId}
              onConfirm={handleDelete}
              showProgress={showProgress}
              allowPopConfirm={allowPopConfirm}
              setAllowPopConfirm={setAllowPopConfirm}
              icon={<DeleteOutlined />}
              buttonTitle="Հեռացնել"
            />
          </Space>
        );
      },
    },
  ];

  if (isError) {
    return <Alert type="error" message={error.message} />;
  }

  return (
    <>
      <BrowserView>
        <ExpensesBrowserView
          eDOptions={eDOptions}
          validateMessages={validateMessages}
          onFinish={onFinish}
          newExpenseForm={newExpenseForm}
          dateFormat={dateFormat}
          addItemMutation={addItemMutation}
          isAddButtonDisabled={isAddButtonDisabled}
          isLoading={isLoading}
          columns={columns}
          modifiedData={modifiedData}
          form={form}
        />
      </BrowserView>
      <MobileView>
        <ExpensesMobileView
          modifiedData={modifiedData}
          isLoading={isLoading}
          onOpenExpenseModal={onOpenExpenseModal}
          onCloseExpenseModal={onCloseExpenseModal}
          handleDelete={handleDelete}
          showProgress={showProgress}
          allowPopConfirm={allowPopConfirm}
          setAllowPopConfirm={setAllowPopConfirm}
        />
      </MobileView>
      <Modal
        title="Ավելացնել նոր ծախս"
        centered
        open={showExpenseModal}
        onCancel={onCloseExpenseModal}
        width={800}
        footer={null}
      >
        <AddExpenseForm
          onCancel={onCloseExpenseModal}
          onSubmit={onFinish}
          isLoadingAdd={addItemMutation.isLoading}
          form={newExpenseForm}
          eDOptions={eDOptions}
          dateFormat={dateFormat}
        />
      </Modal>
    </>
  );
};

export default Expenses;
