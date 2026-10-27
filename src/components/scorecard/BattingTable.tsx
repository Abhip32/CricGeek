'use client';

import React from 'react';
import { ScorecardTable } from '@/types/match';
import ImageWithFallback from '../common/ImageWithFallback';
import { findPlayerInSquads } from '@/lib/playerMatcher';

interface BattingRow {
  name?: string;
  dismissal?: string;
  runs?: number | string;
  balls?: number | string;
  fours?: number | string;
  sixes?: number | string;
  strikeRate?: number | string;
}

interface BattingTableProps {
  table?: ScorecardTable;
  battingData?: BattingRow[];
  squads?: Record<string, any[]> | null;
}

export const BattingTable: React.FC<BattingTableProps> = ({ table, battingData, squads }) => {
  const rows = React.useMemo(() => {
    if (battingData && Array.isArray(battingData)) {
      return battingData.map((r) => ({
        name: r.name || '',
        dismissal: r.dismissal || '',
        runs: r.runs ?? '-',
        balls: r.balls ?? '-',
        fours: r.fours ?? '-',
        sixes: r.sixes ?? '-',
        sr: r.strikeRate ?? '-'
      }));
    }

    if (table && Array.isArray(table.rows)) {
      return table.rows.map((row) => {
        let name = '';
        let dismissal = '';

        const battingCell = row['BATTING'] || row['Batting'] || row['Batter'] || Object.values(row)[0] || '';

        if (battingCell.includes('\n')) {
          const parts = battingCell.split('\n');
          name = parts[0]?.trim() || '';
          dismissal = parts.slice(1).join(' ').trim();
        } else {
          dismissal = row['Dismissal'] || row['dismissal'] || row['col_1'] || '';
          name = battingCell;
          if (!dismissal && /(c\s+|b\s+|lbw|run out|not out|st\s+)/i.test(name)) {
            const match = name.match(/^(.*?)(c\s+.*|b\s+.*|lbw.*|run out.*|not out.*|st\s+.*)$/i);
            if (match) {
              name = match[1].trim();
              dismissal = match[2].trim();
            }
          }
        }

        const runs = row['R'] || row['r'] || row['Runs'] || '-';
        const balls = row['B'] || row['b'] || row['Balls'] || '-';
        const fours = row['4s'] || row['4S'] || row['Fours'] || '-';
        const sixes = row['6s'] || row['6S'] || row['Sixes'] || '-';
        const sr = row['SR'] || row['sr'] || row['Strike Rate'] || '-';

        return {
          name,
          dismissal: dismissal.replace(/►/g, '').trim(),
          runs,
          balls,
          fours,
          sixes,
          sr
        };
      });
    }

    return [];
  }, [table, battingData]);

  if (!rows || rows.length === 0) {
    return (
      <div className="py-5 text-center text-slate-500 text-xs">
        No batting data recorded for this innings.
      </div>
    );
  }

  return (
    <div className="overflow-x-auto rounded-xl border border-slate-200 bg-white shadow-2xs">
      <table className="w-full text-left text-sm">
        <thead>
          <tr className="bg-slate-100/80 text-slate-700 text-xs font-black uppercase tracking-wider border-b border-slate-200">
            <th className="py-2.5 px-4">BATTING</th>
            <th className="py-2.5 px-3 text-right">R</th>
            <th className="py-2.5 px-3 text-right">B</th>
            <th className="py-2.5 px-3 text-right">4s</th>
            <th className="py-2.5 px-3 text-right">6s</th>
            <th className="py-2.5 px-4 text-right">SR</th>
          </tr>
        </thead>
        <tbody className="divide-y divide-slate-100">
          {rows.map((batter, idx) => {
            const runsNum = parseInt(String(batter.runs), 10);
            const isMilestone = !isNaN(runsNum) && runsNum >= 50;
            const isNotOut = (batter.dismissal || '').toLowerCase().includes('not out');
            const matchedPlayer = findPlayerInSquads(batter.name, squads);

            return (
              <tr
                key={idx}
                className={`transition-colors ${
                  isNotOut ? 'bg-red-50/20 hover:bg-red-50/40' : 'hover:bg-slate-50/80'
                }`}
              >
                {/* Batter with headshot image matching squads */}
                <td className="py-2.5 px-4">
                  <div className="flex items-center gap-2.5">
                    {/* Active Batter red indicator bar */}
                    {isNotOut && (
                      <span className="w-1 h-7 bg-red-600 rounded-full flex-shrink-0 -ml-1" />
                    )}

                    {/* Circular player headshot or monogram */}
                    <div className="w-7 h-7 rounded-full overflow-hidden border border-slate-200 bg-slate-100 flex-shrink-0 flex items-center justify-center shadow-2xs">
                      {matchedPlayer?.image ? (
                        <ImageWithFallback
                          src={matchedPlayer.image}
                          alt={batter.name}
                          width={28}
                          height={28}
                          fallbackText={batter.name.slice(0, 1)}
                        />
                      ) : (
                        <span className="text-[10px] font-black text-slate-600">
                          {batter.name.charAt(0).toUpperCase()}
                        </span>
                      )}
                    </div>

                    <div className="min-w-0">
                      <div className="flex items-center gap-1.5 flex-wrap">
                        <span className="font-bold text-slate-900 leading-tight">
                          {batter.name}
                        </span>
                        {matchedPlayer?.captain && (
                          <span className="text-[9px] font-black px-1 rounded bg-amber-100 text-amber-900 border border-amber-300">
                            C
                          </span>
                        )}
                        {matchedPlayer?.wicketkeeper && (
                          <span className="text-[9px] font-black px-1 rounded bg-blue-100 text-blue-900 border border-blue-300">
                            WK
                          </span>
                        )}
                      </div>

                      {batter.dismissal && (
                        <span
                          className={`text-xs block mt-0.5 truncate max-w-md ${
                            isNotOut ? 'font-bold text-red-600' : 'text-slate-500'
                          }`}
                        >
                          {batter.dismissal}
                        </span>
                      )}
                    </div>
                  </div>
                </td>

                <td className="py-2.5 px-3 text-right">
                  <span
                    className={`font-black tracking-tight ${
                      isMilestone
                        ? 'text-red-600 font-extrabold text-base'
                        : 'text-slate-900 font-bold'
                    }`}
                  >
                    {batter.runs}
                  </span>
                </td>
                <td className="py-2.5 px-3 text-right text-slate-700 font-medium">
                  {batter.balls}
                </td>
                <td className="py-2.5 px-3 text-right text-slate-600 font-medium">
                  {batter.fours}
                </td>
                <td className="py-2.5 px-3 text-right text-slate-600 font-medium">
                  {batter.sixes}
                </td>
                <td className="py-2.5 px-4 text-right text-slate-600 font-mono text-xs font-semibold">
                  {batter.sr}
                </td>
              </tr>
            );
          })}
        </tbody>
      </table>
    </div>
  );
};

export default BattingTable;
