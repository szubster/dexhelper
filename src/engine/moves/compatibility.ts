import type { PokemonMetadata } from '../../db/schema.js';
import type { PokemonInstance } from '../saveParser/parsers/common.js';

export interface Move {
  id: number;
  type: string;
}

export interface PokemonMoveset {
  id: string;
  speciesId: number;
  knownMoves: Move[];
}

export interface TMHM {
  id: number;
  type: string;
}

export function identifyStrategicGapsForTMHM(pokemon: PokemonMoveset, tmhm: TMHM): boolean {
  // Check if the Pokemon already knows a move of the TM/HM's type
  return !pokemon.knownMoves.some((move) => move.type === tmhm.type);
}

export function getCompatiblePokemonForTMHM(
  moveId: number,
  pokemonList: PokemonInstance[],
  metadataMap: Map<number, PokemonMetadata>,
): PokemonInstance[] {
  return pokemonList.filter((pokemon) => {
    if (pokemon.moves.includes(moveId)) return true;
    const meta = metadataMap.get(pokemon.speciesId);
    if (meta?.tm?.includes(moveId)) return true;
    return false;
  });
}
