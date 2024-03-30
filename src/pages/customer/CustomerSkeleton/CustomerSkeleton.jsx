import { Skeleton, Space } from 'antd';

import {
  imageStyles,
  containerStyles,
  paragraphStyles,
} from '../Customer.constants';
import { ANT_LAYOUTS, ANT_SHAPES, ANT_SIZES } from '../../../utils/constants';

const CustomerSkeleton = () => {
  return (
    <Space direction={ANT_LAYOUTS.VERTICAL} style={containerStyles}>
      <Space>
        <Skeleton.Image active />
        <Skeleton.Node active />
      </Space>
      <Skeleton.Input active size={ANT_SIZES.LARGE} block />
      <Skeleton.Input active size={ANT_SIZES.LARGE} block />
      <Skeleton.Input active size={ANT_SIZES.LARGE} block />
      <Skeleton.Input active size={ANT_SIZES.LARGE} block />
      <Skeleton.Input active size={ANT_SIZES.LARGE} block />
      <Skeleton.Input active size={ANT_SIZES.LARGE} block />
      <Skeleton.Input active size={ANT_SIZES.LARGE} block />
      <Skeleton paragraph={paragraphStyles} />
      <Space style={imageStyles}>
        <Skeleton.Button
          block
          active
          size={ANT_SIZES.LARGE}
          shape={ANT_SHAPES.SQUARE}
        />
        <Skeleton.Button
          block
          active
          size={ANT_SIZES.LARGE}
          shape={ANT_SHAPES.SQUARE}
        />
      </Space>
    </Space>
  );
};

export default CustomerSkeleton;
