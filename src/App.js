import React, { useEffect, useState, Suspense } from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import './styles/shared/App.css';
import AppHeader from './components/website/Header';
import Banner from './components/website/Banner';
import HighlightSection from './components/website/HighlightSection';
import TeamSection from './components/website/TeamSection';
import TeamPage from './components/website/TeamPage';
import ResearchSection from './components/website/ResearchSection';
import ResearchPage from './components/website/ResearchPage';
import CoursesSection from './components/website/CoursesSection';
import CoursesPage from './components/website/CoursesPage';
import MaterialsSection from './components/website/MaterialsSection';
import NewsCarousel from './components/website/NewsCarousel';
import ContactSection from './components/website/ContactSection';
import ContactPage from './components/website/ContactPage';
import PublicationsSection from './components/website/PublicationsSection';
import PublicationsPage from './components/website/PublicationsPage';
import AboutSection from './components/website/AboutSection';
import AboutPage from './components/website/AboutPage';
import AppFooter from './components/website/Footer';
import Login from './components/admin/Login';
import AdminDashboard from './components/admin/AdminDashboard';
import { Layout, Spin } from 'antd';

const { Content } = Layout;

// Main website component
const MainWebsite = () => {
  const aboutData = {
    mission: 'Đào tạo nguồn nhân lực chất lượng cao, thực hiện các nghiên cứu đột phá và ứng dụng công nghệ hiện đại trong lĩnh vực hóa học và khoa học môi trường.',
    vision: 'Trở thành trung tâm nghiên cứu và đào tạo hàng đầu khu vực, góp phần phát triển bền vững và bảo vệ môi trường.',
    intro: 'Trung tâm Hóa học HCMUS là đơn vị nghiên cứu và đào tạo hàng đầu trong lĩnh vực hóa học và khoa học môi trường. Với đội ngũ chuyên gia giàu kinh nghiệm và cơ sở vật chất hiện đại, chúng tôi cam kết đào tạo nguồn nhân lực chất lượng cao và thực hiện các nghiên cứu đột phá.'
  };

  return (
    <Layout>
      <AppHeader />
      <Content style={{ background: '#f5f7fa' }}>
        <main className="main-container">
          <Suspense fallback={<div style={{ textAlign: 'center', marginTop: 100 }}><Spin size="large" tip="Đang tải thành phần..." /></div>}>
            <section className="main-section">
              <Banner />
            </section>
            <section className="main-section">
              <HighlightSection />
            </section>
            <section className="main-section">
              <AboutSection aboutData={aboutData} />
            </section>
            <section className="main-section">
              <TeamSection limit={3} />
            </section>
            <section className="main-section">
              <ResearchSection limit={3} />
            </section>
            <section className="main-section">
              <CoursesSection limit={3} />
            </section>
            <section className="main-section">
              <PublicationsSection />
            </section>
            <section className="main-section">
              <ContactSection />
            </section>
          </Suspense>
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
        <Route path="/about" element={<AboutPage />} />
        <Route path="/team" element={<TeamPage />} />
        <Route path="/research" element={<ResearchPage />} />
        <Route path="/courses" element={<CoursesPage />} />
        <Route path="/publications" element={<PublicationsPage />} />
        <Route path="/contact" element={<ContactPage />} />
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