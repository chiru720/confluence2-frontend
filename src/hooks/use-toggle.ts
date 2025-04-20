import { useState, useCallback } from 'react';

type UseToggleReturn = [boolean, () => void, (value: boolean) => void];

/**
 * A custom hook for toggling boolean state
 * @param initialState Initial toggle state
 * @returns Array containing [state, toggle function, set function]
 */
export function useToggle(initialState = false): UseToggleReturn {
  const [state, setState] = useState<boolean>(initialState);
  
  const toggle = useCallback(() => {
    setState(prevState => !prevState);
  }, []);
  
  const setValue = useCallback((value: boolean) => {
    setState(value);
  }, []);
  
  return [state, toggle, setValue];
} 