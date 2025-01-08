'use client'

import { usePathname } from 'next/navigation';
import Header from "@/components/header/Header";
import Footer from "@/components/Footer";
import { Analytics } from "@vercel/analytics/react";
import { ThemeProvider } from "@/components/ThemeProvider";
import { siteConfig } from "@/config/site";

export default function ClientLayout({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  const isDeepfakePath = pathname === '/made/';

  return (
    <ThemeProvider
      attribute="class"
      defaultTheme={siteConfig.nextThemeColor}
      enableSystem
    >
      {!isDeepfakePath && <Header />}
      <main>{children}</main>
      {!isDeepfakePath && <Footer />}
      <Analytics />
    </ThemeProvider>
  );
}

