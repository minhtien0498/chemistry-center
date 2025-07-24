import React from 'react';
import { Card, Typography, Divider } from 'antd';

const { Title, Paragraph } = Typography;

export default function ResearchSection({ research }) {
  return (
    <>
      <Divider orientation="left" id="research">Nghiên cứu</Divider>
      <Card bordered={false} style={{ marginBottom: 32 }}>
        <Title level={4}>Các lĩnh vực nghiên cứu</Title>
        <ul style={{ paddingLeft: 20 }}>
          <li>Hóa phân tích, hóa môi trường, hóa hữu cơ, hóa vô cơ</li>
          <li>Phát triển vật liệu mới, công nghệ xử lý nước, năng lượng sạch</li>
          <li>Hợp tác nghiên cứu với doanh nghiệp và tổ chức quốc tế</li>
        </ul>
      </Card>
    </>
  );
} 