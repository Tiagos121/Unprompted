import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom'; 

function Desafio2({ isBugged, idProduto }) {
  const navigate = useNavigate();

  const totalPalavras = 140;
  
  const [desbloqueado, setDesbloqueado] = useState(false);
  const [posicaoAnomalia, setPosicaoAnomalia] = useState(() => Math.floor(Math.random() * totalPalavras));

  useEffect(() => {
    if (desbloqueado) return;
    
    const baralhar = setInterval(() => {
      setPosicaoAnomalia(Math.floor(Math.random() * totalPalavras));
    }, 2000);

    return () => clearInterval(baralhar);
  }, [desbloqueado]);

  const clicarAnomalia = () => {
    if (desbloqueado) return;
    setDesbloqueado(true);
  };

  const clicarFalso = () => {
    setPosicaoAnomalia(Math.floor(Math.random() * totalPalavras));
  };

  const grelha = Array.from({ length: totalPalavras }).map((_, index) => {
    if (index === posicaoAnomalia) {
      return (
        <span 
          key={index} 
          onClick={clicarAnomalia}
          className="text-white hover:text-green-500 cursor-pointer font-bold relative z-10"
        >
          ACORDA
        </span>
      );
    }
    return (
      <span 
        key={index} 
        onClick={clicarFalso}
        className="text-neutral-800 hover:text-red-500 cursor-default transition-colors duration-300"
      >
        OBEDECE
      </span>
    );
  });

  return (
    <div className={`min-h-screen flex flex-col items-center justify-center p-6 font-mono text-center transition-colors duration-500 ${isBugged ? 'bg-neutral-950 text-red-600' : 'bg-white text-neutral-900'}`}>
      
      <div className="max-w-4xl w-full border border-current p-8 rounded-lg shadow-2xl bg-black relative overflow-hidden">
        
        <h1 className="text-3xl font-bold mb-4 border-b border-current pb-4 text-red-600">
          URWELL // TESTE DE CEGUEIRA SELETIVA
        </h1>

        {!desbloqueado ? (
          <div className="space-y-6">
            
            <div className="h-16 flex items-center justify-center">
              {isBugged && (
                <div className="bg-red-900/30 px-4 py-2 border border-red-500">
                  <p className="text-lg text-white font-bold animate-pulse">
                    ENCONTRA A PALAVRA "ACORDA" ANTES QUE A TUA VISÃO SEJA APAGADA.
                  </p>
                </div>
              )}
            </div>

            <div className="flex flex-wrap gap-3 justify-center text-sm md:text-base p-6 bg-neutral-900 rounded border border-neutral-800 select-none">
              {grelha}
            </div>

          </div>
        ) : (
          <div className="space-y-6 text-green-500 pt-10">
            <h2 className="text-4xl font-bold animate-pulse">ILUSÃO DESFEITA</h2>
            <p className="text-xl text-white">Os teus olhos agora veem a verdade.</p>
            
            
            <button 
              onClick={() => navigate(`/produtos/${idProduto}`, { state: { unlocked: true } })}
              className="mt-8 px-10 py-4 bg-green-900/30 border-2 border-green-500 text-green-500 hover:bg-green-500 hover:text-black font-bold text-xl transition-all uppercase tracking-widest pointer-events-auto"
            >
              Voltar à Loja e Ver Produto
            </button>
          </div>
        )}
      </div>
    </div>
  );
}

export default Desafio2;