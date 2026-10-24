'use client';

import React, { useEffect, useState, useMemo } from 'react';
import { cricketApi } from '@/services/api';
import ImageWithFallback from '@/components/common/ImageWithFallback';
import EmptyState from '@/components/common/EmptyState';
import Hero from '@/components/home/hero';
import { Trophy, Users, Shield, Search, RefreshCw, X } from 'lucide-react';

export default function RankingsPage() {
  const [category, setCategory] = useState<'teams' | 'players'>('teams');
  const [selectedFormat, setSelectedFormat] = useState<'test' | 'odi' | 't20'>('test');
  const [playerRole, setPlayerRole] = useState<'batting' | 'bowling' | 'allRounder'>('batting');

  const [teamRankings, setTeamRankings] = useState<any>(null);
  const [playerRankings, setPlayerRankings] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const [refreshing, setRefreshing] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');

  const fetchRankings = async (isManual = false) => {
    if (isManual) setRefreshing(true);
    else setLoading(true);

    try {
      const [teams, players] = await Promise.all([
        cricketApi.getTeamRankings(),
        cricketApi.getPlayerRankings()
      ]);
      setTeamRankings(teams);
      setPlayerRankings(players);
    } catch (err) {
      console.warn('Failed to load rankings:', err);
    } finally {
      setLoading(false);
      setRefreshing(false);
    }
  };

  useEffect(() => {
    fetchRankings();
  }, []);

  // Resolve team ranking table
  const currentTeamList = useMemo(() => {
    if (!teamRankings) return [];
    
    // Array format from backend
    if (Array.isArray(teamRankings)) {
      const targetTitlePattern = selectedFormat === 'test' 
        ? /test/i 
        : selectedFormat === 'odi' 
        ? /\bodi\b/i 
        : /t20/i;
      
      const foundBlock = teamRankings.find((block: any) => 
        targetTitlePattern.test(block.tableTitle || '')
      );
      return foundBlock?.teams || [];
    }

    // Object format fallback
    if (selectedFormat === 'test') return teamRankings.test || teamRankings.testTeams || [];
    if (selectedFormat === 'odi') return teamRankings.odi || teamRankings.odiTeams || [];
    return teamRankings.t20 || teamRankings.t20Teams || [];
  }, [teamRankings, selectedFormat]);

  // Resolve player ranking table
  const currentPlayerList = useMemo(() => {
    if (!playerRankings) return [];

    // Array format from backend
    if (Array.isArray(playerRankings)) {
      const formatStr = selectedFormat === 'test' ? 'test' : selectedFormat === 'odi' ? 'odi' : 't20';
      const roleStr = playerRole === 'batting' ? 'batter' : playerRole === 'bowling' ? 'bowler' : 'all rounder';

      const foundBlock = playerRankings.find((block: any) => {
        const title = (block.tableTitle || '').toLowerCase();
        const formatMatch = formatStr === 'odi' 
          ? (title.includes('odi') && !title.includes('wodi'))
          : formatStr === 't20'
          ? (title.includes('t20') && !title.includes('wt20'))
          : title.includes('test');

        const roleMatch = roleStr === 'all rounder'
          ? title.includes('all rounder') || title.includes('all-rounder') || title.includes('allrounder')
          : title.includes(roleStr);

        return formatMatch && roleMatch;
      });

      return foundBlock?.players || [];
    }

    // Object format fallback
    const key = `${selectedFormat}${playerRole.charAt(0).toUpperCase() + playerRole.slice(1)}`;
    return playerRankings[key] || [];
  }, [playerRankings, selectedFormat, playerRole]);

  const rawList = category === 'teams' ? currentTeamList : currentPlayerList;

  const normalizedList = useMemo(() => {
    if (!Array.isArray(rawList)) return [];

    return rawList.map((item: any, index: number) => {
      if (category === 'teams') {
        return {
          rank: item.rank || item.position || index + 1,
          name: item.teamName || item.team || item.name || '',
          flag: item.flag || '',
          matches: item.matches || item.played || '-',
          points: item.points || '-',
          rating: item.rating || item.points || '-'
        };
      }

      return {
        rank: item.rank || item.position || index + 1,
        name: item.playerName || item.name || item.player || '',
        flag: item.flag || item.countryFlag || '',
        country: item.country || item.team || '',
        rating: item.rating || item.points || '-'
      };
    });
  }, [rawList, category]);

  const filteredList = useMemo(() => {
    const q = searchQuery.toLowerCase().trim();
    if (!q) return normalizedList;

    return normalizedList.filter((item) => {
      return item.name.toLowerCase().includes(q) || item.country?.toLowerCase().includes(q);
    });
  }, [normalizedList, searchQuery]);

  const top3 = filteredList.slice(0, 3);

  return (
    <div className="min-h-screen">
      <Hero
        image="/images/rankingsHeader.jpg"
        heading="Official ICC Cricket Rankings"
        subtitle="Official International Cricket Council standings for national teams and top-ranked players across all formats."
      />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 sm:py-10 space-y-6">
        {/* Category Switcher & Refresh */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-white/[0.08] pb-4">
          <div className="flex items-center gap-2">
            <button
              onClick={() => { setCategory('teams'); setSearchQuery(''); }}
              className={`flex items-center gap-2 px-4 py-2 rounded-xl text-xs sm:text-sm font-bold transition-all ${
                category === 'teams'
                  ? 'bg-gradient-to-r from-red-600 to-red-500 text-white shadow-[0_0_18px_rgba(220,38,38,0.5)] border border-red-400/40'
                  : 'bg-white/[0.04] border border-white/10 text-slate-300 hover:bg-white/[0.08] hover:text-white'
              }`}
            >
              <Shield className="w-4 h-4" />
              <span>Team Rankings</span>
            </button>
            <button
              onClick={() => { setCategory('players'); setSearchQuery(''); }}
              className={`flex items-center gap-2 px-4 py-2 rounded-xl text-xs sm:text-sm font-bold transition-all ${
                category === 'players'
                  ? 'bg-gradient-to-r from-red-600 to-red-500 text-white shadow-[0_0_18px_rgba(220,38,38,0.5)] border border-red-400/40'
                  : 'bg-white/[0.04] border border-white/10 text-slate-300 hover:bg-white/[0.08] hover:text-white'
              }`}
            >
              <Users className="w-4 h-4" />
              <span>Player Rankings</span>
            </button>
          </div>

          <button
            onClick={() => fetchRankings(true)}
            disabled={loading || refreshing}
            className="self-start sm:self-auto inline-flex items-center gap-2 px-4 py-2 rounded-xl text-xs font-bold bg-white/[0.04] border border-white/10 text-slate-300 hover:bg-white/[0.1] hover:border-red-500/40 hover:text-white transition-all shadow-md disabled:opacity-50 active:scale-95"
          >
            <RefreshCw className={`w-3.5 h-3.5 ${refreshing ? 'animate-spin text-red-500' : ''}`} />
            <span>{refreshing ? 'Updating...' : 'Refresh'}</span>
          </button>
        </div>

        {/* Filter Controls: Format (Test, ODI, T20) & Role (if players) */}
        <div className="flex flex-wrap items-center justify-between gap-4">
          <div className="flex flex-wrap items-center gap-2">
            {/* Format Pills */}
            {(['test', 'odi', 't20'] as const).map((fmt) => (
              <button
                key={fmt}
                onClick={() => setSelectedFormat(fmt)}
                className={`px-3.5 py-1.5 rounded-xl text-xs font-bold uppercase transition-all ${
                  selectedFormat === fmt
                    ? 'bg-white text-slate-900 shadow-md font-extrabold'
                    : 'bg-white/[0.04] border border-white/10 text-slate-300 hover:bg-white/[0.08] hover:text-white'
                }`}
              >
                {fmt === 't20' ? 'T20I' : fmt.toUpperCase()}
              </button>
            ))}

            {/* Role Pills if Players */}
            {category === 'players' && (
              <div className="flex items-center gap-1.5 pl-2 border-l border-white/10">
                {(['batting', 'bowling', 'allRounder'] as const).map((role) => (
                  <button
                    key={role}
                    onClick={() => setPlayerRole(role)}
                    className={`px-3 py-1.5 rounded-xl text-xs font-semibold capitalize transition-all ${
                      playerRole === role
                        ? 'bg-gradient-to-r from-red-600 to-red-500 text-white font-bold shadow-[0_0_15px_rgba(220,38,38,0.4)] border border-red-400/30'
                        : 'bg-white/[0.04] border border-white/10 text-slate-300 hover:bg-white/[0.08] hover:text-white'
                    }`}
                  >
                    {role === 'allRounder' ? 'All-Rounder' : role}
                  </button>
                ))}
              </div>
            )}
          </div>

          {/* Search Box */}
          <div className="relative w-full sm:w-64">
            <Search className="w-4 h-4 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2" />
            <input
              type="text"
              placeholder={category === 'teams' ? 'Search team...' : 'Search player or country...'}
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-9 pr-9 py-1.5 text-xs bg-white/[0.04] backdrop-blur-md border border-white/10 rounded-xl text-white placeholder:text-slate-500 focus:outline-none focus:border-red-500 focus:ring-1 focus:ring-red-500 shadow-md"
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
        </div>

        {/* Content */}
        {loading ? (
          <div className="space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div className="h-44 bg-white/[0.035] border border-white/[0.07] rounded-2xl shimmer-block" />
              <div className="h-44 bg-white/[0.035] border border-white/[0.07] rounded-2xl shimmer-block" />
              <div className="h-44 bg-white/[0.035] border border-white/[0.07] rounded-2xl shimmer-block" />
            </div>
            <div className="h-64 bg-white/[0.035] border border-white/[0.07] rounded-2xl shimmer-block" />
          </div>
        ) : filteredList.length === 0 ? (
          <EmptyState
            type="rankings"
            title="No Rankings Available"
            message="No ranking records found for this format or search criteria."
            onRetry={fetchRankings}
          />
        ) : (
          <div className="space-y-6">
            {/* Top 3 Podium */}
            {!searchQuery && top3.length === 3 && (
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                {/* 2nd Place */}
                <div className="order-2 md:order-1 bg-white/[0.035] backdrop-blur-xl border border-white/[0.08] hover:border-white/20 rounded-2xl p-5 shadow-lg flex flex-col items-center text-center space-y-2.5 transition-all">
                  <div className="w-8 h-8 rounded-full bg-white/10 border border-white/20 flex items-center justify-center text-sm font-extrabold text-slate-200">
                    🥈
                  </div>
                  <ImageWithFallback
                    src={top3[1].flag}
                    alt={top3[1].name}
                    width={44}
                    height={30}
                    fallbackText={top3[1].name}
                  />
                  <h3 className="font-bold text-white text-sm truncate max-w-full">
                    {top3[1].name}
                  </h3>
                  {category === 'players' && top3[1].country && (
                    <span className="text-[11px] font-semibold text-slate-400">{top3[1].country}</span>
                  )}
                  <div className="text-xs text-slate-400 font-semibold pt-1">
                    Rating: <span className="text-white font-bold">{top3[1].rating}</span>
                  </div>
                </div>

                {/* 1st Place (Champion) */}
                <div className="order-1 md:order-2 bg-gradient-to-b from-amber-500/10 to-white/[0.04] backdrop-blur-xl border-2 border-amber-400/50 rounded-2xl p-6 shadow-[0_0_30px_rgba(245,158,11,0.2)] flex flex-col items-center text-center space-y-2.5 relative">
                  <div className="absolute -top-3 px-3 py-0.5 rounded-full bg-amber-400 text-amber-950 font-black text-[10px] uppercase tracking-wider shadow-md">
                    Rank 1 Champion
                  </div>
                  <div className="w-10 h-10 rounded-full bg-amber-400/20 border border-amber-400/40 flex items-center justify-center text-base font-extrabold text-amber-300 mt-1">
                    🥇
                  </div>
                  <ImageWithFallback
                    src={top3[0].flag}
                    alt={top3[0].name}
                    width={52}
                    height={36}
                    fallbackText={top3[0].name}
                  />
                  <h3 className="font-extrabold text-white text-base truncate max-w-full">
                    {top3[0].name}
                  </h3>
                  {category === 'players' && top3[0].country && (
                    <span className="text-xs font-semibold text-slate-300">{top3[0].country}</span>
                  )}
                  <div className="text-xs text-slate-400 font-semibold pt-1">
                    Rating: <span className="text-red-400 font-extrabold text-sm">{top3[0].rating}</span>
                  </div>
                </div>

                {/* 3rd Place */}
                <div className="order-3 bg-white/[0.035] backdrop-blur-xl border border-white/[0.08] hover:border-amber-700/40 rounded-2xl p-5 shadow-lg flex flex-col items-center text-center space-y-2.5 transition-all">
                  <div className="w-8 h-8 rounded-full bg-amber-900/30 border border-amber-600/30 flex items-center justify-center text-sm font-extrabold text-amber-300">
                    🥉
                  </div>
                  <ImageWithFallback
                    src={top3[2].flag}
                    alt={top3[2].name}
                    width={44}
                    height={30}
                    fallbackText={top3[2].name}
                  />
                  <h3 className="font-bold text-white text-sm truncate max-w-full">
                    {top3[2].name}
                  </h3>
                  {category === 'players' && top3[2].country && (
                    <span className="text-[11px] font-semibold text-slate-400">{top3[2].country}</span>
                  )}
                  <div className="text-xs text-slate-400 font-semibold pt-1">
                    Rating: <span className="text-white font-bold">{top3[2].rating}</span>
                  </div>
                </div>
              </div>
            )}

            {/* Full Leaderboard Table */}
            <div className="bg-white/[0.035] backdrop-blur-xl border border-white/[0.08] rounded-2xl overflow-hidden shadow-lg">
              <div className="overflow-x-auto">
                <table className="w-full text-left text-sm">
                  <thead>
                    <tr className="bg-white/[0.04] text-slate-400 text-xs font-bold uppercase tracking-wider border-b border-white/[0.08]">
                      <th className="py-3 px-4 w-16 text-center">Rank</th>
                      <th className="py-3 px-4">
                        {category === 'teams' ? 'Team' : 'Player'}
                      </th>
                      {category === 'teams' ? (
                        <>
                          <th className="py-3 px-4 text-center">Matches</th>
                          <th className="py-3 px-4 text-center">Points</th>
                          <th className="py-3 px-4 text-right">Rating</th>
                        </>
                      ) : (
                        <>
                          <th className="py-3 px-4">Country</th>
                          <th className="py-3 px-4 text-right">Rating</th>
                        </>
                      )}
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-white/[0.05]">
                    {filteredList.map((item, idx) => (
                      <tr
                        key={idx}
                        className="hover:bg-red-500/[0.08] transition-colors"
                      >
                        <td className="py-3 px-4 text-center font-bold text-slate-300">
                          {item.rank}
                        </td>
                        <td className="py-3 px-4">
                          <div className="flex items-center gap-3">
                            <ImageWithFallback
                              src={item.flag}
                              alt={item.name}
                              width={26}
                              height={18}
                              fallbackText={item.name}
                            />
                            <span className="font-bold text-white">
                              {item.name}
                            </span>
                          </div>
                        </td>
                        {category === 'teams' ? (
                          <>
                            <td className="py-3 px-4 text-center text-slate-400 font-medium">
                              {item.matches}
                            </td>
                            <td className="py-3 px-4 text-center text-slate-400 font-medium">
                              {item.points}
                            </td>
                            <td className="py-3 px-4 text-right font-extrabold text-white">
                              {item.rating}
                            </td>
                          </>
                        ) : (
                          <>
                            <td className="py-3 px-4 text-slate-400 font-medium">
                              {item.country || '—'}
                            </td>
                            <td className="py-3 px-4 text-right font-extrabold text-white">
                              {item.rating}
                            </td>
                          </>
                        )}
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
