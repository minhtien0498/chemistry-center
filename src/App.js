import React, { useEffect, useState, Suspense } from 'react';
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
      <Content style={{ background: '#f5f7fa' }}>
        <main className="main-container">
          <Suspense fallback={<div style={{textAlign:'center',marginTop:100}}><Spin size="large" tip="Đang tải thành phần..." /></div>}>
            <section id="banner" className="main-section">
              <Banner />
            </section>
            <section id="highlight" className="main-section">
              <HighlightSection />
            </section>
            <section id="about" className="main-section">
              <AboutSection aboutData={aboutData} />
            </section>
            <section id="team" className="main-section">
              <TeamSection />
            </section>
            <section id="research" className="main-section">
              <ResearchSection />
            </section>
            <section id="courses" className="main-section">
              <CoursesSection />
            </section>
            <section id="publications" className="main-section">
              <PublicationsSection />
            </section>
          </Suspense>
          {/* <section id="materials" className="main-section">
            <MaterialsSection />
          </section> */}
          {/* <section id="news" className="main-section">
            <NewsCarousel />
          </section> */}
          <section id="contact" className="main-section">
            <ContactSection />
          </section>
        </main>
      </Content>
      <AppFooter />
    </Layout>
  );
} 