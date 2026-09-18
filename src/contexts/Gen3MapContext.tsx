import React, { createContext, type ReactNode, useContext, useState } from 'react';

export interface Gen3MapState {
  zoomLevel: number;
  selectedLocationId: number | null;
}

export interface Gen3MapContextType {
  state: Gen3MapState;
  setState: React.Dispatch<React.SetStateAction<Gen3MapState>>;
}

const Gen3MapContext = createContext<Gen3MapContextType | undefined>(undefined);

export const Gen3MapProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [state, setState] = useState<Gen3MapState>({
    zoomLevel: 1,
    selectedLocationId: null,
  });

  return <Gen3MapContext.Provider value={{ state, setState }}>{children}</Gen3MapContext.Provider>;
};

export const useGen3Map = () => {
  const context = useContext(Gen3MapContext);
  if (context === undefined) {
    throw new Error('useGen3Map must be used within a Gen3MapProvider');
  }
  return context;
};
