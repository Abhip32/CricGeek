'use client';

import React, { useRef, useEffect } from 'react';
import { Award, FileText, Users, MessageSquare, Trophy, BarChart2, Clock } from 'lucide-react';

interface TabNavigationProps {
  activeTab: string;
  setActiveTab: (tab: string) => void;
  hasSquads?: boolean;
  hasCommentary?: boolean;
  hasCharts?: boolean;
  hasNews?: boolean;
}

export const TabNavigation: React.FC<TabNavigationProps> = ({
  activeTab,
  setActiveTab,
  hasSquads = true,
  hasCommentary = true,
  hasCharts = true,
}) => {
  const tabs = [
    { id: 'scorecard', label: 'Scorecard', icon: Award, show: true },
    { id: 'commentary', label: 'Commentary', icon: MessageSquare, show: hasCommentary },
    { id: 'timeline', label: 'Timeline', icon: Clock, show: true },
    { id: 'charts', label: 'Overs & Charts', icon: BarChart2, show: hasCharts },
    { id: 'details', label: 'Match Info', icon: FileText, show: true },
    { id: 'squads', label: 'Squads', icon: Users, show: hasSquads },
    { id: 'mvp', label: 'MVP & Impact', icon: Trophy, show: true },
  ].filter((t) => t.show);

  const containerRef = useRef<HTMLDivElement | null>(null);
  const activeTabRef = useRef<HTMLButtonElement | null>(null);

  useEffect(() => {
    if (activeTabRef.current && containerRef.current) {
      activeTabRef.current.scrollIntoView({
        behavior: 'smooth',
        block: 'nearest',
        inline: 'center',
      });
    }
  }, [activeTab]);

  return (
    <div
      ref={containerRef}
      className="w-full max-w-full overflow-x-auto pb-1.5 pt-0.5 scrollbar-none touch-pan-x overscroll-x-contain [-webkit-overflow-scrolling:touch]"
    >
      <div className="inline-flex items-center gap-2 min-w-max px-0.5 py-0.5">
        {tabs.map((tab) => {
          const isActive = activeTab === tab.id;
          const Icon = tab.icon;

          return (
            <button
              key={tab.id}
              ref={isActive ? activeTabRef : null}
              onClick={() => setActiveTab(tab.id)}
              className={`flex-shrink-0 flex items-center gap-2 px-3.5 sm:px-4 py-2 rounded-lg font-heading font-black text-xs uppercase tracking-wider transition-all whitespace-nowrap cursor-pointer select-none ${
                isActive
                  ? 'bg-red-600 text-white shadow-xs'
                  : 'bg-white border border-slate-200 text-slate-700 hover:bg-slate-100 hover:text-red-600 active:bg-slate-200'
              }`}
            >
              <Icon className="w-4 h-4 flex-shrink-0" />
              <span>{tab.label}</span>
            </button>
          );
        })}
      </div>
    </div>
  );
};

export default TabNavigation;
