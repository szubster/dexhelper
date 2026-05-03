import { dexDataLoader } from '../../db/DexDataLoader';
import { pokeDB } from '../../db/PokeDB';
import {
  ENCOUNTER_METHOD,
  EVO_TRIGGER,
  type LocationAreaEncounters,
  POKE_VERSION_MAP,
  type PokemonMetadata,
  type UnifiedLocation,
} from '../../db/schema';
import { getGenerationConfig } from '../../utils/generationConfig';

const EVO_ITEM_NAMES: Record<number, string> = {
  80: 'Sun Stone',
  81: 'Moon Stone',
  82: 'Fire Stone',
  83: 'Thunder Stone',
  84: 'Water Stone',
  85: 'Leaf Stone',
  198: "King's Rock",
  210: 'Metal Coat',
  212: 'Dragon Scale',
  229: 'Up-Grade',
};

const POKEAPI_TO_GEN1_ITEM: Record<number, number> = {
  81: 0x0a, // Moon Stone
  82: 0x20, // Fire Stone
  83: 0x21, // Thunder Stone
  84: 0x22, // Water Stone
  85: 0x2f, // Leaf Stone
};

const POKEAPI_TO_GEN2_ITEM: Record<number, number> = {
  80: 0x11, // Sun Stone
  81: 0x08, // Moon Stone
  82: 0x16, // Fire Stone
  83: 0x17, // Thunder Stone
  84: 0x18, // Water Stone
  85: 0x22, // Leaf Stone
  198: 0x5a, // King's Rock
  210: 0x8f, // Metal Coat
  212: 0x82, // Dragon Scale
  229: 0xac, // Up-Grade
};

/**
 * Maps a modern PokeAPI evolution item ID to its corresponding internal item ID
 * for a specific game generation. This is necessary because Gen 1 and Gen 2 use
 * distinct hex values for items (e.g., Moon Stone is 0x0A in Gen 1, but 0x08 in Gen 2).
 *
 * @param pokeApiId - The item ID returned from the modern PokeAPI data source.
 * @param generation - The target game generation (1 or 2).
 * @returns The internal game item ID for the given generation, or the original ID as a fallback.
 */
function getGameItemId(pokeApiId: number, generation: number): number {
  if (generation === 1) return POKEAPI_TO_GEN1_ITEM[pokeApiId] || pokeApiId;
  if (generation === 2) return POKEAPI_TO_GEN2_ITEM[pokeApiId] || pokeApiId;
  return pokeApiId;
}

import { STATIC_GIFT_DATA, STATIC_NPC_TRADE_DATA } from '../data/gen1/assistantData';
import { getUnobtainableReason } from '../exclusives/gen1Exclusives';
import { getGen2UnobtainableReason } from '../exclusives/gen2Exclusives';
import type { PokemonInstance, SaveData } from '../saveParser/index';
import type { AssistantStrategy, EncounterDetail, RejectedSuggestion, Suggestion } from './strategies/types';

export interface AssistantApiData {
  localAid: number | null;
  localEncounters: LocationAreaEncounters[] | null;
  missingEncounters: Record<number, LocationAreaEncounters | null>;
  pokemonMetadata: Record<number, PokemonMetadata | null>;
  ancestralEncounters: Record<number, Record<number, LocationAreaEncounters | null>>;
  areaNames: Record<number, string>;
  allLocations: UnifiedLocation[];
}

import { getStrategy } from './strategies';

/**
 * Fetches all necessary background data from local IndexedDB to power the suggestion engine.
 *
 * @param saveData - The parsed save data containing the player's current state, inventory, and party.
 * @param queryTargets - An array of Pokemon IDs (Pokedex numbers) the engine is actively trying to find suggestions for.
 * @returns An object containing grouped maps, locations, encounters, and pokemon metadata required for the engine's synchronous pass.
 *
 * @remarks
 * This function handles database fetching, leveraging `DataLoader` (via `dexDataLoader`) for batched requests.
 * By pulling all structural, encounter, and metadata into a single memory object upfront, the `generateSuggestions`
 * function can execute purely synchronously without N+1 query overhead.
 */
