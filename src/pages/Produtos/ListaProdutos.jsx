import React from 'react';
import { Link } from 'react-router-dom';

function ListaProdutos() {
  const produtos = [
    { id: 1, nome: 'UrSync', desc: 'Sincronizador de Foco Básico', status: 'Disponível' },
    { id: 2, nome: 'Vision BCI', desc: 'Interface Cérebro-Computador', status: 'Recrutamento Aberto' },
    { id: 3, nome: 'UrMate', desc: 'Supressor de Sonhos', status: 'Esgotado' },
    { id: 4, nome: 'UrDigest', desc: 'Filtro de Informação Subliminar', status: 'Disponível' },
    { id: 5, nome: 'UrVoice', desc: 'Modulador de Empatia', status: 'Em Breve' }
  ];

  return (
    <div className="page-container">
      <section className="page-header">
        <h1>Catálogo de Otimização</h1>
        <p>Escolha o módulo perfeito para a sua recalibração mental.</p>
      </section>

      <div className="catalog-grid">
        {produtos.map((produto) => (
          <Link to={`/produtos/${produto.id}`} key={produto.id} className="catalog-card">
            <div className="catalog-image-placeholder"></div>
            <div className="catalog-info">
              <span className={`status-badge ${produto.status === 'Esgotado' ? 'sold-out' : ''}`}>
                {produto.status}
              </span>
              <h3>{produto.nome}</h3>
              <p>{produto.desc}</p>
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
}

export default ListaProdutos;