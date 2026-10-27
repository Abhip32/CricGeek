'use client';

import React, { useState, useMemo } from 'react';
import Link from 'next/link';
import { useSchedule } from '@/hooks/useCricketQueries';
import { UpcomingMatch } from '@/types/match';
import ImageWithFallback from '@/components/common/ImageWithFallback';
import EmptyState from '@/components/common/EmptyState';
import ScheduleSkeleton from '@/components/schedule/ScheduleSkeleton';
import Hero from '@/components/home/hero';
import { Calendar, Search, MapPin, RefreshCw, Trophy, Globe, Zap, Shield, Users, ChevronRight } from 'lucide-react';
import { getCleanScorecardPath } from '@/components/home/MatchCarouselCard';

type CategoryType = 'all' | 'international' | 't20leagues' | 'domestic' | 'women';
type FormatType = 'all' | 'TEST' | 'ODI' | 'T20';

const CATEGORIES: { id: CategoryType; label: string; icon: any }[] = [
  { id: 'all', label: 'All Matches', icon: Trophy },
  { id: 'international', label: 'International', icon: Globe },
  { id: 't20leagues', label: 'T20 Leagues', icon: Zap },
  { id: 'domestic', label: 'Domestic', icon: Shield },
  { id: 'women', label: "Women's Cricket", icon: Users },
];

export default function SchedulePage() {
  const [activeCategory, setActiveCategory] = useState<CategoryType>('all');
  const [selectedFormat, setSelectedFormat] = useState<FormatType>('all');
  const [searchQuery, setSearchQuery] = useState('');

  // Fetch upcoming matches with category filter from API
  const {
    data: schedule = [],
    isLoading: loading,
    isFetching: refreshing,
    refetch
  } = useSchedule(undefined, activeCategory, selectedFormat !== 'all' ? selectedFormat : undefined);

  // Client search filtering
  const filteredSchedule = useMemo(() => {
    const q = searchQuery.toLowerCase().trim();
    if (!q) return schedule;

    return schedule.filter((item) => {
      return (
        item.teams.toLowerCase().includes(q) ||
        item.seriesName.toLowerCase().includes(q) ||
        item.venueInfo.toLowerCase().includes(q) ||
        item.date.toLowerCase().includes(q) ||
        (item.matchInfo && item.matchInfo.toLowerCase().includes(q))
      );
    });
  }, [schedule, searchQuery]);

  // Group fixtures by Date
  const groupedSchedule = useMemo(() => {
    const groups: Record<string, UpcomingMatch[]> = {};
    filteredSchedule.forEach((item) => {
      const dateKey = item.date || 'Upcoming';
      if (!groups[dateKey]) groups[dateKey] = [];
      groups[dateKey].push(item);
    });
    return groups;
  }, [filteredSchedule]);

  return (
    <div className="min-h-screen bg-slate-50 pb-16">
      <Hero
        image="/images/schduleHeader.jpg"
        heading="Cricket Match Schedule & Fixtures"
        subtitle="Official international, domestic, T20 league, and women's tournament schedules and match fixtures."
      />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6 sm:py-8 space-y-6">
        {/* Category Tabs */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-slate-200 pb-4">
          <div className="flex items-center gap-2 overflow-x-auto pb-2 sm:pb-0 no-scrollbar">
            {CATEGORIES.map((cat) => {
              const Icon = cat.icon;
              const isActive = activeCategory === cat.id;
              return (
                <button
                  key={cat.id}
                  onClick={() => {
                    setActiveCategory(cat.id);
                    setSearchQuery('');
                  }}
                  className={`flex items-center gap-2 px-3.5 sm:px-4 py-2 rounded-lg text-xs sm:text-sm font-bold transition-all whitespace-nowrap ${
                    isActive
                      ? 'bg-red-600 text-white shadow-xs'
                      : 'bg-white border border-slate-200 text-slate-700 hover:bg-slate-100 hover:text-red-600'
                  }`}
                >
                  <Icon className="w-4 h-4 flex-shrink-0" />
                  <span>{cat.label}</span>
                </button>
              );
            })}
          </div>

          <button
            onClick={() => refetch()}
            disabled={refreshing}
            className="self-start sm:self-auto inline-flex items-center gap-2 px-3.5 py-2 rounded-lg text-xs font-bold bg-white border border-slate-200 text-slate-700 hover:bg-slate-100 hover:text-red-600 transition-colors shadow-2xs disabled:opacity-50"
          >
            <RefreshCw className={`w-3.5 h-3.5 ${refreshing ? 'animate-spin text-red-600' : ''}`} />
            <span>{refreshing ? 'Updating...' : 'Refresh'}</span>
          </button>
        </div>

        {/* Format Selector & Search Bar */}
        <div className="flex flex-wrap items-center justify-between gap-4">
          {/* Format Filter Pills */}
          <div className="flex items-center gap-1.5 overflow-x-auto">
            {(['all', 'TEST', 'ODI', 'T20'] as const).map((fmt) => (
              <button
                key={fmt}
                onClick={() => setSelectedFormat(fmt)}
                className={`px-3 py-1.5 rounded-lg text-xs font-bold transition-all ${
                  selectedFormat === fmt
                    ? 'bg-slate-900 text-white shadow-2xs'
                    : 'bg-white border border-slate-200 text-slate-700 hover:bg-slate-100'
                }`}
              >
                {fmt === 'all' ? 'All Formats' : fmt === 'T20' ? 'T20 / T20I' : fmt}
              </button>
            ))}
          </div>

          {/* Search Box */}
          <div className="relative w-full sm:w-72">
            <Search className="w-4 h-4 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2" />
            <input
              type="text"
              placeholder="Search teams, series, or stadiums..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-9 pr-4 py-1.5 text-xs bg-white border border-slate-200 rounded-lg text-slate-900 placeholder:text-slate-400 focus:outline-none focus:border-red-500 focus:ring-1 focus:ring-red-500 shadow-2xs"
            />
          </div>
        </div>

        {/* Schedule Fixture Cards */}
        {loading ? (
          <ScheduleSkeleton />
        ) : Object.keys(groupedSchedule).length === 0 ? (
          <EmptyState
            type="schedule"
            title="No Matches Scheduled"
            message={`No scheduled fixtures found for ${activeCategory !== 'all' ? activeCategory : ''} criteria.`}
            actionLabel="Reset Filters"
            onAction={() => {
              setActiveCategory('all');
              setSelectedFormat('all');
              setSearchQuery('');
            }}
          />
        ) : (
          <div className="space-y-8">
            {Object.entries(groupedSchedule).map(([date, matches]) => (
              <div key={date} className="space-y-3.5">
                {/* Date Header Ribbon */}
                <div className="flex items-center justify-between border-b border-slate-200 pb-2.5">
                  <div className="flex items-center gap-2">
                    <Calendar className="w-4 h-4 text-red-600" />
                    <h2 className="text-sm sm:text-base font-extrabold text-slate-900 tracking-tight">
                      {date}
                    </h2>
                  </div>
                  <span className="text-xs font-bold px-2.5 py-0.5 rounded-full bg-slate-100 text-slate-600 border border-slate-200">
                    {matches.length} {matches.length === 1 ? 'fixture' : 'fixtures'}
                  </span>
                </div>

                {/* Fixture Cards Grid */}
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                  {matches.map((item, idx) => {
                    const scorecardHref = getCleanScorecardPath(item.link);
                    const team1 = item.teamDetails?.[0];
                    const team2 = item.teamDetails?.[1];

                    return (
                      <div
                        key={idx}
                        className="bg-white border border-slate-200 rounded-xl p-4 sm:p-5 shadow-2xs flex flex-col justify-between space-y-3.5 hover:border-red-500/60 hover:shadow-md transition-all group"
                      >
                        {/* Top: Series & Format Badge */}
                        <div className="flex items-center justify-between gap-2 pb-2.5 border-b border-slate-100 min-w-0">
                          <span
                            className="text-[11px] font-bold text-slate-500 uppercase tracking-wider truncate flex-1 min-w-0"
                            title={item.seriesName}
                          >
                            {item.seriesName || 'Series Tournament'}
                          </span>

                          <span className="px-2 py-0.5 rounded text-[10px] font-black uppercase tracking-wider bg-slate-100 text-slate-700 border border-slate-200 flex-shrink-0">
                            {item.format || 'CRICKET'}
                          </span>
                        </div>

                        {/* Match Info & Teams */}
                        <div className="space-y-3 py-1">
                          {item.matchInfo && (
                            <p className="text-xs font-semibold text-slate-600 truncate" title={item.matchInfo}>
                              {item.matchInfo}
                            </p>
                          )}

                          {team1 && team2 ? (
                            <div className="space-y-2">
                              {/* Team 1 */}
                              <div className="flex items-center gap-2.5">
                                <ImageWithFallback
                                  src={team1.flag}
                                  alt={team1.name}
                                  width={26}
                                  height={18}
                                  className="w-6.5 h-4.5 object-contain flex-shrink-0"
                                  fallbackText={team1.name}
                                />
                                <span className="text-sm font-bold text-slate-900 truncate">
                                  {team1.name}
                                </span>
                              </div>

                              {/* Team 2 */}
                              <div className="flex items-center gap-2.5">
                                <ImageWithFallback
                                  src={team2.flag}
                                  alt={team2.name}
                                  width={26}
                                  height={18}
                                  className="w-6.5 h-4.5 object-contain flex-shrink-0"
                                  fallbackText={team2.name}
                                />
                                <span className="text-sm font-bold text-slate-900 truncate">
                                  {team2.name}
                                </span>
                              </div>
                            </div>
                          ) : (
                            <h3 className="text-sm font-bold text-slate-900 leading-snug">
                              {item.teams}
                            </h3>
                          )}
                        </div>

                        {/* Footer: Venue, Time & Scorecard Link */}
                        <div className="pt-2.5 border-t border-slate-100 flex items-center justify-between gap-2 text-xs">
                          <div className="flex items-center gap-1.5 text-slate-500 min-w-0 flex-1">
                            <MapPin className="w-3.5 h-3.5 flex-shrink-0 text-slate-400" />
                            <span className="truncate" title={item.venueInfo}>
                              {item.venueInfo || 'Venue TBA'}
                            </span>
                          </div>

                          <div className="flex items-center gap-2 flex-shrink-0">
                            <span className="font-semibold text-slate-700 text-xs">
                              {item.startTime}
                            </span>

                            {item.link && (
                              <Link
                                href={scorecardHref}
                                className="inline-flex items-center gap-0.5 text-xs font-bold text-red-600 hover:text-red-700 transition-colors group-hover:translate-x-0.5"
                              >
                                <span>Scorecard</span>
                                <ChevronRight className="w-3.5 h-3.5" />
                              </Link>
                            )}
                          </div>
                        </div>
                      </div>
                    );
                  })}
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
