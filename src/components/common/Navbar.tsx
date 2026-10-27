'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { usePathname } from 'next/navigation';
import { Menu, X, Radio } from 'lucide-react';

export const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const pathname = usePathname();

  const navLinks = [
    { href: '/', label: 'Home' },
    { href: '/matches?tab=live', label: 'Matches' },
    { href: '/schedule', label: 'Schedule' },
    { href: '/rankings', label: 'Rankings' },
  ];

  return (
    <header className="sticky top-0 z-50 w-full bg-white border-b border-slate-200 shadow-xs transition-all">
      <div className="mx-auto flex h-16 max-w-7xl items-center justify-between px-4 sm:px-6 lg:px-8">
        {/* Brand Logo */}
        <Link href="/" className="flex items-center gap-2">
          <Image
            src="/images/logo.png"
            alt="CricGeek Logo"
            width={140}
            height={42}
            priority
            className="h-9 w-auto object-contain"
          />
        </Link>

        {/* Desktop Navigation - Complete Rounded Pill Variant */}
        <nav className="hidden md:flex items-center gap-1.5 bg-slate-100/90 p-1 rounded-full border border-slate-200/90">
          {navLinks.map((link) => {
            const basePath = link.href.split('?')[0];
            const isActive = pathname === basePath || (basePath !== '/' && pathname.startsWith(basePath));
            return (
              <Link
                key={link.href}
                href={link.href}
                className={`relative px-4 py-1.5 text-xs sm:text-sm font-bold transition-all duration-200 rounded-full ${
                  isActive
                    ? 'bg-red-600 text-white shadow-xs'
                    : 'text-slate-700 hover:text-red-600 hover:bg-white/80'
                }`}
              >
                {link.label}
              </Link>
            );
          })}
        </nav>

        {/* Right Action: Live Matches button */}
        <div className="hidden md:flex items-center gap-3">
          <Link
            href="/matches?tab=live"
            className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full text-xs font-bold bg-red-600 text-white hover:bg-red-700 transition-colors shadow-xs"
          >
            <span className="relative flex h-2 w-2">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-white opacity-75" />
              <span className="relative inline-flex rounded-full h-2 w-2 bg-white" />
            </span>
            <span>Live Matches</span>
          </Link>
        </div>

        {/* Mobile Hamburger Button */}
        <button
          onClick={() => setIsOpen(!isOpen)}
          className="md:hidden p-2 rounded-lg text-slate-700 hover:bg-slate-100 transition-colors"
          aria-label="Toggle Menu"
        >
          {isOpen ? <X className="w-6 h-6 text-slate-900" /> : <Menu className="w-6 h-6 text-slate-900" />}
        </button>
      </div>

      {/* Mobile Drawer */}
      {isOpen && (
        <div className="md:hidden border-t border-slate-200 bg-white px-4 py-4 space-y-2 shadow-lg">
          {navLinks.map((link) => {
            const basePath = link.href.split('?')[0];
            const isActive = pathname === basePath || (basePath !== '/' && pathname.startsWith(basePath));
            return (
              <Link
                key={link.href}
                href={link.href}
                onClick={() => setIsOpen(false)}
                className={`block px-4 py-2.5 rounded-full text-sm font-bold transition-all ${
                  isActive
                    ? 'bg-red-600 text-white shadow-xs'
                    : 'text-slate-700 hover:bg-slate-100 hover:text-red-600'
                }`}
              >
                {link.label}
              </Link>
            );
          })}

          <div className="pt-2">
            <Link
              href="/matches?tab=live"
              onClick={() => setIsOpen(false)}
              className="flex items-center justify-center gap-2 w-full py-2.5 rounded-lg text-sm font-bold bg-red-600 text-white shadow-xs"
            >
              <Radio className="w-4 h-4 animate-pulse" />
              <span>Live Matches</span>
            </Link>
          </div>
        </div>
      )}
    </header>
  );
};

export default Navbar;
