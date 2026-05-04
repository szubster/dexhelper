import { gen1Strategy } from './gen1Strategy';
import type { AssistantStrategy } from './types';

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
  // Future: 2: gen2Strategy, 3: gen3Strategy, etc.
};

/**
 * Get the assistant strategy for a generation.
 * Falls back to fallbackStrategy if no specific strategy exists.
 */
export function getStrategy(generation: number): AssistantStrategy {
  return STRATEGIES[generation] ?? fallbackStrategy;
}
