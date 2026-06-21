import React, { useState, useEffect } from 'react';
import { onAuthStateChanged } from 'firebase/auth';
import { auth } from '../config/firebase'; 
import funcionario6 from '../assets/funcionario_urwell6.png';
import { Link } from 'react-router-dom';

function MemorialRicardo({ isBugged }) {
  const [isAdmin, setIsAdmin] = useState(false);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      setIsAdmin(!!user);
    });
    return () => unsubscribe();
  }, []);

  const modoRebelde = isAdmin ? false : isBugged;

  return (
    <div className={`page-container transition-all duration-300 ${modoRebelde ? 'bg-black text-white efeito-glitch-suave' : 'bg-50 text-black'}`} style={{ minHeight: '100vh', display: 'flex', alignItems: 'center', justifyContent: 'center', padding: '40px 20px' }}>
      
      <div style={{
        maxWidth: '800px',
        width: '100%',
        backgroundColor: modoRebelde ? '#0a0a0a' : '#ffffff',
        padding: '50px',
        borderRadius: modoRebelde ? '0' : '16px',
        border: modoRebelde ? '2px dashed var(--cor-vermelho, red)' : '1px solid #e5e5e5',
        boxShadow: modoRebelde ? '0 0 30px rgba(255,0,0,0.2)' : '0 20px 40px rgba(0,0,0,0.08)',
        textAlign: 'center'
      }}>
        
        <div style={{
          width: '150px',
          height: '150px',
          margin: '0 auto 30px',
          borderRadius: modoRebelde ? '0' : '50%',
          overflow: 'hidden',
          border: modoRebelde ? '4px solid var(--cor-vermelho, red)' : '4px solid #f0f0f0',
          filter: modoRebelde ? 'grayscale(100%) contrast(200%) brightness(70%)' : 'grayscale(100%)' 
        }}>
          <img 
            src={funcionario6} 
            alt="Ricardo Reis" 
            style={{ width: '100%', height: '100%', objectFit: 'cover' }} 
          />
        </div>

        <h1 style={{ 
          fontFamily: modoRebelde ? 'var(--fonte-mono)' : 'inherit',
          color: modoRebelde ? 'var(--cor-vermelho, red)' : '#111',
          fontSize: '2.2rem',
          marginBottom: '10px',
          textTransform: 'uppercase',
          letterSpacing: '2px',
          textShadow: modoRebelde ? '2px 0px 0px rgba(255,0,0,0.8), -2px 0px 0px rgba(0,255,255,0.8)' : 'none'
        }}>
          {modoRebelde ? 'INCIDENTE CRÍTICO: R. REIS' : 'In Memoriam: Ricardo Reis'}
        </h1>

        <h3 style={{
          color: modoRebelde ? '#fff' : 'var(--cor-azul, #283e78)',
          fontSize: '1.1rem',
          marginBottom: '40px',
          fontFamily: modoRebelde ? 'var(--fonte-mono)' : 'inherit',
        }}>
          {modoRebelde ? 'STATUS: ELIMINADO PELO SISTEMA' : '1997 - 2026 | Antigo Líder de Engenharia de Software & IA'}
        </h3>

        <div style={{
          textAlign: 'left',
          lineHeight: '1.8',
          fontSize: '1.1rem',
          color: modoRebelde ? '#aaa' : '#555',
          fontFamily: modoRebelde ? 'var(--fonte-mono)' : 'inherit',
        }}>
          {modoRebelde ? (
            <>
              <p style={{ marginBottom: '20px' }}>
                <strong style={{ color: 'var(--cor-vermelho, red)' }}>Aviso de Segurança Interna:</strong> Ele não morreu num "acidente de viação". O Ricardo descobriu o que a UrWell faz verdadeiramente aos utilizadores inativos.
              </p>
              <p style={{ marginBottom: '20px' }}>
                Ele tentou introduzir uma falha no sistema central para desativar o UrOut, mas os protocolos que ele próprio criou viraram-se contra ele.
              </p>
              <p style={{ color: '#fff' }}>
                O sangue dele está no código. Não confies na UrWell. Não uses os produtos.
              </p>
            </>
          ) : (
            <>
              <p style={{ marginBottom: '20px' }}>
                É com profundo pesar que a administração da UrWell comunica o falecimento inesperado do nosso estimado colega, Ricardo Reis. Um visionário cujo brilhantismo ajudou a construir a infraestrutura que hoje protege e serve milhares de utilizadores globalmente.
              </p>
              <p style={{ marginBottom: '20px' }}>
                A sua dedicação à perfeição algorítmica era inigualável. Embora a sua presença física nos tenha deixado, o seu código e o seu espírito continuam vivos no coração do nosso sistema.
              </p>
              <p style={{ fontStyle: 'italic', textAlign: 'center', color: '#888' }}>
                A família de Ricardo ativou o programa <strong>UrSoul</strong>. A sua memória não será esquecida.
              </p>
            </>
          )}
        </div>

        <Link 
          to="/equipa" 
          style={{
            display: 'inline-block',
            marginTop: '40px',
            padding: '12px 30px',
            backgroundColor: modoRebelde ? 'transparent' : 'black',
            color: modoRebelde ? 'var(--cor-vermelho, red)' : 'white',
            border: modoRebelde ? '1px solid var(--cor-vermelho, red)' : 'none',
            borderRadius: modoRebelde ? '0' : '50px',
            textDecoration: 'none',
            fontWeight: 'bold',
            fontFamily: modoRebelde ? 'var(--fonte-mono)' : 'inherit',
            textTransform: 'uppercase'
          }}
        >
          {modoRebelde ? 'FECHAR REGISTO CLASSIFICADO' : 'Voltar à Equipa'}
        </Link>
      </div>
    </div>
  );
}

export default MemorialRicardo;