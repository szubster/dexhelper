import { useEffect, useRef } from 'react';
import { describe, expect, it } from 'vitest';
import { render } from 'vitest-browser-react';
import type { PokemonInstance } from '../../engine/saveParser/parsers/common';
import { usePokerusSpreadPlanner } from '../usePokerusSpreadPlanner';

describe('usePokerusSpreadPlanner', () => {
  const createContagiousPokemon = (hash = '1'): PokemonInstance => ({
    speciesId: 1,
    level: 5,
    isShiny: false,
    moves: [],
    storageLocation: 'party-0',
    hash,
    pokerus: { strain: 1, daysRemaining: 2 },
  });

  const createUninfectedPokemon = (hash = '2'): PokemonInstance => ({
    speciesId: 2,
    level: 5,
    isShiny: false,
    moves: [],
    storageLocation: 'party-1',
    hash,
    pokerus: undefined,
  });

  const createCuredPokemon = (hash = '3'): PokemonInstance => ({
    speciesId: 3,
    level: 5,
    isShiny: false,
    moves: [],
    storageLocation: 'party-2',
    hash,
    pokerus: { strain: 1, daysRemaining: 0 },
  });

  it('should calculate atRiskIndices correctly and swap slots', async () => {
    const TestComponent = ({ doSwap }: { doSwap: boolean }) => {
      const { atRiskIndices, party, swapSlots } = usePokerusSpreadPlanner([
        createUninfectedPokemon('2'),
        createContagiousPokemon('1'),
        createCuredPokemon('3'),
        createUninfectedPokemon('2b'),
      ]);

      const swapTriggered = useRef(false);

      useEffect(() => {
        if (doSwap && !swapTriggered.current) {
          swapTriggered.current = true;
          swapSlots(1, 3);
        }
      }, [doSwap, swapSlots]);

      return (
        <div>
          <div data-testid="at-risk">{atRiskIndices.join(',')}</div>
          <div data-testid="party-hashes">{party.map((p) => p?.hash || 'null').join(',')}</div>
          <div data-testid="party-lengths">{party.length}</div>
        </div>
      );
    };

    const { getByTestId, rerender } = await render(<TestComponent doSwap={false} />);

    await expect.element(getByTestId('at-risk')).toHaveTextContent('0');
    await expect.element(getByTestId('party-lengths')).toHaveTextContent('6');
    await expect.element(getByTestId('party-hashes')).toHaveTextContent('2,1,3,2b,null,null');

    await rerender(<TestComponent doSwap={true} />);

    await expect.element(getByTestId('at-risk')).toHaveTextContent('');
    await expect.element(getByTestId('party-hashes')).toHaveTextContent('2,2b,3,1,null,null');
  });

  it('should ignore invalid swaps', async () => {
    const TestComponent = ({ doSwap }: { doSwap: boolean }) => {
      const { party, swapSlots } = usePokerusSpreadPlanner([createUninfectedPokemon('2')]);
      const swapTriggered = useRef(false);

      useEffect(() => {
        if (doSwap && !swapTriggered.current) {
          swapTriggered.current = true;
          swapSlots(0, 0);
          swapSlots(-1, 0);
          swapSlots(0, 6);
        }
      }, [doSwap, swapSlots]);

      return <div data-testid="party-hashes">{party.map((p) => p?.hash || 'null').join(',')}</div>;
    };

    const { getByTestId, rerender } = await render(<TestComponent doSwap={false} />);

    await expect.element(getByTestId('party-hashes')).toHaveTextContent('2,null,null,null,null,null');

    await rerender(<TestComponent doSwap={true} />);

    await expect.element(getByTestId('party-hashes')).toHaveTextContent('2,null,null,null,null,null');
  });

  it('should truncate initial party when provided with more than 6 slots', async () => {
    const TestComponent = () => {
      const { party } = usePokerusSpreadPlanner([
        createUninfectedPokemon('1'),
        createUninfectedPokemon('2'),
        createUninfectedPokemon('3'),
        createUninfectedPokemon('4'),
        createUninfectedPokemon('5'),
        createUninfectedPokemon('6'),
        createUninfectedPokemon('7'),
      ]);
      return (
        <div>
          <div data-testid="party-lengths">{party.length}</div>
          <div data-testid="party-hashes">{party.map((p) => p?.hash || 'null').join(',')}</div>
        </div>
      );
    };

    const { getByTestId } = await render(<TestComponent />);

    await expect.element(getByTestId('party-lengths')).toHaveTextContent('6');
    await expect.element(getByTestId('party-hashes')).toHaveTextContent('1,2,3,4,5,6');
  });

  it('should identify right-neighbor contagion and boundary neighbor conditions', async () => {
    const TestComponent = () => {
      const { atRiskIndices } = usePokerusSpreadPlanner([
        createUninfectedPokemon('u0'),
        createContagiousPokemon('c1'),
        createUninfectedPokemon('u2'),
        createUninfectedPokemon('u3'),
        createContagiousPokemon('c4'),
        createUninfectedPokemon('u5'),
      ]);
      return <div data-testid="at-risk">{atRiskIndices.join(',')}</div>;
    };

    const { getByTestId } = await render(<TestComponent />);

    await expect.element(getByTestId('at-risk')).toHaveTextContent('0,2,3,5');
  });

  it('should not mark cured Pokérus or missing neighbors as contagious', async () => {
    const TestComponent = () => {
      const { atRiskIndices } = usePokerusSpreadPlanner([
        createCuredPokemon('cured0'),
        createUninfectedPokemon('u1'),
        null,
        createUninfectedPokemon('u3'),
      ]);
      return <div data-testid="at-risk">{atRiskIndices.join(',')}</div>;
    };

    const { getByTestId } = await render(<TestComponent />);

    await expect.element(getByTestId('at-risk')).toHaveTextContent('');
  });

  it('should evaluate atRiskIndices when a slot is surrounded by contagious neighbors on both sides', async () => {
    const TestComponent = () => {
      const { atRiskIndices } = usePokerusSpreadPlanner([
        createContagiousPokemon('c0'),
        createUninfectedPokemon('u1'),
        createContagiousPokemon('c2'),
      ]);
      return <div data-testid="at-risk">{atRiskIndices.join(',')}</div>;
    };

    const { getByTestId } = await render(<TestComponent />);

    await expect.element(getByTestId('at-risk')).toHaveTextContent('1');
  });

  it('should update party state directly via setParty', async () => {
    const TestComponent = ({ doSetParty }: { doSetParty: boolean }) => {
      const { party, setParty } = usePokerusSpreadPlanner([]);
      const setPartyTriggered = useRef(false);

      useEffect(() => {
        if (doSetParty && !setPartyTriggered.current) {
          setPartyTriggered.current = true;
          setParty([createContagiousPokemon('new1'), null, null, null, null, null]);
        }
      }, [doSetParty, setParty]);

      return <div data-testid="party-hashes">{party.map((p) => p?.hash || 'null').join(',')}</div>;
    };

    const { getByTestId, rerender } = await render(<TestComponent doSetParty={false} />);

    await expect.element(getByTestId('party-hashes')).toHaveTextContent('null,null,null,null,null,null');

    await rerender(<TestComponent doSetParty={true} />);

    await expect.element(getByTestId('party-hashes')).toHaveTextContent('new1,null,null,null,null,null');
  });
});
