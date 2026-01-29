import '../styles/shared/App.css';
import StyledComponentsRegistry from '../lib/AntdRegistry';

import ClientLayout from '../components/layout/ClientLayout';

export const metadata = {
    title: 'Chemistry Center HCMUS',
    description: 'Trung tâm Hóa học HCMUS',
};

export default function RootLayout({ children }) {
    return (
        <html lang="vi">
            <head>
                <link rel="preconnect" href="https://fonts.googleapis.com" />
                <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
                <link href="https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700;800&display=swap" rel="stylesheet" />
            </head>
            <body>
                <StyledComponentsRegistry>
                    <ClientLayout>
                        {children}
                    </ClientLayout>
                </StyledComponentsRegistry>
            </body>
        </html>
    );
}
