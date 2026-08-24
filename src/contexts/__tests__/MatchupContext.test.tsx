import { useEffect } from 'react';
import { afterEach, describe, expect, test, vi } from 'vitest';
import { render } from 'vitest-browser-react';
import type { Gen1SaveData, PokemonInstance } from '../../engine/saveParser/parsers/common';
import { useStore } from '../../store';
import { MatchupProvider, useMatchup } from '../MatchupContext';

describe('MatchupContext', () => {
  afterEach(() => {
    vi.restoreAllMocks();
    useStore.setState({ saveData: null });
  });

  test('useMatchup throws error when used outside provider', async () => {
    const TestComponent = () => {
      let error: Error | null = null;
      try {
        // biome-ignore lint/correctness/useHookAtTopLevel: Intentional for testing error throwing
        useMatchup();
      } catch (e) {
        error = e as Error;
      }
      return <div>{error?.message}</div>;
    };

    const screen = render(<TestComponent />);
    await expect.element((await screen).getByText('useMatchup must be used within a MatchupProvider')).toBeVisible();
  });

  test('provides default values', async () => {
    let partyDetails: PokemonInstance[] = [];
    let upcomingBoss: string | null = 'dummy';

    const TestComponent = () => {
      const context = useMatchup();

      useEffect(() => {
        partyDetails = context.partyDetails;
        upcomingBoss = context.upcomingBoss;
      }, [context]);

      return <div>Test</div>;
    };

    const screen = render(
      <MatchupProvider>
        <TestComponent />
      </MatchupProvider>,
    );

    await expect.element((await screen).getByText('Test')).toBeVisible();

    // Initial state
    expect(partyDetails).toEqual([]);
    expect(upcomingBoss).toBeNull();
  });

  test('allows updating state', async () => {
    let currentPartyDetails: PokemonInstance[] = [];
    let currentUpcomingBoss: string | null = null;

    const TestComponent = () => {
      const context = useMatchup();

      useEffect(() => {
        currentPartyDetails = context.partyDetails;
        currentUpcomingBoss = context.upcomingBoss;
      }, [context]);

      return (
        <div>
          <button type="button" onClick={() => context.setUpcomingBoss('Roxanne')}>
            Set Boss
          </button>
          <button
            type="button"
            onClick={() => context.setPartyDetails([{ speciesId: 25 } as unknown as PokemonInstance])}
          >
            Set Party
          </button>
        </div>
      );
    };

    const screen = render(
      <MatchupProvider>
        <TestComponent />
      </MatchupProvider>,
    );

    // Initial state
    expect(currentUpcomingBoss).toBeNull();
    expect(currentPartyDetails).toEqual([]);

    await (await screen).getByText('Set Boss').click();
    expect(currentUpcomingBoss).toBe('Roxanne');

    await (await screen).getByText('Set Party').click();
    expect(currentPartyDetails).toEqual([{ speciesId: 25 }]);
  });

  test('updates party details from Gen 1 save data', async () => {
    const mockPartyDetails: PokemonInstance[] = [{ speciesId: 1 }] as unknown as PokemonInstance[];

    let currentPartyDetails: PokemonInstance[] = [];

    const TestComponent = () => {
      const context = useMatchup();

      useEffect(() => {
        currentPartyDetails = context.partyDetails;
      }, [context]);

      return <div>Test</div>;
    };

    const screen = render(
      <MatchupProvider>
        <TestComponent />
      </MatchupProvider>,
    );

    await expect.element((await screen).getByText('Test')).toBeVisible();

    // Verify initial state
    expect(currentPartyDetails).toEqual([]);

    // Simulate store update with Gen 1 save data
    useStore.setState({
      saveData: {
        generation: 1,
        partyDetails: mockPartyDetails,
      } as unknown as Gen1SaveData,
    });

    // Wait for the context to update
    await vi.waitFor(() => {
      expect(currentPartyDetails).toEqual(mockPartyDetails);
    });

    // Simulate store update with Gen 2 save data (should not update party details)
    const mockPartyDetailsGen2: PokemonInstance[] = [{ speciesId: 2 }] as unknown as PokemonInstance[];
    useStore.setState({
      saveData: {
        generation: 2,
        partyDetails: mockPartyDetailsGen2,
      } as unknown as Gen1SaveData, // Use any or assertion since it's just a mock
    });

    // The state should remain the same as the previous valid update
    await vi.waitFor(() => {
      expect(currentPartyDetails).toEqual(mockPartyDetails);
    });
  });
});
