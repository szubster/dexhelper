import type { ReactNode } from 'react';
import { createContext, useContext } from 'react';
import { useStore } from 'zustand';
import { useEmulatorStore } from '../emulator/state/emulatorStore';
import type { SaveData } from '../engine/saveParser/parsers/common';

export const EmulatorContext = createContext<typeof useEmulatorStore | null>(null);

interface EmulatorProviderProps {
  children: ReactNode;
}

export function EmulatorProvider({ children }: EmulatorProviderProps) {
  // Since useEmulatorStore is already a global Zustand store created with `create`,
  // we can just pass it directly. This satisfies the Context injection pattern
  // while utilizing the existing store logic without causing ref warnings.
  return <EmulatorContext.Provider value={useEmulatorStore}>{children}</EmulatorContext.Provider>;
}

export function useEmulatorState<T>(selector: (state: ReturnType<typeof useEmulatorStore.getState>) => T): T {
  const store = useContext(EmulatorContext);
  if (!store) {
    throw new Error('useEmulatorState must be used within an EmulatorProvider');
  }
  return useStore(store, selector);
}

export function useParsedSaveData(): SaveData | null {
  return useEmulatorState((state) => state.saveData);
}
