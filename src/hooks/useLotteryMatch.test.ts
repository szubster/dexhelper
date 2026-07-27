// @vitest-environment jsdom
import { renderHook } from '@testing-library/react';
import { describe, expect, it, vi } from 'vitest';
import type { SaveData } from '../engine/saveParser/parsers/common';
import { useStore } from '../store';
import { useLotteryMatch } from './useLotteryMatch';

vi.mock('../store', () => ({
  useStore: vi.fn<() => SaveData | null>(),
}));

describe('useLotteryMatch', () => {
  it('should return nulls if saveData is null', () => {
    vi.mocked(useStore).mockReturnValue(null);

    const { result } = renderHook(() => useLotteryMatch());

    expect(result.current).toEqual({
      winningNumber: null,
      bestMatch: null,
      otId: null,
      matchedDigits: 0,
      prizeTier: 0,
    });
  });

  it('should return nulls if gen3LotteryNumber is undefined', () => {
    vi.mocked(useStore).mockReturnValue({
      generation: 3,
      gen3LotteryNumber: undefined,
      partyDetails: [],
      pcDetails: [],
    } as unknown as SaveData);

    const { result } = renderHook(() => useLotteryMatch());

    expect(result.current).toEqual({
      winningNumber: null,
      bestMatch: null,
      otId: null,
      matchedDigits: 0,
      prizeTier: 0,
    });
  });

  it('should return the best match from party', () => {
    vi.mocked(useStore).mockReturnValue({
      generation: 3,
      gen3LotteryNumber: 12345,
      partyDetails: [
        { otId: 11111 }, // no match
        { otId: 92345 }, // tier 2 (4 matches)
      ],
      pcDetails: [],
    } as unknown as SaveData);

    const { result } = renderHook(() => useLotteryMatch());

    expect(result.current.winningNumber).toBe(12345);
    expect(result.current.bestMatch).toEqual({ otId: 92345 });
    expect(result.current.otId).toBe(92345);
    expect(result.current.matchedDigits).toBe(4);
    expect(result.current.prizeTier).toBe(2);
  });

  it('should return the best match across party, pc, and daycare', () => {
    vi.mocked(useStore).mockReturnValue({
      generation: 3,
      gen3LotteryNumber: 12345,
      partyDetails: [
        { otId: 99945 }, // tier 4 (2 matches)
      ],
      pcDetails: [
        { otId: 99345 }, // tier 3 (3 matches)
      ],
      daycare: [
        { otId: 12345 }, // tier 1 (5 matches)
      ],
    } as unknown as SaveData);

    const { result } = renderHook(() => useLotteryMatch());

    expect(result.current.winningNumber).toBe(12345);
    expect(result.current.bestMatch).toEqual({ otId: 12345 });
    expect(result.current.otId).toBe(12345);
    expect(result.current.matchedDigits).toBe(5);
    expect(result.current.prizeTier).toBe(1);
  });

  it('should return 0 matches and null bestMatch if no pokemon matches', () => {
    vi.mocked(useStore).mockReturnValue({
      generation: 3,
      gen3LotteryNumber: 12345,
      partyDetails: [
        { otId: 99999 }, // no match
      ],
      pcDetails: [
        { otId: 88888 }, // no match
      ],
    } as unknown as SaveData);

    const { result } = renderHook(() => useLotteryMatch());

    expect(result.current.winningNumber).toBe(12345);
    expect(result.current.bestMatch).toBeNull();
    expect(result.current.otId).toBeNull();
    expect(result.current.matchedDigits).toBe(0);
    expect(result.current.prizeTier).toBe(0);
  });
});
