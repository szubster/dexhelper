import type { SaveData } from '../../../saveParser/index';
import type { Suggestion } from '../types';

export function getMatchCallSuggestions(saveData: SaveData): Suggestion[] {
  if (
    saveData.gameVersion !== 'emerald' ||
    !('gen3MatchCall' in saveData ? saveData.gen3MatchCall : undefined)?.hasMatchCall
  ) {
    return [];
  }

  const suggestions: Suggestion[] = [];

  let hasRematches = false;
  let totalMissing = 0;
  const rematchStates =
    'gen3MatchCall' in saveData && saveData.gen3MatchCall ? saveData.gen3MatchCall.rematchStates : [];
  for (let i = 0; i < rematchStates.length; i++) {
    const state = rematchStates[i];
    if (state !== undefined && state > 0) {
      hasRematches = true;
      totalMissing++;
    }
  }

  if (hasRematches) {
    suggestions.push({
      id: 'match-call',
      category: 'Utility',
      title: 'Match Call Rematches',
      description: `You have ${totalMissing} trainer${totalMissing > 1 ? 's' : ''} ready for a rematch via the Match Call feature! Defeat them to earn EXP and EVs.`,
      priority: 60,
    });
  }

  return suggestions;
}
