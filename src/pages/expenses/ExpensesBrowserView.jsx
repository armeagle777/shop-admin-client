import { Table } from '../../components';

import { ANT_SIZES } from '../../utils/constants';
import { AddExpenseBrForm } from './AddExpenseBrForm';

const ExpensesBrowserView = ({
  form,
  columns,
  onFinish,
  expenses,
  eDOptions,
  isLoading,
  dateFormat,
  isLoadingAdd,
  newExpenseForm,
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
      <Table
        form={form}
        columns={columns}
        loading={isLoading}
        dataSource={expenses}
        size={ANT_SIZES.MEDIUM}
      />
    </>
  );
};

export default ExpensesBrowserView;
