import { Form, Modal } from 'antd';

import { useShopsData } from '../../hooks';
import ShopsMobileView from './ShopsMobileView';
import ShopsBrowserView from './ShopsBrowserView';
import { AddShopForm, Alert } from '../../components';
import translations from '../../utils/translations/am.json';

const Shops = () => {
  const { SHOPS_PAGE } = translations;
  const [form] = Form.useForm();
  const [addShopForm] = Form.useForm();
  const {
    error,
    isError,
    shopsList,
    addNewShop,
    showProgress,
    showShopModal,
    isLoadingOnAdd,
    deleteShopById,
    setShowProgress,
    allowPopConfirm,
    setShowShopModal,
    isShopListLoading,
    setAllowPopConfirm,
  } = useShopsData({ addShopForm });

  const handleOpenModal = () => {
    setShowShopModal(true);
  };

  const handleCloseModal = () => {
    setShowShopModal(false);
  };

  const handleSubmit = (values) => {
    const { name, url, logo } = values.shop;
    const newShop = { name, url };

    if (logo) {
      newShop.logo = logo;
    }

    addNewShop(newShop);
  };

  const handleDelete = (id) => {
    setShowProgress(true);
    deleteShopById(id);
  };

  if (isError) {
    return <Alert message={error.message} />;
  }

  return (
    <>
      <ShopsBrowserView
        form={form}
        modifiedData={shopsList}
        handleDelete={handleDelete}
        showProgress={showProgress}
        isLoading={isShopListLoading}
        onOpenShopModal={handleOpenModal}
        allowPopConfirm={allowPopConfirm}
        setAllowPopConfirm={setAllowPopConfirm}
      />

      <ShopsMobileView
        modifiedData={shopsList}
        showProgress={showProgress}
        handleDelete={handleDelete}
        isLoading={isShopListLoading}
        onOpenShopModal={handleOpenModal}
        allowPopConfirm={allowPopConfirm}
        setAllowPopConfirm={setAllowPopConfirm}
      />
      <Modal
        centered
        width={800}
        footer={null}
        open={showShopModal}
        onCancel={handleCloseModal}
        title={SHOPS_PAGE.ADD_SHOP_MODAL_TITLE}
      >
        <AddShopForm
          form={addShopForm}
          onSubmit={handleSubmit}
          onCancel={handleCloseModal}
          isLoadingAdd={isLoadingOnAdd}
        />
      </Modal>
    </>
  );
};

export default Shops;
