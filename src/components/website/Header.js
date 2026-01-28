import React, { useState } from 'react';
import { Layout, Menu, Typography, Avatar, Space, Drawer, Button, Grid } from 'antd';
import { Link, useLocation } from 'react-router-dom';
import {
  HomeOutlined,
  TeamOutlined,
  BookOutlined,
  ReadOutlined,
  ExperimentOutlined,
  AppstoreOutlined,
  MailOutlined,
  MenuOutlined
} from '@ant-design/icons';

const { Header } = Layout;
const { Title } = Typography;
const { useBreakpoint } = Grid;

const menuItems = [
  { key: '/', icon: <HomeOutlined />, label: <Link to="/">Home</Link> },
  { key: '/about', icon: <AppstoreOutlined />, label: <Link to="/about">About</Link> },
  { key: '/team', icon: <TeamOutlined />, label: <Link to="/team">Team</Link> },
  { key: '/research', icon: <ExperimentOutlined />, label: <Link to="/research">Research</Link> },
  { key: '/publications', icon: <BookOutlined />, label: <Link to="/publications">Publications</Link> },
  { key: '/courses', icon: <ReadOutlined />, label: <Link to="/courses">Courses</Link> },
  { key: '/contact', icon: <MailOutlined />, label: <Link to="/contact">Contact</Link> }
];

export default function AppHeader() {
  const [drawerOpen, setDrawerOpen] = useState(false);
  const screens = useBreakpoint();
  const isMobile = !screens.md;
  const location = useLocation();

  return (
    <Header style={{ background: '#fff', boxShadow: '0 2px 8px #f0f1f2', zIndex: 10, position: 'relative', padding: isMobile ? '0 12px' : undefined }}>
      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
        <Link to="/">
          <Space>
            <Avatar shape="square" size={48} src="/logo.png" />
            <Title level={3} style={{ margin: 0, color: '#1677ff' }}>Chemistry Center</Title>
          </Space>
        </Link>
        {isMobile ? (
          <Button type="text" icon={<MenuOutlined style={{ fontSize: 28 }} />} onClick={() => setDrawerOpen(true)} />
        ) : (
          <Menu mode="horizontal" selectedKeys={[location.pathname]} items={menuItems} style={{ border: 'none', minWidth: 400 }} />
        )}
      </div>
      <Drawer
        title={<span style={{ color: '#1677ff', fontWeight: 700 }}>Menu</span>}
        placement="right"
        onClose={() => setDrawerOpen(false)}
        open={drawerOpen}
        bodyStyle={{ padding: 0 }}
        width={240}
      >
        <Menu mode="vertical" items={menuItems} onClick={() => setDrawerOpen(false)} style={{ border: 'none' }} />
      </Drawer>
    </Header>
  );
} 