import type { ContestCondition, Nature } from './types';

export const NATURE_CONDITION_MAPPING: Record<
  Nature,
  { likes: ContestCondition | null; dislikes: ContestCondition | null }
> = {
  hardy: { likes: null, dislikes: null },
  bold: { likes: 'tough', dislikes: 'cool' },
  modest: { likes: 'beauty', dislikes: 'cool' },
  calm: { likes: 'smart', dislikes: 'cool' },
  timid: { likes: 'cute', dislikes: 'cool' },
  lonely: { likes: 'cool', dislikes: 'tough' },
  docile: { likes: null, dislikes: null },
  mild: { likes: 'beauty', dislikes: 'tough' },
  gentle: { likes: 'smart', dislikes: 'tough' },
  hasty: { likes: 'cute', dislikes: 'tough' },
  adamant: { likes: 'cool', dislikes: 'beauty' },
  impish: { likes: 'tough', dislikes: 'beauty' },
  bashful: { likes: null, dislikes: null },
  careful: { likes: 'smart', dislikes: 'beauty' },
  rash: { likes: 'beauty', dislikes: 'smart' },
  jolly: { likes: 'cute', dislikes: 'beauty' },
  naughty: { likes: 'cool', dislikes: 'smart' },
  lax: { likes: 'tough', dislikes: 'smart' },
  quirky: { likes: null, dislikes: null },
  naive: { likes: 'cute', dislikes: 'smart' },
  brave: { likes: 'cool', dislikes: 'cute' },
  relaxed: { likes: 'tough', dislikes: 'cute' },
  quiet: { likes: 'beauty', dislikes: 'cute' },
  sassy: { likes: 'smart', dislikes: 'cute' },
  serious: { likes: null, dislikes: null },
};

export function getPreferredCondition(nature: Nature): ContestCondition | null {
  return NATURE_CONDITION_MAPPING[nature].likes;
}

export function getDislikedCondition(nature: Nature): ContestCondition | null {
  return NATURE_CONDITION_MAPPING[nature].dislikes;
}
