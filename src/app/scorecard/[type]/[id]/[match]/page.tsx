'use client';

import { useEffect, useState } from 'react';
import { cricketApi } from '@/services/api';
import { useParams } from 'next/navigation';
import { TabNavigation } from '@/components/scorecard/TabNavigation';
import { ScorecardTab } from '@/components/scorecard/ScorecardTab';
import { DetailsTab } from '@/components/scorecard/DetailsTab';
import { SquadsTab } from '@/components/scorecard/SquadsTab';
import MiniScoreCard from '@/components/scorecard/MiniScoreCard';
import { CommentaryTab } from '@/components/scorecard/CommentaryTab';
import Spinner from '@/components/common/Spinner';

const Page = () => {
  const params = useParams(); // params is now a promise-like object
  const [resolvedParams, setResolvedParams] = useState<any>(null);

  const [scoreData, setScoreData] = useState(null);
  const [squadsData, setSquadsData] = useState(null);
  const [commentaryData, setCommentaryData] = useState(null);
  const [miniScoreData, setMiniScoreData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [activeTab, setActiveTab] = useState('scorecard');

  // Resolve params and fetch data
  useEffect(() => {
    const resolveParamsAndFetchData = async () => {
      try {
        // Resolve params if it is a promise-like object
        const resolved = await params;
        setResolvedParams(resolved);

        const { type, id, match } = resolved || {};
        if (!type || !id || !match) {
          console.error('Invalid URL parameters');
          return;
        }

        const decodedUrl = `/${type}/${id}/${match}`;

        // Fetch all data in parallel
        const [scoreResponse, miniScoreResponse, squadsResponse, commentaryResponse] = await Promise.all([
          cricketApi.getScoreCard(decodedUrl),
          cricketApi.getMiniScoreCard(decodedUrl),
          cricketApi.getSquads(decodedUrl),
          cricketApi.getCommentary(decodedUrl),
        ]);

        setScoreData(scoreResponse);
        setSquadsData(squadsResponse);
        setCommentaryData(commentaryResponse);
        setMiniScoreData(miniScoreResponse);
      } catch (error) {
        console.error('Error resolving params or fetching data:', error);
      } finally {
        setLoading(false);
      }
    };

    resolveParamsAndFetchData();
  }, [params]);

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
    <div className="min-h-screen mx-auto">
      {loading ? (
        <div className="flex items-center justify-center w-full h-screen bg-white text-black shadow-lg">
          <Spinner />
        </div>
      ) : (
        <>
          <MiniScoreCard data={miniScoreData} scoreData={scoreData}/>
          <br/>
          <div className="container mx-auto bg-white min-h-screen">
            <TabNavigation activeTab={activeTab} setActiveTab={setActiveTab} />
            <div>{renderActiveTab()}</div>
          </div>
        </>
      )}
    </div>
  );
  
};

export default Page;
