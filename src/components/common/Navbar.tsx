'use client'
import Link from 'next/link';
import { useEffect, useState } from 'react';
import { usePathname } from 'next/navigation';

const Navbar = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const pathname = usePathname();

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 0);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const isActiveLink = (path: string) => pathname === path;

  return (
    <nav className={`fixed w-full top-0 z-[100] p-4 transition-colors duration-300 ${
      isScrolled ? 'bg-black' : 'bg-transparent'
    } text-white`}>
      <div className="container mx-auto flex justify-between items-center relative">
        <Link href="/" className="navbar-brand text-md sm:text-xl md:text-2xl lg:text-3xl font-extrabold" style={{ textShadow: '2px 2px 10px #1a1e25' }}>
          <em className="text-red-600">CRIC</em>
          <em className="text-white">GEEK</em>
        </Link>

        <button
          className="lg:hidden text-white z-[102]"
          onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
        >
          <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            {isMobileMenuOpen ? (
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
            ) : (
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
            )}
          </svg>
        </button>

        <div className="hidden lg:flex space-x-6">
          <Link 
            href="/" 
            className={`font-bold hover:text-red-700 ${isActiveLink('/') ? 'text-red-700' : ''}`}
          >
            Home
          </Link>
          <Link 
            href="/matches" 
            className={`font-bold hover:text-red-700 ${isActiveLink('/matches') ? 'text-red-700' : ''}`}
          >
            Matches
          </Link>
          <Link href="/schdule" className="font-bold hover:text-red-700">
            Schedule
          </Link>
        </div>

        <div className={`lg:hidden fixed top-[72px] left-0 right-0 bg-black/95 transition-transform duration-300 z-[101] w-full ${
          isMobileMenuOpen ? 'translate-y-0 opacity-100' : '-translate-y-full opacity-0'
        }`}>
          <div className="flex flex-col items-center space-y-4 py-4">
            <Link 
              href="/matches" 
              className={`font-bold hover:text-red-700 ${isActiveLink('/matches') ? 'text-red-700' : ''}`}
            >
              Matches
            </Link>
            <Link href="/live" className="font-bold hover:text-red-700">
              Live
            </Link>
            <Link href="/schedule" className="font-bold hover:text-red-700">
              Schedule
            </Link>
            <Link href="/news" className="font-bold hover:text-red-700">
              News
            </Link>
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar; 