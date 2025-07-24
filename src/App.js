import React, { useEffect, useState } from 'react';
import './App.css';
import AppHeader from './components/Header';
import Banner from './components/Banner';
import HighlightSection from './components/HighlightSection';
import AboutSection from './components/AboutSection';
import TeamSection from './components/TeamSection';
import ResearchSection from './components/ResearchSection';
import CoursesSection from './components/CoursesSection';
import MaterialsSection from './components/MaterialsSection';
import NewsCarousel from './components/NewsCarousel';
import ContactSection from './components/ContactSection';
import PublicationsSection from './components/PublicationsSection';
import AppFooter from './components/Footer';
import { Layout, Spin } from 'antd';
import { fetchSheetGviz } from './services/sheetApi';

const { Content } = Layout;

export default function App() {
  const [courses, setCourses] = useState([]);
  const [publications, setPublications] = useState([]);
  const [resources, setResources] = useState([]);
  const [research, setResearch] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function loadData() {
      setLoading(true);
      const [courses, publications, resources, research] = await Promise.all([
        fetchSheetGviz('Courses'),
        fetchSheetGviz('Publications'),
        fetchSheetGviz('Resources'),
        fetchSheetGviz('Research')
      ]);
      setCourses(courses);
      setPublications(publications);
      setResources(resources);
      setResearch(research);
      setLoading(false);
    }
    loadData();
  }, []);

  const aboutData = {
    mission: 'Đào tạo nguồn nhân lực chất lượng cao, thực hiện các nghiên cứu đột phá và ứng dụng công nghệ hiện đại trong lĩnh vực hóa học và khoa học môi trường.',
    vision: 'Trở thành trung tâm nghiên cứu và đào tạo hàng đầu khu vực, góp phần phát triển bền vững và bảo vệ môi trường.',
    intro: 'Trung tâm Hóa học HCMUS là đơn vị nghiên cứu và đào tạo hàng đầu trong lĩnh vực hóa học và khoa học môi trường. Với đội ngũ chuyên gia giàu kinh nghiệm và cơ sở vật chất hiện đại, chúng tôi cam kết đào tạo nguồn nhân lực chất lượng cao và thực hiện các nghiên cứu đột phá.'
  };

  if (loading) {
    return <div style={{textAlign:'center',marginTop:100}}><Spin size="large" tip="Đang tải dữ liệu..." /></div>;
  }

  return (
    <Layout>
      <AppHeader />
      <Content style={{ padding: '0 32px', background: '#f5f7fa' }}>
        <div style={{ maxWidth: 1200, margin: '0 auto', padding: '32px 0' }}>
          <Banner />
          <HighlightSection />
          <AboutSection aboutData={aboutData} />
          <TeamSection />
          <ResearchSection />
          <CoursesSection />
          <PublicationsSection />
          {/* <MaterialsSection /> */}
          {/* <NewsCarousel /> */}
          <ContactSection />
        </div>
      </Content>
      <AppFooter />
    </Layout>
  );
} 