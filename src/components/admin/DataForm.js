import React, { useState, useEffect } from 'react';
import { Modal, Form, Input, Button, message, Space } from 'antd';
import { getSheetHeaders } from '../../services/sheetApi';

const DataForm = ({
  visible,
  onCancel,
  onSubmit,
  initialData = null,
  sheetName,
  isEdit = false
}) => {
  const [form] = Form.useForm();
  const [loading, setLoading] = useState(false);
  const [headers, setHeaders] = useState([]);

  useEffect(() => {
    if (visible && sheetName) {
      loadHeaders();
    }
  }, [visible, sheetName]);

  useEffect(() => {
    if (visible && initialData) {
      form.setFieldsValue(initialData);
    } else if (visible) {
      form.resetFields();
    }
  }, [visible, initialData, form]);

  const loadHeaders = async () => {
    try {
      const sheetHeaders = await getSheetHeaders(sheetName);
      setHeaders(sheetHeaders);
    } catch (error) {
      message.error('Lỗi khi tải cấu trúc dữ liệu');
    }
  };

  const handleSubmit = async (values) => {
    setLoading(true);
    try {
      await onSubmit(values);
      form.resetFields();
      message.success(isEdit ? 'Cập nhật thành công!' : 'Thêm mới thành công!');
    } catch (error) {
      message.error('Lỗi: ' + error.message);
    } finally {
      setLoading(false);
    }
  };

  const renderFormFields = () => {
    return headers.map(header => (
      <Form.Item
        key={header}
        name={header}
        label={header.charAt(0).toUpperCase() + header.slice(1)}
        rules={[
          { required: true, message: `Vui lòng nhập ${header}!` }
        ]}
      >
        <Input placeholder={`Nhập ${header}`} />
      </Form.Item>
    ));
  };

  return (
    <Modal
      title={isEdit ? 'Sửa dữ liệu' : 'Thêm dữ liệu mới'}
      open={visible}
      onCancel={onCancel}
      footer={null}
      width={600}
      destroyOnHidden
    >
      <Form
        form={form}
        layout="vertical"
        onFinish={handleSubmit}
        autoComplete="off"
      >
        {renderFormFields()}

        <Form.Item>
          <Space style={{ width: '100%', justifyContent: 'flex-end' }}>
            <Button onClick={onCancel}>
              Hủy
            </Button>
            <Button
              type="primary"
              htmlType="submit"
              loading={loading}
            >
              {isEdit ? 'Cập nhật' : 'Thêm mới'}
            </Button>
          </Space>
        </Form.Item>
      </Form>
    </Modal>
  );
};

export default DataForm; 