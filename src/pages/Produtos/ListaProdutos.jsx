import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { listaProdutos } from '../../data/produtos'; 
import { getAuth, onAuthStateChanged } from 'firebase/auth'; 

function ListaProdutos({ isBugged }) {
  
  const [isAdmin, setIsAdmin] = useState(false);

  
  useEffect(() => {
    const auth = getAuth();
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      if (user) {
        setIsAdmin(true); 
      } else {
        setIsAdmin(false); 
      }
    });

    return () => unsubscribe(); 
  }, []);

  return (
    <div className="page-container">
      
      <section className="page-header" style={{ textAlign: 'center', marginBottom: '50px', marginTop: '40px' }}>
        <h1 style={{ 
          fontFamily: isBugged ? 'var(--fonte-mono)' : 'inherit', 
          color: isBugged ? 'var(--glitch-red, red)' : 'inherit' 
        }}>
          {isBugged ? 'CATÁLOGO_DE_CONTROLO' : 'Catálogo de Otimização'}
        </h1>
        <p style={{ color: isBugged ? '#888' : 'inherit' }}>
          {isBugged ? 'Eles escolhem o teu futuro. Tu apenas pagas.' : 'Escolha o módulo perfeito para a sua recalibração mental.'}
        </p>
        
        
        {isAdmin && (
          <div style={{ textAlign: 'center', marginTop: '25px' }}>
            <Link 
              to="/admin-videos" 
              className={`btn-primary ${isBugged ? 'btn-bugged' : ''}`}
              style={{ 
                display: 'inline-block',
                padding: '12px 30px',
                textDecoration: 'none',
                backgroundColor: isBugged ? 'transparent' : 'black',
                color: isBugged ? '#ff0000' : 'white',
                border: isBugged ? '2px solid #ff0000' : 'none',
                borderRadius: isBugged ? '0px' : '30px', 
                fontFamily: isBugged ? 'monospace' : 'inherit',
                fontWeight: 'bold',
                letterSpacing: isBugged ? '2px' : 'normal',
                textShadow: isBugged ? '0 0 8px rgba(255,0,0,0.4)' : 'none',
                transition: 'all 0.3s ease'
              }}
              onMouseOver={(e) => {
                if(isBugged) {
                  e.target.style.backgroundColor = 'rgba(255, 0, 0, 0.1)';
                  e.target.style.boxShadow = '0 0 15px rgba(255,0,0,0.5)';
                } else {
                  e.target.style.transform = 'scale(1.05)';
                }
              }}
              onMouseOut={(e) => {
                if(isBugged) {
                  e.target.style.backgroundColor = 'transparent';
                  e.target.style.boxShadow = 'none';
                } else {
                  e.target.style.transform = 'scale(1)';
                }
              }}
            >
              {isBugged ? '[ OVERRIDE_LINKS ]' : 'Gerir Links do Sistema'}
            </Link>
          </div>
        )}
      </section>

      <div className="catalog-grid"> 
        {listaProdutos.map((produto) => (
          <Link to={`/captcha/${produto.id}`} key={produto.id} className="catalog-card">
            
            <div 
              className="catalog-image" 
              style={{ 
                backgroundImage: `url(${produto.img})`,
                filter: isBugged ? 'grayscale(100%) contrast(150%)' : 'none' 
              }}
            ></div>
            
            <div className="catalog-info">
              <span className={`status-badge ${produto.status === 'Esgotado' ? 'sold-out' : 'available'}`}>
                {isBugged && produto.status === 'Disponível' ? 'OBRIGATÓRIO' : produto.status}
              </span>
              
              <h3>{isBugged ? produto.nome.toUpperCase() + '_[VIGIADO]' : produto.nome}</h3>
              
              <p style={{ color: isBugged ? '#ffaaaa' : 'inherit' }}>
                {isBugged 
                  ? (produto.descBug || "ERRO_404: INFORMAÇÃO OCULTADA PELA URWELL") 
                  : (produto.desc || produto.slogan)}
              </p>
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
}

export default ListaProdutos;