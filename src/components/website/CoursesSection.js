import React, { useEffect, useState } from 'react';
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

const CoursesSection = function CoursesSection() {
  const [courses, setCourses] = useState([]);
  const [loading, setLoading] = useState(true);

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
        {[1,2,3].map(i => (
          <Col xs={24} md={8} key={i} style={{ marginBottom: 16 }}>
            <div className="skeleton-card" />
          </Col>
        ))}
      </Row>
    </section>
  );
  if (!courses || courses.length === 0) return null;

  return (
    <section className="main-section" id="courses">
      <Divider orientation="left" className="section-title" id="courses">Khóa học</Divider>
      <Row gutter={24} align="stretch">
        {courses.map((c, idx) => (
          <Col xs={24} md={8} key={c.id || c.name || idx} style={{ marginBottom: 16, display: 'flex' }}>
            <Card
              title={<span style={{ color: '#1677ff' }}>{c.name}</span>}
              bordered={false}
              extra={<Button type="primary" href={c.registration} target="_blank">Đăng ký học</Button>}
              style={{ flex: 1, display: 'flex', flexDirection: 'column' }}
            >
              <div style={{ flex: 1 }}>
                <Paragraph>{c.shortdescription || c.description}</Paragraph>
                <Space>
                  <Tag color="blue">{c.duration}</Tag>
                  <Tag color="green">{c.students} học viên</Tag>
                  <Tag color="gold">{c.rating}/5 {renderStars(Number(c.rating))}</Tag>
                </Space>
              </div>
            </Card>
          </Col>
        ))}
      </Row>
    </section>
  );
};

export default React.memo(CoursesSection); 