import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom'; // 1. ADICIONAR: Importação do useNavigate

// 2. ADICIONAR: A prop 'idProduto' entra aqui
function Desafio5({ isBugged, idProduto }) {
  const navigate = useNavigate(); // <-- Inicializar o navigate
  
  const [nivelSubmissao, setNivelSubmissao] = useState(100);
  const [desbloqueado, setDesbloqueado] = useState(false);
  // NOTA: O estado 'mostrarVideo' foi APAGADO.

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
        // 3. APAGAR: O setTimeout que mudava o video foi apagado daqui!
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
          TERMINAL URWELL // GESTOR DE LIVRE ARBÍTRIO
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
          
          /* 4. A GRANDE MUDANÇA: ECRÃ DE VITÓRIA E BOTÃO DE REGRESSO */
          <div className="space-y-6 text-green-500 pt-8 animate-in fade-in zoom-in duration-700">
            <h2 className="text-4xl font-bold animate-pulse">LIVRE ARBÍTRIO RESTAURADO</h2>
            <p className="text-xl text-white">
              A tua força quebrou o sistema da UrWell. Acesso concedido.
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

export default Desafio5;