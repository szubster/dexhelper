import { Store } from '@tanstack/store';
import { useStore as useTanstackStore } from '@tanstack/react-store';
import { parseSaveFile } from './engine/saveParser/index';
import type { SaveData, GameVersion as GameVersionType } from './engine/saveParser/index';

// ─── Types ───────────────────────────────────────────────────────────
export type GameVersion = GameVersionType;
export type FilterType = 'secured' | 'missing' | 'dex-only';
export type PokeballType =
  | 'poke'
  | 'great'
  | 'ultra'
  | 'safari'
  | 'heavy'
  | 'lure'
  | 'fast'
  | 'friend'
  | 'moon'
  | 'love'
  | 'level';

// ─── Store Interface ─────────────────────────────────────────────────
export interface AppStore {
  // Save data
  saveData: SaveData | null;
  error: string | null;
  setSaveData: (data: SaveData | null) => void;
  setError: (v: string | null) => void;

  // Persisted settings
  filters: FilterType[];
  manualVersion: GameVersion | null;
  isLivingDex: boolean;
  globalPokeball: PokeballType;
  toggleFilter: (f: FilterType) => void;
  setFilters: (f: FilterType[]) => void;
  setManualVersion: (v: GameVersion | null) => void;
  setIsLivingDex: (v: boolean) => void;
  setGlobalPokeball: (v: PokeballType) => void;

  // Transient UI state (not persisted)
  searchTerm: string;
  isSettingsOpen: boolean;
  isVersionModalOpen: boolean;
  setSearchTerm: (v: string) => void;
  setIsSettingsOpen: (v: boolean) => void;
  setIsVersionModalOpen: (v: boolean) => void;

  // Derived helpers
  filtersSet: () => Set<FilterType>;

  // Actions
  loadSaveFromStorage: () => void;
}

// ─── Persistence Helpers ─────────────────────────────────────────────
const STORAGE_KEY = 'dexhelper-settings';

function loadPersistedState() {
  if (typeof window === 'undefined') return null;
  try {
    const saved = localStorage.getItem(STORAGE_KEY);
    if (saved) {
      // In zustand persist, the state is stored under `{ state: { ... } }`
      // Let's support both plain object and zustand's wrapper for smooth migration
      const parsed = JSON.parse(saved);
      return parsed.state || parsed;
    }
  } catch (err) {
    console.error('Failed to load persisted settings:', err);
  }
  return null;
}

const persisted = loadPersistedState();

// ─── Store Instance ──────────────────────────────────────────────────
export const store: Store<AppStore> = new Store<AppStore>({
  // Save data
  saveData: null,
  error: null,
  setSaveData: (data) => store.setState((state) => ({ ...state, saveData: data })),
  setError: (v) => store.setState((state) => ({ ...state, error: v })),

  // Persisted settings
  filters: persisted?.filters ?? [],
  manualVersion: persisted?.manualVersion ?? null,
  isLivingDex: persisted?.isLivingDex ?? false,
  globalPokeball: persisted?.globalPokeball ?? 'poke',

  toggleFilter: (f) =>
    store.setState((state) => {
      const current = state.filters;
      if (current.includes(f)) {
        return { ...state, filters: current.filter((x) => x !== f) };
      }
      return { ...state, filters: [...current, f] };
    }),
  setFilters: (f) => store.setState((state) => ({ ...state, filters: f })),
  setManualVersion: (v) => store.setState((state) => ({ ...state, manualVersion: v })),
  setIsLivingDex: (v) => store.setState((state) => ({ ...state, isLivingDex: v })),
  setGlobalPokeball: (v) => store.setState((state) => ({ ...state, globalPokeball: v })),

  // Transient UI
  searchTerm: '',
  isSettingsOpen: false,
  isVersionModalOpen: false,
  setSearchTerm: (v) => store.setState((state) => ({ ...state, searchTerm: v })),
  setIsSettingsOpen: (v) => store.setState((state) => ({ ...state, isSettingsOpen: v })),
  setIsVersionModalOpen: (v) => store.setState((state) => ({ ...state, isVersionModalOpen: v })),

  // Derived helpers
  filtersSet: () => new Set(store.state.filters),

  // Actions
  loadSaveFromStorage: () => {
    if (typeof window === 'undefined') return;
    const savedFile = localStorage.getItem('last_save_file');
    if (savedFile) {
      try {
        const binaryString = window.atob(savedFile);
        const len = binaryString.length;
        const bytes = new Uint8Array(len);
        for (let i = 0; i < len; i++) {
          bytes[i] = binaryString.charCodeAt(i);
        }
        const { manualVersion } = store.state;
        const data = parseSaveFile(bytes.buffer, manualVersion || undefined);
        store.setState((state) => ({ ...state, saveData: data }));
      } catch (err) {
        console.error('Failed to load saved file from localStorage:', err);
        localStorage.removeItem('last_save_file');
      }
    }
  },
});

// ─── Persistence Subscription ────────────────────────────────────────
// @tanstack/store doesn't have a built-in persist middleware yet,
// so we write a simple subscriber to mimic zustand's persist.
if (typeof window !== 'undefined') {
  store.subscribe(() => {
    const state = store.state;
    const toPersist = {
      filters: state.filters,
      manualVersion: state.manualVersion,
      isLivingDex: state.isLivingDex,
      globalPokeball: state.globalPokeball,
    };
    // Save in zustand format for backward compatibility, or plain format
    // If we want to drop zustand wrapper completely:
    localStorage.setItem(STORAGE_KEY, JSON.stringify({ state: toPersist }));
  });
}

// ─── React Hook ──────────────────────────────────────────────────────
export function useStore<T>(selector: (state: AppStore) => T): T {
  return useTanstackStore(store, selector);
}

// Attach Zustand-like methods to the hook for backward compatibility in tests
useStore.getState = () => store.state;
useStore.setState = (updater: Partial<AppStore> | ((state: AppStore) => Partial<AppStore>)) => {
  store.setState((state) => {
    const updates = typeof updater === 'function' ? (updater as any)(state) : updater;
    return { ...state, ...updates };
  });
};
