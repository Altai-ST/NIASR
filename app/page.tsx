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
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/registry/new-york-v4/ui/tabs';
import { Input } from '@/components/registry/new-york-v4/ui/input';
import { 
  Building2, 
  GraduationCap, 
  Search, 
  FileText, 
  ClipboardCheck,
  ArrowRight,
  Globe
} from 'lucide-react';
import Link from 'next/link';

export default function HomePage() {
  const [language, setLanguage] = useState<'ru' | 'kg'>('ru');
  
  const translations = {
    ru: {
      title: "Реестр образовательных организаций и программ ВПО Кыргызстана",
      subtitle: "Национальное агентство по аккредитации и рейтингу в сфере образования",
      searchPlaceholder: "Поиск по названию или коду программы...",
      institutions: "Образовательные организации",
      programs: "Образовательные программы",
      institutionsCount: "Аккредитованные организации",
      programsCount: "Аккредитованные программы",
      questionnaire: "Заполнить анкету ВУЗа",
      accreditation: "Подать заявку на аккредитацию",
      viewInstitutions: "Просмотреть все организации",
      viewPrograms: "Просмотреть все программы",
      language: "Кыргызча",
      popularPrograms: "Популярные направления",
      recentlyAccredited: "Недавно аккредитованные",
      login: "Вход в систему",
    },
    kg: {
      title: "Кыргызстандын жогорку кесиптик билим берүү уюмдарынын жана программаларынын реестри",
      subtitle: "Билим берүү чөйрөсүндөгү аккредитация жана рейтинг боюнча улуттук агенттик",
      searchPlaceholder: "Программанын аталышы же коду боюнча издөө...",
      institutions: "Билим берүү уюмдары",
      programs: "Билим берүү программалары",
      institutionsCount: "Аккредитацияланган уюмдар",
      programsCount: "Аккредитацияланган программалар",
      questionnaire: "ЖОЖ анкетасын толтуруу",
      accreditation: "Аккредитацияга өтүнмө бериңиз",
      viewInstitutions: "Бардык уюмдарды көрүү",
      viewPrograms: "Бардык программаларды көрүү",
      language: "Русский",
      popularPrograms: "Популярдуу багыттар",
      recentlyAccredited: "Жакында аккредитацияланган",
      login: "Тутумга кирүү",
    }
  };

  const t = translations[language];

  const mockStats = {
    institutions: 42,
    programs: 5,
  };

  const mockPopularPrograms = [
    { id: 1, code: "580100", name: language === 'ru' ? "Экономика" : "Экономика" },
    { id: 2, code: "710200", name: language === 'ru' ? "Информационные системы и технологии" : "Маалымат системалары жана технологиялары" },
    { id: 3, code: "530500", name: language === 'ru' ? "Юриспруденция" : "Юриспруденция" },
  ];

  const mockRecentlyAccredited = [
    { 
      id: 1, 
      name: language === 'ru' ? "Кыргызский Национальный Университет" : "Кыргыз Улуттук Университети", 
      date: "15.02.2025", 
      program: language === 'ru' ? "Международные отношения" : "Эл аралык мамилелер" 
    },
    { 
      id: 2, 
      name: language === 'ru' ? "Кыргызско-Российский Славянский Университет" : "Кыргыз-Россия Славян университети", 
      date: "27.01.2025", 
      program: language === 'ru' ? "Лингвистика" : "Лингвистика" 
    },
  ];

  return (
    <div className="min-h-screen flex flex-col">
      <header className="bg-blue-700 text-white p-4">
        <div className="container mx-auto flex justify-between items-center">
          <div className="flex items-center space-x-2">
            <GraduationCap size={32} />
            <a href="/">
              <h1 className="text-xl font-bold hidden md:block">НИАРС</h1>
            </a>
          </div>
          <div className="flex items-center space-x-4">
            <Button 
              variant="ghost" 
              className="text-white hover:text-white hover:bg-blue-600"
              onClick={() => setLanguage(language === 'ru' ? 'kg' : 'ru')}
            >
              <Globe className="mr-2 h-4 w-4" />
              {t.language}
            </Button>
            <a href="/login">
              <Button variant="outline" className="text-white border-white hover:bg-blue-600">
                {t.login}
              </Button>
            </a>
          </div>
        </div>
      </header>
      <section className="bg-blue-700 text-white pb-16 pt-8">
        <div className="container mx-auto px-4">
          <div className="max-w-3xl mx-auto text-center">
            <h1 className="text-3xl md:text-4xl font-bold mb-4">{t.title}</h1>
            <p className="text-lg text-blue-100 mb-8">{t.subtitle}</p>
            
            <div className="relative">
              <Input 
                className="w-full py-6 pl-12 pr-4 bg-white text-gray-900 rounded-lg"
                placeholder={t.searchPlaceholder}
              />
              <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-500" />
              <Button className="absolute right-2 top-1/2 transform -translate-y-1/2 bg-blue-600 hover:bg-blue-700">
                {language === 'ru' ? 'Найти' : 'Табуу'}
              </Button>
            </div>
          </div>
        </div>
      </section>
      <section className="py-12 bg-gray-50">
        <div className="container mx-auto px-4">
          <Tabs defaultValue="institutions" className="max-w-4xl mx-auto">
            <TabsList className="grid w-full grid-cols-2 mb-8">
              <TabsTrigger value="institutions" className="text-lg py-3">
                <Building2 className="mr-2 h-5 w-5" />
                {t.institutions}
              </TabsTrigger>
              <TabsTrigger value="programs" className="text-lg py-3">
                <GraduationCap className="mr-2 h-5 w-5" />
                {t.programs}
              </TabsTrigger>
            </TabsList>
            
            <TabsContent value="institutions" className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <Card>
                  <CardHeader>
                    <CardTitle className="text-2xl text-center text-blue-700">{mockStats.institutions}</CardTitle>
                    <CardDescription className="text-center text-lg">{t.institutionsCount}</CardDescription>
                  </CardHeader>
                  <CardFooter className="justify-center">
                    <a href="/institutions">
                      <Button variant="outline" className="mt-2">
                      {t.viewInstitutions}
                      <ArrowRight className="ml-2 h-4 w-4" />
                    </Button>
                    </a>
                    
                  </CardFooter>
                </Card>
                
                <Card className="bg-blue-50 border-blue-100">
                  <CardHeader>
                    <CardTitle className="text-xl text-blue-800">{t.recentlyAccredited}</CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    {mockRecentlyAccredited.map(item => (
                      <div key={item.id} className="border-b border-blue-100 pb-3 last:border-0">
                        <p className="font-medium">{item.name}</p>
                        <div className="flex justify-between text-sm text-gray-600 mt-1">
                          <span>{item.program}</span>
                          <span>{item.date}</span>
                        </div>
                      </div>
                    ))}
                  </CardContent>
                </Card>
              </div>
              
              <div className="flex flex-col md:flex-row gap-4 mt-8 justify-center">
                <a href="/questionnaire/institution">
                  <Button className="flex items-center">
                    <FileText className="mr-2 h-5 w-5" />
                    {t.questionnaire}
                  </Button>
                </a>
                <a href="/accreditation-application">
                    <Button variant="outline" className="flex items-center">
                      <ClipboardCheck className="mr-2 h-5 w-5" />
                      {t.accreditation}
                    </Button>
                  </a>
              </div>
            </TabsContent>
            
            <TabsContent value="programs" className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <Card>
                  <CardHeader>
                    <CardTitle className="text-2xl text-center text-blue-700">{mockStats.programs}</CardTitle>
                    <CardDescription className="text-center text-lg">{t.programsCount}</CardDescription>
                  </CardHeader>
                  <CardFooter className="justify-center">
                  <a href="/programs">
                    <Button variant="outline" className="mt-2">
                        {t.viewPrograms}
                        <ArrowRight className="ml-2 h-4 w-4" />
                      </Button>
                  </a>
                    
                  </CardFooter>
                </Card>
                
                <Card className="bg-blue-50 border-blue-100">
                  <CardHeader>
                    <CardTitle className="text-xl text-blue-800">{t.popularPrograms}</CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    {mockPopularPrograms.map(program => (
                      <div key={program.id} className="border-b border-blue-100 pb-3 last:border-0">
                        <p className="font-medium">{program.name}</p>
                        <p className="text-sm text-gray-600">{language === 'ru' ? 'Код:' : 'Коду:'} {program.code}</p>
                      </div>
                    ))}
                  </CardContent>
                </Card>
              </div>
            </TabsContent>
          </Tabs>
        </div>
      </section>
      <footer className="bg-gray-800 text-white py-8 mt-auto">
        <div className="container mx-auto px-4">
          <div className="flex flex-col md:flex-row justify-between items-center">
            <div className="mb-4 md:mb-0">
              <div className="flex items-center">
                <GraduationCap className="mr-2" />
                <span className="font-bold">НИАРС © 2025</span>
              </div>
            </div>
            <div className="flex space-x-6">
              <Link href="#" className="hover:text-blue-300">
                {language === 'ru' ? 'О нас' : 'Биз жөнүндө'}
              </Link>
              <Link href="#" className="hover:text-blue-300">
                {language === 'ru' ? 'Контакты' : 'Байланыштар'}
              </Link>
              <Link href="#" className="hover:text-blue-300">
                {language === 'ru' ? 'Законодательство' : 'Мыйзамдар'}
              </Link>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}