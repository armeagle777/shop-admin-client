export const filterOption = (input, option) => {
  const children = option.label?.props?.attributes || [];
  const fName = children.first_name || '';
  const lName = children.last_name || '';
  const phoneNumber = children.phone_number || '';

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
