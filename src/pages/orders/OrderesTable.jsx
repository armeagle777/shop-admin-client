import {
  CloseOutlined,
  DashOutlined,
  DeleteOutlined,
  EditOutlined,
  InfoCircleFilled,
  RedoOutlined,
  StepForwardOutlined,
} from '@ant-design/icons';
import { Link } from 'react-router-dom';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { Avatar, Button, Image, Space, Tooltip } from 'antd';
import { format } from 'date-fns';
import delve from 'dlv';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import { deleteOrder, editOrder, removeOrder } from '../../api/serverApi';
import Alert from '../../components/alert/Alert';
import PopConfirm from '../../components/shared/popConfirm/PopConfirm';
import PopConfirmEdit from '../../components/shared/popConfirm/PopConfirmEdit';
import Table from '../../components/table/Table';
import { messages } from '../../utils/constants';
import { formatImageUrl, generateRandomColor } from '../../utils/helpers';

const OrderedTable = ({ data, isLoading, error, isError, form, filter, queryString }) => {
  const [showProgress, setShowProgress] = useState(false);
  const [allowPopConfirm, setAllowPopConfirm] = useState(false);
  const navigate = useNavigate();
  const queryClient = useQueryClient();
  const handleEditClick = (id) => {
    navigate(`${id}`);
  };
  const columns = {
    ORDERED: [
      {
        title: 'Անուն',
        render: (_, record) => {
          return record.reference_url ? (
            <a target="_blank" href={record.reference_url}>
              {record.name}
            </a>
          ) : (
            record.name
          );
        },
      },
      {
        title: 'Չափս',
        dataIndex: 'description',
      },
      {
        title: 'Նկարներ',
        render: (_, record) => {
          const images = record.images?.data;

          return (
            <Image.PreviewGroup
              preview={{
                onChange: (current, prev) => console.log(`current index: ${current}, prev index: ${prev}`),
              }}
            >
              {images?.map((image, index) => {
                const src = delve(image, 'attributes.url');
                return (
                  <Image
                    key={index}
                    width={50}
                    src={formatImageUrl(src)}
                    placeholder={<Image preview={false} src="/image_placeholder.jpg" width={50} />}
                  />
                );
              })}
            </Image.PreviewGroup>
          );
        },
      },
      {
        title: 'Ինքնարժեք',
        dataIndex: 'net_cost',
      },
      {
        title: 'Վաճառքի գին',
        dataIndex: 'selling_price',
      },
      {
        title: 'Պատվերի ա/թ',
        render: (_, record) => {
          const created_date = record.order_date || record.createdAt;
          return format(new Date(created_date), 'dd-MM-yyy');
        },
      },
      {
        title: 'Հաճախորդ',
        render: (_, record) => {
          const customer = delve(record, 'customer.data.attributes');
          const customerId = delve(record, 'customer.data.id');

          const contacts = delve(record, 'customer.data.attributes.contacts.data');

          const extraContacts =
            !contacts || contacts?.length === 0 ? '' : '/' + contacts.map((c) => c.attributes.phone_number).join(',');
          const phone_number = customer?.phone_number;
          const customerExtraInfo = `${phone_number}  ${extraContacts}`;
          return (
            <>
              <Link to={`/customers/${customerId}`}>
                {customer?.first_name || ''} {customer?.last_name || ''}
              </Link>
              {(phone_number || contacts?.length > 0) && (
                <Tooltip title={customerExtraInfo} placement="top">
                  <InfoCircleFilled style={{ marginLeft: 2 }} />
                </Tooltip>
              )}
            </>
          );
        },
      },
      {
        title: 'Նկար',
        dataIndex: 'Avatar',
        render: (_, record) => {
          const src = record.customer?.data?.attributes?.Avatar?.data
            ? formatImageUrl(record.customer?.data?.attributes?.Avatar?.data?.attributes?.formats?.thumbnail?.url)
            : '';
          return (
            <Avatar
              style={{
                backgroundColor: generateRandomColor(),
                verticalAlign: 'middle',
                border: 'none',
              }}
              size="large"
              gap={2}
              src={src}
            >
              {record.first_name || ''}
            </Avatar>
          );
        },
      },
      {
        title: 'Հասցե',
        render: (_, record) => {
          const address = record?.customer?.data?.attributes?.addresses.data[0];

          const index = delve(address, 'attributes.index');
          const street = delve(address, 'attributes.street');
          return `${street || ''} ${index || ''}`;
        },
      },
      {
        title: <DashOutlined />,
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
                onClick={() => {
                  handleEditClick(record.key);
                }}
              />
              <PopConfirmEdit
                loading={isLoading}
                itemId={itemId}
                onConfirm={() => onChangeStatusToAvailable(record)}
                showProgress={showProgress}
                allowPopConfirm={allowPopConfirm}
                setAllowPopConfirm={setAllowPopConfirm}
                buttonTitle="Ստացվել է"
                icon={<StepForwardOutlined />}
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
    ],
    AVAILABLE: [
      {
        title: 'Անուն',
        render: (_, record) => {
          return record.reference_url ? (
            <a target="_blank" href={record.reference_url}>
              {record.name}
            </a>
          ) : (
            record.name
          );
        },
      },
      {
        title: 'Չափս',
        dataIndex: 'description',
      },
      {
        title: 'Նկարներ',
        render: (_, record) => {
          const images = record.images?.data;

          return (
            <Image.PreviewGroup
              preview={{
                onChange: (current, prev) => console.log(`current index: ${current}, prev index: ${prev}`),
              }}
            >
              {images?.map((image, index) => {
                const src = delve(image, 'attributes.url');
                return (
                  <Image
                    key={index}
                    width={50}
                    src={formatImageUrl(src)}
                    placeholder={<Image preview={false} src="/image_placeholder.jpg" width={50} />}
                  />
                );
              })}
            </Image.PreviewGroup>
          );
        },
      },
      {
        title: 'Ինքնարժեք',
        dataIndex: 'net_cost',
      },
      {
        title: 'Վաճառքի գին',
        dataIndex: 'selling_price',
      },
      {
        title: 'Ստացման ա/թ',
        render: (_, record) => {
          const received_date = record.received_date;
          return format(new Date(received_date), 'dd-MM-yyy');
        },
        dataIndex: 'received_date',
      },
      {
        title: 'Հաճախորդ',
        render: (_, record) => {
          const customer = delve(record, 'customer.data.attributes');
          const customerId = delve(record, 'customer.data.id');
          const contacts = delve(record, 'customer.data.attributes.contacts.data');

          const extraContacts =
            !contacts || contacts?.length === 0 ? '' : '/' + contacts.map((c) => c.attributes.phone_number).join(',');
          const phone_number = customer?.phone_number;
          const customerExtraInfo = `${phone_number}  ${extraContacts}`;
          return (
            <>
              <Link to={`/customers/${customerId}`}>
                {customer?.first_name || ''} {customer?.last_name || ''}
              </Link>
              {(phone_number || contacts?.length > 0) && (
                <Tooltip title={customerExtraInfo} placement="top">
                  <InfoCircleFilled style={{ marginLeft: 2 }} />
                </Tooltip>
              )}
            </>
          );
        },
      },
      {
        title: 'Նկար',
        dataIndex: 'Avatar',
        render: (_, record) => {
          const src = record.customer?.data?.attributes?.Avatar?.data
            ? formatImageUrl(record.customer?.data?.attributes?.Avatar?.data?.attributes?.formats?.thumbnail?.url)
            : '';
          return (
            <Avatar
              style={{
                backgroundColor: generateRandomColor(),
                verticalAlign: 'middle',
                border: 'none',
              }}
              size="large"
              gap={2}
              src={src}
            >
              {record.first_name || ''}
            </Avatar>
          );
        },
      },
      {
        title: <DashOutlined />,
        dataIndex: 'operation',
        render: (_, record) => {
          const itemId = record.key;
          const cancelDisabled = record.customer?.data === null;
          const forwardDisabled = record.customer?.data === null;

          return (
            <Space>
              <Button
                icon={<EditOutlined />}
                size="small"
                title="Խմբագրել"
                type="default"
                onClick={() => {
                  handleEditClick(record.key);
                }}
              />
              <PopConfirmEdit
                loading={isLoading}
                itemId={itemId}
                onConfirm={() => onChangeStatusToDelivered(record)}
                showProgress={showProgress}
                allowPopConfirm={allowPopConfirm}
                setAllowPopConfirm={setAllowPopConfirm}
                buttonTitle="Առաքվել է"
                icon={<StepForwardOutlined />}
                disabled={forwardDisabled}
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
              {/* <PopConfirm
                loading={isLoading}
                itemId={itemId}
                onConfirm={() =>
                  onReturnOrCancel({
                    id: itemId,
                    record,
                    newStatus: 'CANCELLED',
                  })
                }
                showProgress={showProgress}
                allowPopConfirm={allowPopConfirm}
                setAllowPopConfirm={setAllowPopConfirm}
                disabled={cancelDisabled}
                icon={<CloseOutlined />}
                buttonTitle="Հրաժարվել"
              /> */}
            </Space>
          );
        },
      },
    ],
    DELIVERED: [
      {
        title: 'Անուն',
        render: (_, record) => {
          return record.reference_url ? (
            <a target="_blank" href={record.reference_url}>
              {record.name}
            </a>
          ) : (
            record.name
          );
        },
      },
      {
        title: 'Չափս',
        dataIndex: 'description',
      },
      {
        title: 'Նկարներ',
        render: (_, record) => {
          const images = record.images?.data;

          return (
            <Image.PreviewGroup
              preview={{
                onChange: (current, prev) => console.log(`current index: ${current}, prev index: ${prev}`),
              }}
            >
              {images?.map((image, index) => {
                const src = delve(image, 'attributes.url');
                return (
                  <Image
                    key={index}
                    width={50}
                    src={formatImageUrl(src)}
                    placeholder={<Image preview={false} src="/image_placeholder.jpg" width={50} />}
                  />
                );
              })}
            </Image.PreviewGroup>
          );
        },
      },
      {
        title: 'Ինքնարժեք',
        dataIndex: 'net_cost',
      },
      {
        title: 'Վաճառքի գին',
        dataIndex: 'selling_price',
      },
      {
        title: 'Առաքման ա/թ',
        dataIndex: 'deliver_date',
        render: (_, record) => {
          const deliver_date = record.deliver_date;
          return format(new Date(deliver_date), 'dd-MM-yyy');
        },
      },
      {
        title: 'Հաճախորդ',
        render: (_, record) => {
          const customer = delve(record, 'customer.data.attributes');
          const customerId = delve(record, 'customer.data.id');

          const contacts = delve(record, 'customer.data.attributes.contacts.data');

          const extraContacts =
            !contacts || contacts?.length === 0 ? '' : '/' + contacts.map((c) => c.attributes.phone_number).join(',');
          const phone_number = customer?.phone_number;
          const customerExtraInfo = `${phone_number}  ${extraContacts}`;
          return (
            <>
              <Link to={`/customers/${customerId}`}>
                {customer?.first_name || ''} {customer?.last_name || ''}
              </Link>
              {(phone_number || contacts?.length > 0) && (
                <Tooltip title={customerExtraInfo} placement="top">
                  <InfoCircleFilled style={{ marginLeft: 2 }} />
                </Tooltip>
              )}
            </>
          );
        },
      },
      {
        title: 'Նկար',
        dataIndex: 'Avatar',
        render: (_, record) => {
          const src = record.customer?.data?.attributes?.Avatar?.data
            ? formatImageUrl(record.customer?.data?.attributes?.Avatar?.data?.attributes?.formats?.thumbnail?.url)
            : '';
          return (
            <Avatar
              style={{
                backgroundColor: generateRandomColor(),
                verticalAlign: 'middle',
                border: 'none',
              }}
              size="large"
              gap={2}
              src={src}
            >
              {record.first_name || ''}
            </Avatar>
          );
        },
      },
      {
        title: <DashOutlined />,
        dataIndex: 'operation',
        render: (_, record) => {
          const itemId = record.key;
          return (
            <Space>
              <PopConfirmEdit
                loading={isLoading}
                itemId={itemId}
                onConfirm={() =>
                  onReturnOrCancel({
                    id: itemId,
                    record,
                    newStatus: 'RETURNED',
                  })
                }
                showProgress={showProgress}
                allowPopConfirm={allowPopConfirm}
                setAllowPopConfirm={setAllowPopConfirm}
                buttonTitle="Վերադարձնել"
                icon={<RedoOutlined />}
              />
            </Space>
          );
        },
      },
    ],
    CANCELLED: [
      {
        title: 'Անուն',
        render: (_, record) => {
          return record.reference_url ? (
            <a target="_blank" href={record.reference_url}>
              {record.name}
            </a>
          ) : (
            record.name
          );
        },
      },
      {
        title: 'Չափս',
        dataIndex: 'description',
      },
      {
        title: 'Նկարներ',
        render: (_, record) => {
          const images = record.images?.data;

          return (
            <Image.PreviewGroup
              preview={{
                onChange: (current, prev) => console.log(`current index: ${current}, prev index: ${prev}`),
              }}
            >
              {images?.map((image, index) => {
                const src = delve(image, 'attributes.url');
                return (
                  <Image
                    key={index}
                    width={50}
                    src={formatImageUrl(src)}
                    placeholder={<Image preview={false} src="/image_placeholder.jpg" width={50} />}
                  />
                );
              })}
            </Image.PreviewGroup>
          );
        },
      },
      {
        title: 'Ինքնարժեք',
        dataIndex: 'net_cost',
      },
      {
        title: 'Վաճառքի գին',
        dataIndex: 'selling_price',
      },
      { title: 'Դադարեցման ա/թ', dataIndex: 'cancel_date' },
      {
        title: 'Հաճախորդ',
        render: (_, record) => {
          const customer = record?.customer?.data?.attributes;
          const customerId = delve(record, 'customer.data.id');
          return (
            <Tooltip title={customer?.phone_number} placement="top">
              <Link to={`/customers/${customerId}`}>
                {customer?.first_name ? customer?.first_name + ' ' + customer?.last_name : ''}
              </Link>
            </Tooltip>
          );
        },
      },
      {
        title: 'Նկար',
        dataIndex: 'Avatar',
        render: (_, record) => {
          const src = record.customer?.data?.attributes?.Avatar?.data
            ? formatImageUrl(record.customer?.data?.attributes?.Avatar?.data?.attributes?.formats?.thumbnail?.url)
            : '';
          return (
            <Avatar
              style={{
                backgroundColor: generateRandomColor(),
                verticalAlign: 'middle',
                border: 'none',
              }}
              size="large"
              gap={2}
              src={src}
            >
              {record.first_name || ''}
            </Avatar>
          );
        },
      },
    ],
    RETURNED: [
      {
        title: 'Անուն',
        render: (_, record) => {
          return record.reference_url ? (
            <a target="_blank" href={record.reference_url}>
              {record.name}
            </a>
          ) : (
            record.name
          );
        },
      },
      {
        title: 'Չափս',
        dataIndex: 'description',
      },
      {
        title: 'Նկարներ',
        render: (_, record) => {
          const images = record.images?.data?.map((img) => formatImageUrl(delve(img, 'attributes.url'))) || [];

          return (
            <Image.PreviewGroup items={images}>
              <Image
                width={50}
                src={images[0]}
                placeholder={<Image preview={false} src="/image_placeholder.jpg" width={50} />}
              />
            </Image.PreviewGroup>
          );
        },
      },
      {
        title: 'Ինքնարժեք',
        dataIndex: 'net_cost',
      },
      {
        title: 'Վաճառքի գին',
        dataIndex: 'selling_price',
      },
      { title: 'Վերադարձի ա/թ', dataIndex: 'return_date' },
      {
        title: 'Հաճախորդ',
        render: (_, record) => {
          const customer = record?.customer?.data?.attributes;
          const customerId = delve(record, 'customer.data.id');
          return (
            <Tooltip title={customer?.phone_number} placement="top">
              <Link to={`/customers/${customerId}`}>
                {customer?.first_name ? customer?.first_name + ' ' + customer?.last_name : ''}
              </Link>
            </Tooltip>
          );
        },
      },
      {
        title: 'Նկար',
        dataIndex: 'Avatar',
        render: (_, record) => {
          const src = record.customer?.data?.attributes?.Avatar?.data
            ? formatImageUrl(record.customer?.data?.attributes?.Avatar?.data?.attributes?.formats?.thumbnail?.url)
            : '';
          return (
            <Avatar
              style={{
                backgroundColor: generateRandomColor(),
                verticalAlign: 'middle',
                border: 'none',
              }}
              size="large"
              gap={2}
              src={src}
            >
              {record.first_name || ''}
            </Avatar>
          );
        },
      },
    ],
  };

  const handleDelete = (id) => {
    setShowProgress(true);
    deleteItemMutation.mutate(id);
  };

  const onReturnOrCancel = ({ id, record, newStatus }) => {
    setShowProgress(true);
    removeItemMutation.mutate({ record, id, newStatus });
  };

  const onChangeStatusToAvailable = (record) => {
    setShowProgress(true);
    editItemMutation.mutate({ record, newStatus: 'AVAILABLE' });
  };

  const onChangeStatusToDelivered = (record) => {
    setShowProgress(true);
    editItemMutation.mutate({ record, newStatus: 'DELIVERED' });
  };

  const removeItemMutation = useMutation({
    mutationFn: ({ record, newStatus }) => {
      return removeOrder({ record, newStatus });
    },
    onSuccess: () => {
      queryClient.invalidateQueries(['orders', { filter }]);
      toast.success(messages.orders.statusChangeSuccess, {
        progress: undefined,
      });
    },
    onSettled: (record) => {
      setShowProgress(false);
      setAllowPopConfirm(false);
    },
    onError: (err, variables, context) => {
      toast.error(messages.orders.deleteError, {
        progress: undefined,
      });
    },
  });

  const editItemMutation = useMutation({
    mutationFn: ({ record, newStatus }) => {
      const editObj = { id: record.key, status: newStatus };
      if (newStatus === 'AVAILABLE') {
        editObj.received_date = new Date();
      }
      if (newStatus === 'DELIVERED') {
        editObj.deliver_date = new Date();
      }
      return editOrder(editObj);
    },
    onMutate: async ({ record, newStatus }) => {
      await queryClient.cancelQueries({
        queryKey: ['orders', record.status.toUpperCase(), record.key],
      });

      const previousOrders = queryClient.getQueryData(['orders', record.status.toUpperCase(), queryString]);

      queryClient.setQueryData(['orders', record.status.toUpperCase(), queryString], (old) => {
        const newData = old.filter((o) => o.id !== record.key);

        return newData;
      });

      return { previousOrders };
    },
    onSuccess: () => {
      toast.success(messages.orders.statusChangeSuccess, {
        progress: undefined,
      });
    },
    onSettled: (record) => {
      queryClient.invalidateQueries(['orders']);
      setShowProgress(false);
      setAllowPopConfirm(false);
    },
    onError: (err, variables, context) => {
      queryClient.setQueryData(['orders', { filter: variables.record.status.toUpperCase() }], context.previousOrders);
      toast.error(messages.orders.deleteError, {
        progress: undefined,
      });
    },
  });

  const deleteItemMutation = useMutation((itemId) => deleteOrder(itemId), {
    onSuccess: () => {
      queryClient.invalidateQueries(['orders']);
      toast.success(messages.shops.deleteSuccess, {
        progress: undefined,
      });
      setShowProgress(false);
      setAllowPopConfirm(false);
    },
    onError: () => {
      toast.error(messages.shops.deleteError, {
        progress: undefined,
      });
      setShowProgress(false);
      setAllowPopConfirm(false);
    },
  });

  const modifiedData = data.map(({ id, attributes }) => ({
    key: id,
    ...attributes,
  }));

  if (isError) {
    return <Alert type="error" message={error.message} />;
  }

  return (
    <>
      <Table loading={isLoading} dataSource={modifiedData} form={form} size="medium" columns={columns[filter]} />
    </>
  );
};

export default OrderedTable;
