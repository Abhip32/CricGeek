'use client';

import React from 'react';
import { useMatchLeaders } from '@/hooks/useCricketQueries';
import ImageWithFallback from '@/components/common/ImageWithFallback';
import { Trophy, Target, Award, Shield, User } from 'lucide-react';
import { MatchLeaderPerformer } from '@/types/match';

interface KeyPerformersCardProps {
  matchUrl?: string;
  isLive?: boolean;
  className?: string;
}

export const KeyPerformersCard: React.FC<KeyPerformersCardProps> = ({
  matchUrl,
  isLive = false,
  className = ''
}) => {
  const { data: leadersData, isLoading } = useMatchLeaders(matchUrl, undefined, undefined, isLive);

  if (isLoading) {
    return (
      <div className={`bg-white border border-slate-200 rounded-2xl p-5 shadow-xs space-y-4 ${className}`}>
        <div className="h-5 w-40 shimmer-block rounded" />
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div className="h-24 shimmer-block-subtle rounded-xl" />
          <div className="h-24 shimmer-block-subtle rounded-xl" />
        </div>
      </div>
    );
  }

  const topBatter = leadersData?.topBatter;
  const topBowler = leadersData?.topBowler;
  const groups = leadersData?.groups || [];

  if (!topBatter && !topBowler && groups.length === 0) {
    return null;
  }

  return (
    <div className={`bg-white border border-slate-200 rounded-2xl overflow-hidden shadow-xs ${className}`}>
      {/* Header */}
      <div className="p-4 sm:p-5 border-b border-slate-100 bg-slate-50/80 flex items-center justify-between">
        <div className="flex items-center gap-2.5">
          <span className="w-1.5 h-5 bg-red-600 rounded-full flex-shrink-0" />
          <div>
            <h3 className="text-xs sm:text-sm font-black uppercase tracking-wider text-slate-900 flex items-center gap-2">
              <Trophy className="w-4 h-4 text-red-600" />
              <span>Match Leaders & Key Performers</span>
            </h3>
            <p className="text-[11px] text-slate-500 font-medium">
              Top batters and bowlers in this contest
            </p>
          </div>
        </div>
        <span className="text-[10px] uppercase font-black text-red-600 bg-red-50 border border-red-200 px-2 py-0.5 rounded-full">
          Official MVP
        </span>
      </div>

      <div className="p-4 sm:p-5 grid grid-cols-1 sm:grid-cols-2 gap-4">
        {/* Top Batter */}
        {topBatter && (
          <div className="bg-slate-50 border border-slate-200/90 rounded-xl p-3.5 flex items-center gap-3.5 hover:border-slate-300 transition-colors">
            {/* Player Headshot */}
            <div className="w-14 h-14 rounded-xl overflow-hidden bg-white border border-slate-200 flex-shrink-0 relative shadow-2xs">
              {topBatter.headshot ? (
                <ImageWithFallback
                  src={topBatter.headshot}
                  alt={topBatter.name}
                  width={56}
                  height={56}
                  className="object-cover w-full h-full"
                  fallbackText={topBatter.name.slice(0, 1)}
                />
              ) : (
                <div className="w-full h-full flex items-center justify-center bg-slate-100 text-slate-400">
                  <User className="w-6 h-6" />
                </div>
              )}
            </div>

            <div className="flex-1 min-w-0">
              <div className="flex items-center gap-1.5 mb-0.5">
                <span className="text-[10px] font-black uppercase tracking-wider text-amber-700 bg-amber-100 px-1.5 py-0.2 rounded">
                  Top Batter
                </span>
                {topBatter.team && (
                  <span className="text-[10px] font-bold text-slate-400 truncate">
                    {topBatter.team}
                  </span>
                )}
              </div>
              <h4 className="text-sm font-extrabold text-slate-900 truncate">
                {topBatter.name}
              </h4>
              <p className="text-xs font-black text-red-600 font-mono mt-0.5">
                {topBatter.value || 'Top Scorer'}
              </p>
            </div>
          </div>
        )}

        {/* Top Bowler */}
        {topBowler && (
          <div className="bg-slate-50 border border-slate-200/90 rounded-xl p-3.5 flex items-center gap-3.5 hover:border-slate-300 transition-colors">
            {/* Player Headshot */}
            <div className="w-14 h-14 rounded-xl overflow-hidden bg-white border border-slate-200 flex-shrink-0 relative shadow-2xs">
              {topBowler.headshot ? (
                <ImageWithFallback
                  src={topBowler.headshot}
                  alt={topBowler.name}
                  width={56}
                  height={56}
                  className="object-cover w-full h-full"
                  fallbackText={topBowler.name.slice(0, 1)}
                />
              ) : (
                <div className="w-full h-full flex items-center justify-center bg-slate-100 text-slate-400">
                  <User className="w-6 h-6" />
                </div>
              )}
            </div>

            <div className="flex-1 min-w-0">
              <div className="flex items-center gap-1.5 mb-0.5">
                <span className="text-[10px] font-black uppercase tracking-wider text-blue-700 bg-blue-100 px-1.5 py-0.2 rounded">
                  Top Bowler
                </span>
                {topBowler.team && (
                  <span className="text-[10px] font-bold text-slate-400 truncate">
                    {topBowler.team}
                  </span>
                )}
              </div>
              <h4 className="text-sm font-extrabold text-slate-900 truncate">
                {topBowler.name}
              </h4>
              <p className="text-xs font-black text-red-600 font-mono mt-0.5">
                {topBowler.value || 'Top Wicket Taker'}
              </p>
            </div>
          </div>
        )}
      </div>

      {/* Additional innings groups if available */}
      {groups.length > 0 && (
        <div className="border-t border-slate-100 px-4 sm:px-5 py-3 bg-white space-y-3">
          {groups.map((grp, gIdx) => (
            <div key={gIdx} className="space-y-2">
              <span className="text-[11px] font-extrabold text-slate-700 uppercase tracking-wider block">
                {grp.name}
              </span>
              <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-2.5">
                {grp.leaders.map((p, pIdx) => (
                  <div
                    key={pIdx}
                    className="flex items-center gap-2.5 p-2 rounded-lg bg-slate-50 border border-slate-200/60"
                  >
                    <div className="w-8 h-8 rounded-full overflow-hidden bg-white border border-slate-200 flex-shrink-0">
                      {p.headshot ? (
                        <ImageWithFallback
                          src={p.headshot}
                          alt={p.name}
                          width={32}
                          height={32}
                          className="object-cover w-full h-full"
                          fallbackText={p.name.slice(0, 1)}
                        />
                      ) : (
                        <User className="w-4 h-4 text-slate-400 m-auto mt-2" />
                      )}
                    </div>
                    <div className="min-w-0 flex-1">
                      <p className="text-xs font-bold text-slate-900 truncate">{p.name}</p>
                      <p className="text-[10px] font-mono font-bold text-red-600">{p.value}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default KeyPerformersCard;
