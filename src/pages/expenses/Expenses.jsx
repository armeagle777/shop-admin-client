import { Form, Modal } from 'antd';
import { BrowserView, MobileView } from 'react-device-detect';

import { dateFormat } from '../../utils/constants';
import { AddExpenseForm, Alert } from '../../components';
import { useExpenseDirectionsData, useExpensesData } from '../../hooks';

import ExpensesMobileView from './ExpensesMobileView';
import ExpensesBrowserView from './ExpensesBrowserView';
import translations from '../../utils/translations/am.json';

const Expenses = () => {
  const [form] = Form.useForm();
  const [newExpenseForm] = Form.useForm();

  const { SHARED, EXPENSES_PAGE } = translations;

  const {
    error,
    isError,
    columns,
    filters,
    onDelete,
    onFinish,
    pageSize,
    isLoading,
    expenses,
    totalCount,
    currentPage,
    onPageChange,
    showProgress,
    onAddIsLoading,
    allowPopConfirm,
    onPageSizeChange,
    showExpenseModal,
    handleDateFilter,
    filteredExpenses,
    handleClearFIlters,
    setAllowPopConfirm,
    onOpenExpenseModal,
    onCloseExpenseModal,
    handleDirectionFilter,
  } = useExpensesData({ newExpenseForm });

  const { expenseDirections, isLoading: eDIsloading } =
    useExpenseDirectionsData();

  const isAddButtonDisabled = eDIsloading;

  if (isError) {
    return <Alert message={SHARED.ALERT_ERROR_MESSAGE} />;
  }

  return (
    <>
      <BrowserView>
        <ExpensesBrowserView
          form={form}
          filters={filters}
          columns={columns}
          onFinish={onFinish}
          pageSize={pageSize}
          isLoading={isLoading}
          totalCount={totalCount}
          dateFormat={dateFormat}
          eDIsloading={eDIsloading}
          currentPage={currentPage}
          expenses={expenses}
          onPageChange={onPageChange}
          eDOptions={expenseDirections}
          isLoadingAdd={onAddIsLoading}
          onDateFilter={handleDateFilter}
          newExpenseForm={newExpenseForm}
          onPageSizeChange={onPageSizeChange}
          onClearFilters={handleClearFIlters}
          onDirectionFilter={handleDirectionFilter}
          isAddButtonDisabled={isAddButtonDisabled}
        />
      </BrowserView>
      <MobileView>
        <ExpensesMobileView
          filters={filters}
          onDelete={onDelete}
          isLoading={isLoading}
          eDIsloading={eDIsloading}
          showProgress={showProgress}
          expenses={expenses}
          eDOptions={expenseDirections}
          onDateFilter={handleDateFilter}
          allowPopConfirm={allowPopConfirm}
          onOpenExpenseModal={onOpenExpenseModal}
          setAllowPopConfirm={setAllowPopConfirm}
          onDirectionFilter={handleDirectionFilter}
          onCloseExpenseModal={onCloseExpenseModal}
          totalCount={totalCount}
          onPageChange={onPageChange}
          currentPage={currentPage}
        />
      </MobileView>
      <Modal
        centered
        width={800}
        footer={null}
        open={showExpenseModal}
        onCancel={onCloseExpenseModal}
        title={EXPENSES_PAGE.MODAL_TITLE}
      >
        <AddExpenseForm
          onSubmit={onFinish}
          form={newExpenseForm}
          dateFormat={dateFormat}
          isLoadingAdd={onAddIsLoading}
          eDOptions={expenseDirections}
          onCancel={onCloseExpenseModal}
        />
      </Modal>
    </>
  );
};

export default Expenses;
