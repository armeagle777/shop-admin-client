import { useQuery } from '@tanstack/react-query';
import { getOrderById } from '../../api/serverApi';

const useOrderData = ({ orderId }) => {
  const { data, isLoading, isFetching, isError, error } = useQuery(
    ['orders', orderId],
    () => getOrderById(orderId),
    {
      keepPreviousData: true,
    },
  );
  return { data, isLoading, isFetching, isError, error };
};

export default useOrderData;
