import { describe, expect, it, vi } from 'vitest';
import { page } from 'vitest/browser';
import { render } from 'vitest-browser-react';
import { type LotteryContextState, useLottery } from '../../../../contexts/LotteryContext';
import type { PokemonInstance } from '../../../../engine/saveParser/parsers/common';
import { Gen3LotteryDashboard } from '../Gen3LotteryDashboard';

vi.mock('../../../../contexts/LotteryContext', () => ({
  useLottery: vi.fn<() => LotteryContextState | undefined>(),
}));

describe('Gen3LotteryDashboard', () => {
  it('should render null if no winning number is available', async () => {
    vi.mocked(useLottery).mockReturnValue({
      dailyWinningNumber: null,
      tier: 0,
      winningPokemon: null,
    });

    const { container } = await render(<Gen3LotteryDashboard />);
    expect(container.innerHTML).toBe('');
  });

  it('should render winning number and tier', async () => {
    vi.mocked(useLottery).mockReturnValue({
      dailyWinningNumber: 12345,
      tier: 3,
      winningPokemon: { nickname: 'BULBA', speciesId: 1, isEgg: false } as unknown as PokemonInstance,
    });

    await render(<Gen3LotteryDashboard />);

    await expect.element(page.getByText('LOTTERY STATUS')).toBeInTheDocument();
    await expect.element(page.getByText('12345')).toBeInTheDocument();
    await expect.element(page.getByText('3', { exact: true })).toBeInTheDocument();
    await expect.element(page.getByText('BULBA')).toBeInTheDocument();
  });

  it('should render NONE for tier when no matches', async () => {
    vi.mocked(useLottery).mockReturnValue({
      dailyWinningNumber: 12345,
      tier: 0,
      winningPokemon: null,
    });

    await render(<Gen3LotteryDashboard />);
    await expect.element(page.getByText('NONE')).toBeInTheDocument();
  });
});
