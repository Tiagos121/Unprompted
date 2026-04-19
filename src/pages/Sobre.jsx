import React from 'react';

function Sobre() {
  return (
    <div className="page-container">
      
      <section className="page-header">
        <h1>Sobre a UrWell</h1>
        <p>A otimizar a humanidade, um pensamento de cada vez. Fundada com o propósito de erradicar o caos mental.</p>
      </section>

      <section className="team-section">
        <h2>A Nossa Equipa Diretiva</h2>
        <div className="team-grid">
          <div className="team-member">
            <div className="member-photo placeholder-ceo"></div>
            <h3>Dr. Elias Vance</h3>
            <p>CEO & Visionário</p>
          </div>
          <div className="team-member">
            <div className="member-photo placeholder-cto"></div>
            <h3>Sarah Jenkins</h3>
            <p>Diretora de Sincronia Neural</p>
          </div>
          <div className="team-member">
            <div className="member-photo placeholder-ai"></div>
            <h3>Unidade Gestora 04</h3>
            <p>Otimização de Recursos</p>
          </div>
        </div>
      </section>

      {/* EASTER EGG: Texto minúsculo no fim da página */}
      <div className="legal-text">
        <p>UrWell Corp. O seu bem-estar é a nossa propriedade.</p>
        <a href="#" className="easter-egg-link" onClick={(e) => {
            e.preventDefault();
            alert("ACESSO NEGADO. O SEU IP FOI REGISTADO.");
        }}>
           [Acesso de Sistema]
        </a>
      </div>

    </div>
  );
}

export default Sobre;