import { Flex, Divider, Skeleton, Typography } from 'antd';
import { DollarOutlined } from '@ant-design/icons';

import {
  ANT_GAPS,
  ANT_FLEX_ALIGNS,
  ANT_FLEX_JUSTIFIES,
} from '../../../utils/constants';
import { useTheme } from '../../../store';
import { DateFilterRow } from './DateFilterRow';
import { ClearFiltersBtn } from './ClearFiltersBtn';
import translations from '../../../utils/translations/am.json';
import { getContainerStyles } from './BrowserFiltersBar.helpers';
import CheckboxButton from '../../../components/CheckboxButton/CheckboxButton';

const { Text, Title } = Typography;

const BrowserFiltersBar = ({
  filters,
  eDOptions,
  eDIsloading,
  onDateFilter,
  onClearFilters,
  onDirectionFilter,
}) => {
  const { isDarkMode } = useTheme();
  const { EXPENSES_PAGE } = translations;
  const showClearFiltersBtn =
    !!filters.date.start || !!filters.date.end || !!filters.directions.length;

  return (
    <Flex vertical style={getContainerStyles(isDarkMode)}>
      <Flex
        align={ANT_FLEX_ALIGNS.FLEX_START}
        justify={ANT_FLEX_JUSTIFIES.FLEX_START}
        style={{
          width: '100%',
        }}
      >
        <Flex style={{ width: '80%' }} justify={ANT_FLEX_JUSTIFIES.CENTER}>
          <Title level={4}>{EXPENSES_PAGE.FILTERS_TITLE}</Title>
        </Flex>
        {showClearFiltersBtn && (
          <ClearFiltersBtn onClearFilters={onClearFilters} />
        )}
      </Flex>
      <Divider plain style={{ margin: '8px 0' }} />
      <DateFilterRow onDateFilter={onDateFilter} filters={filters} />
      <Flex
        vertical
        gap={ANT_GAPS.MIDDLE}
        align={ANT_FLEX_ALIGNS.FLEX_START}
        style={{
          marginTop: 16,
          width: '100%',
        }}
      >
        <Text>
          <DollarOutlined style={{ marginRight: 8 }} />
          {EXPENSES_PAGE.FILTERS_DIRECTION_TITLE}
        </Text>
        {eDIsloading ? (
          <Skeleton active />
        ) : (
          eDOptions?.map((directionName, index) => (
            <CheckboxButton
              key={index}
              text={directionName.label}
              value={directionName.value}
              onDirectionFilter={onDirectionFilter}
              checked={filters.directions.includes(directionName.value)}
            />
          ))
        )}
      </Flex>
    </Flex>
  );
};

export default BrowserFiltersBar;
