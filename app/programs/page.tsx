'use client';

import { useState } from 'react';
import { Button } from '@/components/registry/new-york-v4/ui/button';
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from '@/components/registry/new-york-v4/ui/card';
import { Input } from '@/components/registry/new-york-v4/ui/input';
import { 
  GraduationCap, 
  Search,
  Calendar,
  Building2,
  ExternalLink,
  CheckCircle2,
  XCircle,
  SlidersHorizontal
} from 'lucide-react';
import {
  Pagination,
  PaginationContent,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
} from "@/components/registry/new-york-v4/ui/pagination";
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
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/registry/new-york-v4/ui/table";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/registry/new-york-v4/ui/tooltip";
import {
  Badge
} from "@/components/registry/new-york-v4/ui/badge";
import Link from 'next/link';

// Mock data
const mockPrograms = [
  {
    id: "1",
    code: "580100",
    name: "Экономика",
    nameKg: "Экономика",
    level: "bachelor",
    institutionId: "1",
    institutionName: "Кыргызский Национальный Университет им. Жусупа Баласагына",
    institutionNameKg: "Жусуп Баласагын атындагы Кыргыз Улуттук Университети",
    accreditationDate: "2022-07-15",
    accreditationExpiryDate: "2027-07-15",
    status: "active"
  },
  {
    id: "2",
    code: "710200",
    name: "Информационные системы и технологии",
    nameKg: "Маалыматтык системалар жана технологиялар",
    level: "bachelor",
    institutionId: "2",
    institutionName: "Кыргызско-Российский Славянский Университет",
    institutionNameKg: "Кыргыз-Россия Славян Университети",
    accreditationDate: "2023-03-10",
    accreditationExpiryDate: "2028-03-10",
    status: "active"
  },
  {
    id: "3",
    code: "530500",
    name: "Юриспруденция",
    nameKg: "Юриспруденция",
    level: "bachelor",
    institutionId: "3",
    institutionName: "Американский Университет в Центральной Азии",
    institutionNameKg: "Борбордук Азиядагы Америка Университети",
    accreditationDate: "2020-09-05",
    accreditationExpiryDate: "2025-09-05",
    status: "active"
  },
  {
    id: "4",
    code: "531500",
    name: "Международные отношения",
    nameKg: "Эл аралык мамилелер",
    level: "master",
    institutionId: "1",
    institutionName: "Кыргызский Национальный Университет им. Жусупа Баласагына",
    institutionNameKg: "Жусуп Баласагын атындагы Кыргыз Улуттук Университети",
    accreditationDate: "2021-11-20",
    accreditationExpiryDate: "2026-11-20",
    status: "active"
  },
  {
    id: "5",
    code: "580200",
    name: "Менеджмент",
    nameKg: "Менеджмент",
    level: "bachelor",
    institutionId: "3",
    institutionName: "Американский Университет в Центральной Азии",
    institutionNameKg: "Борбордук Азиядагы Америка Университети",
    accreditationDate: "2019-05-12",
    accreditationExpiryDate: "2024-05-12",
    status: "active"
  },
];

