'use client';

import React, { useState, useMemo } from 'react';
import { useMatchTimeline } from '@/hooks/useCricketQueries';
import {
  Clock,
  Award,
  Users,
  Coffee,
  ShieldAlert,
  Flame,
  CheckCircle2,
  Calendar,
  AlertCircle
} from 'lucide-react';
import { MatchTimelineEvent } from '@/types/match';

interface TimelineTabProps {
  matchUrl?: string;
  isLive?: boolean;
}

export const TimelineTab: React.FC<TimelineTabProps> = ({ matchUrl, isLive = false }) => {
  const { data: timelineData, isLoading, isError } = useMatchTimeline(matchUrl, undefined, undefined, isLive);
  const [selectedFilter, setSelectedFilter] = useState<'all' | 'milestones' | 'partnerships' | 'sessions' | 'drs'>('all');

  const allEvents = timelineData?.events || [];
  const milestones = timelineData?.milestones || [];
  const partnerships = timelineData?.partnerships || [];
  const sessions = timelineData?.sessions || [];
  const drsReviews = timelineData?.drsReviews || [];

  const filteredEvents = useMemo(() => {
    switch (selectedFilter) {
      case 'milestones':
        return milestones;
      case 'partnerships':
        return partnerships;
      case 'sessions':
        return sessions;
      case 'drs':
        return drsReviews;
      case 'all':
      default:
        return allEvents;
    }
  }, [selectedFilter, allEvents, milestones, partnerships, sessions, drsReviews]);

  const getEventBadge = (type: MatchTimelineEvent['type']) => {
    switch (type) {
      case 'milestone':
        return {
          bg: 'bg-amber-50 text-amber-700 border-amber-200',
          iconBg: 'bg-amber-500 text-white',
          Icon: Flame,
          label: 'Milestone'
        };
      case 'partnership':
        return {
          bg: 'bg-blue-50 text-blue-700 border-blue-200',
          iconBg: 'bg-blue-600 text-white',
          Icon: Users,
          label: 'Partnership'
        };
      case 'session':
        return {
          bg: 'bg-emerald-50 text-emerald-700 border-emerald-200',
          iconBg: 'bg-emerald-600 text-white',
          Icon: Coffee,
          label: 'Session Break'
        };
      case 'drs':
        return {
          bg: 'bg-purple-50 text-purple-700 border-purple-200',
          iconBg: 'bg-purple-600 text-white',
          Icon: ShieldAlert,
          label: 'DRS Review'
        };
      default:
        return {
          bg: 'bg-slate-50 text-slate-700 border-slate-200',
          iconBg: 'bg-slate-600 text-white',
          Icon: Award,
          label: 'Match Note'
        };
    }
  };

  if (isLoading) {
    return (
      <div className="bg-white border border-slate-200 rounded-2xl p-6 space-y-4 shadow-xs">
        <div className="h-6 w-48 shimmer-block rounded-md" />
        <div className="space-y-3">
          <div className="h-16 shimmer-block-subtle rounded-xl" />
          <div className="h-16 shimmer-block-subtle rounded-xl" />
          <div className="h-16 shimmer-block-subtle rounded-xl" />
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-4">
      {/* Header and Filter Pills */}
      <div className="bg-white border border-slate-200 rounded-2xl p-4 sm:p-5 shadow-xs">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 mb-4">
          <div className="flex items-center gap-2.5">
            <span className="w-1.5 h-5 bg-red-600 rounded-full flex-shrink-0" />
            <div>
              <h2 className="text-sm sm:text-base font-black uppercase tracking-wider text-slate-900 flex items-center gap-2">
                <Clock className="w-4 h-4 text-red-600" />
                <span>Match Timeline & Milestones</span>
              </h2>
              <p className="text-xs text-slate-500 font-medium">
                Individual 50s, 100s, partnership stands, session breaks, and tactical decisions
              </p>
            </div>
          </div>
          <span className="text-xs font-bold text-slate-500 bg-slate-100 px-2.5 py-1 rounded-full self-start sm:self-auto">
            {allEvents.length} Key Moments
          </span>
        </div>

        {/* Filters */}
        <div className="flex items-center gap-2 overflow-x-auto no-scrollbar pb-1">
          <button
            onClick={() => setSelectedFilter('all')}
            className={`px-3 py-1.5 rounded-full text-xs font-bold transition-all whitespace-nowrap cursor-pointer ${
              selectedFilter === 'all'
                ? 'bg-red-600 text-white shadow-xs'
                : 'bg-slate-100 text-slate-600 hover:text-red-600 hover:bg-slate-200'
            }`}
          >
            All Moments ({allEvents.length})
          </button>
          <button
            onClick={() => setSelectedFilter('milestones')}
            className={`px-3 py-1.5 rounded-full text-xs font-bold transition-all whitespace-nowrap cursor-pointer ${
              selectedFilter === 'milestones'
                ? 'bg-red-600 text-white shadow-xs'
                : 'bg-slate-100 text-slate-600 hover:text-red-600 hover:bg-slate-200'
            }`}
          >
            Milestones ({milestones.length})
          </button>
          <button
            onClick={() => setSelectedFilter('partnerships')}
            className={`px-3 py-1.5 rounded-full text-xs font-bold transition-all whitespace-nowrap cursor-pointer ${
              selectedFilter === 'partnerships'
                ? 'bg-red-600 text-white shadow-xs'
                : 'bg-slate-100 text-slate-600 hover:text-red-600 hover:bg-slate-200'
            }`}
          >
            Partnerships ({partnerships.length})
          </button>
          <button
            onClick={() => setSelectedFilter('sessions')}
            className={`px-3 py-1.5 rounded-full text-xs font-bold transition-all whitespace-nowrap cursor-pointer ${
              selectedFilter === 'sessions'
                ? 'bg-red-600 text-white shadow-xs'
                : 'bg-slate-100 text-slate-600 hover:text-red-600 hover:bg-slate-200'
            }`}
          >
            Sessions ({sessions.length})
          </button>
          {drsReviews.length > 0 && (
            <button
              onClick={() => setSelectedFilter('drs')}
              className={`px-3 py-1.5 rounded-full text-xs font-bold transition-all whitespace-nowrap cursor-pointer ${
                selectedFilter === 'drs'
                  ? 'bg-red-600 text-white shadow-xs'
                  : 'bg-slate-100 text-slate-600 hover:text-red-600 hover:bg-slate-200'
              }`}
            >
              DRS ({drsReviews.length})
            </button>
          )}
        </div>
      </div>

      {/* Events Feed */}
      {filteredEvents.length === 0 ? (
        <div className="bg-white border border-slate-200 rounded-2xl p-10 text-center space-y-2 shadow-xs">
          <Clock className="w-8 h-8 text-slate-300 mx-auto" />
          <h3 className="text-sm font-bold text-slate-800">No Timeline Events Recorded</h3>
          <p className="text-xs text-slate-500 max-w-sm mx-auto">
            Tactical notes, individual 50s/100s, and session breaks will appear here as the match progresses.
          </p>
        </div>
      ) : (
        <div className="space-y-3">
          {filteredEvents.map((ev, idx) => {
            const badge = getEventBadge(ev.type);
            const Icon = badge.Icon;

            return (
              <div
                key={idx}
                className="bg-white border border-slate-200 rounded-xl p-4 sm:p-4.5 hover:border-slate-300 transition-all shadow-2xs flex items-start gap-3.5"
              >
                {/* Event Type Icon */}
                <div className={`w-9 h-9 rounded-xl flex items-center justify-center flex-shrink-0 ${badge.iconBg} shadow-2xs`}>
                  <Icon className="w-4.5 h-4.5" />
                </div>

                {/* Event Details */}
                <div className="flex-1 min-w-0">
                  <div className="flex items-center gap-2 flex-wrap mb-1">
                    <span className={`text-[10px] font-black uppercase tracking-wider px-2 py-0.5 rounded-md border ${badge.bg}`}>
                      {badge.label}
                    </span>
                    {ev.period && (
                      <span className="text-[10px] font-bold text-slate-500 bg-slate-100 px-2 py-0.5 rounded-md">
                        Innings {ev.period}
                      </span>
                    )}
                    {ev.over != null && (
                      <span className="text-[10px] font-mono font-bold text-slate-600 bg-slate-100 px-2 py-0.5 rounded-md">
                        Over {ev.over}{ev.ball != null ? `.${ev.ball}` : ''}
                      </span>
                    )}
                  </div>

                  <p className="text-xs sm:text-sm font-bold text-slate-900 leading-relaxed">
                    {ev.text}
                  </p>
                </div>
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
};

export default TimelineTab;
