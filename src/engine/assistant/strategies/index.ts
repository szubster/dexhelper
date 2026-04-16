import { AssistantStrategy } from './types';
import { gen1Strategy } from './gen1Strategy';

const fallbackStrategy: AssistantStrategy = {
  generateLocationSuggestions: () => [],
  getExclusivesChecker: () => null,
  getMapGraph: () => null,
};

export function getStrategy(generation: number): AssistantStrategy {
  switch (generation) {
    case 1:
      return gen1Strategy;
    default:
      return fallbackStrategy;
  }
}
