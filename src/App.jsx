import React, { useState } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';

// Componentes
import { useTema } from './hooks/useTema';
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import GlitchOverlay from './components/GlitchOverlay';

// Páginas
import Home from './pages/Home';
import Novidades from './pages/Novidades';
import Sobre from './pages/Sobre';
import ListaProdutos from './pages/Produtos/ListaProdutos';
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
        <GlitchOverlay isBugged={isBugged} />
        
        <Navbar toggleBug={() => setIsBugged(!isBugged)} isBugged={isBugged} />
        
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/novidades" element={<Novidades />} />
          <Route path="/sobre" element={<Sobre />} />
          <Route path="/produtos" element={<ListaProdutos />} />
          <Route path="/produtos/1" element={<Produto1 />} />
          <Route path="/produtos/2" element={<Produto2 />} />
          <Route path="/produtos/3" element={<Produto3 />} />
          <Route path="/produtos/4" element={<Produto4 />} />
          <Route path="/produtos/5" element={<Produto5 />} />
        </Routes>

        <Footer isBugged={isBugged} />
      </Router>
    </div>
  );
}

export default App;