import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { listaProdutos } from '../data/produtos';
import Swal from 'sweetalert2';

// Imagens dos testemunhos
import imgReview1 from '../assets/user_review1.png';
import imgReview2 from '../assets/user_review2.png';
import imgReview3 from '../assets/user_review3.png';

// Dados dos testemunhos para o slider
const testemunhos = [
  {
    img: imgReview1,
    quote: "\"Desde que instalei o UrSync, nunca mais tive o fardo de tomar uma decisão difícil. A máquina sabe sempre o que é melhor.\"",
    author: "Marta Silva, Estudante Otimizada"
  },
  {
    img: imgReview2,
    quote: "\"O UrMate convenceu-me de que o mundo lá fora é tóxico. Agora vivo em paz, apenas no meu quarto, conectado 24/7.\"",
    author: "João Pedro, Utilizador Retido"
  },
  {
    img: imgReview3,
    quote: "\"Os meus níveis de felicidade estão em 100%. A UrWell regulou a química do meu cérebro para eu nunca mais sentir ansiedade laboral.\"",
    author: "Carlos Teixeira, Trabalhador Submisso"
  }
];

function Home({ isBugged }) {
  const [indiceAtual, setIndiceAtual] = useState(0);
  const navigate = useNavigate();

  const mudarTestemunho = (direcao) => {
    let novoIndice = indiceAtual + direcao;
    if (novoIndice < 0) novoIndice = testemunhos.length - 1;
    if (novoIndice >= testemunhos.length) novoIndice = 0;
    setIndiceAtual(novoIndice);
  };

  // Efeito do Botão Principal da Homepage
  const handleIniciarUrSync = () => {
    if (isBugged) {
      Swal.fire({
        title: "ALERTA DE INTRUSÃO",
        text: "Eles usam o UrSync para te apagar. NÃO OS DEIXES ENTRAR NA TUA CABEÇA.",
        icon: "error",
        background: "#0a0a0a",
        color: "#FF0000",
        confirmButtonColor: "#FF0000",
        confirmButtonText: "ENTENDIDO",
        allowOutsideClick: false
      }).then(() => {
        navigate('/captcha/1'); // Atira para a armadilha do produto 1!
      });
    } else {
      Swal.fire({
        title: "A Iniciar Sincronização...",
        html: "Por favor, mantenha o olhar fixo no ecrã.<br/><br/><span style='color: #888;'>A calibrar frequências neurais...</span>",
        timer: 3000, 
        timerProgressBar: true,
        showConfirmButton: false, 
        allowOutsideClick: false,
        didOpen: () => {
          Swal.showLoading(); 
        }
      }).then(() => {
        navigate('/captcha/1'); // Atira para a armadilha do produto 1!
      });
    }
  };

  return (
    <div className="home-container">
      
      {/* BLOCO 1: Imagem de Topo */}
      <div className="hero-image-block"></div>

      {/* BLOCO 2: Headline e CTA */}
      <section className="hero-text-block">
        <h1>Sabemos o que precisas antes de saberes que precisas.</h1>
        <p>A tecnologia de interface neural que sincroniza o teu cérebro com o futuro. Foco absoluto. Zero distrações.</p>
        <button onClick={handleIniciarUrSync} className="btn-primary">
          {isBugged ? 'CANCELAR SINCRONIZAÇÃO' : 'Iniciar UrSync'}
        </button>
      </section>

      {/* BLOCO 3: Imagem Divisória */}
      <div className="divider-image"></div>

      {/* BLOCO 4: Os Nossos Produtos */}
      <section className="products-section">
        <h2 className="section-title">Os nossos Produtos</h2>
        <p className="section-subtitle">Qualidade, Segurança, Confiança</p>
        
        <div className="products-carousel">
          {listaProdutos.map((produto) => (
            /* A MAGIA AQUI: O Link agora vai para /captcha/id em vez de /detalhes/id */
            <Link 
              to={`/captcha/${produto.id}`} 
              key={produto.id} 
              className="product-card" 
              style={{ 
                backgroundImage: `url(${produto.img})`,
                textDecoration: 'none'
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

      {/* BLOCO 6: Testemunhos (Slider) */}
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