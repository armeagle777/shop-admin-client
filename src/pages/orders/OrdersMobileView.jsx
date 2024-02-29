import React from 'react';
import { Input } from 'antd';
import OrderCard from './OrderCard';

const OrdersMobileView = ({ filteredData, showProgress, searchTerm, handleInputChange, handleSearch }) => {
  const { Search } = Input;
  return (
    <div
      style={{
        display: 'flex',
        flexDirection: 'column',
        gap: '16px',
        background: 'transparent',
      }}
    >
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
            net_cost={net_cost}
            selling_price={selling_price}
            key={id}
            orderId={id}
            showProgress={showProgress}
            status={status}
          />
        );
      })}
    </div>
  );
};

export default OrdersMobileView;
