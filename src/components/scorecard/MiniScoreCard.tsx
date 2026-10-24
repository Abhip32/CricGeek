'use client';

import React from 'react';
import ImageWithFallback from '../common/ImageWithFallback';
import StatusBadge from '../common/StatusBadge';
import { ScorecardSummary } from '@/types/match';
import { MapPin, Trophy, Calendar } from 'lucide-react';
import { motion } from 'framer-motion';

interface MiniScoreCardProps {
  summary?: ScorecardSummary | null;
  data?: any; // legacy compatibility
  scoreData?: any; // legacy compatibility
}

export const MiniScoreCard: React.FC<MiniScoreCardProps> = ({ summary, data, scoreData }) => {
  // Normalize data from either the new ScorecardSummary or legacy props
  const resolvedSummary: ScorecardSummary = summary || scoreData?.data?.summary || {
    matchTitle: data?.title || scoreData?.summary?.matchTitle || 'Match Summary',
    status: data?.status || scoreData?.summary?.status || '',
    result: data?.result || scoreData?.summary?.result || '',
    venue: data?.venue || scoreData?.summary?.venue || '',
    teams: scoreData?.summary?.teams || []
  };

  const teams = resolvedSummary.teams || [];
  const team1 = teams[0] || (data?.matchInfo?.teams?.team1 ? {
    teamName: data.matchInfo.teams.team1.name,
    teamLogo: data.matchInfo.teams.team1.flag,
    score: data.batting?.team === data.matchInfo.teams.team1.name ? data.batting?.score : '',
    overs: ''
  } : null);

  const team2 = teams[1] || (data?.matchInfo?.teams?.team2 ? {
    teamName: data.matchInfo.teams.team2.name,
    teamLogo: data.matchInfo.teams.team2.flag,
    score: data.bowling?.team === data.matchInfo.teams.team2.name ? data.bowling?.score : '',
    overs: ''
  } : null);

  const isLive = resolvedSummary.status?.toLowerCase().includes('live') || 
                 resolvedSummary.status?.toLowerCase().includes('in progress') ||
                 (!resolvedSummary.result && (team1?.score || team2?.score));

  return (
    <motion.div 
      initial={{ opacity: 0, y: 15 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4 }}
      className="relative overflow-hidden rounded-2xl glass-panel border border-white/10 shadow-2xl p-6 sm:p-8"
    >
      {/* Ambient background stadium lights */}
      <div className="absolute -top-24 -left-24 w-72 h-72 bg-emerald-500/10 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute -bottom-24 -right-24 w-72 h-72 bg-blue-500/10 rounded-full blur-3xl pointer-events-none" />

      {/* Top Header: Title, Venue & Status */}
      <div className="relative z-10 flex flex-wrap items-center justify-between gap-3 pb-6 border-b border-white/10">
        <div>
          <h1 className="text-xl sm:text-2xl font-bold text-white tracking-tight">
            {resolvedSummary.matchTitle || 'Match Center'}
          </h1>
          {resolvedSummary.venue && (
            <p className="flex items-center gap-1.5 text-xs sm:text-sm text-slate-400 mt-1">
              <MapPin className="w-3.5 h-3.5 text-emerald-400" />
              <span>{resolvedSummary.venue}</span>
            </p>
          )}
        </div>

        <div className="flex items-center gap-2">
          {resolvedSummary.result ? (
            <span className="px-3 py-1 rounded-full text-xs font-semibold bg-emerald-500/15 text-emerald-400 border border-emerald-500/30">
              Completed
            </span>
          ) : (
            <StatusBadge status={isLive ? 'LIVE' : (resolvedSummary.status || 'SCHEDULED')} />
          )}
        </div>
      </div>

      {/* Center: Teams Scoreboard */}
      <div className="relative z-10 py-6 sm:py-8 grid grid-cols-1 md:grid-cols-11 items-center gap-6">
        {/* Team 1 */}
        <div className="md:col-span-5 flex items-center gap-4 sm:gap-6 bg-slate-900/40 p-4 rounded-xl border border-white/5">
          <div className="relative w-14 h-14 sm:w-16 sm:h-16 flex-shrink-0 rounded-full overflow-hidden p-0.5 bg-gradient-to-tr from-emerald-500 to-cyan-500 shadow-lg shadow-emerald-950/50">
            <div className="w-full h-full rounded-full overflow-hidden bg-slate-950 flex items-center justify-center">
              <ImageWithFallback
                src={team1?.teamLogo || null}
                alt={team1?.teamName || 'Team 1'}
                width={64}
                height={64}
                className="w-full h-full object-cover"
                fallbackText={team1?.teamName?.slice(0, 3).toUpperCase() || 'TM1'}
              />
            </div>
          </div>

          <div className="flex-1 min-w-0">
            <h2 className="text-lg sm:text-xl font-bold text-white truncate">
              {team1?.teamName || 'Team 1'}
            </h2>
            <div className="flex items-baseline gap-2 mt-1">
              <span className="text-2xl sm:text-3xl font-extrabold text-white tracking-tight">
                {team1?.score || '—'}
              </span>
              {team1?.overs && (
                <span className="text-xs sm:text-sm text-slate-400 font-medium">
                  {team1.overs}
                </span>
              )}
            </div>
          </div>
        </div>

        {/* VS Divider */}
        <div className="md:col-span-1 flex flex-col items-center justify-center">
          <div className="w-10 h-10 rounded-full bg-white/5 border border-white/10 flex items-center justify-center">
            <span className="text-xs font-black tracking-widest text-slate-400">VS</span>
          </div>
        </div>

        {/* Team 2 */}
        <div className="md:col-span-5 flex items-center gap-4 sm:gap-6 bg-slate-900/40 p-4 rounded-xl border border-white/5">
          <div className="relative w-14 h-14 sm:w-16 sm:h-16 flex-shrink-0 rounded-full overflow-hidden p-0.5 bg-gradient-to-tr from-blue-500 to-indigo-500 shadow-lg shadow-blue-950/50">
            <div className="w-full h-full rounded-full overflow-hidden bg-slate-950 flex items-center justify-center">
              <ImageWithFallback
                src={team2?.teamLogo || null}
                alt={team2?.teamName || 'Team 2'}
                width={64}
                height={64}
                className="w-full h-full object-cover"
                fallbackText={team2?.teamName?.slice(0, 3).toUpperCase() || 'TM2'}
              />
            </div>
          </div>

          <div className="flex-1 min-w-0">
            <h2 className="text-lg sm:text-xl font-bold text-white truncate">
              {team2?.teamName || 'Team 2'}
            </h2>
            <div className="flex items-baseline gap-2 mt-1">
              <span className="text-2xl sm:text-3xl font-extrabold text-white tracking-tight">
                {team2?.score || '—'}
              </span>
              {team2?.overs && (
                <span className="text-xs sm:text-sm text-slate-400 font-medium">
                  {team2.overs}
                </span>
              )}
            </div>
          </div>
        </div>
      </div>

      {/* Match Result Banner */}
      {resolvedSummary.result && (
        <div className="relative z-10 pt-4 border-t border-white/10">
          <div className="flex items-center gap-2.5 px-4 py-2.5 rounded-xl bg-gradient-to-r from-emerald-500/10 via-emerald-500/5 to-transparent border-l-4 border-emerald-500">
            <Trophy className="w-4 h-4 text-emerald-400 flex-shrink-0" />
            <p className="text-sm font-semibold text-emerald-300">
              {resolvedSummary.result}
            </p>
          </div>
        </div>
      )}
    </motion.div>
  );
};

export default MiniScoreCard;
