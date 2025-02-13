import { Flex } from 'antd';

import { Table } from '../../components';
import { ANT_SIZES } from '../../utils/constants';
import { AddExpenseBrForm } from './AddExpenseBrForm';
import { BrowserFiltersBar } from './BrowserFiltersBar';

const ExpensesBrowserView = ({
  form,
  columns,
  filters,
  onFinish,
  expenses,
  pageSize,
  eDOptions,
  isLoading,
  dateFormat,
  totalCount,
  eDIsloading,
  onPageChange,
  currentPage,
  isLoadingAdd,
  onDateFilter,
  newExpenseForm,
  onClearFilters,
  onPageSizeChange,
  onDirectionFilter,
  isAddButtonDisabled,
}) => {
  return (
    <>
      <AddExpenseBrForm
        onFinish={onFinish}
        eDOptions={eDOptions}
        dateFormat={dateFormat}
        isLoadingAdd={isLoadingAdd}
        newExpenseForm={newExpenseForm}
        isAddButtonDisabled={isAddButtonDisabled}
      />
      <Flex gap="middle">
        <BrowserFiltersBar
          filters={filters}
          eDOptions={eDOptions}
          eDIsloading={eDIsloading}
          onDateFilter={onDateFilter}
          onClearFilters={onClearFilters}
          onDirectionFilter={onDirectionFilter}
        />
        <div style={{ width: '80%' }}>
          <Table
            form={form}
            columns={columns}
            loading={isLoading}
            dataSource={expenses}
            size={ANT_SIZES.MEDIUM}
            totalCount={totalCount}
            onPageChange={onPageChange}
            pageSize={pageSize}
            currentPage={currentPage}
            onPageSizeChange={onPageSizeChange}
          />
        </div>
      </Flex>
    </>
  );
};

export default ExpensesBrowserView;
