import { useEffect } from 'react';
import { useLocation } from 'react-router-dom';

export default function ScrollToTop() {
  // O useLocation deteta em que página (rota) o utilizador está
  const { pathname } = useLocation();

  useEffect(() => {
    // Sempre que a rota muda, obriga a janela a ir para a posição X:0, Y:0 (Topo)
    window.scrollTo(0, 0);
  }, [pathname]); // O useEffect dispara sempre que o 'pathname' sofre alterações

  return null; // Este componente é invisível, não renderiza nada no ecrã
}