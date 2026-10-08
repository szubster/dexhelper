import type { PokeblockProfile } from './blending';
import { MAX_CONDITION, MAX_FEEL, NATURE_FLAVOR_MODIFIERS } from './constants';
import type { Nature } from './types';

export interface ContestStats {
  cool: number;
  beauty: number;
  cute: number;
  smart: number;
  tough: number;
  sheen: number;
}

export function calculateFeedingGains(pokeblock: PokeblockProfile, nature: Nature): Omit<ContestStats, 'sheen'> {
  const modifiers = NATURE_FLAVOR_MODIFIERS[nature];

  const applyModifier = (flavor: 'spicy' | 'dry' | 'sweet' | 'bitter' | 'sour', value: number) => {
    if (value === 0) return 0;
    if (modifiers.likes === flavor) return Math.floor(value * 1.1);
    if (modifiers.dislikes === flavor) return Math.floor(value * 0.9);
    return value;
  };

  return {
    cool: applyModifier('spicy', pokeblock.spicy),
    beauty: applyModifier('dry', pokeblock.dry),
    cute: applyModifier('sweet', pokeblock.sweet),
    smart: applyModifier('bitter', pokeblock.bitter),
    tough: applyModifier('sour', pokeblock.sour),
  };
}

export function feedPokeblock(stats: ContestStats, pokeblock: PokeblockProfile, nature: Nature): ContestStats {
  if (stats.sheen >= MAX_FEEL) {
    return { ...stats };
  }

  const gains = calculateFeedingGains(pokeblock, nature);

  return {
    cool: Math.min(MAX_CONDITION, stats.cool + gains.cool),
    beauty: Math.min(MAX_CONDITION, stats.beauty + gains.beauty),
    cute: Math.min(MAX_CONDITION, stats.cute + gains.cute),
    smart: Math.min(MAX_CONDITION, stats.smart + gains.smart),
    tough: Math.min(MAX_CONDITION, stats.tough + gains.tough),
    sheen: Math.min(MAX_FEEL, stats.sheen + pokeblock.feel),
  };
}
