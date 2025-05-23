'use client';

import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/registry/new-york-v4/ui/card";
import { Separator } from "@/components/registry/new-york-v4/ui/separator";
import { Skeleton } from "@/components/registry/new-york-v4/ui/skeleton";
import { AlertCircle, Building, GraduationCap } from 'lucide-react';
// import { useSelector } from 'react-redux';
// import { selectCurrentUser } from '@/store/api/authSlice'; // To get admin name

// --- Import Mock Data ---
import { mockVuzs, mockPrograms } from '@/store/mockData'; // Adjust path
import { Vuz, Program } from '@/store/api/apiSlice'; // Import types


// --- Helper Function to format dates ---
const formatDate = (dateString: string | undefined | null): string => {
    if (!dateString) return 'N/A';
    try {
        return new Date(dateString).toLocaleDateString('ru-RU', {
            day: '2-digit',
            month: 'short',
            year: 'numeric',
            // hour: '2-digit', // Optional: add time
            // minute: '2-digit',
        });
    } catch (e) {
        return 'Invalid Date';
    }
};

// --- Define the structure for activity items ---
interface ActivityItem {
    id: string;
    name: string;
    type: 'VUZ' | 'PROGRAM';
    timestamp: string; // Store the relevant timestamp (createdAt or updatedAt)
    action: 'ADDED' | 'UPDATED';
    parentId?: string; // For programs, store VUZ id
}

