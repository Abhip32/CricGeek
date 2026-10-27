'use client';

import React, { useMemo } from 'react';
import { Trophy, Star, Award, Flame, Zap, Shield, TrendingUp } from 'lucide-react';
import ImageWithFallback from '@/components/common/ImageWithFallback';
import { findPlayerInSquads } from '@/lib/playerMatcher';
import EmptyState from '@/components/common/EmptyState';

interface MvpTabProps {
  scoreData: any;
  loading?: boolean;
}

interface PlayerImpact {
  name: string;
  team: string;
  image?: string | null;
  role?: string;
  points: number;
  runs: number;
  balls: number;
  fours: number;
  sixes: number;
  strikeRate: string;
  wickets: number;
  runsConceded: number;
  overs: string;
  maidens: number;
  economy: string;
}

export const MvpTab: React.FC<MvpTabProps> = ({ scoreData, loading }) => {
  const squads = scoreData?.data?.squads || scoreData?.squads;
  const rawLeaders = scoreData?.data?.leaders || scoreData?.leaders || [];
  const tables = scoreData?.data?.tables || scoreData?.tables || [];

  // Filter only genuine official leaders (ignore placeholders / empty players)
  const validOfficialLeaders = useMemo(() => {
    if (!Array.isArray(rawLeaders)) return [];
    return rawLeaders.filter((l: any) => {
      const name = l?.name || l?.athlete?.displayName;
      return name && typeof name === 'string' && name.trim().length > 1 && name.toLowerCase() !== 'player';
    });
  }, [rawLeaders]);

  // Robustly extract and compute MVP Impact leaderboard across all scorecard tables
  const leaderboard: PlayerImpact[] = useMemo(() => {
    if (!tables || !Array.isArray(tables) || tables.length === 0) return [];

    const map = new Map<string, PlayerImpact>();

    tables.forEach((table: any) => {
      const title = String(table.title || table.team || '').trim();
      const teamName = title.replace(/\s*(1st|2nd)?\s*Innings.*$/i, '').trim() || 'Team';
      const isBatting = table.type === 'Batting' || /batting|batter/i.test(table.title || '');
      const isBowling = table.type === 'Bowling' || /bowling|bowler/i.test(table.title || '');

      const rows: any[] = Array.isArray(table.rows) ? table.rows : Array.isArray(table.batsmen) ? table.batsmen : Array.isArray(table.bowlers) ? table.bowlers : [];

      rows.forEach((row: any) => {
        if (!row || typeof row !== 'object') return;

        if (isBatting || (!isBowling && (row['BATTING'] || row['Batting'] || row['Batter'] || row.batsman))) {
          // Extract Batter Name
          const rawCell = row['BATTING'] || row['Batting'] || row['Batter'] || row.batsman || row.name || Object.values(row)[0] || '';
          if (typeof rawCell !== 'string') return;
          const firstLine = rawCell.split('\n')[0]?.trim() || '';
          if (!firstLine || /extras|total|did not bat|fall of wickets/i.test(firstLine)) return;

          const cleanName = firstLine
            .replace(/\s*\(c\)/i, '')
            .replace(/\s*†/g, '')
            .replace(/\s*\(wk\)/i, '')
            .replace(/►/g, '')
            .trim();

          if (!cleanName || cleanName.length < 2) return;

          const rawR = row['R'] ?? row['r'] ?? row['Runs'] ?? row.runs ?? 0;
          const rawB = row['B'] ?? row['b'] ?? row['Balls'] ?? row.balls ?? 0;
          const raw4s = row['4s'] ?? row['4S'] ?? row['Fours'] ?? row['fours'] ?? 0;
          const raw6s = row['6s'] ?? row['6S'] ?? row['Sixes'] ?? row['sixes'] ?? 0;
          const rawSR = row['SR'] ?? row['sr'] ?? row['Strike Rate'] ?? row.strikeRate ?? '-';

          const runs = parseInt(String(rawR), 10) || 0;
          const balls = parseInt(String(rawB), 10) || 0;
          const fours = parseInt(String(raw4s), 10) || 0;
          const sixes = parseInt(String(raw6s), 10) || 0;
          const sr = rawSR !== '-' ? String(rawSR) : balls > 0 ? ((runs / balls) * 100).toFixed(1) : '0.0';

          if (!map.has(cleanName)) {
            const matched = findPlayerInSquads(cleanName, squads);
            map.set(cleanName, {
              name: cleanName,
              team: teamName,
              image: matched?.image || null,
              role: matched?.role || 'Batter',
              points: 0,
              runs: 0,
              balls: 0,
              fours: 0,
              sixes: 0,
              strikeRate: sr,
              wickets: 0,
              runsConceded: 0,
              overs: '0',
              maidens: 0,
              economy: '0.0'
            });
          }

          const p = map.get(cleanName)!;
          p.runs += runs;
          p.balls += balls;
          p.fours += fours;
          p.sixes += sixes;
          p.strikeRate = sr;

          // Points Formula: runs + boundary bonus + milestones
          let pts = runs + fours * 2.5 + sixes * 5;
          if (runs >= 100) pts += 25;
          else if (runs >= 50) pts += 15;
          else if (runs >= 30) pts += 5;
          p.points += Math.round(pts);
        }

        if (isBowling || (!isBatting && (row['BOWLING'] || row['Bowling'] || row['Bowler'] || row.bowler))) {
          // Extract Bowler Name
          const rawCell = row['BOWLING'] || row['Bowling'] || row['Bowler'] || row.bowler || row.name || Object.values(row)[0] || '';
          if (typeof rawCell !== 'string') return;
          const firstLine = rawCell.split('\n')[0]?.trim() || '';
          if (!firstLine) return;

          const cleanName = firstLine.replace(/►/g, '').trim();
          if (!cleanName || cleanName.length < 2) return;

          const rawO = row['O'] ?? row['o'] ?? row['Overs'] ?? row.overs ?? '0';
          const rawM = row['M'] ?? row['m'] ?? row['Maidens'] ?? row.maidens ?? 0;
          const rawR = row['R'] ?? row['r'] ?? row['Runs'] ?? row.runs ?? 0;
          const rawW = row['W'] ?? row['w'] ?? row['Wickets'] ?? row.wickets ?? 0;
          const rawEcon = row['ECON'] ?? row['econ'] ?? row['Economy'] ?? row.economy ?? '0.0';

          const overs = String(rawO);
          const maidens = parseInt(String(rawM), 10) || 0;
          const runsConceded = parseInt(String(rawR), 10) || 0;
          const wickets = parseInt(String(rawW), 10) || 0;
          const economy = String(rawEcon);

          if (!map.has(cleanName)) {
            const matched = findPlayerInSquads(cleanName, squads);
            map.set(cleanName, {
              name: cleanName,
              team: teamName,
              image: matched?.image || null,
              role: matched?.role || 'Bowler',
              points: 0,
              runs: 0,
              balls: 0,
              fours: 0,
              sixes: 0,
              strikeRate: '0.0',
              wickets: 0,
              runsConceded: 0,
              overs: '0',
              maidens: 0,
              economy: '0.0'
            });
          }

          const p = map.get(cleanName)!;
          p.wickets += wickets;
          p.runsConceded += runsConceded;
          p.overs = overs;
          p.maidens += maidens;
          p.economy = economy;

          // Points Formula: wickets (25 pts each) + maiden bonus + hauls
          let pts = wickets * 25 + maidens * 10;
          if (wickets >= 5) pts += 25;
          else if (wickets >= 3) pts += 15;
          p.points += Math.round(pts);
        }
      });
    });

    return Array.from(map.values())
      .filter((p) => p.points > 0 || p.runs > 0 || p.wickets > 0)
      .sort((a, b) => b.points - a.points);
  }, [tables, squads]);

  const top3 = useMemo(() => leaderboard.slice(0, 3), [leaderboard]);

  if (loading) {
    return (
      <div className="space-y-6 animate-pulse">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div className="h-44 rounded-xl bg-white border border-slate-200" />
          <div className="h-44 rounded-xl bg-white border border-slate-200" />
          <div className="h-44 rounded-xl bg-white border border-slate-200" />
        </div>
        <div className="h-96 rounded-xl bg-white border border-slate-200" />
      </div>
    );
  }

  if (leaderboard.length === 0 && validOfficialLeaders.length === 0) {
    return (
      <EmptyState
        type="scorecard"
        title="Impact Data In Progress"
        message="Official Match MVP and Player Impact ratings will be calculated as player performances are recorded."
      />
    );
  }

  return (
    <div className="space-y-6">
      {/* Official Match Leaders Strip */}
      {validOfficialLeaders.length > 0 && (
        <div className="space-y-3">
          <div className="flex items-center gap-2">
            <Trophy className="w-4 h-4 text-amber-500" />
            <h3 className="text-xs font-bold text-slate-500 uppercase tracking-wider">
              Official Match Leaders
            </h3>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-3">
            {validOfficialLeaders.map((lead: any, idx: number) => {
              const matched = findPlayerInSquads(lead.name, squads);
              const photo = lead.image || lead.athlete?.headshot?.href || matched?.image;

              return (
                <div
                  key={idx}
                  className="p-4 rounded-xl border border-slate-200 bg-slate-50/70 flex items-center gap-3.5 hover:border-red-300 transition-colors"
                >
                  <div className="w-12 h-12 rounded-full overflow-hidden border-2 border-red-500 bg-white flex-shrink-0 flex items-center justify-center shadow-xs">
                    <ImageWithFallback
                      src={photo}
                      alt={lead.name}
                      width={48}
                      height={48}
                      fallbackText={lead.name}
                    />
                  </div>
                  <div className="min-w-0 flex-1">
                    <span className="text-[10px] font-black uppercase tracking-wider text-red-600">
                      {lead.title || lead.displayName || 'Top Performer'}
                    </span>
                    <h4 className="text-sm font-extrabold text-slate-900 truncate">
                      {lead.name}
                    </h4>
                    <p className="text-xs font-semibold text-slate-600 truncate">
                      {lead.stat || lead.displayValue || lead.value || ''}
                    </p>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      )}

      {/* Top 3 Impact Performers Podium */}
      {top3.length >= 2 && (
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {/* Rank 2 */}
          {top3[1] && (
            <div className="order-2 md:order-1 bg-white border border-slate-200 rounded-xl p-5 shadow-2xs flex flex-col items-center text-center space-y-3">
              <div className="w-7 h-7 rounded-full bg-slate-100 border border-slate-300 flex items-center justify-center text-xs font-black text-slate-700">
                2
              </div>
              <div className="w-16 h-16 rounded-full overflow-hidden border-2 border-slate-300 bg-slate-50 flex items-center justify-center shadow-xs">
                <ImageWithFallback
                  src={top3[1].image}
                  alt={top3[1].name}
                  width={64}
                  height={64}
                  fallbackText={top3[1].name}
                />
              </div>
              <div>
                <h4 className="font-extrabold text-slate-900 text-sm">{top3[1].name}</h4>
                <span className="text-xs font-semibold text-slate-500">{top3[1].team}</span>
              </div>
              <div className="text-xs text-slate-600 font-semibold">
                Impact Points: <span className="text-red-600 font-black text-base">{top3[1].points}</span>
              </div>
            </div>
          )}

          {/* Rank 1 (Match MVP Champion) */}
          {top3[0] && (
            <div className="order-1 md:order-2 bg-white border-2 border-red-500 rounded-xl p-5 shadow-sm flex flex-col items-center text-center space-y-3 relative">
              <div className="absolute -top-3 px-3 py-0.5 rounded-full bg-red-600 text-white font-black text-[10px] uppercase tracking-wider shadow-xs flex items-center gap-1">
                <Trophy className="w-3 h-3" />
                <span>Match MVP</span>
              </div>
              <div className="w-8 h-8 rounded-full bg-red-50 border border-red-300 flex items-center justify-center text-sm font-black text-red-600 mt-1">
                1
              </div>
              <div className="w-20 h-20 rounded-full overflow-hidden border-3 border-red-500 bg-slate-50 flex items-center justify-center shadow-md">
                <ImageWithFallback
                  src={top3[0].image}
                  alt={top3[0].name}
                  width={80}
                  height={80}
                  fallbackText={top3[0].name}
                />
              </div>
              <div>
                <h4 className="font-black text-slate-900 text-base">{top3[0].name}</h4>
                <span className="text-xs font-bold text-slate-500">{top3[0].team}</span>
              </div>
              <div className="text-xs text-slate-600 font-semibold">
                Impact Points: <span className="text-red-600 font-black text-lg">{top3[0].points}</span>
              </div>
            </div>
          )}

          {/* Rank 3 */}
          {top3[2] && (
            <div className="order-3 bg-white border border-slate-200 rounded-xl p-5 shadow-2xs flex flex-col items-center text-center space-y-3">
              <div className="w-7 h-7 rounded-full bg-amber-50 border border-amber-300 flex items-center justify-center text-xs font-black text-amber-800">
                3
              </div>
              <div className="w-16 h-16 rounded-full overflow-hidden border-2 border-amber-400 bg-slate-50 flex items-center justify-center shadow-xs">
                <ImageWithFallback
                  src={top3[2].image}
                  alt={top3[2].name}
                  width={64}
                  height={64}
                  fallbackText={top3[2].name}
                />
              </div>
              <div>
                <h4 className="font-extrabold text-slate-900 text-sm">{top3[2].name}</h4>
                <span className="text-xs font-semibold text-slate-500">{top3[2].team}</span>
              </div>
              <div className="text-xs text-slate-600 font-semibold">
                Impact Points: <span className="text-red-600 font-black text-base">{top3[2].points}</span>
              </div>
            </div>
          )}
        </div>
      )}

      {/* Full MVP Impact Leaderboard Table */}
      <div className="bg-white border border-slate-200 rounded-xl overflow-hidden shadow-2xs">
        <div className="p-4 sm:p-5 border-b border-slate-200 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <Flame className="w-5 h-5 text-red-600" />
            <h3 className="text-base font-extrabold text-slate-900 tracking-tight">
              Player Impact Leaderboard
            </h3>
          </div>
          <span className="text-xs font-bold text-slate-500">
            {leaderboard.length} Players Rated
          </span>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs sm:text-sm">
            <thead className="bg-slate-50 text-slate-600 text-xs font-extrabold uppercase tracking-wider border-b border-slate-200">
              <tr>
                <th className="py-3 px-4 text-center">Rank</th>
                <th className="py-3 px-4">Player</th>
                <th className="py-3 px-4 text-center">Impact Pts</th>
                <th className="py-3 px-4 text-center">Batting</th>
                <th className="py-3 px-4 text-center">Bowling</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100 font-medium">
              {leaderboard.map((player, idx) => (
                <tr key={idx} className="hover:bg-red-50/40 transition-colors">
                  <td className="py-3 px-4 text-center font-black text-slate-700">
                    {idx + 1}
                  </td>
                  <td className="py-3 px-4">
                    <div className="flex items-center gap-3">
                      <div className="w-9 h-9 rounded-full overflow-hidden border border-slate-200 bg-slate-50 flex-shrink-0 flex items-center justify-center">
                        <ImageWithFallback
                          src={player.image}
                          alt={player.name}
                          width={36}
                          height={36}
                          fallbackText={player.name}
                        />
                      </div>
                      <div className="min-w-0">
                        <span className="font-extrabold text-slate-900 block truncate">
                          {player.name}
                        </span>
                        <span className="text-[11px] font-semibold text-slate-500 block truncate">
                          {player.team}
                        </span>
                      </div>
                    </div>
                  </td>
                  <td className="py-3 px-4 text-center">
                    <span className="inline-block px-2.5 py-1 rounded-md bg-red-50 text-red-700 font-black text-sm border border-red-200">
                      {player.points}
                    </span>
                  </td>
                  <td className="py-3 px-4 text-center text-slate-700">
                    {player.runs > 0 || player.balls > 0 ? (
                      <div>
                        <span className="font-bold text-slate-900">{player.runs}</span>
                        <span className="text-slate-500 text-xs"> ({player.balls}b, {player.fours}×4, {player.sixes}×6)</span>
                      </div>
                    ) : (
                      <span className="text-slate-400">—</span>
                    )}
                  </td>
                  <td className="py-3 px-4 text-center text-slate-700">
                    {player.wickets > 0 || parseFloat(player.overs) > 0 ? (
                      <div>
                        <span className="font-bold text-slate-900">{player.wickets}/{player.runsConceded}</span>
                        <span className="text-slate-500 text-xs"> ({player.overs} ov, ER {player.economy})</span>
                      </div>
                    ) : (
                      <span className="text-slate-400">—</span>
                    )}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default MvpTab;
