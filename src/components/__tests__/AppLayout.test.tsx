/* eslint-disable @typescript-eslint/unbound-method */
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { createMemoryHistory, createRootRoute, createRouter, RouterProvider } from '@tanstack/react-router';
import { afterEach, beforeEach, describe, expect, it, type Mock, vi } from 'vitest';
import { page } from 'vitest/browser';
import { render } from 'vitest-browser-react';
import { saveDB } from '../../db/SaveDB';
import { parseSaveFile } from '../../engine/saveParser/index';
import { useStore } from '../../store';
import * as windowUtils from '../../utils/window';
import { AppLayout } from '../AppLayout';

vi.mock('../../utils/window', () => ({
  reloadPage: vi.fn<() => void>(),
  redirectPage: vi.fn<(url: string) => void>(),
}));

vi.mock('../../engine/saveParser/index', () => ({
  parseSaveFile: vi.fn<typeof parseSaveFile>(),
}));

vi.mock('../../utils/r2/client', () => ({
  r2Client: {
    listSaves: vi.fn<() => Promise<string[]>>(),
    putSave: vi.fn<(id: string, data: Uint8Array) => Promise<void>>(),
  },
}));

describe('AppLayout chunk error handling', () => {
  const queryClient = new QueryClient({
    defaultOptions: { queries: { retry: false } },
  });

  const rootRoute = createRootRoute({
    component: () => (
      <AppLayout>
        <div>Test Child</div>
      </AppLayout>
    ),
  });

  const router = createRouter({
    routeTree: rootRoute,
    history: createMemoryHistory(),
  });

  beforeEach(() => {
    vi.clearAllMocks();
  });

  afterEach(() => {
    vi.restoreAllMocks();
  });

  it('should reload the page when a chunk load error occurs', async () => {
    await render(
      <QueryClientProvider client={queryClient}>
        <RouterProvider router={router} />
      </QueryClientProvider>,
    );

    await expect.element(page.getByText('Test Child')).toBeInTheDocument();

    const errorEvent = new window.ErrorEvent('error', {
      message: 'Failed to fetch dynamically imported module',
    });

    // Disable console.error during this test to prevent codecov from thinking there's an unhandled error
    const spy = vi.spyOn(console, 'error').mockImplementation(() => {});
    window.dispatchEvent(errorEvent);
    spy.mockRestore();

    await vi.waitFor(() => {
      expect(windowUtils.reloadPage).toHaveBeenCalledTimes(1);
    });
  });

  it('should not reload the page for other errors', async () => {
    await render(
      <QueryClientProvider client={queryClient}>
        <RouterProvider router={router} />
      </QueryClientProvider>,
    );

    await expect.element(page.getByText('Test Child')).toBeInTheDocument();

    const errorEvent = new window.ErrorEvent('error', {
      message: 'Some other random error',
    });

    const spy = vi.spyOn(console, 'error').mockImplementation(() => {});
    window.dispatchEvent(errorEvent);
    spy.mockRestore();

    await new Promise((r) => setTimeout(r, 50));
    expect(windowUtils.reloadPage).not.toHaveBeenCalled();
  });
});

