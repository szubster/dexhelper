import type { UnifiedLocation } from '../../../db/schema';
import { getGen2UnobtainableReason } from '../../exclusives/gen2Exclusives';
import { getDistanceToMap, resolveOutdoorMapId } from '../../mapGraph/gen2Graph';
import type { SaveData } from '../../saveParser/index';
import type { AssistantStrategy, Suggestion } from './types';

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

    // 1. Roamer tracking
    const roamers = [
      { id: 243, name: 'Raikou' },
      { id: 244, name: 'Entei' },
      { id: 245, name: 'Suicune' },
    ];
    for (const roamer of roamers) {
      if (missingSet.has(roamer.id)) {
        let isTracked = false;
        if (saveData.roamingLegendaries) {
          const rData = saveData.roamingLegendaries.find((r) => r.speciesId === roamer.id);
          if (rData && rData.mapId !== 0) {
            isTracked = true;
          }
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

    // 2. Headbutt / Rock Smash
    // TM08 (Rock Smash) is Item ID 198 (0xC6), TM02 (Headbutt) is Item ID 192 (0xC0)
    // Actually, TMs are stored in TM pocket directly in Gen 2 parsed inventory as item IDs
    // Headbutt = TM02 = Item ID 192, Rock Smash = TM08 = Item ID 198
    const hasHeadbutt = saveData.inventory.some((i) => i.id === 192 && i.quantity > 0);
    const hasRockSmash = saveData.inventory.some((i) => i.id === 198 && i.quantity > 0);

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

    // Breeding suggestions (Baby Pokemon)
    // Pichu (172), Cleffa (173), Igglybuff (174), Togepi (175), Tyrogue (236), Smoochum (238), Elekid (239), Magby (240)
    const babyPokemon = [
      { id: 172, parentId: 25 }, // Pichu -> Pikachu
      { id: 173, parentId: 35 }, // Cleffa -> Clefairy
      { id: 174, parentId: 39 }, // Igglybuff -> Jigglypuff
      { id: 175, parentId: 176 }, // Togepi -> Togetic
      { id: 236, parentId: 106 }, // Tyrogue -> Hitmonlee (also Hitmonchan/top, just one parent needed)
      { id: 238, parentId: 124 }, // Smoochum -> Jynx
      { id: 239, parentId: 125 }, // Elekid -> Electabuzz
      { id: 240, parentId: 126 }, // Magby -> Magmar
    ];

    const allPhysicalInstances = [...(saveData.partyDetails || []), ...(saveData.pcDetails || [])];
    const physicalSpeciesSet = new Set(allPhysicalInstances.map((p) => p.speciesId));

    for (const baby of babyPokemon) {
      if (missingSet.has(baby.id)) {
        if (physicalSpeciesSet.has(baby.parentId) || physicalSpeciesSet.has(132)) {
          // 132 is Ditto
          suggestions.push({
            id: `breed-${baby.id}`,
            category: 'Breed',
            title: `Breed for ${baby.id === 172 ? 'Pichu' : baby.id === 173 ? 'Cleffa' : baby.id === 174 ? 'Igglybuff' : baby.id === 175 ? 'Togepi' : baby.id === 236 ? 'Tyrogue' : baby.id === 238 ? 'Smoochum' : baby.id === 239 ? 'Elekid' : 'Magby'}`,
            description: `Leave ${physicalSpeciesSet.has(baby.parentId) ? 'your parent Pokémon' : 'Ditto'} at the Daycare with a compatible partner to get an Egg!`,
            priority: 75,
            pokemonId: baby.id,
          });
        }
      }
    }

    return suggestions;
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
