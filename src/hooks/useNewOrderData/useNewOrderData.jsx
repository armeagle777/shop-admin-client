import { useState } from 'react';
import dayjs from 'dayjs';
import { toast } from 'react-toastify';
import { useNavigate } from 'react-router-dom';
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';

import {
  getShops,
  addOrder,
  getCountries,
  getCustomers,
  getCategories,
} from '../../api/serverApi';
import { messages } from '../../utils/constants';
import { CustomerOptionLabel } from '../../components';
import { formatCountriesData } from '../../utils/helpers';

const useNewOrderData = ({ form }) => {
  const [formValues, setFormValues] = useState({});
  const [searchShopInput, setSearchShopInput] = useState('');
  const [searchCategoryInput, setSearchCategoryInput] = useState('');
  const [searchCustomerInput, setSearchCustomerInput] = useState('');

  const navigate = useNavigate();
  const queryClient = useQueryClient();

  const {
    isLoading,
    isFetching,
    data: countries,
  } = useQuery(['countries'], getCountries, {
    keepPreviousData: true,
  });

  const { data: customers, isLoading: searchCustomersLoading } = useQuery(
    ['customers', searchCustomerInput],
    () => getCustomers({ page: 1, pageSize: 10, query: searchCustomerInput }),
    {
      keepPreviousData: true,
    },
  );

  const {
    data: categories,
    isLoading: searchCategoriesLoading,
    isFetching: searchCategoriesFetching,
  } = useQuery(
    ['categories', searchCategoryInput],
    () =>
      getCategories({
        page: 1,
        pageSize: 10,
        searchText: searchCategoryInput,
      }),
    {
      keepPreviousData: true,
    },
  );

  const { data: shops, isLoading: searchShopsLoading } = useQuery(
    ['shops', searchShopInput],
    () => getShops({ page: 1, pageSize: 10, searchText: searchShopInput }),
    {
      keepPreviousData: true,
    },
  );

  const customerOptions = customers?.data?.map(({ id, attributes }) => {
    return {
      value: id,
      label: <CustomerOptionLabel attributes={attributes} />,
      style: { padding: '8px' },
    };
  });

  const categoriesOptions = categories?.data.map(({ id, attributes }) => ({
    value: id,
    label: attributes.name,
  }));

  const shopsOptions = shops?.data.map(({ id, attributes }) => ({
    value: id,
    label: attributes.name,
  }));

  const countriesOptions = formatCountriesData(countries);

  const disabledNextButton = isLoading || isFetching;

  const addItemMutation = useMutation({
    mutationFn: (newOrder) => {
      return addOrder(newOrder);
    },
    onSuccess: () => {
      queryClient.invalidateQueries(['orders', { filter: 'ORDERED' }]);
      toast.success(messages.orders.createSuccess, {
        progress: undefined,
      });
      form.resetFields();
      navigate('/orders');
    },
    onError: () => {
      toast.error(messages.shops.deleteError, {
        progress: undefined,
      });
    },
  });

  const onFinish = (values) => {
    form.submit();
  };

  const onSubmit = () => {
    const orderAddress = {};
    const { address, order_date, ...restData } = { ...formValues };

    const { district, street, index } = { ...address };
    if (district) {
      const [country, marz, community, settlement] = [...district];
      if (country) {
        orderAddress.country = country;
      }
      if (marz) {
        orderAddress.marz = marz;
      }
      if (community) {
        orderAddress.community = community;
      }
      if (settlement) {
        orderAddress.settlement = settlement;
      }
      if (street) {
        orderAddress.street = street;
      }
      if (index) {
        orderAddress.index = index;
      }
    }

    const newData = { ...restData, address: orderAddress };
    const formatedOrderDate = order_date
      ? dayjs(order_date.$d).format('YYYY-MM-DD')
      : dayjs(new Date()).format('YYYY-MM-DD');

    newData.order_date = formatedOrderDate;

    addItemMutation.mutate(newData);
  };

  const onCategoriesSearch = (value) => {
    setSearchCategoryInput(value);
  };

  const onShopsSearch = (value) => {
    setSearchShopInput(value);
  };

  const onCustomersSearch = (value) => {
    // if (!value.trim()) return;

    const words = value.trim().split(/\s+/);
    const firstWord = words[0];
    setSearchCustomerInput(firstWord);
  };

  return {
    onFinish,
    onSubmit,
    formValues,
    shopsOptions,
    setFormValues,
    customerOptions,
    countriesOptions,
    categoriesOptions,
    disabledNextButton,
    onAddItemIsloading: addItemMutation.isLoading,
    searchCategoriesLoading,
    searchCategoriesFetching,
    onCategoriesSearch,
    onShopsSearch,
    searchShopsLoading,
    onCustomersSearch,
    searchCustomersLoading,
  };
};

export default useNewOrderData;
