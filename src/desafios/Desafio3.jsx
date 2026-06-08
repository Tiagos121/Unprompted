import React, { useState, useEffect, useRef } from 'react';
import { useNavigate } from 'react-router-dom';

function Desafio3({ isBugged, idProduto }) {
  const navigate = useNavigate();

  const [statusJogo, setStatusJogo] = useState('idle'); 
  const [fragmento, setFragmento] = useState(null);
  const [apanhados, setApanhados] = useState(0);
  const [perdidos, setPerdidos] = useState(0);

  const temporizadorRemocao = useRef(null);

  useEffect(() => {
    if (statusJogo !== 'playing') return;

    let loopDeSurgimento;

    const gerarPensamento = () => {
      const palavras = ["ACORDA", "REALIDADE", "LÚCIDO", "RESPIRA", "LIVRE"];
      setFragmento({
        id: Date.now(),
        x: Math.random() * 70 + 10,
        y: Math.random() * 70 + 10,
        texto: palavras[Math.floor(Math.random() * palavras.length)]
      });

      temporizadorRemocao.current = setTimeout(() => {
        setFragmento(null);
        setPerdidos((prev) => {
          const novosPerdidos = prev + 1;
          if (novosPerdidos >= 3) setStatusJogo('lost'); 
          return novosPerdidos;
        });
      }, 900); 
    };

    loopDeSurgimento = setInterval(gerarPensamento, 1500);
    gerarPensamento(); 

    return () => {
      clearInterval(loopDeSurgimento);
      clearTimeout(temporizadorRemocao.current);
    };
  }, [statusJogo]);

  const apanharFragmento = () => {
    clearTimeout(temporizadorRemocao.current); 
    setFragmento(null); 
    
    setApanhados((prev) => {
      const novosApanhados = prev + 1;
      if (novosApanhados >= 10) { 
        setStatusJogo('won');
      }
      return novosApanhados;
    });
  };

  const iniciarJogo = () => {
    setApanhados(0);
    setPerdidos(0);
    setStatusJogo('playing');
  };

  return (
    <div className={`min-h-screen flex flex-col items-center justify-center p-4 md:p-6 font-mono text-center transition-colors duration-500 ${isBugged ? 'bg-neutral-950 text-red-600' : 'bg-white text-neutral-900'}`}>
      
      <div className="max-w-4xl w-full border border-current p-6 md:p-8 rounded-lg shadow-2xl bg-black relative overflow-hidden">
        
        <h1 className="text-2xl md:text-3xl font-bold mb-4 border-b border-current pb-4 text-purple-600">
          URWELL // SUPRESSOR DE SONHOS
        </h1>

        {(statusJogo === 'idle' || statusJogo === 'lost') && (
          <div className="space-y-6 md:space-y-8 py-6 md:py-10 animate-in fade-in">
            {statusJogo === 'lost' ? (
              <div className="text-red-500 space-y-4">
                <h2 className="text-3xl md:text-5xl font-bold">COMA INDUZIDO.</h2>
                <p className="text-base md:text-xl">A tua mente cedeu ao vazio. Os teus sonhos pertencem à UrWell.</p>
              </div>
            ) : (
              <div className="text-purple-500 space-y-4">
                <h2 className="text-xl md:text-2xl font-bold">PREPARAÇÃO PARA HIBERNAÇÃO</h2>
                <p className="text-sm md:text-base">O sistema vai iniciar a lavagem mental. Feche os olhos.</p>
              </div>
            )}

            <button 
              onClick={iniciarJogo}
              className="mt-6 md:mt-8 px-6 md:px-10 py-3 md:py-4 border-2 border-purple-600 text-purple-500 hover:bg-purple-600 hover:text-black font-bold text-base md:text-xl transition-all uppercase"
            >
              {statusJogo === 'lost' ? 'Forçar Despertar' : 'Iniciar Ciclo de Sono'}
            </button>
          </div>
        )}

        {statusJogo === 'playing' && (
          <div className="space-y-4 md:space-y-6">
            <div className="flex justify-between items-center bg-neutral-900 p-3 md:p-4 border border-neutral-800">
              <div className="text-left">
                <p className="text-xs md:text-sm text-neutral-500">LUCIDEZ RECUPERADA</p>
                <p className="text-xl md:text-2xl font-bold text-green-500">{apanhados} / 10</p>
              </div>
              <div className="text-right">
                <p className="text-xs md:text-sm text-neutral-500">FALHAS CRÍTICAS</p>
                <p className="text-xl md:text-2xl font-bold text-red-500">{perdidos} / 3</p>
              </div>
            </div>

            <p className="text-red-500 font-bold animate-pulse text-sm md:text-base">
              Apanha os pensamentos lúcidos antes que se desvaneçam!
            </p>

            <div className="w-full h-64 md:h-96 bg-neutral-950 border-2 border-purple-900/30 relative overflow-hidden cursor-crosshair shadow-inner">
              {fragmento && (
                <button
                  onClick={apanharFragmento}
                  style={{ top: `${fragmento.y}%`, left: `${fragmento.x}%` }}
                  className="absolute px-3 py-1 md:px-4 md:py-2 bg-purple-600 text-black font-bold text-sm md:text-base transform -translate-x-1/2 -translate-y-1/2 hover:bg-white hover:scale-110 transition-all duration-100"
                >
                  {fragmento.texto}
                </button>
              )}
            </div>
          </div>
        )}

        {statusJogo === 'won' && (
          <div className="space-y-6 text-green-500 pt-8 animate-in fade-in zoom-in duration-700">
            <h2 className="text-3xl md:text-4xl font-bold animate-pulse">ACORDASTE.</h2>
            <p className="text-base md:text-xl text-white">
              Recuperaste o controlo da tua mente. Acesso concedido.
            </p>
            
            <button 
              onClick={() => navigate(`/produtos/${idProduto}`, { state: { unlocked: true } })}
              className="mt-6 md:mt-8 px-6 md:px-10 py-3 md:py-4 bg-green-900/30 border-2 border-green-500 text-green-500 hover:bg-green-500 hover:text-black font-bold text-base md:text-xl transition-all uppercase tracking-widest"
            >
              Voltar à Loja e Ver Produto
            </button>
          </div>
        )}
      </div>
    </div>
  );
}

export default Desafio3;