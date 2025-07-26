import React from 'react';
import { Alert, Card } from 'antd';
import { WarningOutlined } from '@ant-design/icons';

const ApiKeyWarning = () => {
  return (
    <Card style={{ marginBottom: 16 }}>
      <Alert
        message="Cảnh báo: Chưa cấu hình Google Sheets API Key"
        description={
          <div>
            <p>Để sử dụng đầy đủ tính năng CRUD (thêm, sửa, xóa), bạn cần:</p>
            <ol>
              <li>Truy cập <a href="https://console.cloud.google.com/" target="_blank" rel="noopener noreferrer">Google Cloud Console</a></li>
              <li>Tạo project mới hoặc chọn project có sẵn</li>
              <li>Enable Google Sheets API</li>
              <li>Tạo API Key trong Credentials</li>
              <li>Thêm vào file .env: <code>REACT_APP_GOOGLE_SHEETS_API_KEY=your_api_key_here</code></li>
            </ol>
            <p><strong>Hiện tại:</strong> Chỉ có thể xem dữ liệu (Read-only mode)</p>
          </div>
        }
        type="warning"
        showIcon
        icon={<WarningOutlined />}
        closable={false}
      />
    </Card>
  );
};

export default ApiKeyWarning; 