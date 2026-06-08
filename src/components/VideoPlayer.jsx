import React from 'react';


function VideoPlayer({ videoId }) {
  
  const finalId = videoId || "iMf9765Ks1U";

  return (
    <iframe 
      className="w-full h-full" 
      src={`https://www.youtube.com/embed/${finalId}?autoplay=1&rel=0&modestbranding=1`} 
      title={`Episódio UrWell`} 
      frameBorder="0" 
      allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" 
      allowFullScreen
    ></iframe>
  );
}

export default VideoPlayer;