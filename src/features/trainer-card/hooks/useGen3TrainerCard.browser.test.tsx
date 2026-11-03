import { useEffect } from 'react';
import { beforeEach, describe, expect, it, vi } from 'vitest';
import { render } from 'vitest-browser-react';
import { useStore } from '../../../store';
import type { Gen3TrainerCardState } from '../types';
import { useGen3TrainerCard } from './useGen3TrainerCard';

vi.mock('../../../store', () => ({
  useStore: vi.fn<() => void>(),
}));

function TestComponent({ onRender }: { onRender: (data: Gen3TrainerCardState | null) => void }) {
  const data = useGen3TrainerCard();

  useEffect(() => {
    onRender(data);
  }, [data, onRender]);

  return null;
}

describe('useGen3TrainerCard', () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  it('should return null when saveData is missing or undefined', async () => {
    vi.mocked(useStore).mockImplementation((selector: unknown) => {
      const s = selector as (state: unknown) => unknown;
      return s({ saveData: null });
    });

    let renderResult: Gen3TrainerCardState | null = null;
    const handleRender = vi.fn<(data: Gen3TrainerCardState | null) => void>((data) => {
      renderResult = data;
    });

    await render(<TestComponent onRender={handleRender} />);

    await vi.waitFor(() => {
      expect(handleRender).toHaveBeenCalled();
    });

    expect(renderResult).toBeNull();
  });

  it('should return null when generation is not 3', async () => {
    vi.mocked(useStore).mockImplementation((selector: unknown) => {
      const s = selector as (state: unknown) => unknown;
      return s({ saveData: { generation: 2 } });
    });

    let renderResult: Gen3TrainerCardState | null = null;
    const handleRender = vi.fn<(data: Gen3TrainerCardState | null) => void>((data) => {
      renderResult = data;
    });

    await render(<TestComponent onRender={handleRender} />);

    await vi.waitFor(() => {
      expect(handleRender).toHaveBeenCalled();
    });

    expect(renderResult).toBeNull();
  });

  it('should return null when gen3TrainerCard is not present in saveData (but gen is 3)', async () => {
    vi.mocked(useStore).mockImplementation((selector: unknown) => {
      const s = selector as (state: unknown) => unknown;
      return s({ saveData: { generation: 3 } });
    });

    let renderResult: Gen3TrainerCardState | null = null;
    const handleRender = vi.fn<(data: Gen3TrainerCardState | null) => void>((data) => {
      renderResult = data;
    });

    await render(<TestComponent onRender={handleRender} />);

    await vi.waitFor(() => {
      expect(handleRender).toHaveBeenCalled();
    });

    expect(renderResult).toBeNull();
  });

  it('should return gen3TrainerCard when present in saveData and generation is 3', async () => {
    const mockTrainerCard = {
      hasHallOfFame: true,
      hasHoennDex: true,
      hasNationalDex: false,
      hasBattleFrontier: true,
      hasContestMaster: false,
    };

    vi.mocked(useStore).mockImplementation((selector: unknown) => {
      const s = selector as (state: unknown) => unknown;
      return s({
        saveData: {
          generation: 3,
          gen3TrainerCard: mockTrainerCard,
        },
      });
    });

    let renderResult: Gen3TrainerCardState | null = null;
    const handleRender = vi.fn<(data: Gen3TrainerCardState | null) => void>((data) => {
      renderResult = data;
    });

    await render(<TestComponent onRender={handleRender} />);

    await vi.waitFor(() => {
      expect(handleRender).toHaveBeenCalled();
    });

    expect(renderResult).toEqual(mockTrainerCard);
  });
});
