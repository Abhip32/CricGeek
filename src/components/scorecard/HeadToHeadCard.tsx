'use client';

import React from 'react';
import { useMatchH2H } from '@/hooks/useCricketQueries';
import ImageWithFallback from '@/components/common/ImageWithFallback';
import { Swords, Trophy, Shield } from 'lucide-react';

interface HeadToHeadCardProps {
  matchUrl?: string;
  className?: string;
}

export const HeadToHeadCard: React.FC<HeadToHeadCardProps> = ({
  matchUrl,
  className = ''
}) => {
  const { data: h2hData, isLoading } = useMatchH2H(matchUrl);

  if (isLoading) {
    return (
      <div className={`bg-white border border-slate-200 rounded-2xl p-5 shadow-xs space-y-3 ${className}`}>
        <div className="h-5 w-40 shimmer-block rounded" />
        <div className="h-20 shimmer-block-subtle rounded-xl" />
      </div>
    );
  }

  if (!h2hData || !h2hData.overall) {
    return null;
  }

  const team1 = h2hData.team1 || { name: 'Team 1' };
  const team2 = h2hData.team2 || { name: 'Team 2' };
  const overall = h2hData.overall;
  const recent = h2hData.recentEncounters || [];

  const total = overall.matchesPlayed || (overall.team1Wins + overall.team2Wins + overall.draws + overall.noResults);
  const team1Pct = total > 0 ? Math.round((overall.team1Wins / total) * 100) : 50;
  const team2Pct = total > 0 ? Math.round((overall.team2Wins / total) * 100) : 50;

  return (
    <div className={`bg-white border border-slate-200 rounded-2xl p-4 sm:p-5 shadow-xs space-y-4 ${className}`}>
      {/* Header */}
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-2.5">
          <span className="w-1.5 h-5 bg-red-600 rounded-full flex-shrink-0" />
          <div>
            <h3 className="text-xs sm:text-sm font-black uppercase tracking-wider text-slate-900 flex items-center gap-2">
              <Swords className="w-4 h-4 text-red-600" />
              <span>Head-to-Head Historical Rivalry</span>
            </h3>
            <p className="text-[11px] text-slate-500 font-medium">
              Lifetime clashes across international and tournament fixtures
            </p>
          </div>
        </div>
        <span className="text-xs font-bold text-slate-500 bg-slate-100 px-2.5 py-1 rounded-full">
          {total} Matches
        </span>
      </div>

      {/* Visual Clash Win Comparison */}
      <div className="bg-slate-50 border border-slate-200 rounded-xl p-4 space-y-3">
        <div className="flex items-center justify-between text-xs font-extrabold text-slate-900">
          <div className="flex items-center gap-2">
            <span className="w-2.5 h-2.5 rounded-full bg-red-600" />
            <span className="truncate">{team1.name}: {overall.team1Wins} Wins</span>
          </div>
          <div className="flex items-center gap-2">
            <span className="truncate">{team2.name}: {overall.team2Wins} Wins</span>
            <span className="w-2.5 h-2.5 rounded-full bg-slate-800" />
          </div>
        </div>

        {/* Win percentage bar */}
        <div className="w-full h-3 rounded-full overflow-hidden bg-slate-200 flex">
          <div
            className="bg-red-600 transition-all duration-500"
            style={{ width: `${team1Pct}%` }}
            title={`${team1.name}: ${team1Pct}%`}
          />
          <div
            className="bg-slate-800 transition-all duration-500"
            style={{ width: `${team2Pct}%` }}
            title={`${team2.name}: ${team2Pct}%`}
          />
        </div>

        {/* Ties & Draws info */}
        <div className="flex items-center justify-between text-[11px] text-slate-500 font-bold">
          <span>{team1Pct}% Win Rate</span>
          <span>
            {[
              overall.draws > 0 ? `${overall.draws} Draws` : '',
              overall.ties > 0 ? `${overall.ties} Ties` : '',
              overall.noResults > 0 ? `${overall.noResults} No Result` : ''
            ].filter(Boolean).join(' • ') || '0 Draws'}
          </span>
          <span>{team2Pct}% Win Rate</span>
        </div>
      </div>

      {/* Recent Clashes */}
      {recent.length > 0 && (
        <div className="space-y-2">
          <span className="text-[11px] font-extrabold text-slate-600 uppercase tracking-wider block">
            Recent Encounters
          </span>
          <div className="divide-y divide-slate-100 border border-slate-200 rounded-xl overflow-hidden">
            {recent.map((rec, idx) => (
              <div key={idx} className="p-3 bg-white flex items-center justify-between text-xs">
                <div>
                  <p className="font-bold text-slate-900">{rec.winner ? `${rec.winner} won` : 'Match Concluded'}</p>
                  <p className="text-[10px] text-slate-400">{rec.margin || rec.scores}</p>
                </div>
                {rec.date && (
                  <span className="text-[10px] font-mono text-slate-500 bg-slate-100 px-2 py-0.5 rounded">
                    {rec.date}
                  </span>
                )}
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};

export default HeadToHeadCard;
