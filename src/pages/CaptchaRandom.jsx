import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';

import Desafio1 from '../desafios/Desafio1';
import Desafio2 from '../desafios/Desafio2';
import Desafio3 from '../desafios/Desafio3';
import Desafio4 from '../desafios/Desafio4';
import Desafio5 from '../desafios/Desafio5';


const TODOS_OS_DESAFIOS = [Desafio1, Desafio2, Desafio3, Desafio4, Desafio5];

function CaptchaRandom({ isBugged }) {
  const { id } = useParams(); 
  
  const [indiceSorteado, setIndiceSorteado] = useState(null);

  useEffect(() => {

    const temporizador = setTimeout(() => {
      const sorteio = Math.floor(Math.random() * TODOS_OS_DESAFIOS.length);
      setIndiceSorteado(sorteio);
    }, 1500);

    return () => clearTimeout(temporizador);
  }, []);


  if (indiceSorteado === null) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-black text-white font-mono animate-pulse">
        A iniciar verificação de segurança da UrWell...
      </div>
    );
  }


  const DesafioEscolhido = TODOS_OS_DESAFIOS[indiceSorteado];

  return (
    <div>
      <DesafioEscolhido isBugged={isBugged} idProduto={id} />
    </div>
  );
}

export default CaptchaRandom;