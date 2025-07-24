import React from 'react';
import { Row, Col, Card, Typography, Space, Avatar, Button, Divider } from 'antd';

const { Title, Paragraph } = Typography;

export default function MaterialsSection({ materials }) {
  return (
    <>
      <Divider orientation="left">Tài liệu học tập</Divider>
      <Row gutter={24}>
        {materials.map((m, idx) => (
          <Col xs={24} md={8} key={m.title} style={{ marginBottom: 16 }}>
            <Card bordered={false}>
              <Space direction="vertical" size={8}>
                <Avatar size={48} style={{ background: '#e6f4ff', color: '#1677ff' }} icon={m.icon} />
                <Title level={5}>{m.title}</Title>
                <Paragraph>{m.desc}</Paragraph>
                <Button type="link">Xem {m.title.toLowerCase()}</Button>
              </Space>
            </Card>
          </Col>
        ))}
      </Row>
    </>
  );
} 