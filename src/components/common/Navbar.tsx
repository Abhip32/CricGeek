'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { usePathname } from 'next/navigation';
import { Menu, X, Radio, Trophy, Flame } from 'lucide-react';

export const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const pathname = usePathname();

  const navLinks = [
    { href: '/', label: 'HOME' },
    { href: '/matches?tab=live', label: 'MATCHES' },
    { href: '/schedule', label: 'SCHEDULE' },
    { href: '/rankings', label: 'RANKINGS' },
  ];

  return (
    <header className="sticky top-0 z-50 w-full bg-white shadow-xs">
      {/* The Alchemists Top Ticker / Header Sub-Bar */}
      <div className="bg-slate-900 text-slate-300 text-[10px] font-heading font-bold uppercase tracking-widest px-4 sm:px-8 py-1.5 flex items-center justify-between border-b border-slate-800">
        <div className="flex items-center gap-2">
          <span className="flex h-2 w-2 relative">
            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-red-500 opacity-75" />
            <span className="relative inline-flex rounded-full h-2 w-2 bg-red-600" />
          </span>
          <span className="text-white font-black">CRICGEEK ARENA</span>
          <span className="text-slate-500 hidden sm:inline">•</span>
          <span className="text-slate-400 hidden sm:inline">LIVE CRICKET SCORES & REAL-TIME UPDATES</span>
        </div>
      </div>

      {/* Main Athletic Navigation Bar with Red Accent Underline */}
      <div className="border-b-2 border-red-600 bg-white">
        <div className="mx-auto flex h-16 max-w-7xl items-center justify-between px-4 sm:px-6 lg:px-8">
          {/* Brand Logo */}
          <Link href="/" className="flex items-center gap-2.5 group">
            <div className="relative">
              <Image
                src="/images/logo.png"
                alt="CricGeek"
                width={140}
                height={40}
                priority
                className="h-9 w-auto object-contain"
              />
            </div>
          </Link>

          {/* Desktop Athletic Navigation (The Alchemists Style) */}
          <nav className="hidden md:flex items-center gap-1 lg:gap-2">
            {navLinks.map((link) => {
              const basePath = link.href.split('?')[0];
              const isActive = pathname === basePath || (basePath !== '/' && pathname.startsWith(basePath));

              return (
                <Link
                  key={link.href}
                  href={link.href}
                  className={`relative px-4 py-2 font-heading font-extrabold text-xs tracking-wider transition-all duration-150 ${
                    isActive
                      ? 'text-red-600'
                      : 'text-slate-800 hover:text-red-600'
                  }`}
                >
                  <span>{link.label}</span>
                  {isActive && (
                    <span className="absolute bottom-[-18px] left-0 right-0 h-[3px] bg-red-600 shadow-xs" />
                  )}
                </Link>
              );
            })}
          </nav>

          {/* Right Action: Bold Red Live Matches Pill */}
          <div className="hidden md:flex items-center gap-3">
            <Link
              href="/matches?tab=live"
              className="inline-flex items-center gap-2 px-4 py-2 rounded-lg font-heading font-black text-xs uppercase tracking-wider bg-red-600 text-white hover:bg-red-700 transition-colors shadow-xs"
            >
              <Radio className="w-3.5 h-3.5 animate-pulse" />
              <span>Live Matches</span>
            </Link>
          </div>

          {/* Mobile Hamburger Button */}
          <button
            onClick={() => setIsOpen(!isOpen)}
            className="md:hidden p-2 rounded-lg text-slate-800 hover:bg-slate-100 transition-colors"
            aria-label="Toggle Menu"
          >
            {isOpen ? <X className="w-6 h-6 text-slate-900" /> : <Menu className="w-6 h-6 text-slate-900" />}
          </button>
        </div>
      </div>

      {/* Mobile Menu Drawer */}
      {isOpen && (
        <div className="md:hidden border-b-2 border-red-600 bg-white px-4 py-4 space-y-2 shadow-xl">
          {navLinks.map((link) => {
            const basePath = link.href.split('?')[0];
            const isActive = pathname === basePath || (basePath !== '/' && pathname.startsWith(basePath));
            return (
              <Link
                key={link.href}
                href={link.href}
                onClick={() => setIsOpen(false)}
                className={`block px-4 py-2.5 rounded-lg font-heading font-black text-xs uppercase tracking-wider transition-all ${
                  isActive
                    ? 'bg-red-600 text-white shadow-xs'
                    : 'text-slate-800 hover:bg-slate-100 hover:text-red-600'
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
              className="flex items-center justify-center gap-2 w-full py-2.5 rounded-lg font-heading font-black text-xs uppercase tracking-wider bg-red-600 text-white shadow-xs"
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
