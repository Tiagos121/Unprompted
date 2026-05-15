import { useState, useEffect } from 'react';

export function useSobreGlitch(isAdmin, isBuggedGlobal) {
  const [glitchAtivo, setGlitchAtivo] = useState(false);

  useEffect(() => {
    if (isAdmin || isBuggedGlobal) {
      return;
    }

    let timeoutId;

    const executarCiclo = () => {
      // 1. A página é intercetada (Fica preta e o texto muda)
      setGlitchAtivo(true);

      // 2. Agora fica "bugado" durante 5 SEGUNDOS inteiros para dar tempo de ler!
      timeoutId = setTimeout(() => {
        setGlitchAtivo(false);

        // 3. Espera um tempo aleatório entre 10 a 20 segundos para o próximo "ataque"
        const proximaPausa = Math.floor(Math.random() * (20000 - 10000) + 10000);
        timeoutId = setTimeout(executarCiclo, proximaPausa);
        
      }, 5000); // <-- Aqui mudámos de 800 para 5000!
    };

    // O primeiro sinal de vida da Resistência aparece 4 segundos após abrir a página
    const arranque = setTimeout(executarCiclo, 4000);

    return () => {
      clearTimeout(arranque);
      clearTimeout(timeoutId);
      setGlitchAtivo(false);
    };
  }, [isAdmin, isBuggedGlobal]);

  return glitchAtivo;
}