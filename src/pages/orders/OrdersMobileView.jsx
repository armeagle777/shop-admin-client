import React from 'react';
import OrderCard from './OrderCard';

const OrdersMobileView = ({ filteredData }) => {
    return (
        <>
            {filteredData?.map((row) => {
                const { id, attributes } = { ...row };
                const {
                    cancel_date,
                    category,
                    createdAt,
                    customer,
                    deliver_date,
                    description,
                    images,
                    name,
                    net_cost,
                    received_date,
                    return_date,
                    selling_price,
                    shop,
                    status,
                } = {
                    ...attributes,
                };
                return (
                    <OrderCard
                        name={name}
                        description={description}
                        customer={customer}
                        images={images}
                        key={id}
                    />
                );
            })}
        </>
    );
};

export default OrdersMobileView;
