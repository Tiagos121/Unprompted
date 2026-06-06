import { useState, useEffect } from 'react';
import Swal from 'sweetalert2';

const sleep = (ms) => new Promise(resolve => setTimeout(resolve, ms));

export function useGlitchDinamico(isAdmin, isBugged) {
  const [glitch, setGlitch] = useState({ ativo: false, classe: '' });

  useEffect(() => {
    if (isAdmin || isBugged) {
      return;
    }

    let isMounted = true; 

    const guiaoDoGlitch = async () => {
      await sleep(5000); 

      while (isMounted) {
        
        if (!isMounted) break;
        await Swal.fire({
          title: "FALHA CRÍTICA DE SISTEMA",
          text: "O sinal da UrWell está a ser intercetado...",
          icon: "error",
          background: "#0a0a0a",
          color: "#ff0000",
          showConfirmButton: false,
          timer: 3000,
          allowOutsideClick: false
        });

        
        if (!isMounted) break;
        setGlitch({ ativo: true, classe: 'efeito-glitch-agressivo' });
        await sleep(2000); 

       
        if (!isMounted) break;
        setGlitch({ ativo: true, classe: 'efeito-glitch-estatico' });
        await sleep(45000);

        
        if (!isMounted) break;
        setGlitch({ ativo: true, classe: 'efeito-glitch-agressivo' });
        await sleep(1500);

        
        if (!isMounted) break;
        setGlitch({ ativo: false, classe: '' });

       
        if (!isMounted) break;
        const Toast = Swal.mixin({
          toast: true,
          position: "top-end",
          showConfirmButton: false,
          timer: 4000, 
          timerProgressBar: true,
        });
        await Toast.fire({
          icon: "success",
          title: "Anomalia isolada e corrigida.",
          text: "O sistema UrWell encontra-se estável."
        });

        
        if (!isMounted) break;
        await sleep(60000); 
      }
    };

    
    guiaoDoGlitch();

    
    return () => {
      isMounted = false;
      setGlitch({ ativo: false, classe: '' });
    };
  }, [isAdmin, isBugged]);

  return glitch;
}