import { useState } from 'react';
import dayjs from 'dayjs';
import { DatePicker } from 'antd-mobile';
import { CalendarOutlined } from '@ant-design/icons';
import { List, Flex, Space, Button, Select, Divider, Skeleton } from 'antd';

import { ListItem } from '.';
import { mbViewListPgStyles } from './Expenses.constants';
import { ANT_LAYOUTS, ANT_SIZES } from '../../utils/constants';
import { FloatButton } from '../../components';
import { MobileFilterBar } from './MobileFilterBar';

const ExpensesMobileView = ({
  filters,
  isLoading,
  expenses,
  eDOptions,
  eDIsloading,
  showProgress,
  handleDelete,
  onDateFilter,
  allowPopConfirm,
  onDirectionFilter,
  onOpenExpenseModal,
  setAllowPopConfirm,
}) => {
  const renderItem = (item, index) => {
    const { amount, key, direction, expense_date } = { ...item };
    return (
      <ListItem
        itemId={key}
        amount={amount}
        direction={direction}
        expense_date={expense_date}
      />
    );
  };

  return (
    <Space direction={ANT_LAYOUTS.VERTICAL} style={{ width: '100%' }}>
      {eDIsloading ? (
        <Skeleton active />
      ) : (
        <MobileFilterBar
          filters={filters}
          eDOptions={eDOptions}
          onDateFilter={onDateFilter}
          onDirectionFilter={onDirectionFilter}
        />
      )}
      <List
        dataSource={expenses}
        size={ANT_SIZES.LARGE}
        renderItem={renderItem}
        pagination={mbViewListPgStyles}
        itemLayout={ANT_LAYOUTS.VERTICAL}
      />
      <FloatButton onClick={onOpenExpenseModal} />
    </Space>
  );
};

export default ExpensesMobileView;
