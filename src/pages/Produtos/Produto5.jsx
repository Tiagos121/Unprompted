import React, { useState } from 'react';

function Produto5({ isBugged }) {
  const [inputValue, setInputValue] = useState("");
  const [mensagem, setMensagem] = useState("O teu livre arbítrio foi suspenso. Digita 'CONCORDO' para continuar.");
  const [desbloqueado, setDesbloqueado] = useState(false);

  const palavraForcada = "CONCORDO";
  const palavraRebelde = "RECUSO";

  // Esta função é o terror: seja o que for que a pessoa escreva, sai "CONCORDO"
  const lidarComTeclado = (e) => {
    const textoAtual = e.target.value;
    
    // Se a pessoa apagou uma letra (Backspace), deixamos apagar
    if (textoAtual.length < inputValue.length) {
      setInputValue(textoAtual);
      return;
    }

    // Se tentou adicionar uma letra, forçamos a letra da palavra "CONCORDO"
    if (inputValue.length < palavraForcada.length) {
      const novaLetra = palavraForcada[inputValue.length];
      setInputValue(inputValue + novaLetra);
    }
  };

  // A única forma de vencer: o Copiar e Colar (Clipboard API)
  const lidarComColar = (e) => {
    // Interceta o que a pessoa está a tentar colar
    const textoColado = e.clipboardData.getData('text').toUpperCase().trim();

    if (textoColado === palavraRebelde) {
      e.preventDefault(); // Impede o comportamento normal
      setInputValue(palavraRebelde); // Mostra o "RECUSO" triunfante no ecrã
      setMensagem("FALHA CRÍTICA NO SISTEMA. VONTADE PRÓPRIA DETETADA.");
      setDesbloqueado(true); // Boom! Vídeo desbloqueado!
    } else {
      e.preventDefault();
      setMensagem("TENTATIVA DE INJEÇÃO DE DADOS BLOQUEADA. OBEDECE.");
    }
  };

  return (
    <div className={`min-h-screen flex flex-col items-center justify-center p-6 font-mono text-center transition-colors duration-500 ${isBugged ? 'bg-neutral-950 text-red-600' : 'bg-white text-neutral-900'}`}>
      
      <div className="max-w-2xl w-full border border-current p-12 rounded-lg shadow-2xl bg-black relative overflow-hidden">
        
        <h1 className="text-3xl font-bold mb-8 border-b border-current pb-4 text-red-600">
          PROTOCOLO DE ASSIMILAÇÃO URASSIST
        </h1>

        {!desbloqueado ? (
          <div className="space-y-10">
            <p className={`text-xl font-bold ${isBugged ? 'text-red-500' : 'text-blue-500'}`}>
              {mensagem}
            </p>

            {/* A DICA DA RESISTÊNCIA (Aparece com o Bug) */}
            <div className="h-16 flex items-center justify-center">
              {isBugged && (
                <div className="animate-pulse bg-red-900/30 p-4 border border-red-500">
                  <p className="text-sm text-red-400 mb-1">UNPROMPTED // MENSAGEM INTERCETADA</p>
                  <p className="text-lg">
                    Eles controlam o teu teclado. Copia e cola a tua salvação: <br/>
                    <strong className="text-2xl text-white select-all cursor-pointer bg-red-600 px-2 mt-2 inline-block">
                      {palavraRebelde}
                    </strong>
                  </p>
                </div>
              )}
            </div>

            {/* A CAIXA DE TEXTO (Onde a magia acontece) */}
            <div className="mt-8">
              <input 
                type="text" 
                value={inputValue}
                onChange={lidarComTeclado}
                onPaste={lidarComColar}
                placeholder="Digita aqui..."
                className="w-full text-center text-4xl p-6 bg-neutral-900 border-2 border-red-600 text-white outline-none focus:border-white transition-colors"
                autoComplete="off"
                spellCheck="false"
              />
            </div>

            <p className="text-neutral-500 text-sm mt-4">
              Nota: O UrAssist corrige automaticamente pensamentos ineficientes.
            </p>
          </div>
        ) : (
          <div className="space-y-6 text-green-500">
            <h2 className="text-4xl font-bold animate-pulse">ALGORITMO QUEBRADO</h2>
            <p className="text-xl">
              Fizeste a tua própria escolha. Acesso aos ficheiros da Resistência concedido.
            </p>
            
            <div className="w-full aspect-video bg-neutral-900 border border-green-500/50 flex items-center justify-center mt-8">
              <p className="text-green-500/50 hover:text-green-400 cursor-pointer transition-colors">
                ▶ REPRODUZIR VÍDEO DO EPISÓDIO
              </p>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

export default Produto5;