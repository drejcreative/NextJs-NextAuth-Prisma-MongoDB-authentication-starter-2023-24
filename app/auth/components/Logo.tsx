'use client';
import FadeIn from '@/components/animation/FadeIn';
import React from 'react';

const Logo = () => {
  return (
    <FadeIn delay={0} direction="down">
      <div className="space-y-4">
        <a href="">
          <img src="images/logo.svg" className="w-20" alt="logo" />
        </a>
        <p className="text-lg font-medium text-gray-600">Welcome to AUTH BOILERPLATE</p>
        <p>Login First!</p>
      </div>
    </FadeIn>
  );
};

export default Logo;
