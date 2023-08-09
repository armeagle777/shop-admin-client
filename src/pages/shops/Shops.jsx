import { useState } from 'react';
import { toast } from 'react-toastify';
import { Avatar, Button, Form, Space } from 'antd';
import { DeleteOutlined, EditOutlined } from '@ant-design/icons';
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import { deleteShop, getShops } from '../../api/serverApi';
import { messages } from '../../utils/constants';
import { generateRandomColor } from '../../utils/helpers';
import Alert from '../../components/alert/Alert';
import PopConfirm from '../../components/shared/popConfirm/PopConfirm';
import Table from '../../components/table/Table';

const Shops = () => {
    const [showProgress, setShowProgress] = useState(false);
    const [allowPopConfirm, setAllowPopConfirm] = useState(false);
    const { data, isLoading, isError, error } = useQuery(
        ['shops'],
        () => getShops(),
        {
            keepPreviousData: false,
        }
    );
    const queryClient = useQueryClient();

    const { data: shops = [], meta } = { ...data };
    const modifiedData = shops.map(({ id, attributes }) => ({
        key: id,
        ...attributes,
    }));

    const [count, setCount] = useState(2);
    const [form] = Form.useForm();

    const handleAdd = () => {
        const newData = {
            key: count,
            name: `Edward King ${count}`,
            age: '32',
            address: `London, Park Lane no. ${count}`,
        };
        setDataSource([...dataSource, newData]);
        setCount(count + 1);
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

    const columns = [
        {
            title: 'Անուն',
            dataIndex: 'name',
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
                onClick={handleAdd}
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
        </>
    );
};
export default Shops;
