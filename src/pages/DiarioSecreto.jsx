import React, { useState, useEffect } from 'react';
import { collection, getDocs, addDoc, deleteDoc, updateDoc, doc, orderBy, query } from 'firebase/firestore';
import { onAuthStateChanged } from 'firebase/auth';
import { auth, db } from '../config/firebase'; // Sem Storage, apenas Auth e DB!
import Swal from 'sweetalert2';

function DiarioSecreto({ isBugged }) {
  const [isAdmin, setIsAdmin] = useState(false);
  const [posts, setPosts] = useState([]);
  const [carregando, setCarregando] = useState(true);
  const [atualizarLista, setAtualizarLista] = useState(0);

  // ESTADOS DO FORMULÁRIO DE CRIAÇÃO
  const [mostrarForm, setMostrarForm] = useState(false);
  const [novoTitulo, setNovoTitulo] = useState('');
  const [novaData, setNovaData] = useState('');
  const [novoTexto, setNovoTexto] = useState('');
  const [novaImagemLink, setNovaImagemLink] = useState(''); 

  // ESTADOS DE EDIÇÃO
  const [editandoId, setEditandoId] = useState(null);
  const [editTitulo, setEditTitulo] = useState('');
  const [editData, setEditData] = useState('');
  const [editTexto, setEditTexto] = useState('');
  const [editImagem, setEditImagem] = useState('');

  // 1. Verifica se é o Admin
  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      setIsAdmin(!!user);
    });
    return () => unsubscribe();
  }, []);

  // 2. BUSCAR DADOS AO FIREBASE
  useEffect(() => {
    const buscarDiario = async () => {
      try {
        const q = query(collection(db, "diariosecreto"), orderBy("data", "desc"));
        const querySnapshot = await getDocs(q);
        const listaDocs = querySnapshot.docs.map(doc => ({
          id: doc.id,
          ...doc.data()
        }));
        setPosts(listaDocs);
      } catch (error) {
        console.error("Erro ao carregar documentação:", error);
      } finally {
        setCarregando(false);
      }
    };
    buscarDiario();
  }, [atualizarLista]);

  // FUNÇÃO MÁGICA PARA O GOOGLE DRIVE
  // Transforma o link de partilha num link de imagem direto!
  const converterLinkDrive = (url) => {
    if (!url) return '';
    if (url.includes('drive.google.com/file/d/')) {
      const id = url.split('/d/')[1].split('/')[0];
      return `https://drive.google.com/uc?export=view&id=${id}`;
    }
    return url; // Se for link do Discord, Imgur, etc, deixa como está
  };

  // 3. ADICIONAR NOVO POST
  const handleAdicionar = async (e) => {
    e.preventDefault();
    try {
      const linkFinal = converterLinkDrive(novaImagemLink);

      await addDoc(collection(db, "diariosecreto"), {
        titulo: novoTitulo,
        data: novaData,
        texto: novoTexto,
        imagem: linkFinal
      });
      
      setNovoTitulo(''); setNovaData(''); setNovoTexto(''); setNovaImagemLink('');
      setMostrarForm(false);
      setAtualizarLista(prev => prev + 1);
      
      Swal.fire({ title: "Guardado", text: "Documentação adicionada ao feed.", icon: "success", timer: 1500, showConfirmButton: false });
    } catch (error) {
      console.error("ERRO COMPLETO:", error);
      Swal.fire("Erro", "Falha ao processar a documentação.", "error");
    }
  };

  // 4. APAGAR POST
  const handleApagar = (id) => {
    Swal.fire({
      title: 'Eliminar Registo?',
      text: "Vai apagar este documento para sempre.",
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#d33',
      cancelButtonColor: '#3085d6',
      confirmButtonText: 'Sim, eliminar'
    }).then(async (result) => {
      if (result.isConfirmed) {
        try {
          await deleteDoc(doc(db, "diariosecreto", id));
          setAtualizarLista(prev => prev + 1);
          Swal.fire({ title: 'Eliminado!', icon: 'success', timer: 1000, showConfirmButton: false });
        } catch {
          Swal.fire('Erro', 'Não foi possível apagar.', 'error');
        }
      }
    });
  };

  // 5. INICIAR EDIÇÃO
  const iniciarEdicao = (post) => {
    setEditandoId(post.id);
    setEditTitulo(post.titulo);
    setEditData(post.data);
    setEditTexto(post.texto || '');
    setEditImagem(post.imagem || '');
  };

  // 6. GUARDAR EDIÇÃO
  const guardarEdicao = async (id) => {
    try {
      const linkFinal = converterLinkDrive(editImagem);

      await updateDoc(doc(db, "diariosecreto", id), {
        titulo: editTitulo,
        data: editData,
        texto: editTexto,
        imagem: linkFinal
      });
      setEditandoId(null);
      setAtualizarLista(prev => prev + 1);
      Swal.fire({ title: "Atualizado!", icon: "success", timer: 1500, showConfirmButton: false });
    } catch {
      Swal.fire("Erro", "Não foi possível modificar o registo.", "error");
    }
  };

  // 7. PREVIEW DA IMAGEM GIGANTE
  const abrirImagem = (urlImagem) => {
    Swal.fire({
      imageUrl: urlImagem,
      imageAlt: 'Visualização da Documentação',
      width: '80%', 
      showConfirmButton: false,
      showCloseButton: true,
      background: isBugged ? '#111' : '#fff',
      backdrop: `rgba(0,0,0,0.92)`
    });
  };

  // 8. FAZER DOWNLOAD DA IMAGEM
  const fazerDownload = (url) => {
    const link = document.createElement('a');
    link.href = url;
    link.target = '_blank';
    link.download = 'UrWell_Documentacao';
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  if (carregando) return <div className="min-h-screen flex items-center justify-center font-mono">A descriptografar dados...</div>;

  return (
    <div className={`min-h-screen p-8 transition-colors duration-500 ${isBugged ? 'bg-black text-green-500 font-mono' : 'bg-neutral-50 text-neutral-800'}`}>
      
      <div className="max-w-4xl mx-auto">
        {/* CABEÇALHO */}
        <header className={`border-b-2 pb-6 mb-10 ${isBugged ? 'border-green-500' : 'border-neutral-200'}`}>
          <div className="flex justify-between items-end">
            <div>
              <h1 className={`text-4xl font-bold tracking-tight ${isBugged ? 'text-red-500 uppercase' : 'text-neutral-900'}`}>
                {isBugged ? 'LOGS_INTERCETADOS' : 'Documentação UrWell'}
              </h1>
              <p className={`mt-2 ${isBugged ? 'text-green-700' : 'text-neutral-500'}`}>
                {isBugged ? 'Arquivos confidenciais expostos.' : 'Repositório de recursos e comunicações da equipa.'}
              </p>
            </div>
            
            {/* BOTÃO ADICIONAR (SÓ ADMIN) */}
            {isAdmin && (
              <button 
                onClick={() => setMostrarForm(!mostrarForm)}
                className={`px-4 py-2 font-bold rounded shadow-md transition-colors ${
                  isBugged 
                  ? 'bg-red-600 text-black hover:bg-red-700' 
                  : 'bg-neutral-900 text-white hover:bg-neutral-700'
                }`}
              >
                {mostrarForm ? 'Cancelar Edição' : '+ Novo Registo'}
              </button>
            )}
          </div>
        </header>

        {/* FORMULÁRIO DE ADICIONAR */}
        {isAdmin && mostrarForm && (
          <form onSubmit={handleAdicionar} className={`p-6 rounded-lg mb-10 border-2 ${isBugged ? 'border-red-600 bg-red-950/20 text-red-500' : 'border-neutral-200 bg-white shadow-sm text-neutral-800'}`}>
            <h3 className={`font-bold mb-4 ${isBugged ? 'text-red-500' : 'text-neutral-800'}`}>Adicionar Nova Documentação</h3>
            
            <div className="grid grid-cols-2 gap-4 mb-4">
              <div>
                <label className="block text-sm font-bold mb-1">Título</label>
                <input required type="text" value={novoTitulo} onChange={e => setNovoTitulo(e.target.value)} className="w-full p-2 border rounded text-black font-sans" />
              </div>
              <div>
                <label className="block text-sm font-bold mb-1">Data</label>
                <input required type="date" value={novaData} onChange={e => setNovaData(e.target.value)} className="w-full p-2 border rounded text-black font-sans" />
              </div>
            </div>
            
            <div className="mb-4">
              <label className="block text-sm font-bold mb-1">Texto do Registo (Opcional)</label>
              <textarea value={novoTexto} onChange={e => setNovoTexto(e.target.value)} placeholder="Partilha uma nota ou contexto..." className="w-full p-2 border rounded min-h-[100px] text-black font-sans" />
            </div>

            <div className="mb-6">
              <label className="block text-sm font-bold mb-1">Link do Anexo (Google Drive, Discord, Imgur)</label>
              <input 
                type="url" 
                placeholder="Ex: https://drive.google.com/file/d/..." 
                value={novaImagemLink} 
                onChange={e => setNovaImagemLink(e.target.value)} 
                className="w-full p-2 border rounded text-black text-sm font-sans" 
              />
              <p className="text-xs mt-1 opacity-70">Nota: O link do Drive é convertido automaticamente para visualização direta.</p>
            </div>

            <button type="submit" className={`px-6 py-2 font-bold rounded text-white ${isBugged ? 'bg-red-600 hover:bg-red-700' : 'bg-blue-600 hover:bg-blue-700'}`}>
              Publicar no Feed
            </button>
          </form>
        )}

        {/* FEED DE POSTS */}
        <div className="space-y-8">
          {posts.length === 0 ? (
            <p className="text-center italic opacity-50">A base de dados não contém registos.</p>
          ) : (
            posts.map((post) => (
              <article 
                key={post.id} 
                className={`p-6 rounded-lg shadow-sm border transition-all ${
                  isBugged 
                  ? 'bg-[#0a0a0a] border-red-900/30 hover:border-red-600/50' 
                  : 'bg-white border-neutral-200'
                }`}
              >
                {/* MODO EDIÇÃO */}
                {editandoId === post.id ? (
                  <div className="space-y-4 text-black font-sans">
                    <div className="flex gap-4">
                      <input type="date" value={editData} onChange={(e) => setEditData(e.target.value)} className="p-2 border rounded" />
                      <input type="text" value={editTitulo} onChange={(e) => setEditTitulo(e.target.value)} className="p-2 border rounded flex-1 font-bold" />
                    </div>
                    <textarea value={editTexto} onChange={(e) => setEditTexto(e.target.value)} className="w-full p-2 border rounded min-h-[100px]" placeholder="Texto opcional..." />
                    <input type="url" value={editImagem} onChange={(e) => setEditImagem(e.target.value)} className="w-full p-2 border rounded" placeholder="URL da Imagem..." />
                    <div className="flex gap-2">
                      <button onClick={() => guardarEdicao(post.id)} className="bg-green-600 text-white px-4 py-2 rounded font-bold">Guardar</button>
                      <button onClick={() => setEditandoId(null)} className="bg-neutral-300 text-black px-4 py-2 rounded font-bold">Cancelar</button>
                    </div>
                  </div>
                ) : (
                  /* MODO LEITURA */
                  <>
                    <div className="flex justify-between items-start mb-3">
                      <div>
                        <div className="flex items-center gap-3">
                          <div className={`w-8 h-8 rounded-full flex items-center justify-center font-bold text-sm ${isBugged ? 'bg-red-900 text-red-200' : 'bg-blue-100 text-blue-800'}`}>
                            {isBugged ? 'SYS' : 'UR'}
                          </div>
                          <div>
                            <h2 className={`text-lg font-bold ${isBugged ? 'text-white' : 'text-neutral-900'}`}>{post.titulo}</h2>
                            <span className={`text-xs ${isBugged ? 'text-red-500/70' : 'text-neutral-400'}`}>{post.data}</span>
                          </div>
                        </div>
                      </div>
                      
                      {/* ÍCONES DE ADMINISTRAÇÃO */}
                      {isAdmin && (
                        <div className="flex gap-2">
                          <button onClick={() => iniciarEdicao(post)} className="text-blue-500 hover:text-blue-700" title="Editar">
                            <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15.232 5.232l3.536 3.536m-2.036-5.036a2.5 2.5 0 113.536 3.536L6.5 21.036H3v-3.572L16.732 3.732z" />
                            </svg>
                          </button>
                          <button onClick={() => handleApagar(post.id)} className="text-red-500 hover:text-red-700" title="Apagar">
                            <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                            </svg>
                          </button>
                        </div>
                      )}
                    </div>

                    {/* SÓ MOSTRA O TEXTO SE ELE EXISTIR */}
                    {post.texto && post.texto.trim() !== '' && (
                      <p className={`whitespace-pre-wrap ml-11 mb-4 ${isBugged ? 'text-green-400 font-mono' : 'text-neutral-600 font-sans'}`}>
                        {post.texto}
                      </p>
                    )}

                    {/* ZONA DE ANEXOS / IMAGENS */}
                    {post.imagem && (
                      <div className="ml-11 inline-block mt-2 max-w-full">
                        <div className={`p-2 rounded-lg border flex flex-col ${isBugged ? 'border-red-900/50 bg-[#050505]' : 'border-neutral-200 bg-neutral-50'}`}>
                          
                          <img 
                            src={post.imagem} 
                            alt="Anexo" 
                            className="max-h-64 max-w-full object-cover rounded cursor-pointer hover:opacity-80 transition-opacity"
                            style={{ filter: 'none' }} 
                            onClick={() => abrirImagem(post.imagem)}
                            title="Clique para visualizar o documento"
                            onError={(e) => {
                              // Se falhar a carregar, substitui por um aviso para não ficar feio
                              e.target.onerror = null; 
                              e.target.src = 'https://via.placeholder.com/400x200.png?text=Ficheiro+não+é+imagem+ou+link+inválido';
                            }}
                          />
                          
                          <div className="flex justify-between items-center mt-2 px-1 gap-4">
                            <span className={`text-xs font-bold truncate ${isBugged ? 'text-red-500 font-mono' : 'text-neutral-500 font-sans'}`}>
                              Anexo de Registo
                            </span>
                            <button 
                              onClick={() => fazerDownload(post.imagem)}
                              className={`flex items-center gap-1 text-xs font-bold px-2 py-1 rounded transition-colors shrink-0 ${
                                isBugged ? 'bg-red-900/40 text-red-400 hover:bg-red-800' : 'bg-neutral-200 text-neutral-700 hover:bg-neutral-300'
                              }`}
                              title="Transferir ficheiro"
                            >
                              <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4" />
                              </svg>
                              Baixar
                            </button>
                          </div>
                        </div>
                      </div>
                    )}
                  </>
                )}
              </article>
            ))
          )}
        </div>

      </div>
    </div>
  );
}

export default DiarioSecreto;