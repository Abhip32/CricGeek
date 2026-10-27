'use client';

import React from 'react';
import Link from 'next/link';
import ImageWithFallback from '../common/ImageWithFallback';
import { ScorecardSummary } from '@/types/match';
import { MapPin, Trophy, Star, Award, Zap, ArrowLeft, RefreshCw } from 'lucide-react';
import { findPlayerInSquads } from '@/lib/playerMatcher';

interface MiniScoreCardProps {
  summary?: ScorecardSummary | null;
  matchProp?: any;
  squads?: Record<string, any[]> | null;
  leaders?: any[] | null;
  tables?: any[] | null;
  onRefresh?: () => void;
  isRefreshing?: boolean;
  backHref?: string;
}

export const MiniScoreCard: React.FC<MiniScoreCardProps> = ({
  summary,
  matchProp,
  squads,
  leaders,
  tables,
  onRefresh,
  isRefreshing = false,
  backHref = '/matches?tab=live'
}) => {
  const resolvedSummary = summary || {
    matchTitle: matchProp?.title || matchProp?.series || 'Match Scorecard',
    status: matchProp?.status || '',
    result: matchProp?.result || '',
    venue: matchProp?.matchInfo || '',
    playerOfTheMatch: '',
    teams: matchProp
      ? [
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
        ]
      : []
  };

  const teams = resolvedSummary.teams || [];
  const team1 = teams[0] || null;
  const team2 = teams[1] || null;

  const rawStatus = (resolvedSummary.status || '').toUpperCase();
  const isLive =
    rawStatus.includes('LIVE') ||
    rawStatus.includes('IN PROGRESS') ||
    rawStatus.includes('STUMPS') ||
    rawStatus.includes('TEA') ||
    rawStatus.includes('LUNCH');
  const isResult = Boolean(
    resolvedSummary.result ||
    rawStatus.includes('RESULT') ||
    rawStatus.includes('CONCLUDED')
  );

  // 1. Resolve Player of the Match
  const potmName =
    resolvedSummary.playerOfTheMatch ||
    (leaders && leaders.find((l) => l.category?.toLowerCase().includes('run'))?.name) ||
    '';

  const potmPlayer = potmName ? findPlayerInSquads(potmName, squads) : null;
  const potmLeader = leaders?.find((l) => l.name === potmName);
  const potmImage = potmLeader?.image || potmPlayer?.image || null;

  // 2. Resolve MVP / Top Performer
  const topBatterFromTables = React.useMemo(() => {
    let topName = '';
    let maxRuns = -1;
    let ballsFaced = '';

    (tables || []).forEach((t: any) => {
      if (t.type === 'Batting') {
        (t.rows || []).forEach((r: any) => {
          const runs = parseInt(r['R'] || r['Runs'] || '0', 10);
          if (!isNaN(runs) && runs > maxRuns) {
            maxRuns = runs;
            topName = (r['BATTING'] || r['Batting'] || Object.values(r)[0] || '').split('\n')[0].replace(/►/g, '').trim();
            ballsFaced = r['B'] || r['Balls'] || '';
          }
        });
      }
    });

    return { name: topName, runs: maxRuns, balls: ballsFaced };
  }, [tables]);

  const topBowlerFromTables = React.useMemo(() => {
    let topName = '';
    let maxWickets = -1;
    let stats = '';

    (tables || []).forEach((t: any) => {
      if (t.type === 'Bowling') {
        (t.rows || []).forEach((r: any) => {
          const wkts = parseInt(r['W'] || r['Wickets'] || '0', 10);
          if (!isNaN(wkts) && wkts > maxWickets) {
            maxWickets = wkts;
            topName = (r['BOWLING'] || r['Bowling'] || Object.values(r)[0] || '').split('\n')[0].trim();
            stats = `${r['W']}/${r['R'] || '0'} (${r['O'] || ''} ov)`;
          }
        });
      }
    });

    return { name: topName, wickets: maxWickets, stats };
  }, [tables]);

  const mvpName =
    potmName && topBowlerFromTables.name && topBowlerFromTables.name !== potmName
      ? topBowlerFromTables.name
      : topBatterFromTables.name || potmName;

  const mvpPlayer = mvpName ? findPlayerInSquads(mvpName, squads) : null;
  const mvpLeader = leaders?.find((l) => l.name === mvpName);
  const mvpImage = mvpLeader?.image || mvpPlayer?.image || null;

  const hasFeaturedPlayers = Boolean(potmName || topBatterFromTables.name || topBowlerFromTables.name);

  return (
    <div className="bg-white border border-slate-200 rounded-xl shadow-2xs overflow-hidden">
      {/* Top Banner: Match Context, Venue, Back Icon, Live Pill & Refresh Icon */}
      <div className="p-4 sm:p-5 border-b border-slate-100 flex items-center justify-between gap-3 bg-slate-50/70">
        <div className="flex items-center gap-2.5 sm:gap-3 min-w-0">
          <Link
            href={backHref}
            className="p-1.5 sm:p-2 rounded-lg border border-slate-200 bg-white text-slate-600 hover:text-red-600 hover:border-red-300 hover:bg-red-50 transition-colors shadow-2xs flex-shrink-0"
            title="Back to Matches"
            aria-label="Back to Matches"
          >
            <ArrowLeft className="w-4 h-4" />
          </Link>
          <div className="space-y-0.5 min-w-0">
            <h1 className="text-sm sm:text-base md:text-lg font-black text-slate-900 tracking-tight truncate">
              {resolvedSummary.matchTitle || 'Match Center'}
            </h1>
            {resolvedSummary.venue && (
              <p className="flex items-center gap-1.5 text-xs text-slate-500 font-medium truncate">
                <MapPin className="w-3.5 h-3.5 text-slate-400 flex-shrink-0" />
                <span className="truncate">{resolvedSummary.venue}</span>
              </p>
            )}
          </div>
        </div>

        <div className="flex items-center gap-2 flex-shrink-0">
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

          {onRefresh && (
            <button
              onClick={onRefresh}
              disabled={isRefreshing}
              className="p-1.5 sm:p-2 rounded-lg border border-slate-200 bg-white text-slate-600 hover:text-red-600 hover:border-red-300 hover:bg-red-50 transition-colors shadow-2xs disabled:opacity-50"
              title="Refresh Scorecard"
              aria-label="Refresh Scorecard"
            >
              <RefreshCw className={`w-3.5 h-3.5 ${isRefreshing ? 'animate-spin text-red-600' : ''}`} />
            </button>
          )}
        </div>
      </div>

      {/* Main Scoreboard: 2-Column Split */}
      <div className="p-5 sm:p-6 grid grid-cols-1 lg:grid-cols-12 items-center gap-6">
        {/* Left Side (Col 1-8): Two Teams & Live Score */}
        <div className="lg:col-span-8 space-y-4">
          {/* Team 1 */}
          <div className="flex items-center justify-between gap-4">
            <div className="flex items-center gap-3.5 min-w-0">
              <ImageWithFallback
                src={team1?.teamLogo}
                alt={team1?.teamName || 'Team 1'}
                width={36}
                height={26}
                className="w-9 h-6.5 object-contain flex-shrink-0"
                fallbackText={team1?.teamName}
              />
              <h2 className="text-lg sm:text-xl font-black text-slate-900 tracking-tight truncate">
                {team1?.teamName || 'Team 1'}
              </h2>
            </div>
            <div className="text-right flex-shrink-0">
              <span className="text-xl sm:text-2xl font-black text-slate-900 tracking-tight">
                {team1?.score || '—'}
              </span>
              {team1?.overs && (
                <span className="text-xs text-slate-500 font-medium ml-1.5">
                  ({team1.overs})
                </span>
              )}
            </div>
          </div>

          {/* Team 2 */}
          <div className="flex items-center justify-between gap-4">
            <div className="flex items-center gap-3.5 min-w-0">
              <ImageWithFallback
                src={team2?.teamLogo}
                alt={team2?.teamName || 'Team 2'}
                width={36}
                height={26}
                className="w-9 h-6.5 object-contain flex-shrink-0"
                fallbackText={team2?.teamName}
              />
              <h2 className="text-lg sm:text-xl font-black text-slate-900 tracking-tight truncate">
                {team2?.teamName || 'Team 2'}
              </h2>
            </div>
            <div className="text-right flex-shrink-0">
              <span className="text-xl sm:text-2xl font-black text-slate-900 tracking-tight">
                {team2?.score || '—'}
              </span>
              {team2?.overs && (
                <span className="text-xs text-slate-500 font-medium ml-1.5">
                  ({team2.overs})
                </span>
              )}
            </div>
          </div>

          {/* Result / Target String */}
          <p className="text-sm font-bold text-red-600 pt-1">
            {resolvedSummary.result ||
              (rawStatus.includes('STUMPS')
                ? 'Day Stumps'
                : rawStatus.includes('INNINGS BREAK')
                ? 'Innings Break'
                : 'Match in Progress')}
          </p>
        </div>

        {/* Right Side (Col 9-12): Player of the Match & MVP with Player Headshots */}
        {hasFeaturedPlayers && (
          <div className="lg:col-span-4 border-t lg:border-t-0 lg:border-l border-slate-200 pt-4 lg:pt-0 lg:pl-6 space-y-4">
            {/* Player of the Match */}
            <div className="flex items-center gap-3">
              <div className="w-11 h-11 rounded-full overflow-hidden border-2 border-slate-200 bg-slate-100 flex-shrink-0 flex items-center justify-center shadow-xs">
                <ImageWithFallback
                  src={potmImage}
                  alt={potmName || topBatterFromTables.name}
                  width={44}
                  height={44}
                  fallbackText={(potmName || topBatterFromTables.name || 'P').slice(0, 1)}
                />
              </div>

              <div className="min-w-0 flex-1">
                <span className="text-[10px] font-black uppercase tracking-wider text-slate-400 block">
                  {isResult ? 'PLAYER OF THE MATCH' : 'TOP BATTER'}
                </span>
                <div className="flex items-center gap-1 font-extrabold text-slate-900 text-xs sm:text-sm truncate">
                  <Award className="w-3.5 h-3.5 text-amber-500 flex-shrink-0" />
                  <span className="truncate">{potmName || topBatterFromTables.name}</span>
                </div>
                <span className="text-xs text-slate-500 font-semibold block">
                  {topBatterFromTables.runs > 0
                    ? `${topBatterFromTables.runs} (${topBatterFromTables.balls || '—'})`
                    : potmLeader?.score || 'Top Impact'}
                </span>
              </div>
            </div>

            {/* CRICINFO'S MVP / TOP BOWLER */}
            <div className="flex items-center gap-3 pt-3 border-t border-slate-100">
              <div className="w-11 h-11 rounded-full overflow-hidden border-2 border-slate-200 bg-slate-100 flex-shrink-0 flex items-center justify-center shadow-xs">
                <ImageWithFallback
                  src={mvpImage}
                  alt={mvpName || topBowlerFromTables.name}
                  width={44}
                  height={44}
                  fallbackText={(mvpName || topBowlerFromTables.name || 'M').slice(0, 1)}
                />
              </div>

              <div className="min-w-0 flex-1">
                <span className="text-[10px] font-black uppercase tracking-wider text-slate-400 block">
                  {isResult ? "CRICINFO'S MVP" : 'TOP BOWLER'}
                </span>
                <div className="flex items-center gap-1 font-extrabold text-slate-900 text-xs sm:text-sm truncate">
                  <Star className="w-3.5 h-3.5 text-red-600 fill-red-600 flex-shrink-0" />
                  <span className="truncate">{mvpName || topBowlerFromTables.name}</span>
                </div>
                <span className="text-xs text-slate-500 font-semibold block">
                  {topBowlerFromTables.wickets > 0
                    ? topBowlerFromTables.stats
                    : '135.1 pts Impact'}
                </span>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default MiniScoreCard;
