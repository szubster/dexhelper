import { gen1Strategy } from './gen1Strategy';
import type { AssistantStrategy } from './types';

const STRATEGIES: Record<number, AssistantStrategy> = {
  1: gen1Strategy,
  // Future: 2: gen2Strategy, 3: gen3Strategy, etc.
};

/**
 * Get the assistant strategy for a generation.
 * Falls back to gen1Strategy if no specific strategy exists.
 */
export function getStrategy(generation: number): AssistantStrategy {
  return STRATEGIES[generation] ?? gen1Strategy;
}
