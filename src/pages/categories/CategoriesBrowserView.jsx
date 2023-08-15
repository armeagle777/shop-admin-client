import { DeleteOutlined, EditOutlined } from '@ant-design/icons';
import { Button, Form, Input, Space } from 'antd';
import PopConfirm from '../../components/shared/popConfirm/PopConfirm';
import Table from '../../components/table/Table';

const CategoriesBrowserView = ({
    onFinish,
    newCategoryForm,
    addItemMutation,
    isLoading,
    modifiedData,
    handleDelete,
    showProgress,
    allowPopConfirm,
    setAllowPopConfirm,
    validateMessages,
}) => {
    const [form] = Form.useForm();
    const columns = [
        {
            title: 'Կատեգորիա',
            dataIndex: 'name',
            width: '25%',
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
    return (
        <>
            <Form
                name='add-category'
                validateMessages={validateMessages}
                onFinish={onFinish}
                labelCol={{
                    span: 8,
                }}
                form={newCategoryForm}
                wrapperCol={{
                    span: 20,
                }}
                style={{
                    maxWidth: 600,
                }}
            >
                <Form.Item
                    name='name'
                    rules={[
                        {
                            required: true,
                        },
                    ]}
                    style={{
                        display: 'inline-block',
                        width: 'calc(50% - 8px)',
                        marginRight: 8,
                    }}
                >
                    <Input placeholder='Նոր կատեգորիա' />
                </Form.Item>
                <Button
                    type='primary'
                    htmlType='submit'
                    loading={addItemMutation.isLoading}
                >
                    Ավելացնել
                </Button>
            </Form>
            <Table
                loading={!!isLoading}
                columns={columns}
                dataSource={modifiedData}
                form={form}
                size='medium'
            />
        </>
    );
};

export default CategoriesBrowserView;
