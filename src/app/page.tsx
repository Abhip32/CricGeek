import React from 'react';
import Link from 'next/link';
import Hero from '@/components/home/hero';
import MatchCarousel from '@/components/home/matchCarousel';
import News from '@/components/home/News';
import { Flame, Newspaper, ChevronRight, Trophy, Calendar, Radio } from 'lucide-react';

export default function Home() {
  return (
    <div className="min-h-screen pb-16 space-y-12">
      {/* Cinematic Hero */}
      <Hero
        image="/images/homebanner.jpeg"
        heading="Live Cricket Reimagined for the Modern Fan"
        subtitle="Ball-by-ball precision scorecards, live match commentary, upcoming tournament schedules, and real-time ICC player & team rankings."
      />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12">
        {/* Quick Category Banner */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          <Link
            href="/matches"
            className="flex items-center gap-3 p-4 rounded-2xl glass-card border border-white/5 hover:border-emerald-500/40 transition-all group"
          >
            <div className="p-2.5 rounded-xl bg-emerald-500/10 text-emerald-400 group-hover:scale-110 transition-transform">
              <Radio className="w-5 h-5" />
            </div>
            <div>
              <div className="text-xs font-bold text-white group-hover:text-emerald-400 transition-colors">Live Action</div>
              <div className="text-[11px] text-slate-400">Scores & Commentary</div>
            </div>
          </Link>

          <Link
            href="/matches"
            className="flex items-center gap-3 p-4 rounded-2xl glass-card border border-white/5 hover:border-cyan-500/40 transition-all group"
          >
            <div className="p-2.5 rounded-xl bg-cyan-500/10 text-cyan-400 group-hover:scale-110 transition-transform">
              <Flame className="w-5 h-5" />
            </div>
            <div>
              <div className="text-xs font-bold text-white group-hover:text-cyan-400 transition-colors">Recent Results</div>
              <div className="text-[11px] text-slate-400">Match Reports & Totals</div>
            </div>
          </Link>

          <Link
            href="/schedule"
            className="flex items-center gap-3 p-4 rounded-2xl glass-card border border-white/5 hover:border-amber-500/40 transition-all group"
          >
            <div className="p-2.5 rounded-xl bg-amber-500/10 text-amber-400 group-hover:scale-110 transition-transform">
              <Calendar className="w-5 h-5" />
            </div>
            <div>
              <div className="text-xs font-bold text-white group-hover:text-amber-400 transition-colors">Fixtures</div>
              <div className="text-[11px] text-slate-400">2026 Calendar</div>
            </div>
          </Link>

          <Link
            href="/rankings"
            className="flex items-center gap-3 p-4 rounded-2xl glass-card border border-white/5 hover:border-purple-500/40 transition-all group"
          >
            <div className="p-2.5 rounded-xl bg-purple-500/10 text-purple-400 group-hover:scale-110 transition-transform">
              <Trophy className="w-5 h-5" />
            </div>
            <div>
              <div className="text-xs font-bold text-white group-hover:text-purple-400 transition-colors">ICC Rankings</div>
              <div className="text-[11px] text-slate-400">Men & Women Podiums</div>
            </div>
          </Link>
        </div>

        {/* Live Matches Carousel Section */}
        <section className="space-y-4">
          <div className="flex items-end justify-between border-b border-white/[0.08] pb-4">
            <div>
              <div className="flex items-center gap-2 text-xs font-bold text-emerald-400 uppercase tracking-wider mb-1">
                <span className="relative flex h-2 w-2">
                  <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
                  <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-500"></span>
                </span>
                <span>Active Field</span>
              </div>
              <h2 className="text-2xl sm:text-3xl font-black text-white tracking-tight">
                Live & Recent Matches
              </h2>
            </div>
            <Link
              href="/matches"
              className="inline-flex items-center gap-1.5 text-xs font-bold text-slate-300 hover:text-emerald-400 transition-colors pb-1"
            >
              <span>View All Matches</span>
              <ChevronRight className="w-4 h-4" />
            </Link>
          </div>

          <MatchCarousel />
        </section>

        {/* Latest Cricket News Section */}
        <section className="space-y-4 pt-4">
          <div className="flex items-end justify-between border-b border-white/[0.08] pb-4">
            <div>
              <div className="flex items-center gap-1.5 text-xs font-bold text-cyan-400 uppercase tracking-wider mb-1">
                <Newspaper className="w-3.5 h-3.5" />
                <span>Global Journalism</span>
              </div>
              <h2 className="text-2xl sm:text-3xl font-black text-white tracking-tight">
                Breaking Cricket Headlines
              </h2>
            </div>
          </div>

          <News />
        </section>
      </div>
    </div>
  );
}
