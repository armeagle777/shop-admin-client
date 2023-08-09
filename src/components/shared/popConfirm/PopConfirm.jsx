import React, { useState, useEffect } from 'react';
import { DeleteOutlined, EditOutlined } from '@ant-design/icons';
import { Space, Button, Popconfirm as AntPopConfirm } from 'antd';

const PopConfirm = ({
    itemId,
    onConfirm,
    confirmData,
    showProgress,
    allowPopConfirm,
    setAllowPopConfirm,
    icon,
    disabled,
    buttonTitle,
}) => {
    const [open, setOpen] = useState(false);

    useEffect(() => {
        if (!allowPopConfirm) {
            setOpen(false);
        }
    });
    const handleCancel = () => {
        setOpen(false);
    };

    const handleOk = () => {
        onConfirm(itemId, confirmData);
    };

    const handelOpen = () => {
        setAllowPopConfirm(true);
        setOpen(true);
    };

    return (
        <AntPopConfirm
            title='Համեզվա՞ծ եք, որ ցանկանում եք հեռացնել'
            okText='Այո'
            cancelText='Ոչ'
            onConfirm={handleOk}
            onCancel={handleCancel}
            open={allowPopConfirm && open}
            okButtonProps={{
                loading: showProgress,
                style: { outline: 'none' },
            }}
        >
            <Button
                icon={icon}
                size='small'
                title={buttonTitle}
                danger
                onClick={handelOpen}
                disabled={disabled}
            />
        </AntPopConfirm>
    );
};

export default PopConfirm;
