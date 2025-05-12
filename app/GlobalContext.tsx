// GlobalContext.tsx
import React, { createContext, ReactNode, useState, useEffect } from 'react';
import { Show } from './types';

interface GlobalObject {
  shows: Show[];
}

interface GlobalContextProps {
  globalObject: GlobalObject;
  setGlobalObject: React.Dispatch<React.SetStateAction<GlobalObject>>;
}

export const GlobalContext = createContext<GlobalContextProps | undefined>(undefined);

interface GlobalProviderProps {
  children: ReactNode;
}

export const GlobalProvider: React.FC<GlobalProviderProps> = ({ children }) => {
  const [globalObject, setGlobalObject] = useState<GlobalObject>({
    shows: [],
  });

  useEffect(() => {
    const fetchShows = async () => {
      try {
        const response = await fetch('http://192.168.178.42:8080/shows');
        if (!response.ok) {
          throw new Error('Network response was not ok');
        }
        const data: Show[] = await response.json();
        setGlobalObject({ shows: data });
      } catch (error) {
        console.error('Fehler beim Laden der Shows:', error);
      }
    };

    fetchShows();
  }, []);

  return (
    <GlobalContext.Provider value={{ globalObject, setGlobalObject }}>
      {children}
    </GlobalContext.Provider>
  );
};
