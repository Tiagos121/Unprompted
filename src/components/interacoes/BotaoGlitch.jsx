import React from 'react';
// Desativa o aviso do ESLint
// eslint-disable-next-line no-unused-vars
import { motion } from 'framer-motion';

function BotaoGlitch({ label, onClick, isBugged }) {
  // Configuração do tremor (shake)
  const shakeAnimation = {
    x: [0, -2, 2, -2, 2, 0],
    y: [0, 1, -1, 1, -1, 0],
    transition: { 
      duration: 0.2, 
      repeat: Infinity, 
      repeatType: "mirror" 
    }
  };

  return (
    <motion.button
      className={`btn-glitch ${isBugged ? 'active-bug' : ''}`}
      onClick={onClick}
      // Estremece ligeiramente sempre, mas muito mais ao clicar ou se estiver bugado
      animate={isBugged ? shakeAnimation : {}}
      whileTap={shakeAnimation} 
      style={{
        fontFamily: 'var(--fonte-mono)',
        textTransform: 'uppercase',
        letterSpacing: '2px'
      }}
    >
      {label}
    </motion.button>
  );
}

export default BotaoGlitch;