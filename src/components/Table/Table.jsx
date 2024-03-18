import { Row, Col, Table as AntTable, Form } from 'antd';

const Table = ({
  columns,
  dataSource,
  form,
  cancel,
  size = 'large',
  loading = false,
}) => {
  return (
    <Form form={form} component={false}>
      <Row>
        <Col xs={24} sm={24} md={24} lg={24} xl={24}>
          <AntTable
            bordered
            loading={loading}
            dataSource={dataSource}
            columns={columns}
            rowClassName="editable-row"
            size={size}
            pagination={{
              onChange: cancel,
            }}
          />
        </Col>
      </Row>
    </Form>
  );
};

export default Table;
