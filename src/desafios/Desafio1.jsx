import React, { useState, useEffect, useRef } from 'react';
import { useNavigate } from 'react-router-dom';

function Desafio1({ isBugged, idProduto }) {
  const navigate = useNavigate(); 

  const [caos, setCaos] = useState(0);
  const [desbloqueado, setDesbloqueado] = useState(false);
  
  
  const ultimoToque = useRef({ x: null, y: null });

  useEffect(() => {
    if (desbloqueado) return;

    const estabilizador = setInterval(() => {
      setCaos((prev) => (prev > 0 ? prev - 2 : 0));
    }, 100);

    return () => clearInterval(estabilizador);
  }, [desbloqueado]);

  
  const adicionarCaos = (intensidade) => {
    if (intensidade > 5) {
      setCaos((prev) => {
        const novoCaos = prev + 1.5;
        if (novoCaos >= 100) {
          setDesbloqueado(true);
          return 100;
        }
        return novoCaos;
      });
    }
  };

  
  const lidarComMovimento = (e) => {
    if (desbloqueado) return;
    const intensidade = Math.abs(e.movementX) + Math.abs(e.movementY);
    adicionarCaos(intensidade);
  };

  
  const lidarComToqueStart = (e) => {
    
    ultimoToque.current = { x: e.touches[0].clientX, y: e.touches[0].clientY };
  };

  const lidarComToqueMove = (e) => {
    if (desbloqueado) return;
    
    const atualX = e.touches[0].clientX;
    const atualY = e.touches[0].clientY;

    if (ultimoToque.current.x !== null) {
      
      const intensidade = Math.abs(atualX - ultimoToque.current.x) + Math.abs(atualY - ultimoToque.current.y);
      adicionarCaos(intensidade);
    }

    
    ultimoToque.current = { x: atualX, y: atualY };
  };

  return (
    <div 
      onMouseMove={lidarComMovimento}
      onTouchStart={lidarComToqueStart}
      onTouchMove={lidarComToqueMove}
      
      className={`min-h-screen flex flex-col items-center justify-center p-4 md:p-6 font-mono text-center transition-colors duration-500 cursor-crosshair ${isBugged ? 'bg-neutral-950 text-red-600' : 'bg-white text-neutral-900'}`}
    >
      
      <div className="max-w-3xl w-full border border-current p-6 md:p-12 rounded-lg shadow-2xl bg-black relative overflow-hidden pointer-events-none">
        
        
        <h1 className="text-2xl md:text-3xl font-bold mb-6 md:mb-8 border-b border-current pb-4 text-blue-500">
          CALIBRAÇÃO URWELL // SENSOR DE FOCO
        </h1>

        {!desbloqueado ? (
          <div className="space-y-8 md:space-y-12">
            
            <p className="text-xl md:text-2xl font-bold text-blue-500 animate-pulse">
              MANTENHA O RATO OU DEDO IMÓVEL.
            </p>

            <div className="min-h-[5rem] flex items-center justify-center">
              {isBugged && (
                <div className="bg-red-900/30 p-3 md:p-4 border border-red-500">
                  <p className="text-xs md:text-sm text-red-400 mb-1">UNPROMPTED // INTERCEÇÃO</p>
                  <p className="text-base md:text-lg text-white font-bold">
                    Eles querem-te dócil! AGITA O RATO OU DESLIZA O DEDO SEM PARAR para fritar o sensor!
                  </p>
                </div>
              )}
            </div>

            <div className="space-y-2 px-2 md:px-8">
              <div className="flex justify-between text-xs md:text-sm font-bold">
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
            <h2 className="text-3xl md:text-4xl font-bold animate-pulse">SENSOR DESTRUÍDO</h2>
            <p className="text-lg md:text-xl text-white">Foco quebrado com sucesso.</p>
            

            <button 
              onClick={() => navigate(`/produtos/${idProduto}`, { state: { unlocked: true } })}
              className="mt-6 md:mt-8 px-6 md:px-10 py-3 md:py-4 bg-green-900/30 border-2 border-green-500 text-green-500 hover:bg-green-500 hover:text-black font-bold text-lg md:text-xl transition-all uppercase tracking-widest pointer-events-auto"
            >
              Voltar à Loja e Ver Produto
            </button>
            
          </div>
        )}
      </div>
    </div>
  );
}

export default Desafio1;