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
    isLoading,
    showProgress,
    onAddIsLoading,
    allowPopConfirm,
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
          isLoading={isLoading}
          dateFormat={dateFormat}
          eDIsloading={eDIsloading}
          expenses={filteredExpenses}
          eDOptions={expenseDirections}
          isLoadingAdd={onAddIsLoading}
          onDateFilter={handleDateFilter}
          newExpenseForm={newExpenseForm}
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
          expenses={filteredExpenses}
          eDOptions={expenseDirections}
          onDateFilter={handleDateFilter}
          allowPopConfirm={allowPopConfirm}
          onOpenExpenseModal={onOpenExpenseModal}
          setAllowPopConfirm={setAllowPopConfirm}
          onDirectionFilter={handleDirectionFilter}
          onCloseExpenseModal={onCloseExpenseModal}
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
