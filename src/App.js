import React from 'react';
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
import AppFooter from './components/Footer';
import { Layout } from 'antd';
import { Typography } from 'antd';
const { Paragraph } = Typography;

const { Content } = Layout;

const courses = [
  {
    title: 'Hóa học cơ bản',
    desc: 'Khóa học cung cấp kiến thức nền tảng về hóa học, từ cấu trúc nguyên tử đến các phản ứng hóa học cơ bản.',
    weeks: 8,
    students: 1234,
    rating: 4.8
  },
  {
    title: 'Hóa học hữu cơ',
    desc: 'Khám phá thế giới các hợp chất hữu cơ, từ cấu trúc phân tử đến các phản ứng đặc trưng.',
    weeks: 10,
    students: 856,
    rating: 4.9
  },
  {
    title: 'Hóa học vô cơ',
    desc: 'Nghiên cứu về các nguyên tố và hợp chất vô cơ, các phản ứng và ứng dụng trong thực tế.',
    weeks: 12,
    students: 1567,
    rating: 4.7
  }
];

const materials = [
  { icon: 'pdf', title: 'Ebook', desc: 'Tải xuống các giáo trình và tài liệu tham khảo' },
  { icon: 'image', title: 'Slide bài giảng', desc: 'Bài giảng điện tử và tài liệu thuyết trình' },
  { icon: 'video', title: 'Video bài giảng', desc: 'Video bài giảng và hướng dẫn thực hành' }
];

const news = [
  {
    type: 'Phát minh mới',
    title: 'Phát hiện phương pháp mới trong xử lý nước thải',
    desc: 'Nghiên cứu mới về ứng dụng công nghệ nano trong xử lý nước thải công nghiệp...',
    date: '15/03/2024',
    author: 'Admin',
    image: 'https://images.unsplash.com/photo-1506744038136-46273834b3fb?auto=format&fit=crop&w=600&q=80',
    views: 154,
    comments: 12
  },
  {
    type: 'Hội thảo',
    title: 'Hội thảo khoa học về Hóa học xanh',
    desc: 'Thảo luận về các giải pháp hóa học thân thiện với môi trường...',
    date: '20/03/2024',
    author: 'Admin2',
    image: 'https://images.unsplash.com/photo-1465101046530-73398c7f28ca?auto=format&fit=crop&w=600&q=80',
    views: 98,
    comments: 5
  },
  {
    type: 'Hoạt động',
    title: 'Ngày hội STEM cho học sinh THPT',
    desc: 'Trung tâm tổ chức ngày hội STEM với nhiều hoạt động thực nghiệm hóa học hấp dẫn cho học sinh.',
    date: '05/04/2024',
    author: 'HCMUS',
    image: 'https://images.unsplash.com/photo-1519125323398-675f0ddb6308?auto=format&fit=crop&w=600&q=80',
    views: 210,
    comments: 18
  },
  {
    type: 'Giải thưởng',
    title: 'Nhóm nghiên cứu đạt giải thưởng quốc tế',
    desc: 'Nhóm nghiên cứu trẻ của trung tâm vừa đạt giải thưởng quốc tế về vật liệu mới.',
    date: '28/03/2024',
    author: 'Admin',
    image: 'https://images.unsplash.com/photo-1464983953574-0892a716854b?auto=format&fit=crop&w=600&q=80',
    views: 132,
    comments: 7
  },
  {
    type: 'Hợp tác',
    title: 'Ký kết hợp tác với doanh nghiệp hóa chất',
    desc: 'Trung tâm ký kết hợp tác chiến lược với doanh nghiệp lớn trong lĩnh vực hóa chất.',
    date: '10/04/2024',
    author: 'Admin2',
    image: 'https://images.unsplash.com/photo-1503676382389-4809596d5290?auto=format&fit=crop&w=600&q=80',
    views: 77,
    comments: 2
  }
];

const aboutData = {
  mission: 'Đào tạo nguồn nhân lực chất lượng cao, thực hiện các nghiên cứu đột phá và ứng dụng công nghệ hiện đại trong lĩnh vực hóa học và khoa học môi trường.',
  vision: 'Trở thành trung tâm nghiên cứu và đào tạo hàng đầu khu vực, góp phần phát triển bền vững và bảo vệ môi trường.',
  intro: 'Trung tâm Hóa học HCMUS là đơn vị nghiên cứu và đào tạo hàng đầu trong lĩnh vực hóa học và khoa học môi trường. Với đội ngũ chuyên gia giàu kinh nghiệm và cơ sở vật chất hiện đại, chúng tôi cam kết đào tạo nguồn nhân lực chất lượng cao và thực hiện các nghiên cứu đột phá.'
};

const teamData = [
  {
    name: 'PGS. TS. Nguyễn Văn A',
    title: 'Giám đốc Trung tâm',
    avatar: 'https://randomuser.me/api/portraits/men/32.jpg',
    desc: 'Chuyên gia hóa phân tích, hơn 20 năm kinh nghiệm nghiên cứu và giảng dạy.'
  },
  {
    name: 'TS. Trần Thị B',
    title: 'Phó Giám đốc',
    avatar: 'https://randomuser.me/api/portraits/women/44.jpg',
    desc: 'Chuyên gia hóa môi trường, chủ nhiệm nhiều đề tài nghiên cứu ứng dụng.'
  },
  {
    name: 'ThS. Lê Văn C',
    title: 'Trưởng phòng Đào tạo',
    avatar: 'https://randomuser.me/api/portraits/men/65.jpg',
    desc: 'Phụ trách phát triển chương trình đào tạo và hợp tác quốc tế.'
  },
  {
    name: 'ThS. Nguyễn Thị D',
    title: 'Nghiên cứu viên',
    avatar: 'https://randomuser.me/api/portraits/women/68.jpg',
    desc: 'Nghiên cứu viên trẻ, đạt nhiều giải thưởng khoa học sinh viên.'
  }
];

const research = [
  {
    title: 'Nghiên cứu năng lượng',
    desc: 'Phát triển vật liệu mới cho pin mặt trời và lưu trữ năng lượng'
  },
  {
    title: 'Ứng dụng y học',
    desc: 'Nghiên cứu dược phẩm và vật liệu sinh học'
  },
  {
    title: 'Bảo vệ môi trường',
    desc: 'Giải pháp xử lý ô nhiễm và phát triển bền vững'
  }
];

export default function App() {
  return (
    <Layout>
      <AppHeader />
      <Content style={{ padding: '0 32px', background: '#f5f7fa' }}>
        <div style={{ maxWidth: 1200, margin: '0 auto', padding: '32px 0' }}>
          <Banner />
          <HighlightSection />
          <AboutSection aboutData={aboutData} />
          <TeamSection teamData={teamData} />
          <ResearchSection research={research} />
          <CoursesSection courses={courses} />
          <MaterialsSection materials={materials} />
          <NewsCarousel news={news} />
          <ContactSection />
        </div>
      </Content>
      <AppFooter />
    </Layout>
  );
} 