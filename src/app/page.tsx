import React from 'react'
import Hero from '@/components/home/hero'
import MatchCarousel from '@/components/home/matchCarousel'
import News from '@/components/home/News'

const Home = () => {
  return (
    <div className="flex flex-col">
      <div>
        <Hero image="/images/homebanner.jpeg" title1='ULTIMATE' title2='DESTINATON' subtitle='For True Cricket Fan'/>
      </div>
      <div className="mt-[-100px] px-10 mb-10 relative z-10">
        <MatchCarousel />
      </div>
      <div className="px-10">
        <News />
      </div>
    </div>
  )
}

export default Home