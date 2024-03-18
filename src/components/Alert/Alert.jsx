import { Alert as AntAlert } from 'antd';
import Marquee from 'react-fast-marquee';

const Alert = ({ message, type = 'error' }) => {
  return (
    <AntAlert
      banner
      type={type}
      message={
        <Marquee pauseOnHover gradient={false}>
          {message}
        </Marquee>
      }
    />
  );
};

export default Alert;
