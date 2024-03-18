import { FloatButton, List, Skeleton, Space } from 'antd';
import { DeleteOutlined, PlusOutlined, StarOutlined } from '@ant-design/icons';

import { PopConfirm } from '../../components';

const IconText = ({ icon, text }) => (
  <Space>
    {React.createElement(icon)}
    {text}
  </Space>
);

const ExpensesMobileView = ({
  showProgress,
  handleDelete,
  isLoading,
  modifiedData,
  onOpenExpenseModal,
  onCloseExpenseModal,
  allowPopConfirm,
  setAllowPopConfirm,
}) => {
  return (
    <Space direction="vertical" style={{ width: '100%' }}>
      {/* <Form name="add-category" validateMessages={validateMessages} onFinish={onFinish} form={newCategoryForm}>
        <Space.Compact block style={{ justifyContent: 'center' }}>
          <Form.Item
            name="name"
            rules={[
              {
                required: true,
              },
            ]}
            style={{
              width: '80%',
            }}
          >
            <Input placeholder="Նոր կատեգորիա" />
          </Form.Item>
          <Button
            style={{ outline: 'none' }}
            type="primary"
            htmlType="submit"
            icon={<PlusOutlined />}
            loading={addItemMutation.isLoading}
          />
        </Space.Compact>
      </Form> */}
      <List
        pagination={{
          position: 'bottom',
          align: 'center',
        }}
        size="large"
        dataSource={modifiedData}
        itemLayout="vertical"
        renderItem={(item, index) => {
          const { amount, key, direction, expense_date } = { ...item };
          return (
            <List.Item
              key={key}
              actions={
                !isLoading
                  ? [
                      //   <Button icon={<EditOutlined />} size="small" title="Խմբագրել" type="default" />,
                      <PopConfirm
                        loading={isLoading}
                        itemId={key}
                        onConfirm={handleDelete}
                        showProgress={showProgress}
                        allowPopConfirm={allowPopConfirm}
                        setAllowPopConfirm={setAllowPopConfirm}
                        icon={<DeleteOutlined />}
                        buttonTitle="Հեռացնել"
                      />,
                      <IconText
                        icon={StarOutlined}
                        text={expense_date}
                        key="list-vertical-total-categories"
                      />,
                    ]
                  : undefined
              }
            >
              <Skeleton loading={isLoading} active>
                <List.Item.Meta
                  title={`${amount} դր -> ${direction.data.attributes.name}`}
                />
              </Skeleton>
            </List.Item>
          );
        }}
      />
      <FloatButton
        shape="circle"
        type="primary"
        style={{
          right: 20,
          bottom: 20,
          outline: 'none',
        }}
        onClick={onOpenExpenseModal}
        icon={<PlusOutlined />}
      />
    </Space>
  );
};

export default ExpensesMobileView;
