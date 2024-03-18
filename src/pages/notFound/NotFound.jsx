import { Link } from 'react-router-dom';
import { Button, Result } from 'antd';

const NotFound = ({
  message,
  redirectUrl = '/',
  redirectButtonText = 'Հինական էջ',
}) => {
  return (
    <Result
      status="404"
      title="404"
      subTitle={message}
      extra={
        <Link to={redirectUrl}>
          <Button type="primary">{redirectButtonText}</Button>
        </Link>
      }
    />
  );
};

export default NotFound;
