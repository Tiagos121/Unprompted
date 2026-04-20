import React, { useState, useEffect } from 'react';

function Produto3() {
  const [glitch, setGlitch] = useState(false);

  useEffect(() => {
    // O glitch ativa automaticamente passados 4 segundos
    const timer = setTimeout(() => {
      setGlitch(true);
    }, 4000);
    return () => clearTimeout(timer);
  }, []);

  const handleClick = () => {
    alert("ERRO DE SISTEMA. MEMÓRIA CORROMPIDA.");
    // window.location.href = "LINK_DO_EPISODIO_3";
  };

  return (
    <div className="page-container">
      <div className="product-detail-layout">
        <div className="product-detail-image" style={{ backgroundColor: glitch ? '#000' : '#F5F5F7' }}>
           {glitch && <div style={{ color: 'red', padding: '50px', fontFamily: 'Space Mono' }}>[SINAL PERDIDO]</div>}
        </div>
        
        <div className="product-detail-info">
          <h1 style={{ color: glitch ? 'red' : 'inherit' }}>UrMate</h1>
          <p className="product-price">STATUS: {glitch ? 'SISTEMA COMPROMETIDO' : 'ESGOTADO'}</p>
          
          {!glitch ? (
            <p className="product-desc">
              O Supressor de Sonhos UrMate atingiu o limite de produção. Devido ao elevado número de utilizadores que optaram por não sonhar para otimizar as suas 8 horas de repouso, não aceitamos novas candidaturas neste momento.
            </p>
          ) : (
            <div style={{ fontFamily: 'Space Mono', color: 'red', marginBottom: '30px' }}>
              <p> AVISO: Mentes não suprimidas estão a comunicar.</p>
              <p> O bloqueio falhou.</p>
              <p> Acordem.</p>
            </div>
          )}

          <button 
            className={glitch ? "btn-secondary" : "btn-primary"} 
            onClick={handleClick}
            style={glitch ? { borderColor: 'red', color: 'red', width: '100%' } : { opacity: 0.5, cursor: 'not-allowed', width: '100%' }}
          >
            {glitch ? "VER_ANOMALIA" : "Notificar quando disponível"}
          </button>
        </div>
      </div>
    </div>
  );
}

export default Produto3;