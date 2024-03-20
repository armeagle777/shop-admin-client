import { Avatar, List, Skeleton } from 'antd';
import { DeleteOutlined, StarOutlined } from '@ant-design/icons';

import { PopConfirm, IconText } from '../../components';

const ShopsListItem = ({
  item,
  isLoading,
  showProgress,
  handleDelete,
  allowPopConfirm,
  setAllowPopConfirm,
}) => {
  const { key, logo, name, url, orders } = { ...item };
  const avatarUrl = logo?.data?.attributes?.url;
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
                text={`${orders?.data?.length || 0} Պատվեր`}
                key="list-vertical-total-orders"
              />,
            ]
          : undefined
      }
    >
      <Skeleton loading={isLoading} active avatar>
        <List.Item.Meta
          avatar={<Avatar src={avatarUrl} />}
          title={
            <a target="_blank" href={url}>
              {name}
            </a>
          }
          // description={item.description}
        />
        {/* {item.content} */}
      </Skeleton>
    </List.Item>
  );
};

export default ShopsListItem;
