'use client';
import FadeIn from '@/components/animation/FadeIn';
import Image from 'next/image';
import React from 'react';

const Logo = () => {
  return (
    <FadeIn delay={0} direction="down">
      <div className="space-y-4">
        <a href="">
          <Image src="/images/logo.png" width={60} height={60} alt="logo" />
        </a>
        <p className="text-lg font-medium text-gray-600">
          Welcome to AUTH <span className="text-sm">Login first!</span>
        </p>
      </div>
    </FadeIn>
  );
};

export default Logo;
