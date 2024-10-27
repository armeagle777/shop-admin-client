import React, { useState } from 'react';
import { Checkbox, Button } from 'antd';
import { CloseCircleOutlined, SearchOutlined } from '@ant-design/icons';

const CheckboxButton = ({ text, onDirectionFilter, checked }) => {
  const textsArray = text.split(' ');

  const checkedOption = checked ? { variant: 'filled' } : { type: 'text' };
  return (
    <div style={{ width: '100%', overflow: 'hidden' }}>
      <Checkbox
        checked={checked}
        onChange={onDirectionFilter}
        style={{
          display: 'none',
        }}
      />
      <Button
        block
        style={{
          outline: 'none',
          border: 'none',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          gap: 20,
        }}
        color="default"
        {...checkedOption}
        onClick={() => onDirectionFilter(text)}
      >
        {textsArray?.length > 2 ? `${textsArray[0]} ${textsArray[1]}...` : text}
        {checked && <CloseCircleOutlined />}
      </Button>
    </div>
  );
};

export default CheckboxButton;
