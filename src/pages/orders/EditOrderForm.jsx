import { useState } from 'react';
import { useNavigate } from 'react-router-dom';

import {
  InputNumber,
  Button,
  Form,
  message,
  Steps,
  theme,
  Upload,
  Cascader,
  DatePicker,
  Input,
  Modal,
  Select,
  Space,
  Image,
} from 'antd';
import { formatImageUrl } from '../../utils/helpers';
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import { editOrder, getCategories, getCustomers, getShops, addCustomer } from '../../api/serverApi';
import { messages } from '../../utils/constants';
import { toast } from 'react-toastify';
import dayjs from 'dayjs';
import { format } from 'date-fns';
import { PlusOutlined } from '@ant-design/icons';
import AddCustomerForm from '../../components/shared/addCutomerForm/AddCustomerForm';

const EditOrderForm = ({
  orderId,
  category,
  customer,
  description,
  images,
  isActive,
  name,
  net_cost,
  order_date,
  received_date,
  selling_price,
  shop,
  status,
  tracking_id,
}) => {
  const [showAddCustomerModal, setShowAddCustomerModal] = useState(false);
  const { token } = theme.useToken();
  const [form] = Form.useForm();

  const [previewOpen, setPreviewOpen] = useState(false);
  const [previewImage, setPreviewImage] = useState('');
  const [previewTitle, setPreviewTitle] = useState('');
  const [uploads, setUploads] = useState(
    images?.data?.map((img) => ({ id: img.id, ...img.attributes, url: formatImageUrl(img.attributes.url) })) || [],
  );
  const navigate = useNavigate();
  const fileUploadUrl = `${import.meta.env.VITE_SERVER_URL}/upload`;
  const dateFormat = 'DD/MM/YYYY';

  const handleChange = ({ fileList: newFileList, ...restData }) => {
    console.log('newFileList:::::: ', newFileList);

    setUploads(newFileList);
  };
  const handleCancel = () => setPreviewOpen(false);
  const handlePreview = async (file) => {
    setPreviewImage(file.url || file.preview);
    setPreviewOpen(true);
    setPreviewTitle(file.name || file.url.substring(file.url.lastIndexOf('/') + 1));
  };

  const onEditCancel = () => {
    navigate('/orders');
  };
  const { data: customers } = useQuery(['customers'], () => getCustomers(), {
    keepPreviousData: true,
  });
  const customerOptions = customers?.data.map(({ id, attributes }) => {
    const { first_name, last_name, phone_number } = { ...attributes };

    return {
      value: id,
      label: `${first_name} ${last_name} ${phone_number}`,
    };
  });

  const { data: categories } = useQuery(['categories'], () => getCategories(), {
    keepPreviousData: true,
  });

  const categoriesOptions = categories?.data.map(({ id, attributes }) => ({
    value: id,
    label: attributes.name,
  }));

  const { data: shops } = useQuery(['shops'], () => getShops(), {
    keepPreviousData: true,
  });

  const shopsOptions = shops?.data.map(({ id, attributes }) => ({
    value: id,
    label: attributes.name,
  }));

  const onFinish = (values) => {
    const { customer, category, description, name, net_cost, shop, selling_price, order_date } = values;
    const formatedOrderDate = dayjs(order_date.$d).format('YYYY-MM-DD');
    const newData = {
      id: orderId,
      customer,
      category,
      description,
      name,
      net_cost,
      shop,
      selling_price,
      order_date: formatedOrderDate,
      images: uploads.map((image) => image.id || image.response[0].id),
    };

    editItemMutation.mutate(newData);
  };
  const [addCustomerForm] = Form.useForm();
  const queryClient = useQueryClient();

  const editItemMutation = useMutation({
    mutationFn: (newData) => {
      return editOrder(newData);
    },
    onSuccess: () => {
      queryClient.invalidateQueries(['orders', { filter: 'ORDERED' }]);
      toast.success(messages.orders.editSuccess, {
        progress: undefined,
      });
      navigate('/orders');
    },
    onError: () => {
      toast.error(messages.orders.editError, {
        progress: undefined,
      });
    },
  });

  const addCustomerMutation = useMutation((item) => addCustomer(item), {
    onSuccess: (data) => {
      if (data.data?.error) {
        return toast.error(data.data?.error || 'Սխալ է տեղի ունեցել', {
          progress: undefined,
        });
      }
      queryClient.invalidateQueries('customers');
      toast.success(messages.customers.createSuccess, {
        progress: undefined,
      });
      setShowAddCustomerModal(false);
      addCustomerForm.resetFields();
    },
    onError: (error, variables, context, mutation) => {
      console.log('err:::::: ', error);

      toast.error(error.response?.data?.error?.message || error.message, {
        progress: undefined,
      });
    },
  });

  const onCustomerAddSubmit = (values) => {
    addCustomerMutation.mutate(values);
  };

  const onChange = (value, selectedOptions) => {
    console.log(value, selectedOptions);
  };
  const filter = (inputValue, path) =>
    path.some((option) => option.label.toLowerCase().indexOf(inputValue.toLowerCase()) > -1);
  const onOpenCustomerModal = () => {
    setShowAddCustomerModal(true);
  };
  const onCloseCustomerModal = () => {
    setShowAddCustomerModal(false);
  };
  const contentStyle = {
    lineHeight: '260px',
    textAlign: 'center',
    color: token.colorTextTertiary,
    backgroundColor: token.colorFillAlter,
    borderRadius: token.borderRadiusLG,
    border: `1px dashed ${token.colorBorder}`,
    marginTop: 16,
    paddingTop: 10,
  };

  const formItemLayout = {
    labelCol: {
      xs: {
        span: 24,
      },
      sm: {
        span: 8,
      },
    },
    wrapperCol: {
      xs: {
        span: 24,
      },
      sm: {
        span: 16,
      },
    },
  };

  return (
    <>
      <div style={contentStyle}>
        <Form
          {...formItemLayout}
          form={form}
          name="new-order"
          onFinish={onFinish}
          style={{
            maxWidth: 600,
          }}
          scrollToFirstError
          initialValues={{
            name,
            description,
            category: category.data.id,
            shop: shop.data.id,
            net_cost,
            selling_price,
            customer: customer?.data?.id,
            order_date: dayjs(order_date),
          }}
        >
          <Form.Item name="image" label="Նկար" valuePropName="image">
            <Upload
              accept=".png,.jpeg,.jpg"
              name="files"
              fileList={uploads}
              onPreview={handlePreview}
              action={fileUploadUrl}
              listType="picture-card"
              multiple={true}
              maxCount={5}
              onChange={handleChange}
              // onChange={async (res) => {
              //   console.log('::::::uploaded ');

              //   if (!res.file?.response) return;
              //   const newUploadedImage = res.file?.response[0];
              //   // const { id, ...rest } = newUploadedImage;

              //   setUploads((prev) => [...prev, newUploadedImage]);
              // }}
              // onRemove={async (file) => {
              //   if (!uploadedFileId) return;
              //   const res = await axios.delete(`${fileUploadUrl}/files/${uploadedFileId}`);
              // }}
            >
              {uploads.length >= 5 ? null : (
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
              )}
            </Upload>
          </Form.Item>
          <Form.Item
            name="name"
            label="Անուն"
            rules={[
              {
                required: true,
                message: 'Պատվերի անունը պարտադիր է',
                whitespace: true,
              },
            ]}
          >
            <Input />
          </Form.Item>
          <Form.Item
            name="description"
            label="Չափս"
            rules={[
              {
                required: true,
                message: 'Չափսը պարտադիր դաշտ է',
                whitespace: true,
              },
            ]}
          >
            <Input />
          </Form.Item>
          <Form.Item
            name="category"
            label="Կատեգորիա"
            rules={[
              {
                required: true,
                message: 'Կատեգորիան պարտադիր է',
              },
            ]}
          >
            <Select
              // defaultValue='lucy'
              style={{
                width: 300,
              }}
              // onChange={handleChange}
              options={categoriesOptions}
            />
          </Form.Item>
          <Form.Item
            name="shop"
            label="Խանութ"
            rules={[
              {
                required: true,
                message: 'Խանութը պարտադիր դաշտ է',
              },
            ]}
          >
            <Select
              style={{
                width: 300,
              }}
              options={shopsOptions}
            />
          </Form.Item>
          <Form.Item
            name="net_cost"
            label="Ինքնարժեք"
            rules={[
              {
                type: 'number',
                min: 0,
                required: true,
                message: 'Ինքնարժեքը պարտադիր դաշտ է',
              },
            ]}
          >
            <InputNumber style={{ width: 300 }} />
          </Form.Item>
          <Form.Item
            name="selling_price"
            label="Վաճառքի գին"
            rules={[
              {
                type: 'number',
                min: 0,
                required: true,
                message: 'Վաճառքի գինը պարտադիր դաշտ է',
              },
            ]}
          >
            <InputNumber style={{ width: 300 }} />
          </Form.Item>
          <Form.Item
            name="order_date"
            label="Պատվերի ա/թ"
            rules={[
              {
                required: true,
                message: 'Պատվերի ա/թ պարտադիր է',
              },
            ]}
          >
            <DatePicker format={dateFormat} placeholder="Ընտրեք ամսաթիվը" style={{ width: '100%' }} />
          </Form.Item>
          <Form.Item
            label="Հաճախորդ"
            rules={[
              {
                required: true,
                message: 'Պարտադիր դաշտ է',
              },
            ]}
          >
            <Space.Compact
              style={{
                width: '100%',
              }}
            >
              <Form.Item
                name="customer"
                rules={[
                  {
                    required: true,
                    message: 'Պարտադիր դաշտ է',
                  },
                ]}
              >
                <Select
                  showSearch
                  style={{
                    width: 370,
                  }}
                  placeholder="Որոնել"
                  optionFilterProp="children"
                  filterOption={(input, option) => (option?.label?.toLowerCase() ?? '').includes(input.toLowerCase())}
                  filterSort={(optionA, optionB) =>
                    (optionA?.label ?? '').toLowerCase().localeCompare((optionB?.label ?? '').toLowerCase())
                  }
                  options={customerOptions}
                />
              </Form.Item>
              <Form.Item>
                <Button type="primary" icon={<PlusOutlined />} size="medium" onClick={onOpenCustomerModal} />
              </Form.Item>
            </Space.Compact>
          </Form.Item>
          <Modal
            title="Ավելացնել նոր հաճախորդ"
            centered
            open={showAddCustomerModal}
            onCancel={onCloseCustomerModal}
            width={800}
            footer={null}
          >
            <AddCustomerForm
              onCancel={onCloseCustomerModal}
              onSubmit={onCustomerAddSubmit}
              isLoadingAdd={addCustomerMutation.isLoading}
              form={addCustomerForm}
            />
          </Modal>
          <div
            style={{
              padding: '15px 0',
              width: '80%',
              display: 'flex',
              justifyContent: 'flex-end',
            }}
          >
            <Button onClick={onEditCancel} style={{ marginRight: 10 }}>
              Չեղարկել
            </Button>
            <Button type="primary" htmlType="submit" loading={editItemMutation.isLoading}>
              Պահպանել
            </Button>
          </div>
        </Form>
      </div>
      <Modal open={previewOpen} title={previewTitle} footer={null} onCancel={handleCancel}>
        <img
          alt="example"
          style={{
            width: '100%',
          }}
          src={previewImage}
        />
      </Modal>
    </>
  );
};

export default EditOrderForm;
