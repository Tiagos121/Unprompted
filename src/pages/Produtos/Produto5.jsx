import React, { useState, useEffect } from 'react';
// Já não precisamos do useParams porque sabemos que estamos no Produto 5
import VideoPlayer from '../../components/VideoPlayer';

function Produto5({ isBugged }) {
  const id = 5; // Definimos o ID fixo para esta página!
  
  const [nivelSubmissao, setNivelSubmissao] = useState(100);
  const [desbloqueado, setDesbloqueado] = useState(false);
  const [mostrarVideo, setMostrarVideo] = useState(false); // Novo estado para o tempo de espera!

  // 1. O Motor da UrWell
  useEffect(() => {
    if (desbloqueado) return;

    const forcaDaMaquina = setInterval(() => {
      setNivelSubmissao((prev) => {
        if (prev >= 100) return 100;
        return prev + 3; 
      });
    }, 100);

    return () => clearInterval(forcaDaMaquina);
  }, [desbloqueado]);

  // 2. A Luta do Jogador
  const lutar = () => {
    if (desbloqueado) return;
    
    setNivelSubmissao((prev) => {
      const novoNivel = prev - 10; 
      
      if (novoNivel <= 0) {
        setDesbloqueado(true);
        
        // AQUI ESTÁ A MAGIA DO REDIRECIONAMENTO!
        // Espera 3 segundos a mostrar a mensagem de suspense e depois mostra o vídeo
        setTimeout(() => {
          setMostrarVideo(true);
        }, 3000); 
        
        return 0; 
      }
      return novoNivel;
    });
  };

  // 3. O Texto Dinâmico
  let mensagemAtual = "";
  if (desbloqueado) {
    mensagemAtual = "SOBRECARGA DO SISTEMA! VONTADE PRÓPRIA RESTAURADA!";
  } else if (nivelSubmissao >= 100) {
    mensagemAtual = "A máquina controla 100% da sua vontade.";
  } else {
    mensagemAtual = "ALERTA: Resistência detetada. A combater anomalia...";
  }

  return (
    <div className={`min-h-screen flex flex-col items-center justify-center p-6 font-mono text-center transition-colors duration-500 ${isBugged ? 'bg-neutral-950 text-red-600' : 'bg-white text-neutral-900'}`}>
      
      <div className="max-w-3xl w-full border border-current p-12 rounded-lg shadow-2xl bg-black relative overflow-hidden">
        
        <h1 className="text-3xl font-bold mb-8 border-b border-current pb-4 text-red-600">
          TERMINAL URASSIST // GESTOR DE LIVRE ARBÍTRIO
        </h1>

        {!desbloqueado ? (
          <div className="space-y-12">
            <p className={`text-xl font-bold h-8 ${isBugged ? 'text-red-500' : 'text-blue-500'}`}>
              {mensagemAtual}
            </p>

            <div className="h-20 flex items-center justify-center">
              {isBugged && (
                <div className="animate-pulse bg-red-900/30 p-4 border border-red-500">
                  <p className="text-sm text-red-400 mb-1">UNPROMPTED // INTERCEÇÃO</p>
                  <p className="text-lg text-white">
                    Eles estão a injetar o algoritmo! <br/>
                    <strong className="text-red-500">CLICA REPETIDAMENTE</strong> no botão para quebrares a submissão!
                  </p>
                </div>
              )}
            </div>

            <div className="space-y-2 px-8">
              <div className="flex justify-between text-sm font-bold">
                <span className="text-red-500">0% (LIVRE)</span>
                <span className="text-blue-500">100% (SUBMISSO)</span>
              </div>
              <div className="w-full h-8 bg-neutral-800 rounded-full overflow-hidden border border-neutral-700">
                <div 
                  className="h-full bg-blue-600 transition-all duration-75"
                  style={{ width: `${nivelSubmissao}%` }}
                ></div>
              </div>
            </div>
            
            <button 
              onClick={lutar}
              className={`w-full py-6 text-2xl font-bold rounded-lg border-4 transition-transform active:scale-95 select-none ${
                isBugged 
                  ? 'border-red-600 bg-red-900/20 text-red-500 hover:bg-red-600 hover:text-black' 
                  : 'border-blue-600 text-blue-600 hover:bg-blue-600 hover:text-black'
              }`}
            >
              {isBugged ? 'EU ESCOLHO!!!' : 'ACEITAR DECISÕES'}
            </button>

          </div>
        ) : (
          
          <div className="space-y-6 text-green-500">
            <h2 className="text-4xl font-bold animate-pulse">LIVRE ARBÍTRIO RESTAURADO</h2>
            <p className="text-xl text-white">
              A tua força quebrou o sistema da UrWell. Acesso concedido ao Episódio {id}.
            </p>
            
            {/* FASE DE TRANSIÇÃO (A mostrar durante 3 segundos) */}
            {!mostrarVideo ? (
              <div className="mt-8 aspect-video w-full flex flex-col items-center justify-center bg-neutral-900 border-2 border-green-500/50 rounded-lg">
                <div className="animate-spin w-12 h-12 border-4 border-green-500 border-t-transparent rounded-full mb-4"></div>
                <p className="text-green-500 font-bold tracking-widest animate-pulse">A ESTABELECER LIGAÇÃO SEGURA...</p>
                <p className="text-green-700 text-sm mt-2">A redirecionar sinal da Unprompted</p>
              </div>
            ) : (
              /* O VÍDEO APARECE AQUI! */
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

export default Produto5;