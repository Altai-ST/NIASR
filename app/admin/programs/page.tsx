'use client';

import React from 'react';
import { columns } from './columns';
import { DataTable } from './data-table'; 
import { mockVuzs, mockPrograms } from '@/store/mockData';
// import { useGetVuzsQuery } from '@/store/api/apiSlice'; 
import { Button } from '@/components/registry/new-york-v4/ui/button';
import Link from 'next/link';
import { PlusCircle } from 'lucide-react';
import { Skeleton } from "@/components/registry/new-york-v4/ui/skeleton" 

export default function VuzListPage() {
    const programs = mockPrograms; // Or mockPrograms for the programs list
    const isLoading = false; // Simulate loading finished
    const isError = false;   // Simulate no error
    const error = null;

    if (isLoading) {
        return (
             <div className="container mx-auto py-10">
                 <div className="flex justify-between items-center mb-4">
                     <h1 className="text-3xl font-bold">Управление образовательными программами</h1>
                     <Skeleton className="h-10 w-32" />
                 </div>
                 <Skeleton className="h-[400px] w-full rounded-md" />
             </div>
        )
    }

    if (isError) {
        console.error("Error fetching VUZs:", error);
        return <div className="container mx-auto py-10 text-red-600">Ошибка загрузки данных образовательных программ.</div>;
    }

    return (
        <div className="container mx-auto py-10">
             <div className="flex justify-between items-center mb-6">
                 <h1 className="text-3xl font-bold">Управление образовательными программами</h1>
                 <Link href="/admin/universities/new" passHref legacyBehavior>
                     <Button>
                         <PlusCircle className="mr-2 h-4 w-4" /> Добавить программу
                     </Button>
                 </Link>
             </div>
            <DataTable columns={columns} data={programs || []} />
        </div>
    );
}