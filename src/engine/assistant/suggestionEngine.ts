import { getGenerationConfig } from '../../utils/generationConfig';
import { pokeapi } from '../../utils/pokeapi';
import { GEN1_MAP_TO_SLUG, OBEDIENCE_CAPS, STATIC_GIFT_DATA, STATIC_NPC_TRADE_DATA } from '../data/gen1/assistantData';
import { getUnobtainableReason } from '../exclusives/gen1Exclusives';
import { getDistanceToMap } from '../mapGraph/gen1Graph';
import type { PokemonInstance, SaveData } from '../saveParser/index';
import type { EncounterDetail, RejectedSuggestion, Suggestion } from './strategies/types';

/**
 * Helper function to find all ancestors of a target Pokemon ID in an evolution chain.
 */
function getAncestors(node: any, target: number, path: number[] = []): number[] | null {
  const id = parseInt(node.species.url.split('/').slice(-2, -1)[0], 10);
  if (id === target) {
    return path;
  }
  for (const child of node.evolves_to) {
    const result = getAncestors(child, target, [...path, id]);
    if (result) return result;
  }
  return null;
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
    // For Gen 2+, use a default slug (map graph is Gen 1-only for now)
    localSlug = 'new-bark-town-area';
  }

  let localEncounters: any[] = [];
  if (localSlug) {
    try {
      const areaData = await pokeapi.resource(`https://pokeapi.co/api/v2/location-area/${localSlug}`);
      localEncounters = areaData.pokemon_encounters || [];
    } catch (e) {
      console.error('Local area fetch failed', e);
    }
  }

  const missingEncounters: Record<number, any[]> = {};
  const missingChains: Record<number, any> = {};
  const ancestralEncounters: Record<number, Record<number, any[]>> = {};

  const missingPromises = queryTargets.map(async (pid: number) => {
    try {
      const [encs, species] = await Promise.all([
        pokeapi.resource(`https://pokeapi.co/api/v2/pokemon/${pid}/encounters`),
        pokeapi.resource(`https://pokeapi.co/api/v2/pokemon-species/${pid}`),
      ]);
      missingEncounters[pid] = encs;

      const chain = await pokeapi.resource(species.evolution_chain.url);
      missingChains[pid] = chain;
    } catch (_e) {
      missingEncounters[pid] = [];
    }
  });

  const partyEvolutions: Record<number, any> = {};
  const partyPromises = (saveData.party || []).map(async (pid: number) => {
    try {
      const species = await pokeapi.resource(`https://pokeapi.co/api/v2/pokemon-species/${pid}`);
      const chainUrl = species.evolution_chain.url;
      const chain = await pokeapi.resource(chainUrl);
      partyEvolutions[pid] = chain;
    } catch (e) {
      console.error('Evo fetch failed', pid, e);
    }
  });

  await Promise.all([...missingPromises, ...partyPromises]);

  const uniqueAncestors = new Set<number>();
  const pidAncestors: Record<number, number[]> = {};

  for (const pid of queryTargets) {
    if (missingChains[pid]) {
      const ancestors = getAncestors(missingChains[pid].chain, pid) || [];
      if (ancestors.length > 0) {
        pidAncestors[pid] = ancestors;
        ancestors.forEach((a) => uniqueAncestors.add(a));
      }
    }
  }

  const ancestorData: Record<number, any[]> = {};
  await Promise.all(
    Array.from(uniqueAncestors).map(async (aid) => {
      try {
        ancestorData[aid] = await pokeapi.resource(`https://pokeapi.co/api/v2/pokemon/${aid}/encounters`);
      } catch (_e) {
        ancestorData[aid] = [];
      }
    }),
  );

  for (const pid of queryTargets) {
    if (pidAncestors[pid]) {
      ancestralEncounters[pid] = {};
      for (const aid of pidAncestors[pid]) {
        ancestralEncounters[pid][aid] = ancestorData[aid] || [];
      }
    }
  }

  return {
    localEncounters,
    missingEncounters,
    missingChains,
    ancestralEncounters,
    partyEvolutions,
  };
}

/**
 * Pure logic function to generate suggestions based on save data and API data.
 * No React or Hook dependencies.
 */
