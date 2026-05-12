import { useState, useEffect } from 'react';
import Swal from 'sweetalert2';

// Função utilitária para fazer o código "esperar" o tempo exato (em milissegundos)
const sleep = (ms) => new Promise(resolve => setTimeout(resolve, ms));

export function useGlitchDinamico(isAdmin, isBugged) {
  const [glitch, setGlitch] = useState({ ativo: false, classe: '' });

  useEffect(() => {
    // CORREÇÃO DO ERRO: Como o estado inicial já é "false", só precisamos de dar return!
    // Assim o ESLint já não se queixa de estarmos a forçar um "setState" síncrono.
    if (isAdmin || isBugged) {
      return;
    }

    let isMounted = true; // Impede que o código corra se o utilizador mudar de página

    const guiaoDoGlitch = async () => {
      // Espera 5 segundos assim que a página abre, antes de começar o ataque
      await sleep(5000); 

      // O CICLO INFINITO DA RESISTÊNCIA
      while (isMounted) {
        
        // 1. O ATAQUE INICIAL (Pop-up Vermelho)
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

        // 2. ENTRADA AGRESSIVA (Treme muito durante 2s)
        if (!isMounted) break;
        setGlitch({ ativo: true, classe: 'efeito-glitch-agressivo' });
        await sleep(2000); 

        // 3. A REVELAÇÃO (Fica parado muito tempo para dar para ler)
        if (!isMounted) break;
        setGlitch({ ativo: true, classe: 'efeito-glitch-estatico' });
        await sleep(45000); // 45 SEGUNDOS parados!

        // 4. A URWELL TENTA RECUPERAR (Treme mais um pouco antes de fechar)
        if (!isMounted) break;
        setGlitch({ ativo: true, classe: 'efeito-glitch-agressivo' });
        await sleep(1500);

        // 5. O SINAL VOLTA AO NORMAL
        if (!isMounted) break;
        setGlitch({ ativo: false, classe: '' });

        // 6. MENSAGEM DA URWELL (Sinal Restaurado)
        if (!isMounted) break;
        const Toast = Swal.mixin({
          toast: true,
          position: "top-end",
          showConfirmButton: false,
          timer: 4000, // O aviso verde fica no canto durante 4 segundos
          timerProgressBar: true,
        });
        await Toast.fire({
          icon: "success",
          title: "Anomalia isolada e corrigida.",
          text: "O sistema UrWell encontra-se estável."
        });

        // 7. PAUSA LONGA (Onde não acontece nada)
        if (!isMounted) break;
        await sleep(60000); // 1 minuto de pausa antes de repetir a história
      }
    };

    // Iniciar a "peça de teatro"
    guiaoDoGlitch();

    // Limpeza: Se o utilizador sair da página, limpamos aqui o estado de forma segura
    return () => {
      isMounted = false;
      setGlitch({ ativo: false, classe: '' });
    };
  }, [isAdmin, isBugged]);

  return glitch;
}