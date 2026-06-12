import React, { useState, useEffect } from 'react';
import { onAuthStateChanged } from 'firebase/auth';
import { auth } from '../config/firebase'; 

function Equipa({ isBugged }) {
  const [isAdmin, setIsAdmin] = useState(false);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      setIsAdmin(!!user);
    });
    return () => unsubscribe();
  }, []);

  const modoRebelde = isAdmin ? false : isBugged;

  const team = [
    {
      roleNormal: 'Diretora de Recursos Humanos',
      roleBugged: 'SUPERVISORA DE SUBJUGAÇÃO',
      name: 'Drª. Helena Vance',
      image: '/src/assets/equipa_default.png', 
      descNormal: 'Garante que todos os colaboradores estão em perfeita harmonia e saúde mental no ambiente de trabalho.',
      descBugged: 'Filtra os "inadequados" para o projeto. Quem chumba nas avaliações não volta a ser visto.'
    },
    {
      roleNormal: 'Lead Neural Developer',
      roleBugged: 'ARQUITETO DE CADEIAS MENTAIS',
      name: 'Marcus "N0de" Silveira',
      image: '/src/assets/equipa_default.png',
      descNormal: 'Lidera a equipa que otimiza o código responsável pela comunicação com os chips biológicos da UrWell.',
      descBugged: 'Escreveu o algoritmo principal que suprime a empatia humana. Bebe para tentar esquecer o que fez.'
    },
    {
      roleNormal: 'Engenheiro de Sistemas Cognitivos',
      roleBugged: 'MECÂNICO DE LOBOTOMIA DIGITAL',
      name: 'Samuel Ramos',
      image: '/src/assets/equipa_default.png',
      descNormal: 'Garante zero falhas e latência nula na transmissão de dados neurais entre o utilizador e a nuvem.',
      descBugged: 'Tem acesso direto ao teu córtex frontal pela porta das traseiras do sistema. Se tu pensas, ele ouve.'
    },
    {
      roleNormal: 'Especialista em UX Neurológico',
      roleBugged: 'ILUSIONISTA DE LIVRE ARBÍTRIO',
      name: 'Ana T.',
      image: '/src/assets/equipa_default.png',
      descNormal: 'Desenha a interface de pensamento para que a tua experiência no ecossistema UrWell seja natural.',
      descBugged: 'O trabalho dela é fazer-te acreditar que as decisões injetadas pela UrWell no teu cérebro são ideias tuas.'
    },
    {
      roleNormal: 'Engenheiro de Segurança',
      roleBugged: 'CÃO DE GUARDA DO CÓDIGO',
      name: 'David Costa',
      image: '/src/assets/equipa_default.png',
      descNormal: 'Protege a integridade dos dados dos nossos utilizadores contra qualquer ameaça externa.',
      descBugged: 'Não nos protege dos hackers. Protege a UrWell de nós próprios. Ele apaga quem tenta falar.'
    },
    {
      roleNormal: 'Analista de Dados Biométricos',
      roleBugged: 'CEIFEIRA DE MEMÓRIAS',
      name: 'Sofia Almeida',
      image: '/src/assets/equipa_default.png',
      descNormal: 'Estuda os padrões de resposta neural para melhorar as atualizações de software de forma contínua.',
      descBugged: 'Vende os nossos picos de dopamina e memórias felizes aos maiores licitadores do mercado negro.'
    }
  ];

  return (
    <div className={`page-container transition-all duration-300 ${modoRebelde ? 'bg-black text-white efeito-glitch-suave' : 'bg-white text-black'}`} style={{ minHeight: '100vh', padding: '60px 20px' }}>
      
      <div style={{ maxWidth: '1200px', margin: '0 auto' }}>
        <div style={{ textAlign: 'center', marginBottom: '60px' }}>
          <h1 className="transition-colors duration-300" style={{ 
            fontFamily: modoRebelde ? 'var(--fonte-mono)' : 'inherit',
            color: modoRebelde ? 'var(--cor-vermelho, red)' : 'inherit',
            marginBottom: '15px',
            fontSize: '2.5rem',
            textShadow: modoRebelde ? '2px 0px 0px rgba(255,0,0,0.7), -2px 0px 0px rgba(0,255,255,0.7)' : 'none' // Efeito visual de falha de ecrã
          }}>
            {modoRebelde ? 'OS_CARCEREIROS' : 'A Nossa Equipa'}
          </h1>
          
          <p style={{ 
            maxWidth: '600px',
            margin: '0 auto',
            color: modoRebelde ? '#ff4444' : '#666',
            fontFamily: modoRebelde ? 'var(--fonte-mono)' : 'inherit',
            fontSize: '1.1rem',
            lineHeight: '1.6'
          }}>
            {modoRebelde 
              ? 'Aviso: Estes indivíduos construíram a tua gaiola. Memoriza os seus rostos.' 
              : 'Conhece as mentes brilhantes que trabalham diariamente para simplificar o teu processo de decisão.'}
          </p>
        </div>
        
        <div style={{ 
          display: 'grid', 
          gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))', 
          gap: '40px' 
        }}>
          {team.map((member, index) => (
            <div key={index} className="transition-all duration-300 hover:-translate-y-2 group" style={{
              padding: '40px 30px',
              borderRadius: modoRebelde ? '0' : '24px',
              border: modoRebelde ? '1px dashed var(--cor-vermelho, red)' : '1px solid #eee',
              backgroundColor: modoRebelde ? '#0a0a0a' : '#ffffff',
              boxShadow: modoRebelde ? '0 0 20px rgba(255,0,0,0.1)' : '0 10px 30px rgba(0,0,0,0.05)',
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
              textAlign: 'center'
            }}>
              
              <div style={{
                width: '120px',
                height: '120px',
                borderRadius: '50%',
                overflow: 'hidden',
                marginBottom: '20px',
                border: modoRebelde ? '3px solid var(--cor-vermelho, red)' : '4px solid #f0f0f0',
                boxShadow: modoRebelde ? 'inset 0 0 10px rgba(255,0,0,0.8)' : 'none',
                transition: 'all 0.3s ease'
              }}>
                <img 
                  src={member.image} 
                  alt={member.name} 
                  style={{ 
                    width: '100%', 
                    height: '100%', 
                    objectFit: 'cover',
                    filter: modoRebelde ? 'grayscale(100%) contrast(200%) brightness(80%)' : 'none'
                  }} 
                />
              </div>

              <h3 style={{ 
                color: modoRebelde ? 'var(--cor-vermelho, red)' : 'var(--cor-azul, #283e78)',
                marginBottom: '8px',
                fontSize: '0.9rem',
                textTransform: 'uppercase',
                letterSpacing: '1px',
                fontWeight: 'bold'
              }}>
                {modoRebelde ? member.roleBugged : member.roleNormal}
              </h3>
              
              <p style={{ 
                fontWeight: '800', 
                marginBottom: '20px', 
                color: modoRebelde ? '#fff' : '#222',
                fontSize: '1.4rem',
                fontFamily: modoRebelde ? 'var(--fonte-mono)' : 'inherit',
                textShadow: modoRebelde ? '1px 1px 0px red, -1px -1px 0px blue' : 'none'
              }}>
                {modoRebelde ? (member.name === 'Ana T.' ? 'A. TRAIDORA' : member.name.toUpperCase()) : member.name}
              </p>
              
              <p style={{ 
                color: modoRebelde ? '#aaa' : '#666', 
                fontSize: '1rem',
                lineHeight: '1.6',
                fontFamily: modoRebelde ? 'var(--fonte-mono)' : 'inherit'
              }}>
                {modoRebelde ? member.descBugged : member.descNormal}
              </p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

export default Equipa;