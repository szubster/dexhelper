/* eslint-disable @typescript-eslint/unbound-method */
import { afterEach, beforeEach, describe, expect, it, vi } from 'vitest';
import { saveDB } from './db/SaveDB';
import { parseSaveFile } from './engine/saveParser/index';
import { useStore } from './store';
import { r2Client } from './utils/r2/client';

vi.mock('./utils/r2/client', () => ({
  r2Client: {
    listSaves: vi.fn<() => Promise<{ id: string; lastModified?: number }[]>>(),
    getSave: vi.fn<(id: string) => Promise<{ data: Uint8Array; lastModified?: number } | undefined>>(),
    putSave: vi.fn<(id: string, data: Uint8Array, lastModified?: number) => Promise<void>>(),
  },
}));

vi.mock('./engine/saveParser/index', () => ({
  parseSaveFile: vi.fn<() => ReturnType<typeof parseSaveFile>>(),
}));

describe('Zustand Store', () => {
  beforeEach(() => {
    // Reset the store state before each test
    useStore.setState({
      saves: {},
      activeSaveId: null,
      saveData: null,
      error: null,
      filters: [],
      manualVersion: null,
      isLivingDex: false,
      globalPokeball: 'poke',
      searchTerm: '',
      isSettingsOpen: false,
      isVersionModalOpen: false,
    });
  });

  afterEach(() => {
    vi.restoreAllMocks();
    vi.unstubAllGlobals();
  });

  describe('UI state', () => {
    it('should set selected location id', () => {
      useStore.getState().setSelectedLocationId(10);
      expect(useStore.getState().selectedLocationId).toBe(10);
    });

    it('should toggle search term', () => {
      useStore.getState().setSearchTerm('pikachu');
      expect(useStore.getState().searchTerm).toBe('pikachu');
    });

    it('should toggle settings modal', () => {
      expect(useStore.getState().isSettingsOpen).toBe(false);
      useStore.getState().setIsSettingsOpen(true);
      expect(useStore.getState().isSettingsOpen).toBe(true);
    });

    it('should toggle version modal', () => {
      expect(useStore.getState().isVersionModalOpen).toBe(false);
      useStore.getState().setIsVersionModalOpen(true);
      expect(useStore.getState().isVersionModalOpen).toBe(true);
    });
  });

  describe('Settings state', () => {
    it('should toggle filters', () => {
      useStore.getState().toggleFilter('secured');
      expect(useStore.getState().filters).toContain('secured');

      useStore.getState().toggleFilter('missing');
      expect(useStore.getState().filters).toContain('secured');
      expect(useStore.getState().filters).toContain('missing');

      // Toggle off
      useStore.getState().toggleFilter('secured');
      expect(useStore.getState().filters).not.toContain('secured');
      expect(useStore.getState().filters).toContain('missing');
    });

    it('should set filters directly', () => {
      useStore.getState().setFilters(['secured', 'dex-only']);
      expect(useStore.getState().filters).toEqual(['secured', 'dex-only']);
    });

    it('should clear filters', () => {
      useStore.getState().setFilters(['secured', 'missing']);
      useStore.getState().setFilters([]);
      expect(useStore.getState().filters).toEqual([]);
    });

    it('should set manual version', () => {
      useStore.getState().setManualVersion('red');
      expect(useStore.getState().manualVersion).toBe('red');
    });

    it('should set living dex mode', () => {
      useStore.getState().setIsLivingDex(true);
      expect(useStore.getState().isLivingDex).toBe(true);
    });

    it('should set global pokeball', () => {
      useStore.getState().setGlobalPokeball('ultra');
      expect(useStore.getState().globalPokeball).toBe('ultra');
    });
  });

  describe('filtersSet helper', () => {
    it('should return a Set of the current filters', () => {
      useStore.getState().setFilters(['secured', 'missing']);
      const result = useStore.getState().filtersSet();
      expect(result).toBeInstanceOf(Set);
      expect(result.has('secured')).toBe(true);
      expect(result.has('missing')).toBe(true);
      expect(result.has('dex-only')).toBe(false);
    });
  });

  describe('Save data', () => {
    it('should set and clear save data', () => {
      const mockSave = {
        // biome-ignore lint/suspicious/noExplicitAny: test mock
      } as any;
      Object.assign(mockSave, {
        generation: 1,
        gameVersion: 'red' as const,
        trainerName: 'RED',
        trainerId: 12345,
        badges: 8,
        owned: new Set([1, 4, 7]),
        seen: new Set([1, 4, 7, 25]),
        party: [25],
        pc: [1, 4],
        inventory: [],
        currentMapId: 0,
        currentBoxCount: 1,
        hallOfFameCount: 0,
        eventFlags: new Uint8Array(300),
        partyDetails: [],
        pcDetails: [],
      });

      useStore.getState().setSaveData(mockSave);
      expect(useStore.getState().saveData).toBe(mockSave);
      expect(useStore.getState().saveData?.trainerName).toBe('RED');

      useStore.getState().setSaveData(null);
      expect(useStore.getState().saveData).toBeNull();
    });

    it('should set and clear error', () => {
      useStore.getState().setError('Parse failed');
      expect(useStore.getState().error).toBe('Parse failed');

      useStore.getState().setError(null);
      expect(useStore.getState().error).toBeNull();
    });

    it('should pull from R2 if logged in', async () => {
      vi.stubGlobal('localStorage', {
        getItem: () => 'true',
        setItem: vi.fn<() => void>(),
        removeItem: vi.fn<() => void>(),
      });
      vi.mocked(r2Client.listSaves).mockResolvedValue([{ id: 'cloud-save-id' }]);
      const cloudData = new Uint8Array([9, 9, 9]);
      vi.mocked(r2Client.getSave).mockResolvedValue({ data: cloudData });
      const putSaveSpy = vi.spyOn(saveDB, 'putSave').mockResolvedValue(undefined);

      const mockSaveData = { trainerName: 'CLOUD', generation: 1, gameVersion: 'red' };
      vi.mocked(parseSaveFile).mockReturnValue(mockSaveData as unknown as ReturnType<typeof parseSaveFile>);

      await useStore.getState().loadSaveFromStorage();

      expect(r2Client.listSaves).toHaveBeenCalled();
      expect(r2Client.getSave).toHaveBeenCalledWith('cloud-save-id');
      expect(putSaveSpy).toHaveBeenCalledWith('last_save_file', cloudData);
      expect(useStore.getState().saveData).toEqual(mockSaveData);

      vi.unstubAllGlobals();
    });

    it('should resolve conflict by keeping local', async () => {
      const state = useStore.getState();
      const mockLocalBuffer = new Uint8Array([1, 2, 3]);
      state.setConflictState({
        isOpen: true,
        localMetadata: { timestamp: 1000 },
        remoteMetadata: { timestamp: 2000 },
        localBuffer: mockLocalBuffer,
        remoteBuffer: new Uint8Array([4, 5, 6]),
        saveId: 'save-1',
      });

      const mockSaveData = { trainerName: 'LOCAL_RESOLVED', generation: 1, gameVersion: 'red' };
      vi.mocked(parseSaveFile).mockReturnValue(mockSaveData as unknown as ReturnType<typeof parseSaveFile>);
      const putSaveSpy = vi.spyOn(saveDB, 'putSave').mockResolvedValue(undefined);
      vi.spyOn(r2Client, 'putSave').mockResolvedValue();

      await useStore.getState().resolveConflict('keep_local');

      expect(parseSaveFile).toHaveBeenCalledWith(expect.any(ArrayBuffer), undefined);
      expect(r2Client.putSave).toHaveBeenCalledWith('save-1', mockLocalBuffer, 1000);
      expect(putSaveSpy).toHaveBeenCalledWith('last_save_file', mockLocalBuffer);
      expect(useStore.getState().saveData).toEqual(mockSaveData);
      expect(useStore.getState().conflictState).toBeNull();
    });

    it('should resolve conflict by pulling remote', async () => {
      const state = useStore.getState();
      const mockRemoteBuffer = new Uint8Array([4, 5, 6]);
      state.setConflictState({
        isOpen: true,
        localMetadata: { timestamp: 1000 },
        remoteMetadata: { timestamp: 2000 },
        localBuffer: new Uint8Array([1, 2, 3]),
        remoteBuffer: mockRemoteBuffer,
        saveId: 'save-1',
      });

      const mockSaveData = { trainerName: 'REMOTE_RESOLVED', generation: 1, gameVersion: 'red' };
      vi.mocked(parseSaveFile).mockReturnValue(mockSaveData as unknown as ReturnType<typeof parseSaveFile>);
      const putSaveSpy = vi.spyOn(saveDB, 'putSave').mockResolvedValue(undefined);
      const putSaveMock = vi.spyOn(r2Client, 'putSave').mockResolvedValue();
      putSaveMock.mockClear();

      await useStore.getState().resolveConflict('pull_remote');

      expect(parseSaveFile).toHaveBeenCalledWith(expect.any(ArrayBuffer), undefined);
      expect(r2Client.putSave).not.toHaveBeenCalled();
      expect(putSaveSpy).toHaveBeenCalledWith('last_save_file', mockRemoteBuffer);
      expect(useStore.getState().saveData).toEqual(mockSaveData);
      expect(useStore.getState().conflictState).toBeNull();
    });

    it('should set version modal and manual version on pull remote with unknown version', async () => {
      const state = useStore.getState();
      const mockRemoteBuffer = new Uint8Array([4, 5, 6]);
      state.setConflictState({
        isOpen: true,
        localMetadata: { timestamp: 1000 },
        remoteMetadata: { timestamp: 2000 },
        localBuffer: new Uint8Array([1, 2, 3]),
        remoteBuffer: mockRemoteBuffer,
        saveId: 'save-1',
      });

      const mockSaveData = { trainerName: 'REMOTE_RESOLVED', generation: 1, gameVersion: 'unknown' };
      vi.mocked(parseSaveFile).mockReturnValue(mockSaveData as unknown as ReturnType<typeof parseSaveFile>);
      vi.spyOn(saveDB, 'putSave').mockResolvedValue(undefined);

      await useStore.getState().resolveConflict('pull_remote');

      expect(useStore.getState().isVersionModalOpen).toBe(true);
      expect(useStore.getState().conflictState).toBeNull();
    });

    it('should set version modal and manual version on keep local with unknown version', async () => {
      const state = useStore.getState();
      state.setConflictState({
        isOpen: true,
        localMetadata: { timestamp: 1000 },
        remoteMetadata: { timestamp: 2000 },
        localBuffer: new Uint8Array([1, 2, 3]),
        remoteBuffer: new Uint8Array([4, 5, 6]),
        saveId: 'save-1',
      });

      const mockSaveData = { trainerName: 'LOCAL_RESOLVED', generation: 1, gameVersion: 'unknown' };
      vi.mocked(parseSaveFile).mockReturnValue(mockSaveData as unknown as ReturnType<typeof parseSaveFile>);
      vi.spyOn(r2Client, 'putSave').mockResolvedValue(undefined);

      await useStore.getState().resolveConflict('keep_local');

      expect(useStore.getState().isVersionModalOpen).toBe(true);
      expect(useStore.getState().conflictState).toBeNull();
    });

    it('should handle keep local with ArrayBuffer', async () => {
      const state = useStore.getState();
      const mockLocalArrayBuffer = new Uint8Array([1, 2, 3]).buffer;

      state.setConflictState({
        isOpen: true,
        localMetadata: { timestamp: 1000 },
        remoteMetadata: { timestamp: 2000 },
        localBuffer: mockLocalArrayBuffer as unknown as Uint8Array,
        remoteBuffer: new Uint8Array([4, 5, 6]),
        saveId: 'save-1',
      });

      const mockSaveData = { trainerName: 'LOCAL_RESOLVED', generation: 1, gameVersion: 'red' };
      vi.mocked(parseSaveFile).mockReturnValue(mockSaveData as unknown as ReturnType<typeof parseSaveFile>);
      vi.spyOn(r2Client, 'putSave').mockResolvedValue(undefined);

      await useStore.getState().resolveConflict('keep_local');

      expect(r2Client.putSave).toHaveBeenCalled();
      expect(useStore.getState().conflictState).toBeNull();
    });

    it('should catch and set error on conflict resolution failure', async () => {
      const state = useStore.getState();
      state.setConflictState({
        isOpen: true,
        localMetadata: { timestamp: 1000 },
        remoteMetadata: { timestamp: 2000 },
        localBuffer: new Uint8Array([1]),
        remoteBuffer: new Uint8Array([2]),
        saveId: 'save-1',
      });

      vi.mocked(parseSaveFile).mockImplementation(() => {
        throw new Error('Parse error');
      });

      const consoleErrorSpy = vi.spyOn(console, 'error').mockImplementation(() => {});

      await useStore.getState().resolveConflict('pull_remote');

      expect(consoleErrorSpy).toHaveBeenCalledWith('System: failed to resolve conflict');
      expect(useStore.getState().error).toBe('Failed to resolve sync conflict.');
      expect(useStore.getState().conflictState).toBeNull();

      consoleErrorSpy.mockRestore();
    });

    it('should do nothing if resolveConflict is called with no conflict state', async () => {
      useStore.getState().setConflictState(null);
      await useStore.getState().resolveConflict('pull_remote');
      expect(useStore.getState().conflictState).toBeNull();
    });

    it('should set manual version to null on pull remote with known version', async () => {
      const state = useStore.getState();
      const mockRemoteBuffer = new Uint8Array([4, 5, 6]);
      state.setConflictState({
        isOpen: true,
        localMetadata: { timestamp: 1000 },
        remoteMetadata: { timestamp: 2000 },
        localBuffer: new Uint8Array([1, 2, 3]),
        remoteBuffer: mockRemoteBuffer,
        saveId: 'save-1',
      });

      const mockSaveData = { trainerName: 'REMOTE_RESOLVED', generation: 1, gameVersion: 'red' };
      vi.mocked(parseSaveFile).mockReturnValue(mockSaveData as unknown as ReturnType<typeof parseSaveFile>);
      vi.spyOn(saveDB, 'putSave').mockResolvedValue(undefined);

      // precondition
      useStore.getState().setManualVersion('red');

      await useStore.getState().resolveConflict('pull_remote');

      expect(useStore.getState().manualVersion).toBeNull();
      expect(useStore.getState().conflictState).toBeNull();
    });

    it('should set manual version to null on keep local with known version', async () => {
      const state = useStore.getState();
      state.setConflictState({
        isOpen: true,
        localMetadata: { timestamp: 1000 },
        remoteMetadata: { timestamp: 2000 },
        localBuffer: new Uint8Array([1, 2, 3]),
        remoteBuffer: new Uint8Array([4, 5, 6]),
        saveId: 'save-1',
      });

      const mockSaveData = { trainerName: 'LOCAL_RESOLVED', generation: 1, gameVersion: 'red' };
      vi.mocked(parseSaveFile).mockReturnValue(mockSaveData as unknown as ReturnType<typeof parseSaveFile>);
      vi.spyOn(r2Client, 'putSave').mockResolvedValue(undefined);

      // precondition
      useStore.getState().setManualVersion('red');

      await useStore.getState().resolveConflict('keep_local');

      expect(useStore.getState().manualVersion).toBeNull();
      expect(useStore.getState().conflictState).toBeNull();
    });

    it('should handle state.localBuffer.buffer not instance of ArrayBuffer', async () => {
      const state = useStore.getState();

      const localBuffer = new Uint8Array([1, 2, 3]);
      // Explicitly override buffer so it is NOT an ArrayBuffer
      Object.defineProperty(localBuffer, 'buffer', { value: [] });

      state.setConflictState({
        isOpen: true,
        localMetadata: { timestamp: 1000 },
        remoteMetadata: { timestamp: 2000 },
        localBuffer,
        remoteBuffer: new Uint8Array([4, 5, 6]),
        saveId: 'save-1',
      });
      const mockSaveData = { trainerName: 'LOCAL_RESOLVED', generation: 1, gameVersion: 'red' };
      vi.mocked(parseSaveFile).mockReturnValue(mockSaveData as unknown as ReturnType<typeof parseSaveFile>);
      vi.spyOn(r2Client, 'putSave').mockResolvedValue(undefined);
      await useStore.getState().resolveConflict('keep_local');
      expect(useStore.getState().conflictState).toBeNull();
    });

    it('should fallback to local DB if R2 fails', async () => {
      vi.stubGlobal('localStorage', {
        getItem: () => 'true',
        setItem: vi.fn<() => void>(),
        removeItem: vi.fn<() => void>(),
      });
      vi.mocked(r2Client.listSaves).mockResolvedValue([{ id: 'cloud-save-id' }]);
      vi.mocked(r2Client.getSave).mockRejectedValue(new Error('Network error'));

      const localData = new Uint8Array([1, 2, 3]);
      vi.spyOn(saveDB, 'getSave').mockResolvedValue(localData);
      const mockSaveData = { trainerName: 'LOCAL', generation: 1, gameVersion: 'red' };
      vi.mocked(parseSaveFile).mockReturnValue(mockSaveData as unknown as ReturnType<typeof parseSaveFile>);

      await useStore.getState().loadSaveFromStorage();

      expect(r2Client.listSaves).toHaveBeenCalled();
      expect(r2Client.getSave).toHaveBeenCalledWith('cloud-save-id');
      expect(saveDB.getSave).toHaveBeenCalledWith('last_save_file');
      expect(useStore.getState().saveData).toEqual(mockSaveData);

      vi.unstubAllGlobals();
    });

    it('should fallback to local DB if R2 list saves fails', async () => {
      vi.stubGlobal('localStorage', {
        getItem: () => 'true',
        setItem: vi.fn<() => void>(),
        removeItem: vi.fn<() => void>(),
      });
      vi.mocked(r2Client.listSaves).mockRejectedValue(new Error('Network error'));

      const localData = new Uint8Array([1, 2, 3]);
      vi.spyOn(saveDB, 'getSave').mockResolvedValue(localData);
      const mockSaveData = { trainerName: 'LOCAL', generation: 1, gameVersion: 'red' };
      vi.mocked(parseSaveFile).mockReturnValue(mockSaveData as unknown as ReturnType<typeof parseSaveFile>);

      await useStore.getState().loadSaveFromStorage();

      expect(r2Client.listSaves).toHaveBeenCalled();
      expect(saveDB.getSave).toHaveBeenCalledWith('last_save_file');
      expect(useStore.getState().saveData).toEqual(mockSaveData);

      vi.unstubAllGlobals();
    });
    it('should load a valid save from IndexedDB successfully', async () => {
      vi.stubGlobal('localStorage', {
        getItem: () => null,
        setItem: vi.fn<() => void>(),
        removeItem: vi.fn<() => void>(),
      });
      const mockSaveData = { trainerName: 'ASH', generation: 1, gameVersion: 'red' };
      vi.mocked(parseSaveFile).mockReturnValue(mockSaveData as unknown as ReturnType<typeof parseSaveFile>);

      vi.spyOn(saveDB, 'getSave').mockResolvedValue(new Uint8Array([1, 2, 3]));

      await useStore.getState().loadSaveFromStorage();

      expect(parseSaveFile).toHaveBeenCalled();
      expect(useStore.getState().saveData).toEqual(mockSaveData);
    });

    it('should handle save load failure gracefully', async () => {
      vi.spyOn(saveDB, 'getSave').mockRejectedValue(new Error('DB Error'));

      const mockConsoleError = vi.spyOn(console, 'error').mockImplementation(() => {});

      await useStore.getState().loadSaveFromStorage();

      expect(mockConsoleError).toHaveBeenCalledWith('System: load failed');
    });

    it('should ignore loadSaveFromStorage if getSave returns undefined', async () => {
      vi.stubGlobal('localStorage', {
        getItem: () => null,
        setItem: vi.fn<() => void>(),
        removeItem: vi.fn<() => void>(),
      });
      vi.clearAllMocks();
      vi.spyOn(saveDB, 'getSave').mockResolvedValue(undefined);
      vi.stubGlobal('localStorage', {
        getItem: () => null,
        setItem: vi.fn<() => void>(),
        removeItem: vi.fn<() => void>(),
      });
      await useStore.getState().loadSaveFromStorage();
      expect(parseSaveFile).not.toHaveBeenCalled();
    });
  });
});

describe('Persist Hydration Error Handling', () => {
  afterEach(() => {
    vi.restoreAllMocks();
    vi.unstubAllGlobals();
  });

  it('should handle corrupted persist storage gracefully when getItem throws', async () => {
    // We must reset modules to force Zustand to re-evaluate and re-hydrate
    vi.resetModules();

    const mockGetItem = vi.fn<(key: string) => string | null>().mockImplementation((key) => {
      if (key === 'dexhelper-settings') {
        throw new Error('Simulated storage error');
      }
      return null;
    });

    vi.stubGlobal('localStorage', {
      getItem: mockGetItem,
      setItem: vi.fn<() => void>(),
      removeItem: vi.fn<() => void>(),
    });

    // Dynamically import to trigger store creation and hydration
    const { useStore: freshStore } = await import('./store');

    // The store should not crash, but initialize with defaults
    expect(freshStore.getState().filters).toEqual([]);
    expect(freshStore.getState().manualVersion).toBeNull();

    // Zustand persist logs a warning internally when getItem throws
  });

  it('should handle corrupted persist storage gracefully when JSON is invalid', async () => {
    vi.resetModules();

    const mockGetItem = vi.fn<(key: string) => string | null>().mockImplementation((key) => {
      if (key === 'dexhelper-settings') {
        return '{ invalid json';
      }
      return null;
    });

    vi.stubGlobal('localStorage', {
      getItem: mockGetItem,
      setItem: vi.fn<() => void>(),
      removeItem: vi.fn<() => void>(),
    });

    const { useStore: freshStore } = await import('./store');

    // The store should not crash, but initialize with defaults
    expect(freshStore.getState().filters).toEqual([]);
    expect(freshStore.getState().isLivingDex).toBe(false);
  });
});
