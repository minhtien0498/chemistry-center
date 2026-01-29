'use client';

import React from 'react';
import { Row, Col, Typography, Button } from 'antd';
import { ArrowRightOutlined, BulbFilled } from '@ant-design/icons';

const { Title, Paragraph } = Typography;

const Banner = function Banner() {
  return (
    <div className="hero-wrapper">
      <div className="hero-decoration-circle" style={{ top: -50, left: -50 }}></div>
      <div className="hero-decoration-circle" style={{ bottom: -50, right: -50, background: 'rgba(255, 152, 0, 0.15)' }}></div>

      <div className="hero-container">
        <Row gutter={[48, 48]} align="middle">
          <Col xs={24} md={12}>
            <div className="section-animate visible">
              <div style={{ display: 'flex', flexDirection: 'column', gap: 0 }}>
                <div style={{ display: 'inline-flex', alignItems: 'center', gap: 8, background: '#e6f4ff', padding: '8px 16px', borderRadius: 20, color: '#1677ff', fontWeight: 600, marginBottom: 24, width: 'fit-content' }}>
                  <BulbFilled /> Đào tạo & Nghiên cứu Hóa học hàng đầu
                </div>
                <h1 className="hero-title">
                  Khám phá Thế giới <br />
                  <span style={{ color: '#ff9800', backgroundImage: 'linear-gradient(90deg, #ff9800 0%, #ffad33 100%)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent' }}>Hóa học & Sự sống</span>
                </h1>
                <p className="hero-subtitle">
                  Trung tâm Hóa học HCMUS cam kết mang đến môi trường học tập hiện đại, nghiên cứu đột phá và ứng dụng thực tiễn cho sự phát triển bền vững.
                </p>
                <div style={{ display: 'flex', gap: 16, flexWrap: 'wrap' }}>
                  <Button type="primary" size="large" icon={<ArrowRightOutlined />} style={{ height: 50, padding: '0 32px', fontSize: 16 }}>
                    Khám phá Khóa học
                  </Button>
                  <Button size="large" style={{ height: 50, padding: '0 32px', fontSize: 16 }}>
                    Liên hệ Hợp tác
                  </Button>
                </div>
              </div>
            </div>
          </Col>
          <Col xs={24} md={12}>
            <div className="hero-image-wrapper">
              <div style={{ position: 'absolute', bottom: 20, left: 20, background: 'rgba(255,255,255,0.9)', padding: '16px 24px', borderRadius: 16, backdropFilter: 'blur(10px)', boxShadow: '0 10px 30px rgba(0,0,0,0.1)' }}>
                <div style={{ fontSize: 14, color: '#666' }}>Sinh viên & Nghiên cứu sinh</div>
                <div style={{ fontSize: 24, fontWeight: 700, color: '#1677ff' }}>2,500+</div>
              </div>
            </div>
          </Col>
        </Row>
      </div>
    </div>
  );
};

export default React.memo(Banner); 