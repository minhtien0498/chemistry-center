import React from 'react';
import { Row, Col, Card, Typography, Form, Input, Button, message, Divider } from 'antd';

const { Title } = Typography;

export default function ContactSection() {
  const [form] = Form.useForm();
  const onFinish = () => {
    message.success('Gửi liên hệ thành công!');
    form.resetFields();
  };
  return (
    <>
      <Divider orientation="left" id="contact">Liên hệ</Divider>
      <Row gutter={32}>
        <Col xs={24} md={12} style={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
          <Card bordered={false} style={{ height: 360, maxWidth: 370, width: '100%', display: 'flex', flexDirection: 'column', justifyContent: 'center', padding: '0' }}>
            <Title level={4} style={{ marginBottom: 10 }}>Gửi liên hệ cho chúng tôi</Title>
            <Form
              form={form}
              layout="vertical"
              onFinish={onFinish}
              style={{ gap: 6 }}
            >
              <Form.Item name="name" label="Họ tên" rules={[{ required: true, message: 'Vui lòng nhập họ tên' }]} style={{ marginBottom: 8 }}>
                <Input placeholder="Nhập họ tên" />
              </Form.Item>
              <Form.Item name="email" label="Email" rules={[{ required: true, type: 'email', message: 'Vui lòng nhập email hợp lệ' }]} style={{ marginBottom: 8 }}>
                <Input placeholder="Nhập email" />
              </Form.Item>
              <Form.Item name="phone" label="Số điện thoại" rules={[{ required: true, message: 'Vui lòng nhập số điện thoại' }]} style={{ marginBottom: 8 }}>
                <Input placeholder="Nhập số điện thoại" />
              </Form.Item>
              <Form.Item name="message" label="Nội dung" rules={[{ required: true, message: 'Vui lòng nhập nội dung' }]} style={{ marginBottom: 8 }}>
                <Input.TextArea placeholder="Nhập nội dung liên hệ" rows={1} style={{ resize: 'none' }} />
              </Form.Item>
              <Form.Item style={{ marginBottom: 0 }}>
                <Button type="primary" htmlType="submit" block>Gửi liên hệ</Button>
              </Form.Item>
            </Form>
          </Card>
        </Col>
        <Col xs={24} md={12}>
          <div className="contact-map" style={{ height: 360, borderRadius: 16, overflow: 'hidden', boxShadow: '0 4px 16px 0 rgba(22,119,255,0.07)' }}>
            <iframe
              title="Google Map HCMUS"
              src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3919.510964964049!2d106.6822480758706!3d10.77199525927359!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x31752f1c8b2b2b6b%3A0x6e7e0e92ce40938!2zMjI3IMSQLiBOZ3V54buFbiBWxINuIEPGoSwgUGjGsOG7nW5nIDUsIFF14bqtbiA1LCBUaOG7pyBCw6xuaCwgSOG7kyBDaMOtbmggTWluaCwgVmnhu4d0IE5hbQ!5e0!3m2!1svi!2s!4v1713340000000!5m2!1svi!2s"
              width="100%"
              height="100%"
              style={{ border: 0 }}
              allowFullScreen=""
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
            ></iframe>
          </div>
        </Col>
      </Row>
    </>
  );
} 