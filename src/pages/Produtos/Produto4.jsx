import React, { useState, useEffect } from 'react';
import VideoPlayer from '../../components/VideoPlayer';

function Produto4({ isBugged }) {
  const id = 4; 
  
  // O estado de cada uma das 3 palavras da frase (0 = UrWell, 1 = Neutro, 2 = Verdade)
  const [indices, setIndices] = useState([0, 0, 0]);
  const [desbloqueado, setDesbloqueado] = useState(false);
  const [mostrarVideo, setMostrarVideo] = useState(false);
  const [mensagem, setMensagem] = useState("VALIDAÇÃO DE PENSAMENTO OBRIGATÓRIA.");

  // Os dicionários para cada espaço na frase
  const palavra1 = ["SALVAÇÃO", "MÁQUINA", "PRISÃO"];
  const palavra2 = ["BÊNÇÃO", "CALMA", "CEGUEIRA"];
  const palavra3 = ["SILÊNCIO", "ROTINA", "REVOLTA"];

  // O "MOTOR DE CENSURA" - O Autocorretor da UrWell!
  useEffect(() => {
    if (desbloqueado) return;

    const autocorretor = setInterval(() => {
      setIndices((prev) => {
        // Procura se o utilizador alterou alguma palavra (se o índice for diferente de 0)
        const palavrasAlteradas = prev.map((val, i) => val !== 0 ? i : -1).filter(i => i !== -1);
        
        // Se estiver tudo no modo UrWell, a máquina não faz nada
        if (palavrasAlteradas.length === 0) return prev;

        // Se apanhar rebeldia, escolhe uma das palavras alteradas ao calhas e força-a de volta a 0!
        const alvoCensura = palavrasAlteradas[Math.floor(Math.random() * palavrasAlteradas.length)];
        const novosIndices = [...prev];
        novosIndices[alvoCensura] = 0;
        
        setMensagem("CENSURA ATIVA: Pensamento divergente corrigido.");
        return novosIndices;
      });
    }, 2000); // O corretor ataca a cada 2 segundos! Tens de ser rápido!

    return () => clearInterval(autocorretor);
  }, [desbloqueado]);

  // Função para quando o jogador clica numa palavra para a mudar
  const alterarPalavra = (posicao) => {
    if (desbloqueado) return;
    setIndices((prev) => {
      const novos = [...prev];
      novos[posicao] = (novos[posicao] + 1) % 3; // Roda entre 0, 1 e 2
      setMensagem("Aviso: Padrão de pensamento não autorizado.");
      return novos;
    });
  };

  // O Botão de Submeter
  const tentarSubmeter = () => {
    if (desbloqueado) return;

    // Se o jogador submeter a propaganda normal da UrWell (0,0,0)
    if (indices[0] === 0 && indices[1] === 0 && indices[2] === 0) {
      setMensagem("OBEDIÊNCIA REGISTADA. Mas o sistema exige submissão total.");
      return;
    }

    // A CONDIÇÃO DE VITÓRIA: As 3 palavras no índice 2 (A Verdade!)
    if (indices[0] === 2 && indices[1] === 2 && indices[2] === 2) {
      setDesbloqueado(true);
      setMensagem("FILTRO CORROMPIDO. VERDADE EXPOSTA.");
      setTimeout(() => setMostrarVideo(true), 3000); // Transição mágica
    } else {
      setMensagem("ERRO LÓGICO: A frase não faz sentido para o sistema.");
    }
  };

  return (
    <div className={`min-h-screen flex flex-col items-center justify-center p-6 font-mono text-center transition-colors duration-500 ${isBugged ? 'bg-neutral-950 text-red-600' : 'bg-white text-neutral-900'}`}>
      
      <div className="max-w-4xl w-full border border-current p-8 rounded-lg shadow-2xl bg-black relative overflow-hidden">
        
        <h1 className="text-3xl font-bold mb-4 border-b border-current pb-4 text-emerald-600">
          URDIGEST // FILTRO SUBLIMINAR
        </h1>

        {!desbloqueado ? (
          <div className="space-y-10">
            
            <p className={`text-xl font-bold h-8 ${isBugged ? 'text-red-500 animate-pulse' : 'text-emerald-500'}`}>
              {mensagem}
            </p>

            {/* A DICA DA RESISTÊNCIA */}
            <div className="h-24 flex items-center justify-center">
              {isBugged && (
                <div className="bg-red-900/30 p-4 border border-red-500">
                  <p className="text-sm text-red-400 mb-1">UNPROMPTED // INTERCEÇÃO</p>
                  <p className="text-lg text-white font-bold">
                    Eles apagam a verdade automaticamente! Clica nas palavras para formar a frase: <br/>
                    <span className="text-red-500">"A UrWell é a nossa PRISÃO. A ignorância é CEGUEIRA. Eu escolho a REVOLTA."</span>
                  </p>
                </div>
              )}
            </div>

            {/* O PUZZLE DE TEXTO */}
            <div className="bg-neutral-900 p-8 rounded border border-neutral-800 text-2xl md:text-3xl text-left leading-loose select-none shadow-inner">
              <span className="text-white">A UrWell é a nossa </span>
              <button 
                onClick={() => alterarPalavra(0)}
                className={`inline-block px-4 py-1 mx-2 font-bold border-b-4 transition-colors ${indices[0] === 0 ? 'text-emerald-500 border-emerald-500 bg-emerald-900/20' : indices[0] === 2 ? 'text-red-500 border-red-500 bg-red-900/20' : 'text-yellow-500 border-yellow-500 bg-yellow-900/20'}`}
              >
                [ {palavra1[indices[0]]} ]
              </button>
              
              <span className="text-white">. A ignorância é uma </span>
              <button 
                onClick={() => alterarPalavra(1)}
                className={`inline-block px-4 py-1 mx-2 font-bold border-b-4 transition-colors ${indices[1] === 0 ? 'text-emerald-500 border-emerald-500 bg-emerald-900/20' : indices[1] === 2 ? 'text-red-500 border-red-500 bg-red-900/20' : 'text-yellow-500 border-yellow-500 bg-yellow-900/20'}`}
              >
                [ {palavra2[indices[1]]} ]
              </button>

              <span className="text-white">. Eu escolho a </span>
              <button 
                onClick={() => alterarPalavra(2)}
                className={`inline-block px-4 py-1 mx-2 font-bold border-b-4 transition-colors ${indices[2] === 0 ? 'text-emerald-500 border-emerald-500 bg-emerald-900/20' : indices[2] === 2 ? 'text-red-500 border-red-500 bg-red-900/20' : 'text-yellow-500 border-yellow-500 bg-yellow-900/20'}`}
              >
                [ {palavra3[indices[2]]} ]
              </button>
              <span className="text-white">.</span>
            </div>

            {/* O BOTÃO DE AÇÃO */}
            <button 
              onClick={tentarSubmeter}
              className={`w-full py-6 text-2xl font-bold rounded-lg border-4 transition-transform active:scale-95 uppercase ${
                isBugged 
                  ? 'border-red-600 bg-red-900/20 text-red-500 hover:bg-red-600 hover:text-black' 
                  : 'border-emerald-600 text-emerald-600 hover:bg-emerald-600 hover:text-black'
              }`}
            >
              {isBugged ? 'QUEBRAR CENSURA' : 'ASSINAR DECLARAÇÃO'}
            </button>

          </div>
        ) : (
          
          /* ECRÃ DE VITÓRIA E TRANSIÇÃO PARA O VÍDEO */
          <div className="space-y-6 text-green-500 pt-8">
            <h2 className="text-4xl font-bold animate-pulse">CENSURA DESTRUÍDA.</h2>
            <p className="text-xl text-white">
              A verdade não pode ser apagada. O filtro falhou.
            </p>
            
            {!mostrarVideo ? (
              <div className="mt-8 aspect-video w-full flex flex-col items-center justify-center bg-neutral-900 border-2 border-green-500/50 rounded-lg">
                <div className="animate-spin w-12 h-12 border-4 border-green-500 border-t-transparent rounded-full mb-4"></div>
                <p className="text-green-500 font-bold tracking-widest animate-pulse">A EXTRAIR DADOS NÃO FILTRADOS...</p>
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

export default Produto4;