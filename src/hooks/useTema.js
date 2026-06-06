import { useEffect } from 'react';

export function useTema(isBugged) {
  useEffect(() => {
    document.body.className = isBugged ? 'tema-bug' : 'tema-urwell';
  }, [isBugged]);
}