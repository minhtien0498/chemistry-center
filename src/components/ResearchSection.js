import React, { useEffect, useState, useRef } from 'react';
import { Card, Typography, Divider, Spin, Row, Col, Button, Avatar } from 'antd';
import { fetchResearch } from '../services/sheetApi';
import { ExperimentOutlined, HeartOutlined, EnvironmentOutlined } from '@ant-design/icons';

const { Title, Paragraph } = Typography;

function getIcon(title) {
  if (/năng lượng/i.test(title)) return <ExperimentOutlined style={{ fontSize: 48 }} />;
  if (/y học/i.test(title)) return <HeartOutlined style={{ fontSize: 48 }} />;
  if (/môi trường/i.test(title)) return <EnvironmentOutlined style={{ fontSize: 48}} />;
  return <ExperimentOutlined style={{ fontSize: 48, color: '#1890ff' }} />;
}

export default function ResearchSection() {
  const [research, setResearch] = useState([]);
  const [loading, setLoading] = useState(true);
  const [showAll, setShowAll] = useState(false);
  const sectionRef = useRef();

  useEffect(() => {
    fetchResearch().then(data => {
      setResearch(data);
      setLoading(false);
    });
  }, []);

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

  if (loading) return <Spin size="large" style={{ display: 'block', margin: '40px auto' }} />;
  if (!research || research.length === 0) return null;

  const displayResearch = showAll ? research : research.slice(0, 3);
  const hasMore = research.length > 3;

  return (
    <div className="section-animate" ref={sectionRef}>
      <Divider orientation="left" id="research">
        <span style={{ fontSize: 32, fontWeight: 700 }}>Nghiên cứu & Ứng dụng thực tiễn</span>
      </Divider>
      <Row gutter={32} justify="center">
        {displayResearch.map((r, idx) => (
          <Col xs={24} sm={12} md={8} key={r.id || r.title || idx} style={{ marginBottom: 32 }}>
            <Card
              style={{
                borderRadius: 16,
                boxShadow: '0 4px 24px 0 rgba(22,119,255,0.08)',
                textAlign: 'center',
                padding: '32px 12px 24px 12px',
                minHeight: 340,
                background: '#fff',
                border: '1.5px solid #e6f4ff'
              }}
              hoverable
            >
              <div style={{ marginBottom: 18 }}>
                <Avatar style={{ background: '#1890ff', margin: '0 auto', width: 80, height: 80, display: 'flex', alignItems: 'center', justifyContent: 'center' }} size={80} icon={getIcon(r.title)} />
              </div>
              <Title level={4} style={{ color: '#222', fontWeight: 700, marginBottom: 8 }}>{r.title}</Title>
              <Paragraph style={{ color: '#444', minHeight: 48 }}>{r.description}</Paragraph>
              <Button type="link" style={{ marginTop: 12, fontWeight: 500 }}>Tìm hiểu thêm</Button>
            </Card>
          </Col>
        ))}
      </Row>
      {hasMore && (
        <div style={{ textAlign: 'center', marginTop: 8 }}>
          <Button type="primary" onClick={() => setShowAll(v => !v)}>
            {showAll ? 'Thu gọn' : 'Xem thêm'}
          </Button>
        </div>
      )}
    </div>
  );
} 