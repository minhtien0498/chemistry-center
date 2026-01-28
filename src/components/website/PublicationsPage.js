import React from 'react';
import { Layout } from 'antd';
import AppHeader from './Header';
import AppFooter from './Footer';
import PublicationsSection from './PublicationsSection';

const { Content } = Layout;

const PublicationsPage = () => {
    return (
        <Layout>
            <AppHeader />
            <Content style={{ background: '#f5f7fa', minHeight: '100vh', paddingTop: '80px' }}>
                <main className="main-container">
                    <PublicationsSection />
                </main>
            </Content>
            <AppFooter />
        </Layout>
    );
};

export default PublicationsPage;
