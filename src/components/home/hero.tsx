'use client';

import React from 'react';
import Link from 'next/link';
import { Radio, Calendar, Trophy } from 'lucide-react';

interface HeroProps {
  image?: string;
  heading?: string;
  subtitle?: string;
  isHome?: boolean;
}

export const Hero: React.FC<HeroProps> = ({
  image = '/images/homebanner.jpeg',
  heading,
  subtitle,
  isHome = false,
}) => {
  // If dedicated subpage header (Matches, Schedule, Rankings)
  if (!isHome && heading) {
    return (
      <section
        className="relative overflow-hidden border-b border-slate-200/80 text-white min-h-[220px] sm:min-h-[250px] flex items-center"
        style={{
          backgroundImage: `linear-gradient(to right, rgba(15, 23, 42, 0.92) 0%, rgba(15, 23, 42, 0.78) 50%, rgba(220, 38, 38, 0.45) 100%), url(${image})`,
          backgroundSize: 'cover',
          backgroundPosition: 'center',
        }}
      >
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-8 sm:py-10 w-full">
          <div className="max-w-3xl space-y-2">
            <div className="inline-flex items-center gap-2 px-2.5 py-0.5 rounded-full text-[11px] font-bold bg-red-600/90 text-white tracking-wide uppercase">
              CricGeek Hub
            </div>
            <h1 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold tracking-tight text-white drop-shadow-xs">
              {heading}
            </h1>
            {subtitle && (
              <p className="text-sm sm:text-base text-slate-200 leading-relaxed max-w-2xl pt-1">
                {subtitle}
              </p>
            )}
          </div>
        </div>
      </section>
    );
  }

  // Home Page Banner with Backdrop Image
  return (
    <section
      className="relative overflow-hidden border-b border-slate-200/80 text-white min-h-[220px] sm:min-h-[250px] flex items-center"
      style={{
        backgroundImage: `linear-gradient(to right, rgba(15, 23, 42, 0.95) 0%, rgba(15, 23, 42, 0.85) 50%, rgba(220, 38, 38, 0.35) 100%), url(${image})`,
        backgroundSize: 'cover',
        backgroundPosition: 'center',
      }}
    >
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-8 sm:py-10 w-full">
        <div className="max-w-3xl space-y-3.5">
          <div className="inline-flex items-center gap-2 px-3 py-0.5 rounded-full text-xs font-bold bg-red-600/90 text-white border border-red-500/50 backdrop-blur-xs">
            <span className="relative flex h-2 w-2">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-white opacity-75" />
              <span className="relative inline-flex rounded-full h-2 w-2 bg-white" />
            </span>
            <span>LIVE MATCH ENGINE ACTIVE</span>
          </div>

          <h1 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-white tracking-tight leading-tight">
            Fastest Cricket Scores & <span className="text-red-500">Match Analytics</span>
          </h1>

          <p className="text-sm sm:text-base text-slate-200 leading-relaxed max-w-2xl">
            Stay ahead of every ball with real-time scorecards, ball-by-ball commentary, tournament schedules, and official ICC rankings.
          </p>

          <div className="flex flex-wrap items-center gap-3 pt-1">
            <Link
              href="/matches?tab=live"
              className="inline-flex items-center gap-2 px-5 py-2 rounded-lg text-sm font-bold bg-red-600 text-white hover:bg-red-700 transition-colors shadow-sm"
            >
              <Radio className="w-4 h-4" />
              <span>Live Matches</span>
            </Link>
            <Link
              href="/schedule"
              className="inline-flex items-center gap-2 px-5 py-2 rounded-lg text-sm font-bold bg-white/10 hover:bg-white/20 text-white transition-colors border border-white/20 backdrop-blur-xs"
            >
              <Calendar className="w-4 h-4 text-slate-300" />
              <span>Fixtures</span>
            </Link>
            <Link
              href="/rankings"
              className="inline-flex items-center gap-2 px-5 py-2 rounded-lg text-sm font-bold bg-white/10 hover:bg-white/20 text-white transition-colors border border-white/20 backdrop-blur-xs"
            >
              <Trophy className="w-4 h-4 text-amber-400" />
              <span>Rankings</span>
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Hero;
