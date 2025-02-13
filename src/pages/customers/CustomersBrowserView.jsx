import { Button, Flex, Input } from 'antd';

import { Table } from '../../components';

const CustomersBrowserView = ({
  form,
  columns,
  isLoading,
  searchTerm,
  modifiedData,
  handleSearch,
  setSearchTerm,
  onOpenCustomerModal,
  //
  pageSize,
  totalCount,
  currentPage,
  onPageChange,
  onPageSizeChange,
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
            allowClear
            size="large"
            value={searchTerm}
            enterButton="Որոնել"
            placeholder="Որոնում"
            onSearch={handleSearch}
            onChange={handleInputChange}
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
        form={form}
        columns={columns}
        loading={!!isLoading}
        dataSource={modifiedData}
        pageSize={pageSize}
        totalCount={totalCount}
        currentPage={currentPage}
        onPageChange={onPageChange}
        onPageSizeChange={onPageSizeChange}
      />
    </>
  );
};

export default CustomersBrowserView;
