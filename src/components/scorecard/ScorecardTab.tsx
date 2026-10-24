'use client';

import React from 'react';
import { InningSection } from './InningSection';
import { ScorecardTable } from '@/types/match';
import EmptyState from '../common/EmptyState';

interface ScorecardTabProps {
  scoreData: any;
  miniScoreData?: any;
  loading?: boolean;
}

export const ScorecardTab: React.FC<ScorecardTabProps> = ({ scoreData, loading }) => {
  if (loading) {
    return (
      <div className="space-y-4 animate-pulse">
        <div className="h-64 rounded-xl bg-white border border-slate-200" />
        <div className="h-64 rounded-xl bg-white border border-slate-200" />
      </div>
    );
  }

  // Legacy format support
  if (scoreData?.innings && Array.isArray(scoreData.innings) && scoreData.innings.length > 0) {
    return (
      <div className="space-y-6">
        {scoreData.innings.map((inning: any, index: number) => (
          <InningSection key={index} inning={inning} />
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

  return (
    <div className="space-y-6">
      {inningsPairs.map((pair, idx) => (
        <InningSection
          key={idx}
          title={pair.title}
          battingTable={pair.battingTable}
          bowlingTable={pair.bowlingTable}
        />
      ))}
    </div>
  );
};

export default ScorecardTab;
