import { bench, describe } from 'vitest';
import { renderToString } from 'react-dom/server';
import React from 'react';
import { PokemonLocations } from './src/components/pokemon/details/PokemonLocations';

const mockEncounters = Array.from({ length: 50 }, (_, i) => ({
  location_area: { name: `route-${i}` },
  version_details: [
    { version: { name: 'red' }, encounter_details: [{ min_level: 1, max_level: 5, chance: 10, method: { name: 'walk' } }] },
    { version: { name: 'blue' }, encounter_details: [{ min_level: 1, max_level: 5, chance: 10, method: { name: 'walk' } }] },
    { version: { name: 'yellow' }, encounter_details: [{ min_level: 1, max_level: 5, chance: 10, method: { name: 'walk' } }] },
  ]
}));

describe('PokemonLocations', () => {
  bench('render', () => {
    renderToString(
      <PokemonLocations
        pokemonId={1}
        gameVersion="red"
        encounters={mockEncounters as any}
        evoReq={null}
        loading={false}
      />
    );
  });
});
