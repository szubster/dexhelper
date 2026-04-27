import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { createMemoryHistory, createRootRoute, createRouter, RouterProvider } from '@tanstack/react-router';
import { page } from '@vitest/browser/context';
import { afterEach, beforeEach, describe, expect, it, vi } from 'vitest';
import { render } from 'vitest-browser-react';
import { saveDB } from '../../db/SaveDB';
import { useStore } from '../../store';
import { reloadPage } from '../../utils/window';
import { AppLayout } from '../AppLayout';
import { parseSaveFile } from '../../engine/saveParser/index';

vi.mock('../../utils/window', () => ({
  reloadPage: vi.fn<() => void>(),
}));

vi.mock('../../engine/saveParser/index', () => ({
  parseSaveFile: vi.fn(() => ({
    gameVersion: 'unknown',
    generation: 1,
    trainerName: 'TEST',
    trainerId: 12345,
    party: [],
    pc: [],
  })),
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
    render(
      <QueryClientProvider client={queryClient}>
        <RouterProvider router={router} />
      </QueryClientProvider>,
    );

    await expect.element(page.getByText('Test Child')).toBeInTheDocument();

    const errorEvent = new window.ErrorEvent('error', {
      message: 'Failed to fetch dynamically imported module',
    });
    window.dispatchEvent(errorEvent);

    await vi.waitFor(() => {
      expect(reloadPage).toHaveBeenCalledTimes(1);
    });
  });

  it('should not reload the page for other errors', async () => {
    render(
      <QueryClientProvider client={queryClient}>
        <RouterProvider router={router} />
      </QueryClientProvider>,
    );

    await expect.element(page.getByText('Test Child')).toBeInTheDocument();

    const errorEvent = new window.ErrorEvent('error', {
      message: 'Some other random error',
    });
    window.dispatchEvent(errorEvent);

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
  });

  afterEach(() => {
    vi.restoreAllMocks();
  });

  it('should call saveDB.putSave when a file is uploaded', async () => {
    const putSaveSpy = vi.spyOn(saveDB, 'putSave').mockResolvedValue(undefined);
    render(
      <QueryClientProvider client={queryClient}>
        <RouterProvider router={router} />
      </QueryClientProvider>,
    );

    const file = new File(['mock save content'], 'save.sav', { type: 'application/octet-stream' });

    await expect.element(page.getByText('Initialize Pokedex')).toBeInTheDocument();

    const element = document.querySelector('input[type="file"]') as HTMLInputElement;
    const dataTransfer = new DataTransfer();
    dataTransfer.items.add(file);

    // Call the original set property logic instead of just overriding `.files`
    const originalSet = Object.getOwnPropertyDescriptor(window.HTMLInputElement.prototype, 'files')?.set;
    originalSet?.call(element, dataTransfer.files);

    // Fallback if the set is still uncaptured
    Object.defineProperty(element, 'files', {
      value: dataTransfer.files,
      configurable: true,
      writable: true,
    });

    // We dispatch via custom event directly on window with capture phase
    const changeEvent = new Event('change', { bubbles: true, cancelable: true });
    element.dispatchEvent(changeEvent);

    // Since mock FileReader does not trigger onload immediately in the browser execution,
    // instead of a full DOM click flow that is flaky, let's trigger handleFileUpload more directly if possible,
    // but the test runs in Playwright where the browser does support real FileReader.

    // Wait for the effect
    await vi.waitFor(() => {
      expect(parseSaveFile).toHaveBeenCalled();
      expect(putSaveSpy).toHaveBeenCalled();
    }, { timeout: 3000 });
  });
});
