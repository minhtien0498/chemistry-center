import React, { useEffect, useState } from 'react';
import { Row, Col, Card, Typography, Space, Avatar, Button, Divider, Spin } from 'antd';
import { fetchMaterials } from '../../services/sheetApi';

const { Title, Paragraph } = Typography;

const MaterialsSection = function MaterialsSection() {
  const [materials, setMaterials] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchMaterials().then(data => {
      setMaterials(data);
      setLoading(false);
    });
  }, []);

  if (loading) return <Spin size="large" style={{ display: 'block', margin: '40px auto' }} />;
  if (!materials || materials.length === 0) return null;

  return (
    <>
      <Divider orientation="left">Tài liệu học tập</Divider>
      <Row gutter={24}>
        {materials.map((m, idx) => (
          <Col xs={24} md={8} key={m.id || m.title || idx} style={{ marginBottom: 16 }}>
            <Card bordered={false}>
              <Space direction="vertical" size={8}>
                <Avatar size={48} style={{ background: '#e6f4ff', color: '#1677ff' }} icon={m.icon} />
                <Title level={5}>{m.title}</Title>
                <Paragraph>{m.description}</Paragraph>
                <Button type="link" href={m.link} target="_blank">Xem {m.title.toLowerCase()}</Button>
              </Space>
            </Card>
          </Col>
        ))}
      </Row>
    </>
  );
}

export default React.memo(MaterialsSection); 