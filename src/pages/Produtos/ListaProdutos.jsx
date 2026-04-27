import React from 'react';
import { Link } from 'react-router-dom';
import ursyncImg from '../../assets/ursync.png';

function ListaProdutos({ isBugged }) {
  // Array provisório - Adicionada a propriedade 'img'
  const produtos = [
    { id: 1, nome: 'UrSync', desc: 'Sincronizador de Foco Básico', status: 'Disponível', img: ursyncImg },
    { id: 2, nome: 'Vision BCI', desc: 'Interface Cérebro-Computador', status: 'Recrutamento Aberto', img: 'https://images.unsplash.com/photo-1616499370260-485b3e5ed653?q=80&w=800&auto=format&fit=crop' },
    { id: 3, nome: 'UrMate', desc: 'Supressor de Sonhos', status: 'Esgotado', img: 'https://images.unsplash.com/photo-1551288049-bebda4e38f71?q=80&w=800&auto=format&fit=crop' },
    { id: 4, nome: 'UrDigest', desc: 'Filtro de Informação Subliminar', status: 'Disponível', img: 'https://images.unsplash.com/photo-1504384308090-c894fdcc538d?q=80&w=800&auto=format&fit=crop' },
    { id: 5, nome: 'UrVoice', desc: 'Modulador de Empatia', status: 'Em Breve', img: 'https://images.unsplash.com/photo-1581091226825-a6a2a5aee158?q=80&w=800&auto=format&fit=crop' }
  ];

  return (
    <div className="page-container">
      
      {/* Cabeçalho que reage ao glitch */}
      <section className="page-header" style={{ textAlign: 'center', marginBottom: '50px', marginTop: '40px' }}>
        <h1 style={{ fontFamily: isBugged ? 'var(--fonte-mono)' : 'inherit', color: isBugged ? 'var(--glitch-red)' : 'inherit' }}>
          {isBugged ? 'CATÁLOGO_DE_CONTROLO' : 'Catálogo de Otimização'}
        </h1>
        <p>{isBugged ? 'Eles escolhem o teu futuro. Tu apenas pagas.' : 'Escolha o módulo perfeito para a sua recalibração mental.'}</p>
      </section>

      <div className="catalog-grid">
        {produtos.map((produto) => (
          <Link to={`/produtos/${produto.id}`} key={produto.id} className="catalog-card">
            
            {/* O Espaço da Imagem agora usa background-image dinâmico */}
            <div 
              className="catalog-image" 
              style={{ 
                backgroundImage: `url(${produto.img})`,
                // Retira a cor da imagem no modo bug
                filter: isBugged ? 'grayscale(100%) contrast(150%)' : 'none' 
              }}
            ></div>
            
            <div className="catalog-info">
              {/* Badge Dinâmico */}
              <span className={`status-badge ${produto.status === 'Esgotado' ? 'sold-out' : 'available'}`}>
                {isBugged && produto.status === 'Disponível' ? 'OBRIGATÓRIO' : produto.status}
              </span>
              
              <h3>{isBugged ? produto.nome.toUpperCase() + '_[VIGIADO]' : produto.nome}</h3>
              <p>{produto.desc}</p>
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
}

export default ListaProdutos;