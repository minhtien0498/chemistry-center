import React from 'react';
import { Layout } from 'antd';
import AppHeader from './Header';
import AppFooter from './Footer';
import TeamSection from './TeamSection';

const { Content } = Layout;

const TeamPage = () => {
    return (
        <Layout>
            <AppHeader />
            <Content style={{ background: '#f5f7fa', minHeight: '100vh', paddingTop: '80px' }}>
                <main className="main-container">
                    <TeamSection />
                </main>
            </Content>
            <AppFooter />
        </Layout>
    );
};

export default TeamPage;
