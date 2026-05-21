/* oxlint-disable typescript/unbound-method, vitest/require-mock-type-parameters */
/**
 * @vitest-environment happy-dom
 */

import { act, renderHook } from '@testing-library/react';
import * as idbKeyval from 'idb-keyval';
import { beforeEach, describe, expect, it, vi } from 'vitest';
import { useSyncController } from './useSyncController';

vi.mock('idb-keyval', () => ({
  get: vi.fn(),
  set: vi.fn(),
}));

const mockGet = vi.mocked(idbKeyval.get);
const mockSet = vi.mocked(idbKeyval.set);

describe('useSyncController', () => {
  beforeEach(() => {
    vi.clearAllMocks();
    window.showOpenFilePicker = vi.fn();
  });

  it('initializes correctly when showOpenFilePicker is available', () => {
    const { result } = renderHook(() => useSyncController());
    expect(result.current.isSupported).toBe(true);
    expect(result.current.fileHandle).toBeNull();
  });

  it('initializes correctly when showOpenFilePicker is not available', () => {
    delete window.showOpenFilePicker;
    const { result } = renderHook(() => useSyncController());
    expect(result.current.isSupported).toBe(false);
  });

  it('requestSync saves handle and updates state', async () => {
    const mockHandle = { kind: 'file', name: 'test.sav' } as unknown as FileSystemFileHandle;
    vi.mocked(window.showOpenFilePicker as NonNullable<typeof window.showOpenFilePicker>).mockResolvedValue([
      mockHandle,
    ]);

    const { result } = renderHook(() => useSyncController());

    await act(async () => {
      await result.current.requestSync();
    });

    expect(window.showOpenFilePicker).toHaveBeenCalledWith({
      types: [
        {
          description: 'Save Files',
          accept: {
            'application/octet-stream': ['.sav'],
          },
        },
      ],
      excludeAcceptAllOption: true,
      multiple: false,
    });
    expect(mockSet).toHaveBeenCalledWith('dexhelper-file-handle', mockHandle);
    expect(result.current.fileHandle).toBe(mockHandle);
  });

  it('requestSync ignores AbortError', async () => {
    const error = new DOMException('The user aborted a request.', 'AbortError');
    vi.mocked(window.showOpenFilePicker as NonNullable<typeof window.showOpenFilePicker>).mockRejectedValue(error);

    const { result } = renderHook(() => useSyncController());

    await act(async () => {
      await result.current.requestSync();
    });

    expect(mockSet).not.toHaveBeenCalled();
    expect(result.current.fileHandle).toBeNull();
  });

  it('requestSync throws other errors', async () => {
    const error = new Error('Some other error');
    vi.mocked(window.showOpenFilePicker as NonNullable<typeof window.showOpenFilePicker>).mockRejectedValue(error);

    const { result } = renderHook(() => useSyncController());

    await expect(result.current.requestSync()).rejects.toThrow('Some other error');
  });

  it('restoreSync returns false if no handle stored', async () => {
    mockGet.mockResolvedValue(undefined);

    const { result } = renderHook(() => useSyncController());

    let restored = false;
    await act(async () => {
      restored = await result.current.restoreSync();
    });

    expect(restored).toBe(false);
    expect(result.current.fileHandle).toBeNull();
  });

  it('restoreSync sets handle if permission already granted', async () => {
    const mockHandle = {
      kind: 'file',
      name: 'test.sav',
      queryPermission: vi.fn().mockResolvedValue('granted'),
      requestPermission: vi.fn(),
    } as unknown as FileSystemFileHandle;

    mockGet.mockResolvedValue(mockHandle);

    const { result } = renderHook(() => useSyncController());

    let restored = false;
    await act(async () => {
      restored = await result.current.restoreSync();
    });

    expect(restored).toBe(true);
    expect(mockHandle.queryPermission).toHaveBeenCalledWith({ mode: 'read' });
    expect(mockHandle.requestPermission).not.toHaveBeenCalled();
    expect(result.current.fileHandle).toBe(mockHandle);
  });

  it('restoreSync requests permission if not granted, sets handle if then granted', async () => {
    const mockHandle = {
      kind: 'file',
      name: 'test.sav',
      queryPermission: vi.fn().mockResolvedValue('prompt'),
      requestPermission: vi.fn().mockResolvedValue('granted'),
    } as unknown as FileSystemFileHandle;

    mockGet.mockResolvedValue(mockHandle);

    const { result } = renderHook(() => useSyncController());

    let restored = false;
    await act(async () => {
      restored = await result.current.restoreSync();
    });

    expect(restored).toBe(true);
    expect(mockHandle.queryPermission).toHaveBeenCalledWith({ mode: 'read' });
    expect(mockHandle.requestPermission).toHaveBeenCalledWith({ mode: 'read' });
    expect(result.current.fileHandle).toBe(mockHandle);
  });

  it('restoreSync returns false if permission request denied', async () => {
    const mockHandle = {
      kind: 'file',
      name: 'test.sav',
      queryPermission: vi.fn().mockResolvedValue('prompt'),
      requestPermission: vi.fn().mockResolvedValue('denied'),
    } as unknown as FileSystemFileHandle;

    mockGet.mockResolvedValue(mockHandle);

    const { result } = renderHook(() => useSyncController());

    let restored = false;
    await act(async () => {
      restored = await result.current.restoreSync();
    });

    expect(restored).toBe(false);
    expect(mockHandle.queryPermission).toHaveBeenCalledWith({ mode: 'read' });
    expect(mockHandle.requestPermission).toHaveBeenCalledWith({ mode: 'read' });
    expect(result.current.fileHandle).toBeNull();
  });

  it('requestSync throws if isSupported is false', async () => {
    delete window.showOpenFilePicker;

    const { result } = renderHook(() => useSyncController());

    await expect(result.current.requestSync()).rejects.toThrow(
      'File System Access API is not supported in this browser.',
    );
  });

  it('restoreSync returns false if isSupported is false', async () => {
    delete window.showOpenFilePicker;

    const { result } = renderHook(() => useSyncController());

    let restored = true;
    await act(async () => {
      restored = await result.current.restoreSync();
    });

    expect(restored).toBe(false);
  });
});
