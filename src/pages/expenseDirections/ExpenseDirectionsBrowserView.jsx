import { DeleteOutlined, EditOutlined } from '@ant-design/icons';
import { Button, Form, Input, Space } from 'antd';
import PopConfirm from '../../components/shared/popConfirm/PopConfirm';
import Table from '../../components/table/Table';

const ExpenseDirectionsBrowserView = ({
    validateMessages,
    onFinish,
    newDirectionForm,
    addItemMutation,
    isLoading,
    modifiedData,
    handleDelete,
    showProgress,
    allowPopConfirm,
    setAllowPopConfirm,
}) => {
    const columns = [
        {
            title: 'Ուղղություն',
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
    const [form] = Form.useForm();
    return (
        <>
            <Form
                name='add-expenses-direction'
                validateMessages={validateMessages}
                onFinish={onFinish}
                labelCol={{
                    span: 8,
                }}
                form={newDirectionForm}
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
                    <Input placeholder='Նոր ծախսի ուղղություն' />
                </Form.Item>
                <Button
                    type='primary'
                    htmlType='submit'
                    loading={addItemMutation.isLoading}
                    style={{ marginBottom: 16 }}
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

export default ExpenseDirectionsBrowserView;
