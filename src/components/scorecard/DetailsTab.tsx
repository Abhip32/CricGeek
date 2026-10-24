'use client';

import React from 'react';
import { ScorecardSummary } from '@/types/match';
import { Info, MapPin, Trophy, ShieldCheck, Flag, Users, Clock, Calendar, Star } from 'lucide-react';

interface DetailsTabProps {
  scoreData: any;
  loading?: boolean;
}

export const DetailsTab: React.FC<DetailsTabProps> = ({ scoreData, loading }) => {
  if (loading) {
    return (
      <div className="h-64 rounded-xl bg-white border border-slate-200 animate-pulse" />
    );
  }

  const summary: ScorecardSummary = scoreData?.data?.summary || scoreData?.summary || {};
  const scrapedDetails = scoreData?.data?.details || scoreData?.details || {};
  const legacyDetails = scoreData?.matchInfo?.details || {};

  const detailsList: Array<{ label: string; value: string; icon?: any }> = [];

  if (summary.matchTitle) {
    detailsList.push({ label: 'Match', value: summary.matchTitle, icon: Info });
  }

  if (scrapedDetails['Series'] || legacyDetails['Series']) {
    detailsList.push({ label: 'Series', value: scrapedDetails['Series'] || legacyDetails['Series'], icon: Flag });
  }

  if (scrapedDetails['Toss'] || legacyDetails['Toss']) {
    detailsList.push({ label: 'Toss', value: scrapedDetails['Toss'] || legacyDetails['Toss'], icon: Trophy });
  }

  if (summary.playerOfTheMatch || scrapedDetails['Player Of The Match']) {
    detailsList.push({ label: 'Player of the Match', value: summary.playerOfTheMatch || scrapedDetails['Player Of The Match'], icon: Star });
  }

  if (scrapedDetails['Ground'] || summary.venue) {
    detailsList.push({ label: 'Ground & Venue', value: scrapedDetails['Ground'] || summary.venue, icon: MapPin });
  }

  if (summary.result) {
    detailsList.push({ label: 'Match Result', value: summary.result, icon: ShieldCheck });
  }

  if (scrapedDetails['Umpires']) {
    detailsList.push({ label: 'On-Field Umpires', value: scrapedDetails['Umpires'], icon: Users });
  }

  if (scrapedDetails['TV Umpire']) {
    detailsList.push({ label: 'TV Umpire', value: scrapedDetails['TV Umpire'], icon: Users });
  }

  if (scrapedDetails['Match Referee']) {
    detailsList.push({ label: 'Match Referee', value: scrapedDetails['Match Referee'], icon: Users });
  }

  if (scrapedDetails['Season']) {
    detailsList.push({ label: 'Season', value: scrapedDetails['Season'], icon: Calendar });
  }

  if (scrapedDetails['Match days']) {
    detailsList.push({ label: 'Match Days', value: scrapedDetails['Match days'], icon: Calendar });
  }

  if (scrapedDetails['Hours of play (local time)']) {
    detailsList.push({ label: 'Hours of Play', value: scrapedDetails['Hours of play (local time)'], icon: Clock });
  }

  // Fallback to other legacy details
  Object.entries(legacyDetails).forEach(([k, v]) => {
    if (v && typeof v === 'string' && !detailsList.some(d => d.label === k)) {
      detailsList.push({ label: k, value: v, icon: Info });
    }
  });

  if (detailsList.length === 0) {
    return (
      <div className="p-8 text-center text-slate-400 bg-white/[0.035] border border-white/[0.08] rounded-2xl">
        No match info details available for this match.
      </div>
    );
  }

  return (
    <div className="bg-white/[0.035] backdrop-blur-xl border border-white/[0.08] rounded-2xl overflow-hidden shadow-lg">
      <div className="p-4 sm:p-5 border-b border-white/[0.06] bg-white/[0.02] flex items-center gap-2.5">
        <Info className="w-4 h-4 text-red-500" />
        <h3 className="text-sm font-bold text-white uppercase tracking-wider">
          Match Information
        </h3>
      </div>

      <div className="divide-y divide-white/[0.05]">
        {detailsList.map((item, idx) => {
          const Icon = item.icon || Info;
          return (
            <div
              key={idx}
              className="p-4 sm:p-4.5 flex flex-col sm:flex-row sm:items-center justify-between gap-1.5 hover:bg-white/[0.03] transition-colors"
            >
              <div className="flex items-center gap-2.5 text-slate-400">
                <Icon className="w-4 h-4 text-slate-500 flex-shrink-0" />
                <span className="text-xs font-semibold">{item.label}</span>
              </div>
              <div className="text-xs sm:text-sm font-bold text-white sm:text-right max-w-xl">
                {item.value}
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default DetailsTab;