export async function fetchAssistantApiData(saveData: SaveData, queryTargets: number[]) {
  const allLocations = await pokeDB.getLocations();

  const strategy = getStrategy(saveData.generation);
  const localAid = strategy ? strategy.resolveMapAid(saveData, allLocations) : null;

  const allEncounters = await pokeDB.getAllEncounters();
  const localEncounters = localAid ? allEncounters.filter((lae) => lae.enc.some((e) => e.aid === localAid)) : [];

  const missingEncounters: Record<number, LocationAreaEncounters | null> = {};
  const ancestralEncounters: Record<number, Record<number, LocationAreaEncounters | null>> = {};

  // ⚡ Bolt: Cache all encounters to a Map to prevent O(N) Array.find calls on every missing encounter lookup
  const encountersByPid = new Map(allEncounters.map((e) => [e.pid, e]));

  // Fill missingEncounters
  for (const pid of queryTargets) {
    const enc = encountersByPid.get(pid);
    if (enc) missingEncounters[pid] = enc;
  }

  // 1. Get all relevant Pokemon details (Target, Party, Gifts)
  const partyPids = saveData.party || [];
  const giftPids = Object.keys(STATIC_GIFT_DATA).map((id) => parseInt(id, 10));
  const allNeededPids = [...new Set([...queryTargets, ...partyPids, ...giftPids])];

  const allPokemon = await dexDataLoader.pokemon.loadMany(allNeededPids);
  const pokemonMetadata: Record<number, PokemonMetadata | null> = {};

  allNeededPids.forEach((pid, idx) => {
    const p = allPokemon[idx];
    pokemonMetadata[pid] = p && !(p instanceof Error) ? p : null;
  });

  return {
    localAid,
    localEncounters: localEncounters ?? null,
    missingEncounters,
    pokemonMetadata,
    ancestralEncounters,
    areaNames: Object.fromEntries(allLocations.map((a) => [a.id, a.n])),
    allLocations,
  };
}

/**
 * Checks if a specific bit flag is set within a continuous byte array.
 * Used primarily for validating whether in-game event flags (like catching a static encounter
 * or claiming a gift Pokémon) have been triggered in the player's save file.
 *
 * @param flags - The raw byte array extracted from the save file representing a block of event flags.
 * @param flagId - The specific zero-indexed bit ID to check.
 * @returns True if the bit is set (1), false if it is unset (0) or if the inputs are invalid.
 */
function checkFlag(flags: Uint8Array | undefined, flagId: number | undefined) {
  if (!flags || flagId === undefined) return false;
  const byteIndex = flagId >> 3;
  const bitIndex = flagId & 7;
  const byte = flags[byteIndex];
  if (byte === undefined) return false;
  return (byte & (1 << bitIndex)) !== 0;
}

const METHOD_NAMES: Record<number, string> = {
  [ENCOUNTER_METHOD.WALK]: 'walk',
  [ENCOUNTER_METHOD.SURF]: 'surf',
  [ENCOUNTER_METHOD.OLD_ROD]: 'old-rod',
  [ENCOUNTER_METHOD.GOOD_ROD]: 'good-rod',
  [ENCOUNTER_METHOD.SUPER_ROD]: 'super-rod',
  [ENCOUNTER_METHOD.GIFT]: 'gift',
  [ENCOUNTER_METHOD.ROCK_SMASH]: 'rock-smash',
  [ENCOUNTER_METHOD.HEADBUTT]: 'headbutt',
};

