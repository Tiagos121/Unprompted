import React, { useState, useEffect } from 'react';
import { doc, getDoc, setDoc, updateDoc } from 'firebase/firestore';
import { db } from '../config/firebase'; 
import Swal from 'sweetalert2';

function AdminVideos() {
  const DEFAULT_VIDEO_ID = "iMf9765Ks1U";
  const [links, setLinks] = useState({ 1: "", 2: "", 3: "", 4: "" });
  const [loading, setLoading] = useState(true);

  
  const extrairIdYoutube = (url) => {
    if (!url) return "";
    
    if (url.length === 11 && !url.includes("/")) return url;
    
    
    const regex = /(?:youtube\.com\/(?:[^/]+\/.+\/|(?:v|e(?:mbed)?)\/|.*[?&]v=)|youtu\.be\/)([^"&?/\s]{11})/i;
    const match = url.match(regex);
    return match ? match[1] : "";
  };

  useEffect(() => {
    const carregarVideos = async () => {
      try {
        const docRef = doc(db, "config", "videos");
        const docSnap = await getDoc(docRef);
        
        if (docSnap.exists()) {
          setLinks(docSnap.data().links || {});
        } else {
          console.log("A inicializar a base de dados pela primeira vez...");
          const valoresIniciais = {
            "1": DEFAULT_VIDEO_ID, 
            "2": DEFAULT_VIDEO_ID, 
            "3": DEFAULT_VIDEO_ID, 
            "4": DEFAULT_VIDEO_ID, 
          };
          
          await setDoc(docRef, { links: valoresIniciais });
          setLinks(valoresIniciais);
        }
      } catch (error) {
        console.error("Erro ao carregar:", error);
      }
      setLoading(false);
    };
    carregarVideos();
  }, []);

  const handleChange = (idProduto, valor) => {
    setLinks(prev => ({ ...prev, [idProduto]: valor }));
  };

  const guardarAlteracoes = async () => {
    const linksTratados = {};
    let houveSubstituicao = false;

    
    for (let i = 1; i <= 4; i++) {
      const idExtraido = extrairIdYoutube(links[i]);
      
      
      if (!idExtraido) {
        linksTratados[i] = DEFAULT_VIDEO_ID;
        houveSubstituicao = true;
      } else {
        linksTratados[i] = idExtraido;
        
        if (idExtraido !== links[i]) houveSubstituicao = true;
      }
    }

    try {
      const docRef = doc(db, "config", "videos");
      await updateDoc(docRef, { links: linksTratados });
      
      if (houveSubstituicao) setLinks(linksTratados);

      Swal.fire("Sucesso", "Links guardados com sucesso no sistema!", "success");
    } catch (error) {
      console.error(error);
      Swal.fire("Acesso Negado", "Tens de ter login de admin para fazer isto, ou as regras do Firestore estão a bloquear.", "error");
    }
  };

  if (loading) return <div className="p-20 text-white text-center">A aceder ao Mainframe...</div>;

  return (
    <div className="min-h-screen bg-neutral-900 text-white p-10 font-mono">
      <div className="max-w-2xl mx-auto bg-black p-8 rounded-xl border border-neutral-700 shadow-[0_0_15px_rgba(255,0,0,0.2)]">
        <h1 className="text-3xl text-red-500 font-bold mb-6">URWELL MAINFRAME // GESTÃO DE VÍDEOS</h1>
        <p className="mb-8 text-neutral-400">Podes colar o link completo do YouTube ou apenas o ID do vídeo.</p>
        
        <div className="space-y-4">
          {[1, 2, 3, 4].map(id => (
            <div key={id} className="flex flex-col">
              <label className="text-sm text-green-500 mb-1">Link/ID do Episódio {id}</label>
              <input 
                type="text" 
                value={links[id] || ""} 
                onChange={(e) => handleChange(id, e.target.value)}
                className="bg-neutral-800 text-white p-3 rounded border border-neutral-600 focus:border-red-500 outline-none transition-colors"
                placeholder={`ex: https://youtu.be/${DEFAULT_VIDEO_ID}`}
              />
            </div>
          ))}
        </div>

        <button 
          onClick={guardarAlteracoes}
          className="mt-8 w-full bg-red-600 hover:bg-red-700 text-white font-bold py-4 rounded transition-colors shadow-[0_0_10px_rgba(220,38,38,0.4)] tracking-widest"
        >
          ATUALIZAR
        </button>
      </div>
    </div>
  );
}

export default AdminVideos;