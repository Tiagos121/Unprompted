import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import logoUrwell from '../assets/logo_urwell_site.png';
import logoUnprompted from '../assets/unprompted_logo2.png';

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

  // 2. FUNÇÃO DE TERMINAR SESSÃO
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
            confirmButtonColor: isBugged ? "#ff0000" : "#000000",
            background: isBugged ? "#0a0a0a" : "#fff",
            color: isBugged ? "#ff0000" : "#000",
            timer: 1500,
            showConfirmButton: false
          });
          navigate('/'); 
        });
      }
    });
  };

  return (
    <nav 
      className="navbar" 
      style={{ 
        background: isBugged ? '#000000' : 'inherit', // Fundo preto como o footer
        borderBottom: isBugged ? '2px solid #ff0000' : '1px solid #eee', // Linha vermelha de erro
        fontFamily: isBugged ? 'monospace' : 'inherit', // Fonte hacker
        transition: 'all 0.5s ease',
        padding: '15px 0'
      }}
    >
      <div className="nav-container" style={{ display: 'flex', justifyContent: 'between', alignItems: 'center', width: '90%', margin: '0 auto' }}>
        
        {/* LOGÓTIPO DINÂMICO */}
        <div className="nav-logo">
          <Link to="/">
            {isBugged ? (
              <img src={logoUnprompted} alt="Unprompted" className="logo-unprompted" />
            ) : (
              <img src={logoUrwell} alt="UrWell" className="logo-urwell" />
            )}
          </Link>
        </div>
        
        {/* LINKS DE NAVEGAÇÃO E BOTÃO LOGOUT */}
        <ul className="nav-links" style={{ display: 'flex', alignItems: 'center', listStyle: 'none', gap: '25px', margin: 0, padding: 0 }}>
          
          <li>
            <Link 
              to="/novidades" 
              style={{ 
                color: isBugged ? '#ff4444' : 'inherit',
                textDecoration: 'none',
                fontWeight: isBugged ? 'bold' : 'normal'
              }}
            >
              {isBugged ? 'A_PURGA' : 'Novidades'}
            </Link>
          </li>
          
          <li>
            <Link 
              to="/sobre" 
              style={{ 
                color: isBugged ? '#ff4444' : 'inherit',
                textDecoration: 'none',
                fontWeight: isBugged ? 'bold' : 'normal'
              }}
            >
              {isBugged ? 'ARQUIVOS_MORTOS' : 'Sobre'}
            </Link>
          </li>
          
          <li>
            <Link 
              to="/produtos" 
              style={{ 
                color: isBugged ? '#ff4444' : 'inherit',
                textDecoration: 'none',
                fontWeight: isBugged ? 'bold' : 'normal'
              }}
            >
              {isBugged ? 'FERRAMENTAS_CONTROLO' : 'Produtos'}
            </Link>
          </li>
          
          <li>
            <Link 
              to="/suporte" 
              style={{ 
                color: isBugged ? '#ff4444' : 'inherit',
                textDecoration: 'none',
                fontWeight: isBugged ? 'bold' : 'normal'
              }}
            >
              {isBugged ? 'CENTRAL_RECALIBRAGEM' : 'Suporte'}
            </Link>
          </li>
          
          {/* BOTÃO DE LOGOUT (SÓ APARECE PARA O ADMIN!) */}
          {isAdmin && (
            <li style={{ marginLeft: '15px' }}>
              <button 
                onClick={handleLogout}
                style={{ 
                  background: 'transparent', 
                  border: '1px solid #ff0000', 
                  color: '#ff0000', 
                  padding: '6px 12px', 
                  borderRadius: isBugged ? '0px' : '4px', // Fica quadrangular no modo bugged!
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

        {/* O GATILHO DO ARG: O ponto final escondido */}
        <div className="nav-trigger" onClick={toggleBug} style={{ cursor: 'pointer', opacity: isBugged ? 0.3 : 0.1 }}>
          <span style={{ color: isBugged ? '#ff0000' : 'inherit' }}>.</span>
        </div>
      </div>
    </nav>
  );
}

export default Navbar;