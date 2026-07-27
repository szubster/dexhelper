// @vitest-environment jsdom
import { render } from '@testing-library/react';
import { describe, expect, it, vi } from 'vitest';
import { useLottery } from '../../hooks/useLottery';
import { LotteryPanel } from './LotteryPanel';

vi.mock('../../hooks/useLottery', () => ({
  useLottery: vi.fn(),
}));

describe('LotteryPanel', () => {
  it('returns null if lottery is null', () => {
    vi.mocked(useLottery).mockReturnValue(null);
    const { container } = render(<LotteryPanel />);
    expect(container.firstChild).toBeNull();
  });

  it('renders winning number when tier is 0', () => {
    vi.mocked(useLottery).mockReturnValue({
      winningNumber: 12345,
      tier: 0,
      winningPokemon: null,
      matchedDigits: 0,
    });
    const { getByText } = render(<LotteryPanel />);
    expect(getByText('WINNING NUMBER')).toBeDefined();
    expect(getByText('12345')).toBeDefined();
    expect(getByText('NO WINNING POKEMON FOUND IN PARTY OR PC')).toBeDefined();
  });

  it('renders winning pokemon when tier > 0', () => {
    vi.mocked(useLottery).mockReturnValue({
      winningNumber: 12345,
      tier: 1,
      winningPokemon: {
        nickname: 'Pika',
        otId: 54321,
      } as unknown as import('../../engine/saveParser/parsers/common').PokemonInstance,
      matchedDigits: 5,
    });
    const { getByText } = render(<LotteryPanel />);
    expect(getByText('WINNING NUMBER')).toBeDefined();
    expect(getByText('12345')).toBeDefined();
    expect(getByText('BEST MATCH')).toBeDefined();
    expect(getByText('Pika')).toBeDefined();
    expect(getByText('OT ID')).toBeDefined();
    expect(getByText('54321')).toBeDefined();
    expect(getByText('MATCHED DIGITS')).toBeDefined();
    expect(getByText('5')).toBeDefined();
    expect(getByText('PRIZE TIER')).toBeDefined();
    expect(getByText('Tier 1')).toBeDefined();
  });
});
