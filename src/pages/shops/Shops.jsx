import { useState } from 'react';
import { toast } from 'react-toastify';
import { Avatar, Button, Form, Modal, Space } from 'antd';
import { DeleteOutlined, EditOutlined } from '@ant-design/icons';
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import { addShop, deleteShop, getShops } from '../../api/serverApi';
import { messages } from '../../utils/constants';
import { generateRandomColor } from '../../utils/helpers';
import Alert from '../../components/alert/Alert';
import PopConfirm from '../../components/shared/popConfirm/PopConfirm';
import Table from '../../components/table/Table';
import AddShopForm from '../../components/addShopForm/AddShopForm';

const Shops = () => {
    const [showProgress, setShowProgress] = useState(false);
    const [showShopModal, setShowShopModal] = useState(false);
    const [allowPopConfirm, setAllowPopConfirm] = useState(false);
    const { data, isLoading, isError, error } = useQuery(
        ['shops'],
        () => getShops(),
        {
            keepPreviousData: true,
        }
    );
    const queryClient = useQueryClient();

    const { data: shops = [], meta } = { ...data };
    const modifiedData = shops.map(({ id, attributes }) => ({
        key: id,
        ...attributes,
    }));

    const [form] = Form.useForm();
    const [addShopForm] = Form.useForm();

    const onOpenShopModal = () => {
        setShowShopModal(true);
    };

    const onCloseShopModal = () => {
        setShowShopModal(false);
    };

    const deleteItemMutation = useMutation((itemId) => deleteShop(itemId), {
        onSuccess: () => {
            queryClient.invalidateQueries('shops');
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

    const handleDelete = (id) => {
        setShowProgress(true);
        deleteItemMutation.mutate(id);
    };

    const addItemMutation = useMutation((item) => addShop(item), {
        onSuccess: (data) => {
            if (data.data?.error) {
                return toast.error(data.data?.error || 'Սխալ է տեղի ունեցել', {
                    progress: undefined,
                });
            }
            queryClient.invalidateQueries('shops');
            toast.success(messages.customers.createSuccess, {
                progress: undefined,
            });
            setShowShopModal(false);
            addShopForm.resetFields();
        },
        onError: (error, variables, context, mutation) => {
            console.log('err:::::: ', error);

            toast.error(error.response?.data?.error?.message || error.message, {
                progress: undefined,
            });
        },
    });

    const onSubmit = (values) => {
        console.log('values:::::: ', values);

        const { name, url, logo } = values.shop;
        const newShop = { name, url };
        if (logo) {
            newShop.logo = logo;
        }
        console.log('newShop:::::: ', newShop);

        addItemMutation.mutate(newShop);
    };

    const columns = [
        {
            title: 'Անուն',
            dataIndex: 'name',
            width: '25%',
        },
        {
            title: 'URl',
            dataIndex: 'url',
            width: '25%',
        },
        {
            title: 'Նկար',
            dataIndex: 'logo',
            width: '10%',
            render: (_, record) => {
                const src = record.logo.data?.attributes.formats.thumbnail.url;
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
                        {record.name || ''}
                    </Avatar>
                );
            },
        },
        {
            title: 'Հասցե',
            dataIndex: 'url',
            width: '40%',
            render: (_, record) => {
                return (
                    <a target='_blank' href={record.url}>
                        {record.url}
                    </a>
                );
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
                            size='small'
                            title='Խմբագրել'
                            type='default'
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
    ];

    if (isError) {
        return <Alert type='error' message={error.message} />;
    }

    return (
        <>
            <Button
                onClick={onOpenShopModal}
                type='primary'
                style={{
                    marginBottom: 16,
                }}
            >
                Ավելացնել
            </Button>
            <Table
                loading={!!isLoading}
                columns={columns}
                dataSource={modifiedData}
                form={form}
            />
            <Modal
                title='Ավելացնել նոր Խանութ'
                centered
                open={showShopModal}
                onCancel={onCloseShopModal}
                width={800}
                footer={null}
            >
                <AddShopForm
                    onCancel={onCloseShopModal}
                    onSubmit={onSubmit}
                    isLoadingAdd={addItemMutation.isLoading}
                    form={addShopForm}
                />
            </Modal>
        </>
    );
};
export default Shops;
