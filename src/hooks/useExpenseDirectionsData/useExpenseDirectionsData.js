import { useQuery } from '@tanstack/react-query';

import { getExpenseDirections } from '../../api/serverApi';

const useExpenseDirectionsData = () => {
  const {
    data = { data: [] },
    isFetching,
    isLoading,
  } = useQuery(['expense-directions'], () => getExpenseDirections(), {
    keepPreviousData: true,
  });
  const eDOptions = data.data.map(({ id, attributes }) => ({
    value: id,
    label: attributes.name,
  }));

  return { expenseDirections: eDOptions, isLoading: isLoading || isFetching };
};

export default useExpenseDirectionsData;