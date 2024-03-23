import { Button, Form, Input } from 'antd';

import { Table } from '../../components';
import translations from '../../utils/translations/am.json';
import { BUTTON_HTML_TYPES, BUTTON_TYPES } from '../../utils/constants';
import { formItemRules, formItemsStyles } from './Categories.constants';

const CategoriesBrowserView = ({
  data,
  columns,
  onFinish,
  isLoading,
  isLoadingOnAdd,
  newCategoryForm,
  validateMessages,
}) => {
  const [form] = Form.useForm();
  const { CATEGORIES_PAGE } = translations;

  return (
    <>
      <Form
        name="add-category"
        onFinish={onFinish}
        form={newCategoryForm}
        style={formItemsStyles.coreStyles}
        labelCol={formItemsStyles.labelCol}
        validateMessages={validateMessages}
        wrapperCol={formItemsStyles.wrapperCol}
      >
        <Form.Item
          name="name"
          rules={formItemRules.name}
          style={formItemsStyles.browserName}
        >
          <Input placeholder={CATEGORIES_PAGE.NAME_INPUT_PLACEHOLDER} />
        </Form.Item>
        <Button
          loading={isLoadingOnAdd}
          type={BUTTON_TYPES.PRIMAARY}
          htmlType={BUTTON_HTML_TYPES.SUBMIT}
        >
          {CATEGORIES_PAGE.ADD_BUTTON_TEXT}
        </Button>
      </Form>
      <Table
        form={form}
        size="medium"
        columns={columns}
        dataSource={data}
        loading={isLoading}
      />
    </>
  );
};

export default CategoriesBrowserView;
