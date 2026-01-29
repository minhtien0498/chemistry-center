import { fetchTeam, fetchResearch, fetchCourses, fetchPublications } from '../services/sheetApi';
import Banner from '../components/website/Banner';
import HighlightSection from '../components/website/HighlightSection';
import TeamSection from '../components/website/TeamSection';
import ResearchSection from '../components/website/ResearchSection';
import CoursesSection from '../components/website/CoursesSection';
import PublicationsSection from '../components/website/PublicationsSection';
import ContactSection from '../components/website/ContactSection';
import AboutSection from '../components/website/AboutSection';

export const revalidate = 60; // Revalidate data every 60 seconds

export default async function Home() {
    // Fetch data in parallel on the server
    const [teamData, researchData, coursesData, publicationsData] = await Promise.all([
        fetchTeam(4),        // Fetch 4 items to check if > 3 (for "See all" button)
        fetchResearch(4),    // Fetch 4 items to check if > 3 (for "See all" button)
        fetchCourses(4),     // Fetch 4 items to check if > 3 (for "See all" button)
        fetchPublications()  // Fetch all for local filtering/grouping logic (or optimize later)
    ]);

    // Sort and filter publications similar to client-side logic if needed, 
    // but PublicationsSection handles filtering inside useEffect if data is not sorted?
    // Actually PublicationsSection expects raw data and handles sorting. 
    // To match client behavior, we just pass the raw data.
    // However, PublicationsSection filters: pub.isshow !== false.
    // Ideally we filter here to send less data to client.
    const filteredPubs = (publicationsData || [])
        .filter(pub => pub.isshow !== false && pub.isshow !== 'FALSE')
        .sort((a, b) => (b.year || 0) - (a.year || 0));

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
            <div className="main-section section-white">
                <HighlightSection />
            </div>
            <div className="main-section section-gray">
                <AboutSection aboutData={aboutData} />
            </div>
            <div className="main-section section-white">
                <TeamSection limit={3} data={teamData} />
            </div>
            <div className="main-section section-gray">
                <ResearchSection limit={3} data={researchData} />
            </div>
            <div className="main-section section-white">
                <CoursesSection limit={3} data={coursesData} />
            </div>
            <div className="main-section section-gray">
                <PublicationsSection data={filteredPubs} />
            </div>
            <div className="main-section section-white">
                <ContactSection />
            </div>
        </>
    );
}
