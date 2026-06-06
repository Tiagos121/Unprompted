import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import logoUrwell from '../assets/logo_urwell_site.png';
import logoUnprompted from '../assets/unprompted_logo2.png';

import { onAuthStateChanged, signOut } from 'firebase/auth';
import { auth } from '../config/firebase';
import Swal from 'sweetalert2';

function Navbar({ toggleBug, isBugged }) {
  const [isAdmin, setIsAdmin] = useState(false);
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      setIsAdmin(!!user); 
    });
    return () => unsubscribe();
  }, []);

  const handleLogout = () => {
    Swal.fire({
      title: isBugged ? "FORÇAR DESCONEXÃO?" : "Encerrar Sessão?",
      text: isBugged ? "Desconectar do terminal central encriptado." : "Vai desligar-se da rede administrativa da UrWell.",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: isBugged ? "#ff0000" : "#000000",
      cancelButtonColor: "#CCCCCC",
      confirmButtonText: isBugged ? "TERMINAR_SESSÃO" : "Sim, Desconectar",
      cancelButtonText: "Cancelar",
      background: isBugged ? "#0a0a0a" : "#fff",
      color: isBugged ? "#ff0000" : "#000"
    }).then((result) => {
      if (result.isConfirmed) {
        signOut(auth).then(() => {
          Swal.fire({
            title: isBugged ? "SISTEMA_OFFLINE" : "Desconectado",
            text: isBugged ? "Sessão administrative purgada." : "A sua ligação corporativa foi terminada com sucesso.",
            icon: "info",
            showConfirmButton: false,
            timer: 1500,
            background: isBugged ? "#0a0a0a" : "#fff",
            color: isBugged ? "#ff0000" : "#000"
          });
          navigate('/'); 
        });
      }
    });
  };

  const closeMenu = () => setIsMenuOpen(false);

  return (
    <nav 
      className="navbar" 
      style={{ 
        background: isBugged ? '#000000' : 'var(--bg-color, white)', 
        borderBottom: isBugged ? '2px solid #ff0000' : '1px solid #eee', 
        fontFamily: isBugged ? 'monospace' : 'inherit', 
        transition: 'all 0.5s ease',
        padding: '15px 0',
        position: 'relative',
        zIndex: 1000
      }}
    >
      <div className="nav-container">
        
        {/* BLOCO 1: ESQUERDA (Logo) */}
        <div className="nav-logo" style={{ zIndex: 2000 }}>
          <Link to="/" onClick={closeMenu}>
            {isBugged ? (
              <img src={logoUnprompted} alt="Unprompted" className="logo-unprompted" style={{ height: '40px' }} />
            ) : (
              <img src={logoUrwell} alt="UrWell" className="logo-urwell" style={{ height: '40px' }} />
            )}
          </Link>
        </div>

        {/* BLOCO 2: CENTRO (Links) */}
        <ul 
          className={`nav-links ${isMenuOpen ? 'active' : ''}`} 
          style={{ 
            // Garante que o menu de telemóvel tem um fundo sólido para não se misturar com a página
            background: isMenuOpen ? (isBugged ? '#000000' : '#ffffff') : 'transparent'
          }}
        >
          <li>
            <Link to="/novidades" onClick={closeMenu} style={{ color: isBugged ? '#ff4444' : 'inherit', textDecoration: 'none', fontWeight: isBugged ? 'bold' : 'normal' }}>
              {isBugged ? 'A_PURGA' : 'Novidades'}
            </Link>
          </li>
          <li>
            <Link to="/sobre" onClick={closeMenu} style={{ color: isBugged ? '#ff4444' : 'inherit', textDecoration: 'none', fontWeight: isBugged ? 'bold' : 'normal' }}>
              {isBugged ? 'ARQUIVOS_MORTOS' : 'Sobre'}
            </Link>
          </li>
          <li>
            <Link to="/produtos" onClick={closeMenu} style={{ color: isBugged ? '#ff4444' : 'inherit', textDecoration: 'none', fontWeight: isBugged ? 'bold' : 'normal' }}>
              {isBugged ? 'FERRAMENTAS_CONTROLO' : 'Produtos'}
            </Link>
          </li>
          <li>
            <Link to="/suporte" onClick={closeMenu} style={{ color: isBugged ? '#ff4444' : 'inherit', textDecoration: 'none', fontWeight: isBugged ? 'bold' : 'normal' }}>
              {isBugged ? 'CENTRAL_RECALIBRAGEM' : 'Suporte'}
            </Link>
          </li>
          
          {isAdmin && (
            <li className="admin-btn-container">
              <button 
                onClick={() => { closeMenu(); handleLogout(); }}
                style={{ 
                  background: 'transparent', 
                  border: '1px solid #ff0000', 
                  color: '#ff0000', 
                  padding: '6px 12px', 
                  borderRadius: isBugged ? '0px' : '4px',
                  cursor: 'pointer', 
                  fontWeight: 'bold',
                  fontFamily: isBugged ? 'monospace' : 'inherit',
                  transition: 'all 0.3s'
                }}
                onMouseOver={(e) => { e.target.style.background = '#ff0000'; e.target.style.color = isBugged ? '#000' : 'white'; }}
                onMouseOut={(e) => { e.target.style.background = 'transparent'; e.target.style.color = '#ff0000'; }}
              >
                {isBugged ? 'DESCONECTAR_SYS' : 'Sair (Admin)'}
              </button>
            </li>
          )}
        </ul>

        {/* BLOCO 3: DIREITA (Gatilho + Hambúrguer) */}
        <div className="nav-right-actions" style={{ zIndex: 2000 }}>
          
          {/* O Ponto Escondido do Bug */}
          <div className="nav-trigger" onClick={() => { closeMenu(); toggleBug(); }} style={{ cursor: 'pointer', opacity: isBugged ? 0.3 : 0.1, marginRight: '10px' }}>
            <span style={{ color: isBugged ? '#ff0000' : 'inherit', fontSize: '1.5rem', fontWeight: 'bold' }}>.</span>
          </div>

          {/* Botão Hambúrguer */}
          <div 
            className="hamburger" 
            onClick={() => setIsMenuOpen(!isMenuOpen)}
            style={{ cursor: 'pointer', color: isBugged ? '#ff0000' : '#000' }}
          >
            {isMenuOpen ? (
              <svg xmlns="http://www.w3.org/2000/svg" width="30" height="30" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><line x1="18" y1="6" x2="6" y2="18"></line><line x1="6" y1="6" x2="18" y2="18"></line></svg>
            ) : (
              <svg xmlns="http://www.w3.org/2000/svg" width="30" height="30" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><line x1="3" y1="12" x2="21" y2="12"></line><line x1="3" y1="6" x2="21" y2="6"></line><line x1="3" y1="18" x2="21" y2="18"></line></svg>
            )}
          </div>
        </div>

      </div>
    </nav>
  );
}

export default Navbar;