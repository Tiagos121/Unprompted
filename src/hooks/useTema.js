import { useEffect } from 'react';

// Esta é a função importada que vai tratar do fundo do site inteiro
export function useTema(isBugged) {
  useEffect(() => {
    document.body.className = isBugged ? 'tema-bug' : 'tema-urwell';
  }, [isBugged]);
}