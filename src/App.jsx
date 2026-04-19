import React, { useState } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Navbar from './components/Navbar';
import Home from './pages/Home';
import Novidades from './pages/Novidades';
import Sobre from './pages/Sobre';

// COMENTÁMOS AS PÁGINAS QUE AINDA NÃO EXISTEM PARA NÃO DAR ERRO
// import ListaProdutos from './pages/Produtos/ListaProdutos';
// import Produto1 from './pages/Produtos/Produto1';
// import Produto2 from './pages/Produtos/Produto2';

import './styles/globais.css';

function App() {
  const [isBugged, setIsBugged] = useState(false);

  return (
    <div className={isBugged ? 'tema-bug' : 'tema-urwell'}>
      <Router>
        <Navbar toggleBug={() => setIsBugged(!isBugged)} isBugged={isBugged} />
        
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/novidades" element={<Novidades />} />
          <Route path="/sobre" element={<Sobre />} />
          
          {/* COMENTÁMOS AS ROTAS QUE AINDA NÃO EXISTEM */}
          {/* <Route path="/produtos" element={<ListaProdutos />} /> */}
          {/* <Route path="/produtos/1" element={<Produto1 />} /> */}
          {/* <Route path="/produtos/2" element={<Produto2 />} /> */}
        </Routes>

        <footer style={{ padding: '20px', textAlign: 'center', opacity: 0.5 }}>
          {isBugged ? 'U̸r̸W̷e̴l̷l̶ - [O_O]' : '© 2026 UrWell Corp. Todos os direitos reservados.'}
        </footer>
      </Router>
    </div>
  );
}

export default App;