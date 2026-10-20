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

export function getEVValue(pokemon: PokemonInstance, stat: EVStat): number {
  if (!pokemon.evs) return 0;

  switch (stat) {
    case 'hp':
      return pokemon.evs.hp;
    case 'attack':
      return pokemon.evs.atk;
    case 'defense':
      return pokemon.evs.def;
    case 'specialAttack':
      return pokemon.evs.spa;
    case 'specialDefense':
      return pokemon.evs.spd;
    case 'speed':
      return pokemon.evs.spe;
    case 'total':
      return pokemon.evs.hp + pokemon.evs.atk + pokemon.evs.def + pokemon.evs.spa + pokemon.evs.spd + pokemon.evs.spe;
    default:
      return 0;
  }
}

export function evaluateEVOperator(actual: number, operator: EVOperator, expected: number): boolean {
  switch (operator) {
    case 'eq':
      return actual === expected;
    case 'gt':
      return actual > expected;
    case 'lt':
      return actual < expected;
    case 'gte':
      return actual >= expected;
    case 'lte':
      return actual <= expected;
    default:
      return false;
  }
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
