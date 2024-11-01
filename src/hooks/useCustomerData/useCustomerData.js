import { useState } from 'react';
import { toast } from 'react-toastify';
import { useMutation, useQueryClient, useQuery } from '@tanstack/react-query';

import { messages } from '../../utils/constants';
import { addCustomer, getCustomerById } from '../../api/serverApi';

const useCustomerData = ({ addCustomerForm, customerId }) => {
  const [showCustomerModal, setShowCustomerModal] = useState(false);
  const queryClient = useQueryClient();

  const { data, isLoading, isFetching, isError, error } = useQuery(
    ['customers', customerId],
    () => getCustomerById(customerId),
    {
      keepPreviousData: true,
      enabled: !!customerId,
    },
  );

  const addItemMutation = useMutation((item) => addCustomer(item), {
    onSuccess: (data) => {
      if (data.data?.error) {
        return toast.error(data.data?.error || 'Սխալ է տեղի ունեցել', {
          progress: undefined,
        });
      }
      queryClient.invalidateQueries('customers');
      toast.success(messages.customers.createSuccess, {
        progress: undefined,
      });
      setShowAddCustomerModal(false);
      addCustomerForm.resetFields();
    },
    onError: (error, variables, context, mutation) => {
      console.log('err:::::: ', error);

      toast.error(error.response?.data?.error?.message || error.message, {
        progress: undefined,
      });
    },
  });

  const handleSubmit = (values) => {
    addItemMutation.mutate(values);
  };

  const onOpenCustomerModal = () => {
    setShowCustomerModal(true);
  };
  const onCloseCustomerModal = () => {
    setShowCustomerModal(false);
  };

  return {
    data,
    error,
    isError,
    showCustomerModal,
    onOpenCustomerModal,
    onCloseCustomerModal,
    onSubmit: handleSubmit,
    isLoading: isLoading || isFetching,
    onAddIsLoading: addItemMutation.isLoading,
  };
};

export default useCustomerData;
