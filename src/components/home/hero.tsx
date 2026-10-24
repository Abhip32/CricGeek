'use client';

import React from 'react';
import Link from 'next/link';
import { motion } from 'framer-motion';
import { Radio, Calendar, Trophy, ChevronRight, Zap, ShieldCheck } from 'lucide-react';

interface HeroProps {
  heading?: string;
  subtitle?: string;
  image?: string;
}

export const Hero: React.FC<HeroProps> = ({
  heading = 'Ultimate Destination For Every True Cricket Fan',
  subtitle = 'Experience real-time live ball-by-ball commentary, match statistics, tournament schedules, and official ICC rankings with zero lag.',
  image = '/images/homebanner.jpeg'
}) => {
  return (
    <div className="relative overflow-hidden border-b border-white/[0.08] bg-[#070B14]">
      {/* Background Graphic with Gradient Masks */}
      <div
        className="absolute inset-0 z-0 opacity-20 scale-105 transition-transform duration-1000"
        style={{
          backgroundImage: `url(${image})`,
          backgroundSize: 'cover',
          backgroundPosition: 'center',
          filter: 'contrast(1.15) saturate(1.2)'
        }}
      />

      {/* Layered Gradient Overlays */}
      <div className="absolute inset-0 bg-gradient-to-t from-[#070B14] via-[#070B14]/80 to-transparent z-0" />
      <div className="absolute inset-0 bg-gradient-to-r from-[#070B14] via-[#070B14]/60 to-transparent z-0" />

      {/* Hero Content Container */}
      <div className="relative z-10 mx-auto max-w-7xl px-4 py-16 sm:px-6 sm:py-24 lg:px-8">
        <div className="max-w-3xl space-y-6">
          {/* Live Pulse Tag */}
          <motion.div
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="inline-flex items-center gap-2 rounded-full border border-emerald-500/30 bg-emerald-500/10 px-3.5 py-1 text-xs font-semibold text-emerald-400 backdrop-blur-md shadow-sm"
          >
            <span className="relative flex h-2 w-2">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
              <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-500"></span>
            </span>
            <span>Real-Time Live Cricket Coverage</span>
            <span className="text-emerald-500/50">•</span>
            <span className="text-[11px] text-slate-300">2026 Season</span>
          </motion.div>

          {/* Heading */}
          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.1 }}
            className="text-4xl font-black tracking-tight text-white sm:text-6xl sm:leading-[1.1]"
          >
            {heading.includes('Cricket') ? (
              heading
            ) : (
              <>
                Live Cricket <span className="text-transparent bg-clip-text bg-gradient-to-r from-emerald-400 via-teal-300 to-cyan-400">Reimagined</span> For Real Fans
              </>
            )}
          </motion.h1>

          {/* Subtitle */}
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="text-base sm:text-lg text-slate-300 leading-relaxed max-w-2xl font-normal"
          >
            {subtitle}
          </motion.p>

          {/* CTA Buttons */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.3 }}
            className="flex flex-wrap items-center gap-3 pt-2"
          >
            <Link
              href="/matches"
              className="inline-flex items-center gap-2 rounded-xl bg-gradient-to-r from-emerald-500 to-teal-500 px-5 py-3 text-sm font-bold text-slate-950 shadow-lg shadow-emerald-500/25 hover:from-emerald-400 hover:to-teal-400 hover:shadow-emerald-500/40 transition-all duration-200"
            >
              <Radio className="w-4 h-4" />
              <span>Live Matches</span>
              <ChevronRight className="w-4 h-4" />
            </Link>

            <Link
              href="/schedule"
              className="inline-flex items-center gap-2 rounded-xl border border-white/10 bg-slate-900/60 backdrop-blur-md px-5 py-3 text-sm font-semibold text-white hover:bg-white/[0.08] hover:border-white/20 transition-all duration-200"
            >
              <Calendar className="w-4 h-4 text-cyan-400" />
              <span>Upcoming Fixtures</span>
            </Link>

            <Link
              href="/rankings"
              className="inline-flex items-center gap-2 rounded-xl border border-white/10 bg-slate-900/60 backdrop-blur-md px-5 py-3 text-sm font-semibold text-white hover:bg-white/[0.08] hover:border-white/20 transition-all duration-200"
            >
              <Trophy className="w-4 h-4 text-amber-400" />
              <span>ICC Rankings</span>
            </Link>
          </motion.div>

          {/* Features Highlights Row */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.8, delay: 0.4 }}
            className="grid grid-cols-2 sm:grid-cols-3 gap-4 pt-6 border-t border-white/[0.08]"
          >
            <div className="flex items-center gap-2 text-xs text-slate-400">
              <Zap className="w-4 h-4 text-emerald-400" />
              <span>Instant Score Updates</span>
            </div>
            <div className="flex items-center gap-2 text-xs text-slate-400">
              <ShieldCheck className="w-4 h-4 text-cyan-400" />
              <span>Official ICC Rankings</span>
            </div>
            <div className="flex items-center gap-2 text-xs text-slate-400">
              <span className="text-base">🏏</span>
              <span>Complete In-Depth Scorecards</span>
            </div>
          </motion.div>
        </div>
      </div>
    </div>
  );
};

export default Hero;
