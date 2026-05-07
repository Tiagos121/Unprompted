import React, { useState } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';

// Componentes
import { useTema } from './hooks/useTema';
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import GlitchOverlay from './components/GlitchOverlay';
import ScrollToTop from './components/ScrollToTop';

// Páginas
import Home from './pages/Home';
import Novidades from './pages/Novidades';
import Sobre from './pages/Sobre';
import Suporte from './pages/Suporte';
import ListaProdutos from './pages/Produtos/ListaProdutos';
import DetalheProduto from './pages/Produtos/DetalheProduto';
import AdminLogin from './pages/AdminLogin';

// Páginas dos Desafios / Minijogos (A Armadilha)
import Produto1 from './pages/Produtos/Produto1';
import Produto2 from './pages/Produtos/Produto2';
import Produto3 from './pages/Produtos/Produto3';
import Produto4 from './pages/Produtos/Produto4';
import Produto5 from './pages/Produtos/Produto5';

import './styles/globais.css';

function App() {
  const [isBugged, setIsBugged] = useState(false);

  useTema(isBugged);

  return (
    <div className={isBugged ? 'tema-bug' : 'tema-urwell'}>
      <Router>
        {/* Camada de Glitch por cima de tudo quando ativado */}
        <ScrollToTop />
        <GlitchOverlay isBugged={isBugged} />
        
        <Navbar toggleBug={() => setIsBugged(!isBugged)} isBugged={isBugged} />
        
        <Routes>
          {/* PÁGINAS PRINCIPAIS */}
          <Route path="/" element={<Home isBugged={isBugged} />} />
          <Route path="/novidades" element={<Novidades isBugged={isBugged} />} />
          <Route path="/sobre" element={<Sobre isBugged={isBugged} />} />
          <Route path="/suporte" element={<Suporte isBugged={isBugged} />} />

          {/* ROTA SECRETA AQUI! */}
          <Route path="/ur-admin" element={<AdminLogin />} />
          
          {/* CATÁLOGO DE PRODUTOS */}
          <Route path="/produtos" element={<ListaProdutos isBugged={isBugged} />} />
          
          {/* A PONTE (Página Intermédia Corporativa Limpa) */}
          {/* Usa o :id para carregar os dados corretos dinamicamente */}
          <Route path="/detalhes/:id" element={<DetalheProduto isBugged={isBugged} />} />
          
          {/* A ARMADILHA (Páginas independentes com os Desafios/Minijogos) */}
          <Route path="/produto/1" element={<Produto1 isBugged={isBugged} />} />
          <Route path="/produto/2" element={<Produto2 isBugged={isBugged} />} />
          <Route path="/produto/3" element={<Produto3 isBugged={isBugged} />} />
          <Route path="/produto/4" element={<Produto4 isBugged={isBugged} />} />
          <Route path="/produto/5" element={<Produto5 isBugged={isBugged} />} />
        </Routes>

        <Footer isBugged={isBugged} />
      </Router>
    </div>
  );
}

export default App;