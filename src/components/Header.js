import React, { useState } from 'react';
import { Layout, Menu, Typography, Avatar, Space, Drawer, Button, Grid } from 'antd';
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
  { key: 'home', icon: <HomeOutlined />, label: <a href="#home">Home</a> },
  { key: 'about', icon: <AppstoreOutlined />, label: <a href="#about">About</a> },
  { key: 'team', icon: <TeamOutlined />, label: <a href="#team">Team</a> },
  { key: 'research', icon: <ExperimentOutlined />, label: <a href="#research">Research</a> },
  { key: 'publications', icon: <BookOutlined />, label: <a href="#publications">Publications</a> },
  { key: 'courses', icon: <ReadOutlined />, label: <a href="#courses">Courses</a> },
  { key: 'contact', icon: <MailOutlined />, label: <a href="#contact">Contact</a> }
];

export default function AppHeader() {
  const [drawerOpen, setDrawerOpen] = useState(false);
  const screens = useBreakpoint();
  const isMobile = !screens.md;

  return (
    <Header style={{ background: '#fff', boxShadow: '0 2px 8px #f0f1f2', zIndex: 10, position: 'relative', padding: isMobile ? '0 12px' : undefined }}>
      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
        <Space>
          <Avatar shape="square" size={48} src="/logo.png" />
          <Title level={3} style={{ margin: 0, color: '#1677ff' }}>Chemistry Center</Title>
        </Space>
        {isMobile ? (
          <Button type="text" icon={<MenuOutlined style={{ fontSize: 28 }} />} onClick={() => setDrawerOpen(true)} />
        ) : (
          <Menu mode="horizontal" items={menuItems} style={{ border: 'none', minWidth: 400 }} />
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