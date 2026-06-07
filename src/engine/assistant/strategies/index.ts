import { gen1Strategy } from './gen1Strategy';
import { gen2Strategy } from './gen2Strategy';
import { gen3Strategy } from './gen3Strategy';
import type { AssistantStrategy } from './types';

/**
 * A null-object implementation of AssistantStrategy used as a safe fallback.
 * By providing default no-op returns (like empty arrays for suggestions and nulls for distances),
 * the core `suggestionEngine` can fail gracefully instead of throwing undefined errors
 * when encountering corrupted save files or unsupported generations.
 */
const fallbackStrategy: AssistantStrategy = {
  generation: 0,
  resolveMapAid: () => null,
  getMapDistance: () => null,
  getUnobtainableReason: () => null,
  getSpecialSuggestions: () => [],
  isInternallyObtainable: () => false,
};

const STRATEGIES: Record<number, AssistantStrategy> = {
  1: gen1Strategy,
  2: gen2Strategy,
  3: gen3Strategy,
};

/**
 * Resolves the appropriate generation-specific strategy for the Assistant engine.
 *
 * **Architecture Note:**
 * The suggestion engine uses the Strategy pattern to completely decouple the main
 * generation loop in `suggestionEngine.ts` from generation-specific mechanics.
 * For example, Gen 2 introduced breeding, roaming legendaries, and completely different
 * memory layouts for maps. Instead of littering the core loop with `if (gen === 2)` branches,
 * all mechanic-specific distance lookups and unobtainability rules are delegated
 * to these strategy implementations.
 *
 * @param generation - The generation number (e.g., 1 for Red/Blue/Yellow, 2 for Gold/Silver/Crystal).
 * @returns The corresponding AssistantStrategy, or `fallbackStrategy` if the generation is unsupported.
 *
 * @example
 * // In suggestionEngine.ts
 * const strategy = getStrategy(saveData.generation);
 * const localAid = strategy.resolveMapAid(saveData, allLocations);
 */
export function getStrategy(generation: number): AssistantStrategy {
  return STRATEGIES[generation] ?? fallbackStrategy;
}
