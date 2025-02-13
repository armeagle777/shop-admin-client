import { List } from 'antd';

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
  totalCount,
  onPageChange,
  currentPage,
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
    <>
      <List
        size={ANT_SIZES.LARGE}
        dataSource={modifiedData}
        renderItem={renderListItem}
        pagination={{
          ...paginationStyles,
          current: currentPage,
          total: totalCount,
          onChange: onPageChange,
        }}
        itemLayout={ANT_LAYOUTS.VERTICAL}
      />
      <FloatButton onClick={onOpenShopModal} />
    </>
  );
};

export default ShopsMobileView;
