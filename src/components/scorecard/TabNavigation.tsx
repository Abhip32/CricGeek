'use client';

import React from 'react';
import { motion } from 'framer-motion';
import { Award, FileText, Users, MessageSquare } from 'lucide-react';

interface TabNavigationProps {
  activeTab: string;
  setActiveTab: (tab: string) => void;
}

export const TabNavigation: React.FC<TabNavigationProps> = ({ activeTab, setActiveTab }) => {
  const tabs = [
    { id: 'scorecard', label: 'Scorecard', icon: Award },
    { id: 'details', label: 'Match Info', icon: FileText },
    { id: 'squads', label: 'Squads', icon: Users },
    { id: 'commentary', label: 'Commentary', icon: MessageSquare }
  ];

  return (
    <div className="w-full overflow-x-auto pb-2 scrollbar-none">
      <div className="flex items-center gap-2 p-1.5 rounded-2xl glass-panel border border-white/10 w-fit min-w-full sm:min-w-0">
        {tabs.map((tab) => {
          const isActive = activeTab === tab.id;
          const Icon = tab.icon;

          return (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              className={`relative flex items-center justify-center gap-2 px-5 py-2.5 rounded-xl text-sm font-semibold transition-all duration-300 flex-1 sm:flex-initial whitespace-nowrap ${
                isActive ? 'text-white' : 'text-slate-400 hover:text-slate-200 hover:bg-white/5'
              }`}
            >
              {isActive && (
                <motion.div
                  layoutId="activeScorecardTab"
                  className="absolute inset-0 rounded-xl bg-gradient-to-r from-emerald-500 to-cyan-500 shadow-lg shadow-emerald-950/60"
                  transition={{ type: 'spring', stiffness: 350, damping: 30 }}
                />
              )}
              <span className="relative z-10 flex items-center gap-2">
                <Icon className={`w-4 h-4 ${isActive ? 'text-white' : 'text-slate-400'}`} />
                <span>{tab.label}</span>
              </span>
            </button>
          );
        })}
      </div>
    </div>
  );
};

export default TabNavigation;
