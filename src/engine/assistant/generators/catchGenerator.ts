import { STATIC_GIFT_DATA as STATIC_GIFT_DATA_GEN1 } from '../../data/gen1/assistantData';
import { STATIC_GIFT_DATA as STATIC_GIFT_DATA_GEN2 } from '../../data/gen2/assistantData';
import { STATIC_GIFT_DATA as STATIC_GIFT_DATA_GEN3 } from '../../data/gen3/assistantData';
import type { SaveData } from '../../saveParser/index';
import { METHOD_NAMES } from '../constants';
import type { AssistantStrategy, EncounterDetail, Suggestion } from '../strategies/types';
import type { AssistantApiData } from '../suggestionEngineTypes';

/**
 * Evaluates wild Pokémon encounters and generates actionable catch suggestions.
 *
 * This function processes two primary categories of catches:
 * 1. **Local Catch:** Pokémon that can be encountered on the exact map the player is currently on.
 *    These receive the highest base priority (120).
 * 2. **Nearby Catch:** Pokémon found within 1-8 map transitions from the player's location.
 *    Priority scales inversely with distance (closer = higher priority), leveraging the
 *    strategy's graph traversal logic.
 *
 * It mutates the provided `suggestions` array and `localPids` set to avoid redundant
 * array allocations in the hot path.
 * This mutation-in-place pattern is a critical architectural optimization (O(1) memory)
 * that prevents the O(N) garbage collection overhead of allocating and merging massive
 * arrays during the hot path.
 *
 * @param apiData - Pre-fetched lookup data, containing location definitions and encounter rates.
 * @param displayVersionId - The numeric ID of the current game version (e.g. Red, Blue, Gold).
 * @param myOtIds - A set of species IDs the player physically caught (matching their Original Trainer ID), used to skip static gifts.
 * @param missingIds - A set of Pokémon IDs the player needs to obtain.
 * @param queryTargets - The top priority missing Pokémon IDs to evaluate.
 * @param saveData - The player's parsed save file, containing current location and badges.
 * @param strategy - Generation-specific logic for calculating map distances.
 * @param suggestions - The shared array where new catch suggestions are pushed in-place.
 * @param localPids - A shared set tracking Pokémon found locally, preventing redundant nearby checks.
 */
