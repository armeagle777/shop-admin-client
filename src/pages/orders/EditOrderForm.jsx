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
import { addOrder, getCategories, getCountries, getCustomers, getShops } from '../../api/serverApi';
import { messages } from '../../utils/constants';
import { toast } from 'react-toastify';
import { formatCountriesData } from '../../utils/helpers';
import dayjs from 'dayjs';
import { format } from 'date-fns';
import { PlusOutlined } from '@ant-design/icons';
import AddCustomerForm from '../../components/shared/addCutomerForm/AddCustomerForm';

const EditOrderForm = ({
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
  const [current, setCurrent] = useState(0);
  const [form] = Form.useForm();
  const [formValues, setFormValues] = useState({});
  const navigate = useNavigate();
  const fileUploadUrl = `${import.meta.env.VITE_SERVER_URL}/upload`;
  const dateFormat = 'DD/MM/YYYY';
  const {
    data: countries,
    isLoading,
    isFetching,
  } = useQuery(['countries'], getCountries, {
    keepPreviousData: true,
  });

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

  const disabledNextButton = isLoading || isFetching;

  const countriesOptions = formatCountriesData(countries);

  const onFinish = (values) => {
    form.submit();
  };
  const [addCustomerForm] = Form.useForm();
  const queryClient = useQueryClient();

  const addItemMutation = useMutation({
    mutationFn: (newOrder) => {
      return addOrder(newOrder);
    },
    onSuccess: () => {
      queryClient.invalidateQueries(['orders', { filter: 'ORDERED' }]);
      toast.success(messages.orders.createSuccess, {
        progress: undefined,
      });
      form.resetFields();
      navigate('/orders');
    },
    onError: () => {
      toast.error(messages.shops.deleteError, {
        progress: undefined,
      });
    },
  });

  const onSubmit = () => {
    const orderAddress = {};
    const { address, order_date, ...restData } = { ...formValues };

    const { district, street, index } = { ...address };
    if (district) {
      const [country, marz, community, settlement] = [...district];
      if (country) {
        orderAddress.country = country;
      }
      if (marz) {
        orderAddress.marz = marz;
      }
      if (community) {
        orderAddress.community = community;
      }
      if (settlement) {
        orderAddress.settlement = settlement;
      }
      if (street) {
        orderAddress.street = street;
      }
      if (index) {
        orderAddress.index = index;
      }
    }

    const newData = { ...restData, address: orderAddress };

    newData.order_date = order_date ? new Date(order_date.$d) : new Date();

    addItemMutation.mutate(newData);
  };

  const next = async () => {
    try {
      await form.validateFields(['name', 'description', 'net_cost', 'selling_price', 'shop', 'category', 'customer']);
      setFormValues({ ...formValues, ...form.getFieldsValue() });
      setCurrent((prev) => prev + 1);
    } catch {}
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
            customer: customer.data.id,
          }}
        >
          <Form.Item
            name={['customer', 'image']}
            label="Նկար"
            // valuePropName={['customer', 'image']}
            // getValueFromEvent={normFile}
          >
            <Space align="start" style={{ width: '100%' }}>
              {images?.data?.length &&
                images.data.map((img) => <Image height={100} width={90} src={formatImageUrl(img.attributes.url)} />)}
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
            </Space>
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
              // defaultValue='lucy'
              style={{
                width: 300,
              }}
              // onChange={handleChange}
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
            <InputNumber />
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
            <InputNumber />
          </Form.Item>
          <Form.Item name="order_date" label="Պատվերի ա/թ">
            <DatePicker
              defaultValue={dayjs(order_date)}
              format={dateFormat}
              placeholder="Ընտրեք ամսաթիվը"
              style={{ width: '100%' }}
            />
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
              onSubmit={onSubmit}
              isLoadingAdd={addItemMutation.isLoading}
              form={addCustomerForm}
            />
          </Modal>
        </Form>
      </div>
      <div
        style={{
          marginTop: 24,
        }}
      >
        <Button type="primary" onClick={onSubmit} loading={addItemMutation.isLoading}>
          Հաստատել
        </Button>
      </div>
    </>
  );
};

export default EditOrderForm;
