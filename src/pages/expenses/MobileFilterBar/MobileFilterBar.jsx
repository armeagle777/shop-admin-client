import { useState } from 'react';
import dayjs from 'dayjs';
import { DatePicker } from 'antd-mobile';
import { CalendarOutlined } from '@ant-design/icons';
import { Button, Divider, Flex, Select, Tag } from 'antd';
import {
  ANT_COLORS,
  ANT_LAYOUTS,
  ANT_FLEX_ALIGNS,
  BUTTON_VARIANTS,
} from '../../../utils/constants';
import translations from '../../../utils/translations/am.json';

const MobileFilterBar = ({
  filters,
  eDOptions,
  onDateFilter,
  onDirectionFilter,
}) => {
  const [endCalendarVisible, setEndCalendarVisible] = useState(false);
  const [startCalendarVisible, setStartCalendarVisible] = useState(false);

  const { EXPENSES_PAGE } = translations;

  const now = new Date();
  const filteredOptions = eDOptions?.filter(
    (d) => !filters.directions.includes(d.value),
  );

  const tagRender = (props) => {
    const { value, closable, onClose } = props;
    const option = eDOptions.find((o) => o.value === value);
    return (
      <Tag
        color="blue"
        closable={closable}
        onClose={onClose}
        style={{ marginRight: 3 }}
      >
        {option.label}
      </Tag>
    );
  };

  const dateBtnStyle = {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
  };

  const onStartDatepickerClose = () => setStartCalendarVisible(false);
  const onEndDatepickerClose = () => setEndCalendarVisible(false);

  return (
    <Flex
      vertical
      gap={10}
      style={{ padding: '10px 0 ' }}
      align={ANT_FLEX_ALIGNS.FLEX_END}
    >
      <Flex align={ANT_FLEX_ALIGNS.CENTER}>
        <Button
          style={dateBtnStyle}
          color={ANT_COLORS.DEFAULT}
          variant={BUTTON_VARIANTS.TEXT}
          onClick={() => setStartCalendarVisible(true)}
        >
          <CalendarOutlined />
          {filters.date?.start
            ? filters.date?.start
            : EXPENSES_PAGE.FILTERS_DATE_START_PLACEHOLDER}
        </Button>
        <Divider type={ANT_LAYOUTS.VERTICAL} style={{ height: '100%' }} />
        <Button
          style={dateBtnStyle}
          color={ANT_COLORS.DEFAULT}
          variant={BUTTON_VARIANTS.TEXT}
          onClick={() => setEndCalendarVisible(true)}
        >
          <CalendarOutlined />
          {filters.date?.end
            ? filters.date?.end
            : EXPENSES_PAGE.FILTERS_DATE_END_PLACEHOLDER}
        </Button>
      </Flex>
      <Select
        mode="multiple"
        value={filters.directions}
        onChange={onDirectionFilter}
        placeholder={EXPENSES_PAGE.FILTERS_MOBILE_DIRECTIONS_PLACEHOLDER}
        style={{
          width: '100%',
        }}
        options={filteredOptions}
        tagRender={tagRender}
      />
      <DatePicker
        max={now}
        visible={startCalendarVisible}
        onClose={onStartDatepickerClose}
        title={EXPENSES_PAGE.FILTERS_DATE_START_PLACEHOLDER}
        cancelText={EXPENSES_PAGE.FILTERS_MOBILE_DATE_CANCEL_TEXT}
        confirmText={EXPENSES_PAGE.FILTERS_MOBILE_DATE_CONFIRM_TEXT}
        value={filters.date.start ? new Date(filters.date.start) : now}
        onConfirm={(val) => {
          const formatedDate = dayjs(val).format('YYYY-MM-DD');
          onDateFilter([formatedDate, filters.date.end]);
        }}
      />
      <DatePicker
        max={now}
        visible={endCalendarVisible}
        onClose={onEndDatepickerClose}
        title={EXPENSES_PAGE.FILTERS_DATE_END_PLACEHOLDER}
        cancelText={EXPENSES_PAGE.FILTERS_MOBILE_DATE_CANCEL_TEXT}
        value={filters.date.end ? new Date(filters.date.end) : now}
        confirmText={EXPENSES_PAGE.FILTERS_MOBILE_DATE_CONFIRM_TEXT}
        {...(filters.date.start ? { min: new Date(filters.date.start) } : {})}
        onConfirm={(val) => {
          const formatedDate = dayjs(val).format('YYYY-MM-DD');
          onDateFilter([filters.date.start, formatedDate]);
        }}
      />
    </Flex>
  );
};

export default MobileFilterBar;
