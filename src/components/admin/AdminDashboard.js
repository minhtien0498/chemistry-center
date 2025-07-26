import React, { useState, useEffect } from 'react';
import { Layout, Menu, Button, Table, Card, Space, message, Spin, Typography, Popconfirm } from 'antd';
import { 
  DatabaseOutlined, 
  ReloadOutlined, 
  LogoutOutlined,
  BookOutlined,
  TeamOutlined,
  ExperimentOutlined,
  FileTextOutlined,
  ToolOutlined,
  PlusOutlined,
  EditOutlined,
  DeleteOutlined
} from '@ant-design/icons';
import { getAllSheetData, addRowToSheet, updateRowInSheet, deleteRowFromSheet } from '../../services/sheetApi';
import { SHEET_NAMES, TABLE_CONFIG } from '../../config';
import DataForm from './DataForm';
import ApiKeyWarning from './ApiKeyWarning';
import '../../styles/admin/AdminDashboard.css';

const { Header, Sider, Content } = Layout;
const { Title, Text } = Typography;

const AdminDashboard = ({ onLogout }) => {
  const [selectedKey, setSelectedKey] = useState('courses');
  const [data, setData] = useState({});
  const [loading, setLoading] = useState(false);
  const [tableLoading, setTableLoading] = useState(false);
  const [formVisible, setFormVisible] = useState(false);
  const [editingData, setEditingData] = useState(null);
  const [isEditMode, setIsEditMode] = useState(false);
  const [hasApiKey, setHasApiKey] = useState(false);

  const menuItems = [
    {
      key: 'courses',
      icon: <BookOutlined />,
      label: 'Khóa học',
    },
    {
      key: 'publications',
      icon: <FileTextOutlined />,
      label: 'Công trình nghiên cứu',
    },
    {
      key: 'resources',
      icon: <ToolOutlined />,
      label: 'Tài liệu',
    },
    {
      key: 'research',
      icon: <ExperimentOutlined />,
      label: 'Nghiên cứu',
    },
    {
      key: 'researchteam',
      icon: <TeamOutlined />,
      label: 'Đội ngũ nghiên cứu',
    },
  ];

  const getSheetDisplayName = () => {
    return SHEET_NAMES[selectedKey] || selectedKey;
  };

  const loadData = async () => {
    setLoading(true);
    try {
      const sheetData = await getAllSheetData();
      setData(sheetData);
      message.success('Dữ liệu đã được cập nhật thành công!');
    } catch (error) {
      message.error('Lỗi khi tải dữ liệu: ' + error.message);
    } finally {
      setLoading(false);
    }
  };

  const handleRefresh = async () => {
    setTableLoading(true);
    try {
      const sheetData = await getAllSheetData();
      setData(sheetData);
      message.success('Dữ liệu đã được làm mới!');
    } catch (error) {
      message.error('Lỗi khi làm mới dữ liệu: ' + error.message);
    } finally {
      setTableLoading(false);
    }
  };

  const handleLogout = () => {
    localStorage.removeItem('adminLoggedIn');
    localStorage.removeItem('adminEmail');
    onLogout();
  };

  // Thêm mới
  const handleAdd = () => {
    setEditingData(null);
    setIsEditMode(false);
    setFormVisible(true);
  };

  // Sửa
  const handleEdit = (record, index) => {
    setEditingData({ ...record, _index: index });
    setIsEditMode(true);
    setFormVisible(true);
  };

  // Xóa
  const handleDelete = async (record, index) => {
    try {
      // Nếu có id, truyền id, nếu không truyền index
      const rowData = record.id ? { id: record.id } : index;
      await deleteRowFromSheet(getSheetDisplayName(), rowData);
      message.success('Xóa thành công!');
      await loadData(); // Reload data after delete
    } catch (error) {
      message.error('Lỗi khi xóa: ' + error.message);
    }
  };

  // Submit form (thêm/sửa)
  const handleFormSubmit = async (values) => {
    try {
      if (isEditMode) {
        // Nếu có id, truyền id, nếu không truyền index
        const rowData = editingData && editingData.id ? { ...values, id: editingData.id } : values;
        await updateRowInSheet(getSheetDisplayName(), rowData);
      } else {
        await addRowToSheet(getSheetDisplayName(), values);
      }
      setFormVisible(false);
      await loadData(); // Reload data after add/edit
    } catch (error) {
      throw error; // Let DataForm handle the error
    }
  };

  const handleFormCancel = () => {
    setFormVisible(false);
    setEditingData(null);
    setIsEditMode(false);
  };

  useEffect(() => {
    loadData();
    // Check if API key is available
    setHasApiKey(!!process.env.REACT_APP_GOOGLE_SHEETS_API_KEY);
  }, []);

  const getTableColumns = () => {
    const sheetKey = getSheetDisplayName();
    if (!data[sheetKey] || data[sheetKey].length === 0) {
      return [];
    }
    const sample = data[sheetKey][0];
    // Đặt width cho các cột data chính
    const baseColumns = Object.keys(sample).map(key => ({
      title: key.charAt(0).toUpperCase() + key.slice(1),
      dataIndex: key,
      key: key,
      width: key === 'id' ? 80 : 200, // id nhỏ, các cột khác rộng hơn
      render: (text) => text || '-',
      ellipsis: true,
    }));
    // Add action columns
    const actionColumn = {
      title: 'Thao tác',
      key: 'actions',
      width: TABLE_CONFIG.actionColumnWidth,
      fixed: 'right', // Luôn cố định bên phải
      render: (_, record, index) => (
        <Space size="middle">
          <Button
            type="primary"
            icon={<EditOutlined />}
            onClick={() => handleEdit(record, index)}
            size="small"
            //disabled={!hasApiKey}
          >
            Sửa
          </Button>
          <Popconfirm
            title="Bạn có chắc chắn muốn xóa?"
            onConfirm={() => handleDelete(record, index)}
            okText="Có"
            cancelText="Không"
          >
            <Button
              type="primary"
              danger
              icon={<DeleteOutlined />}
              size="small"
              //disabled={!hasApiKey}
            >
              Xóa
            </Button>
          </Popconfirm>
        </Space>
      ),
    };
    return [...baseColumns, actionColumn];
  };

  const getCurrentData = () => {
    return data[getSheetDisplayName()] || [];
  };

  const getDataTitle = () => {
    const titles = {
      courses: 'Danh sách khóa học',
      publications: 'Danh sách công trình nghiên cứu',
      resources: 'Danh sách tài liệu',
      research: 'Danh sách nghiên cứu',
      researchteam: 'Danh sách đội ngũ nghiên cứu',
    };
    return titles[selectedKey] || 'Dữ liệu';
  };

  return (
    <Layout style={{ minHeight: '100vh' }}>
      <Sider width={250} className="admin-sider">
        <div className="admin-logo">
          <DatabaseOutlined style={{ fontSize: '24px', color: '#1890ff' }} />
          <span>Admin Dashboard</span>
        </div>
        <Menu
          mode="inline"
          selectedKeys={[selectedKey]}
          items={menuItems}
          onClick={({ key }) => setSelectedKey(key)}
          className="admin-menu"
        />
      </Sider>
      
      <Layout>
        <Header className="admin-header">
          <div className="header-content">
            <Title level={4} style={{ margin: 0, color: '#fff' }}>
              {getDataTitle()}
            </Title>
            <Space>
              <Button 
                type="primary" 
                icon={<PlusOutlined />}
                onClick={handleAdd}
                disabled={!hasApiKey}
              >
                Thêm mới
              </Button>
              <Button 
                type="primary" 
                icon={<ReloadOutlined />}
                onClick={handleRefresh}
                loading={tableLoading}
              >
                Cập nhật dữ liệu
              </Button>
              <Button 
                icon={<LogoutOutlined />}
                onClick={handleLogout}
                danger
              >
                Đăng xuất
              </Button>
            </Space>
          </div>
        </Header>
        
        <Content className="admin-content">
          {!hasApiKey && <ApiKeyWarning />}
          <Card>
            {loading ? (
              <div style={{ textAlign: 'center', padding: '50px' }}>
                <Spin size="large" tip="Đang tải dữ liệu..." />
              </div>
            ) : (
              <div>
                <div style={{ marginBottom: 16, display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                  <Text strong>Tổng số bản ghi: {getCurrentData().length}</Text>
                  <Button 
                    type="primary" 
                    icon={<PlusOutlined />}
                    onClick={handleAdd}
                    disabled={!hasApiKey}
                  >
                    Thêm mới
                  </Button>
                </div>
                {getCurrentData().length > 0 ? (
                  <Table
                    columns={getTableColumns()}
                    dataSource={getCurrentData().map((item, index) => ({ ...item, key: index }))}
                    pagination={{
                      pageSize: TABLE_CONFIG.pageSize,
                      showSizeChanger: true,
                      showQuickJumper: true,
                      showTotal: (total, range) => 
                        `${range[0]}-${range[1]} của ${total} bản ghi`,
                    }}
                    scroll={{ x: TABLE_CONFIG.scrollX }}
                    loading={tableLoading}
                  />
                ) : (
                  <div style={{ textAlign: 'center', padding: '50px', color: '#999' }}>
                    <DatabaseOutlined style={{ fontSize: '48px', marginBottom: '16px' }} />
                    <p>Không có dữ liệu</p>
                    <Button 
                      type="primary" 
                      icon={<PlusOutlined />}
                      onClick={handleAdd}
                      disabled={!hasApiKey}
                    >
                      Thêm dữ liệu đầu tiên
                    </Button>
                  </div>
                )}
              </div>
            )}
          </Card>
        </Content>
      </Layout>

      <DataForm
        visible={formVisible}
        onCancel={handleFormCancel}
        onSubmit={handleFormSubmit}
        initialData={editingData}
        sheetName={getSheetDisplayName()}
        isEdit={isEditMode}
      />
    </Layout>
  );
};

export default AdminDashboard; 