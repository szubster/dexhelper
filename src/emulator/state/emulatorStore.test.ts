import { beforeEach, describe, expect, it, vi } from 'vitest';
import { useEmulatorStore } from './emulatorStore';

vi.mock('../wasm/EmulatorSyncEngine', () => {
  return {
    EmulatorSyncEngine: class {
      // biome-ignore lint/suspicious/noExplicitAny: mock class
      syncSaveData = vi.fn<any>().mockReturnValue({ generation: 3, gameVersion: 'emerald' });
    },
  };
});

describe('emulatorStore', () => {
  beforeEach(() => {
    // Reset state before each test
    const initialState = useEmulatorStore.getInitialState();
    useEmulatorStore.setState(initialState, true);
  });

  it('should have initial state', () => {
    const state = useEmulatorStore.getState();
    expect(state.memory).toBeNull();
    expect(state.bufferSize).toBe(0);
    expect(state.forcedVersion).toBeUndefined();
    expect(state.saveData).toBeNull();
    expect(state.engine).toBeNull();
    expect(state.error).toBeNull();
  });

  it('should set memory and initialize engine', () => {
    const mockMemory = new WebAssembly.Memory({ initial: 1 });
    const bufferSize = 1024;
    const forcedVersion = 'emerald';

    useEmulatorStore.getState().setMemory(mockMemory, bufferSize, forcedVersion);

    const state = useEmulatorStore.getState();
    expect(state.memory).toBe(mockMemory);
    expect(state.bufferSize).toBe(bufferSize);
    expect(state.forcedVersion).toBe(forcedVersion);
    expect(state.engine).not.toBeNull();
  });

  it('should sync save data successfully', () => {
    const mockMemory = new WebAssembly.Memory({ initial: 1 });
    const bufferSize = 1024;

    useEmulatorStore.getState().setMemory(mockMemory, bufferSize);
    useEmulatorStore.getState().syncSaveData();

    const state = useEmulatorStore.getState();
    expect(state.saveData).toEqual({ generation: 3, gameVersion: 'emerald' });
    expect(state.error).toBeNull();
  });

  it('should set error if engine is not initialized when syncing', () => {
    useEmulatorStore.getState().syncSaveData();

    const state = useEmulatorStore.getState();
    expect(state.error).toBe('EmulatorSyncEngine is not initialized.');
  });

  it('should set error manually', () => {
    useEmulatorStore.getState().setError('Custom error');

    const state = useEmulatorStore.getState();
    expect(state.error).toBe('Custom error');
  });
});
