'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { Home, Building, GraduationCap, LogOut } from 'lucide-react'; 
import { Button } from '@/components/registry/new-york-v4/ui/button';
import { cn } from "@/lib/utils";
// import { useDispatch } from 'react-redux';
// import { logout } from '@/lib/features/auth/authSlice';
import { useRouter } from 'next/navigation';

const AdminSidebar = () => {
    const pathname = usePathname();
    // const dispatch = useDispatch();
    const router = useRouter();

    const handleLogout = () => {
        // dispatch(logout());
        // // Optionally call an API endpoint to invalidate the token server-side
        router.push('/login');
    };

    const links = [
        { href: '/admin', label: 'Дашборд', icon: Home },
        { href: '/admin/universities', label: 'ВУЗы', icon: Building },
        { href: '/admin/programs', label: 'Программы', icon: GraduationCap },
        // Add other links (e.g., Specialty Codes, Users) here
    ];

    return (
        <aside className="w-64 bg-white dark:bg-gray-800 shadow-md flex flex-col">
            <div className="p-4 border-b dark:border-gray-700">
                <h2 className="text-xl font-semibold text-gray-800 dark:text-white">Админ Панель</h2>
                <p className="text-sm text-gray-500 dark:text-gray-400">НИАРС</p>
            </div>
            <nav className="flex-1 p-4 space-y-2">
                {links.map((link) => (
                    <Link key={link.href} href={link.href} legacyBehavior>
                        <a
                            className={cn(
                                "flex items-center px-3 py-2 rounded-md text-sm font-medium transition-colors",
                                pathname === link.href || (link.href !== '/admin' && pathname.startsWith(link.href))
                                    ? "bg-primary text-primary-foreground" // Active link style
                                    : "text-gray-700 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-gray-700" // Inactive link style
                            )}
                        >
                            <link.icon className="mr-3 h-5 w-5" />
                            {link.label}
                        </a>
                    </Link>
                ))}
            </nav>
            <div className="p-4 border-t dark:border-gray-700">
                 <Button variant="outline" className="w-full justify-start" onClick={handleLogout}>
                    <LogOut className="mr-3 h-5 w-5" />
                    Выйти
                </Button>
            </div>
        </aside>
    );
};

export default AdminSidebar;