import React from 'react';
import './Loading.css'; // Separate CSS for the Loading component

const Loading = () => {
  return (
    <div className="loading">
      <div className="loading-spinner"></div>
      <p>Loading...</p>
    </div>
  );
};

export default Loading;
