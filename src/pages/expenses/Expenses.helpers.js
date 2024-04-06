export const filterOptions = (input, option) =>
  (option?.label.toLowerCase() ?? '').includes(input.toLocaleLowerCase());

export const filterSort = (optionA, optionB) =>
  (optionA?.label ?? '')
    .toLowerCase()
    .localeCompare((optionB?.label ?? '').toLowerCase());
