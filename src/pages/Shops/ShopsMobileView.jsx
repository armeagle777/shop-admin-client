import { List } from 'antd';
import { MobileView } from 'react-device-detect';

import { paginationStyles } from './Shops.constants';
import { ANT_LAYOUTS, ANT_SIZES } from '../../utils/constants';
import { FloatButton, ShopsListItem } from '../../components';

const ShopsMobileView = ({
  isLoading,
  showProgress,
  handleDelete,
  modifiedData,
  allowPopConfirm,
  onOpenShopModal,
  setAllowPopConfirm,
}) => {
  const renderListItem = (item, index) => (
    <ShopsListItem
      item={item}
      isLoading={isLoading}
      showProgress={showProgress}
      handleDelete={handleDelete}
      allowPopConfirm={allowPopConfirm}
      setAllowPopConfirm={setAllowPopConfirm}
    />
  );

  return (
    <MobileView>
      <List
        size={ANT_SIZES.LARGE}
        dataSource={modifiedData}
        renderItem={renderListItem}
        pagination={paginationStyles}
        itemLayout={ANT_LAYOUTS.VERTICAL}
      />
      <FloatButton onClick={onOpenShopModal} />
    </MobileView>
  );
};

export default ShopsMobileView;