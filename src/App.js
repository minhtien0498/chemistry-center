import React, { useEffect, useState, Suspense } from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import './styles/shared/App.css';
import AppHeader from './components/website/Header';
import Banner from './components/website/Banner';
import HighlightSection from './components/website/HighlightSection';
import AboutSection from './components/website/AboutSection';
import TeamSection from './components/website/TeamSection';
import ResearchSection from './components/website/ResearchSection';
import CoursesSection from './components/website/CoursesSection';
import MaterialsSection from './components/website/MaterialsSection';
import NewsCarousel from './components/website/NewsCarousel';
import ContactSection from './components/website/ContactSection';
import PublicationsSection from './components/website/PublicationsSection';
import AppFooter from './components/website/Footer';
import Login from './components/admin/Login';
import AdminDashboard from './components/admin/AdminDashboard';
import { Layout, Spin } from 'antd';
import { fetchSheetData } from './services/sheetApi';
import { SHEET_NAMES } from './config';

const { Content } = Layout;

// Main website component
const MainWebsite = () => {
  const [courses, setCourses] = useState([]);
  const [publications, setPublications] = useState([]);
  const [resources, setResources] = useState([]);
  const [research, setResearch] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function loadData() {
      setLoading(true);
      try {
        const [courses, publications, resources, research] = await Promise.all([
          fetchSheetData(SHEET_NAMES.courses),
          fetchSheetData(SHEET_NAMES.publications),
          fetchSheetData(SHEET_NAMES.resources),
          fetchSheetData(SHEET_NAMES.research)
        ]);
        setCourses(courses);
        setPublications(publications);
        setResources(resources);
        setResearch(research);
      } catch (error) {
        console.error('Error loading data:', error);
        // Set empty arrays if data loading fails
        setCourses([]);
        setPublications([]);
        setResources([]);
        setResearch([]);
      } finally {
        setLoading(false);
      }
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
};

// Protected route component
const ProtectedRoute = ({ children }) => {
  const isLoggedIn = localStorage.getItem('adminLoggedIn') === 'true';
  return isLoggedIn ? children : <Navigate to="/login" replace />;
};

// Main App component with routing
export default function App() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  useEffect(() => {
    const loggedIn = localStorage.getItem('adminLoggedIn') === 'true';
    setIsLoggedIn(loggedIn);
  }, []);

  const handleLogin = () => {
    setIsLoggedIn(true);
  };

  const handleLogout = () => {
    setIsLoggedIn(false);
  };

  return (
    <Router>
      <Routes>
        <Route path="/" element={<MainWebsite />} />
        <Route 
          path="/login" 
          element={
            isLoggedIn ? 
            <Navigate to="/admin" replace /> : 
            <Login onLogin={handleLogin} />
          } 
        />
        <Route 
          path="/admin" 
          element={
            <ProtectedRoute>
              <AdminDashboard onLogout={handleLogout} />
            </ProtectedRoute>
          } 
        />
        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>
    </Router>
  );
} 