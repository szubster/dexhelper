import { describe, expect, it } from 'vitest';
import { page } from 'vitest/browser';
import { render } from 'vitest-browser-react';
import type { CompactEncounter } from '../../../../db/schema';
import { PokemonLocations } from '../PokemonLocations';

describe('PokemonLocations', () => {
  const mockAreaNames = {
    1: 'Pallet Town',
    2: 'Route 1',
  };

  const defaultProps = {
    pokemonId: 1, // Bulbasaur
    gameVersion: 'red',
    encounters: [] as CompactEncounter[],
    areaNames: mockAreaNames,
    evoReq: null,
    loading: false,
  };

  it('renders loading state correctly', async () => {
    await render(<PokemonLocations {...defaultProps} loading={true} />);
    const locationList = page.getByTestId('location-list');
    await expect.element(locationList).not.toBeInTheDocument();
  });

  it('renders correctly when there are no encounters (fallback)', async () => {
    const fallbackEncounters: CompactEncounter[] = [
      { aid: 2, v: 2, d: [] }, // Version 2 (blue), area 2
    ];

    // Using pokemonId 2 (Ivysaur) to avoid picking up Bulbasaur's static encounter in 'red'
    await render(<PokemonLocations {...defaultProps} pokemonId={2} encounters={fallbackEncounters} />);

    await expect.element(page.getByText(/SYS.ERR: TARGET NOT IN JURISDICTION \(RED\)/i)).toBeInTheDocument();
    await expect.element(page.getByText('ROUTE 1')).toBeInTheDocument();
    await expect.element(page.getByText('V-ID: 2')).toBeInTheDocument();
  });

  it('renders encounters correctly for the current version', async () => {
    const versionEncounters: CompactEncounter[] = [
      {
        aid: 1,
        v: 1, // 'red' has POKE_VERSION_MAP id 1
        d: [
          { min: 5, max: 5, m: 1, c: 100 }, // 'walk' maps to 1 in ENCOUNTER_METHOD_MAP
        ],
      },
    ];

    await render(<PokemonLocations {...defaultProps} pokemonId={2} encounters={versionEncounters} />);

    await expect.element(page.getByText('PALLET TOWN')).toBeInTheDocument();
    await expect.element(page.getByText('5')).toBeInTheDocument();
    await expect.element(page.getByText(/WALK/i)).toBeInTheDocument();
    await expect.element(page.getByText(/100%/i)).toBeInTheDocument();
  });

  it('renders evolution requirements correctly', async () => {
    const evoReq = {
      fromId: 1,
      fromName: 'Bulbasaur',
      method: 'Level 16',
    };

    await render(<PokemonLocations {...defaultProps} evoReq={evoReq} />);

    await expect.element(page.getByText(/LINK: EVOLVE BULBASAUR/i)).toBeInTheDocument();
    await expect.element(page.getByText('[ EVOLUTION ]')).toBeInTheDocument();
  });

  it('renders static encounters correctly', async () => {
    // pokemonId 1 (Bulbasaur) in 'red' should have a static encounter in Pallet Town
    await render(<PokemonLocations {...defaultProps} pokemonId={1} gameVersion="red" />);

    await expect.element(page.getByText('PALLET TOWN')).toBeInTheDocument();
    await expect.element(page.getByText('[ STATIONARY ]')).toBeInTheDocument();
  });
});
