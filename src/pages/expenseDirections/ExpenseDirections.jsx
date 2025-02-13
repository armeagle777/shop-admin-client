import { useState } from 'react';
import { Form } from 'antd';
import { toast } from 'react-toastify';
import { BrowserView, MobileView } from 'react-device-detect';
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';

import {
  addExpenseDirection,
  deleteExpenseDirections,
  getExpenseDirections,
} from '../../api/serverApi';
import { Alert } from '../../components';
import {
  DEFAULT_PAGE,
  DEFAULT_PAGE_SIZE,
  messages,
} from '../../utils/constants';
import ExpenseDirectionsBrowserView from './ExpenseDirectionsBrowserView';
import ExpenseDirectionsMobileView from './ExpenseDirectionsMobileView';

const ExpenseDirections = () => {
  const [page, setPage] = useState(DEFAULT_PAGE);
  const [pageSize, setPageSize] = useState(DEFAULT_PAGE_SIZE);
  const queryClient = useQueryClient();
  const [showProgress, setShowProgress] = useState(false);
  const [allowPopConfirm, setAllowPopConfirm] = useState(false);
  const {
    data = { data: [] },
    isLoading,
    isFetching,
    isError,
    error,
  } = useQuery(
    ['expense-directions', page, pageSize],
    () => getExpenseDirections({ page, pageSize }),
    {
      keepPreviousData: false,
    },
  );

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
        queryClient.invalidateQueries(['expense-directions', page, pageSize]);
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
    },
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
      queryClient.invalidateQueries(['expense-directions', page, pageSize]);
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
    return <Alert type="error" message={error.message} />;
  }

  const pageChangeHandle = (page, pageSize) => {
    setPage(page);
  };

  const pageSizeChangeHandler = (current, size) => {
    setPageSize(size);
  };

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
          totalCount={data?.meta?.pagination?.total}
          pageSize={data?.meta?.pagination?.pageSize}
          currentPage={data?.meta?.pagination?.page}
          onPageChange={pageChangeHandle}
          onPageSizeChange={pageSizeChangeHandler}
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
          totalCount={data?.meta?.pagination?.total}
          currentPage={data?.meta?.pagination?.page}
          onPageChange={pageChangeHandle}
        />
      </MobileView>
    </>
  );
};
export default ExpenseDirections;
