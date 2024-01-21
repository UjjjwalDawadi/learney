// Body.jsx

import React from 'react';
import './Body.css'; // Import your CSS file

const Body = () => {
  return (
    <div className="container">
      <div className="text-container">
        <h2>Your Text Title</h2>
        <p>
          Your text content goes here. You can add more paragraphs, format the text, and customize it as needed.
        </p>
      </div>
      <div className="video-container">
        {/* Replace the src attribute with your video source */}
        <iframe
          width="560"
          height="315"
          src="https://www.youtube.com/embed/yourvideoid"
          title="Your Video Title"
          frameborder="0"
          allowfullscreen
        ></iframe>
      </div>
    </div>
  );
};

export default Body;
