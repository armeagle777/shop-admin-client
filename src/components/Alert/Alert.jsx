import { Alert as AntAlert } from 'antd';
import Marquee from 'react-fast-marquee';

import { ALERT_TYPES } from './Alert.constants';

const Alert = ({ message, type = ALERT_TYPES.ERROR }) => {
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
