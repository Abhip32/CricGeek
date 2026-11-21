'use client';

import React, { useState } from 'react';
import { TournamentStandings } from '@/components/common/TournamentStandings';
import { useSeriesList, useSeriesTeams } from '@/hooks/useCricketQueries';
import ImageWithFallback from '@/components/common/ImageWithFallback';
import { Trophy, Shield, Users, Award, Flame, Calendar } from 'lucide-react';
import { SeriesTeam } from '@/types/match';

const FEATURED_LEAGUES = [
  { id: '21284', name: "Women's Big Bash League", code: 'WBBL' },
  { id: '8043', name: 'Sheffield Shield', code: 'SHIELD' },
  { id: '8880', name: 'The Ford Trophy', code: 'FORD' },
  { id: '19553', name: 'ICC CWC Challenge League', code: 'CWC' },
  { id: '8836', name: "President's Trophy Grade I", code: 'PRES' },
  { id: '8838', name: 'Pro50 Championship', code: 'PRO50' },
  { id: '8048', name: 'Indian Premier League', code: 'IPL' },
];

export default function StandingsPage() {
  const { data: seriesList } = useSeriesList();
  const [selectedLeagueId, setSelectedLeagueId] = useState<string>('21284');

  // Merge active tournament series from API
  const allTournaments = React.useMemo(() => {
    const list = [...FEATURED_LEAGUES];
    const seen = new Set(list.map(t => t.id));

    if (Array.isArray(seriesList)) {
      seriesList.forEach((s: any) => {
        if (s.id && !seen.has(String(s.id))) {
          seen.add(String(s.id));
          list.push({
            id: String(s.id),
            name: s.name,
            code: s.abbreviation || 'SERIES'
          });
        }
      });
    }

    return list;
  }, [seriesList]);

  const { data: teamsData } = useSeriesTeams(selectedLeagueId);
  const activeLeague = allTournaments.find(t => t.id === selectedLeagueId);

  return (
    <div className="min-h-screen bg-slate-100/70 py-6 sm:py-10">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-6">
        {/* Header Hero Banner */}
        <div className="bg-white border border-slate-200 rounded-2xl p-6 sm:p-8 shadow-xs relative overflow-hidden">
          <div className="absolute top-0 left-0 w-2 h-full bg-red-600" />
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
            <div>
              <div className="flex items-center gap-2 text-red-600 text-xs font-black uppercase tracking-wider mb-2">
                <Trophy className="w-4 h-4" />
                <span>OFFICIAL TOURNAMENT STANDINGS</span>
              </div>
              <h1 className="text-2xl sm:text-3xl font-black text-slate-900 tracking-tight">
                Points Table & Team Rankings
              </h1>
              <p className="text-sm text-slate-500 font-medium mt-1 max-w-2xl">
                Real-time tournament progression, Net Run Rate (NRR), points breakdown, and playoff spots across active global cricket leagues.
              </p>
            </div>

            <div className="flex items-center gap-2 bg-slate-50 border border-slate-200 rounded-xl p-3 text-xs text-slate-600 font-semibold self-start sm:self-center">
              <Flame className="w-4 h-4 text-red-600 flex-shrink-0" />
              <span>Updated automatically from live ESPN match scorecards</span>
            </div>
          </div>
        </div>

        {/* Scrollable League Selector Pills */}
        <div className="bg-white border border-slate-200 rounded-2xl p-4 shadow-xs">
          <div className="text-xs font-black uppercase text-slate-400 tracking-wider mb-3 flex items-center gap-1.5">
            <Award className="w-3.5 h-3.5 text-red-600" />
            <span>Select Tournament</span>
          </div>

          <div className="flex items-center gap-2 overflow-x-auto scrollbar-none pb-1 touch-pan-x overscroll-x-contain [-webkit-overflow-scrolling:touch]">
            {allTournaments.map((tournament) => {
              const isSelected = tournament.id === selectedLeagueId;
              return (
                <button
                  key={tournament.id}
                  onClick={() => setSelectedLeagueId(tournament.id)}
                  className={`flex-shrink-0 px-4 py-2 rounded-xl text-xs font-bold transition-all flex items-center gap-2 cursor-pointer ${
                    isSelected
                      ? 'bg-red-600 text-white shadow-md shadow-red-600/20 scale-[1.02]'
                      : 'bg-slate-100 hover:bg-slate-200 text-slate-700 hover:text-slate-900'
                  }`}
                >
                  <Trophy className={`w-3.5 h-3.5 ${isSelected ? 'text-white' : 'text-slate-400'}`} />
                  <span>{tournament.name}</span>
                </button>
              );
            })}
          </div>
        </div>

        {/* Main Standings Component */}
        <TournamentStandings
          initialLeagueId={selectedLeagueId}
          key={`standings-${selectedLeagueId}`}
          className="shadow-sm"
        />

        {/* Participating Teams Gallery */}
        {teamsData && teamsData.teams && teamsData.teams.length > 0 && (
          <div className="bg-white border border-slate-200 rounded-2xl p-5 sm:p-6 shadow-xs">
            <div className="flex items-center justify-between mb-4 pb-3 border-b border-slate-100">
              <div className="flex items-center gap-2">
                <Users className="w-4 h-4 text-red-600" />
                <h3 className="text-sm font-black uppercase tracking-wider text-slate-900">
                  Participating Teams ({teamsData.teamsCount})
                </h3>
              </div>
              <span className="text-xs font-medium text-slate-500">
                {teamsData.tournament || activeLeague?.name}
              </span>
            </div>

            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-3">
              {teamsData.teams.map((t: SeriesTeam, idx: number) => (
                <div
                  key={t.id || `team-${idx}`}
                  className="flex flex-col items-center justify-center p-3 rounded-xl bg-slate-50 hover:bg-red-50/50 border border-slate-100 hover:border-red-200 transition-all text-center group"
                >
                  <div className="w-12 h-12 mb-2 rounded-full overflow-hidden bg-white p-1 shadow-2xs group-hover:scale-105 transition-transform flex items-center justify-center">
                    {t.logo ? (
                      <ImageWithFallback
                        src={t.logo}
                        alt={t.name}
                        width={44}
                        height={44}
                        className="object-contain"
                      />
                    ) : (
                      <div className="w-full h-full flex items-center justify-center bg-slate-200 text-slate-600 font-bold text-xs">
                        {t.abbreviation || t.name.slice(0, 3)}
                      </div>
                    )}
                  </div>
                  <span className="text-xs font-bold text-slate-800 group-hover:text-red-600 line-clamp-1">
                    {t.name}
                  </span>
                  {t.location && (
                    <span className="text-[10px] text-slate-400 mt-0.5">
                      {t.location}
                    </span>
                  )}
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
