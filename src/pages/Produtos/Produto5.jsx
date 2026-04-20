import React from 'react';
import BotaoGlitch from '../../components/interacoes/BotaoGlitch';

function Produto5({ isBugged }) { // Passamos o estado do bug para o produto
  const handleAction = () => {
    alert("SISTEMA_CRÍTICO: EMPATIA_OFF");
    // window.location.href = "LINK_EPISODIO_5";
  };

  return (
    <div className="page-container">
      <h1>UrVoice</h1>
      <div className="interacao-container">
        <h3>Desativação de Consciência</h3>
        <p style={{ marginBottom: '30px' }}>Clique para forçar a desconexão neural.</p>
        
        <BotaoGlitch 
          label={isBugged ? "FORÇAR_OVERRIDE" : "Desligar Empatia"} 
          onClick={handleAction}
          isBugged={isBugged}
        />
      </div>
    </div>
  );
}

export default Produto5;