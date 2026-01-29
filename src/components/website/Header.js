'use client';

import React, { useState } from 'react';
import { Layout, Menu, Typography, Avatar, Space, Drawer, Button, Grid } from 'antd';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
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
  { key: '/', icon: <HomeOutlined />, label: <Link href="/">Home</Link> },
  { key: '/about', icon: <AppstoreOutlined />, label: <Link href="/about">About</Link> },
  { key: '/team', icon: <TeamOutlined />, label: <Link href="/team">Team</Link> },
  { key: '/research', icon: <ExperimentOutlined />, label: <Link href="/research">Research</Link> },
  { key: '/publications', icon: <BookOutlined />, label: <Link href="/publications">Publications</Link> },
  { key: '/courses', icon: <ReadOutlined />, label: <Link href="/courses">Courses</Link> },
  { key: '/contact', icon: <MailOutlined />, label: <Link href="/contact">Contact</Link> }
];

export default function AppHeader() {
  const [drawerOpen, setDrawerOpen] = useState(false);
  const screens = useBreakpoint();
  const isMobile = !screens.md;
  const pathname = usePathname();

  return (
    <Header style={{ background: '#fff', boxShadow: '0 2px 8px #f0f1f2', zIndex: 10, position: 'relative', padding: isMobile ? '0 12px' : undefined }}>
      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
        <Link href="/">
          <Space>
            <Avatar shape="square" size={48} src="/logo.png" />
            <Title level={3} style={{ margin: 0, color: '#1677ff' }}>Chemistry Center</Title>
          </Space>
        </Link>
        {isMobile ? (
          <Button type="text" icon={<MenuOutlined style={{ fontSize: 28 }} />} onClick={() => setDrawerOpen(true)} />
        ) : (
          <Menu mode="horizontal" selectedKeys={[pathname]} items={menuItems} style={{ border: 'none', minWidth: 400 }} />
        )}
      </div>
      <Drawer
        title={<span style={{ color: '#1677ff', fontWeight: 700 }}>Menu</span>}
        placement="right"
        onClose={() => setDrawerOpen(false)}
        open={drawerOpen}
        styles={{ body: { padding: 0 }, wrapper: { width: 240 } }}
      >
        <Menu mode="vertical" items={menuItems} onClick={() => setDrawerOpen(false)} style={{ border: 'none' }} />
      </Drawer>
    </Header>
  );
}