export default function AdminDashboardPage() {
    // --- Get Admin User Info (Optional) ---
    // const currentUser = useSelector(selectCurrentUser);
    // const adminName = currentUser?.email || 'Администратор'; // Use email or a default

    // --- Simulate Data Fetching (Replace with RTK Query later) ---
    // In a real app, you'd use useGetVuzsQuery() and useGetProgramsQuery()
    const allVuzs: Vuz[] = mockVuzs;
    const allPrograms: Program[] = mockPrograms;
    const isLoading = false; // Set to true while RTK Query hooks are loading
    const isError = false; // Set to true if RTK Query hooks have errors

    // --- Process Data for Dashboard ---
    const recentlyAdded: ActivityItem[] = [];
    const recentChanges: ActivityItem[] = [];
    const MAX_ITEMS = 5; // Max items to show in each list

    if (!isLoading && !isError) {
        // Combine and sort by creation date for "Recently Added"
        const combinedAdded = [
            ...allVuzs.map(v => ({ ...v, type: 'VUZ' as const })),
            ...allPrograms.map(p => ({ ...p, type: 'PROGRAM' as const })),
        ]
        .sort((a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime())
        .slice(0, MAX_ITEMS);

        combinedAdded.forEach(item => {
            recentlyAdded.push({
                id: item.id,
                name: item.name_ru,
                type: item.type,
                timestamp: item.createdAt,
                action: 'ADDED',
                parentId: item.type === 'PROGRAM' ? item.vuzId : undefined,
            });
        });

        // Combine and sort by update date for "Recent Changes"
        // Only include items where updatedAt is different from createdAt (or significantly later)
        const combinedUpdated = [
            ...allVuzs.map(v => ({ ...v, type: 'VUZ' as const })),
            ...allPrograms.map(p => ({ ...p, type: 'PROGRAM' as const })),
        ]
        .filter(item => new Date(item.updatedAt).getTime() > new Date(item.createdAt).getTime() + 10000) // Check if updated *after* creation (add buffer)
        .sort((a, b) => new Date(b.updatedAt).getTime() - new Date(a.updatedAt).getTime())
        .slice(0, MAX_ITEMS);

         combinedUpdated.forEach(item => {
            recentChanges.push({
                id: item.id,
                name: item.name_ru,
                type: item.type,
                timestamp: item.updatedAt,
                action: 'UPDATED',
                parentId: item.type === 'PROGRAM' ? item.vuzId : undefined,
            });
        });
    }

    // --- Get VUZ names for program entries (Helper) ---
    const getVuzName = (vuzId: string | undefined): string | undefined => {
        if (!vuzId) return undefined;
        return allVuzs.find(v => v.id === vuzId)?.name_ru;
    }

    // --- Render Loading State ---
    if (isLoading) {
        return (
            <div className="space-y-6">
                <Skeleton className="h-8 w-1/3" />
                <Skeleton className="h-4 w-1/2" />
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <Card>
                        <CardHeader><Skeleton className="h-6 w-1/2" /></CardHeader>
                        <CardContent className="space-y-4">
                            {[...Array(3)].map((_, i) => <Skeleton key={i} className="h-10 w-full" />)}
                        </CardContent>
                    </Card>
                    <Card>
                        <CardHeader><Skeleton className="h-6 w-1/2" /></CardHeader>
                        <CardContent className="space-y-4">
                             {[...Array(3)].map((_, i) => <Skeleton key={i} className="h-10 w-full" />)}
                        </CardContent>
                    </Card>
                </div>
            </div>
        );
    }

    // --- Render Error State ---
     if (isError) {
        return (
            <Card className="border-destructive">
                 <CardHeader>
                     <CardTitle className="text-destructive flex items-center">
                         <AlertCircle className="mr-2 h-5 w-5" /> Ошибка загрузки данных
                     </CardTitle>
                 </CardHeader>
                 <CardContent>
                     Не удалось загрузить данные для панели администратора. Пожалуйста, попробуйте обновить страницу или проверьте соединение с сервером.
                 </CardContent>
            </Card>
        );
    }


    // --- Render Dashboard Content ---
    return (
        <div className="space-y-6">
            {/* Welcome Message */}
            <h1 className="text-3xl font-bold">Добро пожаловать, Админ!</h1>
            <p className="text-muted-foreground">
                Обзор последней активности в реестре ВУЗов и программ.
            </p>

            {/* Activity Columns */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">

                {/* Column 1: Recent Changes */}
                <Card>
                    <CardHeader>
                        <CardTitle>Недавние изменения</CardTitle>
                    </CardHeader>
                    <CardContent>
                        {recentChanges.length > 0 ? (
                            <ul className="space-y-4">
                                {recentChanges.map((item, index) => (
                                    <React.Fragment key={item.id}>
                                        <li className="flex items-start space-x-3">
                                             <div className="flex-shrink-0 pt-1">
                                                {item.type === 'VUZ' ? <Building className="h-5 w-5 text-blue-500" /> : <GraduationCap className="h-5 w-5 text-green-500" />}
                                             </div>
                                            <div className="flex-1">
                                                <p className="text-sm font-medium leading-tight">{item.name}</p>
                                                {item.type === 'PROGRAM' && item.parentId && (
                                                     <p className="text-xs text-muted-foreground">
                                                        ({getVuzName(item.parentId) || 'Неизвестный ВУЗ'})
                                                     </p>
                                                )}
                                                <p className="text-xs text-muted-foreground">
                                                    Изменено: {formatDate(item.timestamp)}
                                                </p>
                                            </div>
                                        </li>
                                        {index < recentChanges.length - 1 && <Separator />}
                                    </React.Fragment>
                                ))}
                            </ul>
                        ) : (
                            <p className="text-sm text-muted-foreground">Нет недавних изменений.</p>
                        )}
                    </CardContent>
                </Card>

                {/* Column 2: Recently Added */}
                <Card>
                    <CardHeader>
                        <CardTitle>Недавно добавленные</CardTitle>
                    </CardHeader>
                    <CardContent>
                        {recentlyAdded.length > 0 ? (
                             <ul className="space-y-4">
                                {recentlyAdded.map((item, index) => (
                                    <React.Fragment key={item.id}>
                                        <li className="flex items-start space-x-3">
                                             <div className="flex-shrink-0 pt-1">
                                                {item.type === 'VUZ' ? <Building className="h-5 w-5 text-blue-500" /> : <GraduationCap className="h-5 w-5 text-green-500" />}
                                             </div>
                                            <div className="flex-1">
                                                <p className="text-sm font-medium leading-tight">{item.name}</p>
                                                 {item.type === 'PROGRAM' && item.parentId && (
                                                     <p className="text-xs text-muted-foreground">
                                                        ({getVuzName(item.parentId) || 'Неизвестный ВУЗ'})
                                                     </p>
                                                )}
                                                <p className="text-xs text-muted-foreground">
                                                    Добавлено: {formatDate(item.timestamp)}
                                                </p>
                                            </div>
                                        </li>
                                        {index < recentlyAdded.length - 1 && <Separator />}
                                    </React.Fragment>
                                ))}
                            </ul>
                        ) : (
                             <p className="text-sm text-muted-foreground">Нет недавно добавленных элементов.</p>
                        )}
                    </CardContent>
                </Card>

            </div>
        </div>
    );
}