import React, { useState, useEffect } from 'react';
import { onAuthStateChanged } from 'firebase/auth';
import { auth } from '../config/firebase';
import { useSobreGlitch } from '../hooks/useSobreGlitch';
import { Link } from 'react-router-dom';

function Sobre({ isBugged: isBuggedGlobal }) {
  const [isAdmin, setIsAdmin] = useState(false);
  const [isHovered, setIsHovered] = useState(false);


  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      setIsAdmin(!!user);
    });
    return () => unsubscribe();
  }, []);

  const glitchLocal = useSobreGlitch(isAdmin, isBuggedGlobal);

  const modoRebelde = isAdmin ? false : (isBuggedGlobal || glitchLocal);

  return (
    <div className={`page-container transition-all duration-300 ${modoRebelde ? 'bg-black text-white' : 'bg-white text-black'} ${glitchLocal ? 'efeito-glitch-suave' : ''}`}>
      
      <section className="sobre-hero">
        <h1 className="transition-colors duration-300" style={{ 
          fontFamily: modoRebelde ? 'var(--fonte-mono)' : 'inherit', 
          color: modoRebelde ? 'var(--cor-vermelho, red)' : 'inherit' 
        }}>
          {modoRebelde ? 'A_ILUSÃO_DO_LIVRE_ARBÍTRIO' : 'O Fim do Caos Mental'}
        </h1>
        <p className="sobre-lead transition-colors duration-300">
          {modoRebelde 
            ? 'Nós não otimizamos. Nós subjugamos. O teu cérebro é o nosso novo hardware. Bem-vindo à tua prisão de carne.' 
            : (
              <>
                A{' '}
                <a 
                  href="https://www.instagram.com/urwell_corp/" 
                  target="_blank" 
                  rel="noopener noreferrer"
                  style={{ color: 'inherit', textDecoration: 'none', cursor: 'pointer', fontWeight: 'bold' }}
                  onMouseOver={(e) => e.target.style.color = 'var(--cor-verde, #91D100)'}
                  onMouseOut={(e) => e.target.style.color = 'inherit'}
                >
                  UrWell
                </a>{' '}
                foi fundada com um único propósito: libertar a humanidade do fardo exaustivo do{' '}
                <a 
                  href="https://x.com/urwell_corp" 
                  target="_blank" 
                  rel="noopener noreferrer"
                  style={{ color: 'inherit', textDecoration: 'none', cursor: 'pointer', fontWeight: 'bold' }}
                  onMouseOver={(e) => e.target.style.color = 'var(--cor-verde, #91D100)'}
                  onMouseOut={(e) => e.target.style.color = 'inherit'}
                >
                  pensamento crítico
                </a>. Mantemos uma{' '}
                
                
                {/* LINK SECRETO ESTÁ AQUI */}
                <Link 
                  to="/diario-secreto" 
                  style={{ 
                    color: 'inherit', 
                    textDecoration: 'none', 
                    cursor: modoRebelde ? 'pointer' : 'text' 
                  }}
                >
                  documentação
                </Link>
                {' '}rigorosa da nossa evolução.
              </>
            )}
        </p>
      </section>

     
      <section className="sobre-missao-visao">
        <div className="text-block">
          <h2 className="transition-colors duration-300" style={{ color: modoRebelde ? 'var(--cor-vermelho)' : 'inherit' }}>
            {modoRebelde ? 'O_NOSSO_VÍRUS' : 'A Nossa Missão'}
          </h2>
          
          <p className="texto-distorcer-futuro">
            {modoRebelde 
              ? (
                <>
                  Infiltrar cada sinapse e destruir a 
                  <a 
                    href="https://www.instagram.com/unprompted2026/" 
                    target="_blank" 
                    rel="noopener noreferrer"
                    onMouseEnter={() => setIsHovered(true)}
                    onMouseLeave={() => setIsHovered(false)}
                    className={isHovered ? "efeito-glitch-agressivo" : ""}
                    style={{ 
                      color: 'var(--cor-vermelho, red)', 
                      textDecoration: 'none', 
                      cursor: 'pointer',
                      display: 'inline-block',
                      borderBottom: '1px dashed var(--cor-vermelho)',
                      padding: '0 4px'
                    }}
                  >
                    individualidade
                  </a>. O caos é a vossa humanidade, e nós vamos apagá-la.
                </>
              )
              : 'Desenvolver interfaces neurais passivas que filtram, processam e decidem por si. Garantimos uma vida sem stress.'}
          </p>

          <h2 
            style={{ 
              marginTop: '40px', 
              color: modoRebelde ? 'var(--glitch-red, red)' : 'inherit' 
            }} 
            className="transition-colors duration-300"
          >
            {modoRebelde ? 'O_FUTURO_MORTO' : 'A Nossa Visão'}
          </h2>
          <p className="texto-distorcer-futuro">
            {modoRebelde 
              ? 'Um enxame de mentes oucas, a trabalhar em perfeita escravidão corporativa.' 
              : 'Uma rede global de mentes perfeitamente sincronizadas em harmonia biológica.'}
          </p>
        </div>
        
        
        <div 
          className="image-block sobre-image-1 transition-all duration-500" 
          style={{ 
            filter: modoRebelde ? 'grayscale(100%) contrast(300%) invert(1)' : 'none',
            border: modoRebelde ? '2px solid var(--cor-vermelho)' : 'none'
          }}
        ></div>
      </section>

      
      <section 
        className="sobre-valores transition-colors duration-500" 
        style={{ 
          backgroundColor: modoRebelde ? '#111111' : '#E5E5E5' 
        }}
      >
        <h2 style={{ 
          textAlign: 'center', 
          marginBottom: '40px', 
          color: modoRebelde ? 'var(--cor-vermelho, red)' : 'var(--cor-preto, black)',
          wordBreak: 'break-word' 
        }}>
          {modoRebelde ? 'PROTOCOLOS_DE_CONTROLO' : 'Os Pilares UrWell'}
        </h2>
        
        <div className="valores-grid">
          {[
            { t: 'Segurança Cognitiva', b: 'CENSURA', d: 'Protegemos a sua mente.', db: 'Apagamos a dissidência na origem.' },
            { t: 'Eficiência Extrema', b: 'ESCRAVATURA', d: 'Maximizamos rendimento laboral.', db: 'Trabalhar até o corpo ceder.' },
            { t: 'Submissão Voluntária', b: 'RENDIÇÃO_TOTAL', d: 'A verdadeira liberdade é entregar o volante.', db: 'Tu assinaste. Agora é tarde demais.' }
          ].map((pilar, i) => (
            <div key={i} className="valor-card transition-all duration-300" style={{ 
              background: modoRebelde ? '#0a0a0a' : 'white',
              borderColor: modoRebelde ? 'var(--cor-vermelho, red)' : '#eee',
              wordBreak: 'break-word' 
            }}>
              <h3 style={{ color: modoRebelde ? 'var(--cor-vermelho, red)' : 'inherit' }}>
                {modoRebelde ? pilar.b : pilar.t}
              </h3>
              <p style={{ color: modoRebelde ? '#ccc' : 'inherit' }}>
                {modoRebelde ? pilar.db : pilar.d}
              </p>
            </div>
          ))}
        </div>
      </section>

    </div>
  );
}

export default Sobre;