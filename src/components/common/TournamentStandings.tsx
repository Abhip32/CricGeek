'use client';

import React, { useState, useEffect } from 'react';
import { useStandings, useSeriesList } from '@/hooks/useCricketQueries';
import ImageWithFallback from './ImageWithFallback';
import { Trophy, Shield, ChevronDown, Award, TrendingUp, AlertCircle } from 'lucide-react';
import { TournamentStanding } from '@/types/match';

interface TournamentStandingsProps {
  initialLeagueId?: string;
  showHeader?: boolean;
  className?: string;
}

// Popular cricket tournaments fallback list if API series list is loading
const POPULAR_TOURNAMENTS = [
  { id: '21284', name: "Women's Big Bash League" },
  { id: '8043', name: 'Sheffield Shield' },
  { id: '8880', name: 'The Ford Trophy' },
  { id: '19553', name: 'CWC Challenge League' },
  { id: '8836', name: "President's Trophy" },
  { id: '8838', name: 'Pro50 Championship' }
];

export const TournamentStandings: React.FC<TournamentStandingsProps> = ({
  initialLeagueId,
  showHeader = true,
  className = ''
}) => {
  const { data: seriesListData, isLoading: isSeriesLoading } = useSeriesList();

  // Combine fetched active tournaments with popular presets
  const availableTournaments = React.useMemo(() => {
    const list: Array<{ id: string; name: string }> = [];
    const seen = new Set<string>();

    if (Array.isArray(seriesListData)) {
      seriesListData.forEach((s: any) => {
        if (s.id && !seen.has(String(s.id))) {
          seen.add(String(s.id));
          list.push({ id: String(s.id), name: s.name });
        }
      });
    }

    // Append presets if not already included
    POPULAR_TOURNAMENTS.forEach((t) => {
      if (!seen.has(t.id)) {
        seen.add(t.id);
        list.push(t);
      }
    });

    return list;
  }, [seriesListData]);

  const [selectedLeagueId, setSelectedLeagueId] = useState<string>(
    initialLeagueId || availableTournaments[0]?.id || '21284'
  );

  useEffect(() => {
    if (!selectedLeagueId && availableTournaments.length > 0) {
      setSelectedLeagueId(availableTournaments[0].id);
    }
  }, [availableTournaments, selectedLeagueId]);

  const { data: standingsData, isLoading: isStandingsLoading, isError } = useStandings(selectedLeagueId);

  const standings: TournamentStanding[] = standingsData?.standings || [];
  const tournamentTitle = standingsData?.tournament || availableTournaments.find(t => t.id === selectedLeagueId)?.name || 'Tournament Standings';

  return (
    <div className={`bg-white border border-slate-200 rounded-2xl shadow-xs overflow-hidden ${className}`}>
      {/* The Alchemists Header with Red Accent Bar */}
      {showHeader && (
        <div className="p-4 sm:p-5 border-b border-slate-200 bg-slate-50/80 flex flex-col sm:flex-row sm:items-center justify-between gap-3">
          <div className="flex items-center gap-2.5">
            <span className="w-1.5 h-5 bg-red-600 rounded-full flex-shrink-0" />
            <div>
              <h2 className="text-sm sm:text-base font-black uppercase tracking-wider text-slate-900 flex items-center gap-2">
                <Trophy className="w-4 h-4 text-red-600" />
                <span>Points Table & Standings</span>
              </h2>
              <p className="text-xs text-slate-500 font-medium mt-0.5">
                Official tournament table, net run rate, and playoff qualification spots
              </p>
            </div>
          </div>

          {/* Quick Select League Dropdown for Mobile / Desktop */}
          <div className="relative min-w-[200px]">
            <select
              value={selectedLeagueId}
              onChange={(e) => setSelectedLeagueId(e.target.value)}
              className="w-full appearance-none bg-white border border-slate-200 text-slate-800 text-xs font-bold py-2 pl-3 pr-8 rounded-lg shadow-2xs hover:border-red-300 focus:outline-none focus:ring-1 focus:ring-red-500 cursor-pointer"
            >
              {availableTournaments.map((t) => (
                <option key={t.id} value={t.id}>
                  {t.name}
                </option>
              ))}
            </select>
            <ChevronDown className="w-3.5 h-3.5 text-slate-400 absolute right-2.5 top-1/2 -translate-y-1/2 pointer-events-none" />
          </div>
        </div>
      )}

      {/* Quick Pills for Tournaments */}
      <div className="px-4 py-3 bg-white border-b border-slate-100 flex items-center gap-2 overflow-x-auto no-scrollbar">
        {availableTournaments.slice(0, 6).map((t) => {
          const isActive = selectedLeagueId === t.id;
          return (
            <button
              key={t.id}
              onClick={() => setSelectedLeagueId(t.id)}
              className={`px-3 py-1.5 rounded-full text-xs font-bold transition-all whitespace-nowrap flex-shrink-0 cursor-pointer ${
                isActive
                  ? 'bg-red-600 text-white shadow-xs'
                  : 'bg-slate-100/90 text-slate-600 hover:text-red-600 hover:bg-slate-200'
              }`}
            >
              {t.name}
            </button>
          );
        })}
      </div>

      {/* Standings Table Body */}
      {isStandingsLoading ? (
        <div className="p-6 space-y-3">
          <div className="h-10 shimmer-block rounded-lg" />
          <div className="h-12 shimmer-block-subtle rounded-lg" />
          <div className="h-12 shimmer-block-subtle rounded-lg" />
          <div className="h-12 shimmer-block-subtle rounded-lg" />
          <div className="h-12 shimmer-block-subtle rounded-lg" />
        </div>
      ) : standings.length === 0 ? (
        <div className="p-10 text-center space-y-3">
          <div className="w-12 h-12 rounded-full bg-slate-100 text-slate-400 mx-auto flex items-center justify-center">
            <Trophy className="w-6 h-6" />
          </div>
          <h3 className="text-sm font-bold text-slate-900">Points Table Not Available</h3>
          <p className="text-xs text-slate-500 max-w-sm mx-auto">
            Standings are not yet published for {tournamentTitle} or the tournament is a bilateral series without a group stage table.
          </p>
        </div>
      ) : (
        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs border-collapse">
            <thead>
              <tr className="bg-slate-100/80 border-b border-slate-200 text-slate-600 text-[11px] font-black uppercase tracking-wider">
                <th className="py-3 px-3.5 w-12 text-center">Pos</th>
                <th className="py-3 px-4 min-w-[180px]">Team</th>
                <th className="py-3 px-3 text-center">P</th>
                <th className="py-3 px-3 text-center">W</th>
                <th className="py-3 px-3 text-center">L</th>
                <th className="py-3 px-3 text-center">NR</th>
                <th className="py-3 px-3 text-right">NRR</th>
                <th className="py-3 px-4 text-right font-black text-slate-900">PTS</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100">
              {standings.map((row, idx) => {
                const rank = row.rank || idx + 1;
                const teamName = row.team?.name || 'Team';
                const abbr = row.team?.abbreviation || '';
                const logo = row.team?.logo || null;

                const stats = row.stats || {};
                const played = stats.gamesPlayed || stats.played || stats.matches || stats.matchesPlayed || '-';
                const won = stats.wins || stats.won || stats.w || '-';
                const lost = stats.losses || stats.lost || stats.l || '-';
                const noResult = stats.noResult || stats.nr || stats.ties || stats.tied || stats.t || '-';
                const nrr = stats.netRunRate || stats.nrr || '-';
                const points = row.points || stats.matchPoints || stats.points || '0';

                // Playoff qualification indicators (Top 2: Qualifier, Top 4: Eliminator)
                const isTop2 = rank <= 2;
                const isTop4 = rank > 2 && rank <= 4;

                return (
                  <tr
                    key={row.team?.id || idx}
                    className={`hover:bg-red-50/40 transition-colors ${
                      isTop2
                        ? 'border-l-4 border-l-emerald-500'
                        : isTop4
                        ? 'border-l-4 border-l-blue-500'
                        : 'border-l-4 border-l-transparent'
                    }`}
                  >
                    {/* Position */}
                    <td className="py-3 px-3.5 text-center font-mono font-bold text-slate-700">
                      <span
                        className={`inline-block w-6 h-6 leading-6 text-center rounded-md text-[11px] font-black ${
                          isTop2
                            ? 'bg-emerald-100 text-emerald-800'
                            : isTop4
                            ? 'bg-blue-100 text-blue-800'
                            : 'bg-slate-100 text-slate-700'
                        }`}
                      >
                        {rank}
                      </span>
                    </td>

                    {/* Team */}
                    <td className="py-3 px-4">
                      <div className="flex items-center gap-2.5">
                        <div className="w-6 h-6 rounded-full overflow-hidden flex-shrink-0 bg-slate-100 border border-slate-200 flex items-center justify-center">
                          {logo ? (
                            <ImageWithFallback
                              src={logo}
                              alt={teamName}
                              width={24}
                              height={24}
                              className="object-contain"
                              fallbackText={teamName.slice(0, 1)}
                            />
                          ) : (
                            <Shield className="w-3.5 h-3.5 text-red-600" />
                          )}
                        </div>
                        <div className="min-w-0">
                          <span className="font-extrabold text-slate-900 truncate block text-xs sm:text-sm">
                            {teamName}
                          </span>
                          {abbr && (
                            <span className="text-[10px] font-bold text-slate-400 uppercase tracking-wider block">
                              {abbr}
                            </span>
                          )}
                        </div>
                      </div>
                    </td>

                    {/* Played */}
                    <td className="py-3 px-3 text-center font-mono text-slate-600 font-semibold tabular-nums">
                      {played}
                    </td>

                    {/* Won */}
                    <td className="py-3 px-3 text-center font-mono text-slate-800 font-bold tabular-nums">
                      {won}
                    </td>

                    {/* Lost */}
                    <td className="py-3 px-3 text-center font-mono text-slate-500 font-medium tabular-nums">
                      {lost}
                    </td>

                    {/* No Result / Tied */}
                    <td className="py-3 px-3 text-center font-mono text-slate-400 tabular-nums">
                      {noResult}
                    </td>

                    {/* Net Run Rate */}
                    <td className="py-3 px-3 text-right font-mono text-xs font-semibold tabular-nums text-slate-700">
                      {nrr}
                    </td>

                    {/* Points */}
                    <td className="py-3 px-4 text-right">
                      <span className="font-mono text-sm font-black text-red-600 bg-red-50 px-2 py-0.5 rounded border border-red-200 tabular-nums shadow-2xs">
                        {points}
                      </span>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      )}

      {/* The Alchemists Standings Legend */}
      <div className="p-3.5 bg-slate-50/80 border-t border-slate-200 flex flex-wrap items-center justify-between gap-3 text-[11px] text-slate-500">
        <div className="flex items-center gap-4 flex-wrap">
          <div className="flex items-center gap-1.5">
            <span className="w-2.5 h-2.5 rounded-xs bg-emerald-500 flex-shrink-0" />
            <span className="font-bold text-slate-700">Top 2: Semi-Finals / Qualifier</span>
          </div>
          <div className="flex items-center gap-1.5">
            <span className="w-2.5 h-2.5 rounded-xs bg-blue-500 flex-shrink-0" />
            <span className="font-bold text-slate-700">Top 4: Eliminator Spot</span>
          </div>
        </div>

        <span className="text-[10px] uppercase font-bold tracking-wider text-slate-400">
          Source: Official ESPNcricinfo Standings
        </span>
      </div>
    </div>
  );
};

export default TournamentStandings;
