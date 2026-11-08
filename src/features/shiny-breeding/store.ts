import { create } from 'zustand';
import { pokeDB } from '../../db/PokeDB';
import type { PokemonMetadata } from '../../db/schema';
import type { PokemonInstance } from '../../engine/saveParser/parsers/common';
import { calculateGen2Gender } from '../../utils/gender';

export interface ShinyBreedingState {
  parent1: PokemonInstance | null;
  parent2: PokemonInstance | null;
  metadataCache: Record<number, PokemonMetadata>;
  setParent1: (pokemon: PokemonInstance | null) => void;
  setParent2: (pokemon: PokemonInstance | null) => void;
  clearParents: () => void;
  loadMetadataForSpecies: (speciesIds: number[]) => Promise<void>;
}

export const useShinyBreedingStore = create<ShinyBreedingState>((set, get) => ({
  parent1: null,
  parent2: null,
  metadataCache: {},
  setParent1: (pokemon) => {
    set({ parent1: pokemon });
    if (pokemon) {
      void get().loadMetadataForSpecies([pokemon.speciesId]);
    }
  },
  setParent2: (pokemon) => {
    set({ parent2: pokemon });
    if (pokemon) {
      void get().loadMetadataForSpecies([pokemon.speciesId]);
    }
  },
  clearParents: () => set({ parent1: null, parent2: null }),
  loadMetadataForSpecies: async (speciesIds: number[]) => {
    const { metadataCache } = get();
    const missingIds = speciesIds.filter((id) => !metadataCache[id]);
    if (missingIds.length === 0) return;

    try {
      const allMons = await pokeDB.getAllPokemon();
      const newCache = { ...metadataCache };
      let changed = false;
      for (const id of missingIds) {
        const p = allMons.find((m) => m.id === id);
        if (p) {
          newCache[id] = p;
          changed = true;
        }
      }
      if (changed) {
        set({ metadataCache: newCache });
      }
    } catch (e) {
      console.error(
        'Failed to load metadata for shiny breeding store:',
        e instanceof Error ? e.message : 'Unknown error',
      );
    }
  },
}));

export const getDerivedParentStats = (pokemon: PokemonInstance | null, metadata?: PokemonMetadata) => {
  if (!pokemon) return null;

  let gender: 'male' | 'female' | 'genderless' | 'unknown' = 'unknown';

  if (pokemon.dvs && metadata && metadata.gr !== undefined) {
    gender = calculateGen2Gender(pokemon.dvs.atk, metadata.gr);
  }

  return {
    speciesId: pokemon.speciesId,
    gender,
    defenseDv: pokemon.dvs?.def ?? 0,
    specialDv: pokemon.dvs?.spc ?? 0,
  };
};
