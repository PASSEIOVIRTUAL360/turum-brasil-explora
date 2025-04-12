
import { useState, useEffect } from 'react';

/**
 * Hook para gerenciar estado com persistência em localStorage
 */
export function useLocalStorage<T>(key: string, initialValue: T) {
  // Estado para armazenar o valor
  const [storedValue, setStoredValue] = useState<T>(() => {
    // Obtém do localStorage pelo key
    try {
      const item = window.localStorage.getItem(key);
      // Retorna item parseado ou initialValue
      return item ? JSON.parse(item) : initialValue;
    } catch (error) {
      console.error(`Erro ao carregar ${key} do localStorage:`, error);
      return initialValue;
    }
  });

  // Retorna função para atualizar o valor no localStorage
  const setValue = (value: T | ((val: T) => T)) => {
    try {
      // Permite usar um setter function como em useState
      const valueToStore =
        value instanceof Function ? value(storedValue) : value;
      
      // Salva o estado
      setStoredValue(valueToStore);
      
      // Salva no localStorage
      window.localStorage.setItem(key, JSON.stringify(valueToStore));
    } catch (error) {
      console.error(`Erro ao salvar ${key} no localStorage:`, error);
    }
  };

  return [storedValue, setValue] as const;
}
