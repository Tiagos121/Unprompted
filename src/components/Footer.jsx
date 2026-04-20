import React from 'react';

function Footer({ isBugged }) {
  return (
    <footer style={{ padding: '20px', textAlign: 'center', opacity: 0.5 }}>
      {isBugged ? 'U̸r̸W̷e̴l̷l̶ - [ERRO DE SISTEMA]' : '© 2026 UrWell Corp. Todos os direitos reservados.'}
    </footer>
  );
}

export default Footer;