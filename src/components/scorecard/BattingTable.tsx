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
  // Normalize rows from either table format or legacy battingData
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
        // Cricinfo has headers like "BATTING", "R", "B", "M", "4s", "6s", "SR"
        // Batter cell often contains dismissal inside or as a following line
        let name = '';
        let dismissal = '';

        const battingCell = row['BATTING'] || row['Batting'] || row['Batter'] || Object.values(row)[0] || '';
        
        // Parse name and dismissal if combined
        if (battingCell.includes('\n')) {
          const parts = battingCell.split('\n');
          name = parts[0]?.trim() || '';
          dismissal = parts.slice(1).join(' ').trim();
        } else {
          // If separate dismissal key exists
          dismissal = row['Dismissal'] || row['dismissal'] || '';
          name = battingCell;
          // Clean up "c ... b ..."
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
      <div className="py-6 text-center text-slate-500 text-sm">
        No batting data available for this innings.
      </div>
    );
  }

  return (
    <div className="overflow-x-auto rounded-xl border border-white/10 glass-panel">
      <table className="w-full text-left text-sm">
        <thead>
          <tr className="border-b border-white/10 bg-slate-900/60 text-slate-400 font-semibold text-xs tracking-wider uppercase">
            <th className="py-3 px-4">Batter</th>
            <th className="py-3 px-3 text-right">R</th>
            <th className="py-3 px-3 text-right">B</th>
            <th className="py-3 px-3 text-right">4s</th>
            <th className="py-3 px-3 text-right">6s</th>
            <th className="py-3 px-4 text-right">SR</th>
          </tr>
        </thead>
        <tbody className="divide-y divide-white/5">
          {rows.map((batter, idx) => {
            const runsNum = parseInt(String(batter.runs), 10);
            const isMilestone = !isNaN(runsNum) && runsNum >= 50;
            const isCentury = !isNaN(runsNum) && runsNum >= 100;

            return (
              <tr 
                key={idx}
                className="transition-colors hover:bg-white/[0.03] group"
              >
                <td className="py-3 px-4">
                  <div className="font-semibold text-white group-hover:text-emerald-400 transition-colors">
                    {batter.name}
                  </div>
                  {batter.dismissal && (
                    <div className="text-xs text-slate-400 italic mt-0.5 max-w-md truncate">
                      {batter.dismissal}
                    </div>
                  )}
                </td>
                <td className="py-3 px-3 text-right">
                  <span className={`font-bold ${
                    isCentury ? 'text-amber-400 font-extrabold' : 
                    isMilestone ? 'text-emerald-400 font-extrabold' : 
                    'text-white'
                  }`}>
                    {batter.runs}
                  </span>
                </td>
                <td className="py-3 px-3 text-right text-slate-300 font-medium">
                  {batter.balls}
                </td>
                <td className="py-3 px-3 text-right text-slate-400 font-medium">
                  {batter.fours}
                </td>
                <td className="py-3 px-3 text-right text-slate-400 font-medium">
                  {batter.sixes}
                </td>
                <td className="py-3 px-4 text-right text-slate-300 font-medium font-mono text-xs">
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
