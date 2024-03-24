import { Form, Input, InputNumber, Select } from 'antd';

import {
  nameInputRules,
  shopInputRules,
  sizeInputRules,
  catInputStyles,
  priceInputRules,
  shopInputStyles,
  netCostInputRules,
  categoryInputRules,
} from '../NewOrder.constants';
import tranlsations from '../../../utils/translations/am.json';

const FirstStepContent = ({ categoriesOptions, shopsOptions }) => {
  const { NEW_ORDER_PAGE } = tranlsations;
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
      <Form.Item
        name="category"
        rules={categoryInputRules}
        label={NEW_ORDER_PAGE.CAT_INPUT_LABEL}
      >
        <Select style={catInputStyles} options={categoriesOptions} />
      </Form.Item>
      <Form.Item
        name="shop"
        rules={shopInputRules}
        label={NEW_ORDER_PAGE.SHOP_INPUT_LABEL}
      >
        <Select style={shopInputStyles} options={shopsOptions} />
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
    </>
  );
};

export default FirstStepContent;
