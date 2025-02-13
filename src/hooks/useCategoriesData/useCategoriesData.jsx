import { useState } from 'react';
import { Button, Space } from 'antd';
import { toast } from 'react-toastify';
import { DeleteOutlined, EditOutlined } from '@ant-design/icons';
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';

import { PopConfirm } from '../../components';
import {
  addCategory,
  getCategories,
  deleteCategory,
} from '../../api/serverApi';
import {
  DEFAULT_PAGE,
  DEFAULT_PAGE_SIZE,
  messages,
} from '../../utils/constants';

const useCategoriesData = ({ newCategoryForm }) => {
  const [page, setPage] = useState(DEFAULT_PAGE);
  const [pageSize, setPageSize] = useState(DEFAULT_PAGE_SIZE);
  const [showCategoryModal, setShowCategoryModal] = useState(false);
  const queryClient = useQueryClient();
  const [showProgress, setShowProgress] = useState(false);
  const [allowPopConfirm, setAllowPopConfirm] = useState(false);
  const { data, isLoading, isFetching, isError, error } = useQuery(
    ['categories', page, pageSize],
    () => getCategories({ page, pageSize }),
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
      toast.success(messages.orders.deleteSuccess, {
        progress: undefined,
      });
      setShowProgress(false);
      setAllowPopConfirm(false);
    },
    onError: () => {
      toast.error(messages.orders.deleteError, {
        progress: undefined,
      });
      setShowProgress(false);
      setAllowPopConfirm(false);
    },
  });
  const addItemMutation = useMutation((item) => addCategory(item), {
    onSuccess: (data) => {
      queryClient.invalidateQueries('categories');
      toast.success(messages.orders.createSuccess, {
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

  const pageChangeHandle = (page, pageSize) => {
    setPage(page);
  };

  const pageSizeChangeHandler = (current, size) => {
    setPageSize(size);
  };

  return {
    error,
    isError,
    columns,
    showProgress,
    allowPopConfirm,
    showCategoryModal,
    setShowCategoryModal,
    data: modifiedData,
    setAllowPopConfirm,
    onSubmit: handleSubmit,
    onDelete: handleDelete,
    isLoading: isLoading || isFetching,
    isLoadingOnAdd: addItemMutation.isLoading,
    onPageChange: pageChangeHandle,
    onPageSizeChange: pageSizeChangeHandler,
    totalCount: data?.meta?.pagination?.total,
    currentPage: data?.meta?.pagination?.page,
    pageSize: data?.meta?.pagination?.pageSize,
  };
};

export default useCategoriesData;
