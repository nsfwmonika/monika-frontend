import { SiteConfig } from "@/types/siteConfig";
import { BsGithub, BsTwitterX, BsTelegram } from "react-icons/bs";

const baseSiteConfig = {
  name: "Monika Al",
  description:
    "Heuristic Agent easily implement your creativity.",
  url: "https://www.nsfwmonika.ai/",
  ogImage: "https://og.png",
  metadataBase: '/',
  keywords: ["Monika Al"],
  authors: [
    {
      name: "Monika Al",
      url: "",
      twitter: 'https://x.com/NSFW_monika_',
    }
  ],
  themeColors: [
    { media: '(prefers-color-scheme: light)', color: 'white' },
    { media: '(prefers-color-scheme: dark)', color: 'black' },
  ],
  nextThemeColor: 'dark', // next-theme option: system | dark | light
  icons: {
    icon: "/favicon.ico",
    shortcut: "/favicon-16x16.png",
    apple: "/logo.png",
  },
  headerLinks: [
    { name: 'Twitter', href: "https://x.com/NSFW_monika_", icon: BsTwitterX },
    { name: 'Telegram', href: "https://t.me/nsfwmonika_bot", icon: BsTelegram },
  ],
  footerLinks: [
    { name: 'twitter', href: "https://x.com/NSFW_monika_", icon: BsTwitterX },
    { name: 'telegram', href: "https://t.me/nsfwmonika_bot", icon: BsTelegram },
    { name: 'github', href: "https://github.com/nsfwmonika", icon: BsGithub },
  ],
}

export const siteConfig: SiteConfig = {
  ...baseSiteConfig,
  openGraph: {
    type: "website",
    locale: "en_US",
    url: baseSiteConfig.url,
    title: baseSiteConfig.name,
    images: [`${baseSiteConfig.url}/og.png`],
    description: baseSiteConfig.description,
    siteName: baseSiteConfig.name,
  },
  twitter: {
    card: "summary_large_image",
    site: baseSiteConfig.url,
    title: baseSiteConfig.name,
    description: baseSiteConfig.description,
    images: [`${baseSiteConfig.url}/og.png`],
  },
}
