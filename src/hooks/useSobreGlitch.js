import { useState, useEffect } from 'react';

export function useSobreGlitch(isAdmin, isBuggedGlobal) {
  const [glitchAtivo, setGlitchAtivo] = useState(false);

  useEffect(() => {
    if (isAdmin || isBuggedGlobal) {
      return;
    }

    let timeoutId;

    const executarCiclo = () => {
      
      setGlitchAtivo(true);

      
      timeoutId = setTimeout(() => {
        setGlitchAtivo(false);

        
        const proximaPausa = Math.floor(Math.random() * (20000 - 10000) + 10000);
        timeoutId = setTimeout(executarCiclo, proximaPausa);
        
      }, 5000); 
    };

    
    const arranque = setTimeout(executarCiclo, 4000);

    return () => {
      clearTimeout(arranque);
      clearTimeout(timeoutId);
      setGlitchAtivo(false);
    };
  }, [isAdmin, isBuggedGlobal]);

  return glitchAtivo;
}