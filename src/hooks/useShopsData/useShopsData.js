import { useState } from 'react';
import { toast } from 'react-toastify';
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';

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

  const deleteShopById = (id) => deleteItemMutation.mutate(id);

  return {
    error,
    isError,
    addNewShop,
    showProgress,
    showShopModal,
    deleteShopById,
    allowPopConfirm,
    setShowProgress,
    setShowShopModal,
    setAllowPopConfirm,
    shopsList: modifiedData,
    isShopListLoading: isFetching || isLoading,
    isLoadingOnAdd: addItemMutation.isLoading,
  };
};

export default useShopsData;
