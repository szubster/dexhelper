import { useState } from 'react';
/* eslint-disable @typescript-eslint/unbound-method */
import { afterEach, beforeEach, describe, expect, it, type Mock, vi } from 'vitest';
import { page } from 'vitest/browser';
import { render } from 'vitest-browser-react';
import type { GameVersion, SaveData } from '../engine/saveParser/index';
import * as saveParser from '../engine/saveParser/index';
import { useStore } from '../store';
import { useFileSyncController } from './useFileSyncController';

// Mock dependencies
vi.mock('../utils/r2/client', () => ({
  r2Client: {
    listSaves: vi.fn<() => Promise<{ id: string; lastModified?: number }[]>>(),
    getSave: vi.fn<(id: string) => Promise<{ data: Uint8Array; lastModified?: number } | undefined>>(),
    putSave: vi.fn<(id: string, data: Uint8Array, lastModified?: number) => Promise<void>>(),
  },
}));

vi.mock('../db/SaveDB', () => ({
  saveDB: {
    putSave: vi.fn<() => void>(),
    putHandle: vi.fn<() => void>(),
    getHandle: vi.fn<() => void>(),
  },
}));

vi.mock('../engine/saveParser/index', () => ({
  parseSaveFile: vi.fn<() => void>(),
}));

function TestComponent() {
  const { status, errorMsg, requestSync, resumeSync, hasStoredHandle } = useFileSyncController();

  return (
    <div>
      <div data-testid="status">{status}</div>
      <div data-testid="error">{errorMsg}</div>
      <div data-testid="has-handle">{hasStoredHandle.toString()}</div>
      <button type="button" onClick={requestSync} data-testid="request-btn">
        Request
      </button>
      <button type="button" onClick={resumeSync} data-testid="resume-btn">
        Resume
      </button>
    </div>
  );
}

function WrapperComponent() {
  const [show, setShow] = useState(true);
  return (
    <div>
      {show && <TestComponent />}
      <button type="button" onClick={() => setShow(false)} data-testid="unmount-btn">
        Unmount
      </button>
    </div>
  );
}

