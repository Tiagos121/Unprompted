import React from 'react';
import { Link } from 'react-router-dom';
import { listaProdutos } from '../../data/produtos'; // A tua fonte única de verdade

function ListaProdutos({ isBugged }) {
  return (
    <div className="page-container">
      
      {/* Cabeçalho que reage ao glitch */}
      <section className="page-header" style={{ textAlign: 'center', marginBottom: '50px', marginTop: '40px' }}>
        <h1 style={{ 
          fontFamily: isBugged ? 'var(--fonte-mono)' : 'inherit', 
          color: isBugged ? 'var(--glitch-red)' : 'inherit' 
        }}>
          {isBugged ? 'CATÁLOGO_DE_CONTROLO' : 'Catálogo de Otimização'}
        </h1>
        <p>{isBugged ? 'Eles escolhem o teu futuro. Tu apenas pagas.' : 'Escolha o módulo perfeito para a sua recalibração mental.'}</p>
      </section>

      <div className="catalog-grid">
        {/* MÁGICA: Agora percorremos a listaProdutos que vem do ficheiro centralizado */}
        {listaProdutos.map((produto) => (
          <Link to={`/captcha/${produto.id}`} className="catalog-card">
            
            {/* Imagem do produto com filtro de glitch opcional */}
            <div 
              className="catalog-image" 
              style={{ 
                backgroundImage: `url(${produto.img})`,
                filter: isBugged ? 'grayscale(100%) contrast(150%)' : 'none' 
              }}
            ></div>
            
            <div className="catalog-info">
              {/* Badge de Status (Verde/Vermelho) */}
              <span className={`status-badge ${produto.status === 'Esgotado' ? 'sold-out' : 'available'}`}>
                {isBugged && produto.status === 'Disponível' ? 'OBRIGATÓRIO' : produto.status}
              </span>
              
              {/* Nome do Produto (muda para MAIÚSCULAS no modo bug) */}
              <h3>{isBugged ? produto.nome.toUpperCase() + '_[VIGIADO]' : produto.nome}</h3>
              
              {/* Descrição técnica do produto */}
              <p>{produto.desc}</p>
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
}

export default ListaProdutos;