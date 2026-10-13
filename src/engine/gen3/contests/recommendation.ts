import { NATURE_MODIFIER_DISLIKES, NATURE_MODIFIER_LIKES } from './constants';
import { getDislikedCondition, getPreferredCondition } from './natureMapping';
import type { ContestCondition, Nature } from './types';

export type Conditions = Record<ContestCondition, number>;

export interface ContestRecommendation {
  category: ContestCondition;
  score: number;
}

export function getContestRecommendations(
  nature: Nature,
  conditions: Conditions,
  sheen: number,
): ContestRecommendation[] {
  const preferred = getPreferredCondition(nature);
  const disliked = getDislikedCondition(nature);

  const recommendations: ContestRecommendation[] = [];

  const categories: ContestCondition[] = ['cool', 'beauty', 'cute', 'smart', 'tough'];

  for (const category of categories) {
    const conditionValue = conditions[category] ?? 0;
    // Calculate remaining potential. Caps at 255 for condition and sheen.
    const remainingPotential = Math.max(0, Math.min(255 - conditionValue, 255 - sheen));

    let score = conditionValue + remainingPotential;

    if (category === preferred) {
      score *= NATURE_MODIFIER_LIKES;
    } else if (category === disliked) {
      score *= NATURE_MODIFIER_DISLIKES;
    }

    recommendations.push({ category, score });
  }

  recommendations.sort((a, b) => b.score - a.score);

  return recommendations.slice(0, 2);
}
