import type { Nature } from './contests/types';
import { NATURES, NUM_NATURES } from './nature/constants';

export function getNature(personalityValue: number): Nature {
  return NATURES[personalityValue % NUM_NATURES] ?? 'hardy';
}

export { NATURES, NUM_NATURES } from './nature/constants';
