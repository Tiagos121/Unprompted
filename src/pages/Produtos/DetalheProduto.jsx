import React, { useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { listaProdutos } from '../../data/produtos';

function DetalheProduto({ isBugged }) {
  const { id } = useParams();
  const navigate = useNavigate(); 
  
  const [loading, setLoading] = useState(false);
  const [progresso, setProgresso] = useState(0);

  const produto = listaProdutos.find(p => p.id === parseInt(id));

  if (!produto) {
    return <div className="p-20 text-center">Produto não encontrado.</div>;
  }

  const iniciarSincronia = () => {
    setLoading(true);
    let interval = setInterval(() => {
      setProgresso((prev) => {
        if (prev >= 98) {
          clearInterval(interval);
          setTimeout(() => navigate(`/produto/${id}`), 1500);
          return 99;
        }
        return prev + 1;
      });
    }, 50);
  };

  return (
    <div className={`min-h-screen transition-colors duration-500 ${isBugged ? 'bg-black text-red-600' : 'bg-white text-neutral-900'}`}>
      
      {/* 1. HERO SECTION */}
      <div className="max-w-7xl mx-auto px-6 py-20 grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
        <div className="space-y-6">
          <span className={`text-sm font-mono tracking-widest uppercase ${isBugged ? 'text-red-500' : 'text-blue-600'}`}>
            {isBugged ? 'SISTEMA_CORROMPIDO' : 'Tecnologia Neural Avançada'}
          </span>
          <h1 className="text-6xl font-bold tracking-tighter leading-none">
            {isBugged ? produto.nome.toUpperCase() + ' // MONITOR' : produto.nome}
          </h1>
          <p className="text-xl text-neutral-500 leading-relaxed">
            {isBugged ? 'A tua individualidade é um erro que estamos a corrigir.' : produto.desc}
          </p>
          <div className="text-3xl font-light py-4">
            {/* O PREÇO AGORA É DINÂMICO */}
            {isBugged ? 'PREÇO: A TUA ALMA' : produto.preco || '999,00€'}
          </div>
          
          {!loading ? (
            <button 
              onClick={iniciarSincronia}
              className={`px-10 py-4 rounded-full font-bold transition-all transform hover:scale-105 ${
                isBugged ? 'bg-red-600 text-white' : 'bg-black text-white hover:bg-neutral-800'
              }`}
            >
              {isBugged ? 'ACEITAR SUBMISSÃO' : `Adquirir ${produto.nome}`}
            </button>
          ) : (
            <div className="w-full max-w-xs space-y-2">
              <p className="text-sm font-mono text-red-600 font-bold">
                {progresso === 99 ? 'ERRO CRÍTICO NO SISTEMA...' : `A Sincronizar: ${progresso}%`}
              </p>
              <div className="w-full h-2 bg-neutral-200 overflow-hidden rounded-full">
                <div 
                  className={`h-full transition-all duration-100 ${progresso === 99 ? 'bg-red-600 animate-pulse' : 'bg-blue-600'}`} 
                  style={{ width: `${progresso}%` }}
                ></div>
              </div>
            </div>
          )}
        </div>

        <div className="relative group">
          <img 
            src={produto.img} 
            alt={produto.nome}
            className={`relative w-full h-[500px] object-cover rounded-2xl shadow-2xl transition-all duration-700 ${
              isBugged ? 'grayscale contrast-150 scale-95' : 'grayscale-0'
            }`}
          />
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