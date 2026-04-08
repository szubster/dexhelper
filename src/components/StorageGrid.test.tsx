import { renderToString } from 'react-dom/server';
import React from 'react';
import { describe, it, expect, vi } from 'vitest';
import { StorageGrid } from './StorageGrid';
import { useStore } from '../store';
import { getGenerationConfig } from '../utils/generationConfig';

// Mock dependencies
vi.mock('../store', () => ({
  useStore: vi.fn()
}));
vi.mock('@tanstack/react-router', () => ({
  useNavigate: () => vi.fn()
}));
vi.mock('../utils/generationConfig', () => ({
  getGenerationConfig: () => ({ boxCount: 14, spriteUrl: (id: number, shiny: boolean) => `sprite-${id}-${shiny}` })
}));
vi.mock('lucide-react', () => ({
  Sparkles: () => <div>Sparkles</div>
}));

describe('StorageGrid Performance', () => {
  it('measures render performance', () => {
    // Generate a large pokemonList
    const pokemonList = Array.from({ length: 1000 }, (_, i) => ({ id: i + 1, name: `Pokemon ${i + 1}` }));

    // Generate a large saveData
    const partyDetails = Array.from({ length: 6 }, (_, i) => ({
      speciesId: (i % 251) + 1,
      level: 50,
      isShiny: false,
      otName: 'Trainer',
      storageLocation: 'Party'
    }));

    const pcDetails = Array.from({ length: 280 }, (_, i) => ({
      speciesId: (i % 251) + 1,
      level: 20,
      isShiny: i % 10 === 0,
      otName: 'Trainer',
      storageLocation: `Box ${(i % 14) + 1}`
    }));

    const saveData = {
      generation: 2,
      partyDetails,
      pcDetails
    };

    vi.mocked(useStore).mockImplementation((selector: any) => selector({ saveData }));

    const start = performance.now();
    for(let i = 0; i < 100; i++) {
        renderToString(<StorageGrid pokemonList={pokemonList} />);
    }
    const end = performance.now();
    console.log(`Render time: ${end - start}ms`);
    expect(true).toBe(true);
  });
});
