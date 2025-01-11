"use client";
import Link from "next/link";
import { useEffect, useState } from "react";
import { usePathname } from "next/navigation";

const Navbar = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const pathname = usePathname();

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 0);
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const isActiveLink = (path: string) => pathname === path;

  return (
    <header className="absolute inset-x-0 top-0 z-10 py-8 xl:py-12">
      <div className="px-6 mx-auto sm:px-8 lg:px-12 max-w-7xl">
        <div className="flex items-center justify-between">
          <div className="flex flex-shrink-0">
            <a
              href="#"
              title="BakerStreet"
              className="inline-flex rounded-md focus:outline-none focus:ring-2 focus:ring-offset-4 focus:ring-offset-secondary focus:ring-primary"
            >
              <img
                className="w-auto h-8"
                src="https://cdn.rareblocks.xyz/collection/bakerstreet/images/logo.svg"
                alt="BakerStreet"
              />
            </a>
          </div>

          <div className="md:hidden">
            <button
              type="button"
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              className="p-2 -m-2 transition-all duration-200 rounded-full text-white focus:outline-none focus:ring-2 focus:ring-offset-1 focus:ring-primary focus:ring-offset-secondary"
            >
              <svg
                className="w-6 h-6"
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d={isMobileMenuOpen 
                    ? "M6 18L18 6M6 6l12 12" 
                    : "M4 6h16M4 12h16M4 18h16"}
                />
              </svg>
            </button>
          </div>

          <div className="hidden md:flex md:items-center md:space-x-10 lg:ml-28">
            <Link
              href="/"
              className={` hover:text-white ${
                isActiveLink("/") ? "text-white" : "text-gray-50"
              }`}
            >
              Home
            </Link>
            <Link
              href="/matches"
              className={` hover:text-white ${
                isActiveLink("/matches") ? "text-white" : "text-gray-50"
              }`}
            >
              Matches
            </Link>
            <Link
              href="/schedule"
              className={` hover:text-white ${
                isActiveLink("/schedule") ? "text-white" : "text-gray-50"
              }`}
            >
              Schedule
            </Link>
            {/* <Link
              href="/rankings"
              className={` hover:text-white ${
                isActiveLink("/rankings") ? "text-white" : "text-gray-50"
              }`}
            >
              Rankings
            </Link> */}
          </div>

          {isMobileMenuOpen && (
            <div className="absolute top-full left-0 right-0 bg-zinc-950 backdrop-blur-sm md:hidden">
              <div className="px-6 py-4 space-y-4">
                <Link
                  href="/"
                  onClick={() => setIsMobileMenuOpen(false)}
                  className={`block  hover:text-white ${
                    isActiveLink("/") ? "text-white" : "text-gray-50"
                  }`}
                >
                  Home
                </Link>
                <Link
                  href="/matches"
                  onClick={() => setIsMobileMenuOpen(false)}
                  className={`block  hover:text-white ${
                    isActiveLink("/matches") ? "text-white" : "text-gray-50"
                  }`}
                >
                  Matches
                </Link>
                <Link
                  href="/schedule"
                  onClick={() => setIsMobileMenuOpen(false)}
                  className={`block  hover:text-white ${
                    isActiveLink("/schedule") ? "text-white" : "text-gray-50"
                  }`}
                >
                  Schedule
                </Link>
                {/* <Link
                  href="/rankings"
                  onClick={() => setIsMobileMenuOpen(false)}
                  className={`block  hover:text-white ${
                    isActiveLink("/rankings") ? "text-white" : "text-gray-50"
                  }`}
                >
                  Rankings
                </Link> */}
              </div>
            </div>
          )}
        </div>
      </div>
    </header>
  );
};

export default Navbar;
