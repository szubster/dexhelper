import { gen1Strategy } from './gen1Strategy';
import type { AssistantStrategy } from './types';

const fallbackStrategy: AssistantStrategy = {
  generation: 1,
  resolveMapAid: () => null,
  getMapDistance: () => null,
  getUnobtainableReason: () => null,
  getSpecialSuggestions: () => [],
  isInternallyObtainable: () => false,
};

export function getStrategy(generation: number): AssistantStrategy {
  switch (generation) {
    case 1:
      return gen1Strategy;
    default:
      return fallbackStrategy;
  }
}
