import { Button } from 'antd';

import { Table } from '../../components';
import { addButtonStyles } from './Shops.constants';
import { BUTTON_TYPES } from '../../utils/constants';
import translations from '../../utils/translations/am.json';

const ShopsBrowserView = ({
  form,
  isLoading,
  modifiedData,
  onOpenShopModal,
  shopsTableColumns,
}) => {
  const { SHOPS_PAGE } = translations;

  return (
    <>
      <Button
        style={addButtonStyles}
        onClick={onOpenShopModal}
        type={BUTTON_TYPES.PRIMARY}
      >
        {SHOPS_PAGE.ADD_SHOP_BUTTON_TEXT}
      </Button>
      <Table
        form={form}
        loading={isLoading}
        dataSource={modifiedData}
        columns={shopsTableColumns}
      />
    </>
  );
};

export default ShopsBrowserView;
