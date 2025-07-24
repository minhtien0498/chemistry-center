import React, { useEffect, useRef } from 'react';
import { Row, Col, Card, Typography, Avatar, Divider } from 'antd';

const { Title, Text, Paragraph } = Typography;

export default function TeamSection({ teamData }) {
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
    <div ref={sectionRef} className="section-animate">
      <Divider orientation="left" id="team" className="divider-animate section-title-strong">Đội ngũ chuyên gia</Divider>
      <Row gutter={24} style={{ marginBottom: 32 }}>
        {teamData.map((member, idx) => (
          <Col xs={24} sm={12} md={6} key={member.name} style={{ marginBottom: 16 }}>
            <Card bordered hoverable style={{ textAlign: 'center', minHeight: 320 }}>
              <Avatar src={member.avatar} size={80} style={{ marginBottom: 16 }} />
              <Title level={5} style={{ marginBottom: 0 }}>{member.name}</Title>
              <Text type="secondary">{member.title}</Text>
              <Paragraph style={{ marginTop: 8 }}>{member.desc}</Paragraph>
            </Card>
          </Col>
        ))}
      </Row>
    </div>
  );
} 