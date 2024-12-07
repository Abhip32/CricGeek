'use client'
import Hero from '@/components/home/hero'
import MatchCard from '@/components/matches/MatchCard'
import React, { useState, useEffect } from 'react'
import { cricketApi } from '@/services/api';

const Matches = () => {
  const [activeTab, setActiveTab] = useState(0)
  const [matches, setMatches] = useState([])
  const [loading, setLoading] = useState(false)

  const tabs = [
    { id: 0, label: 'Live Matches', endpoint: 'getLiveMatches' },
    { id: 1, label: 'Recent Matches', endpoint: 'getRecentMatches' },
    { id: 2, label: 'Upcoming Matches', endpoint: 'getUpcomingMatches' }
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
    <div className="min-h-screen bg-gradient-to-b from-gray-900 to-gray-800">
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
                  ? 'bg-red-600 text-white shadow-lg' 
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
              <div className="text-red-400">Loading matches...</div>
            </div>
          ) : matches.length > 0 ? (
            <div className="grid">
              {matches.map((match, index) => (
                <MatchCard key={index} type={tabs[activeTab].endpoint} {...match} />
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