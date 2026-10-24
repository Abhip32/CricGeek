import Navbar from '@/components/common/Navbar';
import Footer from '@/components/common/Footer';
import { Inter } from 'next/font/google';
import './globals.css';

const inter = Inter({ subsets: ['latin'], display: 'swap' });

export const metadata = {
  title: 'CricGeek - Ultimate Modern Cricket Hub',
  description: 'Real-time live cricket scores, ball-by-ball scorecards, upcoming fixtures, latest cricket news, and ICC rankings.',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className="dark">
      <body className={`${inter.className} min-h-screen bg-[#070B14] text-slate-100 antialiased selection:bg-emerald-500 selection:text-black`}>
        {/* Subtle decorative background stadium glows */}
        <div className="fixed inset-0 pointer-events-none z-0 overflow-hidden">
          <div className="absolute -top-40 -left-40 w-96 h-96 bg-emerald-500/10 rounded-full blur-[140px]" />
          <div className="absolute top-1/3 -right-40 w-96 h-96 bg-red-500/10 rounded-full blur-[140px]" />
          <div className="absolute -bottom-40 left-1/3 w-96 h-96 bg-blue-500/10 rounded-full blur-[140px]" />
        </div>

        <div className="relative z-10 flex flex-col min-h-screen">
          <Navbar />
          <main className="flex-1">
            {children}
          </main>
          <Footer />
        </div>
      </body>
    </html>
  );
}
