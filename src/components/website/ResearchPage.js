import React from 'react';
import { Layout } from 'antd';
import AppHeader from './Header';
import AppFooter from './Footer';
import ResearchSection from './ResearchSection';

const { Content } = Layout;

const ResearchPage = () => {
    return (
        <Layout>
            <AppHeader />
            <Content style={{ background: '#f5f7fa', minHeight: '100vh', paddingTop: '80px' }}>
                <main className="main-container">
                    <ResearchSection />
                </main>
            </Content>
            <AppFooter />
        </Layout>
    );
};

export default ResearchPage;
