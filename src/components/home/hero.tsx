'use client';

import React from 'react';
import Link from 'next/link';
import { Radio, Calendar, Trophy, Sparkles } from 'lucide-react';

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
  return (
    <header className="relative w-full overflow-hidden border-b border-slate-200">
      <div
        className="relative w-full min-h-[220px] sm:min-h-[280px] md:min-h-[340px] flex items-center"
        style={{
          backgroundImage: `linear-gradient(to right, rgba(15, 23, 42, 0.90) 0%, rgba(15, 23, 42, 0.75) 55%, rgba(220, 38, 38, 0.25) 100%), url(${image})`,
          backgroundSize: 'cover',
          backgroundPosition: 'center 35%',
          backgroundRepeat: 'no-repeat',
        }}
      >
        <div className="relative z-10 mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-8 sm:py-12 md:py-16 w-full">
          {!isHome && heading ? (
            <div className="max-w-3xl space-y-2.5">
              <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-[11px] font-black uppercase tracking-wider bg-red-600/30 text-red-300 border border-red-500/40 backdrop-blur-md">
                <Sparkles className="w-3 h-3 text-red-300" />
                <span>CricGeek Sports Engine</span>
              </div>
              <h1 className="text-2xl sm:text-4xl md:text-5xl font-black tracking-tight text-white drop-shadow-xl break-words leading-tight">
                {heading}
              </h1>
              {subtitle && (
                <p className="text-xs sm:text-base text-slate-200 leading-relaxed max-w-2xl drop-shadow-md font-medium">
                  {subtitle}
                </p>
              )}
            </div>
          ) : (
            <div className="max-w-3xl space-y-3.5">
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full text-xs font-black uppercase tracking-wider bg-red-600/30 text-red-300 border border-red-500/40 backdrop-blur-md">
                <span className="relative flex h-2 w-2">
                  <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-red-400 opacity-75" />
                  <span className="relative inline-flex rounded-full h-2 w-2 bg-red-500" />
                </span>
                <span>REAL-TIME CRICKET ENGINE</span>
              </div>

              <h1 className="text-3xl sm:text-5xl md:text-6xl font-black text-white tracking-tight leading-tight drop-shadow-2xl break-words">
                Fastest Cricket Scores &{' '}
                <span className="text-red-500">
                  Live Analytics
                </span>
              </h1>

              <p className="text-xs sm:text-base text-slate-200 leading-relaxed max-w-2xl drop-shadow-md font-medium">
                Live ball-by-ball scorecards, player impact analytics (MVP), Cricbuzz photo galleries, tournament schedules, and official ICC rankings.
              </p>

              <div className="flex flex-wrap items-center gap-3 pt-2">
                <Link
                  href="/matches?tab=live"
                  className="inline-flex items-center gap-2 px-5 py-2.5 rounded-full text-xs sm:text-sm font-black uppercase tracking-wider bg-red-600 hover:bg-red-700 text-white shadow-md transition-all duration-200"
                >
                  <Radio className="w-4 h-4 animate-pulse" />
                  <span>Live Matches</span>
                </Link>
                <Link
                  href="/schedule"
                  className="inline-flex items-center gap-2 px-5 py-2.5 rounded-full text-xs sm:text-sm font-bold bg-white/10 hover:bg-white/20 text-white backdrop-blur-md border border-white/20 transition-all"
                >
                  <Calendar className="w-4 h-4 text-slate-200" />
                  <span>Fixtures</span>
                </Link>
                <Link
                  href="/rankings"
                  className="inline-flex items-center gap-2 px-5 py-2.5 rounded-full text-xs sm:text-sm font-bold bg-white/10 hover:bg-white/20 text-white backdrop-blur-md border border-white/20 transition-all"
                >
                  <Trophy className="w-4 h-4 text-amber-300" />
                  <span>ICC Rankings</span>
                </Link>
              </div>
            </div>
          )}
        </div>
      </div>
    </header>
  );
};

export default Hero;
