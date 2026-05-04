import React, { useState, useEffect } from 'react';
import VideoPlayer from '../../components/VideoPlayer';

function Produto1({ isBugged }) {
  const id = 1; 
  
  const [caos, setCaos] = useState(0);
  const [desbloqueado, setDesbloqueado] = useState(false);
  const [mostrarVideo, setMostrarVideo] = useState(false);

  // A máquina tenta sempre acalmar o sistema (reduz o caos para 0)
  useEffect(() => {
    if (desbloqueado) return;

    const estabilizador = setInterval(() => {
      setCaos((prev) => (prev > 0 ? prev - 2 : 0));
    }, 100);

    return () => clearInterval(estabilizador);
  }, [desbloqueado]);

  // Sempre que o rato se mexe, gera Caos! (Requer agitar muito rápido)
  const lidarComMovimento = (e) => {
    if (desbloqueado) return;

    // Calcula a velocidade do movimento do rato
    const intensidade = Math.abs(e.movementX) + Math.abs(e.movementY);
    
    if (intensidade > 5) {
      setCaos((prev) => {
        const novoCaos = prev + 1.5;
        if (novoCaos >= 100) {
          setDesbloqueado(true);
          setTimeout(() => setMostrarVideo(true), 3000);
          return 100;
        }
        return novoCaos;
      });
    }
  };

  return (
    <div 
      onMouseMove={lidarComMovimento}
      className={`min-h-screen flex flex-col items-center justify-center p-6 font-mono text-center transition-colors duration-500 cursor-crosshair ${isBugged ? 'bg-neutral-950 text-red-600' : 'bg-white text-neutral-900'}`}
    >
      <div className="max-w-3xl w-full border border-current p-12 rounded-lg shadow-2xl bg-black relative overflow-hidden pointer-events-none">
        
        <h1 className="text-3xl font-bold mb-8 border-b border-current pb-4 text-blue-500">
          CALIBRAÇÃO URSYNC // SENSOR DE FOCO
        </h1>

        {!desbloqueado ? (
          <div className="space-y-12">
            <p className="text-2xl font-bold text-blue-500 animate-pulse">
              MANTENHA O RATO IMÓVEL PARA SINCRONIZAR.
            </p>

            <div className="h-20 flex items-center justify-center">
              {isBugged && (
                <div className="bg-red-900/30 p-4 border border-red-500">
                  <p className="text-sm text-red-400 mb-1">UNPROMPTED // INTERCEÇÃO</p>
                  <p className="text-lg text-white font-bold">
                    Eles querem-te dócil! AGITA O RATO SEM PARAR para fritar o sensor!
                  </p>
                </div>
              )}
            </div>

            <div className="space-y-2 px-8">
              <div className="flex justify-between text-sm font-bold">
                <span className="text-blue-500">ORDEM (0%)</span>
                <span className="text-red-500">CAOS NEURAL (100%)</span>
              </div>
              <div className="w-full h-8 bg-neutral-800 rounded-full overflow-hidden border border-neutral-700">
                <div 
                  className="h-full bg-red-600 transition-all duration-75"
                  style={{ width: `${caos}%` }}
                ></div>
              </div>
            </div>
            
            <p className="text-neutral-500 text-sm">
              Anomalias cinéticas: {Math.round(caos)}%
            </p>
          </div>
        ) : (
          <div className="space-y-6 text-green-500">
            <h2 className="text-4xl font-bold animate-pulse">SENSOR DESTRUTÍDO</h2>
            <p className="text-xl text-white">Foco quebrado com sucesso.</p>
            
            {!mostrarVideo ? (
              <div className="mt-8 aspect-video w-full flex flex-col items-center justify-center bg-neutral-900 border-2 border-green-500/50 rounded-lg">
                <div className="animate-spin w-12 h-12 border-4 border-green-500 border-t-transparent rounded-full mb-4"></div>
                <p className="text-green-500 font-bold tracking-widest animate-pulse">A DESCARREGAR DADOS DA RESISTÊNCIA...</p>
              </div>
            ) : (
              <div className="mt-8 animate-in fade-in zoom-in duration-700 pointer-events-auto">
                <VideoPlayer idProduto={id} />
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  );
}

export default Produto1;