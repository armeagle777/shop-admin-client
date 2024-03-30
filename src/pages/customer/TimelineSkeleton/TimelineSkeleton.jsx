import { Skeleton } from 'antd';

const TimelineSkeleton = () => {
  return (
    <Skeleton
      paragraph={{
        rows: 6,
      }}
    />
  );
};

export default TimelineSkeleton;
