'use client';

import React from 'react';
import Link from 'next/link';
import { Radio, Github, Twitter, Heart, Shield, Globe } from 'lucide-react';

export const Footer = () => {
  return (
    <footer className="border-t border-white/[0.08] bg-[#050811] text-slate-400 mt-20 relative overflow-hidden">
      {/* Glow highlight */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-3/4 h-[1px] bg-gradient-to-r from-transparent via-emerald-500/50 to-transparent" />

      <div className="mx-auto max-w-7xl px-4 py-12 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8 mb-12">
          {/* Brand info */}
          <div className="md:col-span-1 space-y-4">
            <Link href="/" className="flex items-center gap-2.5">
              <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-gradient-to-br from-emerald-400 to-emerald-600 text-black font-black text-lg">
                🏏
              </div>
              <span className="text-xl font-black tracking-tight text-white">
                Cric<span className="text-emerald-400">Geek</span>
              </span>
            </Link>
            <p className="text-xs text-slate-400 leading-relaxed">
              Your high-octane modern cricket companion. Real-time ball-by-ball updates, live match scorecards, series standings, and breaking headlines.
            </p>
            <div className="flex items-center gap-2 text-xs text-emerald-400 font-semibold">
              <span className="relative flex h-2 w-2">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
                <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-500"></span>
              </span>
              <span>Live Engine Connected</span>
            </div>
          </div>

          {/* Quick Links */}
          <div className="space-y-3">
            <h4 className="text-xs font-bold uppercase tracking-wider text-slate-200">
              Live Navigation
            </h4>
            <ul className="space-y-2 text-xs">
              <li>
                <Link href="/" className="hover:text-emerald-400 transition-colors">
                  Home Overview
                </Link>
              </li>
              <li>
                <Link href="/matches" className="hover:text-emerald-400 transition-colors">
                  Live & Recent Matches
                </Link>
              </li>
              <li>
                <Link href="/schedule" className="hover:text-emerald-400 transition-colors">
                  Upcoming Tournaments
                </Link>
              </li>
              <li>
                <Link href="/rankings" className="hover:text-emerald-400 transition-colors">
                  Official ICC Rankings
                </Link>
              </li>
            </ul>
          </div>

          {/* Featured Formats */}
          <div className="space-y-3">
            <h4 className="text-xs font-bold uppercase tracking-wider text-slate-200">
              Cricket Formats
            </h4>
            <ul className="space-y-2 text-xs">
              <li className="flex items-center justify-between">
                <span>T20 Internationals</span>
                <span className="px-1.5 py-0.5 rounded bg-slate-800 text-[10px] text-slate-400">Fast</span>
              </li>
              <li className="flex items-center justify-between">
                <span>One Day Internationals (ODI)</span>
                <span className="px-1.5 py-0.5 rounded bg-slate-800 text-[10px] text-slate-400">50 Ov</span>
              </li>
              <li className="flex items-center justify-between">
                <span>ICC Test Championship</span>
                <span className="px-1.5 py-0.5 rounded bg-slate-800 text-[10px] text-slate-400">Red Ball</span>
              </li>
              <li className="flex items-center justify-between">
                <span>Women's Premier Leagues</span>
                <span className="px-1.5 py-0.5 rounded bg-slate-800 text-[10px] text-emerald-400">Featured</span>
              </li>
            </ul>
          </div>

          {/* Platform Info & Developer */}
          <div className="space-y-3">
            <h4 className="text-xs font-bold uppercase tracking-wider text-slate-200">
              Technology
            </h4>
            <p className="text-xs text-slate-400 leading-relaxed">
              Powered by high-performance Puppeteer & Next.js scraper architecture with multi-tier in-memory TTL caching and auto-recovering Chromium cluster.
            </p>
            <div className="pt-2">
              <span className="inline-flex items-center gap-1.5 text-xs text-slate-300">
                Crafted with <Heart className="w-3.5 h-3.5 text-red-500 fill-red-500 inline" /> by{' '}
                <span className="font-bold text-white hover:text-emerald-400 transition-colors">
                  Abhip32
                </span>
              </span>
            </div>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="border-t border-white/[0.06] pt-6 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-slate-400">
          <p>© {new Date().getFullYear()} CricGeek. All live scores, statistics, and trademarks are property of their respective cricket boards.</p>
          <div className="flex items-center gap-6">
            <span className="flex items-center gap-1.5">
              <Globe className="w-3.5 h-3.5 text-emerald-400" />
              Global Edition
            </span>
            <span className="flex items-center gap-1.5">
              <Shield className="w-3.5 h-3.5 text-cyan-400" />
              High Speed REST API
            </span>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
