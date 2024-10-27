import { Button, Flex, Tooltip } from 'antd';
import { CloseCircleOutlined } from '@ant-design/icons';

import {
  ANT_SHAPES,
  ANT_FLEX_ALIGNS,
  ANT_FLEX_JUSTIFIES,
} from '../../../../utils/constants';

import translations from '../../../../utils/translations/am.json';

const ClearFiltersBtn = ({ onClearFilters }) => {
  const { EXPENSES_PAGE } = translations;

  return (
    <Flex
      align={ANT_FLEX_ALIGNS.CENTER}
      justify={ANT_FLEX_JUSTIFIES.FLEX_END}
      style={{
        width: '20%',
        height: '100%',
      }}
    >
      <Tooltip title={EXPENSES_PAGE.FILTERS_CLEAR_ALL_BUTTON_TITLE}>
        <Button
          shape={ANT_SHAPES.CIRCLE}
          onClick={onClearFilters}
          icon={<CloseCircleOutlined />}
        />
      </Tooltip>
    </Flex>
  );
};

export default ClearFiltersBtn;
