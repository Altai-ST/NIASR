"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/registry/new-york-v4/ui/tabs";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/registry/new-york-v4/ui/card";
import { Button } from "@/components/registry/new-york-v4/ui/button";
import { Input } from "@/components/registry/new-york-v4/ui/input";
import { Label } from "@/components/registry/new-york-v4/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/registry/new-york-v4/ui/select";
import { toast } from "sonner"
import { EyeIcon, EyeOffIcon, Globe, GraduationCap } from "lucide-react";
import { useAppSelector } from "../hooks";
import { selectTranslations } from "@/store/language/languageSlice";

export default function LoginPage() {
  const router = useRouter();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [role, setRole] = useState("guest");
  const [showPassword, setShowPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const t = useAppSelector(selectTranslations);;

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    
    try {
      // Simulated authentication - replace with your actual auth logic
      await new Promise(resolve => setTimeout(resolve, 1500));
      
      // Redirect based on role
      if (role === "admin") {
        router.push("/admin");
      } else if (role === "niars") {
        router.push("/niars/dashboard");
      } else if (role === "university") {
        router.push("/university");
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
    <div className="flex items-center justify-center py-10 w-full">
        <Tabs defaultValue="login" className="w-3/5">
          <TabsList className="grid w-full grid-cols-2">
            <TabsTrigger value="login">{t.loginName}</TabsTrigger>
            <TabsTrigger value="register">{t.registrationName}</TabsTrigger>
          </TabsList>
          <TabsContent value="login">
            <Card>
              <CardHeader>
                <CardTitle>{t.autorization}</CardTitle>
                <CardDescription>
                  {t.titleLogin}
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <form onSubmit={handleLogin} className="space-y-4">
                  <div className="space-y-2">
                    <Label htmlFor="email">{t.email}</Label>
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
                    <Label htmlFor="password">{t.password}</Label>
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
                    <Label htmlFor="role">{t.roleUser}</Label>
                    <Select value={role} onValueChange={setRole}>
                      <SelectTrigger id="role">
                        <SelectValue placeholder={t.selectRole} />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="admin">{t.admin}</SelectItem>
                        <SelectItem value="niars">{t.niarsRep}</SelectItem>
                        <SelectItem value="university">{t.institutionRep}</SelectItem>
                        <SelectItem value="guest">{t.guest}</SelectItem>
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
                        {t.rememberMe}
                      </Label>
                    </div>
                    <Link 
                      href="/forgot-password"
                      className="text-sm font-medium text-primary underline-offset-4 hover:underline"
                    >
                      {t.forgotPassword}
                    </Link>
                  </div>
                  <Button type="submit" className="w-full" disabled={isLoading}>
                    {isLoading ? t.loginName+"..." : t.loginLoading}
                  </Button>
                </form>
              </CardContent>
              <CardFooter className="flex flex-wrap items-center justify-between">
                <div className="text-sm text-gray-500">
                  {t.noAccount+" "}
                  <Link 
                    href="/register"
                    className="text-sm font-medium text-primary underline-offset-4 hover:underline"
                  >
                    {t.register}
                  </Link>
                </div>
                <Link 
                  href="/"
                  className="text-sm font-medium text-primary underline-offset-4 hover:underline"
                >
                  {t.backToHome}
                </Link>
              </CardFooter>
            </Card>
          </TabsContent>
          <TabsContent value="register">
            <Card>
              <CardHeader>
                <CardTitle>{t.registrationName}</CardTitle>
                <CardDescription>
                  {t.createNewUser}
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="register-email">{t.email}</Label>
                  <Input id="register-email" type="email" placeholder="email@example.com" />
                </div>
                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="first-name">{t.name}</Label>
                    <Input id="first-name" placeholder={t.name} />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="last-name">{t.lastName}</Label>
                    <Input id="last-name" placeholder={t.lastName} />
                  </div>
                </div>
                <div className="space-y-2">
                  <Label htmlFor="org-name">{t.organization}</Label>
                  <Input id="org-name" placeholder={t.organization}/>
                </div>
                <div className="space-y-2">
                  <Label htmlFor="register-password">{t.password}</Label>
                  <Input id="register-password" type="password" placeholder="••••••••" />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="confirm-password">{t.repeatPassword}</Label>
                  <Input id="confirm-password" type="password" placeholder="••••••••" />
                </div>
                <Button className="w-full">{t.register}</Button>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
      </div>
  );
}