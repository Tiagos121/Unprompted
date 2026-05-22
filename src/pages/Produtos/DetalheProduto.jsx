import React, { useState, useEffect } from 'react';
import { useParams, useLocation } from 'react-router-dom';
import { listaProdutos } from '../../data/produtos';
import VideoPlayer from '../../components/VideoPlayer';
// 1. O IMPORT FICA AQUI!
import { videosDoYoutube } from '../../data/videos';

function DetalheProduto({ isBugged }) {
  const { id } = useParams();
  const location = useLocation(); 

  // 2. APAGÁMOS A LISTA QUE ESTAVA AQUI ESCRITA!
  // Agora ele vai buscar diretamente o ID à lista que importou lá de cima.
  const videoId = videosDoYoutube[id?.toString()] || "dQw4w9WgXcQ";
  
  // 3. A MÁGICA DO CAPTCHA: Lê a chave secreta enviada pelos desafios!
  const isUnlocked = location.state?.unlocked || false;

  const [mostrarVideo, setMostrarVideo] = useState(false);

  const produto = listaProdutos.find(p => p.id === parseInt(id));

  // 4. O EFEITO DE RESSINCRONIZAÇÃO DA RESISTÊNCIA
  useEffect(() => {
    if (isUnlocked) {
      // Finge que está a carregar durante 2.5 segundos
      const timer = setTimeout(() => {
        setMostrarVideo(true);
      }, 2500);
      return () => clearTimeout(timer);
    }
  }, [isUnlocked]);


  if (!produto) {
    return <div className="p-20 text-center text-white">Produto não encontrado na base de dados UrWell.</div>;
  }

  return (
    <div className={`min-h-screen transition-colors duration-500 ${isBugged ? 'bg-black text-red-600' : 'bg-white text-neutral-900'}`}>
      
      {/* MENSAGEM DE SUCESSO DA RESISTÊNCIA NO TOPO */}
      {isUnlocked && mostrarVideo && (
        <div className="bg-green-900/30 border-y border-green-500 text-green-500 py-4 text-center animate-pulse font-bold tracking-widest uppercase shadow-[0_0_15px_rgba(34,197,94,0.3)]">
          SINAL INTERCETADO: EPISÓDIO {id} DISPONÍVEL ABAIXO
        </div>
      )}

      {/* 1. HERO SECTION */}
      <div className="max-w-7xl mx-auto px-6 py-20 grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
        <div className="space-y-6">
          <span className={`text-sm font-mono tracking-widest uppercase ${isBugged ? 'text-red-500' : 'text-blue-600'}`}>
            {isBugged ? 'SISTEMA_CORROMPIDO' : 'Tecnologia Neural Avançada'}
          </span>
          <h1 className="text-6xl font-bold tracking-tighter leading-none">
            {isBugged ? produto.nome.toUpperCase() + ' // MONITOR' : produto.nome}
          </h1>
          
          {/* ======================================================== */}
          {/* A CORREÇÃO ESTÁ AQUI: Substituí a frase fixa por descBug */}
          {/* ======================================================== */}
          <p className="text-xl text-neutral-500 leading-relaxed">
            {isBugged ? produto.descBug : produto.desc}
          </p>
          
          <div className="text-3xl font-light py-4">
            {isBugged ? 'PREÇO: A TUA ALMA' : produto.preco || '999,00€'}
          </div>
          
          {/* BOTÃO MÁGICO - Muda se o jogador venceu o desafio! */}
          <div className="pt-4">
            {isUnlocked ? (
              <a 
                href={`https://www.youtube.com/watch?v=${videoId}`} 
                target="_blank" 
                rel="noopener noreferrer"
                className="inline-block px-10 py-4 bg-red-600 text-white font-bold rounded-full shadow-[0_0_20px_rgba(220,38,38,0.5)] hover:bg-red-700 hover:scale-105 transition-all transform tracking-widest uppercase"
              >
                ▶ ASSISTIR NO YOUTUBE
              </a>
            ) : (
              <button 
                className={`px-10 py-4 rounded-full font-bold cursor-default ${
                  isBugged ? 'bg-red-600 text-white opacity-50' : 'bg-black text-white opacity-50'
                }`}
              >
                {isBugged ? 'ACEITAR SUBMISSÃO (BLOQUEADO)' : `Adquirir ${produto.nome}`}
              </button>
            )}
          </div>
        </div>

        {/* ÁREA MULTIMÉDIA: IMAGEM NORMAL vs VÍDEO HACKEADO */}
        <div className="relative group w-full h-[500px]">
          {!isUnlocked ? (
            <img 
              src={produto.img} 
              alt={produto.nome}
              className={`absolute inset-0 w-full h-full object-cover rounded-2xl shadow-2xl transition-all duration-700 ${
                isBugged ? 'grayscale contrast-150 scale-95' : 'grayscale-0'
              }`}
            />
          ) : !mostrarVideo ? (
            <div className="absolute inset-0 w-full h-full flex flex-col items-center justify-center bg-black border-2 border-green-500/50 rounded-2xl shadow-lg">
               <div className="animate-spin w-12 h-12 border-4 border-green-500 border-t-transparent rounded-full mb-4"></div>
               <p className="text-green-500 font-mono font-bold animate-pulse text-center px-4">
                 A RESSINCRONIZAR SINAL DA UNPROMPTED...
               </p>
            </div>
          ) : (
            <div className="absolute inset-0 w-full h-full bg-black rounded-2xl overflow-hidden border-2 border-green-500 shadow-[0_0_30px_rgba(34,197,94,0.3)]">
              <VideoPlayer idProduto={id} />
            </div>
          )}
        </div>
      </div>

      {/* 2. FUNCIONALIDADES DINÂMICAS */}
      {produto.features && (
        <div className={`${isBugged ? 'bg-neutral-950 border-y border-red-900/30' : 'bg-neutral-50'} py-24`}>
          <div className="max-w-7xl mx-auto px-6 grid grid-cols-1 md:grid-cols-3 gap-12">
            {produto.features.map((feat, index) => (
              <div key={index} className="space-y-4">
                <h3 className="text-xl font-bold">{feat.titulo}</h3>
                <p className="text-neutral-500">
                  {isBugged ? feat.descBug : feat.desc}
                </p>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* 3. ESPECIFICAÇÕES DINÂMICAS */}
      {produto.specs && (
        <div className="max-w-7xl mx-auto px-6 py-24">
          <h2 className="text-3xl font-bold mb-12">Especificações Técnicas</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-x-20 gap-y-6 border-t border-neutral-200 pt-10">
            {produto.specs.map((spec, index) => (
              <div key={index} className="flex justify-between border-b pb-4 border-neutral-100">
                <span className="font-medium">{spec.label}</span>
                <span className="text-neutral-500">
                  {isBugged ? spec.valueBug : spec.value}
                </span>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* 4. FILOSOFIA DINÂMICA */}
      {produto.filosofia && (
        <div className={`py-32 transition-colors duration-700 ${isBugged ? 'bg-neutral-950' : 'bg-neutral-900'}`}>
          <div className="max-w-4xl mx-auto px-6 text-center space-y-10">
            <h2 className={`text-4xl md:text-6xl font-bold tracking-tight ${isBugged ? 'text-red-600' : 'text-white'}`}>
              {isBugged ? produto.filosofia.tituloBug : produto.filosofia.titulo}
            </h2>
            <div className={`text-xl md:text-2xl font-light leading-relaxed space-y-6 ${isBugged ? 'text-red-800' : 'text-neutral-400'}`}>
              <p>{isBugged ? produto.filosofia.p1Bug : produto.filosofia.p1}</p>
              <p>{isBugged ? produto.filosofia.p2Bug : produto.filosofia.p2}</p>
            </div>
          </div>
        </div>
      )}

    </div>
  );
}

export default DetalheProduto;