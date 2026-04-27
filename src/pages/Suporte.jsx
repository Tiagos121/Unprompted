import React from 'react';

function Suporte({ isBugged }) {
  const faqs = [
    {
      q: "O meu dispositivo UrSync emite um zumbido constante. É normal?",
      a: isBugged 
        ? "O zumbido é a frequência de ressonância da tua alma a ser apagada. Ignora-o. Já não és tu quem ouve."
        : "Sim. O 'Hum de Harmonia' indica que o dispositivo está a sincronizar as suas ondas cerebrais com a rede central da UrWell."
    },
    {
      q: "Perdi a sensibilidade nas mãos após a instalação do Vision BCI.",
      a: isBugged
        ? "Mãos que não sentem, não hesitam. A tua nova função é apenas executar. O tato é uma distração biológica obsoleta."
        : "Trata-se de uma fase de adaptação. O seu cérebro está a priorizar o processamento visual de alta fidelidade em vez de estímulos táteis periféricos."
    }
  ];

  return (
    <div className="page-container">
      <section className="sobre-hero">
        <h1 style={{ color: isBugged ? 'var(--glitch-red)' : 'inherit' }}>
          {isBugged ? 'CENTRO_DE_RECALIBRAÇÃO' : 'Centro de Apoio ao Cidadão'}
        </h1>
        <p className="sobre-lead">
          {isBugged 
            ? 'A tua submissão falhou? Reporta aqui a tua resistência para execução imediata.' 
            : 'Dúvidas sobre a sua otimização? Estamos aqui para garantir que a sua mente nunca saia do trilho.'}
        </p>
      </section>

      <section className="suporte-content" style={{ maxWidth: '800px', margin: '0 auto', padding: '0 5% 80px 5%' }}>
        
        {/* FAQs */}
        <div className="faq-section">
          <h2 style={{ marginBottom: '30px' }}>Perguntas Frequentes</h2>
          {faqs.map((faq, i) => (
            <div key={i} className="valor-card" style={{ marginBottom: '20px', textAlign: 'left' }}>
              <h3 style={{ fontSize: '1.1rem', color: isBugged ? 'var(--glitch-red)' : 'var(--urwell-blue)' }}>{faq.q}</h3>
              <p style={{ marginTop: '10px', fontSize: '0.95rem' }}>{faq.a}</p>
            </div>
          ))}
        </div>

        {/* Formulário de "Contacto" */}
        <div className="bci-form-container" style={{ marginTop: '60px', background: isBugged ? '#111' : '#f5f5f7' }}>
          <h3>{isBugged ? 'REPORTAR_DISSIDÊNCIA' : 'Submeter Relatório de Incidente'}</h3>
          <div className="form-step">
            <label>ID de Cidadão</label>
            <input type="text" placeholder="Ex: UW-9922-01" />
            
            <label>Descrição da Anomalia</label>
            <textarea 
              placeholder={isBugged ? "Onde dói a tua consciência?" : "Descreva o sintoma..."} 
              style={{ width: '100%', padding: '15px', borderRadius: '8px', border: '1px solid #ddd', minHeight: '100px' }}
            ></textarea>
            
            <button 
              className="btn-primary" 
              style={{ marginTop: '20px', width: '100%', background: isBugged ? 'var(--glitch-red)' : 'black' }}
              onClick={() => alert(isBugged ? "LOCALIZAÇÃO RASTREADA. NÃO TE MOVAS." : "Relatório enviado. Mantenha-se em paz.")}
            >
              {isBugged ? 'CONFESSAR' : 'Enviar Relatório'}
            </button>
          </div>
        </div>
      </section>
    </div>
  );
}

export default Suporte;