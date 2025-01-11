'use client';
import React, { useEffect, useState } from 'react';
import { cricketApi } from '@/services/api';
import Hero from '@/components/home/hero';
interface Tournament {
  tour: string;
  duration: string;
}

interface ScheduleData {
  [month: string]: Tournament[];
}

const Page = () => {
  const [scheduleData, setScheduleData] = useState<ScheduleData | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchSchedule = async () => {
      console.log('fetching schedule');
      try {
        const response = await cricketApi.getSchedule();
        setScheduleData(response);
      } catch (err) {
        setError(err instanceof Error ? err.message : 'Something went wrong');
      } finally {
        setLoading(false);
      }
    };

    fetchSchedule();
  }, []);

  if (loading) return <div className="flex justify-center items-center min-h-screen bg-black text-white">Loading...</div>;
  if (error) return <div className="flex justify-center items-center min-h-screen bg-black text-white">Error: {error}</div>;
  if (!scheduleData) return null;

  return (
    <div>
            <Hero 
        image="/images/schduleHeader.jpg" 
        title1='Schedule' 
        title2='INFO' 
        subtitle='Check out the schedule of cricket season'
      />
      

    <div className="container mx-auto bg-black text-zinc-950 min-h-screen mx-auto p-10">
      <h1 className="text-2xl font-bold mb-6">Cricket Schedule</h1>
      {Object.entries(scheduleData).map(([month, tournaments]) => (
        <div key={month} className="pb-8">
          <h2 className="text-xl font-semibold mb-4 text-gray-300">{month}</h2>
          <div>
            {tournaments.map((tournament, index) => (
              <div key={index} className="bg-white rounded-lg p-4 m-2">
                <h3 className="font-medium">{tournament.tour}</h3>
                <p className="text-sm  mt-1">{tournament.duration}</p>
              </div>
            ))}
          </div>
        </div>
      ))}
    </div>
    </div>
  );
};

export default Page;