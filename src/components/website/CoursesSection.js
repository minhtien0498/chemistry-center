'use client';

import React, { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { Row, Col, Card, Typography, Button, Space, Tag, Divider, Spin } from 'antd';
import { fetchCourses } from '../../services/sheetApi';

const { Title, Paragraph } = Typography;

function renderStars(rating) {
  const full = Math.floor(rating);
  const half = rating - full >= 0.5;
  return (
    <span>
      {[...Array(full)].map((_, i) => <span key={i} style={{ color: '#faad14' }}>★</span>)}
      {half && <span style={{ color: '#faad14' }}>☆</span>}
    </span>
  );
}

const CoursesSection = function CoursesSection({ limit }) {
  const [courses, setCourses] = useState([]);
  const [loading, setLoading] = useState(true);
  const router = useRouter();

  useEffect(() => {
    fetchCourses().then(data => {
      setCourses(data);
      setLoading(false);
    });
  }, []);

  if (loading) return (
    <section className="main-section" id="courses">
      <h2 className="section-title">Khóa học</h2>
      <Row gutter={24}>
        {[1, 2, 3].map(i => (
          <Col xs={24} md={8} key={i} style={{ marginBottom: 16 }}>
            <div className="skeleton-card" />
          </Col>
        ))}
      </Row>
    </section>
  );
  if (!courses || courses.length === 0) return null;

  const displayedCourses = limit ? courses.slice(0, limit) : courses;

  return (
    <section className="main-section" id="courses">
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 24 }}>
        <Divider orientation="left" className="section-title" id="courses" style={{ margin: 0 }}>Khóa học</Divider>
        {limit && courses.length > limit && (
          <Button type="link" onClick={() => {
            window.scrollTo(0, 0);
            router.push('/courses');
          }}>
            Xem tất cả &rarr;
          </Button>
        )}
      </div>

      <Row gutter={24} align="stretch" style={{ display: 'flex', flexWrap: 'wrap' }}>
        {displayedCourses.map((c, idx) => (
          <Col xs={24} md={8} key={c.id || c.name || idx} style={{ marginBottom: 16, display: 'flex' }}>
            <Card
              title={<span style={{ color: '#1677ff' }}>{c.name}</span>}
              bordered={false}
              extra={<Button type="primary" href={c.registration} target="_blank">Đăng ký học</Button>}
              style={{ flex: 1, display: 'flex', flexDirection: 'column', boxShadow: '0 4px 12px rgba(0,0,0,0.05)' }}
              bodyStyle={{ flex: 1, display: 'flex', flexDirection: 'column' }}
              hoverable
            >
              <div style={{ flex: 1, display: 'flex', flexDirection: 'column' }}>
                <Paragraph style={{ flex: 1 }}>{c.shortdescription || c.description}</Paragraph>
                <div style={{ marginTop: 'auto' }}>
                  <Space wrap>
                    <Tag color="blue">{c.duration}</Tag>
                    {c.students && <Tag color="green">{c.students} học viên</Tag>}
                    {c.rating && <Tag color="gold">{c.rating}/5 {renderStars(Number(c.rating))}</Tag>}
                  </Space>
                </div>
              </div>
            </Card>
          </Col>
        ))}
      </Row>
    </section>
  );
};

export default React.memo(CoursesSection); 