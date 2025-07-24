import React, { useEffect, useState, useRef } from 'react';
import { Row, Col, Card, Typography, Avatar, Divider, Spin, Button } from 'antd';
import { fetchTeam } from '../services/sheetApi';

const { Title, Text, Paragraph } = Typography;

function getFirstSentence(text) {
  if (!text) return '';
  const match = text.match(/.*?[.!?](\s|$)/);
  return match ? match[0] : text;
}

export default function TeamSection() {
  const [teamData, setTeamData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [expanded, setExpanded] = useState({});
  const sectionRef = useRef();

  useEffect(() => {
    fetchTeam().then(data => {
      setTeamData(data);
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
  if (!teamData || teamData.length === 0) {
    console.warn('Không có dữ liệu đội ngũ chuyên gia:', teamData);
    return <div style={{textAlign:'center',color:'#ff9800',margin:'32px 0'}}>Không có dữ liệu đội ngũ chuyên gia!</div>;
  }

  return (
    <div className="section-animate" ref={sectionRef}>
      <Divider orientation="left" id="team">Đội ngũ chuyên gia</Divider>
      <Row gutter={24} style={{ marginBottom: 32 }}>
        {teamData.map((member, idx) => {
          const avatarUrl = member.avatar || member.image || undefined;
          const name = member.name || 'Chưa có tên';
          const role = member.title || member.role || 'Chưa có chức danh';
          const bio = member.desc || member.bio || 'Chưa có mô tả';
          const firstSentence = getFirstSentence(bio);
          const isLong = bio.length > firstSentence.length;
          const isExpanded = expanded[idx];
          return (
            <Col xs={24} sm={12} md={6} key={member.id || name || idx} style={{ marginBottom: 16 }}>
              <Card
                bordered
                hoverable
                className="card-highlight"
                style={{
                  textAlign: 'center',
                  minHeight: 340,
                  borderRadius: 20,
                  boxShadow: '0 8px 32px 0 rgba(22,119,255,0.10)',
                  border: '2px solid #ff9800',
                  background: '#fff'
                }}
              >
                <Avatar
                  src={avatarUrl}
                  size={96}
                  style={{ marginBottom: 18, border: '3px solid #1677ff', boxShadow: '0 2px 12px #e6f4ff', background: '#fff', color: '#1677ff', fontWeight: 700 }}
                >
                  {!avatarUrl && name ? name[0] : null}
                </Avatar>
                <Title level={5} style={{ marginBottom: 2, color: '#1677ff', fontWeight: 700 }}>{name}</Title>
                <Text style={{ fontSize: 16, fontWeight: 500, color: '#222' }}>{role}</Text>
                <Paragraph style={{ marginTop: 10, fontSize: 15, color: '#222', minHeight: 48 }}>
                  {isExpanded ? bio : firstSentence}
                  {isLong && (
                    <Button
                      type="link"
                      style={{ padding: 0, marginLeft: 4, fontWeight: 500 }}
                      onClick={() => setExpanded(exp => ({ ...exp, [idx]: !exp[idx] }))}
                    >
                      {isExpanded ? 'Thu gọn' : 'Xem thêm'}
                    </Button>
                  )}
                </Paragraph>
              </Card>
            </Col>
          );
        })}
      </Row>
    </div>
  );
} 