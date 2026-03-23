import { useQuery } from '@tanstack/react-query';
import { SaveData } from '../utils/saveParser';
import { pokeapi } from '../utils/pokeapi';
import { GEN1_MAP_TO_SLUG, GEN2_MAP_TO_SLUG, OBEDIENCE_CAPS, STATIC_GIFT_DATA } from '../utils/assistantData';
import { getDistanceToMap } from '../utils/mapGraphGen1';
import { getUnobtainableReason } from '../utils/versionExclusives';

export type SuggestionCategory = 'Catch' | 'Evolve' | 'Breed' | 'Progress' | 'Event' | 'Utility' | 'Trade' | 'Gift';

export interface EncounterDetail {
  chance: number;
  method: string;
  minLevel: number;
  maxLevel: number;
}

export interface Suggestion {
  id: string;
  category: SuggestionCategory;
  title: string;
  description: string;
  pokemonId?: number;
  pokemonIds?: number[]; 
  priority: number; 
  encounterInfo?: Record<number, EncounterDetail[]>;
}

/**
 * Fetches all necessary data from PokéAPI for the assistant to make suggestions.
 * This is decoupled from the React hook for easier testing.
 */
export async function fetchAssistantApiData(saveData: SaveData, queryTargets: number[]) {
  let localSlug = '';
  if (saveData.generation === 1) {
    localSlug = GEN1_MAP_TO_SLUG[saveData.currentMapId] || '';
  } else {
    localSlug = 'new-bark-town-area'; 
  }

  let localEncounters: any[] = [];
  if (localSlug) {
    try {
      const areaData = await pokeapi.resource(`https://pokeapi.co/api/v2/location-area/${localSlug}`);
      localEncounters = areaData.pokemon_encounters || [];
    } catch (e) {
      console.error("Local area fetch failed", e);
    }
  }

  const missingEncounters: Record<number, any[]> = {};
  const missingChains: Record<number, any> = {};
  const ancestralEncounters: Record<number, Record<number, any[]>> = {}; 

  const missingPromises = queryTargets.map(async (pid) => {
     try {
       const [encs, species] = await Promise.all([
         pokeapi.resource(`https://pokeapi.co/api/v2/pokemon/${pid}/encounters`),
         pokeapi.resource(`https://pokeapi.co/api/v2/pokemon-species/${pid}`)
       ]);
       missingEncounters[pid] = encs;
       
       const chain = await pokeapi.resource(species.evolution_chain.url);
       missingChains[pid] = chain;

       // Find all ancestors of pid in the chain
       const ancestors: number[] = [];
       const findAncestors = (node: any, target: number, path: number[]): boolean => {
         const id = parseInt(node.species.url.split('/').slice(-2, -1)[0]);
         if (id === target) {
           ancestors.push(...path);
           return true;
         }
         for (const child of node.evolves_to) {
           if (findAncestors(child, target, [...path, id])) return true;
         }
         return false;
       };
       findAncestors(chain.chain, pid, []);

       if (ancestors.length > 0) {
         ancestralEncounters[pid] = {};
         await Promise.all(ancestors.map(async (aid) => {
           const aEncs = await pokeapi.resource(`https://pokeapi.co/api/v2/pokemon/${aid}/encounters`);
           ancestralEncounters[pid][aid] = aEncs;
         }));
       }
     } catch (e) {
       missingEncounters[pid] = [];
     }
  });

  const partyEvolutions: Record<number, any> = {};
  const partyPromises = (saveData.party || []).map(async (pid) => {
    try {
      const species = await pokeapi.resource(`https://pokeapi.co/api/v2/pokemon-species/${pid}`);
      const chainUrl = species.evolution_chain.url;
      const chain = await pokeapi.resource(chainUrl);
      partyEvolutions[pid] = chain;
    } catch (e) {
      console.error("Evo fetch failed", pid, e);
    }
  });

  await Promise.all([...missingPromises, ...partyPromises]);
  return { localEncounters, missingEncounters, missingChains, ancestralEncounters, partyEvolutions };
}

/**
 * Pure logic function to generate suggestions based on save data and API data.
 * No React or Hook dependencies.
 */
