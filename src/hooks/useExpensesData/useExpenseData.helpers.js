export const filterExpenses = (expenses, filters) => {
  return expenses.filter((expense) => {
    const matchesDirection =
      filters.directions.length === 0 ||
      filters.directions.includes(expense.direction.data.attributes.name);

    const matchesDate =
      (!filters.date.start ||
        new Date(expense.expense_date) >= new Date(filters.date.start)) &&
      (!filters.date.end ||
        new Date(expense.expense_date) <= new Date(filters.date.end));

    return matchesDirection && matchesDate;
  });
};
