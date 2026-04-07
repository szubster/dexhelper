import { bench, describe } from 'vitest';

describe('Map vs Dictionary Object vs find', () => {
  // Generate a mock list of 1000 Pokemon, simulating PokeAPI results
  const pokemonList = Array.from({ length: 1000 }, (_, i) => ({
    id: i + 1,
    name: `Pokemon${i + 1}`,
  }));

  // Create a map
  const pokemonMap = new Map<number, string>();
  for (const p of pokemonList) {
    pokemonMap.set(p.id, p.name);
  }

  // Create an object map
  const pokemonRecord: Record<number, string> = {};
  for (const p of pokemonList) {
    pokemonRecord[p.id] = p.name;
  }

  // Generate 10,000 random lookups
  const lookups = Array.from({ length: 10000 }, () => Math.floor(Math.random() * 1000) + 1);

  bench('pokemonList.find O(N)', () => {
    for (const id of lookups) {
      const p = pokemonList.find(x => x.id === id);
      const name = p ? p.name : `#${id}`;
    }
  });

  bench('pokemonMap.get O(1)', () => {
    for (const id of lookups) {
      const name = pokemonMap.get(id) ?? `#${id}`;
    }
  });

  bench('pokemonRecord[id] O(1)', () => {
    for (const id of lookups) {
      const name = pokemonRecord[id] ?? `#${id}`;
    }
  });
});
