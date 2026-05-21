import React, { useState } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';

// Componentes
import { useTema } from './hooks/useTema';
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import ScrollToTop from './components/ScrollToTop';

// Páginas
import Home from './pages/Home';
import Novidades from './pages/Novidades';
import Sobre from './pages/Sobre';
import Suporte from './pages/Suporte';
import ListaProdutos from './pages/Produtos/ListaProdutos';
import DetalheProduto from './pages/Produtos/DetalheProduto';
import AdminLogin from './pages/AdminLogin';
import CaptchaRandom from './pages/CaptchaRandom'; // <-- 1. NOVO IMPORT

import './styles/globais.css';

function App() {
  // 1. INICIALIZAÇÃO INTELIGENTE: Lê o localStorage ao abrir o site
  const [isBugged, setIsBugged] = useState(() => {
    const guardado = localStorage.getItem('urwell_modo_bug');
    return guardado === 'true'; // Retorna true se a Resistência já estava ativa
  });

  useTema(isBugged);

  // 2. A FUNÇÃO DE ALTERAÇÃO: Muda o estado e guarda a escolha no navegador
  const toggleBugMode = () => {
    setIsBugged((estadoAnterior) => {
      const novoEstado = !estadoAnterior;
      localStorage.setItem('urwell_modo_bug', novoEstado);
      return novoEstado;
    });
  };

  return (
    <div className={isBugged ? 'tema-bug' : 'tema-urwell'}>
      <Router>
        <ScrollToTop />
        
        {/* 3. Atualizamos a Navbar para usar a nova função */}
        <Navbar toggleBug={toggleBugMode} isBugged={isBugged} />
        
        <Routes>
          {/* PÁGINAS PRINCIPAIS */}
          <Route path="/" element={<Home isBugged={isBugged} />} />
          <Route path="/novidades" element={<Novidades isBugged={isBugged} />} />
          <Route path="/sobre" element={<Sobre isBugged={isBugged} />} />
          <Route path="/suporte" element={<Suporte isBugged={isBugged} />} />

          {/* ROTA SECRETA */}
          <Route path="/ur-admin" element={<AdminLogin />} />
          
          {/* CATÁLOGO DE PRODUTOS */}
          <Route path="/produtos" element={<ListaProdutos isBugged={isBugged} />} />
          
          {/* 2. A ROLETA (A nova ponte obrigatória) */}
          <Route path="/captcha/:id" element={<CaptchaRandom isBugged={isBugged} />} />
          
          {/* 3. PÁGINA FINAL DO PRODUTO */}
          <Route path="/produtos/:id" element={<DetalheProduto isBugged={isBugged} />} />
        </Routes>

        {/* 4. Atualizamos o Footer para usar a nova função */}
        <Footer 
          isBugged={isBugged} 
          toggleBugMode={toggleBugMode} 
        />
      </Router>
    </div>
  );
}

export default App;