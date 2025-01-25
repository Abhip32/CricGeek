'use client'
import { useEffect, useState } from 'react';
import { cricketApi } from '@/services/api';
import { useParams } from 'next/navigation';
import { TabNavigation } from '@/components/scorecard/TabNavigation';
import { ScorecardTab } from '@/components/scorecard/ScorecardTab';
import { DetailsTab } from '@/components/scorecard/DetailsTab';
import { SquadsTab } from '@/components/scorecard/SquadsTab';
import MiniScoreCard from '@/components/scorecard/MiniScoreCard';
import { CommentaryTab } from '@/components/scorecard/CommentaryTab';
import Hero from '@/components/home/hero';

const Page = () => {
  const params = useParams();
  const [scoreData, setScoreData] = useState(null);
  const [squadsData, setSquadsData] = useState(null);
  const [commentaryData, setCommentaryData] = useState(null);
  const [miniScoreData, setMiniScoreData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [activeTab, setActiveTab] = useState('scorecard');

  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true)
        const decodedUrl = decodeURIComponent(params.url as string)
        
        // Fetch all data in parallel
        const [scoreResponse, miniScoreResponse, squadsResponse, commentaryResponse] = await Promise.all([
          cricketApi.getScoreCard(decodedUrl),
          cricketApi.getMiniScoreCard(decodedUrl),
          cricketApi.getSquads(decodedUrl),
          cricketApi.getCommentary(decodedUrl)
        ])

        setScoreData(scoreResponse)
        setSquadsData(squadsResponse)
        setCommentaryData(commentaryResponse)
        setMiniScoreData(miniScoreResponse)
      } catch (error) {
        console.error('Error fetching data:', error)
      } finally {
        setLoading(false)
      }
    }

    if (params.url) {
      fetchData()
    }
  }, [params.url])

  const renderActiveTab = () => {
    switch (activeTab) {
      case 'scorecard':
        return <ScorecardTab scoreData={scoreData} miniScoreData={miniScoreData} loading={loading} />;
      case 'details':
        return <DetailsTab scoreData={scoreData} loading={loading} />;
      case 'squads':
        return <SquadsTab squadsData={squadsData} loading={loading} />;
      case 'commentary':
        return <CommentaryTab commentaryData={commentaryData} loading={loading} />;
      default:
        return null;
    }
  };

  return (
    <div>
      <MiniScoreCard data={miniScoreData}/>
      <div className="container mx-auto bg-white min-h-screen">

        <TabNavigation activeTab={activeTab} setActiveTab={setActiveTab} />
        <div>
          {renderActiveTab()}
        </div>
    </div>
    </div>
  );
};

export default Page;
