// lib/mockData.ts
import { Vuz, Program } from './api/apiSlice'; // Adjust path

// Function to generate recent dates (for example purposes)
const recentDate = (daysAgo: number) => new Date(Date.now() - daysAgo * 24 * 60 * 60 * 1000).toISOString();

export const mockVuzs: Vuz[] = [
    {
        id: "vuz-1",
        name_ru: "Кыргызский Национальный Университет им. Жусупа Баласагына",
        name_kg: "Жусуп Баласагын атындагы Кыргыз Улуттук Университети",
        location: "г. Бишкек, ул. Фрунзе, 547",
        reg_certificate: "NFAC-2022/123",
        tin: "01234567890123",
        accreditation_decision_date: "2022-05-15T00:00:00Z",
        accreditation_certificate_details: "Сертификат КНУ №12345",
        accreditation_expiry_date: "2027-05-15T00:00:00Z",
        createdAt: recentDate(30), // Created 30 days ago
        updatedAt: recentDate(2),  // Updated 2 days ago
    },
    {
        id: "vuz-2",
        name_ru: "Кыргызско-Российский Славянский Университет им. Б.Н. Ельцина",
        name_kg: "Б.Н. Ельцин атындагы Кыргыз-Орус Славян Университети",
        location: "г. Бишкек, ул. Киевская, 44",
        reg_certificate: "NFAC-2023/45",
        tin: "09876543210987",
        accreditation_decision_date: "2023-03-10T00:00:00Z",
        accreditation_certificate_details: "Сертификат КРСУ №67890",
        accreditation_expiry_date: "2028-03-10T00:00:00Z",
        createdAt: recentDate(5), // Created 5 days ago
        updatedAt: recentDate(5), // Updated same day as creation
    },
    {
        id: "vuz-3",
        name_ru: "Международный Университет Кыргызстана",
        name_kg: "Эл аралык Кыргызстан Университети",
        location: "г. Бишкек, ул. Турусбекова, 89",
        reg_certificate: "NFAC-2021/08",
        tin: "11223344556677",
        accreditation_decision_date: "2021-11-20T00:00:00Z",
        accreditation_certificate_details: "Сертификат МУК №101112",
        accreditation_expiry_date: "2026-11-20T00:00:00Z",
        createdAt: recentDate(100), // Created 100 days ago
        updatedAt: recentDate(10), // Updated 10 days ago
    },
     {
        id: "vuz-4",
        name_ru: "Ошский Государственный Университет",
        name_kg: "Ош мамлекеттик университети",
        location: "г. Ош, ул. Ленина, 331",
        reg_certificate: "NFAC-2022/99",
        tin: "22446688001122",
        accreditation_decision_date: "2022-09-01T00:00:00Z",
        accreditation_certificate_details: "Сертификат ОшГУ №ABCDE",
        accreditation_expiry_date: "2027-09-01T00:00:00Z",
        createdAt: recentDate(1), // Created yesterday
        updatedAt: recentDate(1), // Updated same day
    },
];

export const mockPrograms: Program[] = [
    // Programs for VUZ-1 (КНУ)
    {
        id: "prog-101", code: "580100", name_ru: "Экономика", name_kg: "Экономика", level: "Бакалавр", vuzId: "vuz-1",
        createdAt: recentDate(28), updatedAt: recentDate(3)
    },
    {
        id: "prog-102", code: "530500", name_ru: "Юриспруденция", name_kg: "Юриспруденция", level: "Бакалавр", vuzId: "vuz-1",
        createdAt: recentDate(25), updatedAt: recentDate(25)
    },
     {
        id: "prog-103", code: "530500", name_ru: "Юриспруденция", name_kg: "Юриспруденция", level: "Магистр", vuzId: "vuz-1",
        createdAt: recentDate(4), updatedAt: recentDate(4) // Recently added
    },
     {
        id: "prog-104", code: "710200", name_ru: "Информационные системы и технологии", name_kg: "Маалыматтык системалар жана технологиялар", level: "Бакалавр", vuzId: "vuz-1",
        createdAt: recentDate(30), updatedAt: recentDate(1) // Recently updated
    },

    // Programs for VUZ-2 (КРСУ)
    {
        id: "prog-201", code: "521500", name_ru: "Лингвистика", name_kg: "Лингвистика", level: "Бакалавр", vuzId: "vuz-2",
        createdAt: recentDate(5), updatedAt: recentDate(5) // Recently added
    },
    {
        id: "prog-202", code: "540200", name_ru: "Социальная работа", name_kg: "Социалдык иш", level: "Бакалавр", vuzId: "vuz-2",
        createdAt: recentDate(5), updatedAt: recentDate(5) // Recently added
    },
     {
        id: "prog-203", code: "620006", name_ru: "Международные отношения", name_kg: "Эл аралык мамилелер", level: "Магистр", vuzId: "vuz-2",
        createdAt: recentDate(10), updatedAt: recentDate(6) // Updated recently
    },
    // ... add timestamps to other mock programs as needed
];