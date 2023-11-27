import React from 'react';

const Logo = () => {
  return (
    <div className="space-y-4">
      <a href="">
        <img src="images/logo.svg" className="w-20" alt="logo" />
      </a>
      <p className="text-lg font-medium text-gray-600">Welcome to tailus ! Login first</p>
    </div>
  );
};

export default Logo;
