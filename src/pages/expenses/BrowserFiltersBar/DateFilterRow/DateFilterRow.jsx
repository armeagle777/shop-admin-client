import dayjs from 'dayjs';
import { DatePicker, Flex, Typography } from 'antd';
import { CalendarOutlined } from '@ant-design/icons';

import translations from '../../../../utils/translations/am.json';
import { ANT_FLEX_ALIGNS, ANT_GAPS } from '../../../../utils/constants';

const { Text } = Typography;

const DateFilterRow = ({ onDateFilter, filters }) => {
  const { EXPENSES_PAGE } = translations;

  return (
    <Flex
      vertical
      gap={ANT_GAPS.MIDDLE}
      align={ANT_FLEX_ALIGNS.FLEX_START}
      style={{
        width: '100%',
      }}
    >
      <Text>
        <CalendarOutlined style={{ marginRight: 8 }} />
        {EXPENSES_PAGE.FILTERS_DATE_TITLE}
      </Text>
      <Flex>
        <DatePicker
          value={filters.date.start ? dayjs(filters.date.start) : undefined}
          onChange={(_, dateSttring) =>
            onDateFilter([dateSttring, filters.date.end])
          }
          style={{ flex: 1 }}
          placeholder={EXPENSES_PAGE.FILTERS_DATE_START_PLACEHOLDER}
        />
        <DatePicker
          value={filters.date.end ? dayjs(filters.date.end) : undefined}
          onChange={(_, dateSttring) =>
            onDateFilter([filters.date.start, dateSttring])
          }
          style={{ flex: 1 }}
          placeholder={EXPENSES_PAGE.FILTERS_DATE_END_PLACEHOLDER}
        />
      </Flex>
    </Flex>
  );
};

export default DateFilterRow;
