import React, { useEffect, useRef } from 'react';
import { Row, Col, Typography, Button, Space } from 'antd';

const { Title, Paragraph } = Typography;

const Banner = function Banner() {
  const sectionRef = useRef();
  useEffect(() => {
    const handleScroll = () => {
      if (!sectionRef.current) return;
      const rect = sectionRef.current.getBoundingClientRect();
      if (rect.top < window.innerHeight - 80) {
        sectionRef.current.classList.add('visible');
      }
    };
    window.addEventListener('scroll', handleScroll);
    handleScroll();
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);
  return (
    <Row ref={sectionRef} gutter={32} align="middle" style={{ minHeight: 220 }} className="banner-section section-animate">
      <Col xs={24} md={14}>
        <h1 className="section-title" style={{ color: '#1677ff' }}>Trung tâm Hóa học HCMUS</h1>
        <Paragraph style={{ fontSize: 18 }}>
          Đào tạo chuyên sâu - Nghiên cứu đột phá - Ứng dụng công nghệ
        </Paragraph>
        <Space>
          <Button type="primary" size="large" className="banner-btn">Khám phá khóa học 🧑‍🏫</Button>
          <Button size="large" className="banner-btn">Tham gia ngay 🔥</Button>
        </Space>
      </Col>
    </Row>
  );
};

export default React.memo(Banner); 