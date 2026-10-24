'use client';

import React from 'react';
import { ScorecardTable } from '@/types/match';

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
}

export const BattingTable: React.FC<BattingTableProps> = ({ table, battingData }) => {
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
          dismissal = row['Dismissal'] || row['dismissal'] || '';
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
          <tr className="bg-slate-100 text-slate-700 text-xs font-bold uppercase tracking-wider border-b border-slate-200">
            <th className="py-2.5 px-4">Batter</th>
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

            return (
              <tr 
                key={idx}
                className="hover:bg-red-50/30 transition-colors"
              >
                <td className="py-2.5 px-4">
                  <span className="font-bold text-slate-900 block leading-tight">
                    {batter.name}
                  </span>
                  {batter.dismissal && (
                    <span className="text-xs text-slate-500 italic mt-0.5 block max-w-md truncate">
                      {batter.dismissal}
                    </span>
                  )}
                </td>
                <td className="py-2.5 px-3 text-right">
                  <span className={`font-bold ${isMilestone ? 'text-red-600 font-extrabold text-base' : 'text-slate-900'}`}>
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
                <td className="py-2.5 px-4 text-right text-slate-600 font-mono text-xs">
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
