import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { createMemoryHistory, createRootRoute, createRouter, RouterProvider } from '@tanstack/react-router';
import { afterEach, beforeEach, describe, expect, it, type Mock, vi } from 'vitest';
import { page } from 'vitest/browser';
import { render } from 'vitest-browser-react';
import { saveDB } from '../../db/SaveDB';
import { parseSaveFile } from '../../engine/saveParser/index';
import { useStore } from '../../store';
import { reloadPage } from '../../utils/window';
import { AppLayout } from '../AppLayout';

vi.mock('../../utils/window', () => ({
  reloadPage: vi.fn<() => void>(),
}));

vi.mock('../../engine/saveParser/index', () => ({
  parseSaveFile: vi.fn<typeof parseSaveFile>(),
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
      expect(reloadPage).toHaveBeenCalledTimes(1);
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
    expect(reloadPage).not.toHaveBeenCalled();
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

    const button = page.getByText('[ INITIALIZE.SYS ]');
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

    const file = new File(['mock save content'], 'save.sav', { type: 'application/octet-stream' });

    await expect.element(page.getByText('[ INITIALIZE.SYS ]')).toBeInTheDocument();

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
});
