import { act, renderHook } from '@testing-library/react';
import type { ReactNode } from 'react';
import { describe, expect, it } from 'vitest';
import type { GameVersion } from '../../store';
import { ConcurrentGameProvider, useConcurrentGame } from '../ConcurrentGameContext';

describe('ConcurrentGameContext', () => {
  const wrapper = ({ children }: { children: ReactNode }) => (
    <ConcurrentGameProvider>{children}</ConcurrentGameProvider>
  );

  it('throws an error if used outside a provider', () => {
    const originalError = console.error;
    console.error = () => {};

    expect(() => {
      renderHook(() => useConcurrentGame());
    }).toThrow('useConcurrentGame must be used within a ConcurrentGameProvider');

    console.error = originalError;
  });

  it('provides initial state', () => {
    const { result } = renderHook(() => useConcurrentGame(), { wrapper });
    expect(result.current.state.playthroughs).toEqual([]);
    expect(result.current.state.activePlaythroughId).toBeNull();
  });

  it('adds a playthrough', () => {
    const { result } = renderHook(() => useConcurrentGame(), { wrapper });

    act(() => {
      result.current.addPlaythrough({ name: 'Emerald Run', gameVersion: 'emerald' as GameVersion });
    });

    expect(result.current.state.playthroughs).toHaveLength(1);
    expect(result.current.state.playthroughs[0]?.name).toBe('Emerald Run');
    expect(result.current.state.playthroughs[0]?.gameVersion).toBe('emerald');
    expect(result.current.state.playthroughs[0]?.id).toBeDefined();
    expect(result.current.state.activePlaythroughId).toBe(result.current.state.playthroughs[0]?.id);
  });

  it('removes a playthrough', () => {
    const { result } = renderHook(() => useConcurrentGame(), { wrapper });

    act(() => {
      result.current.addPlaythrough({ name: 'Emerald Run', gameVersion: 'emerald' as GameVersion });
    });

    const id = result.current.state.playthroughs[0]?.id as string;

    act(() => {
      result.current.removePlaythrough(id);
    });

    expect(result.current.state.playthroughs).toHaveLength(0);
    expect(result.current.state.activePlaythroughId).toBeNull();
  });

  it('sets active playthrough', () => {
    const { result } = renderHook(() => useConcurrentGame(), { wrapper });

    act(() => {
      result.current.addPlaythrough({ name: 'Run 1', gameVersion: 'red' as GameVersion });
      result.current.addPlaythrough({ name: 'Run 2', gameVersion: 'blue' as GameVersion });
    });

    const id1 = result.current.state.playthroughs[0]?.id as string;

    act(() => {
      result.current.setActivePlaythrough(id1);
    });

    expect(result.current.state.activePlaythroughId).toBe(id1);
  });
});
