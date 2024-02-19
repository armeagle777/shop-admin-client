import { UploadOutlined, RiseOutlined } from '@ant-design/icons';
import { AiFillInteraction } from 'react-icons/ai';
import { BsBarChartFill } from 'react-icons/bs';
import { FaTools } from 'react-icons/fa';

import { Link } from 'react-router-dom';

export const menuItems = [
  {
    label: <Link to="/">Գլխավոր</Link>,
    key: '1',
    icon: <BsBarChartFill />,
  },
  {
    label: 'Հիմնական',
    key: 'sub1',
    icon: <AiFillInteraction />,
    children: [
      { label: <Link to="/orders">Պատվերներ</Link>, key: '2' },
      { label: <Link to="/customers">Հաճախորդներ</Link>, key: '3' },
      { label: <Link to="/expenses">Ծախսեր</Link>, key: '4' },
    ],
  },
  {
    label: 'Օժանդակ',
    key: 'sub2',
    icon: <FaTools />,
    children: [
      { label: <Link to="/shops">Խանութներ</Link>, key: '5' },
      { label: <Link to="/categories">Կատեգորիաներ</Link>, key: '6' },
      {
        label: <Link to="/expense-directions">Ծխս. նպատակ</Link>,
        key: '7',
        // icon: null,
        // children: [
        //     {
        //         label: (
        //             <Link to='/expense-directions'>Ծխս. նպատակ</Link>
        //         ),
        //         key: '8',
        //     },
        // ],
      },
    ],
  },
  {
    label: 'Ֆինանսներ',
    key: 'sub3',
    icon: <RiseOutlined />,
    children: [{ label: <Link to="/reports">Հաշվետվություն</Link>, key: '8' }],
  },
];

export const loaderText = 'Բեռնում․․․․';
export const messages = {
  customers: {
    deleteError: 'Ինչ որ բան այնպես չէ',
    deleteSuccess: 'Հաջողությամբ հեռացվել է',
    createError: 'Չհաջողվեց հեռացնել',
    createSuccess: 'Հաջողությամբ ավելացվել է',
  },
  shops: {
    deleteError: 'Ինչ որ բան այնպես չէ',
    editError: 'Չհաջողվեց ղմբագրել',
    editSuccess: 'Հաջողությամբ ղմբագրվեց',
    deleteSuccess: 'Հաջողությամբ հեռացվել է',
  },
  orders: {
    deleteError: 'Ինչ որ բան այնպես չէ',
    statusChangeSuccess: 'Հաջողությամբ փոփոխվել է',
    editError: 'Չհաջողվեց խմբագրել',
    editSuccess: 'Հաջողությամբ խմբագրվեց',
    deleteSuccess: 'Հաջողությամբ հեռացվել է',
    createSuccess: 'Հաջողությամբ ավելացվել է',
  },
};

export const accessoryIds = [32, 39];
export const accessoriesCategories = [74];
