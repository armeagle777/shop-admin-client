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
    expenses,
    onDelete,
    onFinish,
    isLoading,
    showProgress,
    onAddIsLoading,
    allowPopConfirm,
    showExpenseModal,
    setAllowPopConfirm,
    onOpenExpenseModal,
    onCloseExpenseModal,
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
          columns={columns}
          expenses={expenses}
          onFinish={onFinish}
          isLoading={isLoading}
          dateFormat={dateFormat}
          eDOptions={expenseDirections}
          isLoadingAdd={onAddIsLoading}
          newExpenseForm={newExpenseForm}
          isAddButtonDisabled={isAddButtonDisabled}
        />
      </BrowserView>
      <MobileView>
        <ExpensesMobileView
          expenses={expenses}
          onDelete={onDelete}
          isLoading={isLoading}
          showProgress={showProgress}
          allowPopConfirm={allowPopConfirm}
          onOpenExpenseModal={onOpenExpenseModal}
          setAllowPopConfirm={setAllowPopConfirm}
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
