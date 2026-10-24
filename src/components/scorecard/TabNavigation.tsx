'use client';

import React from 'react';
import { Award, FileText, Users, MessageSquare } from 'lucide-react';

interface TabNavigationProps {
  activeTab: string;
  setActiveTab: (tab: string) => void;
  hasSquads?: boolean;
  hasCommentary?: boolean;
}

export const TabNavigation: React.FC<TabNavigationProps> = ({
  activeTab,
  setActiveTab,
  hasSquads = false,
  hasCommentary = false
}) => {
  const tabs = [
    { id: 'scorecard', label: 'Scorecard', icon: Award, show: true },
    { id: 'details', label: 'Match Info', icon: FileText, show: true },
    { id: 'squads', label: 'Squads', icon: Users, show: hasSquads },
    { id: 'commentary', label: 'Commentary', icon: MessageSquare, show: hasCommentary }
  ].filter(t => t.show);

  return (
    <div className="w-full overflow-x-auto pb-1 scrollbar-none">
      <div className="flex items-center gap-2">
        {tabs.map((tab) => {
          const isActive = activeTab === tab.id;
          const Icon = tab.icon;

          return (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              className={`flex items-center gap-2 px-4 py-2 rounded-lg text-xs sm:text-sm font-bold transition-all whitespace-nowrap ${
                isActive
                  ? 'bg-red-600 text-white shadow-xs'
                  : 'bg-white border border-slate-200 text-slate-700 hover:bg-slate-100 hover:text-slate-900'
              }`}
            >
              <Icon className="w-4 h-4" />
              <span>{tab.label}</span>
            </button>
          );
        })}
      </div>
    </div>
  );
};

export default TabNavigation;
