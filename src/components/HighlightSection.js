import React, { useEffect, useRef } from 'react';
import { Row, Col, Card, Typography, Divider } from 'antd';
import { ExperimentOutlined, BookOutlined, StarFilled, TeamOutlined } from '@ant-design/icons';

const { Title, Text } = Typography;

const HighlightSection = function HighlightSection() {
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
    <section ref={sectionRef} className="section-animate main-section" id="highlight">
      <Divider orientation="left" className="section-title" id="highlight">Điểm nổi bật</Divider>
      <Row gutter={24} style={{ marginBottom: 32, textAlign: 'center' }}>
        <Col xs={12} md={6}>
          <Card bordered={false} className="card-highlight">
            <ExperimentOutlined className="icon-pulse" style={{ fontSize: 36, color: '#1677ff', marginBottom: 8 }} />
            <Title level={3} as="h3" className="section-title section-title-strong" style={{ margin: 0 }}>1500+</Title>
            <Text>Sinh viên</Text>
          </Card>
        </Col>
        <Col xs={12} md={6}>
          <Card bordered={false} className="card-highlight">
            <BookOutlined className="icon-pulse" style={{ fontSize: 36, color: '#ff9800', marginBottom: 8 }} />
            <Title level={3} className="section-title section-title-strong" style={{ color: '#ff9800', margin: 0 }}>120</Title>
            <Text>Công trình</Text>
          </Card>
        </Col>
        <Col xs={12} md={6}>
          <Card bordered={false} className="card-highlight">
            <StarFilled className="icon-pulse" style={{ fontSize: 36, color: '#ffd700', marginBottom: 8 }} />
            <Title level={3} className="section-title section-title-strong" style={{ color: '#ffd700', margin: 0 }}>15</Title>
            <Text>Giải thưởng</Text>
          </Card>
        </Col>
        <Col xs={12} md={6}>
          <Card bordered={false} className="card-highlight">
            <TeamOutlined className="icon-pulse" style={{ fontSize: 36, color: '#1677ff', marginBottom: 8 }} />
            <Title level={3} className="section-title section-title-strong" style={{ margin: 0 }}>20+</Title>
            <Text>Đối tác</Text>
          </Card>
        </Col>
      </Row>
    </section>
  );
};

export default React.memo(HighlightSection); 