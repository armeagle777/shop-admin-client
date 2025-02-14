import { useState } from 'react';
import delve from 'dlv';
import axios from 'axios';
import { toast } from 'react-toastify';
import { useNavigate } from 'react-router-dom';
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import {
  Form,
  Image,
  Input,
  Space,
  Upload,
  Button,
  Select,
  Cascader,
} from 'antd';
import {
  EditOutlined,
  PlusOutlined,
  MinusCircleOutlined,
} from '@ant-design/icons';

import { Alert } from '..';
import { messages } from '../../utils/constants';
import { editCustomer, getCountries } from '../../api/serverApi';
import { formatCountriesData, formatImageUrl } from '../../utils/helpers';

const layout = {
  labelCol: {
    span: 4,
  },
  wrapperCol: {
    span: 24,
  },
};

const validatePhoneNumber = (rule, value, callback) => {
  const emailRegex = /^(\d{6})$/;
  if (!value || emailRegex.test(value)) {
    callback();
  } else {
    callback('Հեռախոսահամարի ճիշտ ֆորմատն է XXYYZZ:');
  }
};

const validateMessages = {
  required: '${label} պարտադիր է!',
  types: {
    email: '${label}֊ի ֆորմատը սխալ է',
    number: '${label} is not a valid number!',
  },
  // number: {
  //     range: '${label} must be between ${min} and ${max}',
  // },
};

const prefixSelector = (
  <Form.Item name="phone_code" noStyle>
    <Select style={{ width: 70 }}>
      <Select.Option value="010">010</Select.Option>
      <Select.Option value="011">011</Select.Option>
      <Select.Option value="012">012</Select.Option>
      <Select.Option value="033">033</Select.Option>
      <Select.Option value="041">041</Select.Option>
      <Select.Option value="043">043</Select.Option>
      <Select.Option value="044">044</Select.Option>
      <Select.Option value="055">055</Select.Option>
      <Select.Option value="077">077</Select.Option>
      <Select.Option value="091">091</Select.Option>
      <Select.Option value="093">093</Select.Option>
      <Select.Option value="094">094</Select.Option>
      <Select.Option value="095">095</Select.Option>
      <Select.Option value="096">096</Select.Option>
      <Select.Option value="097">097</Select.Option>
      <Select.Option value="098">098</Select.Option>
      <Select.Option value="099">099</Select.Option>
    </Select>
  </Form.Item>
);

const EditCustomerForm = ({
  customerId,
  isLoading,
  isError,
  error,
  first_name,
  last_name,
  phone_number,
  Avatar,
  addresses,
  contacts,
}) => {
  const {
    data: countries,
    isLoadin: isCountriesLoadin,
    isFetching: isCountriesFetching,
  } = useQuery(['countries'], getCountries, {
    keepPreviousData: true,
  });
  const [form] = Form.useForm();
  const navigate = useNavigate();
  const queryClient = useQueryClient();
  const [uploadedFileId, setUploadedFileId] = useState(undefined);
  const editItemMutation = useMutation(
    ({ item, customerId }) => editCustomer({ item, customerId }),
    {
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
        // form.resetFields();
      },
      onError: (error, variables, context, mutation) => {
        console.log('err:::::: ', error);

        toast.error(error.response?.data?.error?.message || error.message, {
          progress: undefined,
        });
      },
    },
  );

  const phone_code = phone_number?.substring(0, 3);
  const phone_digits = phone_number?.substring(3, 9);
  const address_info = addresses[0];
  const address_id = addresses[0]?.id;
  const { community, country, index, marz, settlement, street } = {
    ...address_info,
  };
  const countryId = delve(country, 'data.id');
  const marzId = delve(marz, 'data.id');
  const communityId = delve(community, 'data.id');
  const settlementId = delve(settlement, 'data.id');

  const avatarSrc = Avatar?.url;
  const currentImageId = Avatar?.id;
  const disabledSubmitButton = isCountriesLoadin || isCountriesFetching;
  const contactsList = contacts?.map((el) => ({
    phone_number: el?.phone_number,
  }));

  const countriesOptions = formatCountriesData(countries);

  const fileUploadUrl = `${import.meta.env.VITE_SERVER_URL}/upload`;

  const onChange = (value, selectedOptions) => {
    console.log(value, selectedOptions);
  };
  const onCancel = () => {
    navigate('/customers');
  };
  const filter = (inputValue, path) =>
    path.some(
      (option) =>
        option.label.toLowerCase().indexOf(inputValue.toLowerCase()) > -1,
    );

  const onFinish = (values) => {
    values.address_id = address_id;

    editItemMutation.mutate({ item: values, customerId });
  };

  const normFile = (e) => {
    if (Array.isArray(e)) {
      return e;
    }
    return e?.files;
  };

  if (isLoading) return 'Loading...';

  if (isError) {
    return <Alert type="error" message={error.message} />;
  }

  return (
    <Form
      {...layout}
      name="edit-customer"
      onFinish={onFinish}
      style={{
        maxWidth: 900,
      }}
      validateMessages={validateMessages}
      initialValues={{
        phone_code,
        first_name,
        last_name,
        phone_number: phone_digits,
        street,
        index,
        district: [countryId, marzId, communityId, settlementId],
        contacts: contactsList,
      }}
      form={form}
    >
      <Form.Item
        name="image"
        label="Նկար"
        valuePropName="image"
        getValueFromEvent={normFile}
      >
        <Space align="start">
          {avatarSrc && !uploadedFileId && (
            <Image height={100} width={90} src={formatImageUrl(avatarSrc)} />
          )}
          <Upload
            accept=".png,.jpeg,.jpg"
            name="files"
            action={fileUploadUrl}
            data={{
              ref: 'api::customer.customer',
              refId: customerId,
              field: 'Avatar',
            }}
            listType="picture-card"
            multiple={false}
            maxCount={1}
            onChange={async (res) => {
              if (!res.file?.response) return;
              if (currentImageId && !uploadedFileId) {
                await axios.delete(`${fileUploadUrl}/files/${currentImageId}`);
              }

              if (uploadedFileId) {
                await axios.delete(`${fileUploadUrl}/files/${uploadedFileId}`);
              }

              const fileId = res.file?.response[0].id;

              setUploadedFileId(fileId);
            }}
            onRemove={async (file) => {
              if (!uploadedFileId) return;
              const res = await axios.delete(
                `${fileUploadUrl}/files/${uploadedFileId}`,
              );
            }}
          >
            <div>
              <EditOutlined />
              <div
                style={{
                  marginTop: 8,
                }}
              >
                Խմբագրել
              </div>
            </div>
          </Upload>
        </Space>
      </Form.Item>
      <Form.Item
        name="first_name"
        label="Անուն"
        rules={[
          {
            required: true,
          },
        ]}
      >
        <Input size="large" />
      </Form.Item>
      <Form.Item
        name="last_name"
        label="Ազգանուն"
        rules={[
          {
            required: true,
          },
        ]}
      >
        <Input size="large" />
      </Form.Item>
      <Form.Item
        name="phone_number"
        label="Հեռ․"
        rules={[
          {
            required: true,
          },
          {
            validator: validatePhoneNumber,
          },
        ]}
        extra={<span>ճիշտ ֆորմատն է 887755</span>}
      >
        <Input
          addonBefore={prefixSelector}
          style={{ width: '100%' }}
          size="large"
        />
      </Form.Item>
      <Form.Item label="Հասցե">
        <Form.Item
          name="district"
          style={{
            display: 'inline-block',
            width: 'calc(35% - 8px)',
          }}
        >
          <Cascader
            size="large"
            options={countriesOptions}
            onChange={onChange}
            placeholder="Երկիր/մարզ/համայնք"
            showSearch={{
              filter,
            }}
            onSearch={(value) => console.log(value)}
          />
        </Form.Item>
        <Form.Item
          name="street"
          style={{
            display: 'inline-block',
            width: 'calc(50% - 8px)',
            margin: '0 8px',
          }}
        >
          <Input size="large" placeholder="Մուտքագրել հասցեն" />
        </Form.Item>
        <Form.Item
          name="index"
          style={{
            display: 'inline-block',
            width: 'calc(15% - 8px)',
          }}
        >
          <Input size="large" placeholder="index" />
        </Form.Item>
      </Form.Item>
      <Form.List name="contacts">
        {(fields, { add, remove }) => (
          <div
            style={{
              width: '80%',
              paddingLeft: '15%',
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'flex-start',
              justifyContent: 'flex-start',
              gap: 5,
            }}
          >
            {fields.map(({ key, name, ...restField }) => (
              <div
                key={key}
                style={{
                  display: 'flex',
                  flexDirection: 'row',
                  justifyContent: 'flex-start',
                  width: '55%',
                  height: 45,
                  gap: 8,
                }}
              >
                <Form.Item
                  key={key}
                  {...restField}
                  name={[name, 'phone_number']}
                  rules={[
                    {
                      required: true,
                      message: 'Missing phone_number',
                    },
                  ]}
                >
                  <Input
                    placeholder="Կոնտակտ"
                    style={{
                      minWidth: '220px',
                    }}
                  />
                </Form.Item>
                <MinusCircleOutlined onClick={() => remove(name)} />
              </div>
            ))}
            <Form.Item>
              <Button
                type="dashed"
                onClick={() => add()}
                // block
                icon={<PlusOutlined />}
              >
                Կոնտակտ
              </Button>
            </Form.Item>
          </div>
        )}
      </Form.List>
      <Form.Item
        wrapperCol={{
          ...layout.wrapperCol,
          offset: 6,
        }}
      >
        <Button onClick={onCancel} style={{ marginRight: 10 }}>
          Չեղարկել
        </Button>
        <Button
          type="primary"
          htmlType="submit"
          loading={editItemMutation.isLoading}
          disabled={disabledSubmitButton}
        >
          Պահպանել
        </Button>
      </Form.Item>
    </Form>
  );
};

export default EditCustomerForm;
