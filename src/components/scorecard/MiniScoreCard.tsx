'use client';

import React from 'react';
import ImageWithFallback from '../common/ImageWithFallback';
import StatusBadge from '../common/StatusBadge';
import { ScorecardSummary } from '@/types/match';
import { MapPin, Trophy, Star } from 'lucide-react';

interface MiniScoreCardProps {
  summary?: ScorecardSummary | null;
  matchProp?: any;
}

export const MiniScoreCard: React.FC<MiniScoreCardProps> = ({ summary, matchProp }) => {
  const resolvedSummary = summary || {
    matchTitle: matchProp?.title || matchProp?.series || 'Match Scorecard',
    status: matchProp?.status || '',
    result: matchProp?.result || '',
    venue: matchProp?.matchInfo || '',
    playerOfTheMatch: '',
    teams: matchProp ? [
      {
        teamName: matchProp.teamA,
        teamLogo: matchProp.flagA,
        score: matchProp.scoreA,
        overs: matchProp.oversA || ''
      },
      {
        teamName: matchProp.teamB,
        teamLogo: matchProp.flagB,
        score: matchProp.scoreB,
        overs: matchProp.oversB || ''
      }
    ] : []
  };

  const teams = resolvedSummary.teams || [];
  const team1 = teams[0] || null;
  const team2 = teams[1] || null;

  return (
    <div className="w-full bg-white/[0.035] backdrop-blur-xl border border-white/[0.08] rounded-2xl shadow-lg overflow-hidden">
      {/* Top Banner: Title, Venue & Status */}
      <div className="p-4 sm:p-5 border-b border-white/[0.06] flex flex-wrap items-center justify-between gap-3 bg-white/[0.02]">
        <div>
          <h1 className="text-base sm:text-lg font-bold text-white tracking-tight">
            {resolvedSummary.matchTitle || 'Match Center'}
          </h1>
          {resolvedSummary.venue && (
            <p className="flex items-center gap-1.5 text-xs text-slate-400 mt-0.5">
              <MapPin className="w-3.5 h-3.5 text-slate-500" />
              <span>{resolvedSummary.venue}</span>
            </p>
          )}
        </div>

        <div className="flex items-center gap-2">
          <StatusBadge status={resolvedSummary.status || (resolvedSummary.result ? 'RESULT' : 'SCHEDULED')} />
        </div>
      </div>

      {/* Center: Teams Scoreboard */}
      <div className="p-5 sm:p-7 grid grid-cols-1 md:grid-cols-11 items-center gap-4 sm:gap-6">
        {/* Team 1 */}
        <div className="md:col-span-5 flex items-center justify-between p-4 rounded-xl bg-white/[0.03] border border-white/[0.06] hover:border-white/15 transition-all">
          <div className="flex items-center gap-3 min-w-0">
            <ImageWithFallback
              src={team1?.teamLogo}
              alt={team1?.teamName || 'Team 1'}
              width={44}
              height={30}
              fallbackText={team1?.teamName}
            />
            <div className="min-w-0">
              <h2 className="text-base sm:text-lg font-bold text-white truncate">
                {team1?.teamName || 'Team 1'}
              </h2>
            </div>
          </div>
          <div className="text-right flex-shrink-0">
            <div className="text-xl sm:text-2xl font-extrabold text-white tracking-tight">
              {team1?.score || '—'}
            </div>
            {team1?.overs && (
              <span className="text-xs text-slate-400 font-medium">
                {team1.overs}
              </span>
            )}
          </div>
        </div>

        {/* VS Divider */}
        <div className="md:col-span-1 flex items-center justify-center">
          <span className="text-xs font-black tracking-widest text-slate-500 uppercase">
            VS
          </span>
        </div>

        {/* Team 2 */}
        <div className="md:col-span-5 flex items-center justify-between p-4 rounded-xl bg-white/[0.03] border border-white/[0.06] hover:border-white/15 transition-all">
          <div className="flex items-center gap-3 min-w-0">
            <ImageWithFallback
              src={team2?.teamLogo}
              alt={team2?.teamName || 'Team 2'}
              width={44}
              height={30}
              fallbackText={team2?.teamName}
            />
            <div className="min-w-0">
              <h2 className="text-base sm:text-lg font-bold text-white truncate">
                {team2?.teamName || 'Team 2'}
              </h2>
            </div>
          </div>
          <div className="text-right flex-shrink-0">
            <div className="text-xl sm:text-2xl font-extrabold text-white tracking-tight">
              {team2?.score || '—'}
            </div>
            {team2?.overs && (
              <span className="text-xs text-slate-400 font-medium">
                {team2.overs}
              </span>
            )}
          </div>
        </div>
      </div>

      {/* Match Result & Player of the Match */}
      {(resolvedSummary.result || resolvedSummary.playerOfTheMatch) && (
        <div className="px-5 py-3.5 bg-white/[0.02] border-t border-white/[0.06] flex flex-wrap items-center justify-between gap-3 text-xs sm:text-sm">
          {resolvedSummary.result ? (
            <div className="flex items-center gap-2 text-slate-200 font-semibold">
              <Trophy className="w-4 h-4 text-red-500 flex-shrink-0" />
              <span>{resolvedSummary.result}</span>
            </div>
          ) : <div />}

          {resolvedSummary.playerOfTheMatch && (
            <div className="flex items-center gap-1.5 px-3 py-1 rounded-full bg-white/[0.06] border border-white/10 text-slate-200 font-semibold text-xs shadow-sm">
              <Star className="w-3.5 h-3.5 text-amber-400 fill-amber-400" />
              <span>Player of the Match: <strong className="text-white">{resolvedSummary.playerOfTheMatch}</strong></span>
            </div>
          )}
        </div>
      )}
    </div>
  );
};

export default MiniScoreCard;
