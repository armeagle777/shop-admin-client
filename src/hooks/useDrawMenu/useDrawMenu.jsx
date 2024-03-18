import { Link } from 'react-router-dom';
import { FaTools } from 'react-icons/fa';
import { RiseOutlined } from '@ant-design/icons';
import { AiFillInteraction } from 'react-icons/ai';
import { BsBarChartFill } from 'react-icons/bs';

const useDrawMenu = () => {
  return [
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
        },
      ],
    },
    {
      label: 'Ֆինանսներ',
      key: 'sub3',
      icon: <RiseOutlined />,
      children: [
        { label: <Link to="/reports">Հաշվետվություն</Link>, key: '8' },
      ],
    },
  ];
};

export default useDrawMenu;
