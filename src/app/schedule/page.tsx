'use client';

import React, { useState, useMemo } from 'react';
import { useUpcomingMatches } from '@/hooks/useCricketQueries';
import { UpcomingMatch } from '@/types/match';
import ImageWithFallback from '@/components/common/ImageWithFallback';
import EmptyState from '@/components/common/EmptyState';
import Hero from '@/components/home/hero';
import { Calendar, Search, MapPin, Clock, RefreshCw } from 'lucide-react';

export default function SchedulePage() {
  const [searchQuery, setSearchQuery] = useState('');

  // React Query hook
  const { data: schedule = [], isLoading: loading, isFetching: refreshing, refetch } = useUpcomingMatches();

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
    <div className="min-h-screen bg-slate-50">
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
              className="w-full pl-9 pr-4 py-2 text-xs bg-white border border-slate-200 rounded-lg text-slate-900 placeholder:text-slate-400 focus:outline-none focus:border-red-500 focus:ring-1 focus:ring-red-500 shadow-2xs"
            />
          </div>

          <div className="flex items-center gap-3">
            <button
              onClick={() => refetch()}
              disabled={refreshing}
              className="inline-flex items-center gap-2 px-3.5 py-2 rounded-lg text-xs font-bold bg-white border border-slate-200 text-slate-700 hover:bg-slate-100 hover:text-red-600 transition-colors shadow-2xs disabled:opacity-50"
            >
              <RefreshCw className={`w-3.5 h-3.5 ${refreshing ? 'animate-spin text-red-600' : ''}`} />
              <span>{refreshing ? 'Updating...' : 'Refresh'}</span>
            </button>
          </div>
        </div>

        {/* Schedule List grouped by Date */}
        {loading ? (
          <div className="space-y-6">
            <div className="h-8 w-48 bg-slate-200 rounded animate-pulse" />
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              <div className="h-44 bg-white border border-slate-200 rounded-xl animate-pulse" />
              <div className="h-44 bg-white border border-slate-200 rounded-xl animate-pulse" />
              <div className="h-44 bg-white border border-slate-200 rounded-xl animate-pulse" />
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
              <div key={date} className="space-y-3">
                {/* Date Header Banner */}
                <div className="flex items-center gap-2 border-b border-slate-200 pb-2">
                  <Calendar className="w-4 h-4 text-red-600" />
                  <h2 className="text-sm font-bold text-slate-900">
                    {date}
                  </h2>
                  <span className="text-xs font-semibold px-2 py-0.2 rounded-full bg-slate-200 text-slate-700">
                    {matches.length} {matches.length === 1 ? 'match' : 'matches'}
                  </span>
                </div>

                {/* Fixture Cards */}
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                  {matches.map((item, idx) => (
                    <div
                      key={idx}
                      className="bg-white border border-slate-200 rounded-xl p-5 shadow-xs flex flex-col justify-between space-y-4 hover:border-slate-300 hover:shadow-md transition-all"
                    >
                      {/* Top Header: Series & Match Number */}
                      <div className="flex items-center justify-between pb-2 border-b border-slate-100 text-xs">
                        <span className="font-bold text-slate-500 uppercase tracking-wider truncate" title={item.seriesName}>
                          {item.seriesName || 'Series'}
                        </span>
                        <span className="font-semibold text-blue-700 bg-blue-50 px-2 py-0.5 rounded-full border border-blue-100">
                          {item.matchInfo || 'Fixture'}
                        </span>
                      </div>

                      {/* Teams & Logos */}
                      <div className="space-y-2.5 py-1">
                        {item.teamDetails && item.teamDetails.length >= 2 ? (
                          <div className="space-y-2">
                            <div className="flex items-center gap-2.5">
                              <ImageWithFallback
                                src={item.teamDetails[0].flag}
                                alt={item.teamDetails[0].name}
                                width={26}
                                height={26}
                                fallbackText={item.teamDetails[0].name}
                              />
                              <span className="text-sm font-bold text-slate-900 truncate">
                                {item.teamDetails[0].name}
                              </span>
                            </div>
                            <div className="flex items-center gap-2.5">
                              <ImageWithFallback
                                src={item.teamDetails[1].flag}
                                alt={item.teamDetails[1].name}
                                width={26}
                                height={26}
                                fallbackText={item.teamDetails[1].name}
                              />
                              <span className="text-sm font-bold text-slate-900 truncate">
                                {item.teamDetails[1].name}
                              </span>
                            </div>
                          </div>
                        ) : (
                          <h3 className="text-sm font-bold text-slate-900 leading-snug">
                            {item.teams}
                          </h3>
                        )}
                      </div>

                      {/* Footer: Venue & Time */}
                      <div className="pt-2 border-t border-slate-100 flex items-center justify-between text-xs text-slate-500">
                        <div className="flex items-center gap-1 min-w-0">
                          <MapPin className="w-3.5 h-3.5 flex-shrink-0 text-slate-400" />
                          <span className="truncate max-w-[160px]" title={item.venueInfo}>
                            {item.venueInfo || 'Venue TBA'}
                          </span>
                        </div>
                        <div className="flex items-center gap-1 font-semibold text-slate-700 flex-shrink-0">
                          <Clock className="w-3.5 h-3.5 text-slate-400" />
                          <span>{item.startTime || 'TBD'}</span>
                        </div>
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
