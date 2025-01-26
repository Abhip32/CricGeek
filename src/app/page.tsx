import React from 'react'
import Hero from '@/components/home/hero'
import MatchCarousel from '@/components/home/matchCarousel'
import News from '@/components/home/News'
import Navbar from '@/components/common/Navbar'

const Home = () => {
  return (
    <div className="min-h-screen">
      <Hero image='/images/homebanner.jpeg' heading='Ultimate Destination For a True Cricket Fan' subtitle=''/>
      <div className="p-5">
        <div className="max-w-7xl mx-auto">
          <h1 className='text-2xl py-5 font-bold'>Live Matches</h1>
          <MatchCarousel />
        </div>
      </div>
      <div className='p-10'>
        <div className='max-w-7xl mx-auto'>
          <h1 className='text-2xl py-5 font-bold'>Latest News</h1>
          <News/>
        </div>
      </div>
    </div>
  )
}

export default Home
