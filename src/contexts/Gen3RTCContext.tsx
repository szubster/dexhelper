import React, { createContext, type ReactNode, useContext, useEffect, useState } from 'react';

export interface Gen3RTCState {
  isOverridden: boolean;
  time: Date;
}

export interface Gen3RTCContextType {
  state: Gen3RTCState;
  setOverride: (time: Date | null) => void;
}

const Gen3RTCContext = createContext<Gen3RTCContextType | undefined>(undefined);

export const Gen3RTCProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [state, setState] = useState<Gen3RTCState>({
    isOverridden: false,
    time: new Date(),
  });

  useEffect(() => {
    if (state.isOverridden) return;

    const interval = setInterval(() => {
      setState((prev) => ({ ...prev, time: new Date() }));
    }, 1000);

    return () => clearInterval(interval);
  }, [state.isOverridden]);

  const setOverride = (time: Date | null) => {
    if (time === null) {
      setState({ isOverridden: false, time: new Date() });
    } else {
      setState({ isOverridden: true, time });
    }
  };

  return <Gen3RTCContext.Provider value={{ state, setOverride }}>{children}</Gen3RTCContext.Provider>;
};

export const useGen3RTC = () => {
  const context = useContext(Gen3RTCContext);
  if (context === undefined) {
    throw new Error('useGen3RTC must be used within a Gen3RTCProvider');
  }
  return context;
};
