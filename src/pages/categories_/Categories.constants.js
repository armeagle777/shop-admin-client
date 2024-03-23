export const containerStyles = { width: '100%' };

export const spaceCompactStyles = { justifyContent: 'center' };

export const listStyles = {
  position: 'bottom',
  align: 'center',
};

export const formItemsStyles = {
  name: {
    width: '80%',
  },
  browserName: {
    display: 'inline-block',
    width: 'calc(50% - 8px)',
    marginRight: 8,
  },
  submitButton: { outline: 'none' },
  labelCol: {
    span: 8,
  },
  wrapperCol: {
    span: 20,
  },
  coreStyles: {
    maxWidth: 600,
  },
};

export const formItemRules = {
  name: [
    {
      required: true,
    },
  ],
};