export function generateSuggestions(
  saveData: SaveData | null,
  isLivingDex: boolean,
  manualVersion: string | null | undefined,
  apiData: any,
): { suggestions: Suggestion[]; debug: { rejected: RejectedSuggestion[] } } {
  const suggestions: Suggestion[] = [];
  const rejected: RejectedSuggestion[] = [];
  if (!saveData || !apiData) return { suggestions, debug: { rejected } };

  const genConfig = getGenerationConfig(saveData.generation);
  const maxDex = genConfig.maxDex;
  const missingIds: number[] = [];

  const ownedSet = isLivingDex
    ? new Set([...(saveData.party || []), ...(saveData.pc || [])])
    : saveData.owned || new Set<number>();

  const ownedCount = ownedSet.size;
  const allInstances = [...(saveData.partyDetails || []), ...(saveData.pcDetails || [])];
  const myOtIds = new Set(
    allInstances.filter((p) => p.otName === saveData.trainerName).map((p: PokemonInstance) => p.speciesId),
  );

  for (let i = 1; i <= maxDex; i++) {
    if (!ownedSet.has(i)) {
      if (saveData.generation === 1 && i === 150 && (saveData.hallOfFameCount || 0) === 0) {
        rejected.push({
          pokemonId: i,
          reason: 'Hall of Fame count is 0. Mewtwo is locked.',
          code: 'HOF_LOCKED',
        });
        continue;
      }
      missingIds.push(i);
    }
  }

  const effectiveVersion = manualVersion || saveData.gameVersion;
  const displayVersion = effectiveVersion === 'unknown' ? genConfig.defaultVersion : effectiveVersion;
  const queryTargets = missingIds.slice(0, 100);

  const _localSlug = saveData.generation === 1 ? GEN1_MAP_TO_SLUG[saveData.currentMapId] || '' : 'new-bark-town-area';

  // A. Catch logic
  if (apiData.localEncounters) {
    const localPids: number[] = [];
    const localEncounterInfo: Record<number, EncounterDetail[]> = {};

    for (const encounter of apiData.localEncounters) {
      const urlParts = encounter.pokemon.url.split('/');
      const pid = parseInt(urlParts[urlParts.length - 2], 10);

      const isFinite = !!STATIC_GIFT_DATA[pid];
      if (isFinite && myOtIds.has(pid)) {
        rejected.push({
          pokemonId: pid,
          reason: 'You already own this one-time gift (matched by Trainer Name).',
          code: 'GIFT_CLAIMED',
        });
        continue;
      }

      const gift = STATIC_GIFT_DATA[pid];
      if (saveData.eventFlags && gift?.eventFlag) {
        if ((saveData.eventFlags[Math.floor(gift.eventFlag / 8)]! & (1 << (gift.eventFlag % 8))) !== 0) {
          rejected.push({
            pokemonId: pid,
            reason: `Event flag ${gift.eventFlag} is set. Gift already claimed.`,
            code: 'GIFT_CLAIMED',
          });
          continue;
        }
      }

      const versionDetail = encounter.version_details.find((vd: any) => vd.version.name === displayVersion);
      if (versionDetail && missingIds.includes(pid)) {
        localPids.push(pid);
        localEncounterInfo[pid] = versionDetail.encounter_details.map((ed: any) => ({
          chance: ed.chance,
          method: ed.method.name,
          minLevel: ed.min_level,
          maxLevel: ed.max_level,
        }));
      }
    }
    if (localPids.length > 0) {
      const areaName = saveData.currentMapName || 'where you need to be';
      suggestions.push({
        id: 'catch-local',
        category: 'Catch',
        title: 'Catch Right Here',
        description: `You are exactly ${areaName}! There are ${localPids.length} missing Pokémon right here.`,
        pokemonIds: localPids,
        priority: 120,
        encounterInfo: localEncounterInfo,
      });
    }
  }

  if (apiData.missingEncounters) {
    const locationMap: Record<
      string,
      {
        name: string;
        distance: number;
        pids: Set<number>;
        slug: string;
        encounterMap: Map<number, EncounterDetail[]>;
      }
    > = {};
    let unobtainableCount = 0;

    for (const pid of queryTargets) {
      const isFinite = !!STATIC_GIFT_DATA[pid];
      if (isFinite && myOtIds.has(pid)) continue;

      const gift = STATIC_GIFT_DATA[pid];
      if (saveData.eventFlags && gift?.eventFlag) {
        if ((saveData.eventFlags[Math.floor(gift.eventFlag / 8)]! & (1 << (gift.eventFlag % 8))) !== 0) continue;
      }

      const encounters = apiData.missingEncounters[pid] || [];
      const logicReason = getUnobtainableReason(pid, displayVersion || 'red', ownedCount, ownedSet);
      if (logicReason) {
        rejected.push({ pokemonId: pid, reason: logicReason, code: 'CHOICE_TAKEN' });
        suggestions.push({
          id: `trade-${pid}`,
          category: 'Trade',
          title: `Trade Required: #${pid}`,
          description: logicReason,
          pokemonId: pid,
          priority: 60 - unobtainableCount,
          debugInfo: {
            priorityScore: 60 - unobtainableCount,
            reasoning: 'Explicit unobtainable logic rule',
          },
        });
        unobtainableCount++;
        continue;
      }

      let isCatchableSomewhere = encounters.some((enc: any) =>
        enc.version_details.some((vd: any) => vd.version.name === displayVersion),
      );

      if (!isCatchableSomewhere) {
        const aEncsMap = apiData.ancestralEncounters?.[pid] || {};
        for (const aid in aEncsMap) {
          if (
            aEncsMap[aid].some((enc: any) => enc.version_details.some((vd: any) => vd.version.name === displayVersion))
          ) {
            isCatchableSomewhere = true;
            break;
          }
        }

        if (!isCatchableSomewhere) {
          const chain = apiData.missingChains?.[pid];
          const baseId = chain ? parseInt(chain.chain.species.url.split('/').slice(-2, -1)[0], 10) : pid;
          const isInternalObtainable = [
            1,
            4,
            7, // Gen 1 Starters
            152,
            155,
            158, // Gen 2 Starters
            131,
            133, // Lapras, Eevee
            138,
            140,
            142, // Fossils
            106,
            107, // Hitmons
            143,
            144,
            145,
            146,
            150, // Gen 1 Legendaries/Snorlax
            130,
            185,
            245,
            249,
            250, // Gen 2 Statics
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
        // Suppress version exclusive if it can be obtained via NPC trade or Gift
        const isTradeAvailable = STATIC_NPC_TRADE_DATA.some(
          (t) =>
            t.gen === saveData.generation &&
            t.receivedId === pid &&
            (!t.versions || t.versions.includes(displayVersion)),
        );

        const giftEntry = STATIC_GIFT_DATA[pid];
        const hasDirectGift =
          !!giftEntry &&
          (!giftEntry.gen || giftEntry.gen === saveData.generation) &&
          (!giftEntry.name.includes('Yellow only') || displayVersion === 'yellow');

        if (!isTradeAvailable && !hasDirectGift) {
          rejected.push({
            pokemonId: pid,
            reason: `Not catchable in ${displayVersion} version.`,
            code: 'VERSION_EXCLUSIVE',
          });
          suggestions.push({
            id: `trade-${pid}`,
            category: 'Trade',
            title: `Version Exclusive: #${pid}`,
            description: `This Pokémon is not available in ${displayVersion}. You must trade for it.`,
            pokemonId: pid,
            priority: 50 - unobtainableCount,
            debugInfo: {
              priorityScore: 50 - unobtainableCount,
              reasoning: 'Version exclusivity check',
            },
          });
          unobtainableCount++;
          continue;
        }
      }

      const versionEncounters = encounters.filter((enc: any) =>
        enc.version_details.some((vd: any) => vd.version.name === displayVersion),
      );

      for (const enc of versionEncounters) {
        const targetAreaSlug = enc.location_area.name;
        if (!locationMap[targetAreaSlug]) {
          const route = getDistanceToMap(saveData.currentMapId, targetAreaSlug);
          if (route)
            locationMap[targetAreaSlug] = {
              name: route.name,
              distance: route.distance,
              pids: new Set(),
              slug: targetAreaSlug,
              encounterMap: new Map(),
            };
        }
        if (locationMap[targetAreaSlug]) {
          locationMap[targetAreaSlug].pids.add(pid);
          const versionDetail = enc.version_details.find((vd: any) => vd.version.name === displayVersion);
          if (versionDetail) {
            locationMap[targetAreaSlug].encounterMap.set(
              pid,
              versionDetail.encounter_details.map((ed: any) => ({
                chance: ed.chance,
                method: ed.method.name,
                minLevel: ed.min_level,
                maxLevel: ed.max_level,
              })),
            );
          }
        }
      }
    }
    const locations = Object.values(locationMap as Record<string, any>).map((loc) => ({
      ...loc,
      yield: loc.pids.size,
    }));
    const partyHasFly = saveData.partyDetails?.some((p: PokemonInstance) => p.moves && p.moves.includes(19));
    locations.sort((a, b) =>
      partyHasFly
        ? b.yield !== a.yield
          ? b.yield - a.yield
          : a.distance - b.distance
        : a.distance !== b.distance
          ? a.distance - b.distance
          : b.yield - a.yield,
    );
    locations.slice(0, 4).forEach((loc) => {
      const pids = Array.from(loc.pids as Set<number>);
      const locEncounterInfo: Record<number, EncounterDetail[]> = {};

      pids.forEach((pid) => {
        const mappedEncounter = loc.encounterMap.get(pid);
        if (mappedEncounter) {
          locEncounterInfo[pid] = mappedEncounter;
        } else {
          // Check ancestral encounters if not found directly
          const aEncsMap = apiData.ancestralEncounters?.[pid] || {};
          for (const aid in aEncsMap) {
            const ancestorAreaEncounter = aEncsMap[aid].find(
              (enc: any) =>
                enc.location_area.name === loc.slug &&
                enc.version_details.some((vd: any) => vd.version.name === displayVersion),
            );
            if (ancestorAreaEncounter) {
              const versionDetail = ancestorAreaEncounter.version_details.find(
                (vd: any) => vd.version.name === displayVersion,
              );
              if (versionDetail) {
                locEncounterInfo[pid] = versionDetail.encounter_details.map((ed: any) => ({
                  chance: ed.chance,
                  method: ed.method.name,
                  minLevel: ed.min_level,
                  maxLevel: ed.max_level,
                }));
                break;
              }
            }
          }
        }
      });

      if (loc.distance === 0) {
        // This is already handled by the localEncounters block at the top with higher priority
        return;
      }
      suggestions.push({
        id: `catch-loc-${loc.name}`,
        category: 'Catch',
        title: `Travel to ${loc.name}`,
        description: partyHasFly
          ? `Use Fly to easily travel to ${loc.name} and catch ${pids.length} missing Pokémon!`
          : `Catch ${pids.length} missing Pokémon at ${loc.name}, only ${loc.distance === 1 ? '1 connection away' : `${loc.distance} connections away`}.`,
        pokemonIds: pids,
        priority: 80 + loc.yield - (partyHasFly ? 0 : loc.distance),
        encounterInfo: locEncounterInfo,
      });
    });
  }

  // NPC Trades
  for (const trade of STATIC_NPC_TRADE_DATA) {
    if (trade.gen !== saveData.generation) continue;
    if (trade.versions && !trade.versions.includes(displayVersion)) continue;

    let isClaimed = false;

    // Gen 1 specific bit flag check
    if (saveData.generation === 1 && trade.tradeIndex !== undefined && saveData.npcTradeFlags !== undefined) {
      isClaimed = (saveData.npcTradeFlags & (1 << trade.tradeIndex)) !== 0;
    } else {
      // Fallback for Gen 2 or if bit flags are missing
      isClaimed = allInstances.some(
        (p: PokemonInstance) => p.speciesId === trade.receivedId && p.otName === trade.receivedOtName,
      );
    }

    if (!isClaimed && missingIds.includes(trade.receivedId)) {
      const hasOffered = ownedSet.has(trade.offeredId);
      if (hasOffered) {
        suggestions.push({
          id: `npc-trade-${trade.receivedId}`,
          category: 'Trade',
          title: `Trade for #${trade.receivedId}`,
          description: `You have #${trade.offeredId}! Trade it at ${trade.location} for #${trade.receivedId}.`,
          pokemonId: trade.receivedId,
          priority: 85,
        });
      } else {
        suggestions.push({
          id: `npc-trade-${trade.receivedId}`,
          category: 'Trade',
          title: `Trade for #${trade.receivedId}`,
          description: `Catch #${trade.offeredId} and trade it at ${trade.location} for #${trade.receivedId}.`,
          pokemonId: trade.receivedId,
          priority: 65,
        });
      }
    }
  }

  // Gifts/Statics
  for (const [pidStr, gift] of Object.entries(STATIC_GIFT_DATA)) {
    const pid = parseInt(pidStr, 10);
    if (gift.gen && gift.gen !== saveData.generation) continue;
    if (gift.name.includes('Yellow only') && displayVersion !== 'yellow') continue;
    if (gift.reason.includes('Crystal') && displayVersion !== 'crystal') continue;

    const familyIds =
      pid === 133
        ? [133, 134, 135, 136]
        : pid === 138
          ? [138, 139]
          : pid === 140
            ? [140, 141]
            : pid === 147
              ? [147, 148, 149]
              : [pid];

    const hasAnyFamily = familyIds.some((fid) => ownedSet.has(fid));
    const hasAnyWithMyOT = familyIds.some((fid) => myOtIds.has(fid));

    let isClaimedByEvent = false;
    if (saveData.eventFlags && gift.eventFlag) {
      isClaimedByEvent = (saveData.eventFlags[Math.floor(gift.eventFlag / 8)]! & (1 << (gift.eventFlag % 8))) !== 0;
    }

    if (!isClaimedByEvent && !hasAnyWithMyOT && !hasAnyFamily && missingIds.includes(pid)) {
      suggestions.push({
        id: `gift-${pid}`,
        category: 'Gift',
        title: `Secure Gift: ${gift.name}`,
        description: `Location: ${gift.location}. ${gift.reason}`,
        pokemonId: pid,
        priority: 85,
      });
    }
  }

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
  const currentCap = caps.length > 0 ? caps[caps.length - 1]!.level : 10;
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

  // Evolutions
  saveData.partyDetails.forEach((p: PokemonInstance, idx: number) => {
    const chain = apiData.partyEvolutions?.[p.speciesId];
    if (!chain) return;

    const findInChain = (node: any): any => {
      const id = parseInt(node.species.url.split('/').slice(-2, -1)[0], 10);
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
        const evoId = parseInt(evoNode.species.url.split('/').slice(-2, -1)[0], 10);
        if (ownedSet.has(evoId)) {
          rejected.push({
            pokemonId: evoId,
            reason: 'Already own evolved form',
            code: 'EVO_ALREADY_OWNED',
          });
          return;
        }

        const details = evoNode.evolution_details[0];
        if (!details) return;

        if (details.trigger.name === 'level-up' && details.min_level) {
          if (p.level >= details.min_level - 3) {
            const isReady = p.level >= details.min_level;
            suggestions.push({
              id: `evo-lvl-${p.speciesId}-${idx}`,
              category: 'Evolve',
              title: `Level Up Evolution`,
              description: isReady
                ? `Lv. ${p.level} is ready to evolve (needs Lv. ${details.min_level})!`
                : `Your Lv. ${p.level} Pokémon evolves at Lv. ${details.min_level}.`,
              pokemonId: p.speciesId,
              priority: isReady ? 90 : 75,
            });
          }
        } else if (details.trigger.name === 'use-item') {
          const itemName = details.item.name;
          const isYellowStarterPikachu =
            displayVersion === 'yellow' && p.speciesId === 25 && p.otName === saveData.trainerName;
          if (isYellowStarterPikachu) return;

          const hasStone = saveData.inventory.some(
            (i: any) =>
              i.id ===
              (itemName.includes('fire')
                ? 32
                : itemName.includes('thunder')
                  ? 33
                  : itemName.includes('water')
                    ? 34
                    : itemName.includes('leaf')
                      ? 46
                      : 10),
          );
          if (hasStone)
            suggestions.push({
              id: `evo-stn-${p.speciesId}-${idx}`,
              category: 'Evolve',
              title: `Ready to Evolve!`,
              description: `Use ${itemName.replace('-', ' ')} on your Pokémon!`,
              pokemonId: p.speciesId,
              priority: 95,
            });
          else if (!itemName.includes('moon'))
            suggestions.push({
              id: `evo-buy-${p.speciesId}-${idx}`,
              category: 'Evolve',
              title: `Buy ${itemName.replace('-', ' ')}`,
              description: `Visit Celadon Dept. Store to evolve your Pokémon.`,
              pokemonId: p.speciesId,
              priority: 40,
            });
        } else if (details.trigger.name === 'trade') {
          if (details.held_item) {
            suggestions.push({
              id: `evo-trade-${p.speciesId}-${idx}`,
              category: 'Evolve',
              title: `Trade to Evolve!`,
              description: `Trade this Pokémon while holding ${details.held_item.name.replace('-', ' ')} to trigger its evolution.`,
              pokemonId: p.speciesId,
              priority: 80,
            });
          } else {
            suggestions.push({
              id: `evo-trade-${p.speciesId}-${idx}`,
              category: 'Evolve',
              title: `Trade to Evolve!`,
              description: `Trade this Pokémon to trigger its evolution.`,
              pokemonId: p.speciesId,
              priority: 80,
            });
          }
        }
      });
    }
  });

  const uniqueSuggestions = Array.from(new Map(suggestions.map((item) => [item.id, item])).values());
  uniqueSuggestions.sort((a, b) => b.priority - a.priority);
  return { suggestions: uniqueSuggestions, debug: { rejected } };
}
