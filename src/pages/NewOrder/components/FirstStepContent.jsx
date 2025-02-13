import { Button, Form, Input, InputNumber, Modal, Select, Space } from 'antd';

import {
  nameInputRules,
  shopInputRules,
  sizeInputRules,
  catInputStyles,
  priceInputRules,
  shopInputStyles,
  netCostInputRules,
  categoryInputRules,
  customerSpaceStyles,
  customerSelectStyles,
} from '../NewOrder.constants';
import tranlsations from '../../../utils/translations/am.json';
import { PlusOutlined } from '@ant-design/icons';
import { ANT_SIZES, BUTTON_TYPES } from '../../../utils/constants';
import { useCategoriesData } from '../../../hooks';
import { AddCategoryForm } from '../../../components/AddCategoryForm';
import { filterCategories } from '../NewOrder.helpers';

const FirstStepContent = ({
  shopsOptions,
  onShopsSearch,
  categoriesOptions,
  searchShopsLoading,
  onCategoriesSearch,
  searchCategoriesLoading,
}) => {
  const { NEW_ORDER_PAGE } = tranlsations;
  const [newCategoryForm] = Form.useForm();
  const { onSubmit, isLoadingOnAdd, showCategoryModal, setShowCategoryModal } =
    useCategoriesData({ newCategoryForm });

  const validateMessages = {
    required: 'Անունը պարտադիր է!',
    types: {
      email: '${label}֊ի ֆորմատը սխալ է',
      number: '${label} is not a valid number!',
    },
  };
  return (
    <>
      <Form.Item
        name="name"
        rules={nameInputRules}
        label={NEW_ORDER_PAGE.NAME_INPUT_LABEL}
      >
        <Input />
      </Form.Item>
      <Form.Item
        name="description"
        rules={sizeInputRules}
        label={NEW_ORDER_PAGE.SIZE_INPUT_LABEL}
      >
        <Input />
      </Form.Item>
      {/* <Form.Item
        name="category"
        rules={categoryInputRules}
        label={NEW_ORDER_PAGE.CAT_INPUT_LABEL}
      >
        <Select style={catInputStyles} options={categoriesOptions} />
      </Form.Item> */}
      <Form.Item
        rules={categoriesOptions}
        label={NEW_ORDER_PAGE.CAT_INPUT_LABEL}
      >
        <Space.Compact style={customerSpaceStyles}>
          <Form.Item name="category" rules={categoryInputRules}>
            <Select
              showSearch
              loading={searchCategoriesLoading}
              options={categoriesOptions}
              optionFilterProp="children"
              onSearch={onCategoriesSearch}
              filterOption={false}
              style={customerSelectStyles}
              placeholder={NEW_ORDER_PAGE.CAT_INPUT_LABEL}
            />
          </Form.Item>
          <Form.Item>
            <Button
              icon={<PlusOutlined />}
              size={ANT_SIZES.MEDIUM}
              type={BUTTON_TYPES.PRIMARY}
              onClick={() => setShowCategoryModal(true)}
            />
          </Form.Item>
        </Space.Compact>
      </Form.Item>
      <Form.Item
        name="shop"
        rules={shopInputRules}
        label={NEW_ORDER_PAGE.SHOP_INPUT_LABEL}
      >
        <Select
          showSearch
          filterOption={false}
          loading={searchShopsLoading}
          style={shopInputStyles}
          options={shopsOptions}
          onSearch={onShopsSearch}
          optionFilterProp="children"
        />
      </Form.Item>
      <Form.Item
        name="net_cost"
        rules={netCostInputRules}
        label={NEW_ORDER_PAGE.COST_INPUT_LABEL}
      >
        <InputNumber />
      </Form.Item>
      <Form.Item
        name="selling_price"
        rules={priceInputRules}
        label={NEW_ORDER_PAGE.PRICE_INPUT_LABEL}
      >
        <InputNumber />
      </Form.Item>
      <Modal
        centered
        width={800}
        footer={null}
        open={showCategoryModal}
        onCancel={() => setShowCategoryModal(false)}
        title={NEW_ORDER_PAGE.CATEGORY_MODAL_TITlE}
      >
        <AddCategoryForm
          onFinish={onSubmit}
          isLoadingOnAdd={isLoadingOnAdd}
          newCategoryForm={newCategoryForm}
          validateMessages={validateMessages}

          // onCancel={() => setShowCategoryModal(false)}
        />
      </Modal>
    </>
  );
};

export default FirstStepContent;
