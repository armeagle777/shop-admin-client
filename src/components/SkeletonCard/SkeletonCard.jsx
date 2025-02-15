import React from 'react';
import { Card, Skeleton, Avatar } from 'antd';

const { Meta } = Card;

const SkeletonCard = () => {
  return (
    <Card
      style={{ width: '100%' }}
      cover={
        // Simulate the image cover with a skeleton placeholder
        <Skeleton.Image style={{ width: '100%', height: 200 }} />
      }
      actions={[
        // Render skeleton actions (using divs as placeholders)
        <div key="edit" style={{ width: 40, height: 40 }} />,
        <div key="delete" style={{ width: 40, height: 40 }} />,
        <div key="status" style={{ width: 40, height: 40 }} />,
        <div key="return" style={{ width: 40, height: 40 }} />,
      ]}
    >
      <Skeleton loading active avatar>
        <Meta
          avatar={<Avatar />}
          title={
            <>
              <div
                style={{ width: 120, height: 16, backgroundColor: '#eee' }}
              />
              <br />
              <div
                style={{
                  width: 80,
                  height: 14,
                  backgroundColor: '#eee',
                  marginTop: 8,
                }}
              />
            </>
          }
          description={
            <>
              <div
                style={{ width: '60%', height: 14, backgroundColor: '#eee' }}
              />
              <br />
              <div
                style={{
                  width: '40%',
                  height: 14,
                  backgroundColor: '#eee',
                  marginTop: 8,
                }}
              />
            </>
          }
        />
      </Skeleton>
    </Card>
  );
};

export default SkeletonCard;
