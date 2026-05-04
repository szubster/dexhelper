import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import { saveDB } from './db/SaveDB';
import type { GameVersion as GameVersionType, SaveData } from './engine/saveParser/index';
import { parseSaveFile } from './engine/saveParser/index';

// ─── Types ───────────────────────────────────────────────────────────
export type GameVersion = GameVersionType;
export const FILTER_TYPES = ['secured', 'missing', 'dex-only'] as const;
type FilterType = (typeof FILTER_TYPES)[number];
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
/**
 * The global application store, split between persistent user preferences
 * and transient runtime state.
 *
 * Why this structure?
 * 1. Persistent settings (filters, game version overrides) are stored in localStorage
 *    via Zustand's `persist` middleware to survive reloads.
 * 2. Heavy payload data (like `saveData` from binary parsing) and transient UI
 *    toggles are intentionally excluded using the `partialize` configuration.
 *    This prevents localStorage quota exhaustion and stale UI states.
 */
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
   * Rehydrates `saveData` from IndexedDB.
   */
  loadSaveFromStorage: () => Promise<void>;
}

// ─── Store ───────────────────────────────────────────────────────────
/**
 * React hook exposing the global application store.
 * Subscribing components will re-render automatically when accessed state changes.
 *
 * @example
 * const filters = useStore((state) => state.filters);
 * const setSaveData = useStore((state) => state.setSaveData);
 */
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
