import React from 'react';
import { Layout, Menu, Typography, Avatar, Space } from 'antd';
import {
  HomeOutlined,
  TeamOutlined,
  BookOutlined,
  ReadOutlined,
  ExperimentOutlined,
  AppstoreOutlined,
  MailOutlined
} from '@ant-design/icons';

const { Header } = Layout;
const { Title } = Typography;

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
  return (
    <Header style={{ background: '#fff', boxShadow: '0 2px 8px #f0f1f2', zIndex: 10 }}>
      <Space>
        <Avatar shape="square" size={48} src="/logo.png" />
        <Title level={3} style={{ margin: 0, color: '#1677ff' }}>Chemistry Center</Title>
      </Space>
      <Menu mode="horizontal" items={menuItems} style={{ border: 'none', minWidth: 400, float: 'right' }} />
    </Header>
  );
} 