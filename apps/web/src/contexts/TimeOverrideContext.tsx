import React, { createContext, type ReactNode, useContext, useState } from 'react';

export interface TimeOverrideState {
  isOverridden: boolean;
  overrideTime: Date | null;
  overrideDay: string | null;
}

export interface TimeOverrideContextType {
  state: TimeOverrideState;
  setOverrideTime: (time: Date | null) => void;
  setOverrideDay: (day: string | null) => void;
  resetOverride: () => void;
}

const TimeOverrideContext = createContext<TimeOverrideContextType | undefined>(undefined);

export const TimeOverrideProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [state, setState] = useState<TimeOverrideState>({
    isOverridden: false,
    overrideTime: null,
    overrideDay: null,
  });

  const setOverrideTime = (time: Date | null) => {
    setState((prev) => {
      const isOverridden = time !== null || prev.overrideDay !== null;
      return { ...prev, isOverridden, overrideTime: time };
    });
  };

  const setOverrideDay = (day: string | null) => {
    setState((prev) => {
      const isOverridden = prev.overrideTime !== null || day !== null;
      return { ...prev, isOverridden, overrideDay: day };
    });
  };

  const resetOverride = () => {
    setState({
      isOverridden: false,
      overrideTime: null,
      overrideDay: null,
    });
  };

  return (
    <TimeOverrideContext.Provider value={{ state, setOverrideTime, setOverrideDay, resetOverride }}>
      {children}
    </TimeOverrideContext.Provider>
  );
};

export const useTimeOverride = () => {
  const context = useContext(TimeOverrideContext);
  if (context === undefined) {
    throw new Error('useTimeOverride must be used within a TimeOverrideProvider');
  }
  return context;
};
