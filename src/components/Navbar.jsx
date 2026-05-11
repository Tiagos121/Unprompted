import React from 'react';
import { Link } from 'react-router-dom';
import logoUrwell from '../assets/logo_urwell_site.png';

function Navbar({ toggleBug, isBugged }) {
  return (
    <nav className="navbar">
      <div className="nav-container">
        {/* LOGÓTIPO DINÂMICO */}
        <div className="nav-logo">
          <Link to="/">
            {isBugged ? (
              <span className="logo-unprompted-text">unprompted</span>
            ) : (
              <img src={logoUrwell} alt="UrWell" className="logo-urwell" />
            )}
          </Link>
        </div>
        
        {/* LINKS DE NAVEGAÇÃO */}
        <ul className="nav-links">
          <li><Link to="/novidades">Novidades</Link></li>
          <li><Link to="/sobre">Sobre</Link></li>
          <li><Link to="/produtos">Produtos</Link></li>
          <li><Link to="/suporte">Suporte</Link></li>
        </ul>

        {/* O GATILHO DO ARG: O ponto final escondido */}
        <div className="nav-trigger" onClick={toggleBug}>
          <span>.</span>
        </div>
      </div>
    </nav>
  );
}

export default Navbar;