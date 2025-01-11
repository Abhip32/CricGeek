'use client'
import Hero from '@/components/home/hero'
import MatchCard from '@/components/matches/MatchCard'
import React, { useState, useEffect } from 'react'
import { cricketApi } from '@/services/api';

type ApiEndpoint = 'getLiveMatches' | 'getRecentMatches' | 'getUpcomingMatches';

interface Match {
  id: string;
  title: string;
  series: string;
  matchInfo: string;
  teamA: string;
  teamB: string;
  date: string;
  venue: string;
  result: string;
  status: string;
  type: string;
  scoreA: string;
  scoreB: string;
  flagA: string;
  flagB: string;
  links: any;
}

const Matches = () => {
  const [activeTab, setActiveTab] = useState(0)
  const [matches, setMatches] = useState<Match[]>([])
  const [loading, setLoading] = useState(false)

  const tabs = [
    { id: 0, label: 'Live Matches', endpoint: 'getLiveMatches' as ApiEndpoint },
    { id: 1, label: 'Recent Matches', endpoint: 'getRecentMatches' as ApiEndpoint },
    { id: 2, label: 'Upcoming Matches', endpoint: 'getUpcomingMatches' as ApiEndpoint }
  ]

  useEffect(() => {
    const fetchMatches = async () => {
      setLoading(true)
      try {
        const response = await cricketApi[tabs[activeTab].endpoint]()
        console.log(response)
        setMatches(response)
      } catch (error) {
        console.error('Error fetching matches:', error)
      } finally {
        setLoading(false)
      }
    }

    fetchMatches()
  }, [activeTab])

  return (
    <div className="min-h-screen bg-gradient-to-b from-zinc-950 to-zinc-800">
      <Hero 
        image="/images/matchInfoHeader.jpg" 
        title1='MATCHES' 
        title2='INFO' 
        subtitle='Capture Live Cricket Action Across The Globe'
      />
      
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Tab Navigation */}
        <div className="flex justify-between space-x-2 rounded-xl bg-gray-800/50 p-1 backdrop-blur-lg mb-8">
          {tabs.map((tab) => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              className={`flex-1 px-6 py-3 text-sm font-medium rounded-lg transition-all duration-200
                ${activeTab === tab.id 
                  ? 'bg-white text-black shadow-lg' 
                  : 'text-gray-300 hover:bg-gray-700/50 hover:text-white'
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
              <div className="text-white">Loading matches...</div>
            </div>
          ) : matches.length > 0 ? (
            <div className="grid">
              {matches.map((match, index) => (
                <MatchCard 
                  key={index} 
                  {...match} 
                  type={tabs[activeTab].endpoint} 
                />
              ))}
            </div>
          ) : (
            <div className="min-h-[400px] flex items-center justify-center text-gray-400">
              No matches available
            </div>
          )}
        </div>
      </div>
    </div>
  )
}

export default Matches