import type { Mock } from 'vitest';
import { afterEach, beforeEach, describe, expect, it, vi } from 'vitest';
import { saveHistoryDB } from '../../../../db/SaveHistoryDB';
import * as saveParser from '../../../../engine/saveParser';
import type { GameVersion, SaveData } from '../../../../engine/saveParser/parsers/common';
import { BinjgbSyncEngine } from '../BinjgbSyncEngine';
import type { BinjgbInstance } from '../types';

vi.mock('../../../../db/SaveHistoryDB', () => ({
  saveHistoryDB: {
    putSave: vi.fn<(id: string, data: Uint8Array) => Promise<void>>(),
  },
}));

vi.mock('../../../../engine/saveParser', () => ({
  parseSaveFile: vi.fn<(buffer: ArrayBufferLike, forcedVersion?: GameVersion) => Promise<SaveData>>(),
}));

describe('BinjgbSyncEngine', () => {
  let mockInstance: BinjgbInstance;
  let engine: BinjgbSyncEngine;

  beforeEach(() => {
    vi.clearAllMocks();
    vi.useFakeTimers();

    mockInstance = {
      start: vi.fn<() => void>(),
      pause: vi.fn<() => void>(),
      reset: vi.fn<() => void>(),
      loadRom: vi.fn<(romBuffer: Uint8Array) => void>(),
      extractSaveState: vi.fn<() => Uint8Array | null>(),
    };

    engine = new BinjgbSyncEngine(mockInstance);
  });

  afterEach(() => {
    vi.restoreAllMocks();
    vi.useRealTimers();
  });

  it('returns null if extractSaveState returns null', async () => {
    (mockInstance.extractSaveState as Mock).mockReturnValue(null);

    const result = await engine.syncSaveData('test-save-id');

    expect(result).toBeNull();
    // eslint-disable-next-line @typescript-eslint/unbound-method
    expect(saveParser.parseSaveFile).not.toHaveBeenCalled();
    // eslint-disable-next-line @typescript-eslint/unbound-method
    expect(saveHistoryDB.putSave).not.toHaveBeenCalled();
  });

  it('extracts, parses, and saves state successfully', async () => {
    const mockBuffer = new Uint8Array([1, 2, 3]);
    (mockInstance.extractSaveState as Mock).mockReturnValue(mockBuffer);

    const mockSaveData = { trainerName: 'ASH' };
    (saveParser.parseSaveFile as Mock).mockResolvedValue(mockSaveData);

    const result = await engine.syncSaveData('test-save-id', 'red');

    expect(result).toEqual(mockSaveData);
    // eslint-disable-next-line @typescript-eslint/unbound-method
    expect(saveParser.parseSaveFile).toHaveBeenCalledWith(mockBuffer.buffer, 'red');
    // eslint-disable-next-line @typescript-eslint/unbound-method
    expect(saveHistoryDB.putSave).toHaveBeenCalledWith('test-save-id', mockBuffer);
  });

  it('polls periodically and syncs save data', async () => {
    const mockBuffer = new Uint8Array([1, 2, 3]);
    (mockInstance.extractSaveState as Mock).mockReturnValue(mockBuffer);
    const mockSaveData = { trainerName: 'ASH' };
    (saveParser.parseSaveFile as Mock).mockResolvedValue(mockSaveData);

    engine.startPolling('test-save-id', 1000, 'red');

    // Fast forward 1 second
    await vi.advanceTimersByTimeAsync(1000);

    // eslint-disable-next-line @typescript-eslint/unbound-method
    expect(mockInstance.extractSaveState).toHaveBeenCalledTimes(1);
    // eslint-disable-next-line @typescript-eslint/unbound-method
    expect(saveParser.parseSaveFile).toHaveBeenCalledTimes(1);
    // eslint-disable-next-line @typescript-eslint/unbound-method
    expect(saveHistoryDB.putSave).toHaveBeenCalledTimes(1);

    // Fast forward another 1 second
    await vi.advanceTimersByTimeAsync(1000);

    // eslint-disable-next-line @typescript-eslint/unbound-method
    expect(mockInstance.extractSaveState).toHaveBeenCalledTimes(2);

    engine.stopPolling();

    // Fast forward after stopping
    await vi.advanceTimersByTimeAsync(1000);

    // Should not have been called a 3rd time
    // eslint-disable-next-line @typescript-eslint/unbound-method
    expect(mockInstance.extractSaveState).toHaveBeenCalledTimes(2);
  });
});
