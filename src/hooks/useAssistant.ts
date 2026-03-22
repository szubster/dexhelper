import { useQuery } from '@tanstack/react-query';
import { SaveData } from '../utils/saveParser';
import { pokeapi } from '../utils/pokeapi';
import { GEN1_MAP_TO_SLUG, GEN2_MAP_TO_SLUG } from '../utils/assistantData';
import { getDistanceToMap } from '../utils/mapGraphGen1';
import { getUnobtainableReason } from '../utils/versionExclusives';

export type SuggestionCategory = 'Catch' | 'Evolve' | 'Breed' | 'Progress' | 'Event' | 'Utility' | 'Trade';

export interface Suggestion {
  id: string;
  category: SuggestionCategory;
  title: string;
  description: string;
  pokemonId?: number;
  pokemonIds?: number[]; // For aggregated locations
  priority: number; // Higher is more important
}

export function useAssistant(saveData: SaveData | null, isLivingDex: boolean, manualVersion?: string | null) {
  
  // 1. Calculate missing IDs synchronously
  const maxDex = saveData?.generation === 1 ? 151 : (saveData?.generation === 2 ? 251 : 0);
  const missingIds: number[] = [];
  const ownedCount = saveData ? (isLivingDex ? (new Set([...saveData.party, ...saveData.pc])).size : saveData.owned.size) : 0;
  const ownedSet = saveData ? (isLivingDex ? new Set([...saveData.party, ...saveData.pc]) : saveData.owned) : new Set<number>();
  for (let i = 1; i <= maxDex; i++) {
    if (!ownedSet.has(i)) {
      missingIds.push(i);
    }
  }

  const effectiveVersion = manualVersion || saveData?.gameVersion;
  const displayVersion = effectiveVersion === 'unknown' ? (saveData?.generation === 2 ? 'gold' : 'red') : effectiveVersion;

  // Filter out unobtainable so we don't query for things we can't catch
  const catchableMissingIds = missingIds.filter(pid => {
    if (saveData?.generation === 1) {
       return !getUnobtainableReason(pid, displayVersion || 'red', ownedCount, ownedSet);
    }
    return true; // No gen 2 filters yet
  });

  const queryTargets = catchableMissingIds.slice(0, 30); // batch up to 30 missing Pokémon

  // 2. Fetch data from PokeAPI dynamically
  const { data: apiData, isLoading: isLoadingEncounters } = useQuery({
    queryKey: ['assistantData', saveData?.generation, saveData?.currentMapId, queryTargets.join(',')],
    queryFn: async () => {
      if (!saveData) return null;
      
      let localSlug = '';
      if (saveData.generation === 1) {
        localSlug = GEN1_MAP_TO_SLUG[saveData.currentMapId] || '';
      } else {
        localSlug = 'new-bark-town-area'; // Gen 2 fallback
      }

      // Fetch local area encounters
      let localEncounters: any[] = [];
      if (localSlug) {
        try {
          const areaData = await pokeapi.resource(`https://pokeapi.co/api/v2/location-area/${localSlug}`);
          localEncounters = areaData.pokemon_encounters || [];
        } catch (e) {
          console.error("Local area fetch failed", e);
        }
      }

      // Fetch encounter areas for the top 3 missing Pokemon
      const missingEncounters: Record<number, any[]> = {};
      const promises = queryTargets.map(async (pid) => {
         try {
           const encs = await pokeapi.resource(`https://pokeapi.co/api/v2/pokemon/${pid}/encounters`);
           missingEncounters[pid] = encs;
         } catch (e) {
           missingEncounters[pid] = [];
         }
      });
      await Promise.all(promises);

      return { localEncounters, missingEncounters };
    },
    enabled: !!saveData,
  });

  const suggestions: Suggestion[] = [];

  if (!saveData) {
    return { suggestions, isLoading: false };
  }

  const totalBadges = saveData.generation === 1 
    ? saveData.badges 
    : (saveData.johtoBadges || 0) + (saveData.kantoBadges || 0);

  // A. GEN 1 INTELLIGENCE
  if (saveData.generation === 1) {
    let localCatchFound = false;

    // 1. Group Local Catches
    if (apiData?.localEncounters && apiData.localEncounters.length > 0) {
      const localPids: number[] = [];
      for (const encounter of apiData.localEncounters) {
         const urlParts = encounter.pokemon.url.split('/');
         const pid = parseInt(urlParts[urlParts.length - 2]);
         
         const isValidVersion = encounter.version_details.some((vd: any) => vd.version.name === displayVersion);
         if (isValidVersion && missingIds.includes(pid)) {
             localPids.push(pid);
         }
      }

      if (localPids.length > 0) {
          suggestions.push({
            id: 'catch-local',
            category: 'Catch',
            title: 'Local Catches',
            description: `You are exactly where you need to be! There are ${localPids.length} missing Pokémon right here.`,
            pokemonIds: localPids,
            priority: 100
          });
          localCatchFound = true;
      }
    }

    // 2. Aggregate Nearest Encounter Pathfinding
    if (apiData?.missingEncounters) {
      const locationMap: Record<string, { name: string, distance: number, pids: Set<number> }> = {};
      
      for (const pid of queryTargets) {
         const encounters = apiData.missingEncounters[pid] || [];
         for (const enc of encounters) {
            const isValidVersion = enc.version_details.some((vd: any) => vd.version.name === displayVersion);
            if (!isValidVersion) continue;

            const targetAreaSlug = enc.location_area.name;
            
            if (!locationMap[targetAreaSlug]) {
                const route = getDistanceToMap(saveData.currentMapId, targetAreaSlug);
                if (route) {
                    locationMap[targetAreaSlug] = { name: route.name, distance: route.distance, pids: new Set() };
                }
            }
            
            if (locationMap[targetAreaSlug]) {
                locationMap[targetAreaSlug].pids.add(pid);
            }
         }
      }

      const locations = Object.values(locationMap).map(loc => ({
          ...loc,
          yield: loc.pids.size
      }));

      // Time optimization: If user has a Pokémon in their party with Fly (move ID 19)
      const partyHasFly = saveData.partyDetails?.some(p => p.moves && p.moves.includes(19));

      locations.sort((a, b) => {
          if (partyHasFly) {
              // Prioritize highest yield. If tie, closest distance.
              if (b.yield !== a.yield) return b.yield - a.yield;
              return a.distance - b.distance; 
          } else {
              // Early game: prioritize shortest distance. If tie, highest yield.
              if (a.distance !== b.distance) return a.distance - b.distance;
              return b.yield - a.yield;
          }
      });

      const topLocations = locations.slice(0, 4); // Show top 4 destinations
      for (const loc of topLocations) {
          const pids = Array.from(loc.pids);
          // Deduplicate if the local catches perfectly map to this location (distance 0)
          if (loc.distance === 0 && localCatchFound) continue;

          suggestions.push({
              id: `catch-loc-${loc.name}`,
              category: 'Catch',
              title: `Travel to ${loc.name}`,
              description: partyHasFly 
                ? (loc.distance === 0 
                   ? `Catch ${pids.length} missing Pokémon right here at ${loc.name}.`
                   : `Use Fly to easily travel to ${loc.name} and catch ${pids.length} missing Pokémon!`)
                : `You can catch ${pids.length} missing Pokémon at ${loc.name}, which is ${
                    loc.distance === 0 ? 'right here' :
                    loc.distance === 1 ? 'just 1 connection away' : 
                    `${loc.distance} connections away`
                  }.`,
              pokemonIds: pids,
              priority: 80 + loc.yield - (partyHasFly ? 0 : loc.distance)
          });
      }
    }

    // Unobtainables & Dead Ends
    let unobtainableCount = 0;
    for (const pid of missingIds) {
      if (unobtainableCount >= 4) break; 
      const reason = getUnobtainableReason(pid, displayVersion || 'red', ownedCount, ownedSet);
      if (reason) {
        suggestions.push({
           id: `trade-${pid}`,
           category: 'Trade',
           title: `Trade Required: #${pid}`,
           description: reason,
           pokemonId: pid,
           priority: 60 - unobtainableCount
        });
        unobtainableCount++;
      }
    }
  }

  // B. Progression / Utility (Examples)
  if (totalBadges < 8 && saveData.generation === 1) {
    suggestions.push({
      id: 'progress-badge',
      category: 'Progress',
      title: 'Collect Next Badge',
      description: `You have ${totalBadges} badges. Continue your Gym challenge!`,
      priority: 50
    });
  }

  if (saveData.pc.length > (saveData.generation === 1 ? 230 : 270)) {
     suggestions.push({
      id: 'utility-storage',
      category: 'Utility',
      title: 'PC Storage Dangerously Low',
      description: `You have almost filled all your PC boxes. Prepare to switch boxes.`,
      priority: 95
    });
  }

  // C. Event Pokemon
  if (saveData.generation === 1 && missingIds.includes(151)) {
    suggestions.push({
      id: 'event-mew',
      category: 'Event',
      title: 'Looking for Mew?',
      description: 'Mew is an Event Pokémon and cannot be caught normally without glitches or official distributions.',
      pokemonId: 151,
      priority: 10
    });
  }

  if (saveData.generation === 2 && missingIds.includes(251)) {
    suggestions.push({
      id: 'event-celebi',
      category: 'Event',
      title: 'Looking for Celebi?',
      description: 'Celebi can only be encountered through the GS Ball event in Pokémon Crystal Virtual Console, or via event distributions.',
      pokemonId: 251,
      priority: 10
    });
  }

  // NEVER EMPTY GUARANTEE
  if (suggestions.length === 0 && missingIds.length > 0) {
    suggestions.push({
      id: 'fallback',
      category: 'Utility',
      title: 'Database Sync Completed',
      description: `You are missing ${missingIds.length} Pokémon. Level up your current team to evolve them, or trade with other games to complete your Living Dex.`,
      priority: 1
    });
  }

  // Sort by priority descending
  // Filter out duplicates by ID
  const uniqueSuggestions = Array.from(new Map(suggestions.map(item => [item.id, item])).values());
  uniqueSuggestions.sort((a, b) => b.priority - a.priority);

  return {
    suggestions: uniqueSuggestions,
    isLoading: isLoadingEncounters
  };
}
