import { PlusOutlined } from '@ant-design/icons';
import { Form, Upload } from 'antd';
import React from 'react';

const ThirdStepContent = ({ setFormValues }) => {
  const normFile = (e) => {
    if (Array.isArray(e)) {
      return e;
    }
    return e?.files;
  };

  const fileUploadUrl = `${import.meta.env.VITE_SERVER_URL}/upload`;
  return (
    <>
      <Form.Item
        name={['customer', 'image']}
        label="Նկար"
        // valuePropName={['customer', 'image']}
        // getValueFromEvent={normFile}
      >
        <Upload
          accept=".png,.jpeg,.jpg"
          name="files"
          action={fileUploadUrl}
          listType="picture-card"
          multiple={true}
          maxCount={5}
          onChange={async (res) => {
            if (!res.file?.response) return;
            const fileId = res.file?.response[0].id;
            // setUploadedFileId(fileId);
            setFormValues((prev) => {
              if (!prev.images) {
                return { ...prev, images: [fileId] };
              }
              const newImages = [...prev.images, fileId];
              return { ...prev, images: newImages };
            });
          }}
          onRemove={async (file) => {
            if (!uploadedFileId) return;
            const res = await axios.delete(`${fileUploadUrl}/files/${uploadedFileId}`);
          }}
        >
          <div>
            <PlusOutlined />
            <div
              style={{
                marginTop: 8,
              }}
            >
              Բեռնել
            </div>
          </div>
        </Upload>
      </Form.Item>
    </>
  );
};

export default ThirdStepContent;
