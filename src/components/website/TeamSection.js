'use client';

import React, { useEffect, useState, useRef } from 'react';
import { useRouter } from 'next/navigation';
import { Row, Col, Card, Typography, Avatar, Divider, Spin, Button } from 'antd';
import { fetchTeam } from '../../services/sheetApi';

const { Title, Text, Paragraph } = Typography;

function getFirstSentence(text) {
  if (!text) return '';
  const match = text.match(/.*?[.!?](\s|$)/);
  return match ? match[0] : text;
}

const TeamSection = function TeamSection({ limit }) {
  const [teamData, setTeamData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [expanded, setExpanded] = useState({});
  const sectionRef = useRef();
  const router = useRouter();

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

  if (loading) return (
    <section className="section-animate main-section" id="team">
      <h2 className="section-title">Đội ngũ chuyên gia</h2>
      <Row gutter={24} style={{ marginBottom: 32 }}>
        {[1, 2, 3, 4].map(i => (
          <Col xs={24} sm={12} md={6} key={i} style={{ marginBottom: 16 }}>
            <div className="skeleton-card" />
          </Col>
        ))}
      </Row>
    </section>
  );
  if (!teamData || teamData.length === 0) {
    console.warn('Không có dữ liệu đội ngũ chuyên gia:', teamData);
    return null; // Don't show empty section error on home
  }

  const displayedData = limit ? teamData.slice(0, limit) : teamData;

  return (
    <section className="section-animate main-section" ref={sectionRef} id="team">
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 24 }}>
        <Divider orientation="left" className="section-title" id="team" style={{ margin: 0 }}>Đội ngũ chuyên gia</Divider>
        {limit && teamData.length > limit && (
          <Button type="link" onClick={() => {
            window.scrollTo(0, 0);
            router.push('/team');
          }}>
            Xem tất cả &rarr;
          </Button>
        )}
      </div>

      <Row gutter={[24, 24]} style={{ marginBottom: 32 }}>
        {displayedData.map((member, idx) => {
          const avatarUrl = member.avatar || member.image || undefined;
          const name = member.name || 'Chưa có tên';
          const role = member.title || member.role || 'Chưa có chức danh';
          const bio = member.desc || member.bio || 'Chưa có mô tả';
          const firstSentence = getFirstSentence(bio);
          const isLong = bio.length > firstSentence.length;
          const isExpanded = expanded[idx];
          return (
            <Col xs={24} sm={12} md={limit ? 8 : 6} key={member.id || name || idx}>
              <Card
                bordered
                hoverable
                className="card-highlight"
                style={{
                  textAlign: 'center',
                  height: '100%',
                  borderRadius: 20,
                  boxShadow: '0 8px 32px 0 rgba(22,119,255,0.10)',
                  border: '2px solid #ff9800',
                  background: '#fff',
                  display: 'flex',
                  flexDirection: 'column'
                }}
                bodyStyle={{ flex: 1, display: 'flex', flexDirection: 'column' }}
              >
                <div style={{ marginBottom: 18 }}>
                  <Avatar
                    src={avatarUrl}
                    size={96}
                    style={{ border: '3px solid #1677ff', boxShadow: '0 2px 12px #e6f4ff', background: '#fff', color: '#1677ff', fontWeight: 700 }}
                    {...(avatarUrl ? { loading: 'lazy' } : {})}
                  >
                    {!avatarUrl && name ? name[0] : null}
                  </Avatar>
                </div>
                <Title level={5} style={{ marginBottom: 2, color: '#1677ff', fontWeight: 700 }}>{name}</Title>
                <Text style={{ fontSize: 16, fontWeight: 500, color: '#222', display: 'block', marginBottom: 10 }}>{role}</Text>

                <div style={{ flex: 1 }}>
                  <Paragraph style={{ fontSize: 15, color: '#555', marginBottom: 0 }}>
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
                </div>
              </Card>
            </Col>
          );
        })}
      </Row>
    </section>
  );
};

export default React.memo(TeamSection); 