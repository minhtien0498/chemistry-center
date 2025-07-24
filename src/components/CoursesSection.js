import React, { useEffect, useState } from 'react';
import { Row, Col, Card, Typography, Button, Space, Tag, Divider, Spin } from 'antd';
import { fetchCourses } from '../services/sheetApi';

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

export default function CoursesSection() {
  const [courses, setCourses] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchCourses().then(data => {
      setCourses(data);
      setLoading(false);
    });
  }, []);

  if (loading) return <Spin size="large" style={{ display: 'block', margin: '40px auto' }} />;
  if (!courses || courses.length === 0) return null;

  return (
    <>
      <Divider orientation="left" id="courses">Khóa học</Divider>
      <Row gutter={24}>
        {courses.map((c, idx) => (
          <Col xs={24} md={8} key={c.id || c.name || idx} style={{ marginBottom: 16 }}>
            <Card
              title={<span style={{ color: '#1677ff' }}>{c.name}</span>}
              bordered={false}
              extra={<Button type="primary" href={c.registration} target="_blank">Đăng ký học</Button>}
            >
              <Paragraph>{c.shortdescription || c.description}</Paragraph>
              <Space>
                <Tag color="blue">{c.duration}</Tag>
                <Tag color="green">{c.students} học viên</Tag>
                <Tag color="gold">{c.rating}/5 {renderStars(Number(c.rating))}</Tag>
              </Space>
            </Card>
          </Col>
        ))}
      </Row>
    </>
  );
} 