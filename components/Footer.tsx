import React from "react";
import Link from "next/link";
import { siteConfig } from "@/config/site";

const Footer = () => {
  const links = siteConfig.footerLinks;

  const d = new Date();
  return (
    <footer>
      <div className="mt-16 footer-block space-y-2 pt-6 pb-4 flex flex-col items-center text-gray-400 border-t font-bold text-4xl"
        style={{ borderColor: '#1c1a22' }}
      >
        <div className="mx-auto flex flex-row items-center pb-2">
          {links.map((link) => (
            <Link
              key={link.name}
              href={link.href}
              target="_blank"
              rel="noopener noreferrer nofollow"
              className="mx-3 flex max-w-[24px] flex-col items-center justify-center"
            >
              {link.icon &&
                React.createElement(link.icon, { className: "text-lg" })}
            </Link>
          ))}
        </div>
        <span className="text-gray-100 text-xl">Monika Al</span>
      </div>
    </footer>
  );
};

export default Footer;
