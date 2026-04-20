import React, { useEffect, useState } from 'react';
// A linha abaixo desativa o aviso falso do ESLint para o framer-motion
// eslint-disable-next-line no-unused-vars
import { motion } from 'framer-motion';

function GlitchOverlay({ isBugged }) {
  const [logs, setLogs] = useState([]);

  useEffect(() => {
    if (!isBugged) return;

    const messages = [
      "> INICIANDO PROTOCOLO UNPROMPTED...",
      "> A QUEBRAR FIREWALL DA URWELL...",
      "> ACESSO NEGADO. A FORÇAR ENTRADA...",
      "> SISTEMA COMPROMETIDO.",
      "> ELES ESTÃO A OUVIR.",
      "> ACORDA.",
      "ERROR_0x000000_REALITY_NOT_FOUND"
    ];
    
    let index = 0;
    
    // O setTimeout com 0 milissegundos evita o erro de "cascading renders"
    setTimeout(() => {
      setLogs([]);
    }, 0);
    
    const interval = setInterval(() => {
      if (index < messages.length) {
        const novaMensagem = messages[index];
        setLogs((estadoAnterior) => [...estadoAnterior, novaMensagem]);
        index++;
      } else {
        clearInterval(interval);
      }
    }, 800);

    return () => {
      clearInterval(interval);
      setLogs([]); // Limpa a consola quando o glitch for fechado
    };
  }, [isBugged]);

  if (!isBugged) return null;

  return (
    <motion.div 
      className="glitch-overlay"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.1 }}
    >
      <div className="glitch-content">
        <h1 className="unprompted-logo-glitch">unprompted</h1>
        
        <div className="terminal-window">
          {logs.map((log, idx) => (
            <motion.p 
              key={idx}
              initial={{ opacity: 0, x: -10 }}
              animate={{ opacity: 1, x: 0 }}
            >
              {log}
            </motion.p>
          ))}
          <span className="blinking-cursor">_</span>
        </div>
      </div>
    </motion.div>
  );
}

export default GlitchOverlay;