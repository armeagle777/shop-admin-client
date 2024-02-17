import Table from '../../components/table/Table';

const CustomersBrowserView = () => {
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
