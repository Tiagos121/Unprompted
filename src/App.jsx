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
import CaptchaRandom from './pages/CaptchaRandom';
import DiarioSecreto from './pages/DiarioSecreto';
import AdminVideos from './pages/AdminVideos';

import './styles/globais.css';

function App() {
  const [isBugged, setIsBugged] = useState(() => {
    const guardado = localStorage.getItem('urwell_modo_bug');
    return guardado === 'true';
  });

  useTema(isBugged);

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
        
        <Navbar toggleBug={toggleBugMode} isBugged={isBugged} />
        
        <Routes>
          <Route path="/" element={<Home isBugged={isBugged} />} />
          <Route path="/novidades" element={<Novidades isBugged={isBugged} />} />
          <Route path="/sobre" element={<Sobre isBugged={isBugged} />} />
          <Route path="/diario-secreto" element={<DiarioSecreto isBugged={isBugged} />} />
          <Route path="/suporte" element={<Suporte isBugged={isBugged} />} />

          <Route path="/ur-admin" element={<AdminLogin />} />
          
          <Route path="/produtos" element={<ListaProdutos isBugged={isBugged} />} />

          <Route path="/admin-videos" element={<AdminVideos />} />
          
          <Route path="/captcha/:id" element={<CaptchaRandom isBugged={isBugged} />} />
          
          <Route path="/produtos/:id" element={<DetalheProduto isBugged={isBugged} />} />
        </Routes>

        <Footer 
          isBugged={isBugged} 
          toggleBugMode={toggleBugMode} 
        />
      </Router>
    </div>
  );
}

export default App;