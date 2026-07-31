import { render, screen } from '@testing-library/react';
import { describe, expect, it, vi } from 'vitest';
import type { ConcurrentGameContextType, Playthrough } from '../../../../contexts/ConcurrentGameContext';
import { useConcurrentGame } from '../../../../contexts/ConcurrentGameContext';
import { ProgressionTimeline } from '../ProgressionTimeline';

vi.mock('../../../../contexts/ConcurrentGameContext', () => ({
  useConcurrentGame: vi.fn<() => ConcurrentGameContextType>(),
}));

describe('ProgressionTimeline', () => {
  it('renders empty state when no active playthrough', () => {
    vi.mocked(useConcurrentGame).mockReturnValue({
      state: { playthroughs: [], activePlaythroughId: null },
      addPlaythrough: vi.fn<(playthrough: Omit<Playthrough, 'id' | 'lastPlayed'>) => void>(),
      removePlaythrough: vi.fn<(id: string) => void>(),
      setActivePlaythrough: vi.fn<(id: string | null) => void>(),
    });

    render(<ProgressionTimeline />);
    expect(screen.getByText(/NO ACTIVE PLAYTHROUGH FOUND/i)).toBeInTheDocument();
  });

  it('renders timeline for active playthrough', () => {
    vi.mocked(useConcurrentGame).mockReturnValue({
      state: {
        playthroughs: [{ id: '1', name: 'Ash', gameVersion: 'red', lastPlayed: 0 }],
        activePlaythroughId: '1',
      },
      addPlaythrough: vi.fn<(playthrough: Omit<Playthrough, 'id' | 'lastPlayed'>) => void>(),
      removePlaythrough: vi.fn<(id: string) => void>(),
      setActivePlaythrough: vi.fn<(id: string | null) => void>(),
    });

    render(<ProgressionTimeline />);
    expect(screen.getByText(/PROGRESSION TIMELINE: Ash/i)).toBeInTheDocument();
    expect(screen.getByText(/SYS.VERSION: RED/i)).toBeInTheDocument();
  });
});
