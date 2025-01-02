import GoogleAnalytics from "@/app/GoogleAnalytics";
import { siteConfig } from "@/config/site";
import { Viewport } from "next";
import ClientLayout from './ClientLayout';

import "./layout.scss";
import "@/styles/globals.css";
import "@/styles/loading.css";
import "@/styles/style.scss";

import "@/styles/Banner.scss";
import "@/styles/GridImg.scss";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";

export const metadata = {
  title: siteConfig.name,
  description: siteConfig.description,
  keywords: siteConfig.keywords,
  authors: siteConfig.authors,
  icons: siteConfig.icons,
  metadataBase: siteConfig.metadataBase,
  openGraph: siteConfig.openGraph,
  twitter: siteConfig.twitter,
};

export const viewport: Viewport = {
  themeColor: siteConfig.themeColors,
};

export default function RootLayout({
  children,
  params: { lang },
}: {
  children: React.ReactNode;
  params: { lang: string | undefined };
}) {
  return (
    <html suppressHydrationWarning>
      <head />
      <body className="min-h-screen bg-background font-sans antialiased page-main">
        <ClientLayout>{children}</ClientLayout>
        {process.env.NODE_ENV === "development" ? (
          <></>
        ) : (
          <>
            <GoogleAnalytics />
          </>
        )}
      </body>
    </html>
  );
}

