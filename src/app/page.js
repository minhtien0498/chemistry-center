import Banner from '../components/website/Banner';
import HighlightSection from '../components/website/HighlightSection';
import TeamSection from '../components/website/TeamSection';
import ResearchSection from '../components/website/ResearchSection';
import CoursesSection from '../components/website/CoursesSection';
import PublicationsSection from '../components/website/PublicationsSection';
import ContactSection from '../components/website/ContactSection';
import AboutSection from '../components/website/AboutSection';

export default function Home() {
    const aboutData = {
        mission: 'Đào tạo nguồn nhân lực chất lượng cao, thực hiện các nghiên cứu đột phá và ứng dụng công nghệ hiện đại trong lĩnh vực hóa học và khoa học môi trường.',
        vision: 'Trở thành trung tâm nghiên cứu và đào tạo hàng đầu khu vực, góp phần phát triển bền vững và bảo vệ môi trường.',
        intro: 'Trung tâm Hóa học HCMUS là đơn vị nghiên cứu và đào tạo hàng đầu trong lĩnh vực hóa học và khoa học môi trường. Với đội ngũ chuyên gia giàu kinh nghiệm và cơ sở vật chất hiện đại, chúng tôi cam kết đào tạo nguồn nhân lực chất lượng cao và thực hiện các nghiên cứu đột phá.'
    };

    return (
        <>
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
        </>
    );
}
