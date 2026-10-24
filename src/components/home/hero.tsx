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
    <header className="relative w-full overflow-hidden border-b border-slate-200">
      {/* Background Image Container with responsive aspect ratio */}
      <div
        className="relative w-full min-h-[220px] sm:min-h-[280px] md:min-h-[320px] lg:min-h-[360px] 2xl:min-h-[400px] flex items-center"
        style={{
          backgroundImage: `linear-gradient(to right, rgba(0, 0, 0, 0.88) 0%, rgba(0, 0, 0, 0.65) 55%, rgba(220, 38, 38, 0.25) 100%), url(${image})`,
          backgroundSize: 'cover',
          backgroundPosition: 'center 35%',
          backgroundRepeat: 'no-repeat',
        }}
      >
        <div className="relative z-10 mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-10 sm:py-14 md:py-16 w-full">
          {/* Subpage Hero Content */}
          {!isHome && heading ? (
            <div className="max-w-3xl space-y-2.5">
              <div className="inline-flex items-center gap-2 px-2.5 py-0.5 rounded-full text-[10px] sm:text-[11px] font-bold bg-red-600/90 text-white tracking-wide uppercase shadow-sm">
                CricGeek Hub
              </div>
              <h1 className="text-2xl sm:text-4xl md:text-5xl font-extrabold tracking-tight text-white drop-shadow-md break-words leading-tight">
                {heading}
              </h1>
              {subtitle && (
                <p className="text-xs sm:text-base text-slate-200 leading-relaxed max-w-2xl pt-1 drop-shadow-sm">
                  {subtitle}
                </p>
              )}
            </div>
          ) : (
            /* Home Page Hero Content */
            <div className="max-w-3xl space-y-3.5">
              <div className="inline-flex items-center gap-2 px-3 py-0.5 rounded-full text-[10px] sm:text-xs font-bold bg-red-600/90 text-white border border-red-500/50 backdrop-blur-xs shadow-sm">
                <span className="relative flex h-2 w-2">
                  <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-white opacity-75" />
                  <span className="relative inline-flex rounded-full h-2 w-2 bg-white" />
                </span>
                <span>LIVE MATCH ENGINE ACTIVE</span>
              </div>

              <h1 className="text-2xl sm:text-4xl md:text-5xl lg:text-6xl font-extrabold text-white tracking-tight leading-tight drop-shadow-md break-words">
                Fastest Cricket Scores & <span className="text-red-500">Match Analytics</span>
              </h1>

              <p className="text-xs sm:text-base text-slate-200 leading-relaxed max-w-2xl drop-shadow-sm">
                Stay ahead of every ball with real-time scorecards, ball-by-ball commentary, tournament schedules, and official ICC rankings.
              </p>

              <div className="flex flex-wrap items-center gap-2.5 sm:gap-3 pt-2">
                <Link
                  href="/matches?tab=live"
                  className="inline-flex items-center gap-2 px-4 sm:px-5 py-2.5 rounded-lg text-xs sm:text-sm font-bold bg-red-600 text-white hover:bg-red-700 transition-colors shadow-sm"
                >
                  <Radio className="w-3.5 h-3.5 sm:w-4 sm:h-4" />
                  <span>Live Matches</span>
                </Link>
                <Link
                  href="/schedule"
                  className="inline-flex items-center gap-2 px-4 sm:px-5 py-2.5 rounded-lg text-xs sm:text-sm font-bold bg-white/10 hover:bg-white/20 text-white transition-colors border border-white/20 backdrop-blur-xs"
                >
                  <Calendar className="w-3.5 h-3.5 sm:w-4 sm:h-4 text-slate-300" />
                  <span>Fixtures</span>
                </Link>
                <Link
                  href="/rankings"
                  className="inline-flex items-center gap-2 px-4 sm:px-5 py-2.5 rounded-lg text-xs sm:text-sm font-bold bg-white/10 hover:bg-white/20 text-white transition-colors border border-white/20 backdrop-blur-xs"
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
