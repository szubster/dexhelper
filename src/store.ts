import { decode as decodeBase64 } from 'base-64';
import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import type { GameVersion as GameVersionType, SaveData } from './engine/saveParser/index';
import { parseSaveFile } from './engine/saveParser/index';

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
  /**
   * The heavy, transient parsed save state.
   * This is intentionally excluded from localStorage persistence (via `partialize`)
   * to prevent bloating the storage quota and stale state bugs.
   */
  saveData: SaveData | null;
  error: string | null;
  setSaveData: (data: SaveData | null) => void;
  setError: (v: string | null) => void;

  // Persisted settings
  /** Active UI filters explicitly persisted to localStorage via partialize. */
  filters: FilterType[];
  manualVersion: GameVersion | null;
  /** Whether the user is tracking a living dex (persisted via partialize). */
  isLivingDex: boolean;
  globalPokeball: PokeballType;
  toggleFilter: (f: FilterType) => void;
  setFilters: (f: FilterType[]) => void;
  setManualVersion: (v: GameVersion | null) => void;
  setIsLivingDex: (v: boolean) => void;
  setGlobalPokeball: (v: PokeballType) => void;

  // Transient UI state (not persisted)
  searchTerm: string;
  selectedLocationId: number | null;
  isSettingsOpen: boolean;
  isVersionModalOpen: boolean;
  setSearchTerm: (v: string) => void;
  setSelectedLocationId: (id: number | null) => void;
  setIsSettingsOpen: (v: boolean) => void;
  setIsVersionModalOpen: (v: boolean) => void;

  // Derived helpers
  filtersSet: () => Set<FilterType>;

  // Actions
  /**
   * Rehydrates `saveData` from a base64 encoded `last_save_file` in localStorage.
   * Invariant: If the data is corrupted or parsing fails, the cached file is immediately
   * deleted to prevent infinite crash loops on subsequent reloads.
   */
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
      selectedLocationId: null,
      isSettingsOpen: false,
      isVersionModalOpen: false,
      setSearchTerm: (v) => set({ searchTerm: v }),
      setSelectedLocationId: (id) => set({ selectedLocationId: id }),
      setIsSettingsOpen: (v) => set({ isSettingsOpen: v }),
      setIsVersionModalOpen: (v) => set({ isVersionModalOpen: v }),

      // Derived
      filtersSet: () => new Set(get().filters),

      // Actions
      loadSaveFromStorage: () => {
        const savedFile = localStorage.getItem('last_save_file');
        if (savedFile) {
          try {
            const base64Regex = /^(?:[A-Za-z0-9+/]{4})*(?:[A-Za-z0-9+/]{2}==|[A-Za-z0-9+/]{3}=)?$/;
            if (!base64Regex.test(savedFile)) {
              throw new Error('Invalid Base64 string');
            }
            const decodedString = decodeBase64(savedFile);
            const len = decodedString.length;
            const bytes = new Uint8Array(len);
            for (let i = 0; i < len; i++) {
              bytes[i] = decodedString.charCodeAt(i);
            }
            const { manualVersion } = get();
            const data = parseSaveFile(bytes.buffer, manualVersion || undefined);
            set({ saveData: data });
          } catch (err) {
            console.error(
              'Failed to load saved file from localStorage:',
              err instanceof Error ? err.message : String(err),
            );
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
