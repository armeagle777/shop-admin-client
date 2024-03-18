import { Space, Spin } from 'antd';

const Loader = ({ text }) => (
  <Space
    direction="horizontal"
    style={{
      width: '100%',
      height: '100%',
      justifyContent: 'center',
    }}
  >
    <Space>
      <Spin tip={text} size="large">
        <div
          className="content"
          style={{
            padding: '50px',
            background: 'rgba(0, 0, 0, 0.05)',
            borderRadius: '4px',
          }}
        />
      </Spin>
    </Space>
  </Space>
);
export default Loader;
