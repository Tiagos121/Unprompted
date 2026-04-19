import React from 'react';
import { Link } from 'react-router-dom';

function Navbar({ toggleBug, isBugged }) {
  const navStyle = {
    display: 'flex',
    justifyContent: 'space-between',
    padding: '20px 5%',
    borderBottom: '1px solid rgba(0,0,0,0.1)'
  };

  return (
    <nav style={navStyle}>
      <div style={{ fontWeight: 'bold', fontSize: '1.5rem' }}>
        <Link to="/" style={{ textDecoration: 'none', color: 'inherit' }}>
          {isBugged ? 'Unprompted' : 'UrWell'}
        </Link>
      </div>
      
      <div style={{ display: 'flex', gap: '20px' }}>
        <Link to="/novidades">Novidades</Link>
        <Link to="/sobre">Sobre a Empresa</Link>
        <Link to="/produtos">Produtos</Link>
        {/* Botão invisível de teste para o glitch */}
        <span onClick={toggleBug} style={{ cursor: 'pointer', opacity: 0.1 }}>.</span>
      </div>
    </nav>
  );
}

export default Navbar;