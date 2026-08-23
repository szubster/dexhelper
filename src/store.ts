import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import { AUTH_LOGGED_IN_INDICATOR } from './contexts/AuthContext';
import { saveDB } from './db/SaveDB';
import type { GameVersion as GameVersionType, SaveData } from './engine/saveParser/index';
import { parseSaveFile } from './engine/saveParser/index';
import { r2Client } from './utils/r2/client';

/**
 * @module store
 *
 * Central Zustand store for application state.
 * Invariants:
 * 1. Heavy payload data (e.g., parsed save data) must NOT be persisted to localStorage to avoid quota exhaustion.
 * 2. Persistent user preferences (filters, version overrides) are selectively persisted via Zustand's `partialize`.
 */

// ─── Types ───────────────────────────────────────────────────────────
/**
 * Represents the supported game versions (e.g., 'red', 'gold', 'emerald')
 * used throughout the application to determine version-specific logic.
 */
export type GameVersion = GameVersionType;
/**
 * The array of valid UI filter strings used to restrict which Pokémon
 * are currently visible in the Dex grids.
 */
export const FILTER_TYPES = ['secured', 'missing', 'dex-only'] as const;

/** Union type representing an active UI filter mode. */
export type FilterType = (typeof FILTER_TYPES)[number];
/**
 * Represents the visual style of Pokéball used as a global theme override
 * across the application UI (e.g., in headers and list items).
 */
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
  saves: Record<string, SaveData>;
  activeSaveId: string | null;
  saveData: SaveData | null;
  error: string | null;
  /**
   * Updates the in-memory save data state.
   * @param data - The parsed save data object to set, or null to clear it.
   */
  setSaveData: (data: SaveData | null) => void;
  /**
   * Sets the global application error message.
   * @param v - The error message string, or null to clear it.
   */
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
  /** Designated PC box for dead Pokemon in Nuzlocke mode. */
  nuzlockeGraveyardBox: string | null;
  /**
   * Toggles a specific UI filter type in the `filters` array.
   * @param f - The filter type to toggle.
   */
  toggleFilter: (f: FilterType) => void;
  /**
   * Overwrites the entire array of active UI filters.
   * @param f - Array of filters to set as active.
   */
  setFilters: (f: FilterType[]) => void;
  /** Sets the manual game version override. */
  setManualVersion: (v: GameVersion | null) => void;
  /** Sets the living dex tracking preference. */
  setIsLivingDex: (v: boolean) => void;
  /** Sets the global visual Pokéball preference. */
  setGlobalPokeball: (v: PokeballType) => void;
  /** Sets the Nuzlocke graveyard box. */
  setNuzlockeGraveyardBox: (box: string | null) => void;

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
  /**
   * Returns the current active filters as a Set for O(1) lookups.
   * @returns A Set of currently active FilterTypes.
   * @example
   * const hasMissing = useStore(state => state.filtersSet().has('missing'));
   */
  filtersSet: () => Set<FilterType>;

  // Conflict Resolution State
  /** State for managing R2 sync conflicts */
  conflictState: {
    isOpen: boolean;
    localMetadata: { timestamp: number; gameTime?: string };
    remoteMetadata: { timestamp: number; gameTime?: string };
    localBuffer: Uint8Array;
    remoteBuffer: Uint8Array;
    saveId: string;
  } | null;
  /** Sets the conflict state and opens the modal */
  setConflictState: (state: AppStore['conflictState']) => void;
  /** Resolves the active conflict by choosing either local or remote data */
  resolveConflict: (decision: 'keep_local' | 'pull_remote') => Promise<void>;

  // Actions
  /**
   * Rehydrates `saveData` from IndexedDB asynchronously.
   * Should be called on application mount to restore session state.
   * @returns A Promise that resolves when the save data has been loaded.
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
      saves: {},
      activeSaveId: null,
      saveData: null,
      error: null,
      setSaveData: (data) =>
        set({
          saveData: data,
          activeSaveId: data ? 'default' : null,
          saves: data ? { default: data } : {},
        }),
      setError: (v) => set({ error: v }),

      // Settings
      filters: [],
      manualVersion: null,
      isLivingDex: false,
      globalPokeball: 'poke',
      nuzlockeGraveyardBox: null,

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
      setNuzlockeGraveyardBox: (v) => set({ nuzlockeGraveyardBox: v }),

      // Transient UI
      searchTerm: '',
      selectedLocationId: null,
      isSettingsOpen: false,
      isVersionModalOpen: false,
      setSearchTerm: (v) => set({ searchTerm: v }),
      setSelectedLocationId: (id) => set({ selectedLocationId: id }),
      setIsSettingsOpen: (v) => set({ isSettingsOpen: v }),
      setIsVersionModalOpen: (v) => set({ isVersionModalOpen: v }),

      // Conflict Resolution
      conflictState: null,
      setConflictState: (state) => set({ conflictState: state }),
      resolveConflict: async (decision) => {
        const state = get().conflictState;
        if (!state) return;

        try {
          if (decision === 'pull_remote') {
            const data = await parseSaveFile(state.remoteBuffer.buffer, get().manualVersion || undefined);
            get().setSaveData(data);

            if (data.gameVersion === 'unknown') {
              get().setIsVersionModalOpen(true);
            } else {
              get().setManualVersion(null);
            }

            await saveDB.putSave('last_save_file', state.remoteBuffer);
          } else {
            // Keep local
            let buffer: Uint8Array;
            if (state.localBuffer.buffer instanceof ArrayBuffer) {
              buffer = new Uint8Array(
                state.localBuffer.buffer.slice(
                  state.localBuffer.byteOffset,
                  state.localBuffer.byteOffset + state.localBuffer.byteLength,
                ),
              );
            } else {
              buffer = new Uint8Array(state.localBuffer);
            }

            const data = await parseSaveFile(buffer.buffer as ArrayBuffer, get().manualVersion || undefined);
            get().setSaveData(data);

            if (data.gameVersion === 'unknown') {
              get().setIsVersionModalOpen(true);
            } else {
              get().setManualVersion(null);
            }

            await r2Client.putSave(state.saveId, buffer as Uint8Array<ArrayBuffer>, state.localMetadata.timestamp);
            await saveDB.putSave('last_save_file', state.localBuffer);
          }
        } catch {
          console.error('System: failed to resolve conflict');
          get().setError('Failed to resolve sync conflict.');
        } finally {
          set({ conflictState: null });
        }
      },

      // Derived
      filtersSet: () => new Set(get().filters),

      // Actions

      loadSaveFromStorage: async () => {
        try {
          let buffer: Uint8Array | undefined;

          if (localStorage.getItem(AUTH_LOGGED_IN_INDICATOR) === 'true') {
            try {
              const saves = await r2Client.listSaves();
              if (saves.length > 0 && saves[0]) {
                let cloudSave = null;
                try {
                  cloudSave = await r2Client.getSave(saves[0].id);
                } catch {
                  console.warn('System: failed to pull save from cloud');
                }
                if (cloudSave) {
                  await saveDB.putSave('last_save_file', cloudSave.data);
                  buffer = cloudSave.data;
                }
              }
            } catch {
              console.warn('System: failed to list saves from cloud');
            }
          }

          if (!buffer) {
            buffer = await saveDB.getSave('last_save_file');
          }

          if (buffer) {
            const { manualVersion } = get();
            const data = await parseSaveFile(buffer.buffer, manualVersion || undefined);
            get().setSaveData(data);
          }
        } catch {
          console.error('System: load failed');
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
        nuzlockeGraveyardBox: state.nuzlockeGraveyardBox,
      }),
    },
  ),
);
