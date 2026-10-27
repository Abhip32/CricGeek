'use client';

import React from 'react';
import ImageWithFallback from '../common/ImageWithFallback';
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

  const rawStatus = (resolvedSummary.status || '').toUpperCase();
  const isLive = rawStatus.includes('LIVE') || rawStatus.includes('IN PROGRESS') || rawStatus.includes('STUMPS') || rawStatus.includes('TEA') || rawStatus.includes('LUNCH');
  const isResult = Boolean(resolvedSummary.result || rawStatus.includes('RESULT') || rawStatus.includes('CONCLUDED'));

  return (
    <div className="bg-white border border-slate-200 rounded-xl shadow-2xs overflow-hidden">
      {/* Top Banner: Match Context, Venue & Live Pill */}
      <div className="p-4 sm:p-5 border-b border-slate-100 flex flex-wrap items-center justify-between gap-3 bg-slate-50/70">
        <div className="space-y-0.5">
          <h1 className="text-base sm:text-lg font-black text-slate-900 tracking-tight">
            {resolvedSummary.matchTitle || 'Match Center'}
          </h1>
          {resolvedSummary.venue && (
            <p className="flex items-center gap-1.5 text-xs text-slate-500 font-medium">
              <MapPin className="w-3.5 h-3.5 text-slate-400" />
              <span>{resolvedSummary.venue}</span>
            </p>
          )}
        </div>

        <div className="flex items-center gap-2">
          {isLive ? (
            <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-black uppercase tracking-wider bg-red-600 text-white shadow-xs">
              <span className="w-2 h-2 rounded-full bg-white animate-pulse" />
              LIVE
            </span>
          ) : isResult ? (
            <span className="px-3 py-1 rounded-full text-xs font-extrabold uppercase tracking-wider bg-slate-100 text-slate-700 border border-slate-200">
              RESULT
            </span>
          ) : (
            <span className="px-3 py-1 rounded-full text-xs font-extrabold uppercase tracking-wider bg-slate-100 text-slate-700 border border-slate-200">
              SCHEDULED
            </span>
          )}
        </div>
      </div>

      {/* Center: Teams Scoreboard */}
      <div className="p-5 sm:p-7 grid grid-cols-1 md:grid-cols-11 items-center gap-4 sm:gap-6">
        {/* Team 1 */}
        <div className="md:col-span-5 flex items-center justify-between p-4 sm:p-5 rounded-xl bg-slate-50/80 border border-slate-200/80 shadow-2xs">
          <div className="flex items-center gap-3.5 min-w-0">
            <div className="w-11 h-8 rounded overflow-hidden border border-slate-200 bg-white flex items-center justify-center flex-shrink-0 shadow-2xs">
              <ImageWithFallback
                src={team1?.teamLogo}
                alt={team1?.teamName || 'Team 1'}
                width={44}
                height={30}
                fallbackText={team1?.teamName}
              />
            </div>
            <div className="min-w-0">
              <h2 className="text-base sm:text-lg font-black text-slate-900 truncate">
                {team1?.teamName || 'Team 1'}
              </h2>
            </div>
          </div>
          <div className="text-right flex-shrink-0">
            <div className="text-xl sm:text-2xl font-black text-slate-900 tracking-tight">
              {team1?.score || '—'}
            </div>
            {team1?.overs && (
              <span className="text-xs text-slate-500 font-medium">
                ({team1.overs})
              </span>
            )}
          </div>
        </div>

        {/* VS Divider */}
        <div className="md:col-span-1 flex items-center justify-center">
          <span className="text-xs font-black tracking-widest text-slate-400 uppercase">
            VS
          </span>
        </div>

        {/* Team 2 */}
        <div className="md:col-span-5 flex items-center justify-between p-4 sm:p-5 rounded-xl bg-slate-50/80 border border-slate-200/80 shadow-2xs">
          <div className="flex items-center gap-3.5 min-w-0">
            <div className="w-11 h-8 rounded overflow-hidden border border-slate-200 bg-white flex items-center justify-center flex-shrink-0 shadow-2xs">
              <ImageWithFallback
                src={team2?.teamLogo}
                alt={team2?.teamName || 'Team 2'}
                width={44}
                height={30}
                fallbackText={team2?.teamName}
              />
            </div>
            <div className="min-w-0">
              <h2 className="text-base sm:text-lg font-black text-slate-900 truncate">
                {team2?.teamName || 'Team 2'}
              </h2>
            </div>
          </div>
          <div className="text-right flex-shrink-0">
            <div className="text-xl sm:text-2xl font-black text-slate-900 tracking-tight">
              {team2?.score || '—'}
            </div>
            {team2?.overs && (
              <span className="text-xs text-slate-500 font-medium">
                ({team2.overs})
              </span>
            )}
          </div>
        </div>
      </div>

      {/* Match Result & Player of the Match */}
      {(resolvedSummary.result || resolvedSummary.playerOfTheMatch) && (
        <div className="px-5 py-3.5 bg-red-50/60 border-t border-slate-100 flex flex-wrap items-center justify-between gap-3 text-xs sm:text-sm">
          {resolvedSummary.result ? (
            <div className="flex items-center gap-2 text-slate-900 font-bold">
              <Trophy className="w-4 h-4 text-red-600 flex-shrink-0" />
              <span>{resolvedSummary.result}</span>
            </div>
          ) : <div />}

          {resolvedSummary.playerOfTheMatch && (
            <div className="flex items-center gap-1.5 px-3 py-1 rounded-full bg-white border border-slate-200 text-slate-700 font-semibold text-xs shadow-2xs">
              <Star className="w-3.5 h-3.5 text-amber-500 fill-amber-500" />
              <span>Player of the Match: <strong className="text-slate-900 font-bold">{resolvedSummary.playerOfTheMatch}</strong></span>
            </div>
          )}
        </div>
      )}
    </div>
  );
};

export default MiniScoreCard;
