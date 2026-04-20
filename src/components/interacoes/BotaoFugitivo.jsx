import React, { useState } from 'react';
import '../../styles/interacoes.css'; // Importa os estilos específicos das interações

function BotaoFugitivo() {
  const [style, setStyle] = useState({});

  const fugir = () => {
    const x = Math.random() * 80;
    const y = Math.random() * 80;
    setStyle({
      position: 'absolute',
      left: `${x}%`,
      top: `${y}%`,
      transition: '0.1s ease-out'
    });
  };

  const clicar = () => {
    alert("CONEXÃO ESTABELECIDA. A REDIRECIONAR...");
    // window.location.href = "LINK_DO_EPISODIO_1";
  };

  return (
    <div className="interacao-container">
      <button 
        className="btn-primary botao-fugitivo" 
        style={style} 
        onMouseEnter={fugir} 
        onClick={clicar}
      >
        ATIVAR_URSYNC
      </button>
    </div>
  );
}

export default BotaoFugitivo;