import { Button, Space } from 'antd';
import { DeleteOutlined, EditOutlined } from '@ant-design/icons';

import { PopConfirm } from '../PopConfirm';
import translations from '../../utils/translations/am.json';
import { ANT_SIZES, BUTTON_TYPES } from '../../utils/constants';

const ExpensesActionColumn = ({
  itemId,
  onDelete,
  isLoading,
  showProgress,
  allowPopConfirm,
  setAllowPopConfirm,
}) => {
  const { EXPENSES_PAGE } = translations;
  return (
    <Space>
      <Button
        size={ANT_SIZES.SMALL}
        icon={<EditOutlined />}
        type={BUTTON_TYPES.DEFAULT}
        title={EXPENSES_PAGE.EDIT_EXPENSE_BUTTON_TITLE}
      />
      <PopConfirm
        itemId={itemId}
        loading={isLoading}
        onConfirm={onDelete}
        icon={<DeleteOutlined />}
        showProgress={showProgress}
        allowPopConfirm={allowPopConfirm}
        setAllowPopConfirm={setAllowPopConfirm}
        buttonTitle={EXPENSES_PAGE.DELETE_EXPENSE_BUTTON_TITLE}
      />
    </Space>
  );
};

export default ExpensesActionColumn;
