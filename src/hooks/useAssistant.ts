import { useQuery } from '@tanstack/react-query';
import { SaveData } from '../utils/saveParser';
import { pokeapi } from '../utils/pokeapi';
import { GEN1_MAP_TO_SLUG, GEN2_MAP_TO_SLUG, OBEDIENCE_CAPS, STATIC_GIFT_DATA } from '../utils/assistantData';
import { getDistanceToMap } from '../utils/mapGraphGen1';
import { getUnobtainableReason } from '../utils/versionExclusives';

export type SuggestionCategory = 'Catch' | 'Evolve' | 'Breed' | 'Progress' | 'Event' | 'Utility' | 'Trade' | 'Gift';

export interface Suggestion {
  id: string;
  category: SuggestionCategory;
  title: string;
  description: string;
  pokemonId?: number;
  pokemonIds?: number[]; 
  priority: number; 
}

export function useAssistant(saveData: SaveData | null, isLivingDex: boolean, manualVersion?: string | null) {
  
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

  const catchableMissingIds = missingIds.filter(pid => {
    if (saveData?.generation === 1) {
       return !getUnobtainableReason(pid, displayVersion || 'red', ownedCount, ownedSet);
    }
    return true; 
  });

  const queryTargets = catchableMissingIds.slice(0, 30); 

  const { data: apiData, isLoading: isLoadingEncounters } = useQuery({
    queryKey: ['assistantData', saveData?.generation, saveData?.currentMapId, queryTargets.join(','), saveData?.party?.join(',')],
    queryFn: async () => {
      if (!saveData) return null;
      
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
      const missingPromises = queryTargets.map(async (pid) => {
         try {
           const encs = await pokeapi.resource(`https://pokeapi.co/api/v2/pokemon/${pid}/encounters`);
           missingEncounters[pid] = encs;
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
      return { localEncounters, missingEncounters, partyEvolutions };
    },
    enabled: !!saveData,
  });

  const suggestions: Suggestion[] = [];
  if (!saveData) return { suggestions, isLoading: false };

  const totalBadges = saveData.generation === 1 
    ? saveData.badges 
    : (saveData.johtoBadges || 0) + (saveData.kantoBadges || 0);

  // A. GEN 1 / GEN 2 COMMON INTELLIGENCE
  if (saveData.generation === 1) {
    let localCatchFound = false;
    if (apiData?.localEncounters) {
      const localPids: number[] = [];
      for (const encounter of apiData.localEncounters) {
         const urlParts = encounter.pokemon.url.split('/');
         const pid = parseInt(urlParts[urlParts.length - 2]);
         const isValidVersion = encounter.version_details.some((vd: any) => vd.version.name === displayVersion);
         if (isValidVersion && missingIds.includes(pid)) localPids.push(pid);
      }
      if (localPids.length > 0) {
          suggestions.push({
            id: 'catch-local', category: 'Catch', title: 'Catch Right Here',
            description: `You are exactly where you need to be! There are ${localPids.length} missing Pokémon right here.`,
            pokemonIds: localPids, priority: 120
          });
          localCatchFound = true;
      }
    }

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
                if (route) locationMap[targetAreaSlug] = { name: route.name, distance: route.distance, pids: new Set() };
            }
            if (locationMap[targetAreaSlug]) locationMap[targetAreaSlug].pids.add(pid);
         }
      }
      const locations = Object.values(locationMap).map(loc => ({ ...loc, yield: loc.pids.size }));
      const partyHasFly = saveData.partyDetails?.some(p => p.moves && p.moves.includes(19));
      locations.sort((a, b) => partyHasFly ? (b.yield !== a.yield ? b.yield - a.yield : a.distance - b.distance) : (a.distance !== b.distance ? a.distance - b.distance : b.yield - a.yield));
      locations.slice(0, 4).forEach(loc => {
          const pids = Array.from(loc.pids);
          if (loc.distance === 0) {
              // Higher priority for stuff "right here" even if it's from the distance logic
              suggestions.push({
                  id: `catch-loc-${loc.name}`, category: 'Catch', title: 'Catch Right Here',
                  description: `Catch ${pids.length} missing Pokémon available at ${loc.name}.`,
                  pokemonIds: pids, priority: 115
              });
              return;
          }
          suggestions.push({
              id: `catch-loc-${loc.name}`, category: 'Catch', title: `Travel to ${loc.name}`,
              description: partyHasFly ? `Use Fly to easily travel to ${loc.name} and catch ${pids.length} missing Pokémon!` : `Catch ${pids.length} missing Pokémon at ${loc.name}, only ${loc.distance === 1 ? '1 connection away' : `${loc.distance} connections away`}.`,
              pokemonIds: pids, priority: 80 + loc.yield - (partyHasFly ? 0 : loc.distance)
          });
      });
    }

    let unobtainableCount = 0;
    for (const pid of missingIds) {
      if (unobtainableCount >= 4) break; 
      const reason = getUnobtainableReason(pid, displayVersion || 'red', ownedCount, ownedSet);
      if (reason) {
        suggestions.push({ id: `trade-${pid}`, category: 'Trade', title: `Trade Required: #${pid}`, description: reason, pokemonId: pid, priority: 60 - unobtainableCount });
        unobtainableCount++;
      }
    }

    // Gift/Statics
    for (const [pidStr, gift] of Object.entries(STATIC_GIFT_DATA)) {
      const pid = parseInt(pidStr);
      // Special logic for family: If they have any evolution, they likely got the gift
      const familyIds = pid === 133 ? [133, 134, 135, 136] : // Eevee family
                        pid === 138 ? [138, 139] : // Omanyte
                        pid === 140 ? [140, 141] : // Kabuto
                        pid === 147 ? [147, 148, 149] : // Dratini
                        [pid];
      
      const hasAnyFamily = familyIds.some(fid => ownedSet.has(fid));
      
      if (!hasAnyFamily && missingIds.includes(pid)) {
        suggestions.push({ id: `gift-${pid}`, category: 'Gift', title: `Secure Gift: ${gift.name}`, description: `Location: ${gift.location}. ${gift.reason}`, pokemonId: pid, priority: 85 });
      }
    }

    // Box Full
    if (saveData.currentBoxCount >= 20) {
      suggestions.push({ id: 'utility-box-full', category: 'Utility', title: 'CRITICAL: PC Box Full!', description: 'Your current PC box is at 20/20. Switch boxes via Bill\'s PC.', priority: 150 });
    } else if (saveData.currentBoxCount >= 18) {
      suggestions.push({ id: 'utility-box-near-full', category: 'Utility', title: 'PC Box Almost Full', description: `${20 - saveData.currentBoxCount} slots remaining.`, priority: 95 });
    }
  }

  // B. Evolutions, Obedience & Gen 2 Planning
  if (saveData) {
    // 1. Obedience Cap Monitor
    const caps = OBEDIENCE_CAPS.filter(c => totalBadges >= c.badges);
    const currentCap = caps.length > 0 ? caps[caps.length - 1].level : 10;
    const disobedient = saveData.partyDetails.filter(p => p.otName && p.otName !== saveData.trainerName && p.level > currentCap);
    const nearLimit = saveData.partyDetails.filter(p => p.otName && p.otName !== saveData.trainerName && p.level > currentCap - 5 && p.level <= currentCap);

    if (disobedient.length > 0) {
      suggestions.push({ id: 'utility-obedience-danger', category: 'Utility', title: 'Obedience Danger!', description: `You have traded Pokémon above Lv. ${currentCap}. They may not obey you!`, priority: 110 });
    } else if (nearLimit.length > 0) {
      const nextBadge = OBEDIENCE_CAPS.find(c => c.level > currentCap);
      suggestions.push({ id: 'utility-obedience-warn', category: 'Utility', title: 'Obedience Warning', description: `Limit: Lv. ${currentCap}. ${nextBadge ? `Defeat ${nextBadge.badges} gyms to raise it to Lv. ${nextBadge.level}.` : ''}`, priority: 70 });
    }

    // 2. Gen 2 Time Forecasting
    if (saveData.generation === 2) {
      const dayNames = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];
      const today = dayNames[new Date().getDay()];
      const events = [
        { day: 'Friday', title: 'Lapras in Union Cave', desc: 'Every Friday, a Lapras appears in the depths of Union Cave.' },
        { day: 'Tuesday', title: 'Bug-Catching Contest', desc: 'Compete in National Park for rare Bug Pokémon.' },
        { day: 'Thursday', title: 'Bug-Catching Contest', desc: 'Compete in National Park for rare Bug Pokémon.' },
        { day: 'Saturday', title: 'Bug-Catching Contest', desc: 'Compete in National Park for rare Bug Pokémon.' },
        { day: 'Monday', title: 'Mt. Moon Square', desc: 'Clefairy dance at night! Shop opens then.' },
      ];
      events.forEach(ev => {
        const isToday = ev.day === today;
        suggestions.push({
          id: `event-${ev.day}-${ev.title}`, category: 'Event',
          title: isToday ? `TODAY: ${ev.title}` : `UPCOMING: ${ev.title}`,
          description: isToday ? `${ev.desc} (Available Now!)` : `Planned for ${ev.day}. ${ev.desc}`,
          priority: isToday ? 90 : 30
        });
      });
    }

    // 3. Dynamic Evolution Logic (PokeAPI)
    saveData.partyDetails.forEach((p, idx) => {
      const chain = apiData?.partyEvolutions?.[p.speciesId];
      if (!chain) return;

      const findInChain = (node: any): any => {
        const urlParts = node.species.url.split('/');
        const id = parseInt(urlParts[urlParts.length - 2]);
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
            
            // Special Rule: Pikachu cannot evolve in Yellow if it's the player's starter
            const isYellowStarterPikachu = displayVersion === 'yellow' && p.speciesId === 25 && p.otName === saveData.trainerName;
            
            if (isYellowStarterPikachu) return;

            const hasStone = saveData.inventory.some(i => i.id === (itemName.includes('fire') ? 32 : itemName.includes('thunder') ? 33 : itemName.includes('water') ? 34 : itemName.includes('leaf') ? 46 : 10)); 
            if (hasStone) suggestions.push({ id: `evo-stn-${p.speciesId}-${idx}`, category: 'Evolve', title: `Ready to Evolve!`, description: `Use ${itemName.replace('-', ' ')} on your Pokémon!`, pokemonId: p.speciesId, priority: 95 });
            else if (!itemName.includes('moon')) suggestions.push({ id: `evo-buy-${p.speciesId}-${idx}`, category: 'Evolve', title: `Buy ${itemName.replace('-', ' ')}`, description: `Visit Celadon Dept. Store to evolve your Pokémon.`, pokemonId: p.speciesId, priority: 40 });
          }
        });
      }
    });
  }

  const uniqueSuggestions = Array.from(new Map(suggestions.map(item => [item.id, item])).values());
  uniqueSuggestions.sort((a, b) => b.priority - a.priority);
  return { suggestions: uniqueSuggestions, isLoading: isLoadingEncounters };
}
