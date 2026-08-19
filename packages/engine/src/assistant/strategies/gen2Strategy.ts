import type { UnifiedLocation } from '@/db/schema';
import { getGenerationConfig } from '@/utils/generationConfig';
import { getGen2UnobtainableReason } from '../../exclusives/gen2Exclusives';
import { getDistanceToMap, resolveOutdoorMapId } from '../../mapGraph/gen2Graph';
import type { SaveData } from '../../saveParser/index';
import { ITEM_HEADBUTT_GEN2, ITEM_ROCK_SMASH_GEN2, MOVE_HEADBUTT, MOVE_ROCK_SMASH } from '@/utils/encounterTools';
import type { AssistantStrategy, Suggestion } from './types';
import { getRoamerSuggestions } from '@/utils/roamer';

export const gen2Strategy: AssistantStrategy = {
  generation: 2,

  resolveMapAid(saveData: SaveData, allLocations: UnifiedLocation[]): number | null {
    return resolveOutdoorMapId(allLocations, saveData.currentMapId);
  },

  getMapDistance(currentMapId: number, targetAid: number, allLocations: UnifiedLocation[]) {
    return getDistanceToMap(allLocations, currentMapId, targetAid);
  },

  getUnobtainableReason(pokemonId: number, version: string, _ownedCount: number, ownedSet: Set<number>) {
    return getGen2UnobtainableReason(pokemonId, version, _ownedCount, ownedSet);
  },

  getSpecialSuggestions(saveData: SaveData, missingIds: number[]): Suggestion[] {
    const suggestions: Suggestion[] = [];
    const missingSet = new Set(missingIds);
    const genConfig = getGenerationConfig(2);

    if (saveData.currentBoxCount >= genConfig.boxWarningThreshold) {
      suggestions.push({
        id: 'box-full-warning',
        pokemonId: 0,
        title: 'Current Box Almost Full',
        category: 'Event',
        priority: 1000,
        description: `Your current box has ${saveData.currentBoxCount}/${genConfig.boxCapacity} Pokémon. Switch boxes at a Pokémon Center PC or new catches will fail!`,
      });
    }

    // 1. Roamer tracking
    const roamers = [
      { id: 243, name: 'Raikou' },
      { id: 244, name: 'Entei' },
      { id: 245, name: 'Suicune' },
    ];
    suggestions.push(...getRoamerSuggestions(saveData, missingSet, roamers, saveData.gameVersion === 'crystal'));

    // 2. Headbutt / Rock Smash
    // TM08 (Rock Smash) is Item ID 198 (0xC6), TM02 (Headbutt) is Item ID 192 (0xC0)
    // Actually, TMs are stored in TM pocket directly in Gen 2 parsed inventory as item IDs
    // In Gen 2, these are single-use and do not require badges to use in the field.
    const allInstances = [...(saveData.partyDetails || []), ...(saveData.pcDetails || [])];
    const hasHeadbutt =
      saveData.inventory.some((i) => i.id === ITEM_HEADBUTT_GEN2 && i.quantity > 0) ||
      (saveData.pcItems?.some((i) => i.id === ITEM_HEADBUTT_GEN2 && i.quantity > 0) ?? false) ||
      allInstances.some((p) => p.moves?.includes(MOVE_HEADBUTT));
    const hasRockSmash =
      saveData.inventory.some((i) => i.id === ITEM_ROCK_SMASH_GEN2 && i.quantity > 0) ||
      (saveData.pcItems?.some((i) => i.id === ITEM_ROCK_SMASH_GEN2 && i.quantity > 0) ?? false) ||
      allInstances.some((p) => p.moves?.includes(MOVE_ROCK_SMASH));

    if (hasHeadbutt) {
      suggestions.push({
        id: 'headbutt-reminder',
        category: 'Utility',
        title: 'Use Headbutt',
        description:
          'You have TM02 Headbutt! Use it on trees in various routes to drop rare Pokémon like Pineco or Heracross.',
        priority: 60,
      });
    }

    if (hasRockSmash) {
      suggestions.push({
        id: 'rocksmash-reminder',
        category: 'Utility',
        title: 'Use Rock Smash',
        description:
          'You have TM08 Rock Smash! Break cracked rocks to find hidden items and Pokémon like Krabby or Shuckle.',
        priority: 60,
      });
    }

    // Time-based tip since we skipped RTC parsing.
    suggestions.push({
      id: 'time-based-reminder',
      category: 'Utility',
      title: 'Time of Day',
      description:
        'Some Pokémon only appear during specific times of day (Morning, Day, Night). If you cannot find an encounter, check the time!',
      priority: 50,
    });

    // Tyrogue Stat-based Evolutions warning
    const tyrogueEvos = [106, 107, 237];
    for (const evoId of tyrogueEvos) {
      if (missingSet.has(evoId) && !missingSet.has(236)) {
        suggestions.push({
          id: `tyrogue-evo-${evoId}`,
          category: 'Utility',
          title: 'Tyrogue Evolution',
          description: `To evolve Tyrogue into ${evoId === 106 ? 'Hitmonlee' : evoId === 107 ? 'Hitmonchan' : 'Hitmontop'}, its Attack must be ${evoId === 106 ? 'higher than' : evoId === 107 ? 'lower than' : 'equal to'} its Defense at level 20!`,
          priority: 55,
        });
        break; // Only show one general warning
      }
    }

    return suggestions;
  },
  postProcessSuggestions(suggestions: Suggestion[]): void {
    for (const suggestion of suggestions) {
      if (suggestion.category === 'Catch' && suggestion.encounterInfo) {
        let hasMorning = false,
          hasDay = false,
          hasNight = false,
          hasNoTimeReq = false;
        for (const details of Object.values(suggestion.encounterInfo)) {
          for (const d of details) {
            if (!d.time) {
              hasNoTimeReq = true;
            } else {
              if (d.time & 1) hasMorning = true;
              if (d.time & 2) hasDay = true;
              if (d.time & 4) hasNight = true;
            }
          }
        }
        if (!hasNoTimeReq && (hasMorning || hasDay || hasNight)) {
          const times = [];
          if (hasMorning) times.push('Morning');
          if (hasDay) times.push('Day');
          if (hasNight) times.push('Night');
          if (times.length > 0 && times.length < 3) {
            suggestion.warning = `Only available in the ${times.join('/')}`;
          }
        }
      }
    }
  },

  isInternallyObtainable(baseId: number, _version: string): boolean {
    // Gen 2 trade evolutions and mythicals
    const unobtainableInternally = new Set([
      65, // Alakazam
      68, // Machamp
      76, // Golem
      94, // Gengar
      186, // Politoed
      199, // Slowking
      208, // Steelix
      212, // Scizor
      230, // Kingdra
      233, // Porygon2
      251, // Celebi
    ]);

    return !unobtainableInternally.has(baseId);
  },
};
