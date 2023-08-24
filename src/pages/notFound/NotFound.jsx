import { Button, Result } from 'antd';
import { Link, useNavigate } from 'react-router-dom';

const NotFound = ({ message }) => {
    return (
        <Result
            status='404'
            title='404'
            subTitle={message}
            extra={
                <Link to='/'>
                    <Button type='primary'>Հինական էջ</Button>
                </Link>
            }
        />
    );
};

export default NotFound;
