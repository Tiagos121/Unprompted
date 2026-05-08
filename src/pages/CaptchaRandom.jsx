import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';

// Importa todos os teus desafios guardados na nova pasta
import Desafio1 from '../desafios/Desafio1';
import Desafio2 from '../desafios/Desafio2';
import Desafio3 from '../desafios/Desafio3';
import Desafio4 from '../desafios/Desafio4';
import Desafio5 from '../desafios/Desafio5';

// Coloca-os num array
const TODOS_OS_DESAFIOS = [Desafio1, Desafio2, Desafio3, Desafio4, Desafio5];

function CaptchaRandom({ isBugged }) {
  const { id } = useParams(); // Sabe qual é o produto que queremos ver
  
  const [indiceSorteado, setIndiceSorteado] = useState(null);

  useEffect(() => {
    // O setTimeout cala o erro do React e adiciona 1.5s de suspense corporativo!
    const temporizador = setTimeout(() => {
      const sorteio = Math.floor(Math.random() * TODOS_OS_DESAFIOS.length);
      setIndiceSorteado(sorteio);
    }, 1500);

    return () => clearTimeout(temporizador);
  }, []);

  // O ecrã de loading que agora vai aparecer durante 1.5 segundos
  if (indiceSorteado === null) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-black text-white font-mono animate-pulse">
        A iniciar verificação de segurança da UrWell...
      </div>
    );
  }

  // Extrai o componente certo baseado no número sorteado
  const DesafioEscolhido = TODOS_OS_DESAFIOS[indiceSorteado];

  return (
    <div>
      {/* Mostra o desafio sorteado e passa-lhe o ID do produto */}
      <DesafioEscolhido isBugged={isBugged} idProduto={id} />
    </div>
  );
}

export default CaptchaRandom;