'use client';

import React, { useEffect, useState, useMemo } from 'react';
import { cricketApi } from '@/services/api';
import { UpcomingMatch } from '@/types/match';
import ImageWithFallback from '@/components/common/ImageWithFallback';
import EmptyState from '@/components/common/EmptyState';
import Hero from '@/components/home/hero';
import { Calendar, Search, MapPin, Clock, RefreshCw, X } from 'lucide-react';

export default function SchedulePage() {
  const [schedule, setSchedule] = useState<UpcomingMatch[]>([]);
  const [loading, setLoading] = useState(true);
  const [refreshing, setRefreshing] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');

  const fetchSchedule = async (isManual = false) => {
    if (isManual) setRefreshing(true);
    else setLoading(true);

    try {
      const data = await cricketApi.getUpcomingMatches();
      setSchedule(data || []);
    } catch (err) {
      console.warn('Failed to fetch schedule:', err);
      setSchedule([]);
    } finally {
      setLoading(false);
      setRefreshing(false);
    }
  };

  useEffect(() => {
    fetchSchedule();
  }, []);

  const filteredSchedule = useMemo(() => {
    const q = searchQuery.toLowerCase().trim();
    if (!q) return schedule;

    return schedule.filter((item) => {
      return (
        item.teams.toLowerCase().includes(q) ||
        item.seriesName.toLowerCase().includes(q) ||
        item.venueInfo.toLowerCase().includes(q) ||
        item.date.toLowerCase().includes(q)
      );
    });
  }, [schedule, searchQuery]);

  // Group fixtures by date
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
    <div className="min-h-screen">
      <Hero
        image="/images/schduleHeader.jpg"
        heading="Cricket Match Schedule"
        subtitle="Upcoming international and domestic fixtures, series schedules, and match venues."
      />
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 sm:py-10 space-y-6">
        {/* Controls */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          {/* Search */}
          <div className="relative max-w-md w-full">
            <Search className="w-4 h-4 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2" />
            <input
              type="text"
              placeholder="Search teams, series, or stadiums..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-9 pr-9 py-2 text-xs bg-white/[0.04] backdrop-blur-md border border-white/10 rounded-xl text-white placeholder:text-slate-500 focus:outline-none focus:border-red-500 focus:ring-1 focus:ring-red-500 shadow-md"
            />
            {searchQuery && (
              <button
                onClick={() => setSearchQuery('')}
                className="absolute right-2.5 top-1/2 -translate-y-1/2 text-slate-400 hover:text-white"
              >
                <X className="w-3.5 h-3.5" />
              </button>
            )}
          </div>

          <div className="flex items-center gap-3">
            <button
              onClick={() => fetchSchedule(true)}
              disabled={loading || refreshing}
              className="inline-flex items-center gap-2 px-4 py-2 rounded-xl text-xs font-bold bg-white/[0.04] border border-white/10 text-slate-300 hover:bg-white/[0.1] hover:border-red-500/40 hover:text-white transition-all shadow-md disabled:opacity-50 active:scale-95"
            >
              <RefreshCw className={`w-3.5 h-3.5 ${refreshing ? 'animate-spin text-red-500' : ''}`} />
              <span>{refreshing ? 'Updating...' : 'Refresh'}</span>
            </button>
          </div>
        </div>

        {/* Schedule List grouped by Date */}
        {loading ? (
          <div className="space-y-6">
            <div className="h-8 w-48 rounded-xl shimmer-block" />
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              <div className="h-44 bg-white/[0.035] border border-white/[0.07] rounded-2xl shimmer-block" />
              <div className="h-44 bg-white/[0.035] border border-white/[0.07] rounded-2xl shimmer-block" />
              <div className="h-44 bg-white/[0.035] border border-white/[0.07] rounded-2xl shimmer-block" />
            </div>
          </div>
        ) : Object.keys(groupedSchedule).length === 0 ? (
          <EmptyState
            type="schedule"
            title="No Scheduled Matches Found"
            message="No fixtures match your search query."
            actionLabel="Reset Search"
            onAction={() => setSearchQuery('')}
          />
        ) : (
          <div className="space-y-8">
            {Object.entries(groupedSchedule).map(([date, matches]) => (
              <div key={date} className="space-y-3.5">
                {/* Date Header Banner */}
                <div className="flex items-center gap-2.5 border-b border-white/[0.08] pb-2.5">
                  <Calendar className="w-4 h-4 text-red-500" />
                  <h2 className="text-sm font-bold text-white tracking-wide">
                    {date}
                  </h2>
                  <span className="text-xs font-semibold px-2 py-0.5 rounded-full bg-white/[0.08] text-slate-300 border border-white/10">
                    {matches.length} {matches.length === 1 ? 'match' : 'matches'}
                  </span>
                </div>

                {/* Fixture Cards */}
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                  {matches.map((fixture, idx) => (
                    <div
                      key={idx}
                      className="w-full bg-white/[0.035] hover:bg-white/[0.075] backdrop-blur-xl border border-white/[0.08] hover:border-red-500/40 rounded-2xl p-5 shadow-lg hover:shadow-[0_12px_32px_-4px_rgba(0,0,0,0.65),0_0_24px_rgba(220,38,38,0.22)] transition-all duration-300 flex flex-col justify-between space-y-3.5 hover:-translate-y-1"
                    >
                      <div className="flex items-center justify-between pb-2.5 border-b border-white/[0.06] text-xs">
                        <span className="font-bold text-slate-400 uppercase tracking-wider truncate">
                          {fixture.seriesName || 'Series'}
                        </span>
                        <div className="flex items-center gap-1.5 text-blue-400 bg-blue-500/15 px-2.5 py-0.5 rounded-full border border-blue-500/30 backdrop-blur-md font-semibold">
                          <Clock className="w-3 h-3 text-blue-400" />
                          <span>{fixture.startTime || 'TBD'}</span>
                        </div>
                      </div>

                      <div className="space-y-2 py-1">
                        {fixture.teamDetails && fixture.teamDetails.length >= 2 ? (
                          <div className="space-y-2.5">
                            <div className="flex items-center gap-2.5">
                              <ImageWithFallback
                                src={fixture.teamDetails[0].flag}
                                alt={fixture.teamDetails[0].name}
                                width={26}
                                height={26}
                                fallbackText={fixture.teamDetails[0].name}
                              />
                              <span className="text-sm font-bold text-white truncate">
                                {fixture.teamDetails[0].name}
                              </span>
                            </div>
                            <div className="flex items-center gap-2.5">
                              <ImageWithFallback
                                src={fixture.teamDetails[1].flag}
                                alt={fixture.teamDetails[1].name}
                                width={26}
                                height={26}
                                fallbackText={fixture.teamDetails[1].name}
                              />
                              <span className="text-sm font-bold text-white truncate">
                                {fixture.teamDetails[1].name}
                              </span>
                            </div>
                          </div>
                        ) : (
                          <h3 className="text-sm font-bold text-white leading-snug">
                            {fixture.teams}
                          </h3>
                        )}
                      </div>

                      <div className="pt-2.5 border-t border-white/[0.06] flex items-center gap-1.5 text-xs text-slate-400">
                        <MapPin className="w-3.5 h-3.5 text-slate-500 flex-shrink-0" />
                        <span className="truncate">{fixture.venueInfo || 'Venue TBA'}</span>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
