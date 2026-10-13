import { describe, expect, it } from 'vitest';
import { render } from 'vitest-browser-react';
import type { PokemonInstance } from '../../engine/saveParser/parsers/common';
import { PokerusSpreadPlanner } from '../PokerusSpreadPlanner';

describe('PokerusSpreadPlanner', () => {
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

  it('renders party slots correctly', async () => {
    const party = [createContagiousPokemon(), createUninfectedPokemon(), createCuredPokemon()];

    const { getByText } = await render(<PokerusSpreadPlanner initialParty={party} />);

    // Check main title
    await expect.element(getByText('Pokérus Spread Planner', { exact: false })).toBeInTheDocument();

    // Check warning is visible
    await expect
      .element(getByText('Clock approaching midnight. Curing possible.', { exact: false }))
      .toBeInTheDocument();

    // The contagious one will make slot 2 at risk
    // Slot 1 (index 0): Contagious
    // Slot 2 (index 1): At risk
    // Slot 3 (index 2): Cured

    // There should be 6 slots total (3 pokemon, 3 empty)
    const emptySlots = getByText('--- EMPTY ---', { exact: false }).elements();
    expect(emptySlots).toHaveLength(3);

    // Check at risk badge
    await expect.element(getByText('[AT RISK]', { exact: false })).toBeInTheDocument();
  });

  it('allows moving pokemon up and down', async () => {
    const party = [
      createUninfectedPokemon(), // index 0
      createContagiousPokemon(), // index 1
      null,
      null,
      null,
      null,
    ];
    // With contagious at index 1, index 0 is at risk. index 2 is empty.

    const { getByTitle, getByText } = await render(<PokerusSpreadPlanner initialParty={party} />);

    // Find Move up button for slot 2 (index 1)
    const moveUpButtons = getByTitle('Move up').elements();
    expect(moveUpButtons).toHaveLength(1); // Only index 1 has a move up button since index > 0 and has pokemon

    // Click it to move contagious to index 0
    await getByTitle('Move up').click();

    // After moving contagious to index 0 and uninfected to index 1, the uninfected is still at risk
    await expect.element(getByText('[AT RISK]', { exact: false })).toBeInTheDocument();

    // Move down button check
    const moveDownButtons = getByTitle('Move down').elements();
    // Index 0 has a move down button, index 1 has a move down button
    expect(moveDownButtons).toHaveLength(2);
  });
});
