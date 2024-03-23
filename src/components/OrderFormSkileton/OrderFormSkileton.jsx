import { Skeleton, Space } from 'antd';

import { ANT_LAYOUTS, ANT_SHAPES, ANT_SIZES } from '../../utils/constants';
import {
  paragraphStyles,
  containerStyles,
  btnsWrapperStyles,
} from './OrderFormSkileton.constants';

const OrderFormSkileton = () => {
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
      <Space style={btnsWrapperStyles}>
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

export default OrderFormSkileton;
