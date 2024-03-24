export const filterOption = (input, option) => {
  const fName = option.label?.props?.children[1];
  const lName = option.label?.props?.children[3];
  const phoneNumber = option.label?.props?.children[5];

  return (
    fName?.toLowerCase().indexOf(input.toLowerCase()) >= 0 ||
    lName?.toLowerCase().indexOf(input.toLowerCase()) >= 0 ||
    phoneNumber?.toLowerCase().indexOf(input.toLowerCase()) >= 0 ||
    `${fName} ${lName} ${phoneNumber}`
      .toLowerCase()
      .indexOf(input.toLowerCase()) >= 0
  );
};

export const onChange = (value, selectedOptions) => {
  console.log(value, selectedOptions);
};
