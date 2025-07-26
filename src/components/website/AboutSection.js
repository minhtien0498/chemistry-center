import React, { useEffect, useRef } from 'react';
import { Card, Typography, Divider, Row, Col } from 'antd';

const { Title, Paragraph } = Typography;

const AboutSection = function AboutSection({ aboutData }) {
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
    <section ref={sectionRef} className="section-animate main-section" id="about">
      <Divider orientation="left" className="section-title" id="about">Về Trung tâm</Divider>
      <Card bordered={false}>
        <Paragraph>{aboutData.intro}</Paragraph>
        <Row gutter={32}>
          <Col xs={24} md={12}>
            <Title level={5} className="section-title">Sứ mệnh</Title>
            <Paragraph>{aboutData.mission}</Paragraph>
          </Col>
          <Col xs={24} md={12}>
            <Title level={5} className="section-title">Tầm nhìn</Title>
            <Paragraph>{aboutData.vision}</Paragraph>
          </Col>
        </Row>
      </Card>
    </section>
  );
};

export default React.memo(AboutSection); 