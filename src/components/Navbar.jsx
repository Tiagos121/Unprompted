import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import logoUrwell from '../assets/logo_urwell_site.png';

// IMPORTAÇÕES DO FIREBASE E ALERTS
import { onAuthStateChanged, signOut } from 'firebase/auth';
import { auth } from '../config/firebase';
import Swal from 'sweetalert2';

function Navbar({ toggleBug, isBugged }) {
  const [isAdmin, setIsAdmin] = useState(false);
  const navigate = useNavigate();

  // 1. VERIFICAR SE O ADMIN ESTÁ ONLINE
  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      setIsAdmin(!!user); 
    });
    return () => unsubscribe();
  }, []);

  // 2. FUNÇÃO DE TERMINAR SESSÃO (Igual à das Novidades)
  const handleLogout = () => {
    Swal.fire({
      title: "Encerrar Sessão?",
      text: "Vai desligar-se da rede administrativa da UrWell.",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#000000",
      cancelButtonColor: "#CCCCCC",
      confirmButtonText: "Sim, Desconectar",
      cancelButtonText: "Cancelar"
    }).then((result) => {
      if (result.isConfirmed) {
        signOut(auth).then(() => {
          Swal.fire({
            title: "Desconectado",
            text: "A sua ligação corporativa foi terminada com sucesso.",
            icon: "info",
            confirmButtonColor: "#000000",
            timer: 1500,
            showConfirmButton: false
          });
          // Opcional: Mandar o admin para a página inicial ao fazer logout
          navigate('/'); 
        });
      }
    });
  };

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
        
        {/* LINKS DE NAVEGAÇÃO E BOTÃO LOGOUT */}
        <ul className="nav-links" style={{ display: 'flex', alignItems: 'center' }}>
          <li><Link to="/novidades">Novidades</Link></li>
          <li><Link to="/sobre">Sobre</Link></li>
          <li><Link to="/produtos">Produtos</Link></li>
          <li><Link to="/suporte">Suporte</Link></li>
          
          {/* BOTÃO DE LOGOUT (SÓ APARECE PARA O ADMIN!) */}
          {isAdmin && (
            <li style={{ marginLeft: '15px' }}>
              <button 
                onClick={handleLogout}
                style={{ 
                  background: 'transparent', 
                  border: '1px solid var(--cor-vermelho, red)', 
                  color: 'var(--cor-vermelho, red)', 
                  padding: '6px 12px', 
                  borderRadius: '4px', 
                  cursor: 'pointer', 
                  fontWeight: 'bold',
                  transition: 'all 0.3s'
                }}
                onMouseOver={(e) => { e.target.style.background = 'var(--cor-vermelho, red)'; e.target.style.color = 'white'; }}
                onMouseOut={(e) => { e.target.style.background = 'transparent'; e.target.style.color = 'var(--cor-vermelho, red)'; }}
              >
                Sair (Admin)
              </button>
            </li>
          )}
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