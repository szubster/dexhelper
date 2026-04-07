import { bench, describe } from 'vitest';
import { renderToString } from 'react-dom/server';
import React from 'react';
import { StorageGrid } from '../../src/components/StorageGrid';
import { useStore } from '../../src/store';
import { vi } from 'vitest';

// Mock generation config to avoid routing/store issues
vi.mock('../../src/utils/generationConfig', () => ({
  getGenerationConfig: () => ({ boxCount: 14, spriteUrl: () => 'mock.png' })
}));
vi.mock('@tanstack/react-router', () => ({
  useNavigate: () => vi.fn()
}));
vi.mock('lucide-react', () => ({
  Sparkles: () => <div>Sparkles</div>
}));

// Setup realistic, large data
const MOCK_POKEMON_LIST = Array.from({ length: 251 }, (_, i) => ({
  id: i + 1,
  name: `Pokemon ${i + 1}`
}));

const MOCK_SAVE_DATA = {
  generation: 2,
  partyDetails: Array.from({ length: 6 }, (_, i) => ({
    speciesId: (i % 251) + 1,
    storageLocation: 'Party',
    level: 50,
    isShiny: false,
    otName: 'Jules'
  })),
  pcDetails: Array.from({ length: 14 * 20 }, (_, i) => ({ // 14 boxes, 20 per box
    speciesId: (i % 251) + 1,
    storageLocation: `Box ${(i % 14) + 1}`,
    level: 5,
    isShiny: i % 50 === 0,
    otName: 'Jules'
  })),
};

describe('StorageGrid Performance (Component)', () => {
  bench('Render optimized StorageGrid', () => {
    // Inject mock store directly before render
    useStore.setState({ saveData: MOCK_SAVE_DATA as any });
    renderToString(<StorageGrid pokemonList={MOCK_POKEMON_LIST} />);
  });
});

describe('Map vs Find Array Search (Underlying Data Structure)', () => {
  const pokemonList = Array.from({ length: 10000 }, (_, i) => ({ id: i + 1, name: `Pokemon ${i + 1}` }));
  const searchIds = Array.from({ length: 280 }, (_, i) => 9000 + (i % 500));

  bench('Array.find() [Baseline]', () => {
    let matches = 0;
    for (const id of searchIds) {
      const p = pokemonList.find(pl => pl.id === id);
      if (p) matches++;
    }
  });

  const pokemonMap = new Map<number, { id: number; name: string }>();
  pokemonList.forEach(p => pokemonMap.set(p.id, p));

  bench('Map.get() [Optimized]', () => {
    let matches = 0;
    for (const id of searchIds) {
      const p = pokemonMap.get(id);
      if (p) matches++;
    }
  });
});
