import React from "react";

const Hero = ({ image, heading, subtitle }:any) => {
  return (
    <header>
      {/* Hero Container */}
      <div className="relative mx-auto w-full max-w-7xl px-5 py-16 md:px-10 md:py-20">
        {/* Background Image with Gradient */}
        <div
          className="absolute inset-0 z-0"
          style={{
            backgroundImage: `linear-gradient(to right, rgba(0, 0, 0, 0.8), rgba(255, 255, 255, 0.6)), url(${image})`,
            backgroundSize: "cover",
            backgroundPosition: "center",
            backgroundBlendMode: "overlay",
          }}
        ></div>

        {/* Content Overlay */}
        <div className="relative z-10 text-white">
          <div className="grid items-center justify-items-start gap-8 sm:gap-20 lg:grid-cols-2">
            {/* Hero Content */}
            <div className="flex flex-col">
              {/* Hero Title */}
              <h1 className="mb-4 text-4xl font-bold md:text-6xl drop-shadow-lg">
                {heading}
              </h1>
              <p className="mb-6 max-w-lg text-sm sm:text-xl md:mb-10 lg:mb-12 drop-shadow-lg">
                {subtitle}
              </p>
            </div>
          </div>
        </div>
      </div>
    </header>
  );
};

export default Hero;
