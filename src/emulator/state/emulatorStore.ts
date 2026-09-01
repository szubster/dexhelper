import { create } from 'zustand';
import type { GameVersion, SaveData } from '../../engine/saveParser/parsers/common';
import { EmulatorSyncEngine } from '../wasm/EmulatorSyncEngine';

interface EmulatorState {
  memory: WebAssembly.Memory | null;
  bufferSize: number;
  forcedVersion?: GameVersion;
  saveData: SaveData | null;
  engine: EmulatorSyncEngine | null;
  error: string | null;

  setMemory: (memory: WebAssembly.Memory, bufferSize: number, forcedVersion?: GameVersion) => void;
  syncSaveData: () => void;
  setError: (error: string | null) => void;
}

export const useEmulatorStore = create<EmulatorState>((set, get) => ({
  memory: null,
  bufferSize: 0,
  saveData: null,
  engine: null,
  error: null,

  setMemory: (memory, bufferSize, forcedVersion) => {
    // Using object spread on the current state and omitting forcedVersion if undefined
    set((state) => {
      const nextState = {
        ...state,
        memory,
        bufferSize,
        engine: new EmulatorSyncEngine(memory),
      };
      if (forcedVersion !== undefined) {
        nextState.forcedVersion = forcedVersion;
      } else {
        delete nextState.forcedVersion;
      }
      return nextState;
    });
  },

  syncSaveData: () => {
    const { engine, bufferSize, forcedVersion } = get();
    if (!engine) {
      set({ error: 'EmulatorSyncEngine is not initialized.' });
      return;
    }

    try {
      const saveData = engine.syncSaveData(bufferSize, forcedVersion);
      set({ saveData, error: null });
    } catch (err) {
      set({ error: err instanceof Error ? err.message : 'Failed to sync save data.' });
    }
  },

  setError: (error) => set({ error }),
}));
