import { useState } from 'react';
import { toast } from 'react-toastify';
import { Avatar, Button, Space } from 'antd';
import { DeleteOutlined, EditOutlined } from '@ant-design/icons';
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';

import { PopConfirm } from '../../components';
import { generateRandomColor } from '../../utils/helpers';
import translations from '../../utils/translations/am.json';
import { addShop, deleteShop, getShops } from '../../api/serverApi';

const useShopsData = ({ addShopForm }) => {
  const [showProgress, setShowProgress] = useState(false);
  const [showShopModal, setShowShopModal] = useState(false);
  const [allowPopConfirm, setAllowPopConfirm] = useState(false);

  const { SHARED, SHOPS_PAGE } = translations;
  const queryClient = useQueryClient();

  const { data, isLoading, isFetching, isError, error } = useQuery(
    ['shops'],
    () => getShops(),
    {
      keepPreviousData: true,
    },
  );

  const { data: shops = [], meta } = { ...data };
  const modifiedData = shops.map(({ id, attributes }) => ({
    key: id,
    ...attributes,
  }));

  const deleteItemMutation = useMutation((itemId) => deleteShop(itemId), {
    onSuccess: () => {
      queryClient.invalidateQueries('shops');
      toast.success(SHOPS_PAGE.DELETE_SUCCESS_MESSAGE, {
        progress: undefined,
      });
      setShowProgress(false);
      setAllowPopConfirm(false);
    },
    onError: () => {
      toast.error(SHOPS_PAGE.DELETE_ERROR_MESSAGE, {
        progress: undefined,
      });
      setShowProgress(false);
      setAllowPopConfirm(false);
    },
  });

  const addItemMutation = useMutation((item) => addShop(item), {
    onSuccess: (data) => {
      if (data.data?.error) {
        return toast.error(data.data?.error || SHARED.TOAST_ERROR, {
          progress: undefined,
        });
      }
      queryClient.invalidateQueries('shops');
      toast.success(SHOPS_PAGE.CREATE_SUCCESS_MESSAGE, {
        progress: undefined,
      });
      setShowShopModal(false);
      addShopForm.resetFields();
    },
    onError: (error, variables, context, mutation) => {
      toast.error(SHOPS_PAGE.CREATE_ERROR_MESSAGE, {
        progress: undefined,
      });
    },
  });

  const addNewShop = (newShop) => addItemMutation.mutate(newShop);

  const handleDelete = (id) => {
    setShowProgress(true);
    deleteItemMutation.mutate(id);
  };

  const shopsTableColumns = [
    {
      title: 'Անուն',
      dataIndex: 'name',
      width: '25%',
    },
    {
      title: 'Նկար',
      dataIndex: 'logo',
      width: '10%',
      render: (_, record) => {
        const src =
          record.logo?.data?.attributes?.formats?.thumbnail?.url ||
          record.logo?.data?.attributes.url;
        return (
          <Avatar
            style={{
              backgroundColor: generateRandomColor(),
              verticalAlign: 'middle',
              border: 'none',
            }}
            size="large"
            gap={2}
            src={src}
          >
            {record.name || ''}
          </Avatar>
        );
      },
    },
    {
      title: 'Հասցե',
      dataIndex: 'url',
      width: '40%',
      render: (_, record) => {
        return (
          <a target="_blank" href={record.url}>
            {record.url}
          </a>
        );
      },
    },

    {
      title: 'Գործողություններ',
      dataIndex: 'operation',
      render: (_, record) => {
        const itemId = record.key;
        return (
          <Space key={itemId}>
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

  return {
    error,
    isError,
    addNewShop,
    showProgress,
    handleDelete,
    showShopModal,
    allowPopConfirm,
    setShowShopModal,
    shopsTableColumns,
    setAllowPopConfirm,
    shopsList: modifiedData,
    isLoadingOnAdd: addItemMutation.isLoading,
    isShopListLoading: isFetching || isLoading,
  };
};

export default useShopsData;
