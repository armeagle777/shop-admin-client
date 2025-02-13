import { Pagination } from 'antd';
import { OrderCard } from '../../components';

const OrdersMobileView = ({
  queryString,
  filteredData,
  showProgress,
  setShowProgress,
  handleDelete,
  filter,
  totalCount,
  currentPage,
  onPageChange,
}) => {
  return (
    <div
      style={{
        display: 'flex',
        flexDirection: 'column',
        gap: '16px',
        background: 'transparent',
      }}
    >
      {filteredData?.map((row, index) => {
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
            setShowProgress={setShowProgress}
            status={status}
            queryString={queryString}
            handleDelete={handleDelete}
            order={attributes}
            filter={filter}
          />
        );
      })}
      <Pagination
        onChange={onPageChange}
        current={currentPage}
        total={totalCount}
        hideOnSinglePage
      />
    </div>
  );
};

export default OrdersMobileView;
