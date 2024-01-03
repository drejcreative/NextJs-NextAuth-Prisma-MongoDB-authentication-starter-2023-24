import React from 'react';

const Overlay = () => {
  return (
    <div
      hidden
      role="hidden"
      className="fixed inset-0 ml-auto w-6/12 bg-white bg-opacity-60 backdrop-blur-xl lg:block"
    ></div>
  );
};

export default Overlay;
