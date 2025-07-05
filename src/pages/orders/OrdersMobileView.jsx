import { Pagination } from 'antd';
import { OrderCard } from '../../components';
import SkeletonCard from '../../components/SkeletonCard/SkeletonCard';

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
  isLoading,
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
      {isLoading && <SkeletonCard />}
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
          comment,
        } = {
          ...attributes,
        };
        return (
          <OrderCard
            name={name}
            description={description}
            customer={customer}
            comment={comment}
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
