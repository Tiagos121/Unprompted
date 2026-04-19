import React from 'react';

function Novidades() {
  return (
    <div className="page-container">
      
      <section className="page-header">
        <h1>Comunicados Oficiais</h1>
        <p>As últimas atualizações do ecossistema UrWell.</p>
      </section>

      <div className="news-list">
        
        {/* Post Normal */}
        <article className="news-card">
          <div className="news-date">12 de Maio, 2026</div>
          <h3>UrWell atinge 1 Milhão de Mentes Sincronizadas</h3>
          <p>É com orgulho que anunciamos um marco histórico. Mais de um milhão de utilizadores já abdicaram do stress diário em prol da nossa otimização algorítmica. O futuro é sereno.</p>
          <button className="btn-secondary">Ler Press Release</button>
        </article>

        {/* Post com "Red Flags" (Pista ARG) */}
        <article className="news-card">
          <div className="news-date">04 de Abril, 2026</div>
          <h3>Atualização de Firmware: UrSync v2.4</h3>
          <p>A nova atualização melhora a estabilidade de conexão. Nota: Alguns utilizadores relataram memórias que não lhes pertencem. A UrWell garante que isto é um efeito secundário temporário da otimização. Não resistam à recalibração.</p>
          <button className="btn-secondary">Aceitar Atualização</button>
        </article>

      </div>

    </div>
  );
}

export default Novidades;