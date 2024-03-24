import { useState } from 'react';
import { Button, Form, Steps, theme } from 'antd';

import {
  FirstStepContent,
  ThirdStepContent,
  SecondStepContent,
} from './components';
import {
  formStyles,
  prevBtnStyles,
  formItemLayout,
  btnsWrapperStyles,
} from './NewOrder.constants';
import { useNewOrderData } from '../../hooks';
import { BUTTON_TYPES } from '../../utils/constants';
import translations from '../../utils/translations/am.json';

const NewOrder = () => {
  const [current, setCurrent] = useState(0);

  const [form] = Form.useForm();
  const { NEW_ORDER_PAGE } = translations;
  const {
    onFinish,
    onSubmit,
    formValues,
    shopsOptions,
    setFormValues,
    customerOptions,
    countriesOptions,
    categoriesOptions,
    disabledNextButton,
    onAddItemIsloading,
  } = useNewOrderData({ form });

  const { token } = theme.useToken();
  const contentStyle = {
    marginTop: 16,
    paddingTop: 10,
    lineHeight: '260px',
    textAlign: 'center',
    color: token.colorTextTertiary,
    borderRadius: token.borderRadiusLG,
    backgroundColor: token.colorFillAlter,
    border: `1px dashed ${token.colorBorder}`,
  };

  const steps = [
    {
      title: NEW_ORDER_PAGE.FIRST_STEP_TITLE,
      content: (
        <FirstStepContent
          setFormValues={setFormValues}
          shopsOptions={shopsOptions || []}
          categoriesOptions={categoriesOptions || []}
        />
      ),
    },
    {
      title: NEW_ORDER_PAGE.SECOND_STEP_TITLE,
      content: (
        <SecondStepContent
          countriesOptions={countriesOptions}
          customerOptions={customerOptions || []}
        />
      ),
    },
    {
      title: NEW_ORDER_PAGE.THIRD_STEP_TITLE,
      content: <ThirdStepContent setFormValues={setFormValues} />,
    },
  ];

  const items = steps.map((item) => ({
    key: item.title,
    title: item.title,
  }));

  const onNext = async () => {
    try {
      await form.validateFields([
        'shop',
        'name',
        'net_cost',
        'category',
        'customer',
        'description',
        'selling_price',
      ]);
      setFormValues({ ...formValues, ...form.getFieldsValue() });
      setCurrent((prev) => prev + 1);
    } catch {}
  };

  const onPrev = () => {
    setCurrent(current - 1);
  };

  return (
    <>
      <Steps current={current} items={items} />
      <div style={contentStyle}>
        <Form
          form={form}
          name="new-order"
          style={formStyles}
          scrollToFirstError
          onFinish={onFinish}
          {...formItemLayout}
        >
          {steps[current].content}
        </Form>
      </div>
      <div style={btnsWrapperStyles}>
        {current < steps.length - 1 && (
          <Button
            onClick={onNext}
            type={BUTTON_TYPES.PRIMARY}
            disabled={disabledNextButton}
          >
            {NEW_ORDER_PAGE.NEXT_BUTTON_TEXT}
          </Button>
        )}
        {current === steps.length - 1 && (
          <Button
            onClick={onSubmit}
            type={BUTTON_TYPES.PRIMARY}
            loading={onAddItemIsloading}
          >
            {NEW_ORDER_PAGE.SUBMIT_BUTTON_TEXT}
          </Button>
        )}
        {current > 0 && (
          <Button
            onClick={onPrev}
            style={prevBtnStyles}
            disabled={onAddItemIsloading}
          >
            {NEW_ORDER_PAGE.PREV_BUTTON_TEXT}
          </Button>
        )}
      </div>
    </>
  );
};

export default NewOrder;
