import Table from '../../components/Table/Table';
import { Button, DatePicker, Form, InputNumber, Select } from 'antd';

const ExpensesBrowserView = ({
  addItemMutation,
  dateFormat,
  eDOptions,
  validateMessages,
  onFinish,
  newExpenseForm,
  isAddButtonDisabled,
  isLoading,
  columns,
  modifiedData,
  form,
}) => {
  return (
    <>
      <Form
        name="add-expenses-direction"
        validateMessages={validateMessages}
        onFinish={onFinish}
        labelCol={{
          span: 8,
        }}
        form={newExpenseForm}
        wrapperCol={{
          span: 20,
        }}
        style={{
          maxWidth: 900,
        }}
      >
        <Form.Item
          name="amount"
          rules={[
            {
              required: true,
            },
          ]}
          style={{
            display: 'inline-block',
            width: '100px',
          }}
        >
          <InputNumber min={0} placeholder="Գումար" />
        </Form.Item>
        <Form.Item
          name="direction"
          rules={[
            {
              required: true,
            },
          ]}
          style={{
            display: 'inline-block',
            width: '220px',
          }}
        >
          <Select
            showSearch
            style={{
              width: 200,
            }}
            placeholder="Ուղղություն"
            optionFilterProp="children"
            filterOption={(input, option) =>
              (option?.label.toLowerCase() ?? '').includes(
                input.toLocaleLowerCase(),
              )
            }
            filterSort={(optionA, optionB) =>
              (optionA?.label ?? '')
                .toLowerCase()
                .localeCompare((optionB?.label ?? '').toLowerCase())
            }
            options={eDOptions}
          />
        </Form.Item>

        <Form.Item
          name="expense_date"
          style={{
            display: 'inline-block',
            width: '320px',
          }}
        >
          <DatePicker
            format={dateFormat}
            placeholder="Ընտրեք ամսաթիվը"
            style={{ width: '100%' }}
          />
        </Form.Item>
        <Button
          type="primary"
          htmlType="submit"
          loading={addItemMutation.isLoading}
          style={{ marginBottom: 16 }}
          disabled={isAddButtonDisabled}
        >
          Ավելացնել
        </Button>
      </Form>
      <Table
        loading={!!isLoading}
        columns={columns}
        dataSource={modifiedData}
        form={form}
        size="medium"
      />
    </>
  );
};

export default ExpensesBrowserView;
