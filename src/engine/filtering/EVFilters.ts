import type { PokemonInstance } from '../saveParser/parsers/common';

export type EVStat = 'hp' | 'attack' | 'defense' | 'specialAttack' | 'specialDefense' | 'speed' | 'total';

export type EVOperator = 'eq' | 'gt' | 'lt' | 'gte' | 'lte';

export interface EVFilterCondition {
  stat: EVStat;
  operator: EVOperator;
  value: number;
}

export interface EVFilterState {
  conditions?: EVFilterCondition[];
}

export interface EVSortState {
  stat: EVStat;
  direction: 'asc' | 'desc';
}

export const EV_STAT_EXTRACTORS: Record<
  Exclude<EVStat, 'total'>,
  (evs: NonNullable<PokemonInstance['evs']>) => number
> = {
  hp: (evs) => evs.hp,
  attack: (evs) => evs.atk,
  defense: (evs) => evs.def,
  specialAttack: (evs) => evs.spa,
  specialDefense: (evs) => evs.spd,
  speed: (evs) => evs.spe,
};

export function calculateTotalEVs(evs: NonNullable<PokemonInstance['evs']>): number {
  return evs.hp + evs.atk + evs.def + evs.spa + evs.spd + evs.spe;
}

export function isEVTotalStat(stat: EVStat): stat is 'total' {
  return stat === 'total';
}

export const EV_OPERATORS: Record<EVOperator, (actual: number, expected: number) => boolean> = {
  eq: (actual, expected) => actual === expected,
  gt: (actual, expected) => actual > expected,
  lt: (actual, expected) => actual < expected,
  gte: (actual, expected) => actual >= expected,
  lte: (actual, expected) => actual <= expected,
};

export function getEVValue(pokemon: PokemonInstance, stat: EVStat): number {
  if (!pokemon.evs) return 0;

  if (isEVTotalStat(stat)) {
    return calculateTotalEVs(pokemon.evs);
  }

  const extractor = EV_STAT_EXTRACTORS[stat];
  return extractor ? extractor(pokemon.evs) : 0;
}

export function evaluateEVOperator(actual: number, operator: EVOperator, expected: number): boolean {
  const comparator = EV_OPERATORS[operator];
  return comparator ? comparator(actual, expected) : false;
}

export function filterByEVs(pokemonList: PokemonInstance[], filterState: EVFilterState = {}): PokemonInstance[] {
  if (!filterState.conditions || filterState.conditions.length === 0) {
    return pokemonList;
  }

  return pokemonList.filter((pokemon) => {
    return filterState.conditions?.every((condition) => {
      const actualValue = getEVValue(pokemon, condition.stat);
      return evaluateEVOperator(actualValue, condition.operator, condition.value);
    });
  });
}

export function sortByEVs(pokemonList: PokemonInstance[], sortState: EVSortState): PokemonInstance[] {
  return [...pokemonList].sort((a, b) => {
    const valA = getEVValue(a, sortState.stat);
    const valB = getEVValue(b, sortState.stat);

    if (sortState.direction === 'asc') {
      return valA - valB;
    } else {
      return valB - valA;
    }
  });
}
