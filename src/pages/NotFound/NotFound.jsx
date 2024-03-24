import { Link } from 'react-router-dom';
import { Button, Result } from 'antd';

import { BUTTON_TYPES } from '../../utils/constants';
import { statusText, titleText } from './NotFound.constants';
import translations from '../../utils/translations/am.json';
const { SHARED } = translations;

const NotFound = ({
  message,
  redirectUrl = '/',
  redirectButtonText = SHARED.REDIRECT_BUTTON_TEXT,
}) => {
  return (
    <Result
      title={titleText}
      subTitle={message}
      status={statusText}
      extra={
        <Link to={redirectUrl}>
          <Button type={BUTTON_TYPES.PRIMARY}>{redirectButtonText}</Button>
        </Link>
      }
    />
  );
};

export default NotFound;
