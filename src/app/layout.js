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
