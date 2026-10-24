import Hero from '@/components/home/hero';
import MatchCarousel from '@/components/home/matchCarousel';
import News from '@/components/home/News';

export default function Home() {
  return (
    <div className="flex flex-col min-h-screen bg-slate-50">
      <Hero isHome image="/images/homebanner.jpeg" />
      <MatchCarousel />
      <News />
    </div>
  );
}
