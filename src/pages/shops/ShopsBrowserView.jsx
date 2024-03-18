import { Avatar, Button, Space } from 'antd';
import { DeleteOutlined, EditOutlined } from '@ant-design/icons';

import { Table, PopConfirm } from '../../components';
import { generateRandomColor } from '../../utils/helpers';

const ShopsBrowserView = ({
  onOpenShopModal,
  isLoading,
  modifiedData,
  form,
  allowPopConfirm,
  setAllowPopConfirm,
  handleDelete,
  showProgress,
}) => {
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
            size="large"
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
          <a target="_blank" href={record.url}>
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
          <Space key={itemId}>
            <Button
              icon={<EditOutlined />}
              size="small"
              title="Խմբագրել"
              type="default"
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
  ];

  return (
    <>
      <Button
        onClick={onOpenShopModal}
        type="primary"
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

export default ShopsBrowserView;
