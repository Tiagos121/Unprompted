import React, { useState, useEffect } from 'react';
import { collection, getDocs, addDoc, deleteDoc, updateDoc, doc, orderBy, query } from 'firebase/firestore';
import { onAuthStateChanged } from 'firebase/auth';
import { auth, db } from '../config/firebase';
import Swal from 'sweetalert2';

function DiarioSecreto({ isBugged }) {
  const [isAdmin, setIsAdmin] = useState(false);
  const [posts, setPosts] = useState([]);
  const [carregando, setCarregando] = useState(true);
  const [atualizarLista, setAtualizarLista] = useState(0);
  const [ordem, setOrdem] = useState("desc");

  const [mostrarForm, setMostrarForm] = useState(false);
  const [novoTitulo, setNovoTitulo] = useState('');
  const [novaData, setNovaData] = useState('');
  const [novoTexto, setNovoTexto] = useState('');
  const [novaImagemLink, setNovaImagemLink] = useState(''); 
  const [novoTipoAnexo, setNovoTipoAnexo] = useState('imagem'); 

  const [editandoId, setEditandoId] = useState(null);
  const [editTitulo, setEditTitulo] = useState('');
  const [editData, setEditData] = useState('');
  const [editTexto, setEditTexto] = useState('');
  const [editImagem, setEditImagem] = useState('');
  const [editTipoAnexo, setEditTipoAnexo] = useState('imagem');

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      setIsAdmin(!!user);
    });
    return () => unsubscribe();
  }, []);

  useEffect(() => {
    const buscarDiario = async () => {
      try {
        const q = query(collection(db, "diariosecreto"), orderBy("data", ordem));
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
  }, [atualizarLista, ordem]);

  const converterLinkDrive = (url) => {
    if (!url) return '';
    let id = '';
    
    if (url.includes('/file/d/')) {
      id = url.split('/file/d/')[1].split('/')[0];
    } else if (url.includes('id=')) {
      id = url.split('id=')[1].split('&')[0];
    }

    if (id) {
      return `https://drive.google.com/file/d/${id}/preview`;
    }
    return url; 
  };

  const converterYoutube = (url) => {
    if (!url) return '';
    if (url.includes('youtube.com/watch?v=')) {
      return url.replace('watch?v=', 'embed/').split('&')[0];
    }
    if (url.includes('youtu.be/')) {
      return url.replace('youtu.be/', 'youtube.com/embed/').split('?')[0];
    }
    return url;
  };

  const handleAdicionar = async (e) => {
    e.preventDefault();
    try {
      const linkFinal = novoTipoAnexo === 'video' 
        ? converterYoutube(novaImagemLink) 
        : converterLinkDrive(novaImagemLink);

      await addDoc(collection(db, "diariosecreto"), {
        titulo: novoTitulo,
        data: novaData,
        texto: novoTexto,
        imagem: linkFinal,
        tipoAnexo: novoTipoAnexo 
      });
      
      setNovoTitulo(''); setNovaData(''); setNovoTexto(''); setNovaImagemLink(''); setNovoTipoAnexo('imagem');
      setMostrarForm(false);
      setAtualizarLista(prev => prev + 1);
      
      Swal.fire({ title: "Guardado", text: "Documentação adicionada ao feed.", icon: "success", timer: 1500, showConfirmButton: false });
    } catch (error) {
      console.error("ERRO COMPLETO:", error);
      Swal.fire("Erro", "Falha ao processar a documentação.", "error");
    }
  };

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

  const iniciarEdicao = (post) => {
    setEditandoId(post.id);
    setEditTitulo(post.titulo);
    setEditData(post.data);
    setEditTexto(post.texto || '');
    setEditImagem(post.imagem || '');
    setEditTipoAnexo(post.tipoAnexo || 'imagem');
  };

  const guardarEdicao = async (id) => {
    try {
      const linkFinal = editTipoAnexo === 'video' 
        ? converterYoutube(editImagem) 
        : converterLinkDrive(editImagem);

      await updateDoc(doc(db, "diariosecreto", id), {
        titulo: editTitulo,
        data: editData,
        texto: editTexto,
        imagem: linkFinal,
        tipoAnexo: editTipoAnexo
      });
      setEditandoId(null);
      setAtualizarLista(prev => prev + 1);
      Swal.fire({ title: "Atualizado!", icon: "success", timer: 1500, showConfirmButton: false });
    } catch {
      Swal.fire("Erro", "Não foi possível modificar o registo.", "error");
    }
  };

  const abrirImagemExterna = (urlImagem) => {
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

  if (carregando) return <div className="min-h-screen flex items-center justify-center font-mono">A descriptografar dados...</div>;

  return (
    <div className={`min-h-screen p-8 transition-colors duration-500 ${isBugged ? 'bg-black text-green-500 font-mono' : 'bg-neutral-50 text-neutral-800'}`}>
      <div className="max-w-4xl mx-auto">

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
            {isAdmin && (
              <button 
                onClick={() => setMostrarForm(!mostrarForm)}
                className={`px-4 py-2 font-bold rounded shadow-md transition-colors ${
                  isBugged ? 'bg-red-600 text-black hover:bg-red-700' : 'bg-neutral-900 text-white hover:bg-neutral-700'
                }`}
              >
                {mostrarForm ? 'Cancelar Edição' : '+ Novo Registo'}
              </button>
            )}
          </div>
        </header>

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
            
            <div className="mb-6 mt-6">
              <label className={`block text-sm font-bold mb-3 ${isBugged ? 'text-red-400' : 'text-neutral-800'}`}>
                Que tipo de ficheiro vais anexar?
              </label>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
                
                
                <div 
                  onClick={() => setNovoTipoAnexo('imagem')}
                  className={`cursor-pointer p-3 rounded-lg border-2 flex items-center gap-3 transition-all ${
                    novoTipoAnexo === 'imagem' 
                    ? (isBugged ? 'border-red-500 bg-red-950/40 text-red-400' : 'border-blue-500 bg-blue-50 text-blue-700 shadow-md') 
                    : 'border-neutral-200 bg-white text-neutral-500 hover:bg-neutral-50'
                  }`}
                >
                  <span className="text-3xl">📷</span>
                  <div className="leading-tight">
                    <span className="font-bold text-sm block">Imagem</span>
                    <span className="text-xs opacity-70">Fotos, Prints, PNG</span>
                  </div>
                </div>

                
                <div 
                  onClick={() => setNovoTipoAnexo('documento')}
                  className={`cursor-pointer p-3 rounded-lg border-2 flex items-center gap-3 transition-all ${
                    novoTipoAnexo === 'documento' 
                    ? (isBugged ? 'border-red-500 bg-red-950/40 text-red-400' : 'border-blue-500 bg-blue-50 text-blue-700 shadow-md') 
                    : 'border-neutral-200 bg-white text-neutral-500 hover:bg-neutral-50'
                  }`}
                >
                  <span className="text-3xl">📄</span>
                  <div className="leading-tight">
                    <span className="font-bold text-sm block">Documento</span>
                    <span className="text-xs opacity-70">PDF, Word, Guiões</span>
                  </div>
                </div>

               
                <div 
                  onClick={() => setNovoTipoAnexo('video')}
                  className={`cursor-pointer p-3 rounded-lg border-2 flex items-center gap-3 transition-all ${
                    novoTipoAnexo === 'video' 
                    ? (isBugged ? 'border-red-500 bg-red-950/40 text-red-400' : 'border-blue-500 bg-blue-50 text-blue-700 shadow-md') 
                    : 'border-neutral-200 bg-white text-neutral-500 hover:bg-neutral-50'
                  }`}
                >
                  <span className="text-3xl">🎥</span>
                  <div className="leading-tight">
                    <span className="font-bold text-sm block">Vídeo</span>
                    <span className="text-xs opacity-70">Links do YouTube</span>
                  </div>
                </div>

              </div>
            </div>

           
            <div className={`mb-6 p-4 rounded-lg border ${isBugged ? 'bg-[#050505] border-red-900/50' : 'bg-neutral-100 border-neutral-300'}`}>
              
              {novoTipoAnexo === 'imagem' && (
                <div className={`mb-4 text-sm p-3 rounded border-l-4 ${isBugged ? 'bg-red-900/20 border-red-500 text-red-300' : 'bg-blue-100 border-blue-500 text-blue-800'}`}>
                  <strong>💡 Como adicionar uma Imagem:</strong><br/>
                  1. Arrasta a foto para a pasta central do Google Drive.<br/>
                  2. Certifica-te que o acesso da pasta diz <b>"Qualquer pessoa com o link"</b>.<br/>
                  3. Copia o link partilhado e cola-o na caixa abaixo.<br/>
                  <em className="text-xs mt-2 block opacity-80">(Também funciona com caminhos da pasta public, ex: /foto.png)</em>
                </div>
              )}

              {novoTipoAnexo === 'documento' && (
                <div className={`mb-4 text-sm p-3 rounded border-l-4 ${isBugged ? 'bg-red-900/20 border-red-500 text-red-300' : 'bg-green-100 border-green-500 text-green-800'}`}>
                  <strong>💡 Como adicionar um Documento/Guião:</strong><br/>
                  1. Faz o upload do ficheiro PDF para a pasta do Google Drive.<br/>
                  2. Garante que as permissões de acesso estão como <b>"Qualquer pessoa com o link"</b>.<br/>
                  3. Cola o link aqui. O sistema vai criar um botão de visualização seguro.
                </div>
              )}

              {novoTipoAnexo === 'video' && (
                <div className={`mb-4 text-sm p-3 rounded border-l-4 ${isBugged ? 'bg-red-900/20 border-red-500 text-red-300' : 'bg-yellow-100 border-yellow-500 text-yellow-900'}`}>
                  <strong>⚠️ Regra Estrita para Vídeos:</strong><br/>
                  Os servidores do Google Drive bloqueiam streaming de vídeo. Para o site não ficar encravado:<br/>
                  1. Coloca o vídeo no teu <b>YouTube</b>.<br/>
                  2. Define a privacidade do vídeo como <b>"Não Listado"</b> (privado).<br/>
                  3. Copia o link do YouTube e cola-o abaixo. O site adapta o reprodutor nativo.
                </div>
              )}

              <label className={`block text-sm font-bold mb-2 ${isBugged ? 'text-red-500' : 'text-black'}`}>
                Link do Anexo (Cole aqui o URL)
              </label>
              <input 
                type="url" 
                placeholder={
                  novoTipoAnexo === 'video' ? "Ex: https://youtube.com/watch?v=..." : "Ex: https://drive.google.com/file/d/..."
                }
                value={novaImagemLink} 
                onChange={e => setNovaImagemLink(e.target.value)} 
                className="w-full p-2 border rounded text-black text-sm font-sans shadow-sm" 
              />
            </div>
            <button type="submit" className={`px-6 py-2 font-bold rounded text-white ${isBugged ? 'bg-red-600 hover:bg-red-700' : 'bg-blue-600 hover:bg-blue-700'}`}>
              Publicar no Feed
            </button>
          </form>
        )}

        <div className="flex justify-end mb-4">
          <select 
            value={ordem} 
            onChange={(e) => setOrdem(e.target.value)}
            className={`p-2 rounded text-sm font-bold cursor-pointer border shadow-sm transition-colors ${
              isBugged 
              ? 'bg-[#111] text-red-500 border-red-900/50 hover:bg-black' 
              : 'bg-white text-neutral-600 border-neutral-300 hover:bg-neutral-50'
            }`}
          >
            <option value="desc">↓ Mais Recentes Primeiro</option>
            <option value="asc">↑ Mais Antigos Primeiro</option>
          </select>
        </div>

        <div className="space-y-8">
          {posts.length === 0 ? (
            <p className="text-center italic opacity-50">A base de dados não contém registos.</p>
          ) : (
            posts.map((post) => (
              <article 
                key={post.id} 
                className={`p-6 rounded-lg shadow-sm border transition-all ${
                  isBugged ? 'bg-[#0a0a0a] border-red-900/30 hover:border-red-600/50' : 'bg-white border-neutral-200'
                }`}
              >
                {editandoId === post.id ? (
                  <div className="space-y-4 text-black font-sans">
                    <div className="flex gap-4">
                      <input type="date" value={editData} onChange={(e) => setEditData(e.target.value)} className="p-2 border rounded" />
                      <input type="text" value={editTitulo} onChange={(e) => setEditTitulo(e.target.value)} className="p-2 border rounded flex-1 font-bold" />
                    </div>
                    <textarea value={editTexto} onChange={(e) => setEditTexto(e.target.value)} className="w-full p-2 border rounded min-h-[100px]" />
                    <select value={editTipoAnexo} onChange={e => setEditTipoAnexo(e.target.value)} className="w-full p-2 border rounded">
                      <option value="imagem">📷 Imagem / Fotografia</option>
                      <option value="documento">📄 Documento</option>
                      <option value="video">🎥 Vídeo</option>
                    </select>
                    <input type="url" value={editImagem} onChange={(e) => setEditImagem(e.target.value)} className="w-full p-2 border rounded" placeholder="Novo Link..." />
                    <div className="flex gap-2">
                      <button onClick={() => guardarEdicao(post.id)} className="bg-green-600 text-white px-4 py-2 rounded font-bold">Guardar</button>
                      <button onClick={() => setEditandoId(null)} className="bg-neutral-300 text-black px-4 py-2 rounded font-bold">Cancelar</button>
                    </div>
                  </div>
                ) : (
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
                    
                    {post.texto && post.texto.trim() !== '' && (
                      <p className={`whitespace-pre-wrap ml-11 mb-4 ${isBugged ? 'text-green-400 font-mono' : 'text-neutral-600 font-sans'}`}>
                        {post.texto}
                      </p>
                    )}
   
                    {post.imagem && (
                      <div className="ml-11 mt-3">
                        <div className={`p-2 rounded-lg border flex flex-col w-fit max-w-full overflow-hidden ${isBugged ? 'border-red-900/50 bg-[#050505]' : 'border-neutral-200 bg-neutral-50'}`}>
                          
                          {(!post.tipoAnexo || post.tipoAnexo === 'imagem') && (
                            post.imagem.includes('drive.google.com') ? (
                              <div className="mt-1 flex flex-col items-start w-full">
                                <div className="w-full overflow-hidden rounded border border-neutral-300 min-w-[280px] sm:min-w-[400px] h-[350px]">
                                  <iframe 
                                    className="w-full h-full border-0 bg-[#111]"
                                    src={post.imagem} 
                                    title="Visualizador Seguro Google" 
                                    allow="autoplay"
                                  ></iframe>
                                </div>
                                <button 
                                  onClick={() => window.open(post.imagem, '_blank')}
                                  className={`mt-3 px-3 py-1.5 text-xs font-bold rounded transition-colors ${isBugged ? 'text-red-400 bg-red-900/30 hover:bg-red-900/60' : 'text-neutral-600 bg-neutral-200 hover:bg-neutral-300'}`}
                                >
                                  🔗 Abrir Original
                                </button>
                              </div>
                            ) : (
                              <img 
                                src={post.imagem} 
                                alt="Anexo" 
                                className="max-h-96 w-auto max-w-full object-contain rounded cursor-pointer hover:opacity-80 transition-opacity bg-white/5"
                                style={{ filter: 'none', minHeight: '100px', minWidth: '250px' }} 
                                onClick={() => abrirImagemExterna(post.imagem)}
                                title="Clique para ampliar"
                                onError={(e) => {
                                  e.target.onerror = null; 
                                  e.target.src = 'https://placehold.co/400x200/eeeeee/333333.png?text=Imagem+Nao+Encontrada';
                                }}
                              />
                            )
                          )}

                          {post.tipoAnexo === 'video' && (
                            <div className="relative w-full overflow-hidden rounded min-w-[280px] sm:min-w-[400px]" style={{ paddingTop: '56.25%' }}>
                              <iframe 
                                className="absolute top-0 left-0 w-full h-full"
                                src={post.imagem} 
                                title="YouTube video" 
                                frameBorder="0" 
                                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" 
                                allowFullScreen
                              ></iframe>
                            </div>
                          )}

                          {post.tipoAnexo === 'documento' && (
                            <div className={`flex items-center gap-4 p-4 rounded ${isBugged ? 'bg-red-900/20' : 'bg-blue-50'}`}>
                              <span className="text-3xl">📄</span>
                              <div className="flex-1">
                                <h4 className={`font-bold ${isBugged ? 'text-red-400' : 'text-blue-800'}`}>Documento / Guião</h4>
                                <p className={`text-xs ${isBugged ? 'text-red-500/70' : 'text-blue-600/70'}`}>Ficheiro em anexo via Google Drive</p>
                              </div>
                              <button 
                                onClick={() => window.open(post.imagem, '_blank')}
                                className={`px-4 py-2 font-bold rounded shadow-sm whitespace-nowrap ${isBugged ? 'bg-red-600 text-black hover:bg-red-500' : 'bg-blue-600 text-white hover:bg-blue-700'}`}
                              >
                                Abrir
                              </button>
                            </div>
                          )}

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