
"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/registry/new-york-v4/ui/card";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/registry/new-york-v4/ui/form";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/registry/new-york-v4/ui/select";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/registry/new-york-v4/ui/accordion";
import { Button } from "@/components/registry/new-york-v4/ui/button";
import { Input } from "@/components/registry/new-york-v4/ui/input";
import { Textarea } from "@/components/registry/new-york-v4/ui/textarea";
import { Checkbox } from "@/components/registry/new-york-v4/ui/checkbox";
import { RadioGroup, RadioGroupItem } from "@/components/registry/new-york-v4/ui/radio-group";
import { Label } from "@/components/registry/new-york-v4/ui/label";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import * as z from "zod";
import { Loader2, UploadCloud, Download, FileText, Plus, Trash2 } from "lucide-react";

// Define the form validation schema
const formSchema = z.object({
  universityName: z.string().min(2, {
    message: "Название ВУЗа должно содержать минимум 2 символа",
  }),
  applicationType: z.enum(["program", "institutional"], {
    required_error: "Пожалуйста, выберите тип аккредитации",
  }),
  programCode: z.string().optional(),
  programName: z.string().optional(),
  programLevel: z.enum(["bachelor", "master", "specialist", "phd"]).optional(),
  licenseNumber: z.string().min(5, {
    message: "Номер лицензии должен содержать минимум 5 символов",
  }),
  licenseDate: z.string(),
  contactPersonName: z.string().min(2, {
    message: "ФИО контактного лица должно содержать минимум 2 символа",
  }),
  contactPersonPosition: z.string().min(2, {
    message: "Должность контактного лица должна содержать минимум 2 символа",
  }),
  contactPersonEmail: z.string().email({
    message: "Пожалуйста, введите действительный email",
  }),
  contactPersonPhone: z.string().min(6, {
    message: "Номер телефона должен содержать минимум 6 символов",
  }),
  address: z.string().min(5, {
    message: "Адрес должен содержать минимум 5 символов",
  }),
  organizationalLegalForm: z.string().min(2, {
    message: "Организационно-правовая форма должна содержать минимум 2 символа",
  }),
  taxNumber: z.string().min(9, {
    message: "ИНН должен содержать минимум 9 символов",
  }),
  agreementDate: z.string(),
  agreementNumber: z.string().min(1, {
    message: "Номер договора обязателен",
  }),
  acceptTerms: z.boolean().refine((val) => val === true, {
    message: "Необходимо принять условия подачи заявки",
  }),
});

