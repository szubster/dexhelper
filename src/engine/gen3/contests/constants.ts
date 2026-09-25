import type { ContestCondition, Nature } from './types';

export const MAX_FEEL = 255;
export const MAX_CONDITION = 255;

export type Flavor = 'spicy' | 'dry' | 'sweet' | 'bitter' | 'sour';

export const CONDITION_FLAVOR_MAPPING: Record<ContestCondition, Flavor> = {
  cool: 'spicy',
  beauty: 'dry',
  cute: 'sweet',
  smart: 'bitter',
  tough: 'sour',
};

export const FLAVOR_CONDITION_MAPPING: Record<Flavor, ContestCondition> = {
  spicy: 'cool',
  dry: 'beauty',
  sweet: 'cute',
  bitter: 'smart',
  sour: 'tough',
};

export const NATURE_MODIFIER_LIKES = 1.1;
export const NATURE_MODIFIER_DISLIKES = 0.9;
export const NATURE_MODIFIER_NEUTRAL = 1.0;

export const NATURE_FLAVOR_MODIFIERS: Record<Nature, { likes: Flavor | null; dislikes: Flavor | null }> = {
  hardy: { likes: null, dislikes: null },
  bold: { likes: 'sour', dislikes: 'spicy' },
  modest: { likes: 'dry', dislikes: 'spicy' },
  calm: { likes: 'bitter', dislikes: 'spicy' },
  timid: { likes: 'sweet', dislikes: 'spicy' },
  lonely: { likes: 'spicy', dislikes: 'sour' },
  docile: { likes: null, dislikes: null },
  mild: { likes: 'dry', dislikes: 'sour' },
  gentle: { likes: 'bitter', dislikes: 'sour' },
  hasty: { likes: 'sweet', dislikes: 'sour' },
  adamant: { likes: 'spicy', dislikes: 'dry' },
  impish: { likes: 'sour', dislikes: 'dry' },
  bashful: { likes: null, dislikes: null },
  careful: { likes: 'bitter', dislikes: 'dry' },
  rash: { likes: 'dry', dislikes: 'bitter' },
  jolly: { likes: 'sweet', dislikes: 'dry' },
  naughty: { likes: 'spicy', dislikes: 'bitter' },
  lax: { likes: 'sour', dislikes: 'bitter' },
  quirky: { likes: null, dislikes: null },
  naive: { likes: 'sweet', dislikes: 'bitter' },
  brave: { likes: 'spicy', dislikes: 'sweet' },
  relaxed: { likes: 'sour', dislikes: 'sweet' },
  quiet: { likes: 'dry', dislikes: 'sweet' },
  sassy: { likes: 'bitter', dislikes: 'sweet' },
  serious: { likes: null, dislikes: null },
};
