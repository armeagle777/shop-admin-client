import Table from '../../components/table/Table';
import { Avatar, Button, Form, Image, Modal, Space } from 'antd';

const CustomersBrowserView = ({ onOpenCustomerModal, isLoading, columns, modifiedData, form }) => {
  return (
    <>
      <Button
        onClick={onOpenCustomerModal}
        type="primary"
        style={{
          marginBottom: 16,
        }}
      >
        Ավելացնել
      </Button>
      <Table loading={!!isLoading} columns={columns} dataSource={modifiedData} form={form} />
    </>
  );
};

export default CustomersBrowserView;
