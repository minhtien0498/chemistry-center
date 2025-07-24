import React, { useEffect, useRef } from 'react';
import { Card, Typography, Divider, Row, Col } from 'antd';

const { Title, Paragraph } = Typography;

export default function AboutSection({ aboutData }) {
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
    <div ref={sectionRef} className="section-animate">
      <Divider orientation="left" id="about" className="divider-animate section-title-strong">Về Trung tâm</Divider>
      <Card bordered={false} style={{ marginBottom: 32 }}>
        <Title level={3} style={{ color: '#1677ff' }}>Giới thiệu</Title>
        <Paragraph>{aboutData.intro}</Paragraph>
        <Row gutter={32}>
          <Col xs={24} md={12}>
            <Title level={5}>Sứ mệnh</Title>
            <Paragraph>{aboutData.mission}</Paragraph>
          </Col>
          <Col xs={24} md={12}>
            <Title level={5}>Tầm nhìn</Title>
            <Paragraph>{aboutData.vision}</Paragraph>
          </Col>
        </Row>
      </Card>
    </div>
  );
} 