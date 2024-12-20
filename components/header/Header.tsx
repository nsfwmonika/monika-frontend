"use client";
import HeaderLinks from "@/components/header/HeaderLinks";
import { MenuIcon } from 'lucide-react';
import Link from "next/link";
import { useState } from "react";
import { CgClose } from "react-icons/cg";

const links = [
  { label: "About", href: "#About" },
  { label: "Creation", href: "#Creation" },
  { label: "Browse", href: "#Browse" },
  { label: "Reward", href: "#Reward" },
  { label: "Roadmap", href: "#Roadmap" },
];

const Header = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  
  return (
    <header className="py-10 mx-auto max-w-full px-4 sm:px-6 lg:px-8 header-module">
      <nav className="relative z-50 flex justify-between items-center">
        <div className="flex items-center md:gap-x-12 flex-1">
          <Link
            href="/"
            aria-label="Monika Al"
            className="flex items-center space-x-1 font-bold text-4xl"
          >
            {/* eslint-disable-next-line @next/next/no-img-element */}
            {/* <img 
              className="w-38 h-8" 
              src="/logo.svg" 
              alt="Logo"
            /> */}
            Monika Al
          </Link>
        </div>

        <ul className="hidden md:flex items-center justify-center gap-6 header-menu">
          {links.map((link) => (
            <li key={link.label}>
              <Link
                href={`/${link.href}`}
                aria-label={link.label}
                className="tracking-wide transition-colors duration-200 font-normal"
              >
                {link.label}
              </Link>
            </li>
          ))}
        </ul>

        <div className="hidden md:flex items-center justify-end gap-x-6 flex-1">
          <HeaderLinks />
        </div>

        {/* Mobile menu button */}
        <div className="md:hidden">
          <button
            aria-label="Open Menu"
            title="Open Menu"
            className="p-2 -mr-1 transition duration-200 rounded focus:outline-none focus:shadow-outline hover:bg-deep-purple-50 focus:bg-deep-purple-50"
            onClick={() => setIsMenuOpen(true)}
          >
            <MenuIcon />
          </button>
          {isMenuOpen && (
            <div className="absolute top-0 left-0 w-full z-50">
              <div className="p-5 bg-background border rounded shadow-sm">
                <div className="flex items-center justify-between mb-4">
                  <div>
                    <Link
                      href="/"
                      aria-label="Landing Page Boilerplate"
                      title="Landing Page Boilerplate"
                      className="inline-flex items-center"
                    >
                      <img 
                        className="w-8 h-8" 
                        src="/logo.png" 
                        alt="Logo"
                      />
                      <span className="ml-2 text-xl font-bold tracking-wide text-gray-950 dark:text-gray-300">
                        Panze
                      </span>
                    </Link>
                  </div>
                  <div>
                    <button
                      aria-label="Close Menu"
                      title="Close Menu"
                      className="tracking-wide transition-colors duration-200 font-normal"
                      onClick={() => setIsMenuOpen(false)}
                    >
                      <CgClose />
                    </button>
                  </div>
                </div>
                <nav>
                  <ul className="space-y-4">
                    {links.map((link) => (
                      <li key={link.label}>
                        <Link
                          href={link.href}
                          aria-label={link.label}
                          title={link.label}
                          className="font-medium tracking-wide transition-colors duration-200 hover:text-deep-purple-accent-400"
                          onClick={() => setIsMenuOpen(false)}
                        >
                          {link.label}
                        </Link>
                      </li>
                    ))}
                  </ul>
                </nav>
                <div className="pt-4">
                  <div className="flex items-center gap-x-5 justify-between">
                    <HeaderLinks />
                    <div className="flex items-center justify-end gap-x-5">
                    </div>
                  </div>
                </div>
              </div>
            </div>
          )}
        </div>
      </nav>
    </header>
  );
};

export default Header;