describe('useFileSyncController', () => {
  let mockSetSaveData: Mock<(data: SaveData | null) => void>;
  let mockSetIsVersionModalOpen: Mock<(v: boolean) => void>;
  let mockSetManualVersion: Mock<(v: GameVersion | null) => void>;

  beforeEach(() => {
    vi.clearAllMocks();
    localStorage.clear();
    vi.useFakeTimers({ toFake: ['setInterval', 'clearInterval', 'setTimeout'] });

    // Setup store mocks
    mockSetSaveData = vi.fn<() => void>();
    mockSetIsVersionModalOpen = vi.fn<() => void>();
    mockSetManualVersion = vi.fn<() => void>();

    useStore.setState({
      setSaveData: mockSetSaveData,
      setIsVersionModalOpen: mockSetIsVersionModalOpen,
      setManualVersion: mockSetManualVersion,
      manualVersion: null,
    });
  });

  afterEach(() => {
    vi.useRealTimers();
  });

  it('should initialize with disconnected status', async () => {
    void render(<TestComponent />);
    await expect.element(page.getByTestId('status')).toHaveTextContent('disconnected');
    await expect.element(page.getByTestId('has-handle')).toHaveTextContent('false');
  });

  it('should respect polling interval and update state only on file changes', async () => {
    // Setup file mock
    let lastModifiedValue = 1000;
    const mockFile = {
      arrayBuffer: vi.fn<() => Promise<ArrayBuffer>>().mockResolvedValue(new ArrayBuffer(8)),
      get lastModified() {
        return lastModifiedValue;
      },
    };

    const mockHandle = {
      getFile: vi.fn<() => Promise<unknown>>().mockImplementation(() => {
        return Promise.resolve(mockFile);
      }),
    };

    // Setup window mock
    Object.defineProperty(window, 'showOpenFilePicker', {
      value: vi.fn<() => Promise<unknown[]>>().mockResolvedValue([mockHandle]),
      writable: true,
      configurable: true,
    });

    vi.mocked(saveParser.parseSaveFile).mockReturnValue({
      gameVersion: 'red',
      // dummy data for save
      // biome-ignore lint/suspicious/noExplicitAny: Mock value typing
    } as any);

    void render(<TestComponent />);

    // Request sync
    await page.getByTestId('request-btn').click();

    // Process initial sync
    // Wait for internal promises to resolve
    await vi.advanceTimersByTimeAsync(0);

    // State should be live
    await expect.element(page.getByTestId('status')).toHaveTextContent('live');
    expect(mockSetSaveData).toHaveBeenCalledTimes(1);

    // Fast forward interval (3 seconds) without file change
    await vi.advanceTimersByTimeAsync(3000);

    // Should poll but not update state (parseSaveFile not called again)
    expect(mockHandle.getFile).toHaveBeenCalledTimes(2); // Initial + 1 poll
    expect(mockSetSaveData).toHaveBeenCalledTimes(1); // Still 1

    // Fast forward another interval
    await vi.advanceTimersByTimeAsync(3000);

    expect(mockHandle.getFile).toHaveBeenCalledTimes(3); // Initial + 2 polls
    expect(mockSetSaveData).toHaveBeenCalledTimes(1); // Still 1

    // Change file lastModified
    lastModifiedValue = 2000;

    // Fast forward interval
    await vi.advanceTimersByTimeAsync(3000);

    // Should poll and update state
    expect(mockHandle.getFile).toHaveBeenCalledTimes(4); // Initial + 3 polls
    expect(mockSetSaveData).toHaveBeenCalledTimes(2); // Should have updated

    // Check stability (no memory leaks / extra calls)
    // We mock advance 10 times manually to avoid promise resolution issues with advanceTimersByTimeAsync and huge time jumps
    for (let i = 0; i < 10; i++) {
      await vi.advanceTimersByTimeAsync(3000);
    }

    expect(mockHandle.getFile).toHaveBeenCalledTimes(14); // 4 + 10 polls
    expect(mockSetSaveData).toHaveBeenCalledTimes(2); // File didn't change again
  });

  it('should push to R2 when logged in', async () => {
    const { AUTH_LOGGED_IN_INDICATOR } = await import('../contexts/AuthContext');
    const { r2Client } = await import('../utils/r2/client');

    localStorage.setItem(AUTH_LOGGED_IN_INDICATOR, 'true');
    vi.mocked(r2Client.listSaves).mockResolvedValue([{ id: 'existing-save-id', lastModified: 900 }]);

    // Setup file mock
    const mockFile = {
      arrayBuffer: vi.fn<() => Promise<ArrayBuffer>>().mockResolvedValue(new ArrayBuffer(8)),
      get lastModified() {
        return 1000;
      },
    };

    const mockHandle = {
      getFile: vi.fn<() => Promise<unknown>>().mockImplementation(() => {
        return Promise.resolve(mockFile);
      }),
    };

    Object.defineProperty(window, 'showOpenFilePicker', {
      value: vi.fn<() => Promise<unknown[]>>().mockResolvedValue([mockHandle]),
      writable: true,
      configurable: true,
    });

    vi.mocked(saveParser.parseSaveFile).mockReturnValue({
      gameVersion: 'red',
      // biome-ignore lint/suspicious/noExplicitAny: Mock value typing
    } as any);

    void render(<TestComponent />);
    await page.getByTestId('request-btn').click();
    await vi.advanceTimersByTimeAsync(0);

    expect(r2Client.listSaves).toHaveBeenCalled();
    expect(r2Client.putSave).toHaveBeenCalledWith('existing-save-id', expect.any(Uint8Array), 1000);
  });

  it('should detect conflict when remote is newer than local', async () => {
    const { AUTH_LOGGED_IN_INDICATOR } = await import('../contexts/AuthContext');
    const { r2Client } = await import('../utils/r2/client');
    const { useStore } = await import('../store');
    const { saveDB } = await import('../db/SaveDB');

    localStorage.setItem(AUTH_LOGGED_IN_INDICATOR, 'true');
    vi.mocked(r2Client.listSaves).mockResolvedValue([{ id: 'save-1', lastModified: 2000 }]);
    vi.mocked(r2Client.getSave).mockResolvedValue({ data: new Uint8Array([1, 2, 3]), lastModified: 2000 });

    const mockFile = {
      arrayBuffer: vi.fn<() => Promise<ArrayBuffer>>().mockResolvedValue(new ArrayBuffer(8)),
      get lastModified() {
        return 1000;
      },
    };

    const mockHandle = {
      getFile: vi.fn<() => Promise<unknown>>().mockImplementation(() => Promise.resolve(mockFile)),
    };

    Object.defineProperty(window, 'showOpenFilePicker', {
      value: vi.fn<() => Promise<unknown[]>>().mockResolvedValue([mockHandle]),
      writable: true,
      configurable: true,
    });

    vi.mocked(saveParser.parseSaveFile).mockReturnValue({
      gameVersion: 'red',
      // biome-ignore lint/suspicious/noExplicitAny: Mock value typing
    } as any);

    void render(<TestComponent />);
    await page.getByTestId('request-btn').click();
    await vi.advanceTimersByTimeAsync(0);

    expect(r2Client.listSaves).toHaveBeenCalled();
    expect(r2Client.getSave).toHaveBeenCalledWith('save-1');
    expect(r2Client.putSave).not.toHaveBeenCalled();

    // Check that conflict state is set in the store
    const conflictState = useStore.getState().conflictState;
    expect(conflictState).not.toBeNull();
    expect(conflictState?.isOpen).toBe(true);
    expect(conflictState?.localMetadata.timestamp).toBe(1000);
    expect(conflictState?.remoteMetadata.timestamp).toBe(2000);
    expect(conflictState?.saveId).toBe('save-1');
    expect(conflictState?.remoteBuffer).toEqual(new Uint8Array([1, 2, 3]));

    // Check that local save was NOT overwritten yet
    expect(saveDB.putSave).not.toHaveBeenCalledWith('last_save_file', new Uint8Array([1, 2, 3]));
  });

  it('should push to R2 when local is newer than remote', async () => {
    const { AUTH_LOGGED_IN_INDICATOR } = await import('../contexts/AuthContext');
    const { r2Client } = await import('../utils/r2/client');

    localStorage.setItem(AUTH_LOGGED_IN_INDICATOR, 'true');
    vi.mocked(r2Client.listSaves).mockResolvedValue([{ id: 'save-1', lastModified: 1000 }]);

    const mockFile = {
      arrayBuffer: vi.fn<() => Promise<ArrayBuffer>>().mockResolvedValue(new ArrayBuffer(8)),
      get lastModified() {
        return 2000;
      },
    };

    const mockHandle = {
      getFile: vi.fn<() => Promise<unknown>>().mockImplementation(() => Promise.resolve(mockFile)),
    };

    Object.defineProperty(window, 'showOpenFilePicker', {
      value: vi.fn<() => Promise<unknown[]>>().mockResolvedValue([mockHandle]),
      writable: true,
      configurable: true,
    });

    vi.mocked(saveParser.parseSaveFile).mockReturnValue({
      gameVersion: 'red',
      // biome-ignore lint/suspicious/noExplicitAny: Mock value typing
    } as any);

    void render(<TestComponent />);
    await page.getByTestId('request-btn').click();
    await vi.advanceTimersByTimeAsync(0);

    expect(r2Client.listSaves).toHaveBeenCalled();
    expect(r2Client.getSave).not.toHaveBeenCalled();
    expect(r2Client.putSave).toHaveBeenCalledWith('save-1', expect.any(Uint8Array), 2000);
  });

  it('should fallback to save-1 if no R2 saves exist', async () => {
    const { AUTH_LOGGED_IN_INDICATOR } = await import('../contexts/AuthContext');
    const { r2Client } = await import('../utils/r2/client');

    localStorage.setItem(AUTH_LOGGED_IN_INDICATOR, 'true');
    vi.mocked(r2Client.listSaves).mockResolvedValue([]);

    // Setup file mock
    const mockFile = {
      arrayBuffer: vi.fn<() => Promise<ArrayBuffer>>().mockResolvedValue(new ArrayBuffer(8)),
      get lastModified() {
        return 1000;
      },
    };

    const mockHandle = {
      getFile: vi.fn<() => Promise<unknown>>().mockImplementation(() => Promise.resolve(mockFile)),
    };

    Object.defineProperty(window, 'showOpenFilePicker', {
      value: vi.fn<() => Promise<unknown[]>>().mockResolvedValue([mockHandle]),
      writable: true,
      configurable: true,
    });

    vi.mocked(saveParser.parseSaveFile).mockReturnValue({
      gameVersion: 'red',
      // biome-ignore lint/suspicious/noExplicitAny: Mock value typing
    } as any);

    void render(<TestComponent />);
    await page.getByTestId('request-btn').click();
    await vi.advanceTimersByTimeAsync(0);

    expect(r2Client.putSave).toHaveBeenCalledWith('save-1', expect.any(Uint8Array), 1000);
  });

  it('should gracefully handle R2 failure', async () => {
    const { AUTH_LOGGED_IN_INDICATOR } = await import('../contexts/AuthContext');
    const { r2Client } = await import('../utils/r2/client');

    localStorage.setItem(AUTH_LOGGED_IN_INDICATOR, 'true');
    vi.mocked(r2Client.listSaves).mockRejectedValue(new Error('Network error'));

    const consoleWarnSpy = vi.spyOn(console, 'warn').mockImplementation(() => {});

    // Setup file mock
    const mockFile = {
      arrayBuffer: vi.fn<() => Promise<ArrayBuffer>>().mockResolvedValue(new ArrayBuffer(8)),
      get lastModified() {
        return 1000;
      },
    };

    const mockHandle = {
      getFile: vi.fn<() => Promise<unknown>>().mockImplementation(() => {
        return Promise.resolve(mockFile);
      }),
    };

    Object.defineProperty(window, 'showOpenFilePicker', {
      value: vi.fn<() => Promise<unknown[]>>().mockResolvedValue([mockHandle]),
      writable: true,
      configurable: true,
    });

    vi.mocked(saveParser.parseSaveFile).mockReturnValue({
      gameVersion: 'red',
      // biome-ignore lint/suspicious/noExplicitAny: Mock value typing
    } as any);

    void render(<TestComponent />);
    await page.getByTestId('request-btn').click();
    await vi.advanceTimersByTimeAsync(0);

    expect(consoleWarnSpy).toHaveBeenCalledWith('System: list saves from cloud failed');
    // Ensure state still transitioned to live despite the R2 error
    await expect.element(page.getByTestId('status')).toHaveTextContent('live');

    consoleWarnSpy.mockRestore();
  });

  it('should clean up interval on unmount', async () => {
    void render(<WrapperComponent />);

    // Spy on clearInterval
    const clearIntervalSpy = vi.spyOn(globalThis, 'clearInterval');

    await page.getByTestId('unmount-btn').click();

    expect(clearIntervalSpy).toHaveBeenCalled();
  });
});
