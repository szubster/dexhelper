import { beforeEach, describe, expect, it, vi } from 'vitest';
import { page } from 'vitest/browser';
import { render } from 'vitest-browser-react';
import { useConcurrentGame } from '../../../contexts/ConcurrentGameContext';
import type { GameVersion } from '../../../store';
import { ProgressionTimeline } from '../ProgressionTimeline';

vi.mock('../../../contexts/ConcurrentGameContext', () => ({
  useConcurrentGame: vi.fn<() => import('../../../contexts/ConcurrentGameContext').ConcurrentGameContextType>(),
}));

describe('ProgressionTimeline', () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  it('renders empty state when there are no playthroughs', async () => {
    vi.mocked(useConcurrentGame).mockReturnValue({
      state: { playthroughs: [], activePlaythroughId: null },
      addPlaythrough:
        vi.fn<
          (
            playthrough: Omit<import('../../../contexts/ConcurrentGameContext').Playthrough, 'id' | 'lastPlayed'>,
          ) => void
        >(),
      removePlaythrough: vi.fn<(id: string) => void>(),
      setActivePlaythrough: vi.fn<(id: string | null) => void>(),
    });

    await render(<ProgressionTimeline />);
    await expect.element(page.getByText('NO SIGNAL - NO ACTIVE PLAYTHROUGHS')).toBeInTheDocument();
  });

  it('renders a list of playthroughs', async () => {
    vi.mocked(useConcurrentGame).mockReturnValue({
      state: {
        playthroughs: [
          { id: '1', name: 'Emerald Run', gameVersion: 'emerald' as GameVersion, lastPlayed: 1000 },
          { id: '2', name: 'Red Run', gameVersion: 'red' as GameVersion, lastPlayed: 2000 },
        ],
        activePlaythroughId: '1',
      },
      addPlaythrough:
        vi.fn<
          (
            playthrough: Omit<import('../../../contexts/ConcurrentGameContext').Playthrough, 'id' | 'lastPlayed'>,
          ) => void
        >(),
      removePlaythrough: vi.fn<(id: string) => void>(),
      setActivePlaythrough: vi.fn<(id: string | null) => void>(),
    });

    await render(<ProgressionTimeline />);
    await expect.element(page.getByText('Emerald Run')).toBeInTheDocument();
    await expect.element(page.getByText('Red Run')).toBeInTheDocument();
  });
});
