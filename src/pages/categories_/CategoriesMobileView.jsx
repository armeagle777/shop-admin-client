import { PlusOutlined } from '@ant-design/icons';
import { Button, Form, Input, List, Space } from 'antd';

import { CategoryListItem } from '../../components';
import translations from '../../utils/translations/am.json';
import {
  ANT_SIZES,
  ANT_LAYOUTS,
  BUTTON_TYPES,
  BUTTON_HTML_TYPES,
} from '../../utils/constants';
import {
  listStyles,
  formItemRules,
  containerStyles,
  formItemsStyles,
  spaceCompactStyles,
} from './Categories.constants';

const CategoriesMobileView = ({
  data,
  onFinish,
  onDelete,
  isLoading,
  showProgress,
  isLoadingOnAdd,
  newCategoryForm,
  allowPopConfirm,
  validateMessages,
  setAllowPopConfirm,
}) => {
  const { CATEGORIES_PAGE } = translations;

  const renderListItem = (item, index) => {
    const { key, name, orders } = { ...item };
    return (
      <CategoryListItem
        key={key}
        name={name}
        itemId={key}
        orders={orders}
        onDelete={onDelete}
        isLoading={isLoading}
        showProgress={showProgress}
        allowPopConfirm={allowPopConfirm}
        setAllowPopConfirm={setAllowPopConfirm}
      />
    );
  };

  return (
    <Space direction={ANT_LAYOUTS.VERTICAL} style={containerStyles}>
      <Form
        name="add-category"
        onFinish={onFinish}
        form={newCategoryForm}
        validateMessages={validateMessages}
      >
        <Space.Compact block style={spaceCompactStyles}>
          <Form.Item
            name="name"
            rules={formItemRules}
            style={formItemsStyles.name}
          >
            <Input placeholder={CATEGORIES_PAGE.NAME_INPUT_PLACEHOLDER} />
          </Form.Item>
          <Button
            icon={<PlusOutlined />}
            loading={isLoadingOnAdd}
            type={BUTTON_TYPES.PRIMAARY}
            htmlType={BUTTON_HTML_TYPES.SUBMIT}
            style={formItemsStyles.submitButton}
          />
        </Space.Compact>
      </Form>
      <List
        dataSource={data}
        size={ANT_SIZES.LARGE}
        pagination={listStyles}
        renderItem={renderListItem}
        itemLayout={ANT_LAYOUTS.VERTICAL}
      />
    </Space>
  );
};

export default CategoriesMobileView;