describe('AppLayout file upload', () => {
  const queryClient = new QueryClient({
    defaultOptions: { queries: { retry: false } },
  });

  const rootRoute = createRootRoute({
    component: () => (
      <AppLayout>
        <div>Test Child</div>
      </AppLayout>
    ),
  });

  const router = createRouter({
    routeTree: rootRoute,
    history: createMemoryHistory(),
  });

  beforeEach(() => {
    vi.clearAllMocks();
    useStore.getState().setSaveData(null);
    (parseSaveFile as Mock).mockReturnValue({
      gameVersion: 'unknown',
      generation: 1,
      trainerName: 'TEST',
      trainerId: 12345,
      party: [],
      pc: [],
    });
  });

  afterEach(() => {
    vi.restoreAllMocks();
  });

  it('should trigger the file input click when INITIALIZE.SYS button is clicked', async () => {
    await render(
      <QueryClientProvider client={queryClient}>
        <RouterProvider router={router} />
      </QueryClientProvider>,
    );

    const button = page.getByText('[ UPLOAD.SYS ]');
    await expect.element(button).toBeInTheDocument();

    const input = document.getElementById('init-save-input') as HTMLInputElement;
    const clickSpy = vi.spyOn(input, 'click');

    await button.click();

    expect(clickSpy).toHaveBeenCalled();
  });

  it('should trigger the file input click when Import New Save button is clicked', async () => {
    useStore.getState().setSaveData({
      gameVersion: 'red',
      generation: 1,
      trainerName: 'TEST',
      trainerId: 12345,
      party: [],
      pc: [],
      partyDetails: [],
      pcDetails: [],
      seen: new Set(),
      owned: new Set(),
      // biome-ignore lint/suspicious/noExplicitAny: Internal mock state
    } as any);

    await render(
      <QueryClientProvider client={queryClient}>
        <RouterProvider router={router} />
      </QueryClientProvider>,
    );

    const button = page.getByTitle('Import New Save');
    await expect.element(button).toBeInTheDocument();

    const input = document.getElementById('import-save-input') as HTMLInputElement;
    const clickSpy = vi.spyOn(input, 'click');

    await button.click();

    expect(clickSpy).toHaveBeenCalled();
  });

  it('should call saveDB.putSave when a file is uploaded', async () => {
    const putSaveSpy = vi.spyOn(saveDB, 'putSave').mockResolvedValue(undefined);
    await render(
      <QueryClientProvider client={queryClient}>
        <RouterProvider router={router} />
      </QueryClientProvider>,
    );

    // Create a file whose timestamp (Date.now()) is newer than the default mock or undefined lastModified from cloud
    const file = new File(['mock save content'], 'save.sav', {
      type: 'application/octet-stream',
      lastModified: Date.now() + 10000,
    });

    await expect.element(page.getByText('[ UPLOAD.SYS ]')).toBeInTheDocument();

    // biome-ignore lint/suspicious/noExplicitAny: Required for mock overriding context
    const readAsArrayBufferMock = vi.fn<(_f: File) => void>(function (this: any, _f: File) {
      const buffer = new ArrayBuffer(10);
      if (this.onload) {
        // biome-ignore lint/suspicious/noExplicitAny: internal mock state
        this.onload({ target: { result: buffer } } as any);
      }
    });
    vi.stubGlobal(
      'FileReader',
      class {
        readAsArrayBuffer = readAsArrayBufferMock;
      },
    );

    const element = document.querySelector('input[type="file"]') as HTMLInputElement;
    const dataTransfer = new DataTransfer();
    dataTransfer.items.add(file);

    // Call the original set property logic instead of just overriding `.files`
    Object.getOwnPropertyDescriptor(window.HTMLInputElement.prototype, 'files')?.set?.call(element, dataTransfer.files);

    // Fallback if the set is still uncaptured
    Object.defineProperty(element, 'files', {
      value: dataTransfer.files,
      configurable: true,
      writable: true,
    });

    // We dispatch via custom event directly on window with capture phase
    const changeEvent = new Event('change', { bubbles: true, cancelable: true });
    element.dispatchEvent(changeEvent);

    // Wait for the effect
    await vi.waitFor(
      () => {
        expect(parseSaveFile).toHaveBeenCalled();
        expect(putSaveSpy).toHaveBeenCalled();
      },
      { timeout: 3000 },
    );

    vi.unstubAllGlobals();
  });

  it('should push save to R2 when logged in', async () => {
    const { AUTH_LOGGED_IN_INDICATOR } = await import('../../contexts/AuthContext');
    const { r2Client } = await import('../../utils/r2/client');

    localStorage.setItem(AUTH_LOGGED_IN_INDICATOR, 'true');
    vi.mocked(r2Client.listSaves).mockResolvedValue([{ id: 'existing-save' }]);
    vi.mocked(r2Client.putSave).mockResolvedValue();

    const putSaveSpy = vi.spyOn(saveDB, 'putSave').mockResolvedValue(undefined);

    await render(
      <QueryClientProvider client={queryClient}>
        <RouterProvider router={router} />
      </QueryClientProvider>,
    );

    const file = new File(['mock save content'], 'save.sav', {
      type: 'application/octet-stream',
      lastModified: Date.now(),
    });

    await expect.element(page.getByText('[ UPLOAD.SYS ]')).toBeInTheDocument();

    // biome-ignore lint/suspicious/noExplicitAny: Required for mock overriding context
    const readAsArrayBufferMock = vi.fn<(_f: File) => void>(function (this: any, _f: File) {
      const buffer = new ArrayBuffer(10);
      if (this.onload) {
        // biome-ignore lint/suspicious/noExplicitAny: internal mock state
        this.onload({ target: { result: buffer } } as any);
      }
    });
    vi.stubGlobal(
      'FileReader',
      class {
        readAsArrayBuffer = readAsArrayBufferMock;
      },
    );

    const element = document.querySelector('input[type="file"]') as HTMLInputElement;
    const dataTransfer = new DataTransfer();
    dataTransfer.items.add(file);

    Object.getOwnPropertyDescriptor(window.HTMLInputElement.prototype, 'files')?.set?.call(element, dataTransfer.files);
    Object.defineProperty(element, 'files', {
      value: dataTransfer.files,
      configurable: true,
      writable: true,
    });

    const changeEvent = new Event('change', { bubbles: true, cancelable: true });
    element.dispatchEvent(changeEvent);

    await vi.waitFor(
      () => {
        expect(parseSaveFile).toHaveBeenCalled();
        expect(putSaveSpy).toHaveBeenCalled();
        expect(r2Client.listSaves).toHaveBeenCalled();
        expect(r2Client.putSave).toHaveBeenCalledWith('existing-save', expect.any(Uint8Array), file.lastModified);
      },
      { timeout: 3000 },
    );

    vi.unstubAllGlobals();
    localStorage.clear();
  });

  it('should fallback to save-1 if no R2 saves exist on upload', async () => {
    const { AUTH_LOGGED_IN_INDICATOR } = await import('../../contexts/AuthContext');
    const { r2Client } = await import('../../utils/r2/client');

    localStorage.setItem(AUTH_LOGGED_IN_INDICATOR, 'true');
    vi.mocked(r2Client.listSaves).mockResolvedValue([]);
    vi.mocked(r2Client.putSave).mockResolvedValue();

    await render(
      <QueryClientProvider client={queryClient}>
        <RouterProvider router={router} />
      </QueryClientProvider>,
    );

    const file = new File(['mock save content'], 'save.sav', { type: 'application/octet-stream' });
    await expect.element(page.getByText('[ UPLOAD.SYS ]')).toBeInTheDocument();

    // biome-ignore lint/suspicious/noExplicitAny: Required for mock overriding context
    const readAsArrayBufferMock = vi.fn<(_f: File) => void>(function (this: any, _f: File) {
      const buffer = new ArrayBuffer(10);
      if (this.onload) {
        // biome-ignore lint/suspicious/noExplicitAny: internal mock state
        this.onload({ target: { result: buffer } } as any);
      }
    });
    vi.stubGlobal(
      'FileReader',
      class {
        readAsArrayBuffer = readAsArrayBufferMock;
      },
    );

    const element = document.querySelector('input[type="file"]') as HTMLInputElement;
    const dataTransfer = new DataTransfer();
    dataTransfer.items.add(file);

    Object.getOwnPropertyDescriptor(window.HTMLInputElement.prototype, 'files')?.set?.call(element, dataTransfer.files);
    Object.defineProperty(element, 'files', { value: dataTransfer.files, configurable: true, writable: true });

    const changeEvent = new Event('change', { bubbles: true, cancelable: true });
    element.dispatchEvent(changeEvent);

    await vi.waitFor(
      () => {
        expect(r2Client.putSave).toHaveBeenCalledWith('save-1', expect.any(Uint8Array), file.lastModified);
      },
      { timeout: 3000 },
    );

    vi.unstubAllGlobals();
    localStorage.clear();
  });

  it('should gracefully handle R2 failure on upload', async () => {
    const { AUTH_LOGGED_IN_INDICATOR } = await import('../../contexts/AuthContext');
    const { r2Client } = await import('../../utils/r2/client');

    localStorage.setItem(AUTH_LOGGED_IN_INDICATOR, 'true');
    vi.mocked(r2Client.listSaves).mockRejectedValue(new Error('Network error'));

    const consoleWarnSpy = vi.spyOn(console, 'warn').mockImplementation(() => {});

    await render(
      <QueryClientProvider client={queryClient}>
        <RouterProvider router={router} />
      </QueryClientProvider>,
    );

    const file = new File(['mock save content'], 'save.sav', { type: 'application/octet-stream' });
    await expect.element(page.getByText('[ UPLOAD.SYS ]')).toBeInTheDocument();

    // biome-ignore lint/suspicious/noExplicitAny: Required for mock overriding context
    const readAsArrayBufferMock = vi.fn<(_f: File) => void>(function (this: any, _f: File) {
      const buffer = new ArrayBuffer(10);
      if (this.onload) {
        // biome-ignore lint/suspicious/noExplicitAny: internal mock state
        this.onload({ target: { result: buffer } } as any);
      }
    });
    vi.stubGlobal(
      'FileReader',
      class {
        readAsArrayBuffer = readAsArrayBufferMock;
      },
    );

    const element = document.querySelector('input[type="file"]') as HTMLInputElement;
    const dataTransfer = new DataTransfer();
    dataTransfer.items.add(file);

    Object.getOwnPropertyDescriptor(window.HTMLInputElement.prototype, 'files')?.set?.call(element, dataTransfer.files);
    Object.defineProperty(element, 'files', { value: dataTransfer.files, configurable: true, writable: true });

    const changeEvent = new Event('change', { bubbles: true, cancelable: true });
    element.dispatchEvent(changeEvent);

    await vi.waitFor(
      () => {
        expect(consoleWarnSpy).toHaveBeenCalledWith('System: list saves from cloud failed');
      },
      { timeout: 3000 },
    );

    vi.unstubAllGlobals();
    localStorage.clear();
    consoleWarnSpy.mockRestore();
  });
});
