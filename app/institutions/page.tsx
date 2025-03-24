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
import { Input } from '@/components/registry/new-york-v4/ui/input';
import { 
  Building2, 
  Search,
  Calendar,
  MapPin,
  FileText,
  ExternalLink
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
import Link from 'next/link';

// Mock data
const mockInstitutions = [
  {
    id: "1",
    name: "Кыргызский Национальный Университет им. Жусупа Баласагына",
    nameKg: "Жусуп Баласагын атындагы Кыргыз Улуттук Университети",
    location: "г. Бишкек, ул. Фрунзе, 547",
    locationKg: "Бишкек ш., Фрунзе көч., 547",
    registrationCertificate: "№123456",
    taxId: "01234567890123",
    accreditationDate: "2022-05-15",
    certificateDetails: "№AC-2022/123",
    certificateExpiryDate: "2027-05-15",
    programsCount: 47
  },
  {
    id: "2",
    name: "Кыргызско-Российский Славянский Университет",
    nameKg: "Кыргыз-Россия Славян Университети",
    location: "г. Бишкек, ул. Киевская, 44",
    locationKg: "Бишкек ш., Киевская көч., 44",
    registrationCertificate: "№789012",
    taxId: "01234567890124",
    accreditationDate: "2023-03-10",
    certificateDetails: "№AC-2023/45",
    certificateExpiryDate: "2028-03-10",
    programsCount: 38
  },
  {
    id: "3",
    name: "Американский Университет в Центральной Азии",
    nameKg: "Борбордук Азиядагы Америка Университети",
    location: "г. Бишкек, ул. Аалы Токомбаева, 7/6",
    locationKg: "Бишкек ш., Аалы Токомбаев көч., 7/6",
    registrationCertificate: "№345678",
    taxId: "01234567890125",
    accreditationDate: "2021-09-05",
    certificateDetails: "№AC-2021/89",
    certificateExpiryDate: "2026-09-05",
    programsCount: 25
  },
];

export default function InstitutionsPage() {
  const [language, setLanguage] = useState<'ru' | 'kg'>('ru');
  const [searchTerm, setSearchTerm] = useState('');
  
  const translations = {
    ru: {
      title: "Реестр образовательных организаций",
      subtitle: "Просмотр всех аккредитованных высших учебных заведений Кыргызстана",
      searchPlaceholder: "Поиск по названию организации...",
      filters: "Фильтры",
      sortBy: "Сортировка",
      location: "Местонахождение",
      accreditationDate: "Дата аккредитации",
      expiryDate: "Срок действия до",
      programs: "Программы",
      details: "Подробнее",
      totalFound: "Найдено организаций",
      sortOptions: {
        nameAsc: "Название (А-Я)",
        nameDesc: "Название (Я-А)",
        dateDesc: "Сначала новые",
        dateAsc: "Сначала старые",
      },
    },
    kg: {
      title: "Билим берүү уюмдарынын реестри",
      subtitle: "Кыргызстандын аккредитацияланган жогорку окуу жайларын көрүү",
      searchPlaceholder: "Уюмдун аталышы боюнча издөө...",
      filters: "Чыпкалар",
      sortBy: "Иреттөө",
      location: "Жайгашкан жери",
      accreditationDate: "Аккредитация датасы",
      expiryDate: "Жарактуу мөөнөтү",
      programs: "Программалар",
      details: "Кеңири маалымат",
      totalFound: "Табылган уюмдар",
      sortOptions: {
        nameAsc: "Аталышы (А-Я)",
        nameDesc: "Аталышы (Я-А)",
        dateDesc: "Жаңыларынан баштап",
        dateAsc: "Эскилеринен баштап",
      },
    }
  };

  const t = translations[language];

  // Filter institutions based on search term
  const filteredInstitutions = mockInstitutions.filter(inst => 
    (language === 'ru' ? inst.name : inst.nameKg).toLowerCase().includes(searchTerm.toLowerCase())
  );

  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleDateString(language === 'ru' ? 'ru-RU' : 'ky-KG');
  };

  return (
    <div className="min-h-screen flex flex-col">
      {/* Header - would be a shared component in real app */}
      <header className="bg-blue-700 text-white p-4">
        <div className="container mx-auto flex justify-between items-center">
          <Link href="/" className="flex items-center space-x-2">
            <Building2 size={32} />
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
          <div className="flex flex-col md:flex-row gap-6">
            {/* Filters sidebar */}
            <div className="w-full md:w-1/4">
              <Card>
                <CardHeader>
                  <CardTitle>{t.filters}</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div>
                    <label className="text-sm font-medium mb-1 block">{t.sortBy}</label>
                    <Select defaultValue="nameAsc">
                      <SelectTrigger>
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="nameAsc">{t.sortOptions.nameAsc}</SelectItem>
                        <SelectItem value="nameDesc">{t.sortOptions.nameDesc}</SelectItem>
                        <SelectItem value="dateDesc">{t.sortOptions.dateDesc}</SelectItem>
                        <SelectItem value="dateAsc">{t.sortOptions.dateAsc}</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                  
                  <div>
                    <label className="text-sm font-medium mb-1 block">{t.location}</label>
                    <Select defaultValue="all">
                      <SelectTrigger>
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="all">{language === 'ru' ? 'Все локации' : 'Баардык жерлер'}</SelectItem>
                        <SelectItem value="bishkek">{language === 'ru' ? 'г. Бишкек' : 'Бишкек ш.'}</SelectItem>
                        <SelectItem value="osh">{language === 'ru' ? 'г. Ош' : 'Ош ш.'}</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                </CardContent>
              </Card>
            </div>
            <div className="w-full md:w-3/4">
              <div className="mb-6">
                <div className="relative">
                  <Input 
                    className="pl-10 py-6"
                    placeholder={t.searchPlaceholder}
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                  />
                  <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-500" />
                </div>
                <p className="mt-2 text-sm text-gray-600">
                  {t.totalFound}: {filteredInstitutions.length}
                </p>
              </div>
              
              <div className="space-y-4">
                {filteredInstitutions.map(institution => (
                  <Card key={institution.id} className="overflow-hidden">
                    <CardContent className="p-0">
                      <div className="flex flex-col lg:flex-row">
                        <div className="p-6 flex-1">
                          <h2 className="text-xl font-bold text-blue-800 mb-3">
                            {language === 'ru' ? institution.name : institution.nameKg}
                          </h2>
                          
                          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
                            <div className="flex items-start">
                              <MapPin className="h-5 w-5 text-gray-500 mr-2 mt-0.5" />
                              <span>{language === 'ru' ? institution.location : institution.locationKg}</span>
                            </div>
                            
                            <div className="flex items-start">
                              <Calendar className="h-5 w-5 text-gray-500 mr-2 mt-0.5" />
                              <div>
                                <div>{t.accreditationDate}: {formatDate(institution.accreditationDate)}</div>
                                <div>{t.expiryDate}: {formatDate(institution.certificateExpiryDate)}</div>
                              </div>
                            </div>
                          </div>
                          
                          <div className="flex items-center text-gray-600">
                            <FileText className="h-5 w-5 mr-2" />
                            <span>
                              {language === 'ru' ? 'Свидетельство:' : 'Күбөлүк:'} {institution.certificateDetails}
                            </span>
                          </div>
                        </div>
                        
                        <div className="bg-blue-50 p-6 flex flex-col justify-between lg:w-64">
                          <div>
                            <div className="text-3xl font-bold text-blue-700 text-center">
                              {institution.programsCount}
                            </div>
                            <div className="text-blue-600 text-center mb-4">{t.programs}</div>
                          </div>
                          
                          <Link href={`/institutions/${institution.id}`}>
                            <Button className="w-full">
                              {t.details}
                              <ExternalLink className="ml-2 h-4 w-4" />
                            </Button>
                          </Link>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
              
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
          </div>
        </div>
      </section>

      {/* Footer - would be a shared component in real app */}
      <footer className="bg-gray-800 text-white py-8">
        <div className="container mx-auto px-4">
          <div className="flex flex-col md:flex-row justify-between items-center">
            <div className="mb-4 md:mb-0">
              <div className="flex items-center">
                <Building2 className="mr-2" />
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