"use client";
import HeaderLinks from "@/components/header/HeaderLinks";
import { MenuIcon } from 'lucide-react';
import Link from "next/link";
import { useState, useEffect } from "react";

import { CgClose } from "react-icons/cg";

const links = [
  { label: "Creator", href: "#" },
  { label: "About", href: "about" },
];

const Header = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isMenuActive, setIsMenuActive] = useState('');

  useEffect(() => {
    const savedActiveMenu = localStorage.getItem('activeMenu');
    if (savedActiveMenu) {
      setIsMenuActive(savedActiveMenu);
    } else {
      setIsMenuActive('Creator');
    }

    const handleStorageChange = (e: StorageEvent) => {
      if (e.key === 'activeMenu') {
        setIsMenuActive(e.newValue || 'Creator');
      }
    };

    const handleCustomEvent = (e: CustomEvent) => {
      setIsMenuActive(e.detail || 'Creator');
    };

    window.addEventListener('storage', handleStorageChange);
    window.addEventListener('activeMenuChanged', handleCustomEvent as EventListener);

    return () => {
      window.removeEventListener('storage', handleStorageChange);
      window.removeEventListener('activeMenuChanged', handleCustomEvent as EventListener);
    };
  }, []);

  const handleMenuClick = (label: string) => {
    setIsMenuOpen(false);
    setIsMenuActive(label);
    localStorage.setItem('activeMenu', label);
    window.dispatchEvent(new CustomEvent('activeMenuChanged', { detail: label }));
  };

  return (
    <header className="py-4 md:py-10 mx-auto w-full px-4 sm:px-6 lg:px-8 header-module">
      <nav className="relative z-50 flex justify-between items-center">
        <div className="flex items-center md:gap-x-12 flex-1">
          <Link
            href="/"
            aria-label="Monika Al"
            className="flex items-center space-x-1 font-bold text-3xl"
          >
            Monika Al
          </Link>
        </div>

        <ul className="hidden md:flex items-center justify-center gap-6 header-menu"

        >
          {links.map((link) => (
            <li
              key={link.label}
              onClick={() => handleMenuClick(link.label)}
              className={isMenuActive === link.label ? "menu-active" : ""}
            >
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
            <div className="fixed top-0 left-0 w-full z-99999">
              <div className="p-5 bg-background border rounded shadow-sm">
                <div className="flex items-center justify-between mb-4">
                  <div>
                    <Link
                      href="/"
                      aria-label="Landing Page Boilerplate"
                      title="Landing Page Boilerplate"
                      className="inline-flex items-center"
                    >
                      <span className="text-2xl font-bold tracking-wide ">
                        Monika Al
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
                  <ul className="space-y-2" style={{
                    opacity: "0.8",
                  }}>
                    {links.map((link) => (
                      <li key={link.label} className="p-2 flex" style={{
                        background: "#000000",
                        borderRadius: "8px"
                      }}>
                        <Link
                          href={`/${link.href}`}
                          aria-label={link.label}
                          title={link.label}
                          className="w-full font-medium tracking-wide transition-colors duration-200 hover:text-deep-purple-accent-400 flex"
                          onClick={() => handleMenuClick(link.label)}
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