export function generateCatchSuggestions(
  apiData: AssistantApiData,
  displayVersionId: number,
  myOtIds: Set<number>,
  missingIds: Set<number>,
  queryTargets: number[],
  saveData: SaveData,
  strategy: AssistantStrategy,
  suggestions: Suggestion[],
  localPids: Set<number>,
) {
  // We group potential encounters by location to avoid spamming the user with separate
  // suggestions for every single Pokémon on Route 1. By aggregating them into one
  // "Catch X, Y, Z at Location" suggestion, we reduce UI clutter.
  // The 'locationsMap' uses a stringified key (areaId + method) to group identical contexts.
  // A. Catch logic (Local Map)
  // Highest priority (120) is given to Pokemon found on the exact same map the player is currently standing on.
  if (apiData.localEncounters && apiData.localEncounters.length > 0 && apiData.localAid) {
    const localAid = apiData.localAid;

    const localEncounterInfo: Record<number, EncounterDetail[]> = {};
    const staticGiftData =
      saveData.generation === 3
        ? STATIC_GIFT_DATA_GEN3
        : saveData.generation === 2
          ? STATIC_GIFT_DATA_GEN2
          : STATIC_GIFT_DATA_GEN1;

    for (const lae of apiData.localEncounters) {
      const pid = lae.pid;
      // ⚡ Bolt: Early exit to prevent processing if the pokemon is already owned or a static gift
      if (staticGiftData[pid] && myOtIds.has(pid)) continue;
      if (!missingIds.has(pid)) continue;

      // ⚡ Bolt: Replaced .filter() with a for loop to eliminate intermediate array allocations
      let hasRelevant = false;
      const details: EncounterDetail[] = [];

      for (let r = 0; r < lae.enc.length; r++) {
        const re = lae.enc[r];
        if (!re || re.aid !== localAid || re.v !== displayVersionId) continue;

        hasRelevant = true;
        for (let d = 0; d < re.d.length; d++) {
          const ed = re.d[d];
          if (!ed) continue;
          details.push({
            chance: ed.c,
            method: METHOD_NAMES[ed.m] || 'walk',
            minLevel: ed.min,
            maxLevel: ed.max,
            areaId: re.aid,
            time: ed.t,
          });
        }
      }

      if (hasRelevant) {
        localPids.add(pid);
        localEncounterInfo[pid] = details;
      }
    }

    if (localPids.size > 0) {
      suggestions.push({
        id: 'catch-local',
        category: 'Catch',
        title: 'Catch Right Here',
        description: `You are at ${saveData.currentMapName || 'your current location'}! There are ${localPids.size} missing Pokémon right here.`,
        pokemonIds: Array.from(localPids),
        priority: 120,
        encounterInfo: localEncounterInfo,
      });
    }
  }

  // A2. Nearby logic (1-8 areas away)
  // Distance is calculated via graph traversal in the generation's strategy.
  // Priority dynamically scales inversely with distance (closer = higher priority).
  const nearbyByArea = new Map<
    string,
    {
      dist: number;
      areaName: string;
      pids: Set<number>;
      encounterInfo: Record<number, EncounterDetail[]>;
    }
  >();

  for (const pid of queryTargets) {
    if (localPids.has(pid)) continue;

    const encData = apiData.missingEncounters[pid];
    if (!encData?.enc) continue;

    let bestDist = 999;
    let bestAreaName = '';
    // ⚡ Bolt: Store the best encounter reference and defer mapping EncounterDetails until after the loop
    // to prevent redundant array allocations and O(N) mapping operations for every missing Pokémon.
    let bestE: (typeof encData.enc)[0] | null = null;

    for (const e of encData.enc) {
      if (e.v !== displayVersionId) continue;

      const distInfo = strategy.getMapDistance(saveData.currentMapId, e.aid, apiData.allLocations);
      if (distInfo && distInfo.distance < bestDist) {
        bestDist = distInfo.distance;
        bestAreaName = distInfo.name;
        bestE = e;
      }
    }

    if (bestDist < 8 && bestE) {
      const areaId = bestE.aid;
      const bestDetails: EncounterDetail[] = [];
      for (let d = 0; d < bestE.d.length; d++) {
        const ed = bestE.d[d];
        if (!ed) continue;
        bestDetails.push({
          chance: ed.c,
          method: METHOD_NAMES[ed.m] || 'walk',
          minLevel: ed.min,
          maxLevel: ed.max,
          areaId,
          time: ed.t,
        });
      }

      const key = `${areaId}-${bestDist}`;
      let group = nearbyByArea.get(key);
      if (!group) {
        group = { dist: bestDist, areaName: bestAreaName, pids: new Set(), encounterInfo: {} };
        nearbyByArea.set(key, group);
      }
      group.pids.add(pid);
      group.encounterInfo[pid] = bestDetails;
    }
  }

  for (const [key, group] of nearbyByArea.entries()) {
    suggestions.push({
      id: `catch-nearby-${key}`,
      category: 'Catch',
      title: `Nearby: ${group.areaName}`,
      description: `Found ${group.pids.size} missing Pokémon at ${group.areaName} (${group.dist === 0 ? 'very close' : `${group.dist} areas away`}).`,
      pokemonIds: Array.from(group.pids),
      priority: Math.max(10, 110 - group.dist * 12),
      encounterInfo: group.encounterInfo,
    });
  }

  // C. Pre-evolution logic (Local & Nearby)
  // If the target itself cannot be found, check if a pre-evolution can be caught nearby.
  const preEvoNearbyByArea = new Map<
    string,
    {
      dist: number;
      areaName: string;
      targetPids: Set<number>;
      ancestorPids: Set<number>;
      encounterInfo: Record<number, EncounterDetail[]>;
    }
  >();

  for (const pid of queryTargets) {
    if (localPids.has(pid)) continue;

    const ancestralData = apiData.ancestralEncounters?.[pid];
    if (!ancestralData) continue;

    let bestDist = 999;
    let bestAreaName = '';
    let bestE: NonNullable<NonNullable<AssistantApiData['ancestralEncounters'][number]>[number]>['enc'][number] | null =
      null;
    let bestAncestorId: number | null = null;

    for (const ancestorIdStr in ancestralData) {
      const ancestorId = parseInt(ancestorIdStr, 10);
      const encData = ancestralData[ancestorId];
      if (!encData?.enc) continue;

      for (const e of encData.enc) {
        if (e.v !== displayVersionId) continue;

        const distInfo = strategy.getMapDistance(saveData.currentMapId, e.aid, apiData.allLocations);
        if (distInfo && distInfo.distance < bestDist) {
          bestDist = distInfo.distance;
          bestAreaName = distInfo.name;
          bestE = e;
          bestAncestorId = ancestorId;
        }
      }
    }

    if (bestDist < 8 && bestE && bestAncestorId) {
      const areaId = bestE.aid;
      const bestDetails: EncounterDetail[] = [];
      for (let d = 0; d < bestE.d.length; d++) {
        const ed = bestE.d[d];
        if (!ed) continue;
        bestDetails.push({
          chance: ed.c,
          method: METHOD_NAMES[ed.m] || 'walk',
          minLevel: ed.min,
          maxLevel: ed.max,
          areaId,
          time: ed.t,
        });
      }

      const key = `${areaId}-${bestDist}`;
      let group = preEvoNearbyByArea.get(key);
      if (!group) {
        group = {
          dist: bestDist,
          areaName: bestAreaName,
          targetPids: new Set(),
          ancestorPids: new Set(),
          encounterInfo: {},
        };
        preEvoNearbyByArea.set(key, group);
      }
      group.targetPids.add(pid);
      group.ancestorPids.add(bestAncestorId);
      group.encounterInfo[bestAncestorId] = bestDetails;
    }
  }

  for (const [key, group] of preEvoNearbyByArea.entries()) {
    // Only suggest pre-evolutions if the target itself isn't already suggested in the same area
    const nearbyGroup = nearbyByArea.get(key);
    let isFullyRedundant = true;
    for (const pid of group.targetPids) {
      if (!nearbyGroup?.pids.has(pid)) {
        isFullyRedundant = false;
        break;
      }
    }

    if (!isFullyRedundant) {
      suggestions.push({
        id: `catch-preevo-nearby-${key}`,
        category: 'Catch',
        title: `Nearby Pre-evolution: ${group.areaName}`,
        description: `Catch a pre-evolution at ${group.areaName} to evolve into #${Array.from(group.targetPids).join(', #')}.`,
        pokemonIds: Array.from(group.ancestorPids),
        priority: Math.max(5, 100 - group.dist * 12),
        encounterInfo: group.encounterInfo,
      });
    }
  }
}
