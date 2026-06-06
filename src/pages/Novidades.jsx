import React, { useState, useEffect } from 'react';
import { collection, getDocs, addDoc, deleteDoc, updateDoc, doc, orderBy, query } from 'firebase/firestore';
import { onAuthStateChanged } from 'firebase/auth';
import { db, auth } from '../config/firebase';
import Swal from 'sweetalert2';

function Novidades({ isBugged }) {
  const [novidades, setNovidades] = useState([]);
  const [isAdmin, setIsAdmin] = useState(false);
  const [carregando, setCarregando] = useState(true);
  const [atualizarLista, setAtualizarLista] = useState(0);


  const [limiteVisivel, setLimiteVisivel] = useState(3);
  const [ordem, setOrdem] = useState("desc");


  const [mostrarForm, setMostrarForm] = useState(false);
  const [novoTitulo, setNovoTitulo] = useState('');
  const [novaData, setNovaData] = useState('');
  const [novoSubtitulo, setNovoSubtitulo] = useState('');

 
  const [editandoId, setEditandoId] = useState(null); 
  const [editTitulo, setEditTitulo] = useState('');
  const [editData, setEditData] = useState('');
  const [editSubtitulo, setEditSubtitulo] = useState('');

 
  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      setIsAdmin(!!user); 
    });
    return () => unsubscribe();
  }, []);

  
  useEffect(() => {
    const buscarNovidades = async () => {
      try {
       const q = query(collection(db, "novidades"), orderBy("data", ordem));
        const querySnapshot = await getDocs(q);
        const listaNovidades = querySnapshot.docs.map(doc => ({
          id: doc.id,
          ...doc.data()
        }));
        setNovidades(listaNovidades);
      } catch { 
        console.log("Erro a ligar aos servidores da UrWell."); 
      } finally {
        setCarregando(false);
      }
    };

    buscarNovidades();
  }, [atualizarLista, ordem]);

  
  const handleAdicionar = async (e) => {
    e.preventDefault();
    try {
      await addDoc(collection(db, "novidades"), {
        titulo: novoTitulo,
        data: novaData,
        subtitulo: novoSubtitulo
      });
      
      setNovoTitulo(''); setNovaData(''); setNovoSubtitulo('');
      setMostrarForm(false);
      setAtualizarLista(prev => prev + 1); 
      
      Swal.fire({
        title: "Registo Criado",
        text: "A nova comunicação corporativa foi propagada.",
        icon: "success",
        confirmButtonColor: "#000000"
      });
    } catch {
      Swal.fire("Erro", "Falha ao adicionar novidade no servidor.", "error");
    }
  };

 
  const handleApagar = (id) => {
    Swal.fire({
      title: "Purgar Registo?",
      text: "Esta ação é irreversível e os dados serão eliminados do sistema.",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#FF0000",
      cancelButtonColor: "#CCCCCC",
      confirmButtonText: "Sim, Purgar!",
      cancelButtonText: "Cancelar"
    }).then(async (result) => {
      if (result.isConfirmed) {
        try {
          await deleteDoc(doc(db, "novidades", id));
          setAtualizarLista(prev => prev + 1); 
          Swal.fire("Purgado!", "A informação foi apagada da existência.", "success");
        } catch {
          Swal.fire("Erro", "Os ficheiros não puderam ser apagados.", "error");
        }
      }
    });
  };

 
  const iniciarEdicao = (item) => {
    setEditandoId(item.id);
    setEditTitulo(item.titulo);
    setEditData(item.data);
    setEditSubtitulo(item.subtitulo);
  };


  const guardarEdicao = async (id) => {
    try {
      await updateDoc(doc(db, "novidades", id), {
        titulo: editTitulo,
        data: editData,
        subtitulo: editSubtitulo
      });
      setEditandoId(null);
      setAtualizarLista(prev => prev + 1); 
      
      Swal.fire({
        title: "Atualizado!",
        text: "O registo foi reescrito com sucesso.",
        icon: "success",
        confirmButtonColor: "#000000",
        timer: 1500, 
        showConfirmButton: false
      });
    } catch {
      Swal.fire("Erro", "Não foi possível modificar o registo.", "error");
    }
  };

  const mostrarMais = () => {
    setLimiteVisivel(prev => prev + 3);
  };

  if (carregando) return <div className="page-container" style={{display: 'flex', justifyContent: 'center', alignItems: 'center'}}>A carregar dados dos servidores UrWell...</div>;

  const novidadesVisiveis = novidades.slice(0, limiteVisivel);

  return (
    <div className={isBugged ? 'tema-bug' : 'tema-urwell'} style={{ minHeight: '100vh', transition: 'all 0.5s ease' }}>
      <div className="page-container">
        
        
        <section className="page-header" style={{ position: 'relative' }}>
          <h1 style={isBugged ? { color: 'var(--cor-vermelho)' } : {}}>
            {isBugged ? 'Registos de Purga' : 'Comunicados Oficiais'}
          </h1>
          <p style={isBugged ? { color: '#888' } : {}}>
            {isBugged ? 'Acesso não autorizado detetado.' : 'As últimas atualizações do ecossistema UrWell.'}
          </p>

          
          {isAdmin && (
            <div style={{ marginTop: '30px', display: 'flex', justifyContent: 'center', gap: '15px' }}>
              <button 
                onClick={() => setMostrarForm(!mostrarForm)}
                style={{ background: 'var(--cor-preto)', color: 'var(--cor-branco)', padding: '10px 20px', border: 'none', borderRadius: '5px', fontWeight: 'bold' }}
              >
                {mostrarForm ? 'Cancelar' : '+ Adicionar Comunicado'}
              </button>
            </div>
          )}
        </section>

        
        {isAdmin && mostrarForm && (
          <form onSubmit={handleAdicionar} style={{ background: '#f5f5f5', padding: '30px', borderRadius: '16px', marginBottom: '40px', border: '1px solid #ddd', color: 'black' }}>
            <h3 style={{ marginBottom: '20px' }}>Criar Novo Registo</h3>
            <div style={{ display: 'flex', gap: '20px', marginBottom: '15px' }}>
              <div style={{ flex: 1 }}>
                <label style={{ display: 'block', fontWeight: 'bold', marginBottom: '5px' }}>Título</label>
                <input required type="text" value={novoTitulo} onChange={e => setNovoTitulo(e.target.value)} style={{ width: '100%', padding: '10px', borderRadius: '5px', border: '1px solid #ccc' }} />
              </div>
              <div style={{ flex: 1 }}>
                <label style={{ display: 'block', fontWeight: 'bold', marginBottom: '5px' }}>Data</label>
                <input required type="date" value={novaData} onChange={e => setNovaData(e.target.value)} style={{ width: '100%', padding: '10px', borderRadius: '5px', border: '1px solid #ccc' }} />
              </div>
            </div>
            <div style={{ marginBottom: '20px' }}>
              <label style={{ display: 'block', fontWeight: 'bold', marginBottom: '5px' }}>Subtítulo / Descrição</label>
              <textarea required value={novoSubtitulo} onChange={e => setNovoSubtitulo(e.target.value)} style={{ width: '100%', padding: '10px', borderRadius: '5px', border: '1px solid #ccc', minHeight: '100px' }} />
            </div>
            <button type="submit" className="btn-primary">Publicar</button>
          </form>
        )}

        <div style={{ display: 'flex', justifyContent: 'center', marginBottom: '40px' }}>
          <select 
            value={ordem} 
            onChange={(e) => setOrdem(e.target.value)}
            style={{
              
              padding: '10px 35px 10px 15px', 
              borderRadius: '8px', 
              border: isBugged ? '2px solid var(--cor-vermelho)' : '1px solid #ccc',
              background: isBugged ? '#0a0a0a' : '#fff',
              color: isBugged ? 'var(--cor-vermelho)' : '#333',
              cursor: 'pointer',
              fontWeight: 'bold',
              fontFamily: 'inherit',
              fontSize: '0.95rem',
              outline: 'none',
              boxShadow: isBugged ? 'none' : '0 2px 4px rgba(0,0,0,0.05)',
              transition: 'all 0.3s ease'
            }}
          >
            <option value="desc">↓ Mais Recentes Primeiro</option>
            <option value="asc">↑ Mais Antigos Primeiro</option>
          </select>
        </div>

        <div className="news-list">
          {novidadesVisiveis.length === 0 ? (
            <p style={{ textAlign: 'center', color: 'var(--cor-cinza)' }}>Nenhum comunicado disponível.</p>
          ) : (
            novidadesVisiveis.map((item) => (
              <article 
                key={item.id} 
                className="news-card" 
                style={isBugged ? { 
                  background: '#0a0a0a', 
                  borderLeftColor: 'var(--cor-vermelho)', 
                  color: 'var(--cor-branco)',
                  position: 'relative'
                } : { position: 'relative' }}
              >
                
                
                {editandoId === item.id ? (
                  <div style={{ display: 'flex', flexDirection: 'column', gap: '15px', color: 'black' }}>
                    <div style={{ display: 'flex', gap: '15px' }}>
                      <input 
                        type="date" 
                        value={editData} 
                        onChange={(e) => setEditData(e.target.value)} 
                        style={{ padding: '8px', border: '1px solid #ccc', borderRadius: '4px' }}
                      />
                      <input 
                        type="text" 
                        value={editTitulo} 
                        onChange={(e) => setEditTitulo(e.target.value)} 
                        style={{ padding: '8px', border: '1px solid #ccc', borderRadius: '4px', flex: 1, fontSize: '1.2rem', fontWeight: 'bold' }}
                      />
                    </div>
                    <textarea 
                      value={editSubtitulo} 
                      onChange={(e) => setEditSubtitulo(e.target.value)} 
                      style={{ padding: '10px', border: '1px solid #ccc', borderRadius: '4px', minHeight: '100px', width: '100%' }}
                    />
                    <div style={{ display: 'flex', gap: '10px' }}>
                      <button onClick={() => guardarEdicao(item.id)} style={{ background: '#007AFF', color: 'white', padding: '8px 15px', border: 'none', borderRadius: '4px', fontWeight: 'bold' }}>Guardar Alterações</button>
                      <button onClick={() => setEditandoId(null)} style={{ background: '#ccc', color: 'black', padding: '8px 15px', border: 'none', borderRadius: '4px', fontWeight: 'bold' }}>Cancelar</button>
                    </div>
                  </div>
                ) : (
                  <>
                    
                    {isAdmin && (
                      <div style={{ position: 'absolute', top: '20px', right: '20px', display: 'flex', gap: '10px' }}>
                        
                        <button 
                          onClick={() => iniciarEdicao(item)}
                          style={{ background: 'transparent', border: 'none', cursor: 'pointer', color: '#007AFF' }}
                          title="Editar Registo"
                        >
                          <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15.232 5.232l3.536 3.536m-2.036-5.036a2.5 2.5 0 113.536 3.536L6.5 21.036H3v-3.572L16.732 3.732z" />
                          </svg>
                        </button>
                        
                        <button 
                          onClick={() => handleApagar(item.id)}
                          style={{ background: 'transparent', border: 'none', cursor: 'pointer', color: 'var(--cor-vermelho)' }}
                          title="Purgar Registo"
                        >
                          <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                          </svg>
                        </button>
                      </div>
                    )}

                    <div className="news-date" style={isBugged ? { color: 'var(--cor-vermelho)' } : {}}>
                      {item.data}
                    </div>
                    
                    <h3 style={isBugged ? { color: 'var(--cor-vermelho)', paddingRight: isAdmin ? '60px' : '0' } : { paddingRight: isAdmin ? '60px' : '0' }}>
                      {item.titulo}
                    </h3>
                    
                    <p style={{ whiteSpace: 'pre-wrap' }}>
                      {item.subtitulo}
                    </p>
                  </>
                )}
              </article>
            ))
          )}
        </div>

        
        {limiteVisivel < novidades.length && (
          <div style={{ textAlign: 'center', marginTop: '50px' }}>
            <button 
              onClick={mostrarMais}
              className="btn-secondary"
              style={isBugged ? { borderColor: 'var(--cor-vermelho)', color: 'var(--cor-vermelho)' } : {}}
            >
              Ver Mais Comunicados ↓
            </button>
          </div>
        )}

      </div>
    </div>
  );
}

export default Novidades;