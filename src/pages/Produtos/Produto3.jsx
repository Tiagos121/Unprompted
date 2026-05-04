import React, { useState, useEffect, useRef } from 'react';
import VideoPlayer from '../../components/VideoPlayer';

function Produto3({ isBugged }) {
  const id = 3; 
  
  const [statusJogo, setStatusJogo] = useState('idle'); // idle, playing, won, lost
  const [fragmento, setFragmento] = useState(null);
  const [apanhados, setApanhados] = useState(0);
  const [perdidos, setPerdidos] = useState(0);
  const [mostrarVideo, setMostrarVideo] = useState(false);

  // Usamos uma referência para conseguir cancelar o temporizador se o jogador for rápido a clicar!
  const temporizadorRemocao = useRef(null);

  // O "MOTOR DE SONHO" - Faz aparecer as palavras aleatoriamente
  useEffect(() => {
    if (statusJogo !== 'playing') return;

    let loopDeSurgimento;

    const gerarPensamento = () => {
      // 1. Cria um pensamento numa posição aleatória (entre 10% e 80% do ecrã para não sair fora)
      const palavras = ["ACORDA", "REALIDADE", "LÚCIDO", "RESPIRA", "LIVRE"];
      setFragmento({
        id: Date.now(),
        x: Math.random() * 70 + 10,
        y: Math.random() * 70 + 10,
        texto: palavras[Math.floor(Math.random() * palavras.length)]
      });

      // 2. Se o jogador não clicar em 900 milissegundos, a palavra desaparece e ele perde um ponto!
      temporizadorRemocao.current = setTimeout(() => {
        setFragmento(null);
        setPerdidos((prev) => {
          const novosPerdidos = prev + 1;
          if (novosPerdidos >= 3) setStatusJogo('lost'); // 3 erros = Game Over
          return novosPerdidos;
        });
      }, 900); 
    };

    // A cada 1.5 segundos, a máquina lança um novo desafio
    loopDeSurgimento = setInterval(gerarPensamento, 1500);
    gerarPensamento(); // Arranca logo o primeiro

    // Limpeza
    return () => {
      clearInterval(loopDeSurgimento);
      clearTimeout(temporizadorRemocao.current);
    };
  }, [statusJogo]);

  // Quando o jogador consegue clicar na palavra a tempo!
  const apanharFragmento = () => {
    clearTimeout(temporizadorRemocao.current); // Cancela a penalização
    setFragmento(null); // Esconde a palavra
    
    setApanhados((prev) => {
      const novosApanhados = prev + 1;
      if (novosApanhados >= 10) { // 10 acertos = Vitória!
        setStatusJogo('won');
        setTimeout(() => setMostrarVideo(true), 3000);
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
    <div className={`min-h-screen flex flex-col items-center justify-center p-6 font-mono text-center transition-colors duration-500 ${isBugged ? 'bg-neutral-950 text-red-600' : 'bg-white text-neutral-900'}`}>
      
      <div className="max-w-4xl w-full border border-current p-8 rounded-lg shadow-2xl bg-black relative overflow-hidden">
        
        <h1 className="text-3xl font-bold mb-4 border-b border-current pb-4 text-purple-600">
          URMATE // SUPRESSOR DE SONHOS
        </h1>

        {/* MENUS (INÍCIO OU DERROTA) */}
        {(statusJogo === 'idle' || statusJogo === 'lost') && (
          <div className="space-y-8 py-10 animate-in fade-in">
            {statusJogo === 'lost' ? (
              <div className="text-red-500 space-y-4">
                <h2 className="text-5xl font-bold">COMA INDUZIDO.</h2>
                <p className="text-xl">A tua mente cedeu ao vazio. Os teus sonhos pertencem à UrWell.</p>
              </div>
            ) : (
              <div className="text-purple-500 space-y-4">
                <h2 className="text-2xl font-bold">PREPARAÇÃO PARA HIBERNAÇÃO</h2>
                <p>O sistema vai iniciar a lavagem mental. Feche os olhos.</p>
              </div>
            )}

            <button 
              onClick={iniciarJogo}
              className="mt-8 px-10 py-4 border-2 border-purple-600 text-purple-500 hover:bg-purple-600 hover:text-black font-bold text-xl transition-all uppercase"
            >
              {statusJogo === 'lost' ? 'Forçar Despertar' : 'Iniciar Ciclo de Sono'}
            </button>
          </div>
        )}

        {/* O JOGO DE REFLEXOS */}
        {statusJogo === 'playing' && (
          <div className="space-y-6">
            
            {/* PAINEL DE PONTUAÇÃO */}
            <div className="flex justify-between items-center bg-neutral-900 p-4 border border-neutral-800">
              <div className="text-left">
                <p className="text-sm text-neutral-500">LUCIDEZ RECUPERADA</p>
                <p className="text-2xl font-bold text-green-500">{apanhados} / 10</p>
              </div>
              <div className="text-right">
                <p className="text-sm text-neutral-500">FALHAS CRÍTICAS</p>
                <p className="text-2xl font-bold text-red-500">{perdidos} / 3</p>
              </div>
            </div>

            <p className="text-red-500 font-bold animate-pulse">
              Apanha os pensamentos lúcidos antes que se desvaneçam!
            </p>

            {/* A "PAISAGEM DE SONHO" (A área onde as palavras aparecem) */}
            <div className="w-full h-96 bg-neutral-950 border-2 border-purple-900/30 relative overflow-hidden cursor-crosshair shadow-inner">
              {fragmento && (
                <button
                  onClick={apanharFragmento}
                  style={{ top: `${fragmento.y}%`, left: `${fragmento.x}%` }}
                  className="absolute px-4 py-2 bg-purple-600 text-black font-bold transform -translate-x-1/2 -translate-y-1/2 hover:bg-white hover:scale-110 transition-all duration-100"
                >
                  {fragmento.texto}
                </button>
              )}
            </div>

          </div>
        )}

        {/* VITÓRIA E VÍDEO */}
        {statusJogo === 'won' && (
          <div className="space-y-6 text-green-500 pt-8">
            <h2 className="text-4xl font-bold animate-pulse">ACORDASTE.</h2>
            <p className="text-xl text-white">
              Recuperaste o controlo da tua mente.
            </p>
            
            {!mostrarVideo ? (
              <div className="mt-8 aspect-video w-full flex flex-col items-center justify-center bg-neutral-900 border-2 border-green-500/50 rounded-lg">
                <div className="animate-spin w-12 h-12 border-4 border-green-500 border-t-transparent rounded-full mb-4"></div>
                <p className="text-green-500 font-bold tracking-widest animate-pulse">A ESTABELECER LIGAÇÃO SEGURA...</p>
                <p className="text-green-700 text-sm mt-2">A redirecionar sinal da Unprompted</p>
              </div>
            ) : (
              <div className="mt-8 animate-in fade-in zoom-in duration-700">
                <VideoPlayer idProduto={id} />
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  );
}

export default Produto3;