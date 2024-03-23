import { useState } from 'react';
import { toast } from 'react-toastify';
import { PlusOutlined } from '@ant-design/icons';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import {
  Form,
  Input,
  Modal,
  Space,
  Select,
  Button,
  Cascader,
  DatePicker,
} from 'antd';

import { messages } from '../../../utils/constants';
import { addCustomer } from '../../../api/serverApi';
import { AddCustomerForm } from '../../../components';

const SecondStepContent = ({ countriesOptions, customerOptions }) => {
  const [showAddCustomerModal, setShowAddCustomerModal] = useState(false);
  const [filter, setFilter] = useState('');
  const [addCustomerForm] = Form.useForm();
  const onOpenCustomerModal = () => {
    setShowAddCustomerModal(true);
  };
  const onCloseCustomerModal = () => {
    setShowAddCustomerModal(false);
  };

  const handleFilterChange = (value) => {
    setFilter(value);
  };
  const filterOption = (input, option) => {
    const fName = option.label?.props?.children[1];
    const lName = option.label?.props?.children[3];
    const phoneNumber = option.label?.props?.children[5];

    return (
      fName?.toLowerCase().indexOf(input.toLowerCase()) >= 0 ||
      lName?.toLowerCase().indexOf(input.toLowerCase()) >= 0 ||
      phoneNumber?.toLowerCase().indexOf(input.toLowerCase()) >= 0 ||
      `${fName} ${lName} ${phoneNumber}`
        .toLowerCase()
        .indexOf(input.toLowerCase()) >= 0
    );
  };
  const dateFormat = 'DD/MM/YYYY';
  const queryClient = useQueryClient();
  const addItemMutation = useMutation((item) => addCustomer(item), {
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
  const onSubmit = (values) => {
    addItemMutation.mutate(values);
  };

  const onChange = (value, selectedOptions) => {
    console.log(value, selectedOptions);
  };

  //   const filter = (inputValue, path) =>
  //     path.some(
  //       (option) =>
  //       option.label.toLowerCase().indexOf(inputValue.toLowerCase()) >
  //       -1
  //     );
  return (
    <>
      <Form.Item name="order_date" label="Պատվերի ա/թ">
        <DatePicker
          format={dateFormat}
          placeholder="Ընտրեք ամսաթիվը"
          style={{ width: '100%' }}
        />
      </Form.Item>
      <Form.Item name={['address', 'district']} label="Հասցե:երկիր">
        <Cascader
          options={countriesOptions}
          onChange={onChange}
          placeholder="Երկիր/մարզ/համայնք"
          //   showSearch={{
          //     filter,
          //   }}
          onSearch={(value) => console.log(value)}
        />
      </Form.Item>
      <Form.Item name={['address', 'street']} label="Հասցե: փողոց">
        <Input placeholder="Մուտքագրել հասցեն" />
      </Form.Item>
      <Form.Item name={['address', 'index']} label="Հասցե։ինդեքս">
        <Input placeholder="index" />
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
                padding: -5,
              }}
              placeholder="Որոնել"
              optionFilterProp="children"
              filterOption={filterOption}
              //   dropdownRender={(menu) => (
              //     <div>
              //       <Space style={{ margin: 8 }}>
              //         <Input
              //           placeholder="Search options"
              //           value={filter}
              //           onChange={(e) => handleFilterChange(e.target.value)}
              //           style={{ width: 200 }}
              //         />
              //       </Space>
              //       {menu}
              //     </div>
              //   )}
              //   filterOption={(input, option) => {
              //     console.log('option:::::: ', option);

              //     (option?.label?.toLowerCase() ?? '').includes(input.toLowerCase());
              //   }}
              //   filterSort={(optionA, optionB) =>
              //     (optionA?.label ?? '').toLowerCase().localeCompare((optionB?.label ?? '').toLowerCase())
              //   }
              options={customerOptions}
            />
          </Form.Item>
          <Form.Item>
            <Button
              type="primary"
              icon={<PlusOutlined />}
              size="medium"
              onClick={onOpenCustomerModal}
            />
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
    </>
  );
};

export default SecondStepContent;
