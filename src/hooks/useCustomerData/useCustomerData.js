import { toast } from 'react-toastify';
import { useMutation, useQueryClient } from '@tanstack/react-query';

import { addCustomer } from '../../api/serverApi';
import { messages } from '../../utils/constants';

const useCustomerData = ({ addCustomerForm }) => {
  const [showCustomerModal, setShowCustomerModal] = useState(false);
  const queryClient = useQueryClient();

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
    showCustomerModal,
    onOpenCustomerModal,
    onCloseCustomerModal,
    onSubmit: handleSubmit,
    onAddIsLoading: addItemMutation.isLoading,
  };
};

export default useCustomerData;
