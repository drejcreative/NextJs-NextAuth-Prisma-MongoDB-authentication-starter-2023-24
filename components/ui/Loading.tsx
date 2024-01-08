import React from 'react';

interface IProps {
  size?: number;
  className?: string;
}

const Loading = ({ size = 6, className }: IProps) => (
  <div
    className={`h-${size} w-${size} animate-spin rounded-full border-4 border-gray-300 border-t-blue-600 ${
      className ? className : ''
    }`}
  />
);

export default Loading;
