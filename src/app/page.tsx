import React from 'react'
import Hero from '@/components/home/hero'
import MatchCarousel from '@/components/home/matchCarousel'
import News from '@/components/home/News'
import Navbar from '@/components/common/Navbar'

const Home = () => {
  return (
    <div className="min-h-screen bg-gradient-to-b from-zinc-950 to-zinc-800">
      <div>
        <Hero image="/images/homebanner.jpeg" title1='ULTIMATE' title2='DESTINATON' subtitle='For True Cricket Fan' />
      </div>
      <div className="p-10">
        <div className="max-w-7xl mx-auto">
          <h1 className='text-2xl py-5 bold text-white'>Live Matches</h1>
          <MatchCarousel />
        </div>
      </div>
      <div className='p-10'>
        <div className='max-w-7xl mx-auto'>
          <h1 className='text-2xl py-5 bold text-white'>Latest News</h1>
          <News/>
        </div>
      </div>
    </div>
  )
}

export default Home
