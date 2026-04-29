import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import { saveDB } from './db/SaveDB';
import type { GameVersion as GameVersionType, SaveData } from './engine/saveParser/index';
import { parseSaveFile } from './engine/saveParser/index';

// ─── Types ───────────────────────────────────────────────────────────
export type GameVersion = GameVersionType;
export const FILTER_TYPES = ['secured', 'missing', 'dex-only'] as const;
export type FilterType = (typeof FILTER_TYPES)[number];
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
  /** Manual override for the game version, bypassing auto-detection heuristics. */
  manualVersion: GameVersion | null;
  /** Whether the user is tracking a living dex (persisted via partialize). */
  isLivingDex: boolean;
  /** Global visual preference for which Pokéball to use in the UI. */
  globalPokeball: PokeballType;
  /** Toggles a specific UI filter type in the `filters` array. */
  toggleFilter: (f: FilterType) => void;
  /** Overwrites the entire array of active UI filters. */
  setFilters: (f: FilterType[]) => void;
  /** Sets the manual game version override. */
  setManualVersion: (v: GameVersion | null) => void;
  /** Sets the living dex tracking preference. */
  setIsLivingDex: (v: boolean) => void;
  /** Sets the global visual Pokéball preference. */
  setGlobalPokeball: (v: PokeballType) => void;

  // Transient UI state (not persisted)
  /** Current search query for filtering Pokémon lists. */
  searchTerm: string;
  /** Currently selected map location for viewing details. */
  selectedLocationId: number | null;
  /** Toggles the global settings modal. */
  isSettingsOpen: boolean;
  /** Toggles the manual version selection modal. */
  isVersionModalOpen: boolean;
  /** Updates the active search query. */
  setSearchTerm: (v: string) => void;
  /** Updates the currently selected map location ID. */
  setSelectedLocationId: (id: number | null) => void;
  /** Updates the settings modal visibility. */
  setIsSettingsOpen: (v: boolean) => void;
  /** Updates the manual version modal visibility. */
  setIsVersionModalOpen: (v: boolean) => void;

  // Derived helpers
  filtersSet: () => Set<FilterType>;

  // Actions
  /**
   * Rehydrates `saveData` from a base64 encoded `last_save_file` in localStorage.
   * Invariant: If the data is corrupted or parsing fails, the cached file is immediately
   * deleted to prevent infinite crash loops on subsequent reloads.
   */
  loadSaveFromStorage: () => Promise<void>;
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

      loadSaveFromStorage: async () => {
        const legacySave = localStorage.getItem('last_save_file');
        if (legacySave) {
          try {
            const base64Regex = /^(?:[A-Za-z0-9+/]{4})*(?:[A-Za-z0-9+/]{2}==|[A-Za-z0-9+/]{3}=)?$/;
            if (!base64Regex.test(legacySave)) {
              throw new Error('Invalid Base64 string');
            }
            const binaryString = window.atob(legacySave);
            const len = binaryString.length;
            const bytes = new Uint8Array(len);
            for (let i = 0; i < len; i++) {
              bytes[i] = binaryString.charCodeAt(i);
            }
            await saveDB.putSave('last_save_file', bytes);
            localStorage.removeItem('last_save_file');
          } catch (error) {
            console.error('Failed to migrate legacy save file:', error);
            // Only remove from localStorage if it's a parsing error (invalid base64 format).
            // Do not delete if the database write failed to prevent data loss.
            if (error instanceof Error && error.message === 'Invalid Base64 string') {
              localStorage.removeItem('last_save_file');
            }
          }
        }

        try {
          const buffer = await saveDB.getSave('last_save_file');
          if (buffer) {
            const { manualVersion } = get();
            const data = parseSaveFile(buffer.buffer as ArrayBuffer, manualVersion || undefined);
            set({ saveData: data });
          }
        } catch {
          console.error('Failed to load saved file');
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
