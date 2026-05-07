import React, { useState } from 'react';
import { signInWithEmailAndPassword } from 'firebase/auth';
import { auth } from '../config/firebase';
import { useNavigate } from 'react-router-dom';

function AdminLogin() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [erro, setErro] = useState('');
  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();
    try {
      await signInWithEmailAndPassword(auth, email, password);
      navigate('/novidades'); // Se acertar, é atirado para as novidades!
    } catch {
      setErro('Acesso Negado. Credenciais inválidas.');
    }
  };

  return (
    <div className="min-h-screen bg-black text-red-600 flex flex-col items-center justify-center font-mono p-6">
      <div className="border border-red-600 p-8 w-full max-w-md bg-neutral-950">
        <h1 className="text-2xl font-bold mb-6 border-b border-red-600 pb-2">PORTAL DO ADMINISTRADOR</h1>
        
        {erro && <p className="text-red-500 mb-4 animate-pulse">{erro}</p>}
        
        <form onSubmit={handleLogin} className="space-y-4">
          <div>
            <label className="block text-sm mb-1 text-neutral-500">Credencial de Acesso</label>
            <input 
              type="email" 
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full bg-black border border-red-900 p-2 text-white outline-none focus:border-red-500"
              placeholder="Email"
            />
          </div>
          <div>
            <label className="block text-sm mb-1 text-neutral-500">Palavra-passe</label>
            <input 
              type="password" 
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full bg-black border border-red-900 p-2 text-white outline-none focus:border-red-500"
              placeholder="Password"
            />
          </div>
          <button type="submit" className="w-full bg-red-900/30 border border-red-600 text-red-500 hover:bg-red-600 hover:text-black font-bold py-3 transition-colors mt-4">
            INICIAR SESSÃO NO SISTEMA
          </button>
        </form>
      </div>
    </div>
  );
}

export default AdminLogin;