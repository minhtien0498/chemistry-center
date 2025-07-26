import React, { useRef } from 'react';
import { Carousel, Card, Tag, Typography, Button } from 'antd';
import { LeftOutlined, RightOutlined, EyeOutlined, MessageOutlined } from '@ant-design/icons';

const { Title, Paragraph, Text } = Typography;

export default function NewsCarousel({ news }) {
  const newsCarouselRef = useRef(null);
  return (
    <>
      <div style={{ position: 'relative', maxWidth: 700, margin: '0 auto 32px auto' }}>
        <Button
          shape="circle"
          icon={<LeftOutlined />}
          size="large"
          style={{ position: 'absolute', left: -32, top: '50%', transform: 'translateY(-50%)', zIndex: 2, boxShadow: '0 2px 8px #e6f4ff' }}
          onClick={() => newsCarouselRef.current && newsCarouselRef.current.prev()}
        />
        <Button
          shape="circle"
          icon={<RightOutlined />}
          size="large"
          style={{ position: 'absolute', right: -32, top: '50%', transform: 'translateY(-50%)', zIndex: 2, boxShadow: '0 2px 8px #e6f4ff' }}
          onClick={() => newsCarouselRef.current && newsCarouselRef.current.next()}
        />
        <Carousel autoplay dots ref={newsCarouselRef}>
          {news.map((item, idx) => (
            <div key={idx}>
              <Card bordered={false} style={{ maxWidth: 600, margin: '0 auto', minHeight: 320, textAlign: 'left', padding: 0, overflow: 'hidden', position: 'relative' }}>
                <div style={{ position: 'relative', height: 180, overflow: 'hidden' }}>
                  <img src={item.image} alt={item.title} style={{ width: '100%', height: '100%', objectFit: 'cover', filter: 'brightness(0.85)' }} loading="lazy" />
                  <Tag color={item.type === 'Hội thảo' ? 'purple' : item.type === 'Giải thưởng' ? 'gold' : item.type === 'Hợp tác' ? 'blue' : 'red'} style={{ position: 'absolute', top: 12, left: 12, fontSize: 16, padding: '4px 16px', zIndex: 2 }}>{item.type}</Tag>
                </div>
                <div style={{ padding: 20 }}>
                  <Title level={4} style={{ margin: '0 0 8px 0' }}>{item.title}</Title>
                  <Paragraph style={{ fontSize: 16, marginBottom: 8 }}>{item.desc}</Paragraph>
                  <div style={{ display: 'flex', alignItems: 'center', gap: 18, marginBottom: 8 }}>
                    <span style={{ display: 'flex', alignItems: 'center', color: '#1677ff', fontWeight: 500 }}><EyeOutlined style={{ marginRight: 4 }} />{item.views}</span>
                    <span style={{ display: 'flex', alignItems: 'center', color: '#ff9800', fontWeight: 500 }}><MessageOutlined style={{ marginRight: 4 }} />{item.comments}</span>
                  </div>
                  <Text type="secondary">{item.date} - {item.author}</Text>
                  <div>
                    <Button type="link" style={{ padding: 0, fontWeight: 600, color: '#1677ff' }}>Xem chi tiết</Button>
                  </div>
                </div>
              </Card>
            </div>
          ))}
        </Carousel>
      </div>
    </>
  );
} 