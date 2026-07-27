// @vitest-environment jsdom
import { renderHook } from '@testing-library/react';
import { describe, expect, it, vi } from 'vitest';
import { calculateLotteryTier } from '../engine/gen3/lottery/lottery';
import type { PokemonInstance, SaveData } from '../engine/saveParser/parsers/common';
import type { AppStore } from '../store';
import { useStore } from '../store';
import { useLottery } from './useLottery';

// Mock the store
vi.mock('../store', () => ({
  useStore: vi.fn<() => unknown>(),
}));

describe('useLottery', () => {
  it('returns null if no save data', () => {
    vi.mocked(useStore).mockImplementation((selector) => selector({ saveData: null } as unknown as AppStore));
    const { result } = renderHook(() => useLottery());
    expect(result.current).toBeNull();
  });

  it('returns null if not gen 3', () => {
    vi.mocked(useStore).mockImplementation((selector) =>
      selector({ saveData: { generation: 1 } as unknown as SaveData } as unknown as AppStore),
    );
    const { result } = renderHook(() => useLottery());
    expect(result.current).toBeNull();
  });

  it('returns null if no lottery number', () => {
    vi.mocked(useStore).mockImplementation((selector) =>
      selector({
        saveData: { generation: 3, gen3LotteryNumber: undefined } as unknown as SaveData,
      } as unknown as AppStore),
    );
    const { result } = renderHook(() => useLottery());
    expect(result.current).toBeNull();
  });

  it('calculates the best match', () => {
    const winningNumber = 12345;
    const mockPokemon1 = { otId: 54321, nickname: 'Pika' } as unknown as PokemonInstance;
    const mockPokemon2 = { otId: 92345, nickname: 'Bulba' } as unknown as PokemonInstance; // 4 matches! (2345)

    vi.mocked(useStore).mockImplementation((selector) =>
      selector({
        saveData: {
          generation: 3,
          gen3LotteryNumber: winningNumber,
          partyDetails: [mockPokemon1],
          pcDetails: [mockPokemon2],
        } as unknown as SaveData,
      } as unknown as AppStore),
    );

    const { result } = renderHook(() => useLottery());

    expect(result.current).toEqual({
      winningNumber: 12345,
      tier: calculateLotteryTier(92345, 12345),
      winningPokemon: mockPokemon2,
      matchedDigits: 4,
    });
  });
});