export function generateSuggestions(
  saveData: SaveData | null, 
  isLivingDex: boolean, 
  manualVersion: string | null | undefined,
  apiData: any
): Suggestion[] {
  const suggestions: Suggestion[] = [];
  if (!saveData || !apiData) return suggestions;

  const maxDex = saveData.generation === 1 ? 151 : (saveData.generation === 2 ? 251 : 0);
  const missingIds: number[] = [];
  
  const ownedSet = isLivingDex 
    ? new Set([...(saveData.party || []), ...(saveData.pc || [])]) 
    : saveData.owned || new Set<number>();
  
  const ownedCount = ownedSet.size;
  const allInstances = [...(saveData.partyDetails || []), ...(saveData.pcDetails || [])];
  const myOtIds = new Set(allInstances.filter(p => p.otName === saveData.trainerName).map(p => p.speciesId));

  for (let i = 1; i <= maxDex; i++) {
    if (!ownedSet.has(i)) {
      if (saveData.generation === 1 && i === 150 && (saveData.hallOfFameCount || 0) === 0) {
          continue;
      }
      missingIds.push(i);
    }
  }

  const effectiveVersion = manualVersion || saveData.gameVersion;
  const displayVersion = effectiveVersion === 'unknown' ? (saveData.generation === 2 ? 'gold' : 'red') : effectiveVersion;
  const queryTargets = missingIds.slice(0, 30); 

  // A. Catch logic
  if (apiData.localEncounters) {
    const localPids: number[] = [];
    const localEncounterInfo: Record<number, EncounterDetail[]> = {};

    for (const encounter of apiData.localEncounters) {
       const urlParts = encounter.pokemon.url.split('/');
       const pid = parseInt(urlParts[urlParts.length - 2]);
       
       const isFinite = !!STATIC_GIFT_DATA[pid];
       if (isFinite && myOtIds.has(pid)) continue;

       const gift = STATIC_GIFT_DATA[pid];
       if (saveData.eventFlags && gift?.eventFlag) {
          if ((saveData.eventFlags[Math.floor(gift.eventFlag / 8)] & (1 << (gift.eventFlag % 8))) !== 0) continue;
       }

       const versionDetail = encounter.version_details.find((vd: any) => vd.version.name === displayVersion);
       if (versionDetail && missingIds.includes(pid)) {
           localPids.push(pid);
           localEncounterInfo[pid] = versionDetail.encounter_details.map((ed: any) => ({
               chance: ed.chance,
               method: ed.method.name,
               minLevel: ed.min_level,
               maxLevel: ed.max_level
           }));
       }
    }
    if (localPids.length > 0) {
        suggestions.push({
          id: 'catch-local', category: 'Catch', title: 'Catch Right Here',
          description: `You are exactly where you need to be! There are ${localPids.length} missing Pokémon right here.`,
          pokemonIds: localPids, priority: 120,
          encounterInfo: localEncounterInfo
        });
    }
  }

  if (apiData.missingEncounters) {
    const locationMap: Record<string, { name: string, distance: number, pids: Set<number>, slug: string }> = {};
    let unobtainableCount = 0;

    for (const pid of queryTargets) {
       const isFinite = !!STATIC_GIFT_DATA[pid];
       if (isFinite && myOtIds.has(pid)) continue;
       
       const gift = STATIC_GIFT_DATA[pid];
       if (saveData.eventFlags && gift?.eventFlag) {
          if ((saveData.eventFlags[Math.floor(gift.eventFlag / 8)] & (1 << (gift.eventFlag % 8))) !== 0) continue;
       }

       const encounters = apiData.missingEncounters[pid] || [];
       const logicReason = getUnobtainableReason(pid, displayVersion || 'red', ownedCount, ownedSet);
       if (logicReason) {
           suggestions.push({ id: `trade-${pid}`, category: 'Trade', title: `Trade Required: #${pid}`, description: logicReason, pokemonId: pid, priority: 60 - unobtainableCount });
           unobtainableCount++;
           continue;
       }

       let isCatchableSomewhere = encounters.some((enc: any) => 
          enc.version_details.some((vd: any) => vd.version.name === displayVersion)
       );

       if (!isCatchableSomewhere) {
          const aEncsMap = apiData.ancestralEncounters?.[pid] || {};
          for (const aid in aEncsMap) {
              if (aEncsMap[aid].some((enc: any) => 
                  enc.version_details.some((vd: any) => vd.version.name === displayVersion)
              )) {
                  isCatchableSomewhere = true;
                  break;
              }
          }
          
          if (!isCatchableSomewhere) {
              const chain = apiData.missingChains?.[pid];
              const baseId = chain ? parseInt(chain.chain.species.url.split('/').slice(-2, -1)[0]) : pid;
              const isInternalObtainable = [
                  1, 4, 7, // Gen 1 Starters
                  152, 155, 158, // Gen 2 Starters
                  131, 133, // Lapras, Eevee
                  138, 140, 142, // Fossils
                  106, 107, // Hitmons
                  143, 144, 145, 146, 150, // Gen 1 Legendaries/Snorlax
                  130, 185, 245, 249, 250, // Gen 2 Statics
              ].includes(baseId);
              
              if (isInternalObtainable) {
                  const isYellow = displayVersion === 'yellow';
                  const isRedBlueStarter = [1, 4, 7].includes(baseId);
                  if (isYellow && isRedBlueStarter) isCatchableSomewhere = true;
                  else if (isInternalObtainable) isCatchableSomewhere = true;
              }
          }
       }

       if (!isCatchableSomewhere && !ownedSet.has(pid)) {
           suggestions.push({ 
               id: `trade-${pid}`, category: 'Trade', title: `Version Exclusive: #${pid}`, 
               description: `This Pokémon is not available in ${displayVersion}. You must trade for it.`, 
               pokemonId: pid, priority: 50 - unobtainableCount 
           });
           unobtainableCount++;
           continue;
       }

       const versionEncounters = encounters.filter((enc: any) => 
          enc.version_details.some((vd: any) => vd.version.name === displayVersion)
       );

        for (const enc of versionEncounters) {
           const targetAreaSlug = enc.location_area.name;
           if (!locationMap[targetAreaSlug]) {
               const route = getDistanceToMap(saveData.currentMapId, targetAreaSlug);
               if (route) locationMap[targetAreaSlug] = { name: route.name, distance: route.distance, pids: new Set(), slug: targetAreaSlug };
           }
           if (locationMap[targetAreaSlug]) locationMap[targetAreaSlug].pids.add(pid);
        }
    }
    const locations = Object.values(locationMap as Record<string, any>).map(loc => ({ ...loc, yield: loc.pids.size }));
    const partyHasFly = saveData.partyDetails?.some(p => p.moves && p.moves.includes(19));
    locations.sort((a, b) => partyHasFly ? (b.yield !== a.yield ? b.yield - a.yield : a.distance - b.distance) : (a.distance !== b.distance ? a.distance - b.distance : b.yield - a.yield));
    locations.slice(0, 4).forEach(loc => {
        const pids = Array.from(loc.pids as Set<number>);
        const locEncounterInfo: Record<number, EncounterDetail[]> = {};
        
        pids.forEach(pid => {
            const pidEncounters = apiData.missingEncounters[pid] || [];
            const areaEncounter = pidEncounters.find((enc: any) => 
                enc.location_area.name === loc.slug && 
                enc.version_details.some((vd: any) => vd.version.name === displayVersion)
            );

            if (areaEncounter) {
                const versionDetail = areaEncounter.version_details.find((vd: any) => vd.version.name === displayVersion);
                if (versionDetail) {
                    locEncounterInfo[pid] = versionDetail.encounter_details.map((ed: any) => ({
                        chance: ed.chance,
                        method: ed.method.name,
                        minLevel: ed.min_level,
                        maxLevel: ed.max_level
                    }));
                }
            } else {
                // Check ancestral encounters if not found directly
                const aEncsMap = apiData.ancestralEncounters?.[pid] || {};
                for (const aid in aEncsMap) {
                    const ancestorAreaEncounter = aEncsMap[aid].find((enc: any) => 
                        enc.location_area.name === loc.slug && 
                        enc.version_details.some((vd: any) => vd.version.name === displayVersion)
                    );
                    if (ancestorAreaEncounter) {
                        const versionDetail = ancestorAreaEncounter.version_details.find((vd: any) => vd.version.name === displayVersion);
                        if (versionDetail) {
                            locEncounterInfo[pid] = versionDetail.encounter_details.map((ed: any) => ({
                                chance: ed.chance,
                                method: ed.method.name,
                                minLevel: ed.min_level,
                                maxLevel: ed.max_level
                            }));
                            break;
                        }
                    }
                }
            }
        });

        if (loc.distance === 0) {
            suggestions.push({
                id: `catch-loc-${loc.name}`, category: 'Catch', title: 'Catch Right Here',
                description: `Catch ${pids.length} missing Pokémon available at ${loc.name}.`,
                pokemonIds: pids, priority: 115,
                encounterInfo: locEncounterInfo
            });
            return;
        }
        suggestions.push({
            id: `catch-loc-${loc.name}`, category: 'Catch', title: `Travel to ${loc.name}`,
            description: partyHasFly ? `Use Fly to easily travel to ${loc.name} and catch ${pids.length} missing Pokémon!` : `Catch ${pids.length} missing Pokémon at ${loc.name}, only ${loc.distance === 1 ? '1 connection away' : `${loc.distance} connections away`}.`,
            pokemonIds: pids, priority: 80 + loc.yield - (partyHasFly ? 0 : loc.distance),
            encounterInfo: locEncounterInfo
        });
    });
  }

  // Gifts/Statics
  for (const [pidStr, gift] of Object.entries(STATIC_GIFT_DATA)) {
    const pid = parseInt(pidStr);
    if (gift.gen && gift.gen !== saveData.generation) continue;
    if (gift.name.includes('Yellow only') && displayVersion !== 'yellow') continue;
    if (gift.reason.includes('Crystal') && displayVersion !== 'crystal') continue;

    const familyIds = pid === 133 ? [133, 134, 135, 136] : 
                      pid === 138 ? [138, 139] : 
                      pid === 140 ? [140, 141] : 
                      pid === 147 ? [147, 148, 149] : 
                      [pid];
    
    const hasAnyFamily = familyIds.some(fid => ownedSet.has(fid));
    const hasAnyWithMyOT = familyIds.some(fid => myOtIds.has(fid));
    
    let isClaimedByEvent = false;
    if (saveData.eventFlags && gift.eventFlag) {
      isClaimedByEvent = (saveData.eventFlags[Math.floor(gift.eventFlag / 8)] & (1 << (gift.eventFlag % 8))) !== 0;
    }
    
    if (!isClaimedByEvent && !hasAnyWithMyOT && !hasAnyFamily && missingIds.includes(pid)) {
      suggestions.push({ id: `gift-${pid}`, category: 'Gift', title: `Secure Gift: ${gift.name}`, description: `Location: ${gift.location}. ${gift.reason}`, pokemonId: pid, priority: 85 });
    }
  }

  // Box Full
  if (saveData.generation === 1) {
    if (saveData.currentBoxCount >= 20) {
      suggestions.push({ id: 'utility-box-full', category: 'Utility', title: 'CRITICAL: PC Box Full!', description: 'Your current PC box is at 20/20. Switch boxes via Bill\'s PC.', priority: 150 });
    } else if (saveData.currentBoxCount >= 18) {
      suggestions.push({ id: 'utility-box-near-full', category: 'Utility', title: 'PC Box Almost Full', description: `${20 - saveData.currentBoxCount} slots remaining.`, priority: 95 });
    }
  }

  // Obedience
  const totalBadges = saveData.generation === 1 ? saveData.badges : (saveData.johtoBadges || 0) + (saveData.kantoBadges || 0);
  const caps = OBEDIENCE_CAPS.filter(c => totalBadges >= c.badges);
  const currentCap = caps.length > 0 ? caps[caps.length - 1].level : 10;
  const disobedient = saveData.partyDetails.filter(p => p.otName && p.otName !== saveData.trainerName && p.level > currentCap);
  if (disobedient.length > 0) {
    suggestions.push({ id: 'utility-obedience-danger', category: 'Utility', title: 'Obedience Danger!', description: `You have traded Pokémon above Lv. ${currentCap}. They may not obey you!`, priority: 110 });
  }

  // Evolutions
  saveData.partyDetails.forEach((p, idx) => {
    const chain = apiData.partyEvolutions?.[p.speciesId];
    if (!chain) return;

    const findInChain = (node: any): any => {
      const id = parseInt(node.species.url.split('/').slice(-2, -1)[0]);
      if (id === p.speciesId) return node;
      for (const child of node.evolves_to) {
        const res = findInChain(child);
        if (res) return res;
      }
      return null;
    };

    const currentNode = findInChain(chain.chain);
    if (currentNode && currentNode.evolves_to.length > 0) {
      currentNode.evolves_to.forEach((evoNode: any) => {
        const details = evoNode.evolution_details[0];
        if (!details) return;

        if (details.trigger.name === 'level-up' && details.min_level) {
          if (p.level >= details.min_level - 3) {
            const isReady = p.level >= details.min_level;
            suggestions.push({
              id: `evo-lvl-${p.speciesId}-${idx}`, category: 'Evolve', title: `Level Up Evolution`,
              description: isReady ? `Lv. ${p.level} is ready to evolve (needs Lv. ${details.min_level})!` : `Your Lv. ${p.level} Pokémon evolves at Lv. ${details.min_level}.`,
              pokemonId: p.speciesId, priority: isReady ? 90 : 75
            });
          }
        } else if (details.trigger.name === 'use-item') {
          const itemName = details.item.name;
          const isYellowStarterPikachu = displayVersion === 'yellow' && p.speciesId === 25 && p.otName === saveData.trainerName;
          if (isYellowStarterPikachu) return;

          const hasStone = saveData.inventory.some(i => i.id === (itemName.includes('fire') ? 32 : itemName.includes('thunder') ? 33 : itemName.includes('water') ? 34 : itemName.includes('leaf') ? 46 : 10)); 
          if (hasStone) suggestions.push({ id: `evo-stn-${p.speciesId}-${idx}`, category: 'Evolve', title: `Ready to Evolve!`, description: `Use ${itemName.replace('-', ' ')} on your Pokémon!`, pokemonId: p.speciesId, priority: 95 });
          else if (!itemName.includes('moon')) suggestions.push({ id: `evo-buy-${p.speciesId}-${idx}`, category: 'Evolve', title: `Buy ${itemName.replace('-', ' ')}`, description: `Visit Celadon Dept. Store to evolve your Pokémon.`, pokemonId: p.speciesId, priority: 40 });
        }
      });
    }
  });

  const uniqueSuggestions = Array.from(new Map(suggestions.map(item => [item.id, item])).values());
  uniqueSuggestions.sort((a, b) => b.priority - a.priority);
  return uniqueSuggestions;
}

export function useAssistant(saveData: SaveData | null, isLivingDex: boolean, manualVersion?: string | null) {
  const maxDex = saveData?.generation === 1 ? 151 : (saveData?.generation === 2 ? 251 : 0);
  const missingIds: number[] = [];
  const ownedSet = saveData ? (isLivingDex ? new Set([...saveData.party, ...saveData.pc]) : saveData.owned) : new Set<number>();
  if (saveData) {
    for (let i = 1; i <= maxDex; i++) {
        if (!ownedSet.has(i)) {
            if (saveData.generation === 1 && i === 150 && (saveData.hallOfFameCount || 0) === 0) continue;
            missingIds.push(i);
        }
    }
  }
  const queryTargetsSlice = missingIds.slice(0, 30);

  const { data: apiData, isLoading: isLoadingEncounters } = useQuery({
    queryKey: ['assistantData', saveData?.generation, saveData?.currentMapId, queryTargetsSlice.join(','), saveData?.party?.join(',')],
    queryFn: () => fetchAssistantApiData(saveData!, queryTargetsSlice),
    enabled: !!saveData,
  });

  const suggestions = generateSuggestions(saveData, isLivingDex, manualVersion, apiData);
  return { suggestions, isLoading: isLoadingEncounters };
}
