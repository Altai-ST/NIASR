'use client';

import { useState } from 'react';
import { Button } from '@/components/registry/new-york-v4/ui/button';
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from '@/components/registry/new-york-v4/ui/card';
import { 
  FileText, 
  GraduationCap,
  Building2,
  Users,
  Save,
  Send,
  ArrowLeft,
  Upload
} from 'lucide-react';
import Link from 'next/link';
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
  Tabs,
  TabsContent,
  TabsList,
  TabsTrigger,
} from "@/components/registry/new-york-v4/ui/tabs";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/registry/new-york-v4/ui/select";
import {
  Alert,
  AlertDescription,
  AlertTitle,
} from "@/components/registry/new-york-v4/ui/alert";
import { Label } from "@/components/registry/new-york-v4/ui/label";

export default function InstitutionQuestionnairePage() {
  const [language, setLanguage] = useState<'ru' | 'kg'>('ru');
  const [activeTab, setActiveTab] = useState('general');
  const [formState, setFormState] = useState({
    name: '',
    nameKg: '',
    address: '',
    addressKg: '',
    regCertificate: '',
    taxId: '',
    director: '',
    directorContact: '',
    website: '',
    foundationYear: '',
    studentCount: '',
    facultiesCount: '',
    programsCount: '',
    teachersCount: '',
    teachersWithPhD: '',
    missionStatement: '',
    missionStatementKg: '',
    attachments: [] as string[]
  });
  
  const translations = {
    ru: {
      title: "Анкета образовательной организации",
      subtitle: "Заполните информацию о Вашем учебном заведении для аккредитации",
      saveAsDraft: "Сохранить как черновик",
      submit: "Отправить анкету",
      backToHome: "Вернуться на главную",
      tabs: {
        general: "Общая информация",
        contacts: "Контактные данные",
        statistics: "Статистика",
        mission: "Миссия и стратегия",
        documents: "Документы"
      },
      formLabels: {
        name: "Наименование организации (на русском)",
        nameKg: "Наименование организации (на кыргызском)",
        address: "Юридический адрес (на русском)",
        addressKg: "Юридический адрес (на кыргызском)",
        regCertificate: "Номер свидетельства о гос. регистрации",
        taxId: "Идентификационный налоговый номер",
        director: "ФИО руководителя",
        directorContact: "Контактные данные руководителя",
        website: "Веб-сайт",
        foundationYear: "Год основания",
        studentCount: "Количество студентов",
        facultiesCount: "Количество факультетов",
        programsCount: "Количество образовательных программ",
        teachersCount: "Количество преподавателей",
        teachersWithPhD: "Количество преподавателей с ученой степенью",
        missionStatement: "Миссия организации (на русском)",
        missionStatementKg: "Миссия организации (на кыргызском)",
        attachments: "Прикрепить документы"
      },
      requiredDocuments: {
        title: "Необходимые документы",
        license: "Лицензия на образовательную деятельность",
        charter: "Устав организации",
        certificate: "Свидетельство о государственной регистрации",
        structure: "Организационная структура",
        uploadBtn: "Загрузить файл"
      },
      successMessage: "Анкета успешно сохранена как черновик"
    },
    kg: {
      title: "Билим берүү уюмунун анкетасы",
      subtitle: "Аккредитация үчүн окуу жайыңыз тууралуу маалыматты толтуруңуз",
      saveAsDraft: "Долбоор катары сактоо",
      submit: "Анкетаны жөнөтүү",
      backToHome: "Башкы бетке кайтуу",
      tabs: {
        general: "Жалпы маалымат",
        contacts: "Байланыш маалыматтары",
        statistics: "Статистика",
        mission: "Миссия жана стратегия",
        documents: "Документтер"
      },
      formLabels: {
        name: "Уюмдун аталышы (орус тилинде)",
        nameKg: "Уюмдун аталышы (кыргыз тилинде)",
        address: "Юридикалык дареги (орус тилинде)",
        addressKg: "Юридикалык дареги (кыргыз тилинде)",
        regCertificate: "Мамлекеттик каттоо күбөлүгүнүн номери",
        taxId: "Салык төлөөчүнүн идентификациялык номери",
        director: "Жетекчинин аты-жөнү",
        directorContact: "Жетекчигинин байланыш маалыматтары",
        website: "Веб-сайт",
        foundationYear: "Негизделген жылы",
        studentCount: "Студенттердин саны",
        facultiesCount: "Факультеттердин саны",
        programsCount: "Бағдарламалардын саны",
        teachersCount: "Мугалимдердин саны",
        teachersWithPhD: "илимий дәрежеси бар мугалимдер",
        missionStatement: "Уюмдун миссиясы (орус тилинде)",
        missionStatementKg: "Уюмдун миссиясы (кыргыз тилинде)",
        attachments: "Документтерди кошуу"
      },
      requiredDocuments: {
        // ... существующие поля
      },
      successMessage: "Анкета долбоор катары сакталды"
    }
  };

  const handleSaveDraft = () => {
    // Логика сохранения черновика
    alert('Сохранение черновика');
  };

  const handleSubmit = () => {
    // Логика отправки анкеты
    alert('Отправка анкеты');
  };

  return (
    <div className="container mx-auto p-4 md:p-8">
      <Card className="max-w-4xl mx-auto">
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Building2 className="h-6 w-6" />
            {translations[language].title}
          </CardTitle>
          <CardDescription>
            {translations[language].subtitle}
          </CardDescription>
        </CardHeader>
        
        <CardContent>
          <div className="flex justify-between mb-6">
            <div className="flex gap-2">
              <Button 
                variant={language === 'ru' ? 'default' : 'outline'}
                onClick={() => setLanguage('ru')}
              >
                Рус
              </Button>
              <Button 
                variant={language === 'kg' ? 'default' : 'outline'}
                onClick={() => setLanguage('kg')}
              >
                Кырг
              </Button>
            </div>
            <Link href="/">
              <Button variant="outline" size="icon">
                <ArrowLeft className="h-4 w-4" />
              </Button>
            </Link>
          </div>

          <Tabs value={activeTab} onValueChange={setActiveTab}>
            <TabsList className="grid grid-cols-5 md:grid-cols-5">
              {['general', 'contacts', 'statistics', 'mission', 'documents'].map(tab => (
                <TabsTrigger key={tab} value={tab}>
                  {translations[language].tabs[tab as keyof typeof translations['ru']['tabs']]}
                </TabsTrigger>
              ))}
            </TabsList>

            <TabsContent value="general">
              <div className="grid gap-4">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <Input 
                    label={translations[language].formLabels.name}
                    value={formState.name}
                    onChange={e => setFormState({...formState, name: e.target.value})}
                  />
                  <Input 
                    label={translations[language].formLabels.nameKg}
                    value={formState.nameKg}
                    onChange={e => setFormState({...formState, nameKg: e.target.value})}
                  />
                </div>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <Input 
                    label={translations[language].formLabels.address}
                    value={formState.address}
                    onChange={e => setFormState({...formState, address: e.target.value})}
                  />
                  <Input 
                    label={translations[language].formLabels.addressKg}
                    value={formState.addressKg}
                    onChange={e => setFormState({...formState, addressKg: e.target.value})}
                  />
                </div>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <Input 
                    label={translations[language].formLabels.regCertificate}
                    value={formState.regCertificate}
                    onChange={e => setFormState({...formState, regCertificate: e.target.value})}
                  />
                  <Input 
                    label={translations[language].formLabels.taxId}
                    value={formState.taxId}
                    onChange={e => setFormState({...formState, taxId: e.target.value})}
                  />
                </div>
              </div>
            </TabsContent>

            {/* Новая вкладка Контакты */}
            <TabsContent value="contacts">
              <div className="grid gap-4">
                <Input 
                  label={translations[language].formLabels.director}
                  value={formState.director}
                  onChange={e => setFormState({...formState, director: e.target.value})}
                />
                <Input 
                  label={translations[language].formLabels.directorContact}
                  value={formState.directorContact}
                  onChange={e => setFormState({...formState, directorContact: e.target.value})}
                />
                <Input 
                  label={translations[language].formLabels.website}
                  value={formState.website}
                  onChange={e => setFormState({...formState, website: e.target.value})}
                />
              </div>
            </TabsContent>

            {/* Новая вкладка Статистика */}
            <TabsContent value="statistics">
              <div className="grid gap-4">
                <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                  <Input 
                    type="number"
                    label={translations[language].formLabels.studentCount}
                    value={formState.studentCount}
                    onChange={e => setFormState({...formState, studentCount: e.target.value})}
                  />
                  <Input 
                    type="number"
                    label={translations[language].formLabels.facultiesCount}
                    value={formState.facultiesCount}
                    onChange={e => setFormState({...formState, facultiesCount: e.target.value})}
                  />
                  <Input 
                    type="number"
                    label={translations[language].formLabels.programsCount}
                    value={formState.programsCount}
                    onChange={e => setFormState({...formState, programsCount: e.target.value})}
                  />
                  <Input 
                    type="number"
                    label={translations[language].formLabels.teachersCount}
                    value={formState.teachersCount}
                    onChange={e => setFormState({...formState, teachersCount: e.target.value})}
                  />
                </div>
                <Input 
                  type="number"
                  label={translations[language].formLabels.teachersWithPhD}
                  value={formState.teachersWithPhD}
                  onChange={e => setFormState({...formState, teachersWithPhD: e.target.value})}
                />
              </div>
            </TabsContent>

            {/* Новая вкладка Миссия */}
            <TabsContent value="mission">
              <div className="grid gap-4">
                <Textarea 
                  label={translations[language].formLabels.missionStatement}
                  value={formState.missionStatement}
                  onChange={e => setFormState({...formState, missionStatement: e.target.value})}
                  rows={4}
                />
                <Textarea 
                  label={translations[language].formLabels.missionStatementKg}
                  value={formState.missionStatementKg}
                  onChange={e => setFormState({...formState, missionStatementKg: e.target.value})}
                  rows={4}
                />
              </div>
            </TabsContent>
          </Tabs>
        </CardContent>

        <CardFooter className="flex justify-between">
          <Button variant="outline" onClick={handleSaveDraft}>
            <Save className="mr-2 h-4 w-4" />
            {translations[language].saveAsDraft}
          </Button>
          <Button onClick={handleSubmit}>
            <Send className="mr-2 h-4 w-4" />
            {translations[language].submit}
          </Button>
        </CardFooter>
      </Card>
    </div>
  );
}

// Компонент Input с поддержкой лейблов
const Input = ({
  label,
  ...props
}: React.InputHTMLAttributes<HTMLInputElement> & { label: string }) => {
  return (
    <div className="grid gap-1">
      <Label>{label}</Label>
      <input
        {...props}
        className="flex h-10 w-full rounded-md border border-input bg-transparent px-3 py-2 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
      />
    </div>
  );
};

// Компонент Textarea с поддержкой лейблов
const Textarea = ({
  label,
  ...props
}: React.TextareaHTMLAttributes<HTMLTextAreaElement> & { label: string }) => {
  return (
    <div className="grid gap-1">
      <Label>{label}</Label>
      <textarea
        {...props}
        className="flex min-h-[80px] w-full rounded-md border border-input bg-transparent px-3 py-2 text-sm ring-offset-background placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
      />
    </div>
  );
};