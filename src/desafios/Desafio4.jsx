import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom'; 

function Desafio4({ isBugged, idProduto }) {
  const navigate = useNavigate();

  const [indices, setIndices] = useState([0, 0, 0]);
  const [desbloqueado, setDesbloqueado] = useState(false);
  const [mensagem, setMensagem] = useState("VALIDAÇÃO DE PENSAMENTO OBRIGATÓRIA.");

  const palavra1 = ["SALVAÇÃO", "MÁQUINA", "PRISÃO"];
  const palavra2 = ["BÊNÇÃO", "CALMA", "CEGUEIRA"];
  const palavra3 = ["SILÊNCIO", "ROTINA", "REVOLTA"];

  useEffect(() => {
    if (desbloqueado) return;

    const autocorretor = setInterval(() => {
      setIndices((prev) => {
        const palavrasAlteradas = prev.map((val, i) => val !== 0 ? i : -1).filter(i => i !== -1);
        
        if (palavrasAlteradas.length === 0) return prev;

        const alvoCensura = palavrasAlteradas[Math.floor(Math.random() * palavrasAlteradas.length)];
        const novosIndices = [...prev];
        novosIndices[alvoCensura] = 0;
        
        setMensagem("CENSURA ATIVA: Pensamento divergente corrigido.");
        return novosIndices;
      });
    }, 2000); 

    return () => clearInterval(autocorretor);
  }, [desbloqueado]);

  const alterarPalavra = (posicao) => {
    if (desbloqueado) return;
    setIndices((prev) => {
      const novos = [...prev];
      novos[posicao] = (novos[posicao] + 1) % 3; 
      setMensagem("Aviso: Padrão de pensamento não autorizado.");
      return novos;
    });
  };

  const tentarSubmeter = () => {
    if (desbloqueado) return;

    if (indices[0] === 0 && indices[1] === 0 && indices[2] === 0) {
      setMensagem("OBEDIÊNCIA REGISTADA. Mas o sistema exige submissão total.");
      return;
    }

    if (indices[0] === 2 && indices[1] === 2 && indices[2] === 2) {
      setDesbloqueado(true);
      setMensagem("FILTRO CORROMPIDO. VERDADE EXPOSTA.");

    } else {
      setMensagem("ERRO LÓGICO: A frase não faz sentido para o sistema.");
    }
  };

  return (
    <div className={`min-h-screen flex flex-col items-center justify-center p-6 font-mono text-center transition-colors duration-500 ${isBugged ? 'bg-neutral-950 text-red-600' : 'bg-white text-neutral-900'}`}>
      
      <div className="max-w-4xl w-full border border-current p-8 rounded-lg shadow-2xl bg-black relative overflow-hidden">
        
        <h1 className="text-3xl font-bold mb-4 border-b border-current pb-4 text-emerald-600">
          URWELL // FILTRO SUBLIMINAR
        </h1>

        {!desbloqueado ? (
          <div className="space-y-10">
            
            <p className={`text-xl font-bold h-8 ${isBugged ? 'text-red-500 animate-pulse' : 'text-emerald-500'}`}>
              {mensagem}
            </p>

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
          
          
          <div className="space-y-6 text-green-500 pt-8 animate-in fade-in zoom-in duration-700">
            <h2 className="text-4xl font-bold animate-pulse">CENSURA DESTRUÍDA.</h2>
            <p className="text-xl text-white">
              A verdade não pode ser apagada. O filtro falhou. Acesso concedido.
            </p>
            
            <button 
              onClick={() => navigate(`/produtos/${idProduto}`, { state: { unlocked: true } })}
              className="mt-8 px-10 py-4 bg-green-900/30 border-2 border-green-500 text-green-500 hover:bg-green-500 hover:text-black font-bold text-xl transition-all uppercase tracking-widest"
            >
              Voltar à Loja e Ver Produto
            </button>
          </div>
        )}
      </div>
    </div>
  );
}

export default Desafio4;