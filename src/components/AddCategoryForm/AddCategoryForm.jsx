import { Button, Form, Input } from 'antd';
import translations from '../../utils/translations/am.json';
import { BUTTON_HTML_TYPES, BUTTON_TYPES } from '../../utils/constants';
import {
  formItemRules,
  formItemsStyles,
} from '../../pages/Categories/Categories.constants';

const AddCategoryForm = ({
  onFinish,
  isLoadingOnAdd,
  newCategoryForm,
  validateMessages,
}) => {
  const { CATEGORIES_PAGE } = translations;
  return (
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
        type={BUTTON_TYPES.PRIMARY}
        htmlType={BUTTON_HTML_TYPES.SUBMIT}
      >
        {CATEGORIES_PAGE.ADD_BUTTON_TEXT}
      </Button>
    </Form>
  );
};

export default AddCategoryForm;
