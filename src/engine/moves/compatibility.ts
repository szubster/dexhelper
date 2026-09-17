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
