import type { PokemonInstance } from '../../saveParser/parsers/common';

export const PAL_PARK_BATCH_SIZE = 6;

export interface PalParkBatchLocation {
  box: number;
  slot: number;
}

export interface PalParkBatchedPokemon {
  pokemon: PokemonInstance;
  location: PalParkBatchLocation;
}

export function chunkPalParkBatches(pokemonList: PokemonInstance[]): PalParkBatchedPokemon[][] {
  const batched: PalParkBatchedPokemon[][] = [];
  let currentBatch: PalParkBatchedPokemon[] = [];

  for (const pokemon of pokemonList) {
    let box = 0;
    let slot = 0;

    if (pokemon.storageLocation.startsWith('Box ')) {
      const boxStr = pokemon.storageLocation.replace('Box ', '');
      box = parseInt(boxStr, 10);
      if (Number.isNaN(box)) {
        box = 0;
      }
    } else if (pokemon.storageLocation === 'Party') {
      box = 0;
    }

    if (pokemon.slot !== undefined) {
      slot = pokemon.slot;
    }

    currentBatch.push({
      pokemon,
      location: { box, slot },
    });

    if (currentBatch.length === PAL_PARK_BATCH_SIZE) {
      batched.push(currentBatch);
      currentBatch = [];
    }
  }

  if (currentBatch.length > 0) {
    batched.push(currentBatch);
  }

  return batched;
}
