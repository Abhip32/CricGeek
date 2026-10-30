'use client';

import React, { useState } from 'react';
import { InningSection } from './InningSection';
import { ScorecardTable } from '@/types/match';
import ScorecardTableSkeleton from './ScorecardTableSkeleton';
import EmptyState from '../common/EmptyState';

interface ScorecardTabProps {
  scoreData: any;
  miniScoreData?: any;
  loading?: boolean;
}

export const ScorecardTab: React.FC<ScorecardTabProps> = ({ scoreData, loading }) => {
  const [selectedInningIdx, setSelectedInningIdx] = useState<number | 'all'>('all');

  if (loading) {
    return <ScorecardTableSkeleton />;
  }

  const squads = scoreData?.data?.squads || null;
  const allPartnerships: any[] = scoreData?.data?.partnerships || [];
  const allFow: any[] = scoreData?.data?.fallOfWickets || [];
  const allDrs: any[] = scoreData?.data?.drsReviews || [];

  // Legacy format support
  if (scoreData?.innings && Array.isArray(scoreData.innings) && scoreData.innings.length > 0) {
    return (
      <div className="space-y-6">
        {scoreData.innings.map((inning: any, index: number) => (
          <InningSection key={index} inning={inning} squads={squads} />
        ))}
      </div>
    );
  }

  // Modern Scraper format (scoreData.data.tables or scoreData.tables)
  const tables: ScorecardTable[] = scoreData?.data?.tables || scoreData?.tables || [];

  if (!tables || tables.length === 0) {
    return (
      <EmptyState
        type="scorecard"
        title="Scorecard In Progress"
        message="The full match scorecard is being updated or will be published once the innings gets underway."
      />
    );
  }

  // Pair batting and bowling tables into innings
  const inningsPairs: Array<{
    title: string;
    battingTable?: ScorecardTable;
    bowlingTable?: ScorecardTable;
  }> = [];

  let currentBatting: ScorecardTable | undefined = undefined;

  for (let i = 0; i < tables.length; i++) {
    const table = tables[i];
    if (table.type === 'Batting') {
      if (currentBatting) {
        inningsPairs.push({
          title: currentBatting.title || `Innings ${inningsPairs.length + 1}`,
          battingTable: currentBatting
        });
      }
      currentBatting = table;
    } else if (table.type === 'Bowling') {
      if (currentBatting) {
        inningsPairs.push({
          title: currentBatting.title || `Innings ${inningsPairs.length + 1}`,
          battingTable: currentBatting,
          bowlingTable: table
        });
        currentBatting = undefined;
      } else {
        inningsPairs.push({
          title: table.title || `Bowling`,
          bowlingTable: table
        });
      }
    } else {
      inningsPairs.push({
        title: table.title || `Match Data`,
        battingTable: table
      });
    }
  }

  if (currentBatting) {
    inningsPairs.push({
      title: currentBatting.title || `Innings ${inningsPairs.length + 1}`,
      battingTable: currentBatting
    });
  }

  const displayedPairs =
    selectedInningIdx === 'all'
      ? inningsPairs
      : [inningsPairs[selectedInningIdx]].filter(Boolean);

  return (
    <div className="space-y-5">
      {/* Innings Switcher Pills */}
      {inningsPairs.length > 1 && (
        <div className="flex items-center gap-2 overflow-x-auto pb-1 scrollbar-none">
          <button
            onClick={() => setSelectedInningIdx('all')}
            className={`px-3.5 py-1.5 rounded-lg text-xs font-bold transition-all whitespace-nowrap ${
              selectedInningIdx === 'all'
                ? 'bg-red-600 text-white shadow-xs'
                : 'bg-white border border-slate-200 text-slate-700 hover:bg-slate-100 hover:text-red-600'
            }`}
          >
            All Innings
          </button>

          {inningsPairs.map((pair, idx) => {
            const cleanTitle = pair.title
              .replace(/\s+Batting/i, '')
              .replace(/\s+Innings/i, '')
              .trim();
            const isActive = selectedInningIdx === idx;

            return (
              <button
                key={idx}
                onClick={() => setSelectedInningIdx(idx)}
                className={`px-3.5 py-1.5 rounded-lg text-xs font-bold transition-all whitespace-nowrap ${
                  isActive
                    ? 'bg-red-600 text-white shadow-xs'
                    : 'bg-white border border-slate-200 text-slate-700 hover:bg-slate-100 hover:text-red-600'
                }`}
              >
                {cleanTitle} Innings
              </button>
            );
          })}
        </div>
      )}

      {/* Innings Sections */}
      <div className="space-y-6">
        {displayedPairs.map((pair, idx) => {
          const originalIdx = inningsPairs.indexOf(pair);
          const inningPeriod = originalIdx >= 0 ? originalIdx + 1 : idx + 1;
          const cleanTitle = pair.title
            .replace(/\s+Batting/i, '')
            .replace(/\s+Innings/i, '')
            .trim();

          const matchedPartnerships = allPartnerships.find(
            (p: any) =>
              p.period === inningPeriod ||
              (p.team && (p.team.toLowerCase().includes(cleanTitle.toLowerCase()) ||
               cleanTitle.toLowerCase().includes(p.team.toLowerCase())))
          )?.partnerships || [];

          const matchedFow = allFow.find(
            (f: any) =>
              f.period === inningPeriod ||
              (f.team && (f.team.toLowerCase().includes(cleanTitle.toLowerCase()) ||
               cleanTitle.toLowerCase().includes(f.team.toLowerCase())))
          )?.fallOfWickets || [];

          const matchedDrs = allDrs.filter(
            (d: any) =>
              d.period === inningPeriod ||
              (d.team && (d.team.toLowerCase().includes(cleanTitle.toLowerCase()) ||
               cleanTitle.toLowerCase().includes(d.team.toLowerCase())))
          );

          return (
            <InningSection
              key={idx}
              title={pair.title}
              battingTable={pair.battingTable}
              bowlingTable={pair.bowlingTable}
              squads={squads}
              partnerships={matchedPartnerships}
              richFow={matchedFow}
              drsReviews={matchedDrs}
            />
          );
        })}
      </div>
    </div>
  );
};

export default ScorecardTab;
