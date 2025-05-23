'use client';

import React from 'react';
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
// import { useAddVuzMutation } from '@/store/api/apiSlice';
//  // Adjust path
import { useRouter } from 'next/navigation';
// import { useToast } from "@/components/registry/new-york-v4/ui/use-toast";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/registry/new-york-v4/ui/card";
import Link from 'next/link';
import { ArrowLeft } from 'lucide-react';

// Define Zod schema based on your Vuz interface and requirements
const programFormSchema = z.object({
    name_ru: z.string().min(2, { message: "Название (RU) обязательно (мин. 2 символа)." }),
    name_kg: z.string().min(2, { message: "Название (KG) обязательно (мин. 2 символа)." }),
    code: z.string().min(5, { message: "Код программы" }), // Adjust length as needed
    accreditation_decision_date: z.string().optional(), // Consider date picker / validation
    accreditation_certificate_details: z.string().optional(),
    accreditation_expiry_date: z.string().optional(), // Consider date picker / validation
    // Add other fields from Vuz interface
});

type ProgramFormData = z.infer<typeof programFormSchema>;

export default function AddVuzPage() {
    const router = useRouter();
    // const { toast } = useToast();
    // const [addVuz, { isLoading }] = useAddVuzMutation();
    const isLoading = false; 

    const form = useForm<ProgramFormData>({
        resolver: zodResolver(programFormSchema),
        defaultValues: { // Set default values if needed
            name_ru: "",
            name_kg: "",
            code: "",
            // ... other fields
        },
    });

    // async function onSubmit(values: VuzFormData) {
    //     console.log("Submitting VUZ data:", values);
    //     try {
    //         // Adjust data structure if your API expects something different
    //         const newVuzData = {
    //             ...values,
    //             // Potentially format dates or other fields before sending
    //         }
    //         // await addVuz(newVuzData).unwrap(); // Use unwrap to catch errors
    //         // toast({
    //         //     title: "Успех!",
    //         //     description: `ВУЗ "${values.name_ru}" успешно добавлен.`,
    //         // });
    //         router.push('/admin/vuzs'); // Redirect to list after successful creation
    //     } catch (err) {
    //         console.error("Failed to add VUZ:", err);
    //         // toast({
    //         //     title: "Ошибка!",
    //         //     description: "Не удалось добавить ВУЗ. Проверьте данные.",
    //         //     variant: "destructive",
    //         // });
    //     }
    // }
    async function onSubmit(values: ProgramFormData) {
        console.log("Mock Add Submitted (no API call):", values);
        // Simulate adding to mock data (optional, just for console/local state)
        const newMockId = `vuz-${Date.now()}`; // Simple mock ID
        const newVuz = { id: newMockId, ...values };
        // mockVuzs.push(newVuz); // Don't modify imported const directly; maybe use state if needed
        console.log("Simulated new VUZ:", newVuz);
   
        // toast({
        //     title: "Mock Add",
        //     description: `ВУЗ "${values.name_ru}" был бы добавлен на сервер.`,
        // });
        // router.push('/admin/vuzs'); // Test redirection
    }

    return (
         <div className="container mx-auto py-10 max-w-3xl">
             <Button variant="outline" size="sm" asChild className='mb-4'>
                <Link href="/admin/universities"><ArrowLeft className='mr-2 h-4 w-4'/> Назад к списку</Link>
             </Button>
            <Card>
                <CardHeader>
                    <CardTitle>Добавить новый ВУЗ</CardTitle>
                </CardHeader>
                <CardContent>
                     <Form {...form}>
                        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
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
                                name="code"
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
                            {/* Add other FormFields for all required VUZ properties */}
                            {/* Example for an optional date */}
                             <FormField
                                control={form.control}
                                name="accreditation_expiry_date"
                                render={({ field }) => (
                                    <FormItem>
                                        <FormLabel>Срок окончания действия сертификата</FormLabel>
                                        <FormControl>
                                             {/* Use Shadcn DatePicker or simple text input */}
                                            <Input type="date" {...field} />
                                        </FormControl>
                                         <FormDescription>
                                            Дата окончания аккредитации ВУЗа.
                                        </FormDescription>
                                        <FormMessage />
                                    </FormItem>
                                )}
                            />

                            <Button type="submit" disabled={isLoading}>
                                {isLoading ? "Сохранение..." : "Добавить ВУЗ"}
                            </Button>
                        </form>
                    </Form>
                </CardContent>
            </Card>
        </div>
    );
}