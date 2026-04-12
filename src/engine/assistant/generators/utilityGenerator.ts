import { OBEDIENCE_CAPS } from '../../data/gen1/assistantData';
import type { SuggestionContext } from './types';

export function generateUtilitySuggestions(context: SuggestionContext) {
  const { saveData, suggestions } = context;

  // Box Full
  if (saveData.generation === 1) {
    if (saveData.currentBoxCount >= 20) {
      suggestions.push({
        id: 'utility-box-full',
        category: 'Utility',
        title: 'CRITICAL: PC Box Full!',
        description: "Your current PC box is at 20/20. Switch boxes via Bill's PC.",
        priority: 150,
      });
    } else if (saveData.currentBoxCount >= 18) {
      suggestions.push({
        id: 'utility-box-near-full',
        category: 'Utility',
        title: 'PC Box Almost Full',
        description: `${20 - saveData.currentBoxCount} slots remaining.`,
        priority: 95,
      });
    }
  }

  // Obedience
  const totalBadges =
    saveData.generation === 1 ? saveData.badges : (saveData.johtoBadges || 0) + (saveData.kantoBadges || 0);
  const caps = OBEDIENCE_CAPS.filter((c) => totalBadges >= c.badges);
  const currentCap = caps[caps.length - 1]?.level ?? 10;
  const disobedient = saveData.partyDetails.filter(
    (p) => p.otName && p.otName !== saveData.trainerName && p.level > currentCap,
  );
  if (disobedient.length > 0) {
    suggestions.push({
      id: 'utility-obedience-danger',
      category: 'Utility',
      title: 'Obedience Danger!',
      description: `You have traded Pokémon above Lv. ${currentCap}. They may not obey you!`,
      priority: 110,
    });
  }
}
