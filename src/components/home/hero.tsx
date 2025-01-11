import React from 'react';
import Image from 'next/image';

interface HeroProps {
    image?: string;
    title1?: string;
    title2?: string;
    subtitle?: string;
}

const Hero = ({ image, title1, title2, subtitle }: HeroProps) => {
    const backgroundImageUrl = image;
    return (
      <div className="relative pt-48 pb-12 bg-black xl:pt-60 sm:pb-16 lg:pb-32 xl:pb-48 2xl:pb-56">

  
      <div className="absolute inset-0 bg-gradient-to-r from-indigo-500">
          <img className="object-cover w-full h-full" src={backgroundImageUrl} alt="" />
          <div className="absolute inset-0 bg-gradient-to-r from-zinc-950 to-transparent"></div>
      </div>
  
      <div className="relative">
          <div className="px-6 mx-auto sm:px-8 lg:px-12 max-w-7xl">
              <div className="w-full">
                  <p className="mt-2 md:mt-6 tracking-tighter text-white">
                      <span className="text-2xl md:text-5xl">{title1} {title2}</span><br />
                      <span className="text-xl md:text-3xl">{subtitle}</span>
                  </p>
              </div>
          </div>
      </div>
  </div>  
    );
};

export default Hero;
