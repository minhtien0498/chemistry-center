'use client';

import React from 'react';
import { Layout } from 'antd';
import { PhoneOutlined, FacebookFilled, MailOutlined, EnvironmentOutlined } from '@ant-design/icons';

const { Footer } = Layout;

export default function AppFooter() {
  return (
    <Footer className="custom-footer">
      <div className="footer-content">
        <div className="footer-logo-block">
          <img src="/logo.png" alt="Chemistry" style={{ maxWidth: 50 }} />
          <div className="footer-logo-text">CHEMISTRY CENTER</div>
        </div>
        <div className="footer-info-block">
          <div className="footer-info-col">
            <div className="footer-info-item"><PhoneOutlined /> <span>+84 28 1234 5678</span></div>
            <div className="footer-info-item"><FacebookFilled /> <span>chemcenterhcmus</span></div>
          </div>
          <div className="footer-info-col">
            <div className="footer-info-item"><MailOutlined /> <span>info@chemcenter.hcmus.edu.vn</span></div>
            <div className="footer-info-item"><EnvironmentOutlined /> <span>227 Nguyễn Văn Cừ, Q.5, TP.HCM</span></div>
          </div>
        </div>
      </div>
      <div className="footer-copyright">© 2024 Chemistry Center - HCMUS Chemistry Research. All rights reserved.</div>
    </Footer>
  );
} 