import { Form, Modal } from 'antd';
import { BrowserView, MobileView } from 'react-device-detect';

import { useShopsData } from '../../hooks';
import ShopsMobileView from './ShopsMobileView';
import ShopsBrowserView from './ShopsBrowserView';
import { AddShopForm, Alert } from '../../components';
import translations from '../../utils/translations/am.json';

const Shops = () => {
  const [form] = Form.useForm();
  const { SHOPS_PAGE } = translations;
  const [addShopForm] = Form.useForm();
  const {
    error,
    isError,
    shopsList,
    addNewShop,
    showProgress,
    handleDelete,
    showShopModal,
    isLoadingOnAdd,
    allowPopConfirm,
    setShowShopModal,
    shopsTableColumns,
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

  if (isError) {
    return <Alert message={error.message} />;
  }

  return (
    <>
      <BrowserView>
        <ShopsBrowserView
          form={form}
          modifiedData={shopsList}
          isLoading={isShopListLoading}
          onOpenShopModal={handleOpenModal}
          shopsTableColumns={shopsTableColumns}
        />
      </BrowserView>
      <MobileView>
        <ShopsMobileView
          modifiedData={shopsList}
          showProgress={showProgress}
          handleDelete={handleDelete}
          isLoading={isShopListLoading}
          onOpenShopModal={handleOpenModal}
          allowPopConfirm={allowPopConfirm}
          setAllowPopConfirm={setAllowPopConfirm}
        />
      </MobileView>
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
