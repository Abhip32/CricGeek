'use client';

import React from 'react';
import Link from 'next/link';
import { Radio, Calendar, Trophy, Flame, Zap, Shield } from 'lucide-react';

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
    <section className="relative w-full overflow-hidden border-b-2 border-red-600 bg-slate-950">
      {/* Dynamic Background Image with Red-Carbon Sports Gradients */}
      <div
        className="relative w-full min-h-[240px] sm:min-h-[300px] md:min-h-[360px] flex items-center"
        style={{
          backgroundImage: `linear-gradient(110deg, rgba(15, 23, 42, 0.95) 0%, rgba(15, 23, 42, 0.82) 48%, rgba(185, 28, 28, 0.40) 100%), url(${image})`,
          backgroundSize: 'cover',
          backgroundPosition: 'center 30%',
          backgroundRepeat: 'no-repeat',
        }}
      >
        <div className="relative z-10 mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-8 sm:py-12 md:py-14 w-full">
          {!isHome && heading ? (
            <div className="max-w-3xl space-y-3">
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-md text-[10px] font-heading font-black uppercase tracking-widest bg-red-600 text-white shadow-xs">
                <Flame className="w-3 h-3" />
                <span>CRICGEEK ARENA</span>
              </div>
              <h1 className="text-2xl sm:text-4xl md:text-5xl font-heading font-black tracking-tight text-white uppercase leading-tight drop-shadow-xl">
                {heading}
              </h1>
              {subtitle && (
                <p className="text-xs sm:text-sm text-slate-300 leading-relaxed max-w-2xl font-medium">
                  {subtitle}
                </p>
              )}
            </div>
          ) : (
            <div className="max-w-3xl space-y-4">
              {/* The Alchemists Sports Pill Badge */}
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-md text-[10px] sm:text-xs font-heading font-black uppercase tracking-wider bg-red-600 text-white shadow-md">
                <span className="w-2 h-2 rounded-full bg-white animate-pulse" />
                <span>REAL-TIME CRICKET ARENA</span>
              </div>

              {/* Athletic Headline */}
              <h1 className="text-3xl sm:text-5xl md:text-6xl font-heading font-black text-white tracking-tight uppercase leading-none drop-shadow-2xl">
                MATCHDAY SCORES & <span className="text-red-500 underline decoration-red-600 underline-offset-8">LIVE CRICKET ACTION</span>
              </h1>

              <p className="text-xs sm:text-sm md:text-base text-slate-200 leading-relaxed max-w-2xl font-medium">
                Official ball-by-ball scorecards, tournament schedules, verified partnerships, breaking editorial news, and ICC world rankings.
              </p>

              {/* Athletic Action Buttons */}
              <div className="flex flex-wrap items-center gap-3 pt-2">
                <Link
                  href="/matches?tab=live"
                  className="inline-flex items-center gap-2 px-5 py-2.5 rounded-lg font-heading font-black text-xs uppercase tracking-wider bg-red-600 hover:bg-red-700 text-white shadow-md transition-all duration-150"
                >
                  <Radio className="w-4 h-4 animate-pulse" />
                  <span>Live Matches</span>
                </Link>
                <Link
                  href="/schedule"
                  className="inline-flex items-center gap-2 px-5 py-2.5 rounded-lg font-heading font-black text-xs uppercase tracking-wider bg-white/10 hover:bg-white/20 text-white backdrop-blur-md border border-white/25 transition-all"
                >
                  <Calendar className="w-4 h-4 text-slate-200" />
                  <span>Fixtures & Schedule</span>
                </Link>
                <Link
                  href="/rankings"
                  className="inline-flex items-center gap-2 px-5 py-2.5 rounded-lg font-heading font-black text-xs uppercase tracking-wider bg-white/10 hover:bg-white/20 text-white backdrop-blur-md border border-white/25 transition-all"
                >
                  <Trophy className="w-4 h-4 text-amber-400" />
                  <span>ICC Rankings</span>
                </Link>
              </div>
            </div>
          )}
        </div>
      </div>
    </section>
  );
};

export default Hero;
