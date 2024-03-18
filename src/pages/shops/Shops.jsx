import { useState } from 'react';
import { toast } from 'react-toastify';
import { Form, Modal } from 'antd';
import { BrowserView, MobileView } from 'react-device-detect';
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';

import { messages } from '../../utils/constants';
import { AddShopForm, Alert } from '../../components';
import { addShop, deleteShop, getShops } from '../../api/serverApi';
import ShopsMobileView from './ShopsMobileView';
import ShopsBrowserView from './ShopsBrowserView';

const Shops = () => {
  const [showProgress, setShowProgress] = useState(false);
  const [showShopModal, setShowShopModal] = useState(false);
  const [allowPopConfirm, setAllowPopConfirm] = useState(false);
  const { data, isLoading, isFetching, isError, error } = useQuery(
    ['shops'],
    () => getShops(),
    {
      keepPreviousData: true,
    },
  );
  const queryClient = useQueryClient();

  const { data: shops = [], meta } = { ...data };
  const modifiedData = shops.map(({ id, attributes }) => ({
    key: id,
    ...attributes,
  }));

  const [form] = Form.useForm();
  const [addShopForm] = Form.useForm();

  const onOpenShopModal = () => {
    setShowShopModal(true);
  };

  const onCloseShopModal = () => {
    setShowShopModal(false);
  };

  const deleteItemMutation = useMutation((itemId) => deleteShop(itemId), {
    onSuccess: () => {
      queryClient.invalidateQueries('shops');
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

  const addItemMutation = useMutation((item) => addShop(item), {
    onSuccess: (data) => {
      if (data.data?.error) {
        return toast.error(data.data?.error || 'Սխալ է տեղի ունեցել', {
          progress: undefined,
        });
      }
      queryClient.invalidateQueries('shops');
      toast.success(messages.customers.createSuccess, {
        progress: undefined,
      });
      setShowShopModal(false);
      addShopForm.resetFields();
    },
    onError: (error, variables, context, mutation) => {
      console.log('err:::::: ', error);

      toast.error(error.response?.data?.error?.message || error.message, {
        progress: undefined,
      });
    },
  });

  const onSubmit = (values) => {
    const { name, url, logo } = values.shop;
    const newShop = { name, url };
    if (logo) {
      newShop.logo = logo;
    }

    addItemMutation.mutate(newShop);
  };

  if (isError) {
    return <Alert type="error" message={error.message} />;
  }

  return (
    <>
      <BrowserView>
        <ShopsBrowserView
          form={form}
          modifiedData={modifiedData}
          isLoading={isLoading}
          onOpenShopModal={onOpenShopModal}
          allowPopConfirm={allowPopConfirm}
          setAllowPopConfirm={setAllowPopConfirm}
          handleDelete={handleDelete}
          showProgress={showProgress}
        />
      </BrowserView>
      <MobileView>
        <ShopsMobileView
          modifiedData={modifiedData}
          isLoading={isFetching || isLoading}
          onOpenShopModal={onOpenShopModal}
          handleDelete={handleDelete}
          showProgress={showProgress}
          allowPopConfirm={allowPopConfirm}
          setAllowPopConfirm={setAllowPopConfirm}
        />
      </MobileView>
      <Modal
        title="Ավելացնել նոր Խանութ"
        centered
        open={showShopModal}
        onCancel={onCloseShopModal}
        width={800}
        footer={null}
      >
        <AddShopForm
          onCancel={onCloseShopModal}
          onSubmit={onSubmit}
          isLoadingAdd={addItemMutation.isLoading}
          form={addShopForm}
        />
      </Modal>
    </>
  );
};
export default Shops;