export default function ProgramsPage() {
  const [language, setLanguage] = useState<'ru' | 'kg'>('ru');
  const [searchTerm, setSearchTerm] = useState('');
  const [showFilters, setShowFilters] = useState(false);
  const [levelFilter, setLevelFilter] = useState('all');
  
  const translations = {
    ru: {
      title: "Реестр образовательных программ ВПО",
      subtitle: "Просмотр всех аккредитованных образовательных программ ВПО Кыргызстана",
      searchPlaceholder: "Поиск по названию или коду программы...",
      toggleFilters: "Фильтры",
      level: "Уровень",
      levels: {
        all: "Все уровни",
        bachelor: "Бакалавриат",
        master: "Магистратура",
        specialist: "Специалитет"
      },
      institution: "Образовательная организация",
      accreditationDate: "Дата аккредитации",
      expiryDate: "Аккредитована до",
      status: "Статус",
      statuses: {
        active: "Действующая",
        expired: "Истекла"
      },
      code: "Код",
      programName: "Наименование программы",
      totalFound: "Найдено программ",
      details: "Подробнее",
      filterByInstitution: "Фильтр по организации",
    },
    kg: {
      title: "Жогорку кесиптик билим берүү программаларынын реестри",
      subtitle: "Кыргызстандын бардык аккредитацияланган билим берүү программаларын көрүү",
      searchPlaceholder: "Программанын аталышы же коду боюнча издөө...",
      toggleFilters: "Чыпкалар",
      level: "Деңгээли",
      levels: {
        all: "Бардык деңгээлдер",
        bachelor: "Бакалавриат",
        master: "Магистратура",
        specialist: "Адистик"
      },
      institution: "Билим берүү уюму",
      accreditationDate: "Аккредитация датасы",
      expiryDate: "Аккредитация мөөнөтү",
      status: "Статусу",
      statuses: {
        active: "Активдүү",
        expired: "Мөөнөтү бүткөн"
      },
      code: "Коду",
      programName: "Программанын аталышы",
      totalFound: "Табылган программалар",
      details: "Кеңири маалымат",
      filterByInstitution: "Уюм боюнча чыпкалоо",
    }
  };

  const t = translations[language];

  // Filter programs based on search term and level
  const filteredPrograms = mockPrograms.filter(program => {
    const matchesSearch = 
      (language === 'ru' ? program.name : program.nameKg).toLowerCase().includes(searchTerm.toLowerCase()) ||
      program.code.includes(searchTerm);
    
    const matchesLevel = levelFilter === 'all' || program.level === levelFilter;
    
    return matchesSearch && matchesLevel;
  });

  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleDateString(language === 'ru' ? 'ru-RU' : 'ky-KG');
  };

  const getLevelLabel = (level: string) => {
    switch(level) {
      case 'bachelor': return t.levels.bachelor;
      case 'master': return t.levels.master;
      case 'specialist': return t.levels.specialist;
      default: return level;
    }
  };

  return (
    <div className="min-h-screen flex flex-col">
      {/* Header - would be a shared component in real app */}
      <header className="bg-blue-700 text-white p-4">
        <div className="container mx-auto flex justify-between items-center">
          <Link href="/" className="flex items-center space-x-2">
            <GraduationCap size={32} />
            <h1 className="text-xl font-bold hidden md:block">НИАРС</h1>
          </Link>
          <div className="flex items-center space-x-4">
            <Button 
              variant="ghost" 
              className="text-white hover:text-white hover:bg-blue-600"
              onClick={() => setLanguage(language === 'ru' ? 'kg' : 'ru')}
            >
              {language === 'ru' ? 'Кыргызча' : 'Русский'}
            </Button>
            <Button variant="outline" className="text-white border-white hover:bg-blue-600">
              {language === 'ru' ? 'Вход в систему' : 'Тутумга кирүү'}
            </Button>
          </div>
        </div>
      </header>

      {/* Page title */}
      <section className="bg-blue-700 text-white py-8">
        <div className="container mx-auto px-4">
          <h1 className="text-2xl md:text-3xl font-bold mb-2">{t.title}</h1>
          <p className="text-blue-100">{t.subtitle}</p>
        </div>
      </section>

      {/* Main content */}
      <section className="py-8 bg-gray-50 flex-grow">
        <div className="container mx-auto px-4">
          {/* Search and filter controls */}
          <div className="mb-6">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-4">
              <div className="md:col-span-2 relative">
                <Input 
                  className="pl-10 py-6"
                  placeholder={t.searchPlaceholder}
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                />
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-500" />
              </div>
              
              <div className="flex gap-2">
                <Select value={levelFilter} onValueChange={setLevelFilter}>
                  <SelectTrigger>
                    <SelectValue placeholder={t.level} />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">{t.levels.all}</SelectItem>
                    <SelectItem value="bachelor">{t.levels.bachelor}</SelectItem>
                    <SelectItem value="master">{t.levels.master}</SelectItem>
                    <SelectItem value="specialist">{t.levels.specialist}</SelectItem>
                  </SelectContent>
                </Select>
                
                <Button 
                  variant="outline" 
                  className="flex-shrink-0"
                  onClick={() => setShowFilters(!showFilters)}
                >
                  <SlidersHorizontal className="mr-2 h-4 w-4" />
                  {t.toggleFilters}
                </Button>
              </div>
            </div>
            
            {showFilters && (
              <Card className="mb-4">
                <CardHeader>
                  <CardTitle>{t.filterByInstitution}</CardTitle>
                </CardHeader>
                <CardContent>
                  <Accordion type="single" collapsible className="w-full">
                    {Array.from(new Set(mockPrograms.map(p => p.institutionId))).map(instId => {
                      const institution = mockPrograms.find(p => p.institutionId === instId);
                      if (!institution) return null;
                      
                      return (
                        <AccordionItem key={instId} value={instId}>
                          <AccordionTrigger>
                            {language === 'ru' ? institution.institutionName : institution.institutionNameKg}
                          </AccordionTrigger>
                          <AccordionContent>
                            <div className="flex flex-col gap-2 pl-4">
                              {mockPrograms
                                .filter(p => p.institutionId === instId)
                                .map(program => (
                                  <div key={program.id} className="flex items-center gap-2">
                                    <input type="checkbox" id={`program-${program.id}`} className="rounded" />
                                    <label htmlFor={`program-${program.id}`} className="text-sm">
                                      {program.code} - {language === 'ru' ? program.name : program.nameKg}
                                    </label>
                                  </div>
                                ))
                              }
                            </div>
                          </AccordionContent>
                        </AccordionItem>
                      );
                    })}
                  </Accordion>
                </CardContent>
              </Card>
            )}
            
            <p className="text-sm text-gray-600">
              {t.totalFound}: {filteredPrograms.length}
            </p>
          </div>
          
          {/* Programs table */}
          <Card className="overflow-hidden">
            <CardContent className="p-0">
              <div className="overflow-x-auto">
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>{t.code}</TableHead>
                      <TableHead className="w-full">{t.programName}</TableHead>
                      <TableHead>{t.level}</TableHead>
                      <TableHead>{t.institution}</TableHead>
                      <TableHead>{t.expiryDate}</TableHead>
                      <TableHead>{t.status}</TableHead>
                      <TableHead></TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {filteredPrograms.map(program => (
                      <TableRow key={program.id}>
                        <TableCell className="font-medium">{program.code}</TableCell>
                        <TableCell>{language === 'ru' ? program.name : program.nameKg}</TableCell>
                        <TableCell>{getLevelLabel(program.level)}</TableCell>
                        <TableCell className="max-w-xs truncate" title={language === 'ru' ? program.institutionName : program.institutionNameKg}>
                          {language === 'ru' ? program.institutionName : program.institutionNameKg}
                        </TableCell>
                        <TableCell>{formatDate(program.accreditationExpiryDate)}</TableCell>
                        <TableCell>
                          <TooltipProvider>
                            <Tooltip>
                              <TooltipTrigger asChild>
                                <Badge variant={program.status === 'active' ? 'secondary' : 'destructive'} className="flex items-center gap-1">
                                  {program.status === 'active' ? 
                                    <CheckCircle2 className="h-3 w-3" /> : 
                                    <XCircle className="h-3 w-3" />
                                  }
                                  {program.status === 'active' ? t.statuses.active : t.statuses.expired}
                                </Badge>
                              </TooltipTrigger>
                              <TooltipContent>
                                <p>
                                  {language === 'ru' ? 'Аккредитована до:' : 'Аккредитация мөөнөтү:'} {formatDate(program.accreditationExpiryDate)}
                                </p>
                              </TooltipContent>
                            </Tooltip>
                          </TooltipProvider>
                        </TableCell>
                        <TableCell>
                          <Link href={`/programs/${program.id}`}>
                            <Button size="sm" variant="outline" className="flex items-center gap-1">
                              {t.details}
                              <ExternalLink className="h-3 w-3" />
                            </Button>
                          </Link>
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </div>
            </CardContent>
          </Card>
          
          <Pagination className="mt-8">
            <PaginationContent>
              <PaginationItem>
                <PaginationPrevious href="#" />
              </PaginationItem>
              <PaginationItem>
                <PaginationLink href="#" isActive>1</PaginationLink>
              </PaginationItem>
              <PaginationItem>
                <PaginationLink href="#">2</PaginationLink>
              </PaginationItem>
              <PaginationItem>
                <PaginationLink href="#">3</PaginationLink>
              </PaginationItem>
              <PaginationItem>
                <PaginationNext href="#" />
              </PaginationItem>
            </PaginationContent>
          </Pagination>
        </div>
      </section>

      {/* Footer - would be a shared component in real app */}
      <footer className="bg-gray-800 text-white py-8">
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