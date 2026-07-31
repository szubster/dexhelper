import { expect, test, vi } from 'vitest';
import { page } from 'vitest/browser';
import { render } from 'vitest-browser-react';
import type { ConcurrentGameContextType, Playthrough } from '../../../../contexts/ConcurrentGameContext';
import { useConcurrentGame } from '../../../../contexts/ConcurrentGameContext';
import { ProgressionTimeline } from '../ProgressionTimeline';

vi.mock('../../../../contexts/ConcurrentGameContext', () => ({
  useConcurrentGame: vi.fn<() => ConcurrentGameContextType>(),
}));

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

test('renders timeline for active playthrough', async () => {
  vi.mocked(useConcurrentGame).mockReturnValue({
    state: {
      playthroughs: [{ id: '1', name: 'Ash', gameVersion: 'red', lastPlayed: 0 }],
      activePlaythroughId: '1',
    },
    addPlaythrough: vi.fn<(playthrough: Omit<Playthrough, 'id' | 'lastPlayed'>) => void>(),
    removePlaythrough: vi.fn<(id: string) => void>(),
    setActivePlaythrough: vi.fn<(id: string | null) => void>(),
  });

  await render(<ProgressionTimeline />);
  await expect.element(page.getByText(/PROGRESSION TIMELINE: Ash/i)).toBeInTheDocument();
  await expect.element(page.getByText(/SYS.VERSION: RED/i)).toBeInTheDocument();
});
