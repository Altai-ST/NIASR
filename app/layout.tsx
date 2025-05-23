import type { Metadata } from "next";
import { Nunito } from "next/font/google";
import "./globals.css";
import { Providers } from "./providers";
import Header from "@/components/header/header";

export const metadata: Metadata = {
  title: "НИАРС",
  description: "",
};

const nunito = Nunito({
  subsets: ['cyrillic'],
  variable: '--font-nunito',
  weight: ['400', '500', '600', '700', '800', '900'],
});

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <Providers>
      <html lang="en">
      <body
        className={nunito.className}
      >
        <main className="min-h-screen">
          <Header />
          {children}
        </main>
      </body>
    </html>
    </Providers>
    
  );
}
