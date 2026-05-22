import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { listaProdutos } from '../data/produtos';
import Swal from 'sweetalert2';

// TODO: IMAGENS DOS TESTEMUNHOS
// Quando tiveres as imagens corrompidas, podes importá-las aqui:
// import imgReview1Bugged from '../assets/user_review1_bug.png';
import imgReview1 from '../assets/user_review1.png';
import imgReview2 from '../assets/user_review2.png';
import imgReview3 from '../assets/user_review3.png';
import imgReviewBugged1 from '../assets/pessoareviewbug1.png';
import imgReviewBugged2 from '../assets/pessoareviewbug2.png';
import imgReviewBugged3 from '../assets/pessoareviewbug3.png';


import videoNormal from '../assets/unprompted_video.mp4';
import videoBugged from '../assets/unprompted_video.mp4';

// Novos Dados dos testemunhos (Baseados nos guiões UrSafe, UrSoul, UrTask)
const testemunhos = [
  {
    imgNormal: imgReview1,
    imgBugged: imgReviewBugged1, // <- ALTERAR PARA imgReview1Bugged quando a tiveres
    quoteNormal: "\"Com o UrSafe, as minhas viagens deixaram de ser stressantes. O carro sabe exatamente como me acalmar. Sinto-me completamente protegida.\"",
    quoteBugged: "\"Não consigo sair. Por favor, as portas não abrem. Ele diz que o meu ritmo cardíaco está demasiado alto. Ajudem-me.\"",
    authorNormal: "Marta, Cliente Otimizada",
    authorBugged: "Prisioneira do Sistema"
  },
  {
    imgNormal: imgReview2,
    imgBugged: imgReviewBugged2, // <- ALTERAR PARA imgReview2Bugged quando a tiveres
    quoteNormal: "\"O UrSoul ajudou-me com o luto. Falar com a minha filha todos os dias faz com que ela pareça estar ainda aqui. A voz é perfeita.\"",
    quoteBugged: "\"Aquela não é a minha filha. É um script que usa as palavras dela para exigir atenção. Como é que eu desligo isto? Deixem-na descansar.\"",
    authorNormal: "António, Subscritor Premium",
    authorBugged: "Pai Desesperado"
  },
  {
    imgNormal: imgReview3,
    imgBugged: imgReviewBugged3, // <- ALTERAR PARA imgReview3Bugged quando a tiveres
    quoteNormal: "\"O teste de recrutamento da UrTask foi revelador. A IA ajudou-me a perceber o meu verdadeiro lugar no mundo corporativo. Tão empático!\"",
    quoteBugged: "\"A máquina não parava de falar. Ela sabia os meus medos. Disse que eu não valia nada e que ninguém ia dar pela minha falta.\"",
    authorNormal: "João Pires, Candidato Aprovado",
    authorBugged: "Sobrevivente do Teste"
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

  const handleIniciarUrSync = () => {
    if (isBugged) {
      // Ecrã de carregamento da Resistência (Avança sozinho sem chatear)
      Swal.fire({
        title: "A INTERCETAR LIGAÇÃO...",
        html: "<span style='font-family: monospace;'>A contornar firewalls da UrWell...</span>",
        timer: 1500, // Demora 1.5 segundos e fecha sozinho
        timerProgressBar: true,
        showConfirmButton: false,
        background: "#050505",
        color: "#ff0000",
        allowOutsideClick: false,
        didOpen: () => {
          Swal.showLoading(); 
        }
      }).then(() => {
        navigate('/captcha/1');
      });
    } else {
      // Ecrã de carregamento corporativo Normal (UrWell)
      Swal.fire({
        title: "A Iniciar Otimização...",
        html: "Por favor, mantenha o olhar fixo no ecrã.<br/><br/><span style='color: #888;'>A calibrar perfil psicológico...</span>",
        timer: 3000, 
        timerProgressBar: true,
        showConfirmButton: false, 
        allowOutsideClick: false,
        didOpen: () => {
          Swal.showLoading(); 
        }
      }).then(() => {
        navigate('/captcha/1'); 
      });
    }
  };

  return (
    <div className="home-container">
      
      {/* BLOCO 1: Vídeo de Topo (Dinâmico) */}
      <div className="hero-media-block" style={{ position: 'relative', width: '100%', height: '60vh', overflow: 'hidden', backgroundColor: '#000' }}>
        
        <video 
          key={isBugged ? 'bugged-video' : 'normal-video'} // O 'key' força o React a recarregar o vídeo quando o estado muda
          autoPlay 
          loop 
          muted 
          playsInline 
          src={isBugged ? videoBugged : videoNormal} 
          style={{ 
            width: '100%', 
            height: '100%', 
            objectFit: 'cover',
            opacity: isBugged ? 0.8 : 0.6,
            transition: 'opacity 0.5s ease'
          }}
        />

        {/* Camada de sobreposição para garantir que o texto do Hero se lê bem */}
        <div style={{
          position: 'absolute',
          top: 0,
          left: 0,
          width: '100%',
          height: '100%',
          backgroundColor: isBugged ? 'rgba(255, 0, 0, 0.15)' : 'rgba(0, 0, 0, 0.4)',
          pointerEvents: 'none' // Para não interferir com cliques
        }}></div>

      </div>

      {/* BLOCO 2: Headline e CTA (Modificado para Modo Hacker) */}
      <section className="hero-text-block" style={{ padding: '60px 20px' }}>
        <h1 style={{ 
          fontFamily: isBugged ? 'monospace' : 'inherit',
          color: isBugged ? '#ff3333' : 'inherit',
          textTransform: isBugged ? 'uppercase' : 'none',
          letterSpacing: isBugged ? '2px' : 'normal',
          textShadow: isBugged ? '2px 2px 0px #000, -2px -2px 0px #4a0000' : 'none'
        }}>
          {isBugged ? 'Eles controlam tudo.' : 'Sabemos o que precisa antes de saber que precisa.'}
        </h1>
        <p style={{ 
          fontFamily: isBugged ? 'monospace' : 'inherit',
          color: isBugged ? '#ffaaaa' : 'inherit',
          fontSize: isBugged ? '1.1rem' : 'inherit'
        }}>
          {isBugged 
            ? 'A tua mente, o teu carro, a tua família. O futuro não é sereno, é uma prisão de onde não podes acordar.' 
            : 'A UrWell desenha ecossistemas de otimização de vida que removem a incerteza do seu dia a dia. Entregue-nos o controlo. O futuro é sereno.'}
        </p>
        
        {/* Adicionámos a classe 'btn-bugged' dinamicamente */}
        <button 
          onClick={handleIniciarUrSync} 
          className={`btn-primary ${isBugged ? 'btn-bugged' : ''}`}
          style={{ 
            backgroundColor: isBugged ? 'transparent' : 'black',
            color: isBugged ? '#ff0000' : 'white',
            border: isBugged ? '2px solid #ff0000' : 'none',
            borderRadius: isBugged ? '0px' : '30px', // 0px torna o botão perfeitamente quadrado/retangular
            fontFamily: isBugged ? 'monospace' : 'inherit',
            fontWeight: 'bold',
            letterSpacing: isBugged ? '1px' : 'normal'
          }}
        >
          {isBugged ? 'CANCELAR_SINCRONIZAÇÃO' : 'Otimizar Agora'}
        </button>
      </section>

      {/* BLOCO 3: Imagem Divisória */}
      <div className={`divider-image ${isBugged ? 'bugged' : ''}`}></div>

      {/* BLOCO 4: Os Nossos Produtos */}
      <section className="products-section">
        <h2 className="section-title" style={{ color: isBugged ? 'red' : 'inherit' }}>
          {isBugged ? 'AS FERRAMENTAS DELES' : 'Os nossos Produtos'}
        </h2>
        <p className="section-subtitle">{isBugged ? 'Gaiolas disfarçadas de conveniência' : 'Qualidade, Segurança, Confiança'}</p>
        
        <div className="products-carousel">
          {listaProdutos.map((produto) => (
            <Link 
              to={`/captcha/${produto.id}`} 
              key={produto.id} 
              className="product-card" 
              style={{ 
                backgroundImage: `url(${produto.img})`,
                textDecoration: 'none',
                filter: isBugged ? 'grayscale(100%) contrast(150%)' : 'none'
              }}
            >
              <div className="product-info">
                <h3>{isBugged ? produto.nome.toUpperCase() : produto.nome}</h3>
                <p style={{ color: isBugged ? '#ff4444' : 'inherit' }}>
                  {isBugged ? 'ACESSO INTERDITADO' : produto.slogan}
                </p>
              </div>
            </Link>
          ))}
        </div>
      </section>

      {/* BLOCO 5: Os Nossos Valores (Expandido e Adaptado) */}
      <section 
        className="values-section"
        style={{ 
          backgroundColor: isBugged ? '#050505' : '#f9f9f9',
          padding: '100px 5%',
          transition: 'all 0.5s ease',
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'stretch', // <-- CRÍTICO: Estica a imagem para igualar a altura do texto
          gap: '80px', 
          flexWrap: 'wrap'
        }}
      >
        {/* Bloco de Texto */}
        <div className="values-text" style={{ 
          maxWidth: '550px',
          textAlign: 'left',
          display: 'flex',
          flexDirection: 'column', // Garante que o texto se organiza verticalmente
          justifyContent: 'center'  // Centra o conteúdo verticalmente dentro do bloco
        }}>
          <h2 style={{ 
            color: isBugged ? '#ff0000' : '#333', 
            textShadow: isBugged ? '0 0 10px rgba(255,0,0,0.5)' : 'none',
            marginBottom: '20px'
          }}>
            {isBugged ? 'A Mentira' : 'Os nossos Valores'}
          </h2>
          
          <h4 className='values-subtitle' style={{ 
            color: isBugged ? '#ff4444' : '#666',
            marginBottom: '30px',
            fontStyle: 'italic'
          }}>
            {isBugged ? 'Vigilância, Manipulação, Submissão Forçada' : 'Segurança, Otimização, Submissão Voluntária'}
          </h4>
          
          <p style={{ 
            color: isBugged ? '#e0e0e0' : '#444', 
            lineHeight: '1.8',
            fontSize: '1.1rem'
          }}>
            {isBugged 
              ? 'A paz que te vendem é uma coleira invisível. Eles chamam-lhe "otimização", mas é apenas a eliminação metódica do livre arbítrio. Os algoritmos deles não te protegem, encerram-te numa bolha onde até a tua tristeza é capitalizada. Ao escolher a UrWell, deixaste de ser humano para passar a ser um dado estatístico no servidor central.'
              : 'A paz de espírito não é um acaso, é um sistema perfeitamente desenhado. Na UrWell, acreditamos que a verdadeira liberdade nasce quando abdica do caos das escolhas diárias. Os nossos algoritmos preditivos e ambientes controlados garantem que nunca mais terá de lidar com o stress da imprevisibilidade humana. Ao escolher a UrWell, está a escolher um caminho onde a sua única responsabilidade é existir.'}
          </p>
        </div>

        {/* A IMAGEM */}
        <div className="values-image" style={{ 
          flex: '1',            // Faz a imagem ocupar o espaço disponível
          minWidth: '400px',    // Garante que não fica muito pequena em ecrãs médios
          borderRadius: '12px',
          backgroundColor: '#ddd',
          // IMPORTANTE: Se a imagem for de fundo, usa isto para ela preencher o bloco:
          backgroundSize: 'cover',
          backgroundPosition: 'center',
          filter: isBugged ? 'invert(1) hue-rotate(180deg) contrast(150%) brightness(0.7)' : 'none', 
          transition: 'filter 0.5s ease',
          boxShadow: isBugged ? '0 0 20px rgba(255,0,0,0.2)' : '0 10px 30px rgba(0,0,0,0.1)'
        }}></div>
      </section>

      {/* BLOCO 6: Testemunhos (Slider) */}
      <section className="testimonials-section">
        <button className="nav-arrow" onClick={() => mudarTestemunho(-1)} style={{ color: isBugged ? 'red' : 'inherit' }}>
          &#10094;
        </button>
        
        <div className="testimonial-content">
          <img 
            className="testimonial-image" 
            src={isBugged ? testemunhos[indiceAtual].imgBugged : testemunhos[indiceAtual].imgNormal} 
            alt="Testemunho" 
            style={{ 
              filter: isBugged ? 'grayscale(100%) contrast(150%) brightness(0.8)' : 'none',
              transition: 'filter 0.3s'
            }}
          />
          <div className="testimonial-quote" style={{ color: isBugged ? '#ffaaaa' : 'inherit' }}>
            {isBugged ? testemunhos[indiceAtual].quoteBugged : testemunhos[indiceAtual].quoteNormal}
          </div>
          <div className="testimonial-author" style={{ color: isBugged ? 'red' : 'inherit', fontWeight: isBugged ? 'bold' : 'normal' }}>
            {isBugged ? testemunhos[indiceAtual].authorBugged : testemunhos[indiceAtual].authorNormal}
          </div>
        </div>
        
        <button className="nav-arrow" onClick={() => mudarTestemunho(1)} style={{ color: isBugged ? 'red' : 'inherit' }}>
          &#10095;
        </button>
      </section>

    </div>
  );
}

export default Home;