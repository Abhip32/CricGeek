import React from 'react';
import Link from 'next/link';
import Image from 'next/image';

export const Footer = () => {
  return (
    <footer className="w-full bg-[#08070d]/80 backdrop-blur-xl border-t border-white/[0.08] mt-auto">
      <div className="mx-auto max-w-7xl px-4 py-10 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          {/* Brand Info */}
          <div className="md:col-span-2 space-y-3">
            <Link href="/" className="inline-block group">
              <Image
                src="/images/logo.png"
                alt="CricGeek"
                width={130}
                height={40}
                className="h-8 w-auto object-contain drop-shadow-[0_0_12px_rgba(220,38,38,0.45)] group-hover:scale-105 transition-transform"
              />
            </Link>
            <p className="text-xs text-slate-400 max-w-md leading-relaxed">
              CricGeek is an ultra-fast, premium cricket intelligence platform providing real-time scores, ball-by-ball scorecards, tournament fixtures, and official ICC rankings.
            </p>
            <div className="flex items-center gap-2 text-xs text-red-400 font-bold pt-1">
              <span className="relative flex h-2 w-2">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-red-500 opacity-75" />
                <span className="relative inline-flex rounded-full h-2 w-2 bg-red-500" />
              </span>
              <span>Live Engine Connected</span>
            </div>
          </div>

          {/* Quick Links */}
          <div className="space-y-3">
            <h4 className="text-xs font-bold uppercase tracking-wider text-slate-200">
              Quick Links
            </h4>
            <ul className="space-y-2 text-xs text-slate-400">
              <li>
                <Link href="/" className="hover:text-red-400 transition-colors">
                  Home
                </Link>
              </li>
              <li>
                <Link href="/matches?tab=live" className="hover:text-red-400 transition-colors">
                  All Matches
                </Link>
              </li>
              <li>
                <Link href="/schedule" className="hover:text-red-400 transition-colors">
                  Match Schedule
                </Link>
              </li>
              <li>
                <Link href="/rankings" className="hover:text-red-400 transition-colors">
                  ICC Rankings
                </Link>
              </li>
            </ul>
          </div>

          {/* Formats & Tournaments */}
          <div className="space-y-3">
            <h4 className="text-xs font-bold uppercase tracking-wider text-slate-200">
              Tournaments
            </h4>
            <ul className="space-y-2 text-xs text-slate-400">
              <li>
                <Link href="/matches?format=t20" className="hover:text-red-400 transition-colors">
                  T20 Internationals & Leagues
                </Link>
              </li>
              <li>
                <Link href="/matches?format=odi" className="hover:text-red-400 transition-colors">
                  One Day Internationals
                </Link>
              </li>
              <li>
                <Link href="/matches?format=test" className="hover:text-red-400 transition-colors">
                  Test Championships
                </Link>
              </li>
              <li>
                <Link href="/rankings" className="hover:text-red-400 transition-colors">
                  Player & Team Leaderboards
                </Link>
              </li>
            </ul>
          </div>
        </div>

        <div className="mt-8 pt-6 border-t border-white/[0.08] flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-slate-400">
          <p>© {new Date().getFullYear()} CricGeek. All rights reserved.</p>
          <p className="flex items-center gap-1.5 font-medium">
            Crafted with ❤️ by <span className="text-white font-bold">Abhishek Patil</span>
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
