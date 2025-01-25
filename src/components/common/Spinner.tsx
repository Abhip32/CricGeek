import React from 'react';

const Spinner = () => {
  return (
    <div className="flex justify-center items-center h-screen">
      <img
        src='images/loader.png'
        alt="Loading"
        className="w-10 h-10 animate-spin" // Adjust size as needed
      />
    </div>
  );
};

export default Spinner;