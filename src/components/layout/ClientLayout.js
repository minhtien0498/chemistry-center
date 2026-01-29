'use client';

import React from 'react';
import { usePathname } from 'next/navigation';
import AppHeader from '../website/Header';
import AppFooter from '../website/Footer';

export default function ClientLayout({ children }) {
    const pathname = usePathname();
    const isAdmin = pathname.startsWith('/admin') || pathname.startsWith('/login');

    if (isAdmin) {
        return (
            <div className="admin-layout-wrapper" style={{ minHeight: '100vh' }}>
                {children}
            </div>
        );
    }

    return (
        <div className="app-layout" style={{ minHeight: '100vh', display: 'flex', flexDirection: 'column' }}>
            <AppHeader />
            <div style={{ background: '#f5f7fa', flex: 1 }}>
                <main className="main-container">
                    {children}
                </main>
            </div>
            <AppFooter />
        </div>
    );
}
