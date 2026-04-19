import React from 'react';

function Home() {
  return (
    <div className="home-container">
      
      {/* BLOCO 1: Imagem de Topo */}
      <div className="hero-image-block"></div>

      {/* BLOCO 2: Headline e CTA */}
      <section className="hero-text-block">
        <h1>Sabemos o que precisas antes de saberes que precisas.</h1>
        <p>A tecnologia de interface neural que sincroniza o teu cérebro com o futuro. Foco absoluto. Zero distrações.</p>
        <button className="btn-primary">Iniciar UrSync</button>
      </section>

      {/* BLOCO 3: Imagem Divisória */}
      <div className="divider-image"></div>

      {/* BLOCO 4: Os Nossos Produtos */}
      <section className="products-section">
        <h2 className="section-title">Os nossos Produtos</h2>
        <p className="section-subtitle">Qualidade, Segurança, Confiança</p>
        
        <div className="products-carousel">
          <div className="product-card"><h3>UrSync</h3></div>
          <div className="product-card"><h3>UrMate</h3></div>
          <div className="product-card"><h3>UrDigest</h3></div>
          <div className="product-card"><h3>UrVoice</h3></div>
        </div>
      </section>

      {/* BLOCO 5: Os Nossos Valores */}
      <section className="values-section">
        <div className="values-text">
          <h2>Os nossos Valores</h2>
          <h4>Segurança, Otimização, Submissão Voluntária</h4>
          <p>A paz de espírito não é um acaso, é um sistema perfeitamente desenhado. Na UrWell, acreditamos que a verdadeira liberdade nasce quando abdica do caos das escolhas diárias.</p>
        </div>
        <div className="values-image"></div>
      </section>

    </div>
  );
}

export default Home;