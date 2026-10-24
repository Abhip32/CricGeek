'use client';

import React from 'react';
import { ScorecardSummary } from '@/types/match';
import { MapPin, Trophy, Calendar, Info, ShieldCheck, Flag } from 'lucide-react';
import { motion } from 'framer-motion';

interface DetailsTabProps {
  scoreData: any;
  loading?: boolean;
}

export const DetailsTab: React.FC<DetailsTabProps> = ({ scoreData, loading }) => {
  if (loading) {
    return (
      <div className="h-64 rounded-2xl glass-panel bg-white/5 animate-pulse" />
    );
  }

  const summary: ScorecardSummary = scoreData?.data?.summary || scoreData?.summary || {};
  const legacyDetails = scoreData?.matchInfo?.details || {};

  const detailsList: Array<{ label: string; value: string; icon?: any }> = [];

  if (summary.matchTitle) {
    detailsList.push({ label: 'Match', value: summary.matchTitle, icon: Info });
  }

  if (summary.venue) {
    detailsList.push({ label: 'Venue & City', value: summary.venue, icon: MapPin });
  }

  if (summary.result) {
    detailsList.push({ label: 'Match Result', value: summary.result, icon: Trophy });
  }

  if (summary.status) {
    detailsList.push({ label: 'Match Status', value: summary.status, icon: ShieldCheck });
  }

  // Add legacy key-values if present
  Object.entries(legacyDetails).forEach(([k, v]) => {
    if (v && typeof v === 'string') {
      detailsList.push({ label: k, value: v, icon: Flag });
    }
  });

  if (detailsList.length === 0) {
    return (
      <div className="p-8 text-center text-slate-400 glass-panel rounded-2xl border border-white/5">
        No match info details available for this match.
      </div>
    );
  }

  return (
    <motion.div
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3 }}
      className="glass-panel rounded-2xl border border-white/10 overflow-hidden"
    >
      <div className="p-4 sm:p-6 border-b border-white/10 bg-slate-900/40 flex items-center gap-3">
        <Info className="w-5 h-5 text-emerald-400" />
        <h3 className="text-base font-bold text-white">Match Information</h3>
      </div>

      <div className="divide-y divide-white/5">
        {detailsList.map((item, idx) => {
          const Icon = item.icon || Info;
          return (
            <div
              key={idx}
              className="p-4 sm:p-5 flex flex-col sm:flex-row sm:items-center justify-between gap-2 hover:bg-white/[0.02] transition-colors"
            >
              <div className="flex items-center gap-3 text-slate-400">
                <Icon className="w-4 h-4 text-emerald-400/70 flex-shrink-0" />
                <span className="text-sm font-medium">{item.label}</span>
              </div>
              <div className="text-sm font-semibold text-white sm:text-right max-w-xl">
                {item.value}
              </div>
            </div>
          );
        })}
      </div>
    </motion.div>
  );
};

export default DetailsTab;
