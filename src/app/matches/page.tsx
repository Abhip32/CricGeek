'use client';

import React, { useState, useEffect, useMemo } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import Hero from '@/components/home/hero';
import MatchCard from '@/components/matches/MatchCard';
import SkeletonCard from '@/components/home/SkeletonCard';
import EmptyState from '@/components/common/EmptyState';
import ImageWithFallback from '@/components/common/ImageWithFallback';
import { cricketApi } from '@/services/api';
import { Match, UpcomingMatch } from '@/types/match';
import { Radio, CheckCircle2, Calendar, Search, Filter, RefreshCw, Clock, MapPin, ChevronRight } from 'lucide-react';
import Link from 'next/link';

type TabType = 'live' | 'recent' | 'upcoming';

export default function MatchesPage() {
  const [activeTab, setActiveTab] = useState<TabType>('live');
  const [liveMatches, setLiveMatches] = useState<Match[]>([]);
  const [recentMatches, setRecentMatches] = useState<Match[]>([]);
  const [upcomingMatches, setUpcomingMatches] = useState<UpcomingMatch[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedFormat, setSelectedFormat] = useState('All');

  const tabs = [
    { id: 'live' as TabType, label: 'Live Now', icon: Radio, count: liveMatches.length },
    { id: 'recent' as TabType, label: 'Recent Results', icon: CheckCircle2, count: recentMatches.length },
    { id: 'upcoming' as TabType, label: 'Upcoming', icon: Calendar, count: upcomingMatches.length },
  ];

  const formats = ['All', 'T20', 'ODI', 'Test', 'Women'];

  const loadData = async (tab: TabType) => {
    setLoading(true);
    try {
      if (tab === 'live') {
        const data = await cricketApi.getLiveMatches();
        setLiveMatches(data);
      } else if (tab === 'recent') {
        const data = await cricketApi.getRecentMatches();
        setRecentMatches(data);
      } else if (tab === 'upcoming') {
        const data = await cricketApi.getUpcomingMatches();
        setUpcomingMatches(data);
      }
    } catch (err) {
      console.warn('Error fetching tab data:', err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadData(activeTab);
  }, [activeTab]);

  // Filter logic
  const filteredMatches = useMemo(() => {
    const q = searchQuery.toLowerCase().trim();

    if (activeTab === 'upcoming') {
      return upcomingMatches.filter((m) => {
        const matchesQuery = !q || 
          m.teams.toLowerCase().includes(q) || 
          m.seriesName.toLowerCase().includes(q) || 
          m.venueInfo.toLowerCase().includes(q);

        const matchesFormat = selectedFormat === 'All' || 
          m.seriesName.toLowerCase().includes(selectedFormat.toLowerCase()) ||
          m.teams.toLowerCase().includes(selectedFormat.toLowerCase()) ||
          m.venueInfo.toLowerCase().includes(selectedFormat.toLowerCase());

        return matchesQuery && matchesFormat;
      });
    }

    const currentList = activeTab === 'live' ? liveMatches : recentMatches;
    return currentList.filter((m) => {
      const matchesQuery = !q ||
        m.teamA.toLowerCase().includes(q) ||
        m.teamB.toLowerCase().includes(q) ||
        m.series.toLowerCase().includes(q) ||
        m.matchInfo.toLowerCase().includes(q);

      const matchesFormat = selectedFormat === 'All' ||
        m.series.toLowerCase().includes(selectedFormat.toLowerCase()) ||
        m.matchInfo.toLowerCase().includes(selectedFormat.toLowerCase()) ||
        m.teamA.toLowerCase().includes(selectedFormat.toLowerCase()) ||
        m.teamB.toLowerCase().includes(selectedFormat.toLowerCase());

      return matchesQuery && matchesFormat;
    });
  }, [activeTab, liveMatches, recentMatches, upcomingMatches, searchQuery, selectedFormat]);

  return (
    <div className="min-h-screen pb-20">
      <Hero
        image="/images/matchInfoHeader.jpg"
        heading="Capture Every Inning, Every Ball, Everywhere"
        subtitle="Follow live action across international series, global franchise leagues, and domestic trophies with real-time updates."
      />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 -mt-6 relative z-20 space-y-8">
        {/* Navigation & Controls Bar */}
        <div className="rounded-2xl glass-panel p-3 border border-white/[0.08] shadow-2xl space-y-4">
          {/* Main Tabs */}
          <div className="flex flex-wrap items-center justify-between gap-3">
            <div className="flex items-center gap-1.5 p-1 rounded-xl bg-slate-900/80 border border-white/5">
              {tabs.map((tab) => {
                const isActive = activeTab === tab.id;
                const Icon = tab.icon;
                return (
                  <button
                    key={tab.id}
                    onClick={() => setActiveTab(tab.id)}
                    className={`relative flex items-center gap-2 px-4 py-2 rounded-lg text-xs font-bold transition-all ${
                      isActive
                        ? 'text-black shadow-md'
                        : 'text-slate-400 hover:text-white hover:bg-white/[0.04]'
                    }`}
                  >
                    {isActive && (
                      <motion.div
                        layoutId="active-match-tab"
                        className="absolute inset-0 rounded-lg bg-emerald-400 shadow-sm"
                        transition={{ type: 'spring', stiffness: 400, damping: 30 }}
                      />
                    )}
                    <Icon className={`w-3.5 h-3.5 relative z-10 ${isActive ? 'text-black' : 'text-slate-400'}`} />
                    <span className="relative z-10">{tab.label}</span>
                    {tab.count > 0 && (
                      <span className={`relative z-10 px-1.5 py-0.2 rounded-full text-[10px] font-black ${
                        isActive ? 'bg-black/20 text-black' : 'bg-slate-800 text-slate-300'
                      }`}>
                        {tab.count}
                      </span>
                    )}
                  </button>
                );
              })}
            </div>

            {/* Refresh Button */}
            <button
              onClick={() => loadData(activeTab)}
              disabled={loading}
              className="inline-flex items-center gap-2 px-3.5 py-2 rounded-xl text-xs font-semibold bg-slate-900/80 text-slate-300 hover:text-white border border-white/5 hover:border-emerald-500/30 transition-all"
            >
              <RefreshCw className={`w-3.5 h-3.5 ${loading ? 'animate-spin text-emerald-400' : ''}`} />
              <span className="hidden sm:inline">Refresh Feed</span>
            </button>
          </div>

          {/* Search & Filter Row */}
          <div className="flex flex-col sm:flex-row items-center justify-between gap-3 pt-2 border-t border-white/[0.06]">
            {/* Search Input */}
            <div className="relative w-full sm:w-80">
              <Search className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
              <input
                type="text"
                placeholder="Search by team, series, or city..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full pl-9 pr-4 py-2 rounded-xl text-xs bg-slate-950/60 border border-white/10 text-white placeholder-slate-500 focus:outline-none focus:border-emerald-500/50 transition-colors"
              />
            </div>

            {/* Format Filter Pills */}
            <div className="flex items-center gap-1 overflow-x-auto w-full sm:w-auto pb-1 sm:pb-0">
              <span className="text-[11px] font-semibold text-slate-500 mr-2 flex items-center gap-1">
                <Filter className="w-3 h-3" />
                Format:
              </span>
              {formats.map((fmt) => (
                <button
                  key={fmt}
                  onClick={() => setSelectedFormat(fmt)}
                  className={`px-3 py-1 rounded-lg text-xs font-semibold transition-all ${
                    selectedFormat === fmt
                      ? 'bg-slate-800 text-emerald-400 border border-emerald-500/30'
                      : 'text-slate-400 hover:text-white'
                  }`}
                >
                  {fmt}
                </button>
              ))}
            </div>
          </div>
        </div>

        {/* Matches Grid Area */}
        <div className="space-y-4">
          <div className="flex items-center justify-between px-1">
            <span className="text-xs font-bold text-slate-400 uppercase tracking-wider">
              Showing {filteredMatches.length} {activeTab} Matches
            </span>
          </div>

          {loading ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
              {Array.from({ length: 6 }).map((_, i) => (
                <SkeletonCard key={i} />
              ))}
            </div>
          ) : filteredMatches.length > 0 ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
              <AnimatePresence mode="popLayout">
                {activeTab === 'upcoming' ? (
                  (filteredMatches as UpcomingMatch[]).map((match, idx) => {
                    const team1 = match.teamDetails?.[0];
                    const team2 = match.teamDetails?.[1];
                    const teamParts = match.teams.split(/\s+(?:vs|v)\s+/i);
                    const team1Name = team1?.name || teamParts[0] || 'Team A';
                    const team2Name = team2?.name || teamParts[1] || 'Team B';

                    return (
                      <motion.div
                        key={idx}
                        initial={{ opacity: 0, y: 15 }}
                        animate={{ opacity: 1, y: 0 }}
                        whileHover={{ y: -3 }}
                        transition={{ duration: 0.2 }}
                        className="rounded-2xl glass-card p-5 border border-white/[0.08] hover:border-cyan-500/40 transition-all flex flex-col justify-between"
                      >
                        <div className="space-y-4">
                          <div className="flex items-start justify-between gap-2">
                            <div className="min-w-0 flex-1">
                              <span className="text-xs font-bold uppercase tracking-wider text-cyan-400 block truncate">
                                {match.seriesName || 'Upcoming Match'}
                              </span>
                              <div className="flex items-center gap-1.5 text-[11px] text-slate-400 mt-0.5 truncate">
                                <MapPin className="w-3 h-3 text-slate-500 flex-shrink-0" />
                                <span className="truncate">{match.venueInfo}</span>
                              </div>
                            </div>
                            <span className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full text-[11px] font-semibold bg-cyan-500/10 text-cyan-300 border border-cyan-500/20">
                              <Clock className="w-3 h-3" />
                              {match.startTime || 'Scheduled'}
                            </span>
                          </div>

                          {/* Teams display */}
                          <div className="space-y-3 bg-slate-900/50 p-4 rounded-xl border border-white/[0.04]">
                            <div className="flex items-center gap-3">
                              <ImageWithFallback
                                src={team1?.flag}
                                alt={team1Name}
                                fallbackText={team1Name}
                                width={28}
                                height={28}
                              />
                              <span className="text-sm font-bold text-white truncate">
                                {team1Name}
                              </span>
                            </div>
                            <div className="flex items-center gap-3">
                              <ImageWithFallback
                                src={team2?.flag}
                                alt={team2Name}
                                fallbackText={team2Name}
                                width={28}
                                height={28}
                              />
                              <span className="text-sm font-bold text-white truncate">
                                {team2Name}
                              </span>
                            </div>
                          </div>

                          <div className="text-[11px] font-semibold text-slate-400 flex items-center gap-1.5">
                            <Calendar className="w-3.5 h-3.5 text-slate-500" />
                            <span>{match.date}</span>
                          </div>
                        </div>

                        <div className="mt-4 pt-3 border-t border-white/[0.06] flex items-center justify-between">
                          <span className="text-[10px] text-slate-500 uppercase font-semibold">
                            Fixture Preview
                          </span>
                          {match.link && (
                            <a
                              href={match.link}
                              target="_blank"
                              rel="noopener noreferrer"
                              className="inline-flex items-center gap-1 text-xs font-bold text-cyan-400 hover:text-cyan-300"
                            >
                              <span>Details</span>
                              <ChevronRight className="w-3 h-3" />
                            </a>
                          )}
                        </div>
                      </motion.div>
                    );
                  })
                ) : (
                  (filteredMatches as Match[]).map((match, idx) => (
                    <MatchCard key={match.id || idx} {...match} type={activeTab} />
                  ))
                )}
              </AnimatePresence>
            </div>
          ) : (
            <EmptyState
              type={activeTab === 'live' ? 'live' : 'matches'}
              title={`No ${activeTab} matches found`}
              message={searchQuery ? 'Try clearing your search query or changing filters.' : `There are no ${activeTab} matches available right now.`}
              onRetry={() => {
                setSearchQuery('');
                setSelectedFormat('All');
                loadData(activeTab);
              }}
            />
          )}
        </div>
      </div>
    </div>
  );
}
