import React from 'react';
import { ConfigProvider, theme, Button, Card, Space } from 'antd';
import { BrowserView } from 'react-device-detect';

const Home = () => {
    return (
        <BrowserView>
            <div style={{ width: '100%', display: 'flex' }}>
                <div style={{ width: '50%', outline: '2px solid red' }}></div>
                <div style={{ width: '50%', outline: '2px solid red' }}></div>
            </div>
        </BrowserView>
    );
};

export default Home;
