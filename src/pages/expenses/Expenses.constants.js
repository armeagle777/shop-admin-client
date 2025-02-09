export const mbViewListPgStyles = {
  position: 'bottom',
  align: 'center',
};

export const addExpenseBrFormProps = {
  style: {
    maxWidth: 1100,
  },
  labelCol: {
    span: 8,
  },
  wrapperCol: {
    span: 20,
  },
};

export const formItemNames = {
  AMOUNT: 'amount',
  DIRECTION: 'direction',
  EXOENSE_DATE: 'expense_date',
  FORM: 'add-expenses-direction',
  COMMENT: 'comment',
};

export const formItemsStyles = {
  EXPENSE_DATE: {
    width: '320px',
    display: 'inline-block',
  },
  COMMENT: {
    width: '320px',
    display: 'inline-block',
  },
  EXPENSE_DATE_DATEPICKER: { width: '100%' },
  AMOUNT: {
    display: 'inline-block',
    width: '100px',
  },
  DIRECTION: {
    display: 'inline-block',
    width: '220px',
  },
  DIRECTION_SELECT: {
    width: 200,
  },
  SUBMIT_BUTTON: { marginBottom: 16 },
};

export const formItemsRules = {
  AMOUNT: [
    {
      required: true,
    },
  ],
  DIRECTION: [
    {
      required: true,
    },
  ],
  COMMENT: [
    {
      required: false,
    },
  ],
};

export const validateMessages = {
  required: '${label} պարտադիր է!',
  types: {
    email: '${label}֊ի ֆորմատը սխալ է',
    number: '${label} is not a valid number!',
  },
  number: {
    range: '${label} must be between ${min} and ${max}',
  },
};
