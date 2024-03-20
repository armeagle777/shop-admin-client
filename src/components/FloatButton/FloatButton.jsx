import { PlusOutlined } from '@ant-design/icons';
import { FloatButton as AntFloatButton } from 'antd';

import { floatButtonStyles } from './FloatButton.constants';
import { ANT_SHAPES, BUTTON_TYPES } from '../../utils/constants';

const FloatButton = ({ onClick }) => {
  return (
    <AntFloatButton
      onClick={onClick}
      icon={<PlusOutlined />}
      shape={ANT_SHAPES.CIRCLE}
      style={floatButtonStyles}
      type={BUTTON_TYPES.PRIMAARY}
    />
  );
};

export default FloatButton;
