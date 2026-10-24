'use client';

import React, { useState, useEffect, useMemo } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import Hero from '@/components/home/hero';
import ImageWithFallback from '@/components/common/ImageWithFallback';
import EmptyState from '@/components/common/EmptyState';
import { cricketApi } from '@/services/api';
import { Trophy, Medal, Search, RefreshCw, Users, User, ArrowUpRight } from 'lucide-react';

export default function RankingsPage() {
  const [activeType, setActiveType] = useState<'teams' | 'players'>('teams');
  const [teamTables, setTeamTables] = useState<any[]>([]);
  const [playerTables, setPlayerTables] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [activeFormatIdx, setActiveFormatIdx] = useState(0);
  const [searchQuery, setSearchQuery] = useState('');

  const fetchRankings = async () => {
    setLoading(true);
    try {
      const [teamsRes, playersRes] = await Promise.all([
        cricketApi.getTeamRankings(),
        cricketApi.getPlayerRankings()
      ]);
      setTeamTables(Array.isArray(teamsRes) ? teamsRes : []);
      setPlayerTables(Array.isArray(playersRes) ? playersRes : []);
    } catch (err) {
      console.warn('Failed to load rankings:', err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchRankings();
  }, []);

  // Current active tables based on type
  const currentTables = activeType === 'teams' ? teamTables : playerTables;
  const currentTable = currentTables[activeFormatIdx] || currentTables[0] || null;

  // Filter rows by search
  const filteredRows = useMemo(() => {
    if (!currentTable) return [];
    const q = searchQuery.toLowerCase().trim();
    const rows = currentTable.teams || currentTable.players || [];

    if (!q) return rows;
    return rows.filter((r: any) => {
      const name = r.teamName || r.playerName || '';
      const country = r.country || '';
      return name.toLowerCase().includes(q) || country.toLowerCase().includes(q);
    });
  }, [currentTable, searchQuery]);

  return (
    <div className="min-h-screen pb-20">
      <Hero
        image="/images/rankingsHeader.jpg"
        heading="Official ICC Rankings Leaderboard"
        subtitle="Explore official rankings for international teams, world-class batsmen, deadly bowlers, and top all-rounders across Test, ODI, and T20."
      />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 -mt-6 relative z-20 space-y-8">
        {/* Controls Panel */}
        <div className="rounded-2xl glass-panel p-4 border border-white/[0.08] shadow-2xl space-y-4">
          {/* Main Mode Switcher: Teams vs Players */}
          <div className="flex flex-col sm:flex-row items-center justify-between gap-4">
            <div className="flex items-center gap-1.5 p-1 rounded-xl bg-slate-900/90 border border-white/5 w-full sm:w-auto">
              <button
                onClick={() => {
                  setActiveType('teams');
                  setActiveFormatIdx(0);
                }}
                className={`flex-1 sm:flex-none flex items-center justify-center gap-2 px-5 py-2.5 rounded-lg text-xs font-bold transition-all ${
                  activeType === 'teams'
                    ? 'bg-emerald-400 text-black shadow-md'
                    : 'text-slate-400 hover:text-white'
                }`}
              >
                <Users className="w-4 h-4" />
                <span>Team Rankings</span>
              </button>

              <button
                onClick={() => {
                  setActiveType('players');
                  setActiveFormatIdx(0);
                }}
                className={`flex-1 sm:flex-none flex items-center justify-center gap-2 px-5 py-2.5 rounded-lg text-xs font-bold transition-all ${
                  activeType === 'players'
                    ? 'bg-emerald-400 text-black shadow-md'
                    : 'text-slate-400 hover:text-white'
                }`}
              >
                <User className="w-4 h-4" />
                <span>Player Rankings</span>
              </button>
            </div>

            {/* Search and Refresh */}
            <div className="flex items-center gap-3 w-full sm:w-auto">
              <div className="relative flex-1 sm:w-72">
                <Search className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
                <input
                  type="text"
                  placeholder="Filter team or player..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="w-full pl-9 pr-4 py-2 rounded-xl text-xs bg-slate-950/60 border border-white/10 text-white placeholder-slate-500 focus:outline-none focus:border-emerald-500/50"
                />
              </div>

              <button
                onClick={fetchRankings}
                disabled={loading}
                className="p-2.5 rounded-xl bg-slate-900 text-slate-300 hover:text-white border border-white/10"
                title="Refresh rankings"
              >
                <RefreshCw className={`w-4 h-4 ${loading ? 'animate-spin text-emerald-400' : ''}`} />
              </button>
            </div>
          </div>

          {/* Format Sub-tabs (Test, ODI, T20, etc.) */}
          {currentTables.length > 0 && (
            <div className="flex items-center gap-2 overflow-x-auto pb-1 pt-2 border-t border-white/[0.06]">
              {currentTables.map((tbl: any, idx: number) => {
                const isSelected = activeFormatIdx === idx;
                return (
                  <button
                    key={idx}
                    onClick={() => setActiveFormatIdx(idx)}
                    className={`px-4 py-2 rounded-xl text-xs font-bold whitespace-nowrap transition-all ${
                      isSelected
                        ? 'bg-slate-800 text-emerald-400 border border-emerald-500/40 shadow-sm'
                        : 'text-slate-400 hover:text-white hover:bg-slate-900'
                    }`}
                  >
                    {tbl.tableTitle || `Format ${idx + 1}`}
                  </button>
                );
              })}
            </div>
          )}
        </div>

        {/* Content Display */}
        {loading ? (
          <div className="space-y-3">
            {[...Array(6)].map((_, i) => (
              <div key={i} className="h-16 rounded-2xl glass-card p-4 animate-shimmer" />
            ))}
          </div>
        ) : currentTable && filteredRows.length > 0 ? (
          <div className="space-y-6">
            {/* Header info */}
            <div className="flex items-baseline justify-between px-1">
              <div>
                <h3 className="text-xl sm:text-2xl font-black text-white">
                  {currentTable.tableTitle || 'ICC Standings'}
                </h3>
                {currentTable.lastUpdated && (
                  <p className="text-xs text-slate-400 mt-0.5">{currentTable.lastUpdated}</p>
                )}
              </div>
              <span className="text-xs font-semibold text-emerald-400">
                Top {filteredRows.length} Standings
              </span>
            </div>

            {/* Podium for Top 3 (if no search filter applied) */}
            {!searchQuery && filteredRows.length >= 3 && (
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4 pt-2">
                {/* 2nd Place */}
                <motion.div
                  initial={{ opacity: 0, y: 15 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="rounded-2xl glass-card p-5 border border-slate-700/60 flex items-center gap-4 relative overflow-hidden order-2 md:order-1"
                >
                  <div className="absolute top-2 right-3 text-2xl font-black text-slate-600/30">#2</div>
                  <div className="w-10 h-10 rounded-full flex items-center justify-center bg-slate-300 text-black font-black text-sm flex-shrink-0 shadow-lg">
                    🥈
                  </div>
                  <div className="min-w-0">
                    <span className="text-sm font-bold text-white block truncate">
                      {filteredRows[1].teamName || filteredRows[1].playerName}
                    </span>
                    <span className="text-xs text-slate-400">
                      Rating: <strong className="text-white">{filteredRows[1].rating}</strong>
                      {filteredRows[1].country && ` • ${filteredRows[1].country}`}
                    </span>
                  </div>
                </motion.div>

                {/* 1st Place (Gold Podium) */}
                <motion.div
                  initial={{ opacity: 0, scale: 0.98 }}
                  animate={{ opacity: 1, scale: 1 }}
                  className="rounded-2xl glass-card p-5 border border-amber-500/40 bg-gradient-to-b from-amber-500/10 to-transparent flex items-center gap-4 relative overflow-hidden order-1 md:order-2 shadow-lg shadow-amber-500/10"
                >
                  <div className="absolute top-2 right-3 text-2xl font-black text-amber-500/30">#1</div>
                  <div className="w-12 h-12 rounded-full flex items-center justify-center bg-amber-400 text-black font-black text-base flex-shrink-0 shadow-xl shadow-amber-400/30">
                    👑
                  </div>
                  <div className="min-w-0">
                    <span className="text-base font-black text-amber-300 block truncate">
                      {filteredRows[0].teamName || filteredRows[0].playerName}
                    </span>
                    <span className="text-xs text-slate-300">
                      Rating: <strong className="text-amber-300">{filteredRows[0].rating}</strong>
                      {filteredRows[0].points && ` • Points: ${filteredRows[0].points}`}
                      {filteredRows[0].country && ` • ${filteredRows[0].country}`}
                    </span>
                  </div>
                </motion.div>

                {/* 3rd Place */}
                <motion.div
                  initial={{ opacity: 0, y: 15 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="rounded-2xl glass-card p-5 border border-slate-700/60 flex items-center gap-4 relative overflow-hidden order-3 md:order-3"
                >
                  <div className="absolute top-2 right-3 text-2xl font-black text-slate-600/30">#3</div>
                  <div className="w-10 h-10 rounded-full flex items-center justify-center bg-amber-700/80 text-white font-black text-sm flex-shrink-0 shadow-lg">
                    🥉
                  </div>
                  <div className="min-w-0">
                    <span className="text-sm font-bold text-white block truncate">
                      {filteredRows[2].teamName || filteredRows[2].playerName}
                    </span>
                    <span className="text-xs text-slate-400">
                      Rating: <strong className="text-white">{filteredRows[2].rating}</strong>
                      {filteredRows[2].country && ` • ${filteredRows[2].country}`}
                    </span>
                  </div>
                </motion.div>
              </div>
            )}

            {/* Table Leaderboard */}
            <div className="rounded-2xl glass-panel border border-white/[0.08] overflow-hidden shadow-2xl">
              <div className="overflow-x-auto">
                <table className="w-full text-left text-xs">
                  <thead className="bg-slate-900/90 text-slate-400 font-bold uppercase tracking-wider border-b border-white/[0.06]">
                    <tr>
                      <th className="py-3.5 px-4 w-16 text-center">Rank</th>
                      <th className="py-3.5 px-4">{activeType === 'teams' ? 'Team' : 'Player'}</th>
                      {activeType === 'players' && <th className="py-3.5 px-4">Country</th>}
                      {activeType === 'teams' && <th className="py-3.5 px-4 text-center">Matches</th>}
                      {activeType === 'teams' && <th className="py-3.5 px-4 text-center">Points</th>}
                      <th className="py-3.5 px-4 text-right">Rating</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-white/[0.04]">
                    {filteredRows.map((row: any, idx: number) => {
                      const rank = row.pos || row.rank || idx + 1;
                      const name = row.teamName || row.playerName;
                      const logo = row.teamLogo;
                      const link = row.teamLink || row.playerLink;

                      const isTop3 = Number(rank) <= 3;

                      return (
                        <tr
                          key={idx}
                          className="hover:bg-white/[0.03] transition-colors"
                        >
                          <td className="py-3.5 px-4 text-center font-bold">
                            {rank === '1' || rank === 1 ? (
                              <span className="text-amber-400">🥇 1</span>
                            ) : rank === '2' || rank === 2 ? (
                              <span className="text-slate-300">🥈 2</span>
                            ) : rank === '3' || rank === 3 ? (
                              <span className="text-amber-600">🥉 3</span>
                            ) : (
                              <span className="text-slate-400">{rank}</span>
                            )}
                          </td>

                          <td className="py-3.5 px-4">
                            <div className="flex items-center gap-3">
                              {logo && (
                                <ImageWithFallback
                                  src={logo}
                                  alt={name}
                                  fallbackText={name}
                                  width={26}
                                  height={26}
                                />
                              )}
                              <span className={`font-bold ${isTop3 ? 'text-white' : 'text-slate-200'}`}>
                                {name}
                              </span>
                              {link && (
                                <a
                                  href={link}
                                  target="_blank"
                                  rel="noopener noreferrer"
                                  className="text-slate-500 hover:text-emerald-400 ml-1"
                                >
                                  <ArrowUpRight className="w-3 h-3" />
                                </a>
                              )}
                            </div>
                          </td>

                          {activeType === 'players' && (
                            <td className="py-3.5 px-4 text-slate-400 font-semibold">
                              {row.country || '-'}
                            </td>
                          )}

                          {activeType === 'teams' && (
                            <td className="py-3.5 px-4 text-center text-slate-300 font-medium">
                              {row.matches || '-'}
                            </td>
                          )}

                          {activeType === 'teams' && (
                            <td className="py-3.5 px-4 text-center text-slate-300 font-medium">
                              {row.points || '-'}
                            </td>
                          )}

                          <td className="py-3.5 px-4 text-right font-black text-emerald-400">
                            {row.rating || '-'}
                          </td>
                        </tr>
                      );
                    })}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        ) : (
          <EmptyState
            type="rankings"
            title="No rankings available"
            message="Unable to load ICC rankings table. Please check back later."
            onRetry={fetchRankings}
          />
        )}
      </div>
    </div>
  );
}
