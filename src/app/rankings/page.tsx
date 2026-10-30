'use client';

import React, { useState, useMemo } from 'react';
import { useTeamRankings, usePlayerRankings } from '@/hooks/useCricketQueries';
import ImageWithFallback from '@/components/common/ImageWithFallback';
import EmptyState from '@/components/common/EmptyState';
import RankingsSkeleton from '@/components/rankings/RankingsSkeleton';
import Hero from '@/components/home/hero';
import { Trophy, Users, Shield, Search, RefreshCw } from 'lucide-react';

export default function RankingsPage() {
  const [category, setCategory] = useState<'teams' | 'players'>('teams');
  const [selectedFormat, setSelectedFormat] = useState<'test' | 'odi' | 't20'>('test');
  const [playerRole, setPlayerRole] = useState<'batting' | 'bowling' | 'allRounder'>('batting');
  const [searchQuery, setSearchQuery] = useState('');

  // React Query hooks with automatic caching and background syncing
  const {
    data: teamRankings,
    isLoading: isTeamLoading,
    isFetching: isTeamFetching,
    refetch: refetchTeams
  } = useTeamRankings();

  const {
    data: playerRankings,
    isLoading: isPlayerLoading,
    isFetching: isPlayerFetching,
    refetch: refetchPlayers
  } = usePlayerRankings();

  const loading = category === 'teams' ? isTeamLoading : isPlayerLoading;
  const refreshing = isTeamFetching || isPlayerFetching;

  const handleRefresh = async () => {
    if (category === 'teams') {
      await refetchTeams();
    } else {
      await refetchPlayers();
    }
  };

  // Resolve team ranking table
  const currentTeamList = useMemo(() => {
    if (!teamRankings) return [];

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

    if (selectedFormat === 'test') return teamRankings.test || teamRankings.testTeams || [];
    if (selectedFormat === 'odi') return teamRankings.odi || teamRankings.odiTeams || [];
    return teamRankings.t20 || teamRankings.t20Teams || [];
  }, [teamRankings, selectedFormat]);

  // Resolve player ranking table from Cricbuzz
  const currentPlayerList = useMemo(() => {
    if (!playerRankings) return [];

    if (Array.isArray(playerRankings)) {
      const formatStr = selectedFormat === 'test' ? 'test' : selectedFormat === 'odi' ? 'odi' : 't20';
      const roleStr = playerRole === 'batting' ? 'batting' : playerRole === 'bowling' ? 'bowling' : 'all-rounder';

      const foundBlock = playerRankings.find((block: any) => {
        const title = (block.tableTitle || '').toLowerCase();
        const formatMatch = formatStr === 'odi' 
          ? (title.includes('odi') && !title.includes('wodi'))
          : formatStr === 't20'
          ? (title.includes('t20') && !title.includes('wt20'))
          : title.includes('test');

        const roleMatch = roleStr === 'all-rounder'
          ? title.includes('all-rounder') || title.includes('all rounder') || title.includes('allrounder')
          : title.includes(roleStr) || title.includes(playerRole === 'batting' ? 'batter' : 'bowler');

        return formatMatch && roleMatch;
      });

      return foundBlock?.players || [];
    }

    const formatBlock = playerRankings[selectedFormat] || playerRankings;
    if (playerRole === 'batting') return formatBlock.batting || formatBlock.batters || [];
    if (playerRole === 'bowling') return formatBlock.bowling || formatBlock.bowlers || [];
    return formatBlock.allRounder || formatBlock.allrounders || [];
  }, [playerRankings, selectedFormat, playerRole]);

  const rawList = category === 'teams' ? currentTeamList : currentPlayerList;

  // Normalize list entries for consistent rendering with Cricbuzz player images & team logos
  const normalizedList = useMemo(() => {
    if (!Array.isArray(rawList)) return [];
    return rawList.map((item: any, idx: number) => {
      const rank = item.pos || item.rank || idx + 1;
      const name =
        category === 'players'
          ? item.playerName || item.name || item.player || '—'
          : item.teamName || item.name || item.team || '—';
      const flag = item.playerImage || item.image || item.teamLogo || item.flag || null;
      const country = item.country || (category === 'players' ? item.team : '') || '';
      const matches = item.matches && item.matches !== '$undefined' ? item.matches : '—';
      const points = item.points && item.points !== '$undefined' ? item.points : '—';
      const rating = item.rating && item.rating !== '$undefined' ? item.rating : '—';

      return {
        rank: Number(rank) || idx + 1,
        name,
        flag,
        country,
        matches,
        points,
        rating,
        raw: item,
      };
    });
  }, [rawList, category]);

  const filteredList = useMemo(() => {
    const q = searchQuery.toLowerCase().trim();
    if (!q) return normalizedList;

    return normalizedList.filter((item) => {
      return item.name.toLowerCase().includes(q) || item.country.toLowerCase().includes(q);
    });
  }, [normalizedList, searchQuery]);

  const formatTitle = selectedFormat === 't20' ? 'T20I' : selectedFormat.toUpperCase();
  const roleTitle = playerRole === 'allRounder' ? 'All-Rounder' : playerRole.charAt(0).toUpperCase() + playerRole.slice(1);

  return (
    <div className="min-h-screen bg-slate-50 pb-16">
      <Hero
        image="/images/rankingsHeader.jpg"
        heading="Official ICC Cricket Rankings"
        subtitle="Live official ICC standings for national teams and top-ranked players across all international formats with verified statistics."
      />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6 sm:py-8 space-y-6">
        {/* Category Switcher & Refresh */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-slate-200 pb-4">
          <div className="flex items-center gap-2">
            <button
              onClick={() => { setCategory('teams'); setSearchQuery(''); }}
              className={`flex items-center gap-2 px-4 py-2 rounded-lg font-heading font-black text-xs uppercase tracking-wider transition-all cursor-pointer ${
                category === 'teams'
                  ? 'bg-red-600 text-white shadow-xs'
                  : 'bg-white border border-slate-200 text-slate-700 hover:bg-slate-100 hover:text-red-600'
              }`}
            >
              <Shield className="w-4 h-4" />
              <span>Team Rankings</span>
            </button>
            <button
              onClick={() => { setCategory('players'); setSearchQuery(''); }}
              className={`flex items-center gap-2 px-4 py-2 rounded-lg font-heading font-black text-xs uppercase tracking-wider transition-all cursor-pointer ${
                category === 'players'
                  ? 'bg-red-600 text-white shadow-xs'
                  : 'bg-white border border-slate-200 text-slate-700 hover:bg-slate-100 hover:text-red-600'
              }`}
            >
              <Users className="w-4 h-4" />
              <span>Player Rankings</span>
            </button>
          </div>

          <button
            onClick={handleRefresh}
            disabled={refreshing}
            className="self-start sm:self-auto inline-flex items-center gap-2 px-3.5 py-2 rounded-lg text-xs font-bold bg-white border border-slate-200 text-slate-700 hover:bg-slate-100 hover:text-red-600 transition-colors shadow-2xs disabled:opacity-50"
          >
            <RefreshCw className={`w-3.5 h-3.5 ${refreshing ? 'animate-spin text-red-600' : ''}`} />
            <span>{refreshing ? 'Updating...' : 'Refresh'}</span>
          </button>
        </div>

        {/* Filter Controls: Format (Test, ODI, T20) & Role (if players) & Search */}
        <div className="flex flex-wrap items-center justify-between gap-4">
          <div className="flex flex-wrap items-center gap-2">
            {/* Format Pills */}
            {(['test', 'odi', 't20'] as const).map((fmt) => (
              <button
                key={fmt}
                onClick={() => setSelectedFormat(fmt)}
                className={`px-3.5 py-1.5 rounded-lg text-xs font-bold uppercase transition-all ${
                  selectedFormat === fmt
                    ? 'bg-slate-900 text-white shadow-xs'
                    : 'bg-white border border-slate-200 text-slate-700 hover:bg-slate-100'
                }`}
              >
                {fmt === 't20' ? 'T20I' : fmt.toUpperCase()}
              </button>
            ))}

            {/* Role Pills if Players */}
            {category === 'players' && (
              <div className="flex items-center gap-1.5 pl-2 border-l border-slate-200">
                {(['batting', 'bowling', 'allRounder'] as const).map((role) => (
                  <button
                    key={role}
                    onClick={() => setPlayerRole(role)}
                    className={`px-3 py-1.5 rounded-lg text-xs font-semibold capitalize transition-all ${
                      playerRole === role
                        ? 'bg-red-600 text-white font-bold shadow-xs'
                        : 'bg-white border border-slate-200 text-slate-700 hover:bg-slate-100'
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
              className="w-full pl-9 pr-4 py-1.5 text-xs bg-white border border-slate-200 rounded-lg text-slate-900 placeholder:text-slate-400 focus:outline-none focus:border-red-500 focus:ring-1 focus:ring-red-500 shadow-2xs"
            />
          </div>
        </div>

        {/* Content - Championship Leaderboard Table (NO Top 3 Podium Cards) */}
        {loading ? (
          <RankingsSkeleton />
        ) : filteredList.length === 0 ? (
          <EmptyState
            type="rankings"
            title="No Rankings Available"
            message="No ranking records found for this format or search criteria."
            actionLabel="Reset Search"
            onAction={() => setSearchQuery('')}
          />
        ) : (
          <div className="bg-white border border-slate-200 rounded-xl overflow-hidden shadow-2xs">
            {/* Table Header Strip */}
            <div className="flex items-center justify-between px-4 sm:px-6 py-3.5 border-b border-slate-200 bg-slate-50/70">
              <div className="flex items-center gap-2">
                <span className="w-1.5 h-4 bg-red-600 rounded-full" />
                <h3 className="text-xs sm:text-sm font-extrabold text-slate-900 tracking-tight">
                  {category === 'teams'
                    ? `${formatTitle} Men's Team Standings`
                    : `${formatTitle} Men's ${roleTitle} Rankings`}
                </h3>
              </div>
              <span className="text-xs font-bold px-2.5 py-0.5 rounded-full bg-slate-100 text-slate-600 border border-slate-200">
                {filteredList.length} Ranked
              </span>
            </div>

            {/* Championship Leaderboard Table */}
            <div className="overflow-x-auto">
              <table className="w-full text-left text-sm">
                <thead>
                  <tr className="bg-slate-100/80 text-slate-600 text-xs font-bold uppercase tracking-wider border-b border-slate-200">
                    <th className="py-3 px-3 sm:px-4 w-16 text-center">Rank</th>
                    <th className="py-3 px-3 sm:px-4">
                      {category === 'teams' ? 'Team' : 'Player'}
                    </th>
                    {category === 'teams' ? (
                      <>
                        <th className="py-3 px-3 sm:px-4 text-center">Matches</th>
                        <th className="py-3 px-3 sm:px-4 text-center">Points</th>
                        <th className="py-3 px-3 sm:px-4 text-right">Rating</th>
                      </>
                    ) : (
                      <>
                        <th className="py-3 px-3 sm:px-4">Country</th>
                        <th className="py-3 px-3 sm:px-4 text-right">Rating</th>
                      </>
                    )}
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-100">
                  {filteredList.map((item, idx) => {
                    const isRank1 = item.rank === 1;
                    const isRank2 = item.rank === 2;
                    const isRank3 = item.rank === 3;

                    return (
                      <tr
                        key={idx}
                        className={`transition-colors ${
                          isRank1
                            ? 'bg-amber-50/30 hover:bg-amber-50/60'
                            : 'hover:bg-slate-50'
                        }`}
                      >
                        {/* Rank Column with Podium Badges */}
                        <td className="py-3.5 px-3 sm:px-4 text-center">
                          {isRank1 ? (
                            <span className="inline-flex items-center justify-center w-7 h-7 rounded-full bg-gradient-to-br from-amber-400 to-amber-500 text-amber-950 font-black text-xs shadow-xs ring-2 ring-amber-200">
                              1
                            </span>
                          ) : isRank2 ? (
                            <span className="inline-flex items-center justify-center w-7 h-7 rounded-full bg-gradient-to-br from-slate-200 to-slate-300 text-slate-800 font-black text-xs shadow-xs ring-2 ring-slate-200">
                              2
                            </span>
                          ) : isRank3 ? (
                            <span className="inline-flex items-center justify-center w-7 h-7 rounded-full bg-gradient-to-br from-amber-600 to-amber-700 text-white font-black text-xs shadow-xs ring-2 ring-amber-500/30">
                              3
                            </span>
                          ) : (
                            <span className="inline-flex items-center justify-center w-7 h-7 font-bold text-slate-500 text-xs tabular-nums">
                              {item.rank}
                            </span>
                          )}
                        </td>

                        {/* Player / Team Column */}
                        <td className="py-3.5 px-3 sm:px-4">
                          <div className="flex items-center gap-3 min-w-0">
                            {category === 'players' ? (
                              <div
                                className={`w-9 h-9 sm:w-10 sm:h-10 rounded-full overflow-hidden flex-shrink-0 flex items-center justify-center border shadow-xs ${
                                  isRank1
                                    ? 'border-amber-400 ring-2 ring-amber-200/80 bg-amber-50'
                                    : 'border-slate-200 bg-slate-50'
                                }`}
                              >
                                <ImageWithFallback
                                  src={item.flag}
                                  alt={item.name}
                                  width={40}
                                  height={40}
                                  className="w-full h-full object-cover"
                                  fallbackText={item.name}
                                />
                              </div>
                            ) : (
                              <ImageWithFallback
                                src={item.flag}
                                alt={item.name}
                                width={28}
                                height={20}
                                className="w-7 h-5 object-contain flex-shrink-0"
                                fallbackText={item.name}
                              />
                            )}

                            <div className="min-w-0 flex-1">
                              <span
                                className={`font-bold truncate text-sm sm:text-base block ${
                                  isRank1 ? 'text-slate-900 font-extrabold' : 'text-slate-900'
                                }`}
                                title={item.name}
                              >
                                {item.name}
                              </span>
                              {category === 'players' && item.country && (
                                <span className="text-[11px] font-semibold text-slate-500 block truncate sm:hidden">
                                  {item.country}
                                </span>
                              )}
                            </div>
                          </div>
                        </td>

                        {/* Dynamic Columns based on category */}
                        {category === 'teams' ? (
                          <>
                            <td className="py-3.5 px-3 sm:px-4 text-center text-slate-600 font-semibold text-xs sm:text-sm">
                              {item.matches}
                            </td>
                            <td className="py-3.5 px-3 sm:px-4 text-center text-slate-600 font-semibold text-xs sm:text-sm">
                              {item.points}
                            </td>
                            <td className="py-3.5 px-3 sm:px-4 text-right">
                              <span
                                className={`text-sm sm:text-base tabular-nums ${
                                  isRank1 ? 'text-red-600 font-black' : 'text-slate-900 font-extrabold'
                                }`}
                              >
                                {item.rating}
                              </span>
                            </td>
                          </>
                        ) : (
                          <>
                            <td className="py-3.5 px-3 sm:px-4 text-slate-600 font-semibold text-xs sm:text-sm">
                              {item.country || '—'}
                            </td>
                            <td className="py-3.5 px-3 sm:px-4 text-right">
                              <span
                                className={`text-sm sm:text-base tabular-nums ${
                                  isRank1 ? 'text-red-600 font-black' : 'text-slate-900 font-extrabold'
                                }`}
                              >
                                {item.rating}
                              </span>
                            </td>
                          </>
                        )}
                      </tr>
                    );
                  })}
                </tbody>
              </table>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
