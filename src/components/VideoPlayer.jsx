import React from 'react';

// O nosso "Cérebro" de Vídeos da Resistência
const baseDeDadosDeVideos = {
  1: "https://www.youtube.com/embed/TEU_LINK_1",
  2: "https://www.youtube.com/embed/TEU_LINK_2",
  3: "https://www.youtube.com/embed/TEU_LINK_3",
  4: "https://www.youtube.com/embed/TEU_LINK_4",
  5: "https://www.youtube.com/embed/dQw4w9WgXcQ" // O vídeo de vitória do Produto 5!
};

function VideoPlayer({ idProduto }) {
  // Procura o vídeo com base no ID que foi passado
  const videoUrl = baseDeDadosDeVideos[parseInt(idProduto)];

  // Se por acaso esqueceres de colocar o link no ID correspondente, ele dá este erro bonito:
  if (!videoUrl) {
    return (
      <div className="w-full aspect-video bg-neutral-900 border-2 border-red-500 flex items-center justify-center rounded-lg shadow-[0_0_30px_rgba(220,38,38,0.3)]">
        <p className="text-red-500 font-mono animate-pulse">
          ERRO: Sinal de vídeo intercetado ou inexistente para o Produto {idProduto}.
        </p>
      </div>
    );
  }

  // Se encontrou o vídeo, mostra o leitor da Resistência (Verde)
  return (
    <div className="w-full aspect-video bg-neutral-900 border-2 border-green-500 flex items-center justify-center overflow-hidden rounded-lg shadow-[0_0_30px_rgba(34,197,94,0.3)]">
      <iframe 
        src={videoUrl} 
        title={`Ficheiro Secreto Episódio ${idProduto}`}
        className="w-full h-full grayscale hover:grayscale-0 transition-all duration-700"
        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
        allowFullScreen
      ></iframe>
    </div>
  );
}

export default VideoPlayer;