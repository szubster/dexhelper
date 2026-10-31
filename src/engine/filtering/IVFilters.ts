import type { PokemonInstance } from '../saveParser/index';

export function hasPerfectIVsOrDVs(pokemon: PokemonInstance): boolean {
  if (pokemon.ivs) {
    const { hp, atk, def, spd, spatk, spdef } = pokemon.ivs;
    return hp === 31 && atk === 31 && def === 31 && spd === 31 && spatk === 31 && spdef === 31;
  }

  if (pokemon.dvs) {
    const { hp, atk, def, spd, spc } = pokemon.dvs;
    return hp === 15 && atk === 15 && def === 15 && spd === 15 && spc === 15;
  }

  return false;
}
