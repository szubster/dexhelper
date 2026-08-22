import { beforeEach, expect, test, vi } from 'vitest';
import { page } from 'vitest/browser';
import { render } from 'vitest-browser-react';
import type { ConcurrentGameContextType, Playthrough } from '../../../../contexts/ConcurrentGameContext';
import { useConcurrentGame } from '../../../../contexts/ConcurrentGameContext';
import { initHistoryDb } from '../../../../engine/storage/historyDb';
import { ProgressionTimeline } from '../ProgressionTimeline';

vi.mock('../../../../contexts/ConcurrentGameContext', () => ({
  useConcurrentGame: vi.fn<() => ConcurrentGameContextType>(),
}));

vi.mock('../../../../engine/storage/historyDb', () => ({
  initHistoryDb: vi.fn<() => Promise<unknown>>(),
}));

beforeEach(() => {
  vi.clearAllMocks();
});

test('renders empty state when no active playthrough', async () => {
  vi.mocked(useConcurrentGame).mockReturnValue({
    state: { playthroughs: [], activePlaythroughId: null },
    addPlaythrough: vi.fn<(playthrough: Omit<Playthrough, 'id' | 'lastPlayed'>) => void>(),
    removePlaythrough: vi.fn<(id: string) => void>(),
    setActivePlaythrough: vi.fn<(id: string | null) => void>(),
  });

  await render(<ProgressionTimeline />);
  await expect.element(page.getByText(/NO ACTIVE PLAYTHROUGH FOUND/i)).toBeInTheDocument();
});

test('renders timeline for active playthrough and fetches history', async () => {
  vi.mocked(useConcurrentGame).mockReturnValue({
    state: {
      playthroughs: [{ id: '1', name: 'Ash', gameVersion: 'red', lastPlayed: 0 }],
      activePlaythroughId: '1',
    },
    addPlaythrough: vi.fn<(playthrough: Omit<Playthrough, 'id' | 'lastPlayed'>) => void>(),
    removePlaythrough: vi.fn<(id: string) => void>(),
    setActivePlaythrough: vi.fn<(id: string | null) => void>(),
  });

  // Mock IDB implementation
  const mockCursor = {
    primaryKey: 'save-1',
    value: { type: 'BADGE', description: 'Earned Boulder Badge', timestamp: 12345 },
    continue: vi.fn<() => Promise<null>>().mockResolvedValue(null), // Only one item for simplicity
  };

  const mockIndex = {
    openCursor: vi.fn<() => Promise<unknown>>().mockResolvedValue(mockCursor),
  };

  const mockStore = {
    index: vi.fn<() => unknown>().mockReturnValue(mockIndex),
  };

  const mockTx = {
    objectStore: vi.fn<() => unknown>().mockReturnValue(mockStore),
  };

  const mockDb = {
    transaction: vi.fn<() => unknown>().mockReturnValue(mockTx),
  };

  vi.mocked(initHistoryDb).mockResolvedValue(
    mockDb as unknown as ReturnType<typeof initHistoryDb> extends Promise<infer U> ? U : never,
  );

  await render(<ProgressionTimeline />);

  await expect.element(page.getByText(/PROGRESSION TIMELINE: Ash/i)).toBeInTheDocument();
  await expect.element(page.getByText(/SYS.VERSION: RED/i)).toBeInTheDocument();

  // Wait for the async IDB call to resolve and render the mock event
  await expect.element(page.getByText('BADGE', { exact: true })).toBeInTheDocument();
  await expect.element(page.getByText(/Earned Boulder Badge/i)).toBeInTheDocument();

  expect(initHistoryDb).toHaveBeenCalled();
});
