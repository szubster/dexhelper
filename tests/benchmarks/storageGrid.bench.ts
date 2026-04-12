import { bench, describe } from 'vitest';

// Setup mock data
const MOCK_SIZE = 400; // typical max pokemon storage size
const pokemonList = Array.from({ length: 251 }, (_, i) => ({ id: i + 1, name: `Pokemon ${i + 1}` }));
const map = new Map(pokemonList.map(p => [p.id, p]));

const allPokemon = Array.from({ length: MOCK_SIZE }, (_, i) => ({
  speciesId: (i % 251) + 1,
  storageLocation: `Box ${i % 14}`,
  level: 50,
  isShiny: false,
  otName: 'Jules'
}));

// Current approach setup
const currentGrouped = new Map<string, typeof allPokemon>();
for (const p of allPokemon) {
  let current = currentGrouped.get(p.storageLocation);
  if (!current) {
    current = [];
    currentGrouped.set(p.storageLocation, current);
  }
  current.push(p);
}

// Proposed approach setup (done once in useMemo)
const proposedGrouped = new Map<string, { p: typeof allPokemon[0], pokemon: typeof pokemonList[0] }[]>();
for (const p of allPokemon) {
  const pokemon = map.get(p.speciesId);
  if (!pokemon) continue;

  let current = proposedGrouped.get(p.storageLocation);
  if (!current) {
    current = [];
    proposedGrouped.set(p.storageLocation, current);
  }
  current.push({ p, pokemon });
}

describe('StorageGrid Render Loop', () => {
  bench('Current Approach Render Loop (Map.get per render)', () => {
    let count = 0;
    for (const [loc, pokemons] of currentGrouped) {
      for (const p of pokemons) {
        // This is what happens in render
        const pokemon = map.get(p.speciesId);
        if (pokemon) {
          count++;
        }
      }
    }
  });

  bench('Proposed Approach Render Loop (Pre-combined)', () => {
    let count = 0;
    for (const [loc, items] of proposedGrouped) {
      for (const item of items) {
        // This is what happens in render
        if (item.pokemon) {
          count++;
        }
      }
    }
  });
});
