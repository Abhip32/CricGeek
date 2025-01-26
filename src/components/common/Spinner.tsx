import React from 'react';
import Image from 'next/image'

const Spinner = () => {
  return (
    <div className="flex justify-center items-center h-screen animate-spin">
       <Image
      src="/images/loader.png" // Path relative to the public folder
      alt="Logo"
      width={30} // Adjust width
      height={30} // Adjust height
      priority // Ensures the logo loads quickly
    />
    </div>
  );
};

export default Spinner;