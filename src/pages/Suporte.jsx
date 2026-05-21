import React, { useState, useEffect } from 'react';
import { onAuthStateChanged } from 'firebase/auth';
import { db, auth } from '../config/firebase'; // <- Adicionámos o db aqui!
// IMPORTANTÍSSIMO: Importar os comandos do Firestore
import { collection, getDocs, addDoc, deleteDoc, doc, updateDoc } from 'firebase/firestore'; 
import Swal from 'sweetalert2';
import emailjs from '@emailjs/browser';
import { useGlitchDinamico } from '../hooks/useGlitchDinamico';

function Suporte({ isBugged }) {
  const [faqs, setFaqs] = useState([]); // Começa vazio, vai buscar à net
  const [carregandoFaqs, setCarregandoFaqs] = useState(true);
  const [indiceAtual, setIndiceAtual] = useState(0);
  const [isAdmin, setIsAdmin] = useState(false);

  const [mostrarForm, setMostrarForm] = useState(false);
  const [novaQ, setNovaQ] = useState('');
  const [novaANormal, setNovaANormal] = useState('');
  const [novaABugged, setNovaABugged] = useState('');
  const [editandoId, setEditandoId] = useState(null);
  const [editQ, setEditQ] = useState('');
  const [editANormal, setEditANormal] = useState('');
  const [editABugged, setEditABugged] = useState('');

  // 1. VERIFICAR ADMIN
  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      setIsAdmin(!!user); 
    });
    return () => unsubscribe();
  }, []);

  // 2. BUSCAR FAQS À BASE DE DADOS (FIRESTORE)
  useEffect(() => {
    const fetchFaqs = async () => {
      try {
        const querySnapshot = await getDocs(collection(db, 'faqs'));
        const faqsData = querySnapshot.docs.map(doc => ({
          id: doc.id, // O ID agora é a chave única gerada pelo Firebase
          ...doc.data()
        }));
        setFaqs(faqsData);
      } catch (error) {
        console.error("Erro ao buscar faqs do Firebase:", error);
      } finally {
        setCarregandoFaqs(false);
      }
    };
    fetchFaqs();
  }, []);

  const estadoGlitch = useGlitchDinamico(isAdmin, isBugged);
  const modoRebelde = isAdmin ? false : (isBugged || estadoGlitch.ativo);

  const mudarPagina = (direcao) => {
    if (faqs.length === 0) return;
    setIndiceAtual((prev) => {
      let novoIndice = prev + (direcao * 2);
      if (novoIndice < 0) {
        const resto = faqs.length % 2;
        return Math.max(0, faqs.length - (resto === 0 ? 2 : resto));
      }
      if (novoIndice >= faqs.length) return 0;
      return novoIndice;
    });
  };

  const faqsVisiveis = faqs.slice(indiceAtual, indiceAtual + 2);

  // 3. ADICIONAR FAQ À BASE DE DADOS
  const handleAdicionar = async (e) => {
    e.preventDefault();
    try {
      const novaFaqData = { q: novaQ, aNormal: novaANormal, aBugged: novaABugged, dataCriacao: new Date() };
      
      // Envia para o Firebase
      const docRef = await addDoc(collection(db, 'faqs'), novaFaqData);
      
      // Atualiza o ecrã com o ID real que veio do Firebase
      const novaFaq = { id: docRef.id, ...novaFaqData };
      setFaqs([...faqs, novaFaq]);
      
      setNovaQ(''); setNovaANormal(''); setNovaABugged('');
      setMostrarForm(false);
      Swal.fire("FAQ Criada", "A nova diretriz foi implementada.", "success");
    } catch (error) {
      Swal.fire("Erro", "Falha de comunicação com o servidor Central.", error);
    }
  };

  // 4. APAGAR FAQ DA BASE DE DADOS
  const handleApagar = (id) => {
    Swal.fire({
      title: "Purgar Pergunta?",
      icon: "warning",
      showCancelButton: true,
      confirmButtonText: "Sim, Purgar!",
    }).then(async (result) => {
      if (result.isConfirmed) {
        try {
          // Apaga no Firebase
          await deleteDoc(doc(db, 'faqs', id));
          
          // Apaga no ecrã
          const novasFaqs = faqs.filter(f => f.id !== id);
          setFaqs(novasFaqs);
          if (indiceAtual >= novasFaqs.length) setIndiceAtual(Math.max(0, novasFaqs.length - 2));
          
          Swal.fire("Purgada!", "Registo apagado do servidor.", "success");
        } catch (error) {
          Swal.fire("Erro", "A Resistência bloqueou a purga.", error);
        }
      }
    });
  };

  // 5. EDITAR FAQ NA BASE DE DADOS
  const iniciarEdicao = (faq) => {
    setEditandoId(faq.id); setEditQ(faq.q); setEditANormal(faq.aNormal); setEditABugged(faq.aBugged);
  };

  const guardarEdicao = async (id) => {
    try {
      // Atualiza no Firebase
      const faqRef = doc(db, 'faqs', id);
      await updateDoc(faqRef, { q: editQ, aNormal: editANormal, aBugged: editABugged });

      // Atualiza no ecrã
      const novasFaqs = faqs.map(f => f.id === id ? { ...f, q: editQ, aNormal: editANormal, aBugged: editABugged } : f);
      setFaqs(novasFaqs);
      setEditandoId(null);
      Swal.fire({ title: "Atualizado!", icon: "success", timer: 1500, showConfirmButton: false });
    } catch (error) {
      Swal.fire("Erro", "Não foi possível recalibrar a informação.", error);
    }
  };

  return (
    <div className={`page-container transition-colors duration-700 ${modoRebelde ? 'bg-black text-white' : 'bg-white text-black'} ${estadoGlitch.ativo ? estadoGlitch.classe : ''}`}>
      <section className="sobre-hero transition-colors duration-700">
        <h1 style={{ color: modoRebelde ? 'var(--glitch-red, red)' : 'inherit', transition: 'color 0.5s' }}>
          {modoRebelde ? 'CENTRO_DE_RECALIBRAÇÃO' : 'Centro de Apoio ao Cidadão'}
        </h1>
        <p className="sobre-lead transition-colors duration-700" style={{ color: modoRebelde ? '#ff9999' : 'inherit' }}>
          {modoRebelde 
            ? 'A tua submissão falhou? Reporta aqui a tua resistência para execução imediata.' 
            : 'Dúvidas sobre a sua otimização? Estamos aqui para garantir que a sua mente nunca saia do trilho.'}
        </p>

        {isAdmin && (
          <div style={{ marginTop: '30px', display: 'flex', justifyContent: 'center' }}>
            <button 
              onClick={() => setMostrarForm(!mostrarForm)}
              style={{ background: 'var(--cor-preto, black)', color: 'var(--cor-branco, white)', padding: '10px 20px', border: 'none', borderRadius: '5px', fontWeight: 'bold' }}
            >
              {mostrarForm ? 'Cancelar' : '+ Adicionar FAQ'}
            </button>
          </div>
        )}
      </section>

      <section className="suporte-content" style={{ maxWidth: '800px', margin: '0 auto', padding: '0 5% 80px 5%' }}>
        
        {isAdmin && mostrarForm && (
          <form onSubmit={handleAdicionar} style={{ background: '#f5f5f5', padding: '30px', borderRadius: '8px', marginBottom: '40px', border: '1px solid #ddd', color: 'black' }}>
            <h3 style={{ marginBottom: '20px' }}>Criar Nova FAQ (Live Server)</h3>
            <div style={{ marginBottom: '15px' }}>
              <label style={{ display: 'block', fontWeight: 'bold', marginBottom: '5px' }}>Pergunta</label>
              <input required type="text" value={novaQ} onChange={e => setNovaQ(e.target.value)} style={{ width: '100%', padding: '10px', borderRadius: '5px', border: '1px solid #ccc' }} />
            </div>
            <div style={{ marginBottom: '15px' }}>
              <label style={{ display: 'block', fontWeight: 'bold', marginBottom: '5px', color: '#007AFF' }}>Resposta Normal (Modo Corporativo)</label>
              <textarea required value={novaANormal} onChange={e => setNovaANormal(e.target.value)} style={{ width: '100%', padding: '10px', borderRadius: '5px', border: '1px solid #ccc', minHeight: '80px' }} />
            </div>
            <div style={{ marginBottom: '20px' }}>
              <label style={{ display: 'block', fontWeight: 'bold', marginBottom: '5px', color: 'red' }}>Resposta Bugged (Modo Resistência)</label>
              <textarea required value={novaABugged} onChange={e => setNovaABugged(e.target.value)} style={{ width: '100%', padding: '10px', borderRadius: '5px', border: '1px solid #ccc', minHeight: '80px' }} />
            </div>
            <button type="submit" className="btn-primary" style={{ width: '100%', background: 'black', color: 'white', padding: '15px', border: 'none', fontWeight: 'bold' }}>Injetar na Base de Dados</button>
          </form>
        )}

        <div className="faq-section">
          <h2 style={{ marginBottom: '30px', textAlign: 'center' }}>Perguntas Frequentes</h2>
          
          {/* Mostra um aviso enquanto carrega da net */}
          {carregandoFaqs ? (
            <div style={{ textAlign: 'center', padding: '40px', color: '#888' }}>
               A ligar aos servidores Centrais UrWell...
            </div>
          ) : faqs.length === 0 ? (
            <div style={{ textAlign: 'center', padding: '40px', color: '#888' }}>
               Ainda não existem diretrizes públicas. (Aguarda e envia a tua FAQ!)
            </div>
          ) : (
            <div style={{ display: 'flex', alignItems: 'center', gap: '20px' }}>
              <button className="nav-arrow transition-colors" onClick={() => mudarPagina(-1)} style={{ background: 'none', border: 'none', fontSize: '2rem', cursor: 'pointer', color: modoRebelde ? 'red' : 'black' }}>
                &#10094;
              </button>
              
              <div style={{ flex: 1, minHeight: '300px' }}>
                {faqsVisiveis.map((faq) => (
                  <div key={faq.id} className="valor-card transition-all duration-500" style={{ position: 'relative', marginBottom: '20px', textAlign: 'left', padding: '20px', border: '1px solid', borderColor: modoRebelde ? '#330000' : '#eee', borderRadius: '8px', background: modoRebelde ? '#0a0a0a' : 'transparent' }}>
                    
                    {editandoId === faq.id ? (
                      <div style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
                        <input type="text" value={editQ} onChange={e => setEditQ(e.target.value)} style={{ padding: '8px', border: '1px solid #ccc', fontWeight: 'bold', color: 'black' }} />
                        <textarea value={editANormal} onChange={e => setEditANormal(e.target.value)} style={{ padding: '8px', border: '1px solid #007AFF', minHeight: '60px', color: 'black' }} placeholder="Resposta Normal" />
                        <textarea value={editABugged} onChange={e => setEditABugged(e.target.value)} style={{ padding: '8px', border: '1px solid red', minHeight: '60px', color: 'black' }} placeholder="Resposta Bugged" />
                        <div style={{ display: 'flex', gap: '10px' }}>
                          <button onClick={() => guardarEdicao(faq.id)} style={{ background: '#007AFF', color: 'white', padding: '5px 15px', border: 'none', borderRadius: '4px' }}>Guardar no Firebase</button>
                          <button onClick={() => setEditandoId(null)} style={{ background: '#ccc', color: 'black', padding: '5px 15px', border: 'none', borderRadius: '4px' }}>Cancelar</button>
                        </div>
                      </div>
                    ) : (
                      <>
                        {isAdmin && (
                          <div style={{ position: 'absolute', top: '15px', right: '15px', display: 'flex', gap: '10px' }}>
                            <button onClick={() => iniciarEdicao(faq)} style={{ background: 'transparent', border: 'none', cursor: 'pointer', color: '#007AFF' }} title="Editar">
                              <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15.232 5.232l3.536 3.536m-2.036-5.036a2.5 2.5 0 113.536 3.536L6.5 21.036H3v-3.572L16.732 3.732z" />
                              </svg>
                            </button>
                            <button onClick={() => handleApagar(faq.id)} style={{ background: 'transparent', border: 'none', cursor: 'pointer', color: 'red' }} title="Apagar">
                              <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                              </svg>
                            </button>
                          </div>
                        )}

                        <h3 className="transition-colors duration-500" style={{ fontSize: '1.1rem', color: modoRebelde ? 'var(--glitch-red, red)' : 'var(--urwell-blue, blue)', paddingRight: isAdmin ? '50px' : '0' }}>
                          {faq.q}
                        </h3>
                        <p className="transition-colors duration-500" style={{ marginTop: '10px', fontSize: '0.95rem', color: modoRebelde ? '#ffaaaa' : 'inherit' }}>
                          {modoRebelde ? faq.aBugged : faq.aNormal}
                        </p>
                      </>
                    )}
                  </div>
                ))}
              </div>

              <button className="nav-arrow transition-colors" onClick={() => mudarPagina(1)} style={{ background: 'none', border: 'none', fontSize: '2rem', cursor: 'pointer', color: modoRebelde ? 'red' : 'black' }}>
                &#10095;
              </button>
            </div>
          )}
          
          {faqs.length > 0 && (
            <div style={{ textAlign: 'center', marginTop: '10px', color: '#888', fontSize: '0.9rem' }}>
              A mostrar {indiceAtual + 1} a {Math.min(indiceAtual + 2, faqs.length)} de {faqs.length}
            </div>
          )}
        </div>

        {/* ... FORMULÁRIO DE CONTACTO DA URWELL (CÓDIGO MANTIDO INTACTO) ... */}
        <div className="bci-form-container transition-colors duration-700" style={{ marginTop: '60px', background: modoRebelde ? '#111' : '#f5f5f7', padding: '30px', borderRadius: '8px' }}>
          <h3 className="transition-colors duration-500" style={{ color: modoRebelde ? 'red' : 'inherit' }}>
            {modoRebelde ? 'REPORTAR_DISSIDÊNCIA' : 'Submeter Relatório de Incidente'}
          </h3>
          
          <form 
            className="form-step" 
            style={{ display: 'flex', flexDirection: 'column', gap: '15px', marginTop: '20px' }}
            onSubmit={(e) => {
              e.preventDefault();
              
              Swal.fire({
                title: modoRebelde ? "A ROUBAR DADOS..." : "A Processar...",
                text: "Por favor, aguarde.",
                allowOutsideClick: false,
                didOpen: () => Swal.showLoading()
              });

              const dataAtual = new Date().toLocaleString('pt-PT');
              
              const templateParams = {
                id_cidadao: e.target.idCidadao.value,
                user_email: e.target.userEmail.value,
                mensagem: e.target.descricao.value,
                data_hora: dataAtual
              };

              emailjs.send(
                'service_2q1vbq6',    
                'template_xq5zxkf',   
                templateParams,
                '9CWyUbcfYsNLVZ9gl'     
              )
              .then(() => {
                Swal.fire({
                  icon: "success",
                  title: modoRebelde ? "LOCALIZAÇÃO RASTREADA." : "Relatório Enviado",
                  text: modoRebelde ? "Não te movas. Eles sabem onde estás." : "Verifique o seu email para a confirmação corporativa.",
                  background: modoRebelde ? "#0a0a0a" : "#fff",
                  color: modoRebelde ? "red" : "#000",
                  confirmButtonColor: modoRebelde ? "red" : "#000"
                });
                e.target.reset(); 
              })
              .catch(() => {
                Swal.fire("Erro de Ligação", "Os servidores da UrWell estão em baixo.", "error");
              });
            }}
          >
            <div style={{ display: 'flex', gap: '15px' }}>
              <div style={{ flex: 1 }}>
                <label style={{ color: modoRebelde ? 'red' : 'inherit' }}>Nome</label>
                <input 
                  name="idCidadao"
                  required
                  type="text" 
                  placeholder="Ex: User" 
                  className="transition-colors duration-500"
                  style={{ width: '100%', padding: '10px', borderRadius: '4px', border: '1px solid #ccc', background: modoRebelde ? '#222' : '#fff', color: modoRebelde ? 'red' : 'black', marginTop: '5px' }} 
                />
              </div>
              <div style={{ flex: 2 }}>
                <label style={{ color: modoRebelde ? 'red' : 'inherit' }}>Email de Contacto (Obrigatório)</label>
                <input 
                  name="userEmail"
                  required
                  type="email" 
                  placeholder="user@exemplo.com" 
                  className="transition-colors duration-500"
                  style={{ width: '100%', padding: '10px', borderRadius: '4px', border: '1px solid #ccc', background: modoRebelde ? '#222' : '#fff', color: modoRebelde ? 'red' : 'black', marginTop: '5px' }} 
                />
              </div>
            </div>
            
            <label style={{ color: modoRebelde ? 'red' : 'inherit' }}>Descrição da Anomalia</label>
            <textarea 
              name="descricao"
              required
              placeholder={modoRebelde ? "Diz a verdade!" : "Descreva a anomalia"} 
              className="transition-colors duration-500"
              style={{ width: '100%', padding: '15px', borderRadius: '8px', border: '1px solid #ddd', minHeight: '100px', background: modoRebelde ? '#222' : '#fff', color: modoRebelde ? 'red' : 'black' }}
            ></textarea>
            
            <button 
              type="submit"
              className="btn-primary transition-colors duration-500" 
              style={{ padding: '15px', border: 'none', color: 'white', cursor: 'pointer', background: modoRebelde ? 'var(--glitch-red, red)' : 'black' }}
            >
              {modoRebelde ? 'CONFESSAR' : 'Enviar Relatório'}
            </button>
          </form>
        </div>

      </section>
    </div>
  );
}

export default Suporte;