import React from 'react';
import './Loading.css';

const LoadingCircle = () => {
  return (
    <div className="loading-circle">
      <div className="circle-inner"></div>
      <div className="circle-outer"></div>
    </div>
  );
};

export default LoadingCircle;
