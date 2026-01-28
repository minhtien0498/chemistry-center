import React from 'react';
import { Layout } from 'antd';
import AppHeader from './Header';
import AppFooter from './Footer';
import ContactSection from './ContactSection';

const { Content } = Layout;

const ContactPage = () => {
    return (
        <Layout>
            <AppHeader />
            <Content style={{ background: '#f5f7fa', minHeight: '100vh', paddingTop: '80px' }}>
                <main className="main-container">
                    <ContactSection />
                </main>
            </Content>
            <AppFooter />
        </Layout>
    );
};

export default ContactPage;
