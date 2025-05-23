'use client'; // Required for hooks and client-side logic

import React, { useEffect } from 'react';
// import { useSelector } from 'react-redux';
import { useRouter } from 'next/navigation'; // Use next/navigation for App Router
// import { selectIsAuthenticated, selectIsAdmin } from '@/lib/features/auth/authSlice'; // Adjust path
import AdminSidebar from './components/AdminSidebar'; // We'll create this next

export default function AdminLayout({
    children,
}: {
    children: React.ReactNode;
}) {
    const router = useRouter();
    // const isAuthenticated = useSelector(selectIsAuthenticated);
    // const isAdmin = useSelector(selectIsAdmin);
    const authChecked = React.useRef(false); 

    // useEffect(() => {
    //     if (!authChecked.current && !isAuthenticated && !isAdmin) {
    //         console.log("Redirecting: Not authenticated or not admin");
    //         router.push('/login');
    //     } else if (!authChecked.current && isAuthenticated && !isAdmin) {
    //         console.log("Redirecting: Authenticated but not admin");
    //         router.push('/'); 
    //     }
    //     authChecked.current = true;
    // }, [isAuthenticated, isAdmin, router]);


    // if (!isAuthenticated || !isAdmin) {
    //     return <div>Загрузка или проверка доступа...</div>;
    // }

    return (
        <div className="flex min-h-screen bg-gray-100 dark:bg-gray-900">
            <AdminSidebar />
            <main className="flex-1 p-6 lg:p-8">
                {children}
            </main>
        </div>
    );
}