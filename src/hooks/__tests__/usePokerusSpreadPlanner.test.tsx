import { useEffect, useRef } from 'react';
import { describe, expect, it } from 'vitest';
import { render } from 'vitest-browser-react';
import type { PokemonInstance } from '../../engine/saveParser/parsers/common';
import { usePokerusSpreadPlanner } from '../usePokerusSpreadPlanner';

describe('usePokerusSpreadPlanner', () => {
  const createContagiousPokemon = (): PokemonInstance => ({
    speciesId: 1,
    level: 5,
    isShiny: false,
    moves: [],
    storageLocation: 'party-0',
    hash: '1',
    pokerus: { strain: 1, daysRemaining: 2 },
  });

  const createUninfectedPokemon = (): PokemonInstance => ({
    speciesId: 2,
    level: 5,
    isShiny: false,
    moves: [],
    storageLocation: 'party-1',
    hash: '2',
    pokerus: undefined,
  });

  const createCuredPokemon = (): PokemonInstance => ({
    speciesId: 3,
    level: 5,
    isShiny: false,
    moves: [],
    storageLocation: 'party-2',
    hash: '3',
    pokerus: { strain: 1, daysRemaining: 0 },
  });

  it('should calculate atRiskIndices correctly and swap slots', async () => {
    let doSwap = false;

    const TestComponent = () => {
      // Must use useMemo or outside reference so hook doesn't see a new array reference every render
      // otherwise useState callback re-initializes or we cause loops if not careful?
      // Actually useState only uses initializer once, so array literal is fine for initial state,
      // but triggering a swap in the render body causes an infinite loop because swap triggers re-render,
      // which triggers swap again, etc.
      const { atRiskIndices, party, swapSlots } = usePokerusSpreadPlanner([
        createUninfectedPokemon(), // 0
        createContagiousPokemon(), // 1
        createCuredPokemon(), // 2
        createUninfectedPokemon(), // 3
      ]);

      const swapTriggered = useRef(false);

      useEffect(() => {
        if (doSwap && !swapTriggered.current) {
          swapTriggered.current = true;
          swapSlots(1, 3);
        }
      }, [swapSlots]);

      return (
        <div>
          <div data-testid="at-risk">{atRiskIndices.join(',')}</div>
          <div data-testid="party-hashes">{party.map((p) => p?.hash || 'null').join(',')}</div>
          <div data-testid="party-lengths">{party.length}</div>
        </div>
      );
    };

    const { getByTestId, rerender } = await render(<TestComponent />);

    await expect.element(getByTestId('at-risk')).toHaveTextContent('0');

    await expect.element(getByTestId('party-lengths')).toHaveTextContent('6');
    await expect.element(getByTestId('party-hashes')).toHaveTextContent('2,1,3,2,null,null');

    // Trigger swap
    doSwap = true;
    await rerender(<TestComponent />);

    await expect.element(getByTestId('at-risk')).toHaveTextContent('');

    // Check new hashes (slots 1 and 3 swapped)
    await expect.element(getByTestId('party-hashes')).toHaveTextContent('2,2,3,1,null,null');
  });

  it('should ignore invalid swaps', async () => {
    let doSwap = false;

    const TestComponent = () => {
      const { party, swapSlots } = usePokerusSpreadPlanner([createUninfectedPokemon()]);
      const swapTriggered = useRef(false);

      useEffect(() => {
        if (doSwap && !swapTriggered.current) {
          swapTriggered.current = true;
          swapSlots(0, 0); // invalid
          swapSlots(-1, 0); // invalid
          swapSlots(0, 6); // invalid
        }
      }, [swapSlots]);

      return <div data-testid="party-hashes">{party.map((p) => p?.hash || 'null').join(',')}</div>;
    };

    const { getByTestId, rerender } = await render(<TestComponent />);

    await expect.element(getByTestId('party-hashes')).toHaveTextContent('2,null,null,null,null,null');

    doSwap = true;
    await rerender(<TestComponent />);

    await expect.element(getByTestId('party-hashes')).toHaveTextContent('2,null,null,null,null,null');
  });
});
