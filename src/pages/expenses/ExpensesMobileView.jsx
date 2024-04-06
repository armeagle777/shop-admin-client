import { List, Skeleton, Space } from 'antd';
import { DeleteOutlined, StarOutlined } from '@ant-design/icons';

import { FloatButton, IconText, PopConfirm } from '../../components';
import { mbViewListPgStyles } from './Expenses.constants';
import { ANT_LAYOUTS, ANT_SIZES } from '../../utils/constants';
import { ListItem } from '.';

const ExpensesMobileView = ({
  isLoading,
  modifiedData,
  showProgress,
  handleDelete,
  allowPopConfirm,
  onOpenExpenseModal,
  setAllowPopConfirm,
}) => {
  const renderItem = (item, index) => {
    const { amount, key, direction, expense_date } = { ...item };
    return (
      <ListItem
        key={key}
        amount={amount}
        direction={direction}
        expense_date={expense_date}
      />
    );
  };

  return (
    <Space direction={ANT_LAYOUTS.VERTICAL} style={{ width: '100%' }}>
      <List
        size={ANT_SIZES.LARGE}
        renderItem={renderItem}
        dataSource={modifiedData}
        pagination={mbViewListPgStyles}
        itemLayout={ANT_LAYOUTS.VERTICAL}
      />
      <FloatButton onClick={onOpenExpenseModal} />
    </Space>
  );
};

export default ExpensesMobileView;