export default function AccreditationApplicationPage() {
  const router = useRouter();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [uploadedFiles, setUploadedFiles] = useState<Array<{ name: string; size: number }>>([]);
  const [showProgramFields, setShowProgramFields] = useState(false);

  // Create the form
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      universityName: "",
      applicationType: "program",
      programCode: "",
      programName: "",
      programLevel: "bachelor",
      licenseNumber: "",
      licenseDate: "",
      contactPersonName: "",
      contactPersonPosition: "",
      contactPersonEmail: "",
      contactPersonPhone: "",
      address: "",
      organizationalLegalForm: "",
      taxNumber: "",
      agreementDate: "",
      agreementNumber: "",
      acceptTerms: false,
    },
  });

  // Watch for application type changes
  const applicationType = form.watch("applicationType");

  // Update visibility of program fields when application type changes
  useEffect(() => {
    setShowProgramFields(applicationType === "program");
  }, [applicationType]);

  // Handle file upload
  const handleFileUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const files = event.target.files;
    if (files) {
      const newFiles = Array.from(files).map(file => ({
        name: file.name,
        size: file.size
      }));
      setUploadedFiles([...uploadedFiles, ...newFiles]);
    }
  };

  // Remove a file from the list
  const removeFile = (index: number) => {
    const updatedFiles = [...uploadedFiles];
    updatedFiles.splice(index, 1);
    setUploadedFiles(updatedFiles);
  };

  // Handle form submission
  const onSubmit = async (values: z.infer<typeof formSchema>) => {
    setIsSubmitting(true);
    try {
      // Simulated form submission - replace with your actual API call
      await new Promise(resolve => setTimeout(resolve, 2000));
      
      console.log("Form values:", values);
      console.log("Uploaded files:", uploadedFiles);
    
      
      router.push("/accreditation-submission-success");
    } catch (error) {
        console.log(error);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="container py-8 md:py-12">
      <h1 className="text-3xl font-bold mb-6 text-center">Анкета для подачи заявки на аккредитацию</h1>
      <p className="text-gray-500 dark:text-gray-400 text-center mb-8">
        Заполните все необходимые поля для подачи заявки на аккредитацию образовательной программы или учреждения
      </p>

      <Card className="w-full max-w-4xl mx-auto">
        <CardHeader>
          <CardTitle>Форма заявки на аккредитацию</CardTitle>
          <CardDescription>
            Предоставьте информацию о вашем учебном заведении и требуемом типе аккредитации
          </CardDescription>
        </CardHeader>
        <CardContent>
          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
              <Accordion type="single" collapsible defaultValue="section1" className="w-full">
                <AccordionItem value="section1">
                  <AccordionTrigger className="text-lg font-medium">
                    Общая информация
                  </AccordionTrigger>
                  <AccordionContent className="space-y-4 pt-4">
                    <FormField
                      control={form.control}
                      name="universityName"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Название учебного заведения</FormLabel>
                          <FormControl>
                            <Input placeholder="Введите полное название ВУЗа" {...field} />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />

                    <FormField
                      control={form.control}
                      name="applicationType"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Тип аккредитации</FormLabel>
                          <Select
                            onValueChange={field.onChange}
                            defaultValue={field.value}
                          >
                            <FormControl>
                              <SelectTrigger>
                                <SelectValue placeholder="Выберите тип аккредитации" />
                              </SelectTrigger>
                            </FormControl>
                            <SelectContent>
                              <SelectItem value="program">Программная аккредитация ВПО</SelectItem>
                              <SelectItem value="institutional">Институциональная аккредитация ВПО</SelectItem>
                            </SelectContent>
                          </Select>
                          <FormDescription>
                            Выберите тип аккредитации, который вы хотите получить
                          </FormDescription>
                          <FormMessage />
                        </FormItem>
                      )}
                    />

                    {showProgramFields && (
                      <>
                        <FormField
                          control={form.control}
                          name="programCode"
                          render={({ field }) => (
                            <FormItem>
                              <FormLabel>Шифр образовательной программы</FormLabel>
                              <FormControl>
                                <Input placeholder="Например: 580100" {...field} />
                              </FormControl>
                              <FormMessage />
                            </FormItem>
                          )}
                        />

                        <FormField
                          control={form.control}
                          name="programName"
                          render={({ field }) => (
                            <FormItem>
                              <FormLabel>Название образовательной программы</FormLabel>
                              <FormControl>
                                <Input placeholder="Название программы" {...field} />
                              </FormControl>
                              <FormMessage />
                            </FormItem>
                          )}
                        />

                        <FormField
                          control={form.control}
                          name="programLevel"
                          render={({ field }) => (
                            <FormItem>
                              <FormLabel>Уровень программы</FormLabel>
                              <Select
                                onValueChange={field.onChange}
                                defaultValue={field.value}
                              >
                                <FormControl>
                                  <SelectTrigger>
                                    <SelectValue placeholder="Выберите уровень программы" />
                                  </SelectTrigger>
                                </FormControl>
                                <SelectContent>
                                  <SelectItem value="bachelor">Бакалавриат</SelectItem>
                                  <SelectItem value="master">Магистратура</SelectItem>
                                  <SelectItem value="specialist">Специалитет</SelectItem>
                                  <SelectItem value="phd">Докторантура</SelectItem>
                                </SelectContent>
                              </Select>
                              <FormMessage />
                            </FormItem>
                          )}
                        />
                      </>
                    )}
                  </AccordionContent>
                </AccordionItem>

                <AccordionItem value="section2">
                  <AccordionTrigger className="text-lg font-medium">
                    Лицензия и документы
                  </AccordionTrigger>
                  <AccordionContent className="space-y-4 pt-4">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <FormField
                        control={form.control}
                        name="licenseNumber"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>Номер лицензии</FormLabel>
                            <FormControl>
                              <Input placeholder="LD123456" {...field} />
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />

                      <FormField
                        control={form.control}
                        name="licenseDate"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>Дата выдачи лицензии</FormLabel>
                            <FormControl>
                              <Input type="date" {...field} />
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                    </div>

                    <div className="space-y-4">
                      <Label>Загрузка документов</Label>
                      <div className="border-2 border-dashed rounded-lg p-8 text-center">
                        <UploadCloud className="mx-auto h-12 w-12 text-gray-400" />
                        <div className="mt-2">
                          <Label
                            htmlFor="file-upload"
                            className="relative cursor-pointer rounded-md font-medium text-primary hover:text-primary/80"
                          >
                            <span>Загрузить файлы</span>
                            <Input
                              id="file-upload"
                              name="file-upload"
                              type="file"
                              multiple
                              className="sr-only"
                              onChange={handleFileUpload}
                            />
                          </Label>
                          <p className="text-xs text-gray-500">
                            PDF, DOC, DOCX, JPG до 10MB
                          </p>
                        </div>
                        <div className="mt-4 flex items-center justify-center gap-2">
                          <Button variant="outline" size="sm">
                            <Download className="mr-2 h-4 w-4" />
                            Скачать шаблон анкеты
                          </Button>
                          <Button variant="outline" size="sm">
                            <FileText className="mr-2 h-4 w-4" />
                            Скачать инструкцию
                          </Button>
                        </div>
                      </div>

                      {uploadedFiles.length > 0 && (
                        <div className="mt-4">
                          <h4 className="font-medium mb-2">Загруженные файлы:</h4>
                          <ul className="space-y-2">
                            {uploadedFiles.map((file, index) => (
                              <li key={index} className="flex items-center justify-between bg-gray-50 dark:bg-gray-800 p-2 rounded">
                                <div className="flex items-center">
                                  <FileText className="h-4 w-4 mr-2" />
                                  <span>{file.name}</span>
                                  <span className="text-xs text-gray-500 ml-2">
                                    ({(file.size / 1024).toFixed(2)} KB)
                                  </span>
                                </div>
                                <Button
                                  type="button"
                                  variant="ghost"
                                  size="sm"
                                  onClick={() => removeFile(index)}
                                >
                                  <Trash2 className="h-4 w-4 text-red-500" />
                                </Button>
                              </li>
                            ))}
                          </ul>
                        </div>
                      )}
                    </div>
                  </AccordionContent>
                </AccordionItem>

                <AccordionItem value="section3">
                  <AccordionTrigger className="text-lg font-medium">
                    Контактная информация
                  </AccordionTrigger>
                  <AccordionContent className="space-y-4 pt-4">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <FormField
                        control={form.control}
                        name="contactPersonName"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>ФИО контактного лица</FormLabel>
                            <FormControl>
                              <Input placeholder="Иванов Иван Иванович" {...field} />
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />

                      <FormField
                        control={form.control}
                        name="contactPersonPosition"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>Должность контактного лица</FormLabel>
                            <FormControl>
                              <Input placeholder="Руководитель отдела качества" {...field} />
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <FormField
                        control={form.control}
                        name="contactPersonEmail"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>Email</FormLabel>
                            <FormControl>
                              <Input type="email" placeholder="email@example.com" {...field} />
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />

                      <FormField
                        control={form.control}
                        name="contactPersonPhone"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>Телефон</FormLabel>
                            <FormControl>
                              <Input placeholder="+996 XXX XXX XXX" {...field} />
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                    </div>

                    <FormField
                      control={form.control}
                      name="address"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Юридический адрес</FormLabel>
                          <FormControl>
                            <Textarea 
                              placeholder="г. Бишкек, ул. Примерная, 123" 
                              className="resize-none"
                              {...field} 
                            />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                  </AccordionContent>
                </AccordionItem>

                <AccordionItem value="section4">
                  <AccordionTrigger className="text-lg font-medium">
                    Реквизиты и дополнительная информация
                  </AccordionTrigger>
                  <AccordionContent className="space-y-4 pt-4">
                    <FormField
                      control={form.control}
                      name="organizationalLegalForm"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Организационно-правовая форма</FormLabel>
                          <FormControl>
                            <Input placeholder="Например: ГОУ ВПО" {...field} />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />

                    <FormField
                      control={form.control}
                      name="taxNumber"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>ИНН (Идентификационный налоговый номер)</FormLabel>
                          <FormControl>
                            <Input placeholder="XXXXXXXXX" {...field} />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <FormField
                        control={form.control}
                        name="agreementNumber"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>Номер договора с НИАРС</FormLabel>
                            <FormControl>
                              <Input placeholder="Номер договора" {...field} />
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />

                      <FormField
                        control={form.control}
                        name="agreementDate"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>Дата договора с НИАРС</FormLabel>
                            <FormControl>
                              <Input type="date" {...field} />
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                    </div>

                    <div className="bg-gray-50 dark:bg-gray-800 p-4 rounded-lg">
                      <h4 className="font-medium mb-2">Сведения о контингенте студентов</h4>
                      <div className="space-y-2">
                        <div className="flex justify-between items-center">
                          <span>Курс</span>
                          <span>Количество студентов</span>
                        </div>
                        <div className="grid grid-cols-2 gap-2">
                          <span className="text-gray-600">1 курс</span>
                          <Input placeholder="0" type="number" min="0" />
                        </div>
                        <div className="grid grid-cols-2 gap-2">
                          <span className="text-gray-600">2 курс</span>
                          <Input placeholder="0" type="number" min="0" />
                        </div>
                        <div className="grid grid-cols-2 gap-2">
                          <span className="text-gray-600">3 курс</span>
                          <Input placeholder="0" type="number" min="0" />
                        </div>
                        <div className="grid grid-cols-2 gap-2">
                          <span className="text-gray-600">4 курс</span>
                          <Input placeholder="0" type="number" min="0" />
                        </div>
                        <Button type="button" variant="outline" size="sm" className="w-full">
                          <Plus className="h-4 w-4 mr-2" />
                          Добавить курс
                        </Button>
                      </div>
                    </div>
                  </AccordionContent>
                </AccordionItem>
              </Accordion>

              <FormField
                control={form.control}
                name="acceptTerms"
                render={({ field }) => (
                  <FormItem className="flex flex-row items-start space-x-3 space-y-0 rounded-md border p-4">
                    <FormControl>
                      <Checkbox
                        checked={field.value}
                        onCheckedChange={field.onChange}
                      />
                    </FormControl>
                    <div className="space-y-1 leading-none">
                      <FormLabel>
                        Я подтверждаю достоверность предоставленных данных
                      </FormLabel>
                      <FormDescription>
                        Принимаю условия подачи заявки на аккредитацию и согласен на обработку персональных данных
                      </FormDescription>
                    </div>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <div className="flex justify-end space-x-4">
                <Button variant="outline" type="button" onClick={() => router.back()}>
                  Отмена
                </Button>
                <Button type="submit" disabled={isSubmitting}>
                  {isSubmitting ? (
                    <>
                      <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                      Отправка...
                    </>
                  ) : (
                    "Отправить заявку"
                  )}
                </Button>
              </div>
            </form>
          </Form>
        </CardContent>
        <CardFooter className="flex flex-col space-y-4 text-sm text-gray-500">
          <p>
            Форма заявки на аккредитацию согласно требованиям НИАРС 
            (Независимое агентство аккредитации и рейтинга в сфере образования)
          </p>
          <p>
            Для получения дополнительной информации обратитесь в службу поддержки 
            по телефону +996 XXX XXX XXX или по email support@registry.edu.kg
          </p>
        </CardFooter>
      </Card>
    </div>
  );
}