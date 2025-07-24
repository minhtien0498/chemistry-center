import React from 'react';
import { Row, Col, Card, Typography, Button, Space, Tag, Divider } from 'antd';

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

export default function CoursesSection({ courses }) {
  return (
    <>
      <Divider orientation="left" id="courses">Khóa học</Divider>
      <Row gutter={24}>
        {courses.map((c, idx) => (
          <Col xs={24} md={8} key={c.title} style={{ marginBottom: 16 }}>
            <Card
              title={<span style={{ color: '#1677ff' }}>{c.title}</span>}
              bordered={false}
              extra={<Button type="primary">Đăng ký học</Button>}
            >
              <Paragraph>{c.desc}</Paragraph>
              <Space>
                <Tag color="blue">{c.weeks} tuần</Tag>
                <Tag color="green">{c.students} học viên</Tag>
                <Tag color="gold">{c.rating}/5 {renderStars(c.rating)}</Tag>
              </Space>
            </Card>
          </Col>
        ))}
      </Row>
    </>
  );
} 