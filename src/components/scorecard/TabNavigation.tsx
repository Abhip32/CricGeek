'use client';

import React from 'react';
import { Award, FileText, Users, MessageSquare, Trophy, BarChart2, Newspaper } from 'lucide-react';

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
    { id: 'charts', label: 'Overs & Charts', icon: BarChart2, show: hasCharts },
    { id: 'details', label: 'Match Info', icon: FileText, show: true },
    { id: 'squads', label: 'Squads', icon: Users, show: hasSquads },
    { id: 'mvp', label: 'MVP & Impact', icon: Trophy, show: true },
  ].filter((t) => t.show);

  return (
    <div className="w-full overflow-x-auto pb-1 no-scrollbar">
      <div className="flex items-center gap-2">
        {tabs.map((tab) => {
          const isActive = activeTab === tab.id;
          const Icon = tab.icon;

          return (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              className={`flex items-center gap-2 px-3.5 sm:px-4 py-2 rounded-lg text-xs sm:text-sm font-bold transition-all whitespace-nowrap flex-shrink-0 ${
                isActive
                  ? 'bg-red-600 text-white shadow-xs'
                  : 'bg-white border border-slate-200 text-slate-700 hover:bg-slate-100 hover:text-red-600'
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
