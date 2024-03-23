import { List, Skeleton } from 'antd';
import { DeleteOutlined, StarOutlined } from '@ant-design/icons';

import { PopConfirm, IconText } from '..';

const CategoryListItem = ({ itemId, name, orders }) => {
  return (
    <List.Item
      actions={
        !isLoading
          ? [
              <PopConfirm
                loading={isLoading}
                itemId={itemId}
                onConfirm={onDelete}
                showProgress={showProgress}
                allowPopConfirm={allowPopConfirm}
                setAllowPopConfirm={setAllowPopConfirm}
                icon={<DeleteOutlined />}
                buttonTitle="Հեռացնել"
              />,
              <IconText
                icon={StarOutlined}
                text={`${orders?.data?.length || 0} Պատվեր`}
                key="list-vertical-total-categories"
              />,
            ]
          : undefined
      }
    >
      <Skeleton loading={isLoading} active>
        <List.Item.Meta title={name} />
      </Skeleton>
    </List.Item>
  );
};

export default CategoryListItem;
