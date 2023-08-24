import { useState } from 'react';
import delve from 'dlv';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { Avatar, Button, Image, Space, Tooltip } from 'antd';
import { format } from 'date-fns';
import { toast } from 'react-toastify';
import {
    AntDesignOutlined,
    CloseOutlined,
    DashOutlined,
    DeleteOutlined,
    EditOutlined,
    InfoCircleFilled,
    RedoOutlined,
    StepForwardOutlined,
    UserOutlined,
} from '@ant-design/icons';
import { deleteOrder, editOrder, removeOrder } from '../../api/serverApi';
import { messages } from '../../utils/constants';
import { generateRandomColor } from '../../utils/helpers';
import Alert from '../../components/alert/Alert';
import PopConfirm from '../../components/shared/popConfirm/PopConfirm';
import PopConfirmEdit from '../../components/shared/popConfirm/PopConfirmEdit';
import Table from '../../components/table/Table';

const OrderedTable = ({ data, isLoading, error, isError, form, filter }) => {
    const [showProgress, setShowProgress] = useState(false);
    const [allowPopConfirm, setAllowPopConfirm] = useState(false);

    const queryClient = useQueryClient();

    const columns = {
        ORDERED: [
            {
                title: 'Անուն',
                render: (_, record) => {
                    return record.reference_url ? (
                        <a target='_blank' href={record.reference_url}>
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
                        <Avatar.Group shape='square'>
                            {images?.map((image, index) => {
                                const src = delve(image, 'attributes.url');
                                return (
                                    <Avatar
                                        key={image?.id}
                                        src={src}
                                        style={{
                                            backgroundColor: '#fde3cf',
                                        }}
                                        shape='square'
                                    >
                                        A
                                    </Avatar>
                                );
                            })}
                        </Avatar.Group>
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
                    const contacts = delve(
                        record,
                        'customer.data.attributes.contacts.data'
                    );

                    const extraContacts =
                        contacts.length === 0
                            ? ''
                            : '/' +
                              contacts
                                  .map((c) => c.attributes.phone_number)
                                  .join(',');
                    const phone_number = customer?.phone_number;
                    const customerExtraInfo = `${phone_number}  ${extraContacts}`;
                    return (
                        <>
                            {customer?.first_name || ''}{' '}
                            {customer?.last_name || ''}
                            {(phone_number || contacts?.length > 0) && (
                                <Tooltip
                                    title={customerExtraInfo}
                                    placement='top'
                                >
                                    <InfoCircleFilled
                                        style={{ marginLeft: 2 }}
                                    />
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
                    const src =
                        record.customer?.data?.attributes?.Avatar.data
                            ?.attributes?.formats?.thumbnail?.url || '';
                    return (
                        <Avatar
                            style={{
                                backgroundColor: generateRandomColor(),
                                verticalAlign: 'middle',
                                border: 'none',
                            }}
                            size='large'
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
                    const address =
                        record?.customer?.data?.attributes?.addresses.data[0];

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
                                size='small'
                                title='Խմբագրել'
                                type='default'
                            />
                            <PopConfirmEdit
                                loading={isLoading}
                                itemId={itemId}
                                onConfirm={() =>
                                    onChangeStatusToAvailable(record)
                                }
                                showProgress={showProgress}
                                allowPopConfirm={allowPopConfirm}
                                setAllowPopConfirm={setAllowPopConfirm}
                                buttonTitle='Ստացվել է'
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
                                buttonTitle='Հեռացնել'
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
                        <a target='_blank' href={record.reference_url}>
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
                        <Image width={50} src={images[0]?.attributes?.url} />
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
                    const contacts = delve(
                        record,
                        'customer.data.attributes.contacts.data'
                    );

                    const extraContacts =
                        contacts.length === 0
                            ? ''
                            : '/' +
                              contacts
                                  .map((c) => c.attributes.phone_number)
                                  .join(',');
                    const phone_number = customer?.phone_number;
                    const customerExtraInfo = `${phone_number}  ${extraContacts}`;
                    return (
                        <>
                            {customer?.first_name || ''}{' '}
                            {customer?.last_name || ''}
                            {(phone_number || contacts?.length > 0) && (
                                <Tooltip
                                    title={customerExtraInfo}
                                    placement='top'
                                >
                                    <InfoCircleFilled
                                        style={{ marginLeft: 2 }}
                                    />
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
                    const src =
                        record.customer?.data?.attributes?.Avatar.data
                            ?.attributes?.formats?.thumbnail?.url || '';
                    return (
                        <Avatar
                            style={{
                                backgroundColor: generateRandomColor(),
                                verticalAlign: 'middle',
                                border: 'none',
                            }}
                            size='large'
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
                                size='small'
                                title='Խմբագրել'
                                type='default'
                            />
                            <PopConfirmEdit
                                loading={isLoading}
                                itemId={itemId}
                                onConfirm={() =>
                                    onChangeStatusToDelivered(record)
                                }
                                showProgress={showProgress}
                                allowPopConfirm={allowPopConfirm}
                                setAllowPopConfirm={setAllowPopConfirm}
                                buttonTitle='Առաքվել է'
                                icon={<StepForwardOutlined />}
                                disabled={forwardDisabled}
                            />
                            <PopConfirm
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
                                buttonTitle='Հրաժարվել'
                            />
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
                        <a target='_blank' href={record.reference_url}>
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
                    const images = record.images.data;
                    return <Image width={50} src={images[0].attributes.url} />;
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
                    const contacts = delve(
                        record,
                        'customer.data.attributes.contacts.data'
                    );

                    const extraContacts =
                        contacts.length === 0
                            ? ''
                            : '/' +
                              contacts
                                  .map((c) => c.attributes.phone_number)
                                  .join(',');
                    const phone_number = customer?.phone_number;
                    const customerExtraInfo = `${phone_number}  ${extraContacts}`;
                    return (
                        <>
                            {customer?.first_name || ''}{' '}
                            {customer?.last_name || ''}
                            {(phone_number || contacts?.length > 0) && (
                                <Tooltip
                                    title={customerExtraInfo}
                                    placement='top'
                                >
                                    <InfoCircleFilled
                                        style={{ marginLeft: 2 }}
                                    />
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
                    const src =
                        record.customer?.data?.attributes?.Avatar.data
                            ?.attributes?.formats?.thumbnail?.url || '';
                    return (
                        <Avatar
                            style={{
                                backgroundColor: generateRandomColor(),
                                verticalAlign: 'middle',
                                border: 'none',
                            }}
                            size='large'
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
                                buttonTitle='Վերադարձնել'
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
                        <a target='_blank' href={record.reference_url}>
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
                    const images = record.images.data;
                    return <Image width={50} src={images[0].attributes.url} />;
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
                    return (
                        <Tooltip title={customer?.phone_number} placement='top'>
                            {customer?.first_name
                                ? customer?.first_name +
                                  ' ' +
                                  customer?.last_name
                                : ''}
                        </Tooltip>
                    );
                },
            },
            {
                title: 'Նկար',
                dataIndex: 'Avatar',
                render: (_, record) => {
                    const src =
                        record.customer?.data?.attributes?.Avatar.data
                            ?.attributes?.formats?.thumbnail?.url || '';
                    return (
                        <Avatar
                            style={{
                                backgroundColor: generateRandomColor(),
                                verticalAlign: 'middle',
                                border: 'none',
                            }}
                            size='large'
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
                        <a target='_blank' href={record.reference_url}>
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
                    const images = record.images.data;
                    return <Image width={50} src={images[0].attributes.url} />;
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
                    return (
                        <Tooltip title={customer?.phone_number} placement='top'>
                            {customer?.first_name
                                ? customer?.first_name +
                                  ' ' +
                                  customer?.last_name
                                : ''}
                        </Tooltip>
                    );
                },
            },
            {
                title: 'Նկար',
                dataIndex: 'Avatar',
                render: (_, record) => {
                    const src =
                        record.customer?.data?.attributes?.Avatar.data
                            ?.attributes?.formats?.thumbnail?.url || '';
                    return (
                        <Avatar
                            style={{
                                backgroundColor: generateRandomColor(),
                                verticalAlign: 'middle',
                                border: 'none',
                            }}
                            size='large'
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
                editObj.received_date = new Date().toISOString();
            }
            if (newStatus === 'DELIVERED') {
                editObj.deliver_date = new Date().toISOString();
            }
            return editOrder(editObj);
        },
        onMutate: async ({ record, newStatus }) => {
            await queryClient.cancelQueries({
                queryKey: [
                    'orders',
                    { filter: record.status.toUpperCase() },
                    record.key,
                ],
            });

            const previousOrders = queryClient.getQueryData([
                'orders',
                { filter: record.status.toUpperCase() },
            ]);

            queryClient.setQueryData(
                ['orders', { filter: record.status.toUpperCase() }],
                (old) => {
                    const newData = old.filter((o) => o.id !== record.key);

                    return newData;
                }
            );

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
            queryClient.setQueryData(
                ['orders', { filter: variables.record.status.toUpperCase() }],
                context.previousOrders
            );
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
        return <Alert type='error' message={error.message} />;
    }

    return (
        <>
            <Table
                loading={isLoading}
                dataSource={modifiedData}
                form={form}
                size='medium'
                columns={columns[filter]}
            />
        </>
    );
};

export default OrderedTable;
