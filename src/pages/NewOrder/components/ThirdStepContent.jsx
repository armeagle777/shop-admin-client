import { Form, Upload } from 'antd';
import { PlusOutlined } from '@ant-design/icons';

import translations from '../../../utils/translations/am.json';
import { allowedImageExt, uploadFieldStyles } from '../NewOrder.constants';

const ThirdStepContent = ({ setFormValues, formValues }) => {
  const { NEW_ORDER_PAGE } = translations;
  const fileUploadUrl = `${import.meta.env.VITE_SERVER_URL}/upload`;

  const normFile = (e) => {
    if (Array.isArray(e)) {
      return e;
    }
    return e?.files;
  };

  const onImageChange = async (res) => {
    if (!res.file?.response) return;
    const fileId = res.file?.response[0].id;
    setFormValues((prev) => {
      if (!prev.images) {
        return { ...prev, images: [fileId] };
      }
      const newImages = [...prev.images, fileId];
      return { ...prev, images: newImages };
    });
  };

  const onImageRemove = async (file) => {
    const uploadedFileId = file?.response?.id;

    if (!uploadedFileId) return;
    const res = await axios.delete(`${fileUploadUrl}/files/${uploadedFileId}`);
  };

  return (
    <>
      <Form.Item
        name={['customer', 'image']}
        label={NEW_ORDER_PAGE.IMAGE_LABEL}
      >
        <Upload
          name="files"
          maxCount={5}
          multiple={true}
          action={fileUploadUrl}
          listType="picture-card"
          accept={allowedImageExt}
          onChange={onImageChange}
          onRemove={onImageRemove}
        >
          <div>
            <PlusOutlined />
            <div style={uploadFieldStyles}>
              {NEW_ORDER_PAGE.UPLOAD_BUTTON_TEXT}
            </div>
          </div>
        </Upload>
      </Form.Item>
    </>
  );
};

export default ThirdStepContent;
