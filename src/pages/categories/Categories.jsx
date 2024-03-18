import { useState } from 'react';
import { Form } from 'antd';
import { toast } from 'react-toastify';
import { BrowserView, MobileView } from 'react-device-detect';
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';

import {
  addCategory,
  getCategories,
  deleteCategory,
} from '../../api/serverApi';
import { Alert } from '../../components';
import { messages } from '../../utils/constants';
import CategoriesMobileView from './CategoriesMobileView';
import CategoriesBrowserView from './CategoriesBrowserView';

const Categories = () => {
  const queryClient = useQueryClient();
  const [showProgress, setShowProgress] = useState(false);
  const [allowPopConfirm, setAllowPopConfirm] = useState(false);
  const { data, isLoading, isFetching, isError, error } = useQuery(
    ['categories'],
    () => getCategories(),
    {
      keepPreviousData: true,
    },
  );

  const validateMessages = {
    required: 'Անունը պարտադիր է!',
    types: {
      email: '${label}֊ի ֆորմատը սխալ է',
      number: '${label} is not a valid number!',
    },
  };

  const { data: categories = [], meta } = { ...data };
  const modifiedData = categories.map(({ id, attributes }) => ({
    key: id,
    ...attributes,
  }));

  const [newCategoryForm] = Form.useForm();

  const deleteItemMutation = useMutation((itemId) => deleteCategory(itemId), {
    onSuccess: () => {
      queryClient.invalidateQueries('categories');
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

  const handleDelete = (id) => {
    setShowProgress(true);
    deleteItemMutation.mutate(id);
  };

  const onFinish = (values) => {
    addItemMutation.mutate(values);
  };

  const addItemMutation = useMutation((item) => addCategory(item), {
    onSuccess: (data) => {
      queryClient.invalidateQueries('categories');
      toast.success(messages.customers.createSuccess, {
        progress: undefined,
      });
      newCategoryForm.resetFields();
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

  return (
    <>
      <BrowserView>
        <CategoriesBrowserView
          validateMessages={validateMessages}
          onFinish={onFinish}
          newCategoryForm={newCategoryForm}
          addItemMutation={addItemMutation}
          isLoading={isLoading}
          modifiedData={modifiedData}
          handleDelete={handleDelete}
          showProgress={showProgress}
          allowPopConfirm={allowPopConfirm}
          setAllowPopConfirm={setAllowPopConfirm}
        />
      </BrowserView>
      <MobileView>
        <CategoriesMobileView
          validateMessages={validateMessages}
          onFinish={onFinish}
          newCategoryForm={newCategoryForm}
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

export default Categories;
