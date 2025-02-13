import { Row, Col, Table as AntTable, Form } from 'antd';
import { Pagination } from 'antd';

const Table = ({
  form,
  columns,
  dataSource,
  size = 'large',
  loading = false,
  // new props
  totalCount,
  onPageChange,
  pageSize = 10,
  currentPage = 1,
  onPageSizeChange,
}) => {
  return (
    <Form form={form} component={false}>
      <Row>
        <Col xs={24} sm={24} md={24} lg={24} xl={24}>
          <AntTable
            bordered
            size={size}
            loading={loading}
            columns={columns}
            dataSource={dataSource}
            rowClassName="editable-row"
            pagination={{
              current: currentPage,
              pageSize: pageSize,
              total: totalCount,
              onChange: onPageChange,
              pageSizeOptions: [10, 20, 50],
              onShowSizeChange: onPageSizeChange,
            }}
          />
        </Col>
      </Row>
    </Form>
  );
};

export default Table;
