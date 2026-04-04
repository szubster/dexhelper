import { createSignal, createEffect } from 'solid-js';
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

// ─── Signals ─────────────────────────────────────────────────────────

// Transient / Core Data
export const [saveData, setSaveData] = createSignal<SaveData | null>(null);
export const [error, setError] = createSignal<string | null>(null);
export const [searchTerm, setSearchTerm] = createSignal<string>('');
export const [isSettingsOpen, setIsSettingsOpen] = createSignal<boolean>(false);
export const [isVersionModalOpen, setIsVersionModalOpen] = createSignal<boolean>(false);

// Persisted Settings (initialized from localStorage)
let initialFilters: FilterType[] = [];
let initialManualVersion: GameVersion | null = null;
let initialIsLivingDex: boolean = false;
let initialGlobalPokeball: PokeballType = 'poke';

try {
  const persisted = localStorage.getItem('dexhelper-settings');
  if (persisted) {
    const parsed = JSON.parse(persisted);
    if (parsed.state) {
      if (Array.isArray(parsed.state.filters)) initialFilters = parsed.state.filters;
      if (parsed.state.manualVersion !== undefined) initialManualVersion = parsed.state.manualVersion;
      if (typeof parsed.state.isLivingDex === 'boolean') initialIsLivingDex = parsed.state.isLivingDex;
      if (typeof parsed.state.globalPokeball === 'string') initialGlobalPokeball = parsed.state.globalPokeball;
    }
  }
} catch (e) {
  console.error('Failed to parse dexhelper-settings', e);
}

export const [filters, setFilters] = createSignal<FilterType[]>(initialFilters);
export const [manualVersion, setManualVersion] = createSignal<GameVersion | null>(initialManualVersion);
export const [isLivingDex, setIsLivingDex] = createSignal<boolean>(initialIsLivingDex);
export const [globalPokeball, setGlobalPokeball] = createSignal<PokeballType>(initialGlobalPokeball);

// Effect to persist settings on change
createEffect(() => {
  const stateToPersist = {
    filters: filters(),
    manualVersion: manualVersion(),
    isLivingDex: isLivingDex(),
    globalPokeball: globalPokeball(),
  };
  localStorage.setItem('dexhelper-settings', JSON.stringify({ state: stateToPersist }));
});

// ─── Actions ─────────────────────────────────────────────────────────

export const toggleFilter = (f: FilterType) => {
  setFilters(current => {
    if (current.includes(f)) {
      return current.filter(x => x !== f);
    }
    return [...current, f];
  });
};

export const filtersSet = () => new Set(filters());

export const loadSaveFromStorage = () => {
  const savedFile = localStorage.getItem('last_save_file');
  if (savedFile) {
    try {
      const binaryString = window.atob(savedFile);
      const len = binaryString.length;
      const bytes = new Uint8Array(len);
      for (let i = 0; i < len; i++) {
        bytes[i] = binaryString.charCodeAt(i);
      }
      const data = parseSaveFile(bytes.buffer, manualVersion() || undefined);
      setSaveData(data);
    } catch (err) {
      console.error('Failed to load saved file from localStorage:', err);
      localStorage.removeItem('last_save_file');
    }
  }
};
