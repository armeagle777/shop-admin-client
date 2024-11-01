export const filterOption = (input, option) => {
  const children = option.label?.props?.children || [];

  const fName = children[1] || '';
  const lName = children[3] || '';
  const phoneNumber = children[5] || '';

  return (
    fName?.toLowerCase().indexOf(input.toLowerCase()) >= 0 ||
    lName?.toLowerCase().indexOf(input.toLowerCase()) >= 0 ||
    phoneNumber?.toLowerCase().indexOf(input.toLowerCase()) >= 0 ||
    `${fName} ${lName} ${phoneNumber}`
      .toLowerCase()
      .indexOf(input.toLowerCase()) >= 0
  );
};

export const filterCategories = (input, category) => {
  const label = category.label || '';

  return label.toLowerCase().indexOf(input.toLowerCase()) >= 0;
};

export const onChange = (value, selectedOptions) => {
  console.log(value, selectedOptions);
};
