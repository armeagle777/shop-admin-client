export const filterOption = (input, option) => {
  const words = input.trim().split(' ');

  const secondWord = words[1] || '';

  const children = option.label?.props?.attributes || [];
  const fName = children.first_name || '';
  const lName = children.last_name || '';
  const phoneNumber = children.phone_number || '';

  return (
    fName?.toLowerCase().indexOf(secondWord.toLowerCase()) >= 0 ||
    lName?.toLowerCase().indexOf(secondWord.toLowerCase()) >= 0 ||
    phoneNumber?.toLowerCase().indexOf(secondWord.toLowerCase()) >= 0 ||
    `${fName} ${lName} ${phoneNumber}`
      .toLowerCase()
      .indexOf(secondWord.toLowerCase()) >= 0
  );
};

export const filterCategories = (input, category) => {
  const label = category.label || '';

  return label.toLowerCase().indexOf(input.toLowerCase()) >= 0;
};

export const onChange = (value, selectedOptions) => {
  console.log(value, selectedOptions);
};
