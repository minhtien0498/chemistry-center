'use client';

import { useEffect } from 'react';
import { useRouter } from 'next/navigation';
import Login from '../../components/admin/Login';

export default function LoginPage() {
    const router = useRouter();

    useEffect(() => {
        // Redirect to admin if already logged in
        const loggedIn = localStorage.getItem('adminLoggedIn') === 'true';
        if (loggedIn) {
            router.replace('/admin');
        }
    }, [router]);

    const handleLogin = () => {
        router.push('/admin');
    };

    return <Login onLogin={handleLogin} />;
}
