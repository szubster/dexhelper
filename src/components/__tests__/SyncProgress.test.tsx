import { beforeEach, describe, expect, it, vi } from 'vitest';
import { page } from 'vitest/browser';
import { render } from 'vitest-browser-react';
import { pokeDB } from '../../db/PokeDB';
import { SyncProgress } from '../SyncProgress';

// Mock the dependencies
vi.mock('../../db/PokeDB', () => ({
  pokeDB: {
    // biome-ignore lint/suspicious/noExplicitAny: mock
    getStatus: vi.fn<any>(),
  },
}));

const sleep = (ms: number) => new Promise((resolve) => setTimeout(resolve, ms));

describe('SyncProgress', () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  it('renders nothing if not syncing and not complete', async () => {
    vi.mocked(pokeDB.getStatus).mockResolvedValueOnce({
      isComplete: false,
      isSyncing: false,
    });

    await render(<SyncProgress />);
    await sleep(100);

    await expect.element(page.getByTestId('sync-progress-overlay')).not.toBeInTheDocument();
  });

  it('renders the syncing state when syncing is true', async () => {
    vi.mocked(pokeDB.getStatus).mockResolvedValueOnce({
      isComplete: false,
      isSyncing: true,
    });

    await render(<SyncProgress />);
    await sleep(100);

    await expect.element(page.getByTestId('sync-progress-overlay')).toBeInTheDocument();
    await expect.element(page.getByText('[ INITIALIZING_UPLINK ]')).toBeInTheDocument();
  });

  it('handles the pokedata-sync-progress event', async () => {
    vi.mocked(pokeDB.getStatus).mockResolvedValueOnce({
      isComplete: false,
      isSyncing: true,
    });

    await render(<SyncProgress />);
    await sleep(100);

    await expect.element(page.getByText('[ INITIALIZING_UPLINK ]')).toBeInTheDocument();

    const event = new CustomEvent('pokedata-sync-progress', {
      detail: { current: 50, total: 100, stage: 'Downloading Data' },
    });
    window.dispatchEvent(event);

    await sleep(100);

    await expect.element(page.getByText('PROCESSING: Downloading Data')).toBeInTheDocument();
    await expect.element(page.getByText('50%')).toBeInTheDocument();
  });

  it('transitions to complete state when progress reaches 100%', async () => {
    vi.mocked(pokeDB.getStatus).mockResolvedValueOnce({
      isComplete: false,
      isSyncing: true,
    });

    await render(<SyncProgress />);
    await sleep(100);

    const event = new CustomEvent('pokedata-sync-progress', {
      detail: { current: 100, total: 100, stage: 'Complete' },
    });
    window.dispatchEvent(event);

    await sleep(100);

    await expect.element(page.getByText('[ DATABASE_PRIMED ]')).toBeInTheDocument();
    await expect.element(page.getByText('HANDSHAKE VERIFIED')).toBeInTheDocument();
    await expect.element(page.getByText('100%')).toBeInTheDocument();
  });

  it('ignores invalid event details gracefully', async () => {
    vi.mocked(pokeDB.getStatus).mockResolvedValueOnce({
      isComplete: false,
      isSyncing: true,
    });

    await render(<SyncProgress />);
    await sleep(100);

    // Missing 'stage' property
    const event = new CustomEvent('pokedata-sync-progress', {
      detail: { current: 50, total: 100 },
    });
    window.dispatchEvent(event);

    await sleep(100);

    // Should still be in the initial state since the event was ignored
    await expect.element(page.getByText('PROCESSING: WAITING')).toBeInTheDocument();
  });
});
