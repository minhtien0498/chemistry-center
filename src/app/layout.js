import '../styles/shared/App.css';
import StyledComponentsRegistry from '../lib/AntdRegistry';
import AppHeader from '../components/website/Header';
import AppFooter from '../components/website/Footer';

export const metadata = {
    title: 'Chemistry Center HCMUS',
    description: 'Trung tâm Hóa học HCMUS',
};

export default function RootLayout({ children }) {
    return (
        <html lang="vi">
            <body>
                <StyledComponentsRegistry>
                    <div className="app-layout" style={{ minHeight: '100vh', display: 'flex', flexDirection: 'column' }}>
                        <AppHeader />
                        <div style={{ background: '#f5f7fa', flex: 1 }}>
                            <main className="main-container">
                                {children}
                            </main>
                        </div>
                        <AppFooter />
                    </div>
                </StyledComponentsRegistry>
            </body>
        </html>
    );
}
