import { Table } from '../../components';

import { ANT_SIZES } from '../../utils/constants';
import { AddExpenseBrForm } from './AddExpenseBrForm';

const ExpensesBrowserView = ({
  form,
  columns,
  onFinish,
  eDOptions,
  isLoading,
  dateFormat,
  modifiedData,
  newExpenseForm,
  addItemMutation,
  validateMessages,
  isAddButtonDisabled,
}) => {
  return (
    <>
      <AddExpenseBrForm
        onFinish={onFinish}
        eDOptions={eDOptions}
        dateFormat={dateFormat}
        newExpenseForm={newExpenseForm}
        addItemMutation={addItemMutation}
        validateMessages={validateMessages}
        isAddButtonDisabled={isAddButtonDisabled}
      />
      <Table
        form={form}
        columns={columns}
        loading={!!isLoading}
        size={ANT_SIZES.MEDIUM}
        dataSource={modifiedData}
      />
    </>
  );
};

export default ExpensesBrowserView;
