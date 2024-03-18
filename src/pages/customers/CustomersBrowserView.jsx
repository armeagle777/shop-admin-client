import { Button, Flex, Input } from 'antd';

import Table from '../../components/table_/Table';

const CustomersBrowserView = ({
  onOpenCustomerModal,
  isLoading,
  columns,
  modifiedData,
  form,
  searchTerm,
  setSearchTerm,
  handleSearch,
}) => {
  const { Search } = Input;

  const handleInputChange = (e) => {
    setSearchTerm(e.target.value);
  };

  return (
    <>
      <Flex justify="space-between">
        <div>
          <Search
            placeholder="Որոնում"
            allowClear
            enterButton="Որոնել"
            size="large"
            value={searchTerm}
            onChange={handleInputChange}
            onSearch={handleSearch}
          />
        </div>
        <div>
          <Button
            onClick={onOpenCustomerModal}
            type="primary"
            style={{
              marginBottom: 16,
            }}
          >
            Ավելացնել
          </Button>
        </div>
      </Flex>
      <Table
        loading={!!isLoading}
        columns={columns}
        dataSource={modifiedData}
        form={form}
      />
    </>
  );
};

export default CustomersBrowserView;
