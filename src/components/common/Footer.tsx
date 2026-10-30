import React from 'react';
import Link from 'next/link';
import Image from 'next/image';

export const Footer = () => {
  return (
    <footer className="w-full bg-white border-t-4 border-red-600 mt-auto">
      <div className="mx-auto max-w-7xl px-4 py-10 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          {/* Brand Info */}
          <div className="md:col-span-2 space-y-3">
            <Link href="/" className="inline-block">
              <Image
                src="/images/logo.png"
                alt="CricGeek"
                width={130}
                height={40}
                className="h-8 w-auto object-contain"
              />
            </Link>
            <p className="text-xs text-slate-600 max-w-md leading-relaxed">
              CricGeek is a high-performance cricket portal providing real-time ball-by-ball scorecards, tournament standings, official ICC team and player rankings, and verified editorial coverage.
            </p>
            <div className="flex items-center gap-2 text-xs text-red-600 font-heading font-black tracking-wider uppercase pt-1">
              <span className="relative flex h-2 w-2">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-red-600 opacity-75" />
                <span className="relative inline-flex rounded-full h-2 w-2 bg-red-600" />
              </span>
              <span>LIVE ENGINE CONNECTED</span>
            </div>
          </div>

          {/* Quick Links */}
          <div className="space-y-3">
            <h4 className="text-xs font-heading font-black uppercase tracking-wider text-slate-900 flex items-center gap-1.5">
              <span className="w-1 h-3 bg-red-600 rounded-full" />
              Navigation
            </h4>
            <ul className="space-y-2 text-xs font-medium text-slate-600">
              <li>
                <Link href="/" className="hover:text-red-600 transition-colors">
                  Home Arena
                </Link>
              </li>
              <li>
                <Link href="/matches?tab=live" className="hover:text-red-600 transition-colors">
                  Live Match Center
                </Link>
              </li>
              <li>
                <Link href="/schedule" className="hover:text-red-600 transition-colors">
                  Match Schedule & Fixtures
                </Link>
              </li>
              <li>
                <Link href="/rankings" className="hover:text-red-600 transition-colors">
                  ICC World Rankings
                </Link>
              </li>
            </ul>
          </div>

          {/* Formats & Tournaments */}
          <div className="space-y-3">
            <h4 className="text-xs font-heading font-black uppercase tracking-wider text-slate-900 flex items-center gap-1.5">
              <span className="w-1 h-3 bg-red-600 rounded-full" />
              Competitions
            </h4>
            <ul className="space-y-2 text-xs font-medium text-slate-600">
              <li>
                <Link href="/matches?format=t20" className="hover:text-red-600 transition-colors">
                  T20 Internationals & Leagues
                </Link>
              </li>
              <li>
                <Link href="/matches?format=odi" className="hover:text-red-600 transition-colors">
                  One Day Internationals
                </Link>
              </li>
              <li>
                <Link href="/matches?format=test" className="hover:text-red-600 transition-colors">
                  ICC World Test Championship
                </Link>
              </li>
              <li>
                <Link href="/matches?tab=standings" className="hover:text-red-600 transition-colors">
                  Tournament Points Table
                </Link>
              </li>
            </ul>
          </div>
        </div>

        <div className="mt-8 pt-6 border-t border-slate-100 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-slate-500">
          <p>© {new Date().getFullYear()} CricGeek. All rights reserved.</p>
          <p className="flex items-center gap-1.5 font-medium">
            Developed with ❤️ by <span className="text-slate-800 font-bold">Abhishek Patil</span>
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
