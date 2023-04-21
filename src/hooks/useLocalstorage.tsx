import { useState, useEffect, Dispatch, SetStateAction } from 'react';

type UseLocalStorageReturnType<T> = [T | undefined, Dispatch<SetStateAction<T | undefined>>];

function useLocalStorage<T>(key: string, defaultValue?: T): UseLocalStorageReturnType<T> {
  const [value, setValue] = useState<T | undefined>();

  useEffect(() => {
    console.log(value);
    localStorage.setItem(key, value as string);
  }, [value]);

  return [value, setValue];
}

export default useLocalStorage;
