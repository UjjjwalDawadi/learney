import React from 'react';
import { useParams } from 'react-router-dom';

function VideoPlayer() {
  const { filePath } = useParams();

  return (
    <div>
      hi
      {/* Embed the video player here */}
      <video width="320" height="240" controls>
        <source src={`http://localhost:5000/${filePath}`} type="video/mp4" />
        Your browser does not support the video tag.
      </video>
    </div>
  );
}

export default VideoPlayer;
