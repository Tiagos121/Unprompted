import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { listaProdutos } from '../data/produtos';



// Dados dos testemunhos para o slider
const testemunhos = [
  {
    img: "https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?q=80&w=400&auto=format&fit=crop",
    quote: "\"Desde que instalei o UrSync, nunca mais tive o fardo de tomar uma decisão difícil. A máquina sabe sempre o que é melhor.\"",
    author: "Marta Silva, Estudante Otimizada"
  },
  {
    img: "https://images.unsplash.com/photo-1560250097-0b93528c311a?q=80&w=400&auto=format&fit=crop",
    quote: "\"O UrMate convenceu-me de que o mundo lá fora é tóxico. Agora vivo em paz, apenas no meu quarto, conectado 24/7.\"",
    author: "João Pedro, Utilizador Retido"
  },
  {
    img: "https://images.unsplash.com/photo-1580489944761-15a19d654956?q=80&w=400&auto=format&fit=crop",
    quote: "\"Os meus níveis de felicidade estão em 100%. A UrWell regulou a química do meu cérebro para eu nunca mais sentir ansiedade laboral.\"",
    author: "Carlos Teixeira, Trabalhador Submisso"
  }
];

function Home({ isBugged }) {
  // Estado para controlar o índice do testemunho visível
  const [indiceAtual, setIndiceAtual] = useState(0);

  // Função para navegar entre os testemunhos
  const mudarTestemunho = (direcao) => {
    let novoIndice = indiceAtual + direcao;
    if (novoIndice < 0) novoIndice = testemunhos.length - 1;
    if (novoIndice >= testemunhos.length) novoIndice = 0;
    setIndiceAtual(novoIndice);
  };

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
          {listaProdutos.map((produto) => (
            /* 2. Envolvemos o cartão com o Link usando o id do produto */
            <Link 
              to={`/detalhes/${produto.id}`} 
              key={produto.id} 
              className="product-card" 
              style={{ 
                backgroundImage: `url(${produto.img})`,
                textDecoration: 'none' // Garante que não aparecem sublinhados de link
              }}
            >
              <div className="product-info">
                <h3>{produto.nome}</h3>
                <p>{produto.slogan}</p>
              </div>
            </Link>
          ))}
        </div>
      </section>

      {/* BLOCO 5: Os Nossos Valores */}
      <section className="values-section">
        <div className="values-text">
          <h2>Os nossos Valores</h2>
          <h4 className='values-subtitle'>Segurança, Otimização, Submissão Voluntária</h4>
          <br />
          <p>A paz de espírito não é um acaso, é um sistema perfeitamente desenhado. Na UrWell, acreditamos que a verdadeira liberdade nasce quando abdica do caos das escolhas diárias.</p>
        </div>
        <div className="values-image"></div>
      </section>

      {/* NOVO BLOCO 6: Testemunhos (Slider) */}
      <section className="testimonials-section">
        <button className="nav-arrow" onClick={() => mudarTestemunho(-1)}>
          &#10094;
        </button>
        
        <div className="testimonial-content">
          <img 
            className="testimonial-image" 
            src={testemunhos[indiceAtual].img} 
            alt="Testemunho" 
            style={{ 
              filter: isBugged ? 'grayscale(100%) contrast(150%) brightness(0.8)' : 'none',
              transition: 'filter 0.3s'
            }}
          />
          <div className="testimonial-quote">
            {testemunhos[indiceAtual].quote}
          </div>
          <div className="testimonial-author">
            {/* Se estiver bugado, o nome do autor muda para algo mais sinistro */}
            {isBugged ? 'SUJEITO_RECALIBRADO' : testemunhos[indiceAtual].author}
          </div>
        </div>
        
        <button className="nav-arrow" onClick={() => mudarTestemunho(1)}>
          &#10095;
        </button>
      </section>

    </div>
  );
}

export default Home;