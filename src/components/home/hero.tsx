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
  return (
    <header className="relative w-full overflow-hidden border-b border-white/[0.08]">
      {/* Background Image Container with dark glass gradient */}
      <div
        className="relative w-full min-h-[220px] sm:min-h-[280px] md:min-h-[320px] lg:min-h-[360px] 2xl:min-h-[400px] flex items-center"
        style={{
          backgroundImage: `linear-gradient(to right, rgba(9, 8, 14, 0.94) 0%, rgba(9, 8, 14, 0.78) 55%, rgba(220, 38, 38, 0.22) 100%), url(${image})`,
          backgroundSize: 'cover',
          backgroundPosition: 'center 35%',
          backgroundRepeat: 'no-repeat',
        }}
      >
        <div className="relative z-10 mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-10 sm:py-14 md:py-16 w-full">
          {/* Subpage Hero Content */}
          {!isHome && heading ? (
            <div className="max-w-3xl space-y-3">
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full text-[10px] sm:text-xs font-bold bg-red-500/20 text-red-400 border border-red-500/40 tracking-wider uppercase shadow-[0_0_15px_rgba(220,38,38,0.3)] backdrop-blur-md">
                CricGeek Hub
              </div>
              <h1 className="text-2xl sm:text-4xl md:text-5xl font-extrabold tracking-tight text-white drop-shadow-[0_4px_12px_rgba(0,0,0,0.8)] break-words leading-tight">
                {heading}
              </h1>
              {subtitle && (
                <p className="text-xs sm:text-base text-slate-300 leading-relaxed max-w-2xl pt-1">
                  {subtitle}
                </p>
              )}
            </div>
          ) : (
            /* Home Page Hero Content */
            <div className="max-w-3xl space-y-4">
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full text-[10px] sm:text-xs font-bold bg-red-500/20 text-red-400 border border-red-500/40 backdrop-blur-md shadow-[0_0_18px_rgba(220,38,38,0.35)]">
                <span className="relative flex h-2 w-2">
                  <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-red-400 opacity-75" />
                  <span className="relative inline-flex rounded-full h-2 w-2 bg-red-500" />
                </span>
                <span>LIVE MATCH ENGINE ACTIVE</span>
              </div>

              <h1 className="text-2xl sm:text-4xl md:text-5xl lg:text-6xl font-extrabold text-white tracking-tight leading-tight drop-shadow-[0_4px_16px_rgba(0,0,0,0.8)] break-words">
                Fastest Cricket Scores & <span className="text-transparent bg-clip-text bg-gradient-to-r from-red-500 via-rose-400 to-red-500">Match Analytics</span>
              </h1>

              <p className="text-xs sm:text-base text-slate-300 leading-relaxed max-w-2xl">
                Stay ahead of every ball with real-time scorecards, ball-by-ball commentary, tournament schedules, and official ICC rankings.
              </p>

              <div className="flex flex-wrap items-center gap-3 pt-2">
                <Link
                  href="/matches?tab=live"
                  className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl text-xs sm:text-sm font-bold bg-gradient-to-r from-red-600 to-red-500 hover:from-red-500 hover:to-red-600 text-white transition-all shadow-[0_0_20px_rgba(220,38,38,0.5)] border border-red-400/30"
                >
                  <Radio className="w-3.5 h-3.5 sm:w-4 sm:h-4" />
                  <span>Live Matches</span>
                </Link>
                <Link
                  href="/schedule"
                  className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl text-xs sm:text-sm font-bold bg-white/[0.06] hover:bg-white/[0.12] text-slate-200 hover:text-white transition-all border border-white/10 hover:border-red-500/30 backdrop-blur-md shadow-sm"
                >
                  <Calendar className="w-3.5 h-3.5 sm:w-4 sm:h-4 text-slate-400" />
                  <span>Fixtures</span>
                </Link>
                <Link
                  href="/rankings"
                  className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl text-xs sm:text-sm font-bold bg-white/[0.06] hover:bg-white/[0.12] text-slate-200 hover:text-white transition-all border border-white/10 hover:border-red-500/30 backdrop-blur-md shadow-sm"
                >
                  <Trophy className="w-3.5 h-3.5 sm:w-4 sm:h-4 text-amber-400" />
                  <span>Rankings</span>
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
