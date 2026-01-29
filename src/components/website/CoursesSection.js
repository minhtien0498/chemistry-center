'use client';

import React, { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { Row, Col, Card, Typography, Button, Space, Tag, Divider, Spin } from 'antd';
import { StarFilled } from '@ant-design/icons';
import { fetchCourses } from '../../services/sheetApi';

const { Title, Paragraph } = Typography;



const CoursesSection = function CoursesSection({ limit, data = null }) {
  const [courses, setCourses] = useState(data || []);
  const [loading, setLoading] = useState(!data);
  const router = useRouter();

  useEffect(() => {
    if (data) {
      setCourses(data);
      setLoading(false);
      return;
    }
    fetchCourses().then(data => {
      setCourses(data);
      setLoading(false);
    });
  }, [data]);

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
        <Divider titlePlacement="left" className="section-title" id="courses" style={{ margin: 0 }}>Khóa học</Divider>
        {limit && courses.length > limit && (
          <Button type="link" onClick={() => {
            window.scrollTo(0, 0);
            router.push('/courses');
          }}>
            Xem tất cả &rarr;
          </Button>
        )}
      </div>

      <Row gutter={[24, 24]} align="stretch" style={{ display: 'flex', flexWrap: 'wrap' }}>
        {displayedCourses.map((c, idx) => (
          <Col xs={24} md={8} key={c.id || c.name || idx} style={{ marginBottom: 16, display: 'flex' }}>
            <Card
              title={<span style={{ color: '#1677ff', fontWeight: 600 }}>{c.name}</span>}
              variant="outlined"
              className="card-highlight"
              extra={<Button type="primary" size="small" href={c.registration} target="_blank">Đăng ký</Button>}
              style={{ flex: 1, display: 'flex', flexDirection: 'column' }}
              styles={{ body: { flex: 1, display: 'flex', flexDirection: 'column' } }}
              hoverable
            >
              <div style={{ flex: 1, display: 'flex', flexDirection: 'column' }}>
                <Paragraph ellipsis={{ rows: 3 }} style={{ flex: 1, marginBottom: 16 }}>{c.shortdescription || c.description}</Paragraph>
                <div style={{ marginTop: 'auto' }}>
                  <Space wrap size={[8, 8]}>
                    <Tag color="blue">{c.duration}</Tag>
                    {c.students && <Tag color="green">{c.students} học viên</Tag>}
                    {c.rating && <Tag color="gold" icon={<StarFilled />}>{c.rating}/5</Tag>}
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