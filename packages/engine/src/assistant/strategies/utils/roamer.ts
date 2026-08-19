import type { SaveData } from '../../../saveParser/index';
import type { Suggestion } from '../types';

export function getRoamerSuggestions(
  saveData: SaveData,
  missingSet: Set<number>,
  roamers: { id: number; name: string }[],
  isCrystal: boolean = false,
): Suggestion[] {
  const suggestions: Suggestion[] = [];

  // ⚡ Bolt: converted roamingLegendaries to a Map keyed by speciesId to optimize O(N) loop lookup
  const roamerMap = new Map(saveData.roamingLegendaries?.map((r) => [r.speciesId, r]));

  for (const roamer of roamers) {
    // In Crystal, Suicune is a static encounter, not a roamer. Suppress roamer logic for it.
    if (isCrystal && roamer.id === 245) continue;

    if (missingSet.has(roamer.id)) {
      let isTracked = false;
      const rData = roamerMap.get(roamer.id);
      if (rData && rData.mapId !== 0) {
        isTracked = true;
      }

      suggestions.push({
        id: `roamer-${roamer.id}`,
        category: 'Catch',
        title: `Track ${roamer.name}`,
        description: isTracked
          ? `${roamer.name} is currently roaming! Check your Pokédex to see its current route.`
          : `Encounter ${roamer.name} in the wild, then use your Pokédex to track its location!`,
        pokemonId: roamer.id,
        priority: 85,
      });
    }
  }

  return suggestions;
}
