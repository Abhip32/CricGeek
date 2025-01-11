import Navbar from '@/components/common/Navbar';
import Footer from '@/components/common/Footer';
import { Inter } from 'next/font/google';
import './globals.css';

const inter = Inter({ subsets: ['latin'] });

export const metadata = {
  title: 'CricGeek - Your Cricket Companion',
  description: 'Get live cricket scores, match schedules, and latest cricket news',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className={inter.className}>
      <Navbar />
        <div className='min-h-screen'> 
          {children}
        </div>
      <Footer/>
      </body>
    </html>
  );
}
