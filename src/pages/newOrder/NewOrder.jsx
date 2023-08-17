import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Button, Form, message, Steps, theme } from 'antd';
import FirstStepContent from './FirstStepContent';
import SecondStepContent from './SecondStepContent';
import ThirdStepContent from './ThirdStepContent';
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import {
    addOrder,
    getCategories,
    getCountries,
    getCustomers,
    getShops,
} from '../../api/serverApi';
import { messages } from '../../utils/constants';
import { toast } from 'react-toastify';
import { formatCountriesData } from '../../utils/helpers';
import dayjs from 'dayjs';
import { format } from 'date-fns';

const NewOrder = () => {
    const { token } = theme.useToken();
    const [current, setCurrent] = useState(0);
    const [form] = Form.useForm();
    const [formValues, setFormValues] = useState({});
    const navigate = useNavigate();

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

    const { data: categories } = useQuery(
        ['categories'],
        () => getCategories(),
        {
            keepPreviousData: true,
        }
    );

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

        newData.order_date = order_date
            ? new Date(order_date.$d).toISOString()
            : new Date().toISOString();

        addItemMutation.mutate(newData);
    };

    const steps = [
        {
            title: 'Պարտադիր',
            content: (
                <FirstStepContent
                    setFormValues={setFormValues}
                    categoriesOptions={categoriesOptions || []}
                    shopsOptions={shopsOptions || []}
                />
            ),
        },
        {
            title: 'Ընտրովի',
            content: (
                <SecondStepContent
                    countriesOptions={countriesOptions}
                    customerOptions={customerOptions || []}
                />
            ),
        },
        {
            title: 'Նկար',
            content: <ThirdStepContent setFormValues={setFormValues} />,
        },
    ];

    const next = async () => {
        try {
            await form.validateFields([
                'name',
                'description',
                'net_cost',
                'selling_price',
                'shop',
                'category',
                'customer',
            ]);
            setFormValues({ ...formValues, ...form.getFieldsValue() });
            setCurrent((prev) => prev + 1);
        } catch {}
    };
    const prev = () => {
        setCurrent(current - 1);
    };
    const items = steps.map((item) => ({
        key: item.title,
        title: item.title,
    }));
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
            <Steps current={current} items={items} />
            <div style={contentStyle}>
                <Form
                    {...formItemLayout}
                    form={form}
                    name='new-order'
                    onFinish={onFinish}
                    style={{
                        maxWidth: 600,
                    }}
                    scrollToFirstError
                >
                    {steps[current].content}
                </Form>
            </div>
            <div
                style={{
                    marginTop: 24,
                }}
            >
                {current < steps.length - 1 && (
                    <Button
                        type='primary'
                        onClick={() => next()}
                        disabled={disabledNextButton}
                    >
                        Հաջորդը
                    </Button>
                )}
                {current === steps.length - 1 && (
                    <Button
                        type='primary'
                        onClick={onSubmit}
                        loading={addItemMutation.isLoading}
                    >
                        Հաստատել
                    </Button>
                )}
                {current > 0 && (
                    <Button
                        style={{
                            margin: '0 8px',
                        }}
                        onClick={() => prev()}
                        disabled={addItemMutation.isLoading}
                    >
                        Նախորդը
                    </Button>
                )}
            </div>
        </>
    );
};

export default NewOrder;
