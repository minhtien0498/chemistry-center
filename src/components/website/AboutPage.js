import React from 'react';
import { Layout } from 'antd';
import AppHeader from './Header';
import AppFooter from './Footer';
import AboutSection from './AboutSection';

const { Content } = Layout;

const AboutPage = () => {
    const aboutData = {
        mission: 'Đào tạo nguồn nhân lực chất lượng cao, thực hiện các nghiên cứu đột phá và ứng dụng công nghệ hiện đại trong lĩnh vực hóa học và khoa học môi trường.',
        vision: 'Trở thành trung tâm nghiên cứu và đào tạo hàng đầu khu vực, góp phần phát triển bền vững và bảo vệ môi trường.',
        intro: 'Trung tâm Hóa học HCMUS là đơn vị nghiên cứu và đào tạo hàng đầu trong lĩnh vực hóa học và khoa học môi trường. Với đội ngũ chuyên gia giàu kinh nghiệm và cơ sở vật chất hiện đại, chúng tôi cam kết đào tạo nguồn nhân lực chất lượng cao và thực hiện các nghiên cứu đột phá.'
    };

    return (
        <Layout>
            <AppHeader />
            <Content style={{ background: '#f5f7fa', minHeight: '100vh', paddingTop: '80px' }}>
                <main className="main-container">
                    <AboutSection aboutData={aboutData} />
                </main>
            </Content>
            <AppFooter />
        </Layout>
    );
};

export default AboutPage;
