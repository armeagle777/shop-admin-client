import { Button, Result } from 'antd';
import { Link, useNavigate } from 'react-router-dom';

const NotFound = () => {
    const navigate = useNavigate();
    const onClick = () => {
        navigate('/');
    };
    return (
        <Result
            status='404'
            title='404'
            subTitle='Կներեք, նման էջ գոյություն չունի'
            extra={
                <Link to='/'>
                    <Button type='primary'>Հինական էջ</Button>
                </Link>
            }
        />
    );
};

export default NotFound;
