import { DeleteOutlined, StarOutlined } from '@ant-design/icons';
import { List, Skeleton } from 'antd';

const ListItem = ({
  key,
  amount,
  direction,
  isLoading,
  handleDelete,
  expense_date,
  showProgress,
  allowPopConfirm,
  setAllowPopConfirm,
}) => {
  return (
    <List.Item
      key={key}
      actions={
        !isLoading
          ? [
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
};

export default ListItem;
