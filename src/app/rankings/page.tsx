'use client';

import React, { useState, useEffect } from 'react';
import Spinner from '@/components/common/Spinner';
import { cricketApi } from '@/services/api';

type Ranking = {
  name: string;
  country: string;
  rank: number;
  photo: string;
};

type Rankings = {
  test: Ranking[];
  odi: Ranking[];
  t20: Ranking[];
};

const RankingsDashboard: React.FC = () => {
  const [activeMainTab, setActiveMainTab] = useState<number>(0);
  const [activeSubTab, setActiveSubTab] = useState<number>(0);
  const [battingRankings, setBattingRankings] = useState<Rankings>({ test: [], odi: [], t20: [] });
  const [bowlingRankings, setBowlingRankings] = useState<Rankings>({ test: [], odi: [], t20: [] });
  const [allRounderRankings, setAllRounderRankings] = useState<Rankings>({ test: [], odi: [], t20: [] });
  const [teamRankings, setTeamRankings] = useState<Rankings>({ test: [], odi: [], t20: [] });
  const [loading, setLoading] = useState<boolean>(false);

  const mainTabs = [
    { id: 0, label: 'Batting Rankings' },
    { id: 1, label: 'Bowling Rankings' },
    { id: 2, label: 'All-Rounder Rankings' },
    { id: 3, label: 'Team Rankings' },
  ];

  const subTabs = [
    { id: 0, label: 'Test' },
    { id: 1, label: 'ODI' },
    { id: 2, label: 'T20' },
  ];

  useEffect(() => {
    const fetchRankings = async () => {
      setLoading(true);
      try {
        const battingResponse = await cricketApi.getBattingRankings();
        const bowlingResponse = await cricketApi.getBowlingRankings();
        const allRounderResponse = await cricketApi.getAllRounderRankings();
        const teamResponse = await cricketApi.getTeamRankings();

        setBattingRankings({
          test: battingResponse.test,
          odi: battingResponse.odi,
          t20: battingResponse.t20,
        });
        setBowlingRankings({
          test: bowlingResponse.test,
          odi: bowlingResponse.odi,
          t20: bowlingResponse.t20,
        });
        setAllRounderRankings({
          test: allRounderResponse.test,
          odi: allRounderResponse.odi,
          t20: allRounderResponse.t20,
        });
        setTeamRankings({
          test: teamResponse.test,
          odi: teamResponse.odi,
          t20: teamResponse.t20,
        });
      } catch (error) {
        console.error('Error fetching rankings:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchRankings();
  }, []);

  const getRankingsToDisplay = (): Rankings => {
    switch (activeMainTab) {
      case 0:
        return battingRankings;
      case 1:
        return bowlingRankings;
      case 2:
        return allRounderRankings;
      case 3:
        return teamRankings;
      default:
        return { test: [], odi: [], t20: [] };
    }
  };

  const rankingsToDisplay = getRankingsToDisplay();

  const getSubTabRankings = (): Ranking[] => {
    switch (activeSubTab) {
      case 0:
        return rankingsToDisplay?.test;
      case 1:
        return rankingsToDisplay?.odi;
      case 2:
        return rankingsToDisplay?.t20;
      default:
        return [];
    }
  };

  const subTabRankings = getSubTabRankings();

  return (
    <div className="min-h-screen bg-white p-5">
        <div className="max-w-7xl mx-auto">
          <h1 className='text-2xl py-5 font-bold'>ICC Rankings</h1>
        </div>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Main Tab Navigation */}
        <div className="flex justify-between space-x-2 rounded-xl bg-gray-200 border backdrop-blur-lg mb-8">
          {mainTabs.map((tab) => (
            <button
              key={tab.id}
              onClick={() => setActiveMainTab(tab.id)}
              className={`flex-1 px-6 py-3 text-sm font-medium rounded-lg transition-all duration-200
                ${activeMainTab === tab.id 
                  ? 'bg-white text-black shadow-lg' 
                  : 'text-gray-800 hover:bg-gray-700/50 hover:text-white'
                }`}
            >
              {tab.label}
            </button>
          ))}
        </div>

        {/* Sub Tab Navigation */}
        <div className="flex justify-between space-x-2 rounded-xl bg-gray-200 border backdrop-blur-lg mb-8">
          {subTabs.map((tab) => (
            <button
              key={tab.id}
              onClick={() => setActiveSubTab(tab.id)}
              className={`flex-1 px-6 py-3 text-sm font-medium rounded-lg transition-all duration-200
                ${activeSubTab === tab.id 
                  ? 'bg-white text-black shadow-lg' 
                  : 'text-gray-800 hover:bg-gray-700/50 hover:text-white'
                }`}
            >
              {tab.label}
            </button>
          ))}
        </div>

        {/* Tab Content */}
        <div className="bg-gray-800/30 backdrop-blur-sm rounded-xl p-6 shadow-xl">
          {loading ? (
            <div className="min-h-[400px] flex items-center justify-center">
              <Spinner />
            </div>
          ) : subTabRankings.length > 0 ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              {subTabRankings.map((ranking, index) => (
                <div key={index} className="bg-white p-4 rounded-lg shadow-md">
                  <img
                    src={ranking.photo}
                    alt={ranking.name}
                    className="w-16 h-16 rounded-full mb-2"
                  />
                  <h3 className="font-bold">{ranking.name}</h3>
                  <p>Country: {ranking.country}</p>
                  <p>Rank: {ranking.rank}</p>
                </div>
              ))}
            </div>
          ) : (
            <div className="min-h-[400px] flex items-center justify-center text-gray-400">
              No rankings available
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default RankingsDashboard;