
"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import Image from "next/image";
import Link from "next/link";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/registry/new-york-v4/ui/tabs";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/registry/new-york-v4/ui/card";
import { Button } from "@/components/registry/new-york-v4/ui/button";
import { Input } from "@/components/registry/new-york-v4/ui/input";
import { Label } from "@/components/registry/new-york-v4/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/registry/new-york-v4/ui/select";
import { toast } from "sonner"
import { EyeIcon, EyeOffIcon, Globe, GraduationCap } from "lucide-react";

export default function LoginPage() {
  const router = useRouter();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [role, setRole] = useState("guest");
  const [showPassword, setShowPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
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

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    
    try {
      // Simulated authentication - replace with your actual auth logic
      await new Promise(resolve => setTimeout(resolve, 1500));
      
      // Redirect based on role
      if (role === "admin") {
        router.push("/admin/dashboard");
      } else if (role === "niars") {
        router.push("/niars/dashboard");
      } else if (role === "university") {
        router.push("/university/dashboard");
      } else {
        router.push("/");
      }
    } catch (error) {
        console.error("Login failed:", error);
    } finally {
      setIsLoading(false);
    }
  };

  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };

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
    <div className="flex items-center justify-center py-10 w-full">
        <Tabs defaultValue="login" className="w-3/5">
          <TabsList className="grid w-full grid-cols-2">
            <TabsTrigger value="login">Вход</TabsTrigger>
            <TabsTrigger value="register">Регистрация</TabsTrigger>
          </TabsList>
          <TabsContent value="login">
            <Card>
              <CardHeader>
                <CardTitle>Авторизация</CardTitle>
                <CardDescription>
                  Введите ваши учетные данные для входа в систему
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <form onSubmit={handleLogin} className="space-y-4">
                  <div className="space-y-2">
                    <Label htmlFor="email">Email</Label>
                    <Input 
                      id="email" 
                      type="email" 
                      placeholder="email@example.com" 
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      required
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="password">Пароль</Label>
                    <div className="relative">
                      <Input 
                        id="password" 
                        type={showPassword ? "text" : "password"}
                        placeholder="••••••••"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        required
                      />
                      <Button
                        type="button"
                        variant="ghost"
                        size="sm"
                        className="absolute right-0 top-0 h-full px-3 py-2"
                        onClick={()=> toast("Event has been created",{
                            description: "Sunday, December 03, 2023 at 9:00 AM",
                            action: {
                              label: "Undo",
                              onClick: () => togglePasswordVisibility
                            },
                        })
                        }
                      >
                        {showPassword ? (
                          <EyeOffIcon className="h-4 w-4" />
                        ) : (
                          <EyeIcon className="h-4 w-4" />
                        )}
                      </Button>
                    </div>
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="role">Роль пользователя</Label>
                    <Select value={role} onValueChange={setRole}>
                      <SelectTrigger id="role">
                        <SelectValue placeholder="Выберите роль" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="admin">Администратор</SelectItem>
                        <SelectItem value="niars">Представитель НИАРС</SelectItem>
                        <SelectItem value="university">Представитель ВУЗа</SelectItem>
                        <SelectItem value="guest">Гость</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                  <div className="flex items-center justify-between pt-2">
                    <div className="flex items-center space-x-2">
                      <input
                        type="checkbox"
                        id="remember"
                        className="h-4 w-4 rounded border-gray-300"
                      />
                      <Label htmlFor="remember" className="text-sm font-normal">
                        Запомнить меня
                      </Label>
                    </div>
                    <Link 
                      href="/forgot-password"
                      className="text-sm font-medium text-primary underline-offset-4 hover:underline"
                    >
                      Забыли пароль?
                    </Link>
                  </div>
                  <Button type="submit" className="w-full" disabled={isLoading}>
                    {isLoading ? "Вход..." : "Войти"}
                  </Button>
                </form>
              </CardContent>
              <CardFooter className="flex flex-wrap items-center justify-between">
                <div className="text-sm text-gray-500">
                  Нет аккаунта?{" "}
                  <Link 
                    href="/register"
                    className="text-sm font-medium text-primary underline-offset-4 hover:underline"
                  >
                    Зарегистрироваться
                  </Link>
                </div>
                <Link 
                  href="/"
                  className="text-sm font-medium text-primary underline-offset-4 hover:underline"
                >
                  Вернуться на главную
                </Link>
              </CardFooter>
            </Card>
          </TabsContent>
          <TabsContent value="register">
            <Card>
              <CardHeader>
                <CardTitle>Регистрация</CardTitle>
                <CardDescription>
                  Создайте новую учетную запись для доступа к системе
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="register-email">Email</Label>
                  <Input id="register-email" type="email" placeholder="email@example.com" />
                </div>
                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="first-name">Имя</Label>
                    <Input id="first-name" placeholder="Имя" />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="last-name">Фамилия</Label>
                    <Input id="last-name" placeholder="Фамилия" />
                  </div>
                </div>
                <div className="space-y-2">
                  <Label htmlFor="org-name">Организация</Label>
                  <Input id="org-name" placeholder="Название организации" />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="register-password">Пароль</Label>
                  <Input id="register-password" type="password" placeholder="••••••••" />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="confirm-password">Подтвердите пароль</Label>
                  <Input id="confirm-password" type="password" placeholder="••••••••" />
                </div>
                <Button className="w-full">Зарегистрироваться</Button>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
      </div>
  );
}