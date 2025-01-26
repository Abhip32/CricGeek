'use client';
import React, { useEffect, useState } from 'react';
import { cricketApi } from '@/services/api';
import Hero from '@/components/home/hero';
import Spinner from '@/components/common/Spinner';
interface Tournament {
  tour: string;
  duration: string;
}

interface ScheduleData {
  [month: string]: Tournament[];
}

const Page = () => {
  const [scheduleData, setScheduleData] = useState<ScheduleData>({});
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

  if (loading) return <div className="flex justify-center items-center min-h-screen text-white"><Spinner/></div>;

  return (
    <div className='min-h-screen'>      
      <Hero image='/images/schduleHeader.jpg' heading='Checkout Schedule For Upcoming Matches' subtitle=''/>
    <div className="container max-w-7xl mx-auto py-8 ">
      <h1 className="text-2xl font-bold mb-6">Cricket Schedule</h1>
      {Object.entries(scheduleData).map(([month, tournaments]) => (
        <div key={month} className="pb-8">
          <h2 className="text-xl font-semibold mb-4">{month}</h2>
          <div>
            {tournaments.map((tournament, index) => (
              <div key={index} className="bg-white rounded-lg p-4 m-2 shadow-lg border">
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