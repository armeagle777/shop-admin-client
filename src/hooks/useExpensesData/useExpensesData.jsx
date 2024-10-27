import { useState } from 'react';
import { toast } from 'react-toastify';
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';

import { filterExpenses, initialFilters } from '.';
import { ExpensesActionColumn } from '../../components';
import translations from '../../utils/translations/am.json';
import { addExpense, deleteExpense, getExpenses } from '../../api/serverApi';

const useExpensesData = ({ newExpenseForm }) => {
  const [showProgress, setShowProgress] = useState(false);
  const [allowPopConfirm, setAllowPopConfirm] = useState(false);
  const [showExpenseModal, setShowExpenseModal] = useState(false);
  const [filters, setFilters] = useState(initialFilters);

  const queryClient = useQueryClient();
  const { EXPENSES_PAGE } = translations;
  const {
    data = { data: [] },
    isFetching,
    isLoading,
    isError,
    error,
  } = useQuery(['expenses'], () => getExpenses(), {
    keepPreviousData: false,
  });

  const modifiedData = data.data.map(({ id, attributes }) => ({
    key: id,
    ...attributes,
  }));

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
          <ExpensesActionColumn
            itemId={itemId}
            isLoading={isLoading}
            onDelete={handleDelete}
            showProgress={showProgress}
            allowPopConfirm={allowPopConfirm}
            setAllowPopConfirm={setAllowPopConfirm}
          />
        );
      },
    },
  ];

  const deleteItemMutation = useMutation((itemId) => deleteExpense(itemId), {
    onSuccess: () => {
      queryClient.invalidateQueries('expenses');
      toast.success(EXPENSES_PAGE.DELETE_SUCCESS_MESSAGE, {
        progress: undefined,
      });
      setShowProgress(false);
      setAllowPopConfirm(false);
    },
    onError: () => {
      toast.error(EXPENSES_PAGE.DELETE_ERROR_MESSAGE, {
        progress: undefined,
      });
      setShowProgress(false);
      setAllowPopConfirm(false);
    },
  });

  const addItemMutation = useMutation((item) => addExpense(item), {
    onSuccess: (data) => {
      queryClient.invalidateQueries('expenses');
      toast.success(EXPENSES_PAGE.ADD_SUCCESS_MESSAGE, {
        progress: undefined,
      });
      newExpenseForm.resetFields();
      setShowExpenseModal(false);
    },
    onError: (error, variables, context, mutation) => {
      console.log('err:::::: ', error);

      toast.error(EXPENSES_PAGE.ADD_ERROR_MESSAGE, {
        progress: undefined,
      });
    },
  });

  const handleDelete = (id) => {
    setShowProgress(true);
    deleteItemMutation.mutate(id);
  };

  const handleFinish = (values) => {
    const expenseDate = values.expense_date;
    values.expense_date = expenseDate ? new Date(expenseDate.$d) : new Date();

    addItemMutation.mutate(values);
  };

  const onOpenExpenseModal = () => {
    setShowExpenseModal(true);
  };

  const onCloseExpenseModal = () => {
    setShowExpenseModal(false);
  };

  const filteredExpenses = filterExpenses(modifiedData, filters);

  const handleDateFilter = (datesArray) => {
    if (!datesArray?.length) return;
    const [start, end] = datesArray;
    setFilters((prev) => ({
      ...prev,
      date: { start: start ?? null, end: end ?? null },
    }));
  };

  const handleDirectionFilter = (directionName) => {
    if (!directionName) return;
    if (Array.isArray(directionName)) {
      return setFilters((filters) => ({
        ...filters,
        directions: directionName,
      }));
    }
    const directions = filters.directions;

    const newDirections = directions.includes(directionName)
      ? directions.filter((direction) => direction !== directionName)
      : [...directions, directionName];

    setFilters((filters) => ({ ...filters, directions: newDirections }));
  };

  const handleClearFIlters = () => setFilters(initialFilters);

  return {
    error,
    columns,
    isError,
    filters,
    showProgress,
    allowPopConfirm,
    showExpenseModal,
    filteredExpenses,
    handleDateFilter,
    setAllowPopConfirm,
    onOpenExpenseModal,
    handleClearFIlters,
    onCloseExpenseModal,
    handleDirectionFilter,
    onFinish: handleFinish,
    expenses: modifiedData,
    onDelete: handleDelete,
    isLoading: isLoading || isFetching,
    onAddIsLoading: addItemMutation.isLoading,
  };
};

export default useExpensesData;
