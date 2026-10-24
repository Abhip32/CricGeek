'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  Radio, 
  Menu, 
  X, 
  Flame, 
  Calendar, 
  Trophy, 
  Home, 
  ChevronRight,
  Sparkles
} from 'lucide-react';

export const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const pathname = usePathname();

  const navLinks = [
    { href: '/', label: 'Home', icon: Home },
    { href: '/matches', label: 'Matches', icon: Flame },
    { href: '/schedule', label: 'Schedule', icon: Calendar },
    { href: '/scorecard', label: 'Scorecard', icon: Sparkles },
    { href: '/rankings', label: 'Rankings', icon: Trophy },
  ];

  return (
    <header className="sticky top-0 z-50 w-full border-b border-white/[0.08] bg-[#070B14]/85 backdrop-blur-xl transition-all">
      <div className="mx-auto flex h-16 max-w-7xl items-center justify-between px-4 sm:px-6 lg:px-8">
        {/* Brand Logo */}
        <Link href="/" className="flex items-center gap-2.5 group">
          <div className="relative flex h-10 w-10 items-center justify-center rounded-xl bg-gradient-to-br from-emerald-400 to-emerald-600 shadow-lg shadow-emerald-500/20 group-hover:shadow-emerald-500/40 transition-all duration-300">
            <span className="text-xl font-black text-black">🏏</span>
            <div className="absolute -inset-0.5 rounded-xl bg-emerald-400/30 blur-sm -z-10 group-hover:opacity-100 opacity-60 transition-opacity" />
          </div>
          <div className="flex flex-col">
            <div className="flex items-center gap-1.5">
              <span className="text-lg font-black tracking-tight text-white group-hover:text-emerald-400 transition-colors">
                Cric<span className="text-emerald-400">Geek</span>
              </span>
              <span className="inline-flex items-center rounded-full bg-emerald-500/10 px-1.5 py-0.2 text-[10px] font-bold text-emerald-400 border border-emerald-500/20">
                PRO
              </span>
            </div>
            <span className="text-[10px] font-medium text-slate-400 tracking-wider uppercase -mt-0.5">
              Live Cricket Hub
            </span>
          </div>
        </Link>

        {/* Desktop Navigation */}
        <nav className="hidden md:flex items-center gap-1 bg-slate-900/60 p-1.5 rounded-2xl border border-white/5 backdrop-blur-md">
          {navLinks.map((link) => {
            const isActive = pathname === link.href || (link.href !== '/' && pathname.startsWith(link.href));
            const Icon = link.icon;
            return (
              <Link
                key={link.href}
                href={link.href}
                className={`relative flex items-center gap-2 px-4 py-2 rounded-xl text-xs font-semibold transition-all duration-200 ${
                  isActive
                    ? 'text-white'
                    : 'text-slate-400 hover:text-slate-200 hover:bg-white/[0.04]'
                }`}
              >
                {isActive && (
                  <motion.div
                    layoutId="navbar-active-pill"
                    className="absolute inset-0 rounded-xl bg-gradient-to-r from-emerald-500/20 to-teal-500/20 border border-emerald-500/40 shadow-sm shadow-emerald-500/10"
                    transition={{ type: 'spring', stiffness: 380, damping: 30 }}
                  />
                )}
                <Icon className={`w-3.5 h-3.5 relative z-10 ${isActive ? 'text-emerald-400' : 'text-slate-400'}`} />
                <span className="relative z-10">{link.label}</span>
              </Link>
            );
          })}
        </nav>

        {/* Right CTA / Live Scores Action */}
        <div className="hidden md:flex items-center gap-3">
          <Link
            href="/matches"
            className="group relative inline-flex items-center gap-2 rounded-xl bg-emerald-500 px-4 py-2 text-xs font-bold text-slate-950 shadow-lg shadow-emerald-500/20 hover:bg-emerald-400 hover:shadow-emerald-500/30 transition-all duration-200"
          >
            <span className="relative flex h-2 w-2">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-slate-900 opacity-75"></span>
              <span className="relative inline-flex rounded-full h-2 w-2 bg-slate-900"></span>
            </span>
            <span>Live Action</span>
            <ChevronRight className="w-3.5 h-3.5 transition-transform group-hover:translate-x-0.5" />
          </Link>
        </div>

        {/* Mobile Hamburger Button */}
        <button
          onClick={() => setIsOpen(!isOpen)}
          className="flex md:hidden items-center justify-center p-2 rounded-xl bg-slate-900/80 border border-white/10 text-slate-300 hover:text-white"
          aria-label="Toggle Navigation Menu"
        >
          {isOpen ? <X className="w-5 h-5 text-emerald-400" /> : <Menu className="w-5 h-5" />}
        </button>
      </div>

      {/* Mobile Drawer Menu */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.25, ease: 'easeInOut' }}
            className="md:hidden border-b border-white/10 bg-[#070B14]/95 backdrop-blur-2xl overflow-hidden px-4 py-5"
          >
            <div className="flex flex-col gap-2">
              {navLinks.map((link) => {
                const isActive = pathname === link.href;
                const Icon = link.icon;
                return (
                  <Link
                    key={link.href}
                    href={link.href}
                    onClick={() => setIsOpen(false)}
                    className={`flex items-center justify-between p-3 rounded-xl text-sm font-semibold transition-all ${
                      isActive
                        ? 'bg-emerald-500/15 text-emerald-400 border border-emerald-500/30'
                        : 'text-slate-300 hover:bg-white/[0.04]'
                    }`}
                  >
                    <div className="flex items-center gap-3">
                      <Icon className="w-4 h-4 text-emerald-400" />
                      <span>{link.label}</span>
                    </div>
                    <ChevronRight className="w-4 h-4 text-slate-500" />
                  </Link>
                );
              })}

              <Link
                href="/matches"
                onClick={() => setIsOpen(false)}
                className="mt-3 flex items-center justify-center gap-2 p-3 rounded-xl bg-gradient-to-r from-emerald-500 to-teal-500 text-slate-950 font-bold text-sm shadow-lg shadow-emerald-500/20"
              >
                <Radio className="w-4 h-4" />
                <span>Explore All Matches</span>
              </Link>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
};

export default Navbar;
