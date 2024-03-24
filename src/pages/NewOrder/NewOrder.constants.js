export const formItemLayout = {
  labelCol: {
    xs: {
      span: 24,
    },
    sm: {
      span: 8,
    },
  },
  wrapperCol: {
    xs: {
      span: 24,
    },
    sm: {
      span: 16,
    },
  },
};

export const formStyles = {
  maxWidth: 600,
};

export const btnsWrapperStyles = {
  marginTop: 24,
};

export const prevBtnStyles = {
  margin: '0 8px',
};

export const nameInputRules = [
  {
    required: true,
    message: 'Պատվերի անունը պարտադիր է',
    whitespace: true,
  },
];

export const sizeInputRules = [
  {
    required: true,
    message: 'Չափսը պարտադիր դաշտ է',
    whitespace: true,
  },
];

export const categoryInputRules = [
  {
    required: true,
    message: 'Կատեգորիան պարտադիր է',
  },
];

export const shopInputRules = [
  {
    required: true,
    message: 'Խանութը պարտադիր դաշտ է',
  },
];

export const netCostInputRules = [
  {
    type: 'number',
    min: 0,
    required: true,
    message: 'Ինքնարժեքը պարտադիր դաշտ է',
  },
];

export const priceInputRules = [
  {
    type: 'number',
    min: 0,
    required: true,
    message: 'Վաճառքի գինը պարտադիր դաշտ է',
  },
];

export const catInputStyles = {
  width: 300,
};

export const shopInputStyles = {
  width: 300,
};

export const datePickerStyles = { width: '100%' };

export const customerInputRules = [
  {
    required: true,
    message: 'Պարտադիր դաշտ է',
  },
];

export const customerSpaceStyles = {
  width: '100%',
};

export const customerSelectStyles = {
  width: 370,
  padding: -5,
};

export const allowedImageExt = '.png,.jpeg,.jpg';

export const uploadFieldStyles = {
  marginTop: 8,
};
