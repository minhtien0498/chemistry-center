import React, { useState } from 'react';
import { Form, Input, Button, Card, message } from 'antd';
import { UserOutlined, LockOutlined } from '@ant-design/icons';
import { ADMIN_CONFIG } from '../../config';
import '../../styles/admin/Login.css';

const Login = ({ onLogin }) => {
  const [loading, setLoading] = useState(false);

  const onFinish = (values) => {
    setLoading(true);
    
    // Simple authentication - check against configuration
    const adminEmail = ADMIN_CONFIG.email;
    const adminPassword = ADMIN_CONFIG.password;
    
    if (values.email === adminEmail && values.password === adminPassword) {
      // Store login state in localStorage
      localStorage.setItem('adminLoggedIn', 'true');
      localStorage.setItem('adminEmail', values.email);
      
      message.success('Đăng nhập thành công!');
      onLogin();
    } else {
      message.error('Email hoặc mật khẩu không đúng!');
    }
    
    setLoading(false);
  };

  return (
    <div className="login-container">
      <Card className="login-card" title="Admin Login">
        <Form
          name="login"
          onFinish={onFinish}
          autoComplete="off"
          layout="vertical"
        >
          <Form.Item
            name="email"
            label="Email"
            rules={[
              { required: true, message: 'Vui lòng nhập email!' },
              { type: 'email', message: 'Email không hợp lệ!' }
            ]}
          >
            <Input 
              prefix={<UserOutlined />} 
              placeholder="admin@chemistry-center.com" 
              size="large"
            />
          </Form.Item>

          <Form.Item
            name="password"
            label="Mật khẩu"
            rules={[{ required: true, message: 'Vui lòng nhập mật khẩu!' }]}
          >
            <Input.Password 
              prefix={<LockOutlined />} 
              placeholder="admin123" 
              size="large"
            />
          </Form.Item>

          <Form.Item>
            <Button 
              type="primary" 
              htmlType="submit" 
              loading={loading}
              size="large"
              block
            >
              Đăng nhập
            </Button>
          </Form.Item>
        </Form>
        
        <div className="login-info">
          <p><strong>Thông tin đăng nhập:</strong></p>
          <p>Email: {ADMIN_CONFIG.email}</p>
          <p>Password: {ADMIN_CONFIG.password}</p>
        </div>
      </Card>
    </div>
  );
};

export default Login; 