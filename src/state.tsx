import React, { createContext, useContext, useState, useEffect } from 'react';
import { parseSaveFile, SaveData, GameVersion as GameVersionType } from './utils/saveParser';

export type GameVersion = GameVersionType;
export type FilterType = 'secured' | 'missing' | 'dex-only';
export type PokeballType = 'poke' | 'great' | 'ultra' | 'safari' | 'heavy' | 'lure' | 'fast' | 'friend' | 'moon' | 'love' | 'level';

interface AppState {
  saveData: SaveData | null;
  setSaveData: (data: SaveData | null) => void;
  filters: Set<FilterType>;
  toggleFilter: (f: FilterType) => void;
  setFilters: (f: Set<FilterType>) => void;
  manualVersion: GameVersion | null;
  setManualVersion: (v: GameVersion | null) => void;
  isLivingDex: boolean;
  setIsLivingDex: (v: boolean) => void;
  globalPokeball: PokeballType;
  setGlobalPokeball: (v: PokeballType) => void;
  searchTerm: string;
  setSearchTerm: (v: string) => void;
  isSettingsOpen: boolean;
  setIsSettingsOpen: (v: boolean) => void;
  isVersionModalOpen: boolean;
  setIsVersionModalOpen: (v: boolean) => void;
  error: string | null;
  setError: (v: string | null) => void;
}

const AppContext = createContext<AppState | undefined>(undefined);

export function AppProvider({ children }: { children: React.ReactNode }) {
  const [saveData, setSaveData] = useState<SaveData | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [filters, setFilters] = useState<Set<FilterType>>(() => {
    const saved = localStorage.getItem('filters');
    if (saved) {
      try {
        return new Set(JSON.parse(saved));
      } catch (e) {
        return new Set();
      }
    }
    return new Set();
  });
  const [manualVersion, setManualVersion] = useState<GameVersion | null>(() => {
    const saved = localStorage.getItem('manualVersion');
    return saved ? (saved as GameVersion) : null;
  });
  const [isLivingDex, setIsLivingDex] = useState(() => {
    const saved = localStorage.getItem('isLivingDex');
    return saved ? JSON.parse(saved) : false;
  });
  const [globalPokeball, setGlobalPokeball] = useState<PokeballType>(() => {
    const saved = localStorage.getItem('globalPokeball');
    return saved ? (saved as PokeballType) : 'poke';
  });
  const [searchTerm, setSearchTerm] = useState('');
  const [isSettingsOpen, setIsSettingsOpen] = useState(false);
  const [isVersionModalOpen, setIsVersionModalOpen] = useState(false);

  useEffect(() => {
    localStorage.setItem('filters', JSON.stringify(Array.from(filters)));
  }, [filters]);

  useEffect(() => {
    if (manualVersion) {
      localStorage.setItem('manualVersion', manualVersion);
    } else {
      localStorage.removeItem('manualVersion');
    }
  }, [manualVersion]);

  useEffect(() => {
    localStorage.setItem('isLivingDex', JSON.stringify(isLivingDex));
  }, [isLivingDex]);

  useEffect(() => {
    localStorage.setItem('globalPokeball', globalPokeball);
  }, [globalPokeball]);

  useEffect(() => {
    // Load saved data from localStorage
    const savedFile = localStorage.getItem('last_save_file');
    if (savedFile) {
      try {
        const binaryString = window.atob(savedFile);
        const len = binaryString.length;
        const bytes = new Uint8Array(len);
        for (let i = 0; i < len; i++) {
          bytes[i] = binaryString.charCodeAt(i);
        }
        const data = parseSaveFile(bytes.buffer);
        setSaveData(data);
      } catch (err) {
        console.error("Failed to load saved file from localStorage:", err);
        localStorage.removeItem('last_save_file');
      }
    }
  }, []);

  const toggleFilter = (f: FilterType) => {
    const newFilters = new Set(filters);
    if (newFilters.has(f)) {
      newFilters.delete(f);
    } else {
      newFilters.add(f);
    }
    setFilters(newFilters);
  };

  return (
    <AppContext.Provider value={{
      saveData, setSaveData, filters, toggleFilter, setFilters,
      manualVersion, setManualVersion, isLivingDex, setIsLivingDex,
      globalPokeball, setGlobalPokeball, searchTerm, setSearchTerm,
      isSettingsOpen, setIsSettingsOpen, isVersionModalOpen, setIsVersionModalOpen,
      error, setError
    }}>
      {children}
    </AppContext.Provider>
  );
}

export function useAppState() {
  const context = useContext(AppContext);
  if (context === undefined) {
    throw new Error('useAppState must be used within an AppProvider');
  }
  return context;
}
