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
  const [isBugged, setIsBugged] = useState(false);

  useTema(isBugged);

  return (
    <div className={isBugged ? 'tema-bug' : 'tema-urwell'}>
      <Router>
        <ScrollToTop />
        
        <Navbar toggleBug={() => setIsBugged(!isBugged)} isBugged={isBugged} />
        
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
          {/* Quando o utilizador clica num produto, vai primeiro para aqui */}
          <Route path="/captcha/:id" element={<CaptchaRandom isBugged={isBugged} />} />
          
          {/* 3. PÁGINA FINAL DO PRODUTO */}
          {/* Agora usamos o caminho /produtos/:id para ficar mais profissional */}
          <Route path="/produtos/:id" element={<DetalheProduto isBugged={isBugged} />} />
          
          {/* NOTA: As rotas individuais /produto/1, /produto/2, etc., foram REMOVIDAS 
              porque agora o CaptchaRandom carrega esses componentes dinamicamente. */}
        </Routes>

        <Footer 
          isBugged={isBugged} 
          toggleBugMode={() => setIsBugged(!isBugged)} 
        />
      </Router>
    </div>
  );
}

export default App;