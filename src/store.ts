import { create } from 'zustand';
import { persist } from 'zustand/middleware';
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
interface AppStore {
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

// ─── Store ───────────────────────────────────────────────────────────
export const useStore = create<AppStore>()(
  persist(
    (set, get) => ({
      // Save data
      saveData: null,
      error: null,
      setSaveData: (data) => set({ saveData: data }),
      setError: (v) => set({ error: v }),

      // Settings
      filters: [],
      manualVersion: null,
      isLivingDex: false,
      globalPokeball: 'poke',

      toggleFilter: (f) => {
        const current = get().filters;
        if (current.includes(f)) {
          set({ filters: current.filter((x) => x !== f) });
        } else {
          set({ filters: [...current, f] });
        }
      },
      setFilters: (f) => set({ filters: f }),
      setManualVersion: (v) => set({ manualVersion: v }),
      setIsLivingDex: (v) => set({ isLivingDex: v }),
      setGlobalPokeball: (v) => set({ globalPokeball: v }),

      // Transient UI
      searchTerm: '',
      isSettingsOpen: false,
      isVersionModalOpen: false,
      setSearchTerm: (v) => set({ searchTerm: v }),
      setIsSettingsOpen: (v) => set({ isSettingsOpen: v }),
      setIsVersionModalOpen: (v) => set({ isVersionModalOpen: v }),

      // Derived
      filtersSet: () => new Set(get().filters),

      // Actions
      loadSaveFromStorage: () => {
        const savedFile = localStorage.getItem('last_save_file');
        if (savedFile) {
          try {
            const binaryString = window.atob(savedFile);
            const len = binaryString.length;
            const bytes = new Uint8Array(len);
            for (let i = 0; i < len; i++) {
              bytes[i] = binaryString.charCodeAt(i);
            }
            const { manualVersion } = get();
            const data = parseSaveFile(bytes.buffer, manualVersion || undefined);
            set({ saveData: data });
          } catch (err) {
            console.error('Failed to load saved file from localStorage:', err);
            localStorage.removeItem('last_save_file');
          }
        }
      },
    }),
    {
      name: 'dexhelper-settings',
      // Only persist settings, not save data or UI state
      partialize: (state) => ({
        filters: state.filters,
        manualVersion: state.manualVersion,
        isLivingDex: state.isLivingDex,
        globalPokeball: state.globalPokeball,
      }),
    },
  ),
);
