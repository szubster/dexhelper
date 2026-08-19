import type { PokemonMetadata } from '@/db/schema';
import type { PokemonInstance } from '../saveParser/parsers/common';

/**
 * Represents a sortable item, combining the dynamic save instance
 * with its static database metadata.
 */
export interface SortablePokemon {
  instance: PokemonInstance;
  metadata?: PokemonMetadata;
}

/**
 * Interface defining a sorting strategy.
 * Implementations should return:
 * - A negative number if `a` should appear before `b`.
 * - A positive number if `a` should appear after `b`.
 * - Zero if `a` and `b` are considered equal according to the strategy.
 */
export type SortingStrategy = (a: SortablePokemon, b: SortablePokemon) => number;

/**
 * A utility class that chains multiple sorting strategies.
 * It evaluates strategies in the order they are provided.
 * If a strategy determines that two items are equal (returns 0),
 * it falls back to the next strategy in the chain.
 */
export class MultiCriterionSorter {
  private strategies: SortingStrategy[];

  /**
   * @param strategies - An array of `SortingStrategy` functions to chain.
   */
  constructor(strategies: SortingStrategy[]) {
    this.strategies = strategies;
  }

  /**
   * Sorts the two items using the provided strategies.
   *
   * @param a - The first item to compare.
   * @param b - The second item to compare.
   * @returns The comparison result.
   */
  public sort(a: SortablePokemon, b: SortablePokemon): number {
    for (const strategy of this.strategies) {
      const result = strategy(a, b);
      if (result !== 0) {
        return result;
      }
    }
    return 0; // All strategies consider them equal
  }
}
