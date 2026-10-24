import React from 'react';
import Link from 'next/link';
import Image from 'next/image';

export const Footer = () => {
  return (
    <footer className="w-full bg-white border-t border-slate-200 mt-auto">
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
              CricGeek is a high-performance cricket platform providing real-time match scores, ball-by-ball scorecards, tournament fixtures, and official ICC team and player rankings.
            </p>
            <div className="flex items-center gap-2 text-xs text-red-600 font-bold pt-1">
              <span className="relative flex h-2 w-2">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-red-600 opacity-75" />
                <span className="relative inline-flex rounded-full h-2 w-2 bg-red-600" />
              </span>
              <span>Live Engine Connected</span>
            </div>
          </div>

          {/* Quick Links */}
          <div className="space-y-3">
            <h4 className="text-xs font-bold uppercase tracking-wider text-slate-900">
              Quick Links
            </h4>
            <ul className="space-y-2 text-xs text-slate-600">
              <li>
                <Link href="/" className="hover:text-red-600 transition-colors">
                  Home
                </Link>
              </li>
              <li>
                <Link href="/matches" className="hover:text-red-600 transition-colors">
                  All Matches
                </Link>
              </li>
              <li>
                <Link href="/schedule" className="hover:text-red-600 transition-colors">
                  Match Schedule
                </Link>
              </li>
              <li>
                <Link href="/rankings" className="hover:text-red-600 transition-colors">
                  ICC Rankings
                </Link>
              </li>
            </ul>
          </div>

          {/* Formats & Tournaments */}
          <div className="space-y-3">
            <h4 className="text-xs font-bold uppercase tracking-wider text-slate-900">
              Tournaments
            </h4>
            <ul className="space-y-2 text-xs text-slate-600">
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
                  Test Championships
                </Link>
              </li>
              <li>
                <Link href="/rankings" className="hover:text-red-600 transition-colors">
                  Player & Team Leaderboards
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
