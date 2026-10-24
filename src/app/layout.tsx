import Navbar from '@/components/common/Navbar';
import Footer from '@/components/common/Footer';
import { Inter } from 'next/font/google';
import './globals.css';

const inter = Inter({ 
  subsets: ['latin'],
  variable: '--font-inter',
  display: 'swap'
});

export const metadata = {
  title: 'CricGeek — Live Cricket Scores, Schedules & Statistics',
  description: 'Your premier cricket companion for live scores, ball-by-ball updates, match schedules, and official ICC rankings.',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className={inter.variable}>
      <body className="min-h-screen bg-slate-50 text-slate-900 flex flex-col antialiased selection:bg-red-500 selection:text-white">
        <Navbar />
        <main className="flex-1 w-full">
          {children}
        </main>
        <Footer />
      </body>
    </html>
  );
}
