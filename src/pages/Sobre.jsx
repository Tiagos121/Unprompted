import React from 'react';

function Sobre({ isBugged }) {
  return (
    <div className="page-container">
      
      {/* 1. HERO SECTION */}
      <section className="sobre-hero">
        <h1 style={{ fontFamily: isBugged ? 'var(--fonte-mono)' : 'inherit', color: isBugged ? 'var(--glitch-red)' : 'inherit' }}>
          {isBugged ? 'A_ILUSÃO_DO_LIVRE_ARBÍTRIO' : 'O Fim do Caos Mental'}
        </h1>
        <p className="sobre-lead">
          {isBugged 
            ? 'Nós não otimizamos. Nós subjugamos. O teu cérebro é o nosso novo hardware. Bem-vindo à tua prisão de carne.' 
            : 'A UrWell foi fundada com um único propósito: libertar a humanidade do fardo exaustivo do pensamento crítico. O seu cérebro não foi feito para a sobrecarga moderna. Nós assumimos o controlo.'}
        </p>
      </section>

      {/* 2. MISSÃO & VISÃO (Preparado para distorção futura) */}
      <section className="sobre-missao-visao">
        <div className="text-block">
          <h2>{isBugged ? 'O_NOSSO_VÍRUS' : 'A Nossa Missão'}</h2>
          {/* É neste <p> que mais tarde vamos aplicar o efeito de letras a distorcer */}
          <p className="texto-distorcer-futuro">
            {isBugged 
              ? 'Infiltrar cada sinapse e destruir a individualidade. O caos é a vossa humanidade, e nós vamos apagá-la.' 
              : 'Desenvolver interfaces neurais passivas que filtram, processam e decidem por si. Garantimos uma vida sem stress, eliminando a margem para o erro humano e a ansiedade da escolha diária.'}
          </p>

          <h2 style={{ marginTop: '40px' }}>{isBugged ? 'O_FUTURO_MORTO' : 'A Nossa Visão'}</h2>
          <p className="texto-distorcer-futuro">
            {isBugged 
              ? 'Um enxame de mentes oucas, a trabalhar em perfeita escravidão corporativa para enriquecer a elite invisível.' 
              : 'Uma rede global de mentes perfeitamente sincronizadas, onde a eficiência corporativa e a paz individual coexistem numa utopia de harmonia biológica.'}
          </p>
        </div>
        
        <div className="image-block sobre-image-1" style={{ filter: isBugged ? 'grayscale(100%) contrast(200%)' : 'none' }}></div>
      </section>

      {/* 3. OS PILARES */}
      <section className="sobre-valores">
        <h2 style={{ textAlign: 'center', marginBottom: '40px' }}>
          {isBugged ? 'PROTOCOLOS_DE_CONTROLO' : 'Os Pilares UrWell'}
        </h2>
        <div className="valores-grid">
          <div className="valor-card">
            <h3>{isBugged ? 'CENSURA_ABSOLUTA' : 'Segurança Cognitiva'}</h3>
            <p>{isBugged ? 'O que não sabes, não nos pode revoltar. Apagamos a dissidência na origem.' : 'Protegemos a sua mente de informações não otimizadas.'}</p>
          </div>
          <div className="valor-card">
            <h3>{isBugged ? 'MÁQUINAS_DE_CARNE' : 'Eficiência Extrema'}</h3>
            <p>{isBugged ? 'Trabalhar até o corpo ceder. Sem pausas. Sem queixas.' : 'Maximizamos o seu rendimento laboral ajustando neuroquímicos.'}</p>
          </div>
          <div className="valor-card">
            <h3>{isBugged ? 'RENDIÇÃO_TOTAL' : 'Submissão Voluntária'}</h3>
            <p>{isBugged ? 'Tu assinaste o contrato sem ler. Agora é tarde demais.' : 'A verdadeira liberdade só se alcança entregando o volante a quem sabe o caminho.'}</p>
          </div>
        </div>
      </section>

    </div>
  );
}

export default Sobre;