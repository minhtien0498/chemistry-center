'use client';

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { Spin } from 'antd';
import AdminDashboard from '../../components/admin/AdminDashboard';

export default function AdminPage() {
    const router = useRouter();
    const [authorized, setAuthorized] = useState(false);

    useEffect(() => {
        const loggedIn = localStorage.getItem('adminLoggedIn') === 'true';
        if (!loggedIn) {
            router.replace('/login');
        } else {
            setAuthorized(true);
        }
    }, [router]);

    const handleLogout = () => {
        // AdminDashboard handles localStorage cleanup
        router.push('/login');
    };

    if (!authorized) {
        return (
            <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100vh' }}>
                <Spin size="large" tip="Đang kiểm tra quyền truy cập..." />
            </div>
        );
    }

    return <AdminDashboard onLogout={handleLogout} />;
}
