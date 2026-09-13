import { createContext, type ReactNode, useContext, useState } from 'react';
import { createStore, useStore } from 'zustand';
import { persist } from 'zustand/middleware';

// ─── Types ───────────────────────────────────────────────────────────

export interface FeatureFlags {
  [key: string]: boolean;
}

export interface FeatureFlagState {
  flags: FeatureFlags;
  setFlag: (key: string, value: boolean) => void;
  resetFlags: () => void;
}

// ─── Store Factory ───────────────────────────────────────────────────

export const parseFeatureFlags = (env: Record<string, string | boolean | undefined>): FeatureFlags => {
  const flags: FeatureFlags = {};
  for (const key in env) {
    if (key.startsWith('VITE_FF_')) {
      const flagName = key.replace('VITE_FF_', '');
      flags[flagName] = env[key] === 'true' || env[key] === true;
    }
  }
  return flags;
};

export const createFeatureFlagStore = (initialEnv: Record<string, string | boolean | undefined>) => {
  const initialFlags = parseFeatureFlags(initialEnv);

  return createStore<FeatureFlagState>()(
    persist(
      (set) => ({
        flags: initialFlags,
        setFlag: (key, value) =>
          set((state) => ({
            flags: { ...state.flags, [key]: value },
          })),
        resetFlags: () => set({ flags: initialFlags }),
      }),
      {
        name: 'dexhelper-feature-flags',
        partialize: (state) => ({ flags: state.flags }),
      },
    ),
  );
};

// ─── Context ─────────────────────────────────────────────────────────

type FeatureFlagStore = ReturnType<typeof createFeatureFlagStore>;

export const FeatureFlagContext = createContext<FeatureFlagStore | undefined>(undefined);

export interface FeatureFlagProviderProps {
  children: ReactNode;
  env?: Record<string, string | boolean | undefined>;
}

export const FeatureFlagProvider = ({ children, env = import.meta.env }: FeatureFlagProviderProps) => {
  const [store] = useState(() => createFeatureFlagStore(env));

  return <FeatureFlagContext.Provider value={store}>{children}</FeatureFlagContext.Provider>;
};

export const useFeatureFlags = () => {
  const store = useContext(FeatureFlagContext);
  if (!store) {
    throw new Error('useFeatureFlags must be used within a FeatureFlagProvider');
  }
  return useStore(store, (state) => state.flags);
};

export const useFeatureFlagActions = () => {
  const store = useContext(FeatureFlagContext);
  if (!store) {
    throw new Error('useFeatureFlagActions must be used within a FeatureFlagProvider');
  }
  return {
    setFlag: store.getState().setFlag,
    resetFlags: store.getState().resetFlags,
  };
};