/**
 * Core recommendation algorithm for the Assistant.
 * Generates actionable suggestions (Catch, Trade, Evolve) for the player based on missing Pokemon.
 *
 * @param saveData - The parsed save file containing the player's inventory, current location, and party.
 * @param isLivingDex - If true, checks the box and party for the physical presence of a Pokemon rather than just the 'owned' dex flag.
 * @param manualVersion - An optional version string used to override the default display version.
 * @param apiData - The pre-fetched dataset produced by `fetchAssistantApiData`.
 * @param strategy - The generation-specific strategy implementation handling unique mechanics (e.g. Map IDs, special box warnings).
 * @returns An object containing an array of unique `Suggestion` objects sorted by priority descending, and a `debug` payload with rejected suggestions.
 *
 * @remarks
 * Priorities are assigned contextually:
 * - Local encounters (same map): ~120
 * - Evolutions ready to trigger (level reached, item owned): ~90-95
 * - Nearby encounters (1-8 areas away): Scales from ~110 down to ~14
 * - NPC Trades (missing offered Pokemon): ~65 (goes up to ~85 if offered Pokemon is owned)
 * - Exclusives / Unobtainables: ~10
 */
export function generateSuggestions(
  saveData: SaveData | null,
  isLivingDex: boolean,
  manualVersion: string | null | undefined,
  apiData: AssistantApiData | null,
  strategy: AssistantStrategy,
): { suggestions: Suggestion[]; debug: { rejected: RejectedSuggestion[] } } {
  const suggestions: Suggestion[] = [];
  const rejected: RejectedSuggestion[] = [];
  if (!saveData || !apiData) return { suggestions, debug: { rejected } };

  const genConfig = getGenerationConfig(saveData.generation);
  const maxDex = genConfig.maxDex;
  // ⚡ Bolt: Optimize O(n) array includes to O(1) Set has for missingIds and localPids
  const missingIds = new Set<number>();

  const ownedSet = isLivingDex
    ? new Set([...(saveData.party || []), ...(saveData.pc || [])])
    : saveData.owned || new Set<number>();

  const allInstances = [...(saveData.partyDetails || []), ...(saveData.pcDetails || [])];
  // ⚡ Bolt: Removed .filter().map() chain to prevent intermediate array allocations (O(N) -> O(1) memory overhead)
  const myOtIds = new Set<number>();
  for (let i = 0; i < allInstances.length; i++) {
    const p = allInstances[i];
    if (p && p.otName === saveData.trainerName) {
      myOtIds.add(p.speciesId);
    }
  }

  for (let i = 1; i <= maxDex; i++) {
    if (!ownedSet.has(i)) {
      if (saveData.generation === 1 && i === 150 && (saveData.hallOfFameCount || 0) === 0) {
        rejected.push({ pokemonId: i, reason: 'Hall of Fame count is 0. Mewtwo is locked.', code: 'HOF_LOCKED' });
        continue;
      }
      missingIds.add(i);
    }
  }

  const effectiveVersion = manualVersion || saveData.gameVersion;
  const displayVersion = effectiveVersion === 'unknown' ? genConfig.defaultVersion : effectiveVersion;
  const displayVersionId = POKE_VERSION_MAP[displayVersion] || 1;
  const queryTargets = Array.from(missingIds).slice(0, 100);

  // Special Strategy-Specific Suggestions (e.g. Box full warning)
  const specialSuggestions = strategy.getSpecialSuggestions(saveData, Array.from(missingIds));
  suggestions.push(...specialSuggestions);

  const localPids = new Set<number>();
  // A. Catch logic (Local Map)
  // Highest priority (120) is given to Pokemon found on the exact same map the player is currently standing on.
  if (apiData.localEncounters && apiData.localEncounters.length > 0 && apiData.localAid) {
    const localAid = apiData.localAid;

    const localEncounterInfo: Record<number, EncounterDetail[]> = {};

    for (const lae of apiData.localEncounters) {
      const pid = lae.pid;
      const relevantEncounters = lae.enc.filter((e) => e.aid === localAid && e.v === displayVersionId);
      if (relevantEncounters.length === 0) continue;

      if (STATIC_GIFT_DATA[pid] && myOtIds.has(pid)) continue;

      if (missingIds.has(pid)) {
        localPids.add(pid);
        localEncounterInfo[pid] = relevantEncounters.flatMap((re) =>
          re.d.map((ed) => ({
            chance: ed.c,
            method: METHOD_NAMES[ed.m] || 'walk',
            minLevel: ed.min,
            maxLevel: ed.max,
            aid: re.aid,
          })),
        );
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
      const aid = bestE.aid;
      const bestDetails: EncounterDetail[] = bestE.d.map((ed) => ({
        chance: ed.c,
        method: METHOD_NAMES[ed.m] || 'walk',
        minLevel: ed.min,
        maxLevel: ed.max,
        aid,
      }));

      suggestions.push({
        id: `catch-nearby-${pid}`,
        category: 'Catch',
        title: `Nearby: #${pid}`,
        description: `Found at ${bestAreaName} (${bestDist === 0 ? 'very close' : `${bestDist} areas away`}).`,
        pokemonId: pid,
        priority: Math.max(10, 110 - bestDist * 12),
        encounterInfo: { [pid]: bestDetails },
      });
    }
  }

  // Organize physical instances by species to check for evolutions and prevent redundant exclusive suggestions
  const instancesBySpecies = new Map<number, PokemonInstance[]>();
  for (const p of allInstances) {
    if (!instancesBySpecies.has(p.speciesId)) instancesBySpecies.set(p.speciesId, []);
    instancesBySpecies.get(p.speciesId)?.push(p);
  }

  // B. Unobtainable / Exclusive logic
  // Checks if the target is completely locked out of the current version (e.g. Red exclusives on Blue).
  // These are assigned the lowest base priority (10) since they require external action (link cable trades).
  const pidsWithExclusives = new Set<number>();
  for (const pid of queryTargets) {
    let reason: string | null = null;
    if (saveData.generation === 2) {
      reason = getGen2UnobtainableReason(pid, displayVersion, ownedSet.size, ownedSet);
    } else {
      reason = getUnobtainableReason(pid, displayVersion, ownedSet.size, ownedSet);
    }
    if (reason) {
      pidsWithExclusives.add(pid);

      const isNpcTrade = STATIC_NPC_TRADE_DATA.some(
        (t) =>
          t.receivedId === pid && t.gen === saveData.generation && (!t.versions || t.versions.includes(displayVersion)),
      );
      if (isNpcTrade) continue;

      // If they physically own a pre-evolution, they don't strictly need to trade, they can evolve it!
      const p = apiData.pokemonMetadata?.[pid];
      let hasPhysicalPreEvo = false;
      if (p?.efrm && p.efrm.length > 0) {
        hasPhysicalPreEvo = p.efrm.some((preId) => instancesBySpecies.has(preId));
      }
      if (hasPhysicalPreEvo) continue;

      suggestions.push({
        id: `exclusive-${pid}`,
        category: 'Trade',
        title: `Version Exclusive: #${pid}`,
        description: reason,
        pokemonId: pid,
        priority: 10,
      });
    }
  }

  // C. In-Game NPC Trades
  // Priority boosts if the player already physically possesses the required "offered" Pokemon (65 -> 85).
  for (const trade of STATIC_NPC_TRADE_DATA) {
    if (trade.gen !== saveData.generation) continue;
    if (trade.versions && !trade.versions.includes(displayVersion)) continue;
    if (!missingIds.has(trade.receivedId)) continue;

    if (trade.tradeIndex !== undefined && saveData.npcTradeFlags !== undefined) {
      const isClaimed = (saveData.npcTradeFlags & (1 << trade.tradeIndex)) !== 0;
      if (isClaimed) continue;
    }

    const hasOffered = ownedSet.has(trade.offeredId);
    suggestions.push({
      id: `npc-trade-${trade.receivedId}`,
      category: 'Trade',
      title: `Trade for #${trade.receivedId}`,
      description: hasOffered
        ? `You have #${trade.offeredId}! Trade it at ${trade.location} for #${trade.receivedId}.`
        : `Catch #${trade.offeredId} and trade it at ${trade.location} for #${trade.receivedId}.`,
      pokemonId: trade.receivedId,
      priority: hasOffered ? 85 : 65,
    });
  }

  // D. Static Gifts
  // Suggests available static encounters and gifts that haven't been claimed yet.
  for (const [idStr, gift] of Object.entries(STATIC_GIFT_DATA)) {
    const giftId = parseInt(idStr, 10);
    if (gift.gen && gift.gen !== saveData.generation) continue;
    if (!missingIds.has(giftId)) continue;

    const requiredBadges = gift.requiredBadges || 0;
    if (saveData.badges < requiredBadges) continue;

    const hasClaimed = checkFlag(saveData.eventFlags, gift.eventFlag);
    if (hasClaimed) continue;

    suggestions.push({
      id: `gift-${giftId}`,
      category: 'Gift',
      title: `Claim Gift: #${giftId}`,
      description: `Get ${gift.name} at ${gift.location} (${gift.reason}).`,
      pokemonId: giftId,
      priority: 85,
    });
  }

  // E. Evolutions
  // Evaluates the player's current boxes and party to find pre-evolutions.
  // Priority boosts significantly if the evolution criteria are actively met (e.g. required level reached, evolution stone in inventory).
  // F. Breeding (Gen 2 Only)
  if (saveData.generation === 2) {
    queryTargets.forEach((targetId: number) => {
      const p = apiData.pokemonMetadata?.[targetId];
      if (!p) return;

      // Check if we are missing a base Pokemon, but we own an evolution of it
      let canBreed = false;
      let evolutionIdToBreed: number | null = null;

      // Look at all evolutions of the target
      for (const evo of p.eto) {
        if (instancesBySpecies.has(evo.id)) {
          canBreed = true;
          evolutionIdToBreed = evo.id;
          break;
        }
      }

      if (canBreed && evolutionIdToBreed) {
        suggestions.push({
          id: `breed-${targetId}`,
          category: 'Breed',
          title: `Breed: #${targetId}`,
          description: `Leave your #${evolutionIdToBreed} at the Daycare to get an Egg!`,
          pokemonId: targetId,
          priority: 85,
        });
      }
    });
  }

  queryTargets.forEach((targetId: number) => {
    const p = apiData.pokemonMetadata?.[targetId];
    if (!p) return;

    const parentId = p.efrm[0];
    if (parentId === undefined) return;
    const ownedInstances = instancesBySpecies.get(parentId) || [];
    if (ownedInstances.length === 0) return;

    const details = p.det;
    if (!details || details.length === 0) return;

    for (const detail of details) {
      const tr = detail.tr;
      const min_l = detail.ml;
      const min_h = detail.mh;
      const item = detail.item;
      const held = detail.held;
      const tod = detail.time === 1 ? 'day' : detail.time === 2 ? 'night' : undefined;
      const rps = detail.rps;

      // Filter out Yellow Starter Pikachu as it refuses to evolve
      const evolvableInstances = ownedInstances.filter(
        (inst) => !(displayVersion === 'yellow' && parentId === 25 && inst.otName === saveData.trainerName),
      );

      if (evolvableInstances.length === 0) continue;

      let bestInstance = evolvableInstances[0];
      if (!bestInstance) continue;
      if (tr === EVO_TRIGGER.LEVEL_UP && min_h) {
        bestInstance = evolvableInstances.reduce((prev, current) =>
          (prev.friendship ?? 0) > (current.friendship ?? 0) ? prev : current,
        );
      } else {
        bestInstance = evolvableInstances.reduce((prev, current) => (prev.level > current.level ? prev : current));
      }

      if (tr === EVO_TRIGGER.LEVEL_UP) {
        if (min_l) {
          const isReady = bestInstance.level >= min_l;
          let rpsReq = '';
          if (rps === 1) rpsReq = ', Atk > Def';
          else if (rps === -1) rpsReq = ', Atk < Def';
          else if (rps === 0) rpsReq = ', Atk = Def';
          const specificReq = `(needs Lv. ${min_l}${rpsReq})`;

          suggestions.push({
            id: `evo-lvl-${targetId}`,
            category: 'Evolve',
            title: `Level Up Evolution: #${targetId}`,
            description: isReady
              ? `Your Lv. ${bestInstance.level} pre-evolution is ready to evolve ${specificReq}!`
              : `Your Lv. ${bestInstance.level} pre-evolution evolves at Lv. ${min_l} ${specificReq}.`,
            pokemonId: targetId,
            priority: isReady ? 90 : 75,
          });
        } else if (min_h) {
          const todMsg = tod ? ` during the ${tod}` : '';
          const isFriendlyEnough = bestInstance.friendship !== undefined && bestInstance.friendship >= min_h;
          const friendshipStatus =
            bestInstance.friendship !== undefined ? ` (${bestInstance.friendship}/${min_h})` : '';

          suggestions.push({
            id: `evo-happy-${targetId}`,
            category: 'Evolve',
            title: isFriendlyEnough ? `Ready to Evolve: #${targetId}!` : `Happiness Evolution: #${targetId}`,
            description: isFriendlyEnough
              ? `Your pre-evolution is friendly enough${friendshipStatus}! Level it up${todMsg} to evolve.`
              : `Level up your pre-evolution with high happiness${friendshipStatus} to evolve${todMsg}!`,
            pokemonId: targetId,
            priority: isFriendlyEnough ? 90 : 80,
          });
        }
      } else if (tr === EVO_TRIGGER.USE_ITEM && item) {
        const gameItemId = getGameItemId(item, saveData.generation);
        const hasStone = saveData.inventory.some((i) => i.id === gameItemId && i.quantity > 0);
        const itemName = EVO_ITEM_NAMES[item] || 'item';
        suggestions.push({
          id: `evo-item-${targetId}-${item}`,
          category: 'Evolve',
          title: hasStone ? `Ready to Evolve: #${targetId}!` : `Item Needed: #${targetId}`,
          description: hasStone ? `Use your ${itemName} to evolve it!` : `Find a ${itemName} to evolve it.`,
          pokemonId: targetId,
          priority: hasStone ? 95 : 40,
        });
      } else if (tr === EVO_TRIGGER.TRADE) {
        if (held) {
          const gameHeldId = getGameItemId(held, saveData.generation);
          const hasHeldItem = saveData.inventory.some((i) => i.id === gameHeldId && i.quantity > 0);
          const itemName = EVO_ITEM_NAMES[held] || 'item';
          suggestions.push({
            id: `evo-trade-held-${targetId}`,
            category: 'Evolve',
            title: hasHeldItem ? `Ready to Trade Evolve: #${targetId}!` : `Item Needed for Trade: #${targetId}`,
            description: hasHeldItem
              ? `Have your pre-evolution hold the ${itemName} and trade it to evolve!`
              : `Find a ${itemName}, have your pre-evolution hold it, and trade to evolve.`,
            pokemonId: targetId,
            priority: hasHeldItem ? 90 : 45,
          });
        } else {
          suggestions.push({
            id: `evo-trade-${targetId}`,
            category: 'Evolve',
            title: `Trade Evolution: #${targetId}`,
            description: `Trade your pre-evolution to evolve it!`,
            pokemonId: targetId,
            priority: 85,
          });
        }
      }
    }
  });

  // ⚡ Bolt: Eliminate O(N) array tuple allocation during suggestion deduplication
  const uniqueMap = new Map<string, Suggestion>();
  for (let i = 0; i < suggestions.length; i++) {
    const s = suggestions[i];
    if (s) {
      uniqueMap.set(s.id, s);
    }
  }
  const uniqueSuggestions = Array.from(uniqueMap.values());
  uniqueSuggestions.sort((a, b) => b.priority - a.priority);
  return { suggestions: uniqueSuggestions, debug: { rejected } };
}
