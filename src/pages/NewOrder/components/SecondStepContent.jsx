import { PlusOutlined } from '@ant-design/icons';
import {
  Form,
  Input,
  Modal,
  Space,
  Select,
  Button,
  Cascader,
  DatePicker,
} from 'antd';

import { useCustomerData } from '../../../hooks';
import { AddCustomerForm } from '../../../components';
import { onChange } from '../NewOrder.helpers';
import translations from '../../../utils/translations/am.json';
import { ANT_SIZES, BUTTON_TYPES, dateFormat } from '../../../utils/constants';
import {
  datePickerStyles,
  customerInputRules,
  customerSpaceStyles,
  customerSelectStyles,
} from '../NewOrder.constants';

const SecondStepContent = ({
  countriesOptions,
  customerOptions,
  onCustomersSearch,
  searchCustomersLoading,
}) => {
  const [addCustomerForm] = Form.useForm();
  const { NEW_ORDER_PAGE } = translations;

  const {
    onSubmit,
    onAddIsLoading,
    showCustomerModal,
    onOpenCustomerModal,
    onCloseCustomerModal,
  } = useCustomerData({ addCustomerForm });

  return (
    <>
      <Form.Item name="order_date" label={NEW_ORDER_PAGE.DATEPICKER_LABEL}>
        <DatePicker
          format={dateFormat}
          style={datePickerStyles}
          placeholder={NEW_ORDER_PAGE.DATEPICKER_PLACEHOLDER}
        />
      </Form.Item>
      <Form.Item
        name={['address', 'district']}
        label={NEW_ORDER_PAGE.DISTRICT_LABEL}
      >
        <Cascader
          onChange={onChange}
          options={countriesOptions}
          onSearch={(value) => console.log(value)}
          placeholder={NEW_ORDER_PAGE.DISTRICT_PLACEHOLDER}
        />
      </Form.Item>
      <Form.Item
        name={['address', 'street']}
        label={NEW_ORDER_PAGE.STREET_LABEL}
      >
        <Input placeholder={NEW_ORDER_PAGE.STREET_PLACEHOLDER} />
      </Form.Item>
      <Form.Item
        name={['address', 'index']}
        label={NEW_ORDER_PAGE.POSTINDEX_LABEL}
      >
        <Input placeholder={NEW_ORDER_PAGE.POSTINDEX_PLACEHOLDER} />
      </Form.Item>
      <Form.Item
        rules={customerInputRules}
        label={NEW_ORDER_PAGE.CUSTOMER_INPUT_LABEL}
      >
        <Space.Compact style={customerSpaceStyles}>
          <Form.Item name="customer" rules={customerInputRules}>
            <Select
              showSearch
              options={customerOptions}
              optionFilterProp="children"
              filterOption={false}
              style={customerSelectStyles}
              placeholder={NEW_ORDER_PAGE.CUSTOMER_SELECT_PLACEHOLDER}
              loading={searchCustomersLoading}
              onSearch={onCustomersSearch}
            />
          </Form.Item>
          <Form.Item>
            <Button
              icon={<PlusOutlined />}
              size={ANT_SIZES.MEDIUM}
              type={BUTTON_TYPES.PRIMARY}
              onClick={onOpenCustomerModal}
            />
          </Form.Item>
        </Space.Compact>
      </Form.Item>
      <Form.Item name="comment" label={NEW_ORDER_PAGE.COMMENT}>
        <Input placeholder={NEW_ORDER_PAGE.COMMENT} />
      </Form.Item>
      <Modal
        centered
        width={800}
        footer={null}
        open={showCustomerModal}
        onCancel={onCloseCustomerModal}
        title={NEW_ORDER_PAGE.CUSTOMER_MODAL_TITlE}
      >
        <AddCustomerForm
          onSubmit={onSubmit}
          form={addCustomerForm}
          isLoadingAdd={onAddIsLoading}
          onCancel={onCloseCustomerModal}
        />
      </Modal>
    </>
  );
};

export default SecondStepContent;
