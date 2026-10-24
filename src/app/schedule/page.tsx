'use client';

import React, { useEffect, useState, useMemo } from 'react';
import { motion } from 'framer-motion';
import { cricketApi } from '@/services/api';
import { UpcomingMatch } from '@/types/match';
import Hero from '@/components/home/hero';
import ImageWithFallback from '@/components/common/ImageWithFallback';
import EmptyState from '@/components/common/EmptyState';
import { Calendar, Clock, MapPin, ChevronRight, RefreshCw, Search } from 'lucide-react';

export default function SchedulePage() {
  const [scheduleData, setScheduleData] = useState<UpcomingMatch[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedDate, setSelectedDate] = useState<string>('');

  const fetchSchedule = async (dateFilter?: string) => {
    setLoading(true);
    try {
      const response = await cricketApi.getUpcomingMatches(dateFilter);
      setScheduleData(response);
    } catch (err) {
      console.warn('Failed to load schedule:', err);
      setScheduleData([]);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchSchedule(selectedDate);
  }, [selectedDate]);

  // Group matches by date
  const groupedByDate = useMemo(() => {
    const q = searchQuery.toLowerCase().trim();
    const groups: Record<string, UpcomingMatch[]> = {};

    scheduleData.forEach((match) => {
      if (q) {
        const matchesQuery = 
          match.teams.toLowerCase().includes(q) ||
          match.seriesName.toLowerCase().includes(q) ||
          match.venueInfo.toLowerCase().includes(q);
        if (!matchesQuery) return;
      }

      const key = match.date || 'Upcoming Matches';
      if (!groups[key]) groups[key] = [];
      groups[key].push(match);
    });

    return groups;
  }, [scheduleData, searchQuery]);

  return (
    <div className="min-h-screen pb-20">
      <Hero
        image="/images/schduleHeader.jpg"
        heading="Global Cricket Schedule & Fixtures"
        subtitle="Explore international tours, bilateral series, World Cups, and domestic championship fixtures across all timezones."
      />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 -mt-6 relative z-20 space-y-8">
        {/* Controls Bar */}
        <div className="rounded-2xl glass-panel p-4 border border-white/[0.08] shadow-2xl flex flex-col sm:flex-row items-center justify-between gap-4">
          {/* Search bar */}
          <div className="relative w-full sm:w-96">
            <Search className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
            <input
              type="text"
              placeholder="Filter fixtures by team, venue, or tournament..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-9 pr-4 py-2 rounded-xl text-xs bg-slate-950/60 border border-white/10 text-white placeholder-slate-500 focus:outline-none focus:border-cyan-500/50 transition-colors"
            />
          </div>

          <div className="flex items-center gap-3 w-full sm:w-auto justify-between sm:justify-end">
            <button
              onClick={() => {
                setSelectedDate('');
                fetchSchedule('');
              }}
              className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-xl text-xs font-semibold bg-slate-900 border border-white/10 text-slate-300 hover:text-white"
            >
              <RefreshCw className={`w-3.5 h-3.5 ${loading ? 'animate-spin text-cyan-400' : ''}`} />
              <span>All Dates</span>
            </button>
          </div>
        </div>

        {/* Schedule List */}
        <div className="space-y-8">
          {loading ? (
            <div className="space-y-6">
              {[1, 2].map((group) => (
                <div key={group} className="space-y-3">
                  <div className="h-6 w-36 rounded-md bg-slate-800/80 animate-pulse" />
                  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                    {[1, 2, 3].map((card) => (
                      <div key={card} className="h-44 rounded-2xl glass-card p-4 animate-shimmer" />
                    ))}
                  </div>
                </div>
              ))}
            </div>
          ) : Object.keys(groupedByDate).length > 0 ? (
            Object.entries(groupedByDate).map(([dateHeader, fixtures]) => (
              <motion.div
                key={dateHeader}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.3 }}
                className="space-y-4"
              >
                {/* Date Header Badge */}
                <div className="flex items-center gap-3">
                  <div className="flex items-center gap-2 px-3.5 py-1.5 rounded-xl bg-cyan-500/10 border border-cyan-500/20 text-cyan-300 text-xs font-bold tracking-wide">
                    <Calendar className="w-3.5 h-3.5" />
                    <span>{dateHeader}</span>
                  </div>
                  <div className="h-[1px] flex-1 bg-white/[0.06]" />
                  <span className="text-xs font-semibold text-slate-500">
                    {fixtures.length} {fixtures.length === 1 ? 'Match' : 'Matches'}
                  </span>
                </div>

                {/* Fixtures Grid */}
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                  {fixtures.map((fixture, idx) => {
                    const team1 = fixture.teamDetails?.[0];
                    const team2 = fixture.teamDetails?.[1];
                    const parts = fixture.teams.split(/\s+(?:vs|v)\s+/i);
                    const team1Name = team1?.name || parts[0] || 'Team 1';
                    const team2Name = team2?.name || parts[1] || 'Team 2';

                    return (
                      <div
                        key={idx}
                        className="rounded-2xl glass-card p-4 border border-white/[0.08] hover:border-cyan-500/40 transition-all flex flex-col justify-between"
                      >
                        <div className="space-y-3">
                          <div className="flex items-start justify-between gap-2">
                            <span className="text-[11px] font-bold uppercase tracking-wider text-cyan-400 truncate block flex-1">
                              {fixture.seriesName || 'Series'}
                            </span>
                            <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded-full text-[10px] font-semibold bg-slate-800 text-slate-300 border border-slate-700/60">
                              <Clock className="w-3 h-3 text-cyan-400" />
                              {fixture.startTime || 'TBD'}
                            </span>
                          </div>

                          {/* Teams */}
                          <div className="space-y-2 bg-slate-900/60 p-3 rounded-xl border border-white/[0.04]">
                            <div className="flex items-center gap-2.5">
                              <ImageWithFallback
                                src={team1?.flag}
                                alt={team1Name}
                                fallbackText={team1Name}
                                width={26}
                                height={26}
                              />
                              <span className="text-xs font-bold text-white truncate">
                                {team1Name}
                              </span>
                            </div>

                            <div className="flex items-center gap-2.5">
                              <ImageWithFallback
                                src={team2?.flag}
                                alt={team2Name}
                                fallbackText={team2Name}
                                width={26}
                                height={26}
                              />
                              <span className="text-xs font-bold text-white truncate">
                                {team2Name}
                              </span>
                            </div>
                          </div>

                          {/* Venue */}
                          <div className="flex items-center gap-1.5 text-[11px] text-slate-400 truncate">
                            <MapPin className="w-3 h-3 text-slate-500 flex-shrink-0" />
                            <span className="truncate">{fixture.venueInfo || 'Venue TBA'}</span>
                          </div>
                        </div>

                        {/* Card footer */}
                        <div className="mt-3 pt-2.5 border-t border-white/[0.06] flex items-center justify-between text-[11px]">
                          <span className="text-slate-500 font-medium">Fixture Details</span>
                          {fixture.link && (
                            <a
                              href={fixture.link}
                              target="_blank"
                              rel="noopener noreferrer"
                              className="inline-flex items-center gap-1 text-cyan-400 font-bold hover:text-cyan-300"
                            >
                              <span>View Match</span>
                              <ChevronRight className="w-3 h-3" />
                            </a>
                          )}
                        </div>
                      </div>
                    );
                  })}
                </div>
              </motion.div>
            ))
          ) : (
            <EmptyState
              type="schedule"
              title="No fixtures scheduled"
              message="No upcoming fixtures match your search criteria. Try clearing search filters."
              onRetry={() => {
                setSearchQuery('');
                setSelectedDate('');
                fetchSchedule('');
              }}
            />
          )}
        </div>
      </div>
    </div>
  );
}
