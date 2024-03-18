import React, { useState, useEffect } from 'react';
import { Space, Button, Popconfirm as AntPopConfirm } from 'antd';

const PopConfirmEdit = ({
    itemId,
    onConfirm,
    confirmData,
    showProgress,
    allowPopConfirm,
    setAllowPopConfirm,
    buttonTitle,
    disabled,
    icon,
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
            title='Համեզվա՞ծ եք, որ ցանկանում եք փոխել կարգավիճակը'
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
                type='primary'
                onClick={handelOpen}
                disabled={disabled}
            />
        </AntPopConfirm>
    );
};

export default PopConfirmEdit;
