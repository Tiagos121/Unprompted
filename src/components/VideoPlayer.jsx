import React from 'react';
// IMPORTAMOS A CONSTANTE DO NOVO FICHEIRO
import { videosDoYoutube } from '../data/videos'; 

function VideoPlayer({ idProduto }) {
  // Procura o ID no dicionário importado
  const videoId = videosDoYoutube[idProduto?.toString()] || "dQw4w9WgXcQ";

  return (
    <iframe 
      className="w-full h-full" 
      src={`https://www.youtube.com/embed/${videoId}?autoplay=1&rel=0&modestbranding=1`} 
      title={`Episódio UrWell ${idProduto}`} 
      frameBorder="0" 
      allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" 
      allowFullScreen
    ></iframe>
  );
}

export default VideoPlayer;