"use client";

import React, { useState } from "react";
import Image from "next/image";

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [menuOne, setMenuOne] = useState(false);

  return (
    <section>
      <nav className="font-inter mx-auto h-auto w-full max-w-screen-2xl lg:relative lg:top-0">
        <div className="flex flex-col px-6 py-6 lg:flex-row lg:items-center lg:justify-between lg:px-10 lg:py-4 xl:px-20">
          <a href="/">
            <Image
              src="/images/logo.png" // Path relative to the public folder
              alt="Logo"
              width={150} // Adjust width
              height={50} // Adjust height
              priority // Ensures the logo loads quickly
            />
          </a>
          <div
            className={`mt-14 flex flex-col space-y-8 lg:mt-0 lg:flex lg:flex-row lg:space-x-1 lg:space-y-0 ${
              isOpen ? "" : "hidden"
            }`}
          >
            <a
              href="/"
              className="font-inter rounded-lg lg:px-6 lg:py-4 lg: lg:hover:text-red-600"
            >
              Home
            </a>
            <a
              href="/matches"
              className="font-inter rounded-lg lg:px-6 lg:py-4 lg: lg:hover:text-red-600"
            >
              Matches
            </a>
            <a
              href="/schedule"
              className="font-inter lg: rounded-lg pb-8 lg:px-6 lg:py-4 lg: lg:hover:text-red-600"
            >
              Schedule
            </a>

            <a
              href="/rankings"
              className="font-inter lg: rounded-lg pb-8 lg:px-6 lg:py-4 lg: lg:hover:text-red-600"
            >
              Rankings
            </a>
          </div>

          <button
            className="absolute right-5 lg:hidden"
            onClick={() => {
              setIsOpen(!isOpen);
            }}
          >
            <svg
              width="24"
              height="24"
              viewBox="0 0 24 24"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M3.75 12H20.25"
                stroke="#160042"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              ></path>
              <path
                d="M3.75 6H20.25"
                stroke="#160042"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              ></path>
              <path
                d="M3.75 18H20.25"
                stroke="#160042"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              ></path>
            </svg>
          </button>
        </div>
      </nav>
    </section>
  );
};

export default Navbar;
