'use client';

import React, { useEffect } from 'react';
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import * as z from "zod";
import { Button } from "@/components/registry/new-york-v4/ui/button";
import {
    Form,
    FormControl,
    FormDescription,
    FormField,
    FormItem,
    FormLabel,
    FormMessage,
} from "@/components/registry/new-york-v4/ui/form";
import { Input } from "@/components/registry/new-york-v4/ui/input";
// import {
//     useGetVuzByIdQuery,
//     useUpdateVuzMutation,
//     Vuz // Import Vuz interface
// } from '@/store/api/apiSlice'; // Adjust path
import { mockVuzs } from '@/store/mockData';
import { useParams, useRouter } from 'next/navigation'; // Use hooks from next/navigation
// import { useToast } from "@/components/ui/use-toast";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/registry/new-york-v4/ui/card";
import Link from 'next/link';
import { ArrowLeft, Loader2 } from 'lucide-react';
import { Skeleton } from "@/components/registry/new-york-v4/ui/skeleton";

// Re-use or import the Zod schema (ensure it matches the Vuz interface)
const vuzFormSchema = z.object({
    name_ru: z.string().min(2, { message: "Название (RU) обязательно (мин. 2 символа)." }),
    name_kg: z.string().min(2, { message: "Название (KG) обязательно (мин. 2 символа)." }),
    location: z.string().min(5, { message: "Местонахождение обязательно." }),
    reg_certificate: z.string().optional(),
    tin: z.string().min(10, { message: "ИНН обязателен (мин. 10 символов)." }).max(14), // Adjust length as needed
    accreditation_decision_date: z.string().optional(), // Consider date picker / validation
    accreditation_certificate_details: z.string().optional(),
    accreditation_expiry_date: z.string().optional(), // Consider date picker / validation
    // Add other fields from Vuz interface matching the form
});

type VuzFormData = z.infer<typeof vuzFormSchema>;

// Helper to format date string for input type="date" (YYYY-MM-DD)
const formatDateForInput = (dateString: string | undefined | null): string => {
  if (!dateString) return '';
  try {
    const date = new Date(dateString);
    // Check if date is valid before formatting
    if (isNaN(date.getTime())) {
      return ''; // Return empty if date is invalid
    }
    return date.toISOString().split('T')[0]; // Format as YYYY-MM-DD
  } catch (e) {
    console.error("Error formatting date:", dateString, e);
    return ''; // Return empty on error
  }
};


export default function EditVuzPage() {
    const router = useRouter();
    const params = useParams(); // Get route parameters
    const vuzId = params.id as string; // Extract VUZ ID
    // const { toast } = useToast();

    // Fetch existing VUZ data
    // const { data: vuzData, isLoading: isLoadingData, isError, error: fetchError } = useGetVuzByIdQuery(vuzId, {
    //     skip: !vuzId, // Skip query if ID is not yet available
    // });

    // // Mutation hook for updating
    // const [updateVuz, { isLoading: isUpdating }] = useUpdateVuzMutation();
    const vuzData = mockVuzs.find(vuz => vuz.id === vuzId);
    const isLoadingData = false; // Simulate loading finished
    const isError = !vuzData; // Simulate error if not found
    const fetchError = isError ? { status: 404, data: 'Not Found' } : null;

    const form = useForm<VuzFormData>({
        resolver: zodResolver(vuzFormSchema),
        defaultValues: { // Initialize with empty strings or defaults
            name_ru: "",
            name_kg: "",
            location: "",
            tin: "",
            reg_certificate: "",
            accreditation_decision_date: "",
            accreditation_certificate_details: "",
            accreditation_expiry_date: "",
            // ... other fields
        },
    });

    // Pre-populate the form once data is loaded
    useEffect(() => {
        if (vuzData) {
            form.reset({
                name_ru: vuzData.name_ru || "",
                name_kg: vuzData.name_kg || "",
                location: vuzData.location || "",
                tin: vuzData.tin || "",
                reg_certificate: vuzData.reg_certificate || "",
                accreditation_decision_date: formatDateForInput(vuzData.accreditation_decision_date),
                accreditation_certificate_details: vuzData.accreditation_certificate_details || "",
                accreditation_expiry_date: formatDateForInput(vuzData.accreditation_expiry_date),
                // Reset other fields based on vuzData
            });
        }
    }, [vuzData, form]);

    async function onSubmit(values: VuzFormData) {
        console.log("Updating VUZ data:", values);
        if (!vuzId) return; // Should not happen if data loaded

        try {
            // Ensure the data includes the ID for the update mutation
            // const updateData: Vuz = {
            //     id: vuzId,
            //      ...values,
            //     // Potentially format dates or other fields back if needed by API
            //     //  accreditation_decision_date: values.accreditation_decision_date || null, // Send null if empty
            //     //  accreditation_expiry_date: values.accreditation_expiry_date || null, // Send null if empty
            // };

            // await updateVuz(updateData).unwrap();
            // toast({
            //     title: "Успех!",
            //     description: `Данные ВУЗа "${values.name_ru}" успешно обновлены.`,
            // });
            router.push('/admin/vuzs'); // Redirect back to the list
        } catch (err) {
            console.error("Failed to update VUZ:", err);
            // toast({
            //     title: "Ошибка!",
            //     description: "Не удалось обновить данные ВУЗа. Проверьте введенные значения.",
            //     variant: "destructive",
            // });
        }
    }

     // --- Loading State ---
    if (isLoadingData) {
        return (
            <div className="container mx-auto py-10 max-w-3xl">
                 <Skeleton className="h-8 w-32 mb-4" />
                 <Card>
                     <CardHeader>
                         <Skeleton className="h-6 w-1/2 mb-2" />
                         <Skeleton className="h-4 w-3/4" />
                     </CardHeader>
                     <CardContent className="space-y-6">
                         <Skeleton className="h-10 w-full" />
                         <Skeleton className="h-10 w-full" />
                         <Skeleton className="h-10 w-full" />
                         <Skeleton className="h-10 w-full" />
                         <Skeleton className="h-10 w-1/4" />
                     </CardContent>
                 </Card>
            </div>
        );
    }

    // --- Error State ---
    if (isError || !vuzData) {
         console.error("Error fetching VUZ data:", fetchError);
        return (
             <div className="container mx-auto py-10 max-w-3xl">
                 <Button variant="outline" size="sm" asChild className='mb-4'>
                    <Link href="/admin/vuzs"><ArrowLeft className='mr-2 h-4 w-4'/> Назад к списку</Link>
                 </Button>
                <Card className="border-destructive">
                    <CardHeader>
                        <CardTitle className="text-destructive">Ошибка загрузки</CardTitle>
                        <CardDescription>
                             Не удалось загрузить данные для ВУЗа с ID: {vuzId}. Возможно, ВУЗ не найден или произошла ошибка сети.
                         </CardDescription>
                    </CardHeader>
                 </Card>
             </div>
        );
    }

    // --- Render Form ---
    return (
         <div className="container mx-auto py-10 max-w-3xl">
              <Button variant="outline" size="sm" asChild className='mb-4'>
                <Link href="/admin/vuzs"><ArrowLeft className='mr-2 h-4 w-4'/> Назад к списку</Link>
             </Button>
            <Card>
                <CardHeader>
                    <CardTitle>Редактировать ВУЗ</CardTitle>
                    <CardDescription>Изменение данных для: {vuzData?.name_ru}</CardDescription>
                </CardHeader>
                <CardContent>
                    <Form {...form}>
                        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
                            {/* === Reuse the same FormFields as in the AddVuzPage === */}
                            <FormField
                                control={form.control}
                                name="name_ru"
                                render={({ field }) => (
                                    <FormItem>
                                        <FormLabel>Название (RU) *</FormLabel>
                                        <FormControl>
                                            <Input placeholder="Кыргызский Национальный Университет..." {...field} />
                                        </FormControl>
                                        <FormMessage />
                                    </FormItem>
                                )}
                            />
                            <FormField
                                control={form.control}
                                name="name_kg"
                                render={({ field }) => (
                                    <FormItem>
                                        <FormLabel>Название (KG) *</FormLabel>
                                        <FormControl>
                                            <Input placeholder="Кыргыз Улуттук Университети..." {...field} />
                                        </FormControl>
                                        <FormMessage />
                                    </FormItem>
                                )}
                            />
                            <FormField
                                control={form.control}
                                name="location"
                                render={({ field }) => (
                                    <FormItem>
                                        <FormLabel>Местонахождение *</FormLabel>
                                        <FormControl>
                                            <Input placeholder="г. Бишкек, ул. Киевская, 44" {...field} />
                                        </FormControl>
                                        <FormMessage />
                                    </FormItem>
                                )}
                            />
                             <FormField
                                control={form.control}
                                name="tin"
                                render={({ field }) => (
                                    <FormItem>
                                        <FormLabel>ИНН *</FormLabel>
                                        <FormControl>
                                            <Input placeholder="123456789012" {...field} />
                                        </FormControl>
                                        <FormMessage />
                                    </FormItem>
                                )}
                            />
                             <FormField
                                control={form.control}
                                name="reg_certificate"
                                render={({ field }) => (
                                    <FormItem>
                                        <FormLabel>Свидетельство о гос. рег.</FormLabel>
                                        <FormControl>
                                            <Input placeholder="Номер свидетельства..." {...field} value={field.value ?? ''} />
                                        </FormControl>
                                        <FormMessage />
                                    </FormItem>
                                )}
                            />
                             <FormField
                                control={form.control}
                                name="accreditation_decision_date"
                                render={({ field }) => (
                                    <FormItem>
                                        <FormLabel>Дата принятия решения об аккредитации</FormLabel>
                                        <FormControl>
                                            <Input type="date" {...field} value={field.value ?? ''}/>
                                        </FormControl>
                                        <FormMessage />
                                    </FormItem>
                                )}
                            />
                             <FormField
                                control={form.control}
                                name="accreditation_certificate_details"
                                render={({ field }) => (
                                    <FormItem>
                                        <FormLabel>Реквизиты сертификата об аккредитации</FormLabel>
                                        <FormControl>
                                            <Input placeholder="Серия, номер..." {...field} value={field.value ?? ''}/>
                                        </FormControl>
                                        <FormMessage />
                                    </FormItem>
                                )}
                            />
                             <FormField
                                control={form.control}
                                name="accreditation_expiry_date"
                                render={({ field }) => (
                                    <FormItem>
                                        <FormLabel>Срок окончания действия сертификата</FormLabel>
                                        <FormControl>
                                            <Input type="date" {...field} value={field.value ?? ''}/>
                                        </FormControl>
                                         <FormDescription>
                                            Дата окончания аккредитации ВУЗа.
                                        </FormDescription>
                                        <FormMessage />
                                    </FormItem>
                                )}
                            />

                            {/* Include all other relevant fields here... */}

                            {/* <Button type="submit" disabled={isUpdating}>
                                {isUpdating && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
                                {isUpdating ? "Сохранение..." : "Сохранить изменения"}
                            </Button> */}
                            <Button type="submit" disabled={false}>
                                Сохранить изменения
                            </Button>
                        </form>
                    </Form>
                </CardContent>
            </Card>
        </div>
    );
}