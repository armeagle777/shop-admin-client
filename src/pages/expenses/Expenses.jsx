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
import translations from '../../utils/translations/am.json';
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
  const { SHARED } = translations;
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
    return <Alert message={SHARED.ALERT_ERROR_MESSAGE} />;
  }

  return (
    <>
      <BrowserView>
        <ExpensesBrowserView
          form={form}
          columns={columns}
          onFinish={onFinish}
          eDOptions={eDOptions}
          isLoading={isLoading}
          dateFormat={dateFormat}
          modifiedData={modifiedData}
          newExpenseForm={newExpenseForm}
          addItemMutation={addItemMutation}
          validateMessages={validateMessages}
          isAddButtonDisabled={isAddButtonDisabled}
        />
      </BrowserView>
      <MobileView>
        <ExpensesMobileView
          isLoading={isLoading}
          modifiedData={modifiedData}
          showProgress={showProgress}
          handleDelete={handleDelete}
          allowPopConfirm={allowPopConfirm}
          onOpenExpenseModal={onOpenExpenseModal}
          setAllowPopConfirm={setAllowPopConfirm}
          onCloseExpenseModal={onCloseExpenseModal}
        />
      </MobileView>
      <Modal
        centered
        width={800}
        footer={null}
        title="Ավելացնել նոր ծախս"
        open={showExpenseModal}
        onCancel={onCloseExpenseModal}
      >
        <AddExpenseForm
          onSubmit={onFinish}
          form={newExpenseForm}
          eDOptions={eDOptions}
          dateFormat={dateFormat}
          onCancel={onCloseExpenseModal}
          isLoadingAdd={addItemMutation.isLoading}
        />
      </Modal>
    </>
  );
};

export default Expenses;
