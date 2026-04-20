import React, { useState } from 'react';

function Produto4() {
  const [filterLevel, setFilterLevel] = useState(0);

  const handleRedirect = () => {
    alert("IGNORÂNCIA ATIVADA COM SUCESSO.");
    // window.location.href = "LINK_DO_EPISODIO_4";
  };

  return (
    <div className="page-container">
      <div className="product-detail-layout">
        <div className="product-detail-image" style={{ filter: `blur(${filterLevel / 10}px)` }}>
           {/* A imagem vai ficando cada vez mais desfocada conforme o utilizador mexe na barra */}
        </div>
        
        <div className="product-detail-info">
          <h1>UrDigest</h1>
          <p className="product-price">Assinatura Mensal: 19.99€</p>
          <p className="product-desc">
            A realidade é demasiado complexa e stressante. O UrDigest é um filtro neural que bloqueia automaticamente notícias negativas, opiniões contrárias às suas e stress visual. Defina o seu nível de ignorância preferido abaixo.
          </p>

          <div className="bci-form-container">
            <h3>Nível de Filtro de Realidade</h3>
            <div style={{ margin: '30px 0' }}>
              <input 
                type="range" 
                min="0" 
                max="100" 
                value={filterLevel} 
                onChange={(e) => setFilterLevel(e.target.value)}
                style={{ width: '100%' }}
              />
              <p style={{ textAlign: 'center', marginTop: '15px', fontWeight: 'bold' }}>
                {filterLevel}% da realidade bloqueada
              </p>
            </div>

            {filterLevel === "100" ? (
              <button className="btn-primary" style={{ width: '100%', backgroundColor: 'red' }} onClick={handleRedirect}>
                CONFIRMAR CEGUEIRA (Episódio 4)
              </button>
            ) : (
              <p style={{ fontSize: '0.8rem', color: '#888', textAlign: 'center' }}>
                Para sua segurança, exigimos 100% de bloqueio para prosseguir.
              </p>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

export default Produto4;