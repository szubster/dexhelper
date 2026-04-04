import { atom, map, computed } from 'nanostores';
import { persistentMap } from '@nanostores/persistent';
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

export interface SettingsValue {
  filters: FilterType[];
  manualVersion: GameVersion | null;
  isLivingDex: boolean;
  globalPokeball: PokeballType;
}

// ─── State ───────────────────────────────────────────────────────────

// Save data
export const saveData = atom<SaveData | null>(null);
export const error = atom<string | null>(null);

// Transient UI state
export const searchTerm = atom<string>('');
export const isSettingsOpen = atom<boolean>(false);
export const isVersionModalOpen = atom<boolean>(false);

// Persisted settings
export const settings = persistentMap<SettingsValue>(
  'dexhelper-settings:',
  {
    filters: [],
    manualVersion: null,
    isLivingDex: false,
    globalPokeball: 'poke',
  },
  {
    encode: JSON.stringify,
    decode: (val: string) => {
      try {
        return JSON.parse(val);
      } catch (e) {
        return {
          filters: [],
          manualVersion: null,
          isLivingDex: false,
          globalPokeball: 'poke',
        };
      }
    },
  }
);

// ─── Derived state ───────────────────────────────────────────────────
export const filtersSet = computed(settings, ($settings) => new Set($settings.filters));

// ─── Actions ─────────────────────────────────────────────────────────
export function setSaveData(data: SaveData | null) {
  saveData.set(data);
}

export function setError(v: string | null) {
  error.set(v);
}

export function toggleFilter(f: FilterType) {
  const current = settings.get().filters;
  if (current.includes(f)) {
    settings.setKey('filters', current.filter((x: string) => x !== f));
  } else {
    settings.setKey('filters', [...current, f]);
  }
}

export function setFilters(f: FilterType[]) {
  settings.setKey('filters', f);
}

export function setManualVersion(v: GameVersion | null) {
  settings.setKey('manualVersion', v);
}

export function setIsLivingDex(v: boolean) {
  settings.setKey('isLivingDex', v);
}

export function setGlobalPokeball(v: PokeballType) {
  settings.setKey('globalPokeball', v);
}

export function setSearchTerm(v: string) {
  searchTerm.set(v);
}

export function setIsSettingsOpen(v: boolean) {
  isSettingsOpen.set(v);
}

export function setIsVersionModalOpen(v: boolean) {
  isVersionModalOpen.set(v);
}

export function loadSaveFromStorage() {
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
      const mv = settings.get().manualVersion;
      const data = parseSaveFile(bytes.buffer, mv || undefined);
      saveData.set(data);
    } catch (err) {
      console.error('Failed to load saved file from localStorage:', err);
      localStorage.removeItem('last_save_file');
    }
  }
}

export function useStore<T>(selector: (state: any) => T): T {
  throw new Error("useStore is deprecated. Use useStore from @nanostores/react and individual atoms directly.");
}
