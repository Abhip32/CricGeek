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
    <header className="sticky top-0 z-50 w-full bg-[#0c0a13]/80 backdrop-blur-xl border-b border-white/[0.08] shadow-[0_4px_30px_rgba(0,0,0,0.5)] transition-all">
      <div className="mx-auto flex h-16 max-w-7xl items-center justify-between px-4 sm:px-6 lg:px-8">
        {/* Brand Logo - original logo.png */}
        <Link href="/" className="flex items-center gap-2 group">
          <Image
            src="/images/logo.png"
            alt="CricGeek Logo"
            width={140}
            height={42}
            priority
            className="h-9 w-auto object-contain drop-shadow-[0_0_12px_rgba(220,38,38,0.45)] group-hover:scale-105 transition-transform"
          />
        </Link>

        {/* Desktop Navigation */}
        <nav className="hidden md:flex items-center gap-1.5">
          {navLinks.map((link) => {
            const basePath = link.href.split('?')[0];
            const isActive = pathname === basePath || (basePath !== '/' && pathname.startsWith(basePath));
            return (
              <Link
                key={link.href}
                href={link.href}
                className={`relative px-4 py-2 text-sm font-semibold transition-all duration-200 rounded-xl ${
                  isActive
                    ? 'text-white bg-white/[0.08] border border-red-500/35 shadow-[0_0_15px_rgba(220,38,38,0.25)]'
                    : 'text-slate-300 hover:text-white hover:bg-white/[0.06] border border-transparent'
                }`}
              >
                {link.label}
                {isActive && (
                  <span className="absolute bottom-0 left-3 right-3 h-0.5 bg-gradient-to-r from-red-600 to-red-400 rounded-full shadow-[0_0_8px_rgba(239,68,68,0.9)]" />
                )}
              </Link>
            );
          })}
        </nav>

        {/* Right Action: Live Cricket shortcut */}
        <div className="hidden md:flex items-center gap-3">
          <Link
            href="/matches?tab=live"
            className="inline-flex items-center gap-2 px-4 py-2 rounded-full text-xs font-bold bg-gradient-to-r from-red-600 to-red-500 hover:from-red-500 hover:to-red-600 text-white transition-all shadow-[0_0_20px_rgba(220,38,38,0.5)] border border-red-400/30"
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
          className="md:hidden p-2 rounded-xl text-slate-300 hover:text-white hover:bg-white/10 transition-colors"
          aria-label="Toggle Menu"
        >
          {isOpen ? <X className="w-6 h-6 text-white" /> : <Menu className="w-6 h-6 text-white" />}
        </button>
      </div>

      {/* Mobile Drawer */}
      {isOpen && (
        <div className="md:hidden border-t border-white/[0.08] bg-[#0c0a13]/95 backdrop-blur-2xl px-4 py-4 space-y-2 shadow-2xl">
          {navLinks.map((link) => {
            const basePath = link.href.split('?')[0];
            const isActive = pathname === basePath || (basePath !== '/' && pathname.startsWith(basePath));
            return (
              <Link
                key={link.href}
                href={link.href}
                onClick={() => setIsOpen(false)}
                className={`block px-4 py-2.5 rounded-xl text-sm font-semibold transition-all ${
                  isActive
                    ? 'text-white bg-white/[0.08] border border-red-500/35 font-bold shadow-[0_0_15px_rgba(220,38,38,0.25)]'
                    : 'text-slate-300 hover:bg-white/[0.05] hover:text-white'
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
              className="flex items-center justify-center gap-2 w-full py-2.5 rounded-xl text-sm font-bold bg-gradient-to-r from-red-600 to-red-500 text-white shadow-[0_0_20px_rgba(220,38,38,0.4)] border border-red-400/30"
            >
              <Radio className="w-4 h-4" />
              <span>Live Matches</span>
            </Link>
          </div>
        </div>
      )}
    </header>
  );
};

export default Navbar;
