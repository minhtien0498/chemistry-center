'use client';

import React, { useEffect, useState, useRef } from 'react';
import { useRouter } from 'next/navigation';
import { Card, Typography, Divider, Spin, Row, Col, Button, Avatar } from 'antd';
import { fetchResearch } from '../../services/sheetApi';
import { ExperimentOutlined, HeartOutlined, EnvironmentOutlined } from '@ant-design/icons';

const { Title, Paragraph } = Typography;

function getIcon(title) {
  if (/năng lượng/i.test(title)) return <ExperimentOutlined style={{ fontSize: 48 }} />;
  if (/y học/i.test(title)) return <HeartOutlined style={{ fontSize: 48 }} />;
  if (/môi trường/i.test(title)) return <EnvironmentOutlined style={{ fontSize: 48 }} />;
  return <ExperimentOutlined style={{ fontSize: 48, color: '#1890ff' }} />;
}

const ResearchSection = function ResearchSection({ limit }) {
  const [research, setResearch] = useState([]);
  const [loading, setLoading] = useState(true);
  const sectionRef = useRef();
  const router = useRouter();

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

  const displayResearch = limit ? research.slice(0, limit) : research;

  return (
    <section className="section-animate main-section" ref={sectionRef} id="research">
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 24 }}>
        <Divider className="section-title" id="research" style={{ margin: 0 }}>Nghiên cứu & Ứng dụng thực tiễn</Divider>
        {limit && research.length > limit && (
          <Button type="link" onClick={() => {
            window.scrollTo(0, 0);
            router.push('/research');
          }}>
            Xem tất cả &rarr;
          </Button>
        )}
      </div>

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
                border: '1.5px solid #e6f4ff',
                height: '100%',
                display: 'flex',
                flexDirection: 'column'
              }}
              styles={{ body: { flex: 1, display: 'flex', flexDirection: 'column' } }}
              hoverable
            >
              <div style={{ marginBottom: 18 }}>
                <Avatar style={{ background: '#1890ff', margin: '0 auto', width: 80, height: 80, display: 'flex', alignItems: 'center', justifyContent: 'center' }} size={80} icon={getIcon(r.title)} />
              </div>
              <Title level={4} style={{ color: '#222', fontWeight: 700, marginBottom: 8 }}>{r.title}</Title>
              <Paragraph style={{ color: '#444', marginBottom: 'auto' }}>{r.description}</Paragraph>
              <Button type="link" style={{ marginTop: 12, fontWeight: 500 }}>Tìm hiểu thêm</Button>
            </Card>
          </Col>
        ))}
      </Row>
    </section>
  );
}

export default React.memo(ResearchSection); 