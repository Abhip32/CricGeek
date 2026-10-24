'use client';

import React from 'react';
import { InningSection } from './InningSection';
import { ScorecardTable } from '@/types/match';
import EmptyState from '../common/EmptyState';
import { motion } from 'framer-motion';

interface ScorecardTabProps {
  scoreData: any;
  miniScoreData?: any;
  loading?: boolean;
}

export const ScorecardTab: React.FC<ScorecardTabProps> = ({ scoreData, loading }) => {
  if (loading) {
    return (
      <div className="space-y-6 animate-pulse">
        <div className="h-48 rounded-2xl glass-panel bg-white/5" />
        <div className="h-48 rounded-2xl glass-panel bg-white/5" />
      </div>
    );
  }

  // 1. Check legacy format (scoreData.innings)
  if (scoreData?.innings && Array.isArray(scoreData.innings) && scoreData.innings.length > 0) {
    return (
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.3 }}
        className="space-y-8"
      >
        {scoreData.innings.map((inning: any, index: number) => (
          <InningSection key={index} inning={inning} />
        ))}
      </motion.div>
    );
  }

  // 2. Modern Scraper format (scoreData.data.tables or scoreData.tables)
  const tables: ScorecardTable[] = scoreData?.data?.tables || scoreData?.tables || [];

  if (!tables || tables.length === 0) {
    return (
      <EmptyState
        title="Scorecard Unavailable"
        description="Detailed innings scorecard is not yet published or is being updated by the match officials."
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
        // Push previous batting table without bowling
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
      // General table
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
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.3 }}
      className="space-y-8"
    >
      {inningsPairs.map((pair, idx) => (
        <InningSection
          key={idx}
          title={pair.title}
          battingTable={pair.battingTable}
          bowlingTable={pair.bowlingTable}
        />
      ))}
    </motion.div>
  );
};

export default ScorecardTab;
