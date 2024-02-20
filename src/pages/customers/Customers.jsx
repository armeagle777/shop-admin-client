import { useState, useEffect } from 'react';
import delve from 'dlv';
import { toast } from 'react-toastify';
import { DeleteOutlined, EditOutlined } from '@ant-design/icons';
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import { Avatar, Button, Form, Image, Modal, Space } from 'antd';
import { messages } from '../../utils/constants';
import { formatImageUrl, generateRandomColor } from '../../utils/helpers';
import { addCustomer, deleteCustomer, getCustomers } from '../../api/serverApi';
import Alert from '../../components/alert/Alert';
import AddCustomerForm from '../../components/shared/addCutomerForm/AddCustomerForm';
import PopConfirm from '../../components/shared/popConfirm/PopConfirm';

import { useNavigate } from 'react-router-dom';
import { BrowserView, MobileView } from 'react-device-detect';
import CustomersBrowserView from './CustomersBrowserView';
import CustomersMobileView from './CustomersMobileView';

const Customers = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [queryString, setQueryString] = useState('');
  const [showAddCustomerModal, setShowAddCustomerModal] = useState(false);
  const [showProgress, setShowProgress] = useState(false);
  const [allowPopConfirm, setAllowPopConfirm] = useState(false);
  const { data, isLoading, isError, error } = useQuery(
    ['customers', queryString],
    () => getCustomers({ query: queryString }),
    {
      keepPreviousData: true,
    },
  );

  const navigate = useNavigate();
  const queryClient = useQueryClient();
  const [addCustomerForm] = Form.useForm();
  const { data: customers = [], meta } = { ...data };
  const modifiedData = customers.map(({ id, attributes }) => ({
    key: id,
    ...attributes,
  }));

  useEffect(() => {
    const url = new URL(window.location);
    const query = url.searchParams.get('query');
    setSearchTerm(query || '');
    setQueryString(query);
  }, []);

  const [form] = Form.useForm();

  const onOpenCustomerModal = () => {
    setShowAddCustomerModal(true);
  };

  const onCloseCustomerModal = () => {
    setShowAddCustomerModal(false);
  };

  const onSubmit = (values) => {
    addItemMutation.mutate(values);
  };

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

  const deleteItemMutation = useMutation((itemId) => deleteCustomer(itemId), {
    onSuccess: () => {
      queryClient.invalidateQueries('customers');
      toast.success(messages.customers.deleteSuccess, {
        progress: undefined,
      });
      setShowProgress(false);
      setAllowPopConfirm(false);
    },
    onError: () => {
      toast.error(messages.customers.deleteError, {
        progress: undefined,
      });
      setShowProgress(false);
      setAllowPopConfirm(false);
    },
  });

  const handleSearch = () => {
    const url = new URL(window.location);

    if (searchTerm.trim() === '') {
      url.searchParams.delete('query');
    } else {
      url.searchParams.set('query', searchTerm);
    }

    window.history.pushState({}, '', url);
    setQueryString(searchTerm.trim());
  };

  const handleDelete = (id) => {
    setShowProgress(true);
    deleteItemMutation.mutate(id);
  };

  const onEditClick = (id) => {
    navigate(`${id}`);
  };

  const columns = [
    {
      title: 'Անուն Ազգանուն',
      dataIndex: 'full_name',
      width: '25%',
      render: (_, record) => (
        <span>
          {record.first_name} {record.last_name}
        </span>
      ),
    },
    {
      title: 'Նկար',
      dataIndex: 'Avatar',
      width: '10%',
      render: (_, record) => {
        const src = delve(record, 'Avatar.data.attributes.url');
        return src ? (
          <Image
            width={60}
            height={70}
            src={formatImageUrl(src)}
            placeholder={<Image preview={false} src="/image_placeholder.jpg" width={60} height={70} />}
          />
        ) : (
          <Avatar
            shape="square"
            style={{
              backgroundColor: generateRandomColor(),
              verticalAlign: 'middle',
              border: 'none',
            }}
            size="large"
            gap={2}
          >
            {record.first_name || ''}
          </Avatar>
        );
      },
    },
    {
      title: 'Հեռ․',
      dataIndex: 'phone_number',
      render: (_, record) => {
        const contacts = delve(record, 'contacts.data');

        const extraContacts =
          !contacts || contacts?.length === 0 ? '' : '/' + contacts.map((c) => c.attributes.phone_number).join(',');
        const phone_number = record.phone_number;
        return `${phone_number}  ${extraContacts}`;
      },
    },
    {
      title: 'Հասցե',
      render: (_, record) => {
        const address = record?.addresses.data[0];
        const index = delve(address, 'attributes.index');
        const street = delve(address, 'attributes.street');
        return `${street || ''} ${index || ''}`;
      },
    },
    {
      title: 'Գործողություններ',
      dataIndex: 'operation',
      render: (_, record) => {
        const itemId = record.key;
        return (
          <Space>
            <Button
              icon={<EditOutlined />}
              size="small"
              title="Խմբագրել"
              type="default"
              onClick={() => onEditClick(itemId)}
            />
            <PopConfirm
              loading={isLoading}
              itemId={itemId}
              onConfirm={handleDelete}
              showProgress={showProgress}
              allowPopConfirm={allowPopConfirm}
              setAllowPopConfirm={setAllowPopConfirm}
              icon={<DeleteOutlined />}
              buttonTitle="Հեռացնել"
            />
          </Space>
        );
      },
    },
  ];

  if (isError) {
    return <Alert type="error" message={error.message} />;
  }

  return (
    <>
      <BrowserView>
        <CustomersBrowserView
          columns={columns}
          modifiedData={modifiedData}
          form={form}
          onOpenCustomerModal={onOpenCustomerModal}
          isLoading={isLoading}
          searchTerm={searchTerm}
          setSearchTerm={setSearchTerm}
          handleSearch={handleSearch}
        />
      </BrowserView>
      <MobileView>
        <CustomersMobileView
          showProgress={showProgress}
          handleDelete={handleDelete}
          modifiedData={modifiedData}
          isLoading={isLoading}
          allowPopConfirm={allowPopConfirm}
          setAllowPopConfirm={setAllowPopConfirm}
          onOpenCustomerModal={onOpenCustomerModal}
          searchTerm={searchTerm}
          setSearchTerm={setSearchTerm}
          handleSearch={handleSearch}
        />
      </MobileView>
      <Modal
        title="Ավելացնել նոր հաճախորդ"
        centered
        open={showAddCustomerModal}
        onCancel={onCloseCustomerModal}
        width={800}
        footer={null}
      >
        <AddCustomerForm
          onCancel={onCloseCustomerModal}
          onSubmit={onSubmit}
          isLoadingAdd={addItemMutation.isLoading}
          form={addCustomerForm}
        />
      </Modal>
    </>
  );
};
export default Customers;
