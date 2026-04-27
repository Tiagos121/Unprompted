import React from 'react';
import { Link } from 'react-router-dom';

function Footer({ isBugged }) {
  return (
    <footer className="footer-container">
      <div className="footer-grid">
        
        {/* Coluna 1: Marca e Redes */}
        <div className="footer-column">
          <div className="footer-logo">
            {isBugged ? <span className="logo-unprompted-text">unprompted</span> : <span className="logo-urwell-text">UrWell</span>}
          </div>
          <div className="social-icons">
            {isBugged ? 'SINAL_INTERCEPTADO' : 'X 📸 in'}
          </div>
        </div>

        {/* Coluna 2: Links da Empresa */}
        <div className="footer-column">
          <strong>{isBugged ? 'ARQUIVOS_MORTOS' : 'Sobre Nós'}</strong>
          <Link to="/sobre">{isBugged ? 'A_Verdade' : 'A Empresa'}</Link>
          <a href="#">{isBugged ? 'Esquemas_Vazados.pdf' : 'O Nosso Hardware'}</a>
          <a href="#">{isBugged ? 'Quem_Os_Financia?' : 'Investidores'}</a>
        </div>

        {/* Coluna 3: Produtos */}
        <div className="footer-column">
          <strong>{isBugged ? 'FERRAMENTAS_DE_CONTROLO' : 'Produtos'}</strong>
          <Link to="/produtos/1">{isBugged ? 'UrSync (CUIDADO)' : 'UrSync'}</Link>
          <Link to="/produtos/3">{isBugged ? 'Eles_Roubam_Sonhos' : 'UrMate'}</Link>
          <Link to="/produtos/4">{isBugged ? 'Censura_Ativa' : 'UrDigest'}</Link>
        </div>

        {/* Coluna 4: Legal */}
        <div className="footer-column">
          <strong>{isBugged ? 'MENTIRAS' : 'Legal'}</strong>
          <a href="#">{isBugged ? 'Não_Tens_Direitos' : 'Termos de Rendição'}</a>
          <a href="#">{isBugged ? 'Privacidade_Morta' : 'Privacidade'}</a>
          <a href="#">{isBugged ? 'Lavagem_Cerebral' : 'Compliance'}</a>
        </div>

      </div>

      {/* A linha de copyright e easter eggs no fundo */}
      <div className="footer-bottom">
        {isBugged ? (
          <span className="easter-egg-bug">SYS_STATUS: COMPROMETIDO // [O_O] // PWD_LEAK: STOP_THE_SLOP</span>
        ) : (
          <span className="copyright">© 2026 UrWell Corp. Todos os direitos reservados. O seu bem-estar é propriedade nossa.</span>
        )}
      </div>
    </footer>
  );
}

export default Footer;