import { useState } from 'react';
import { Button, Space } from 'antd';
import { toast } from 'react-toastify';
import { DeleteOutlined, EditOutlined } from '@ant-design/icons';
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';

import { PopConfirm } from '../../components';
import { getCategories } from '../../api/serverApi';

const useCategoriesData = ({ newCategoryForm }) => {
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

  const { data: categories = [], meta } = { ...data };
  const modifiedData = categories.map(({ id, attributes }) => ({
    key: id,
    ...attributes,
  }));

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

  const handleDelete = (id) => {
    setShowProgress(true);
    deleteItemMutation.mutate(id);
  };

  const handleSubmit = (values) => {
    addItemMutation.mutate(values);
  };

  const columns = [
    {
      title: 'Կատեգորիա',
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
              size="small"
              title="Խմբագրել"
              type="default"
            />
            <PopConfirm
              itemId={itemId}
              buttonTitle="Հեռացնել"
              onConfirm={handleDelete}
              icon={<DeleteOutlined />}
              showProgress={showProgress}
              allowPopConfirm={allowPopConfirm}
              loading={isLoading || isFetching}
              setAllowPopConfirm={setAllowPopConfirm}
            />
          </Space>
        );
      },
    },
  ];

  return {
    error,
    isError,
    columns,
    showProgress,
    allowPopConfirm,
    data: modifiedData,
    setAllowPopConfirm,
    onSubmit: handleSubmit,
    onDelete: handleDelete,
    isLoading: isLoading || isFetching,
    isLoadingOnAdd: addItemMutation.isLoading,
  };
};

export default useCategoriesData;
