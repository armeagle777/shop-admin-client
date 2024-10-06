import { Button, DatePicker, Form, InputNumber, Select } from 'antd';

import {
  formItemNames,
  formItemsRules,
  formItemsStyles,
  validateMessages,
  addExpenseBrFormProps,
} from '../Expenses.constants';
import translations from '../../../utils/translations/am.json';
import { filterOptions, filterSort } from '../Expenses.helpers';
import { BUTTON_HTML_TYPES, BUTTON_TYPES } from '../../../utils/constants';

const AddExpenseBrForm = ({
  onFinish,
  eDOptions,
  dateFormat,
  isLoadingAdd,
  newExpenseForm,
  isAddButtonDisabled,
}) => {
  const { EXPENSES_PAGE } = translations;
  return (
    <Form
      onFinish={onFinish}
      form={newExpenseForm}
      name={formItemNames.FORM}
      validateMessages={validateMessages}
      style={addExpenseBrFormProps.style}
      labelCol={addExpenseBrFormProps.labelCol}
      wrapperCol={addExpenseBrFormProps.wrapperCol}
    >
      <Form.Item
        name={formItemNames.AMOUNT}
        rules={formItemsRules.AMOUNT}
        style={formItemsStyles.AMOUNT}
      >
        <InputNumber min={0} placeholder={EXPENSES_PAGE.AMOUNT_PLACEHOLDER} />
      </Form.Item>
      <Form.Item
        name={formItemNames.DIRECTION}
        rules={formItemsRules.DIRECTION}
        style={formItemsStyles.DIRECTION}
      >
        <Select
          showSearch
          options={eDOptions}
          filterSort={filterSort}
          optionFilterProp="children"
          filterOption={filterOptions}
          style={formItemsStyles.DIRECTION_SELECT}
          placeholder={EXPENSES_PAGE.DIRECTION_PLACEHOLDER}
        />
      </Form.Item>

      <Form.Item
        name={formItemNames.EXOENSE_DATE}
        style={formItemsStyles.EXPENSE_DATE}
      >
        <DatePicker
          format={dateFormat}
          style={formItemsStyles.EXPENSE_DATE_DATEPICKER}
          placeholder={EXPENSES_PAGE.EXPENSE_DATE_PLACEHOLDER}
        />
      </Form.Item>
      <Button
        loading={isLoadingAdd}
        type={BUTTON_TYPES.PRIMARY}
        disabled={isAddButtonDisabled}
        htmlType={BUTTON_HTML_TYPES.SUBMIT}
        style={formItemsStyles.SUBMIT_BUTTON}
      >
        {EXPENSES_PAGE.BROWSER_ADD_BUTTON_TEXT}
      </Button>
    </Form>
  );
};

export default AddExpenseBrForm;
