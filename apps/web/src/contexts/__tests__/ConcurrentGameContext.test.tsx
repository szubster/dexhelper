import { useEffect } from 'react';
import { describe, expect, it } from 'vitest';
import { render } from 'vitest-browser-react';
import type { GameVersion } from '../../store';
import { ConcurrentGameProvider, useConcurrentGame } from '../ConcurrentGameContext';

describe('ConcurrentGameContext', () => {
  const TestComponent = ({
    action,
    onResult,
  }: {
    action?: (context: ReturnType<typeof useConcurrentGame>) => void;
    onResult?: (state: ReturnType<typeof useConcurrentGame>['state']) => void;
  }) => {
    const context = useConcurrentGame();

    useEffect(() => {
      if (action) {
        action(context);
      }
    });

    useEffect(() => {
      if (onResult) {
        onResult(context.state);
      }
    });

    return null;
  };

  it('throws an error if used outside a provider', async () => {
    const originalError = console.error;
    console.error = () => {};

    await expect(async () => {
      await render(<TestComponent />);
    }).rejects.toThrow('useConcurrentGame must be used within a ConcurrentGameProvider');

    console.error = originalError;
  });

  it('provides initial state', async () => {
    let finalState = {} as ReturnType<typeof useConcurrentGame>['state'];
    await render(
      <ConcurrentGameProvider>
        <TestComponent
          onResult={(state) => {
            finalState = state;
          }}
        />
      </ConcurrentGameProvider>,
    );
    expect(finalState.playthroughs).toEqual([]);
    expect(finalState.activePlaythroughId).toBeNull();
  });

  it('adds a playthrough', async () => {
    let finalState = {} as ReturnType<typeof useConcurrentGame>['state'];
    let added = false;

    await render(
      <ConcurrentGameProvider>
        <TestComponent
          action={(context) => {
            if (!added) {
              context.addPlaythrough({ name: 'Emerald Run', gameVersion: 'emerald' as GameVersion });
              added = true;
            }
          }}
          onResult={(state) => {
            finalState = state;
          }}
        />
      </ConcurrentGameProvider>,
    );

    expect(finalState.playthroughs).toHaveLength(1);
    expect(finalState.playthroughs[0]?.name).toBe('Emerald Run');
    expect(finalState.playthroughs[0]?.gameVersion).toBe('emerald');
    expect(finalState.playthroughs[0]?.id).toBeDefined();
    expect(finalState.activePlaythroughId).toBe(finalState.playthroughs[0]?.id);
  });

  it('removes a playthrough', async () => {
    let finalState = {} as ReturnType<typeof useConcurrentGame>['state'];
    let added = false;
    let removed = false;
    let idToRemove: string | null = null;

    await render(
      <ConcurrentGameProvider>
        <TestComponent
          action={(context) => {
            if (!added) {
              context.addPlaythrough({ name: 'Emerald Run', gameVersion: 'emerald' as GameVersion });
              added = true;
            } else if (added && !removed && context.state.playthroughs.length > 0) {
              idToRemove = context.state.playthroughs[0]?.id as string;
              context.removePlaythrough(idToRemove);
              removed = true;
            }
          }}
          onResult={(state) => {
            finalState = state;
          }}
        />
      </ConcurrentGameProvider>,
    );

    expect(finalState.playthroughs).toHaveLength(0);
    expect(finalState.activePlaythroughId).toBeNull();
  });

  it('sets active playthrough', async () => {
    let finalState = {} as ReturnType<typeof useConcurrentGame>['state'];
    let phase = 0;
    let id1: string | null = null;

    await render(
      <ConcurrentGameProvider>
        <TestComponent
          action={(context) => {
            if (phase === 0) {
              context.addPlaythrough({ name: 'Run 1', gameVersion: 'red' as GameVersion });
              context.addPlaythrough({ name: 'Run 2', gameVersion: 'blue' as GameVersion });
              phase = 1;
            } else if (phase === 1 && context.state.playthroughs.length === 2) {
              id1 = context.state.playthroughs[0]?.id as string;
              context.setActivePlaythrough(id1);
              phase = 2;
            }
          }}
          onResult={(state) => {
            finalState = state;
          }}
        />
      </ConcurrentGameProvider>,
    );

    expect(finalState.activePlaythroughId).toBe(id1);
  });
});
