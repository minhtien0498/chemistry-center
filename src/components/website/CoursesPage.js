import React from 'react';
import { Layout } from 'antd';
import AppHeader from './Header';
import AppFooter from './Footer';
import CoursesSection from './CoursesSection';

const { Content } = Layout;

const CoursesPage = () => {
    return (
        <Layout>
            <AppHeader />
            <Content style={{ background: '#f5f7fa', minHeight: '100vh', paddingTop: '80px' }}>
                <main className="main-container">
                    <CoursesSection />
                </main>
            </Content>
            <AppFooter />
        </Layout>
    );
};

export default CoursesPage;
