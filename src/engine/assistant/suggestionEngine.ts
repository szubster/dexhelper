/**
 * @module suggestionEngine
 *
 * The Suggestion Engine is the core recommendation system for DexHelper. It analyzes
 * a player's save file state and provides actionable, context-aware suggestions for
 * obtaining missing Pokémon (e.g., catching, evolving, trading, breeding).
 *
 * ## Architecture Overview
 *
 * 1. **Data Orchestration (`fetchAssistantApiData`)**:
 *    Instead of relying on N+1 database queries during rendering, the engine pre-fetches
 *    all required mappings, locations, and encounter tables via `DexDataLoader`.
 *    This ensures that the massive suggestion generation loop runs entirely synchronously.
 *
 * 2. **Strategy Pattern (`AssistantStrategy`)**:
 *    Because Generation 1 and Generation 2 games have drastically different mechanics
 *    (e.g., Breeding, Held Items, Time of Day, Roaming Legendaries), the core loop
 *    delegates generation-specific logic to a Strategy object. This prevents the
 *    main engine from being littered with `if (gen === 1)` branches.
 *
 * 3. **Performance & O(1) Lookups**:
 *    Evaluating hundreds of Pokémon across thousands of encounters can block the main UI thread.
 *    To mitigate this, the engine strictly uses `Set` and `Map` structures for lookups
 *    (e.g., `missingIds`, `myOtIds`, `instancesBySpecies`).
 *    Additionally, declarative array methods like `.filter().map()` are often replaced with
 *    manual `for` loops to prevent intermediate array allocations and reduce garbage collection overhead.
 *
 * 4. **Priority Ranking**:
 *    Suggestions are not just a list; they are ranked by priority.
 *    - `100-90`: Immediate, guaranteed actions (e.g., Ready to evolve with a stone in bag).
 *    - `89-70`: Local map encounters (player is standing right there).
 *    - `69-50`: High-probability encounters or nearby maps.
 *    - `<50`: Long-term goals, breeding, or low-encounter-rate grinds.
 */
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

// ⚡ Bolt: Eliminate O(N) tuple allocation and string parsing by pre-calculating static gift arrays
const STATIC_GIFT_PIDS = Object.keys(STATIC_GIFT_DATA).map((id) => parseInt(id, 10));
const STATIC_GIFT_ENTRIES = Object.entries(STATIC_GIFT_DATA).map(([idStr, gift]) => ({
  giftId: parseInt(idStr, 10),
  gift,
}));

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

  let localPids: number[] = [];
  if (localAid) {
    for (let i = 0; i < allLocations.length; i++) {
      const loc = allLocations[i];
      if (loc && loc.id === localAid) {
        localPids = loc.pids || [];
        break;
      }
    }
  }

  // ⚡ Bolt: Avoid N+1 and massive O(N) overhead by bulk querying specific ids instead of getAll
  const targetPids = [...new Set([...queryTargets, ...localPids])];
  const targetEncounters = await pokeDB.getEncountersBulk(targetPids);

  const localEncounters: LocationAreaEncounters[] = [];
  const missingEncounters: Record<number, LocationAreaEncounters | null> = {};
  const ancestralEncounters: Record<number, Record<number, LocationAreaEncounters | null>> = {};

  const encountersByPid = new Map<number, LocationAreaEncounters>();
  for (let i = 0; i < targetEncounters.length; i++) {
    const e = targetEncounters[i];
    if (e && !(e instanceof Error)) encountersByPid.set(e.pid, e);
  }

  if (localAid) {
    for (let i = 0; i < localPids.length; i++) {
      const pid = localPids[i];
      if (pid === undefined) continue;
      const lae = encountersByPid.get(pid);
      if (!lae) continue;
      const enc = lae.enc;
      for (let j = 0; j < enc.length; j++) {
        const e = enc[j];
        if (e && e.aid === localAid) {
          localEncounters.push(lae);
          break;
        }
      }
    }
  }

  for (let i = 0; i < queryTargets.length; i++) {
    const pid = queryTargets[i];
    if (pid === undefined) continue;
    const enc = encountersByPid.get(pid);
    if (enc) missingEncounters[pid] = enc;
  }

  // 1. Get all relevant Pokemon details (Target, Party, Gifts)
  const partyPids = saveData.party || [];
  const giftPids = STATIC_GIFT_PIDS;
  const allNeededPids = [...new Set([...queryTargets, ...partyPids, ...giftPids])];

  const allPokemon = await dexDataLoader.pokemon.loadMany(allNeededPids);
  const pokemonMetadata: Record<number, PokemonMetadata | null> = {};

  allNeededPids.forEach((pid, idx) => {
    const p = allPokemon[idx];
    pokemonMetadata[pid] = p && !(p instanceof Error) ? p : null;
  });

  // ⚡ Bolt: Removed Object.fromEntries(map(...)) chain to prevent intermediate array allocations (O(N) -> O(1) memory overhead)
  const areaNames: Record<number, string> = {};
  for (let i = 0; i < allLocations.length; i++) {
    const loc = allLocations[i];
    if (loc) areaNames[loc.id] = loc.n;
  }

  return {
    localAid,
    localEncounters: localEncounters ?? null,
    missingEncounters,
    pokemonMetadata,
    ancestralEncounters,
    areaNames,
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
 * Aggregates data from the player's save file, Pokédex completion status, and geographic location to generate context-aware suggestions for catching, evolving, or trading Pokémon.
 *
 * @param saveData - The parsed save file containing the player's inventory, current location, and party.
 * @param isLivingDex - If true, checks the box and party for the physical presence of a Pokemon rather than just the 'owned' dex flag.
 * @param manualVersion - An optional version string used to override the default display version.
 * @param apiData - The pre-fetched dataset produced by `fetchAssistantApiData`.
 * @param strategy - The generation-specific strategy implementation handling unique mechanics (e.g. Map IDs, special box warnings).
 * @returns An object containing an array of unique `Suggestion` objects sorted by priority descending, and a `debug` payload with rejected suggestions.
 *
 * @remarks
 * **Prioritization Logic:**
 * Priorities determine the order suggestions appear to the user. Higher priorities (>= 90) represent immediately actionable steps or very close geographical proximity. Lower priorities require more effort or travel.
 * - **120+ (Catch - Local):** Pokémon available on the exact map the player is currently standing on.
 * - **90-95 (Evolve - Ready):** Pre-evolutions in the party/PC that have met all conditions (e.g., reached target level, player possesses required evolution stone).
 * - **85 (Trade/Gift - Ready):** NPC trades where the player already owns the requested Pokémon, or static gifts that are unclaimed and prerequisites met.
 * - **14-110 (Catch - Nearby):** Pokémon available 1 to 8 map areas away. Priority scales inversely with distance (closer maps score higher).
 * - **65-80 (Evolve/Trade - Pending):** Pre-evolutions needing more levels/friendship, or NPC trades where the player must first catch the requested Pokémon.
 * - **10 (Unobtainable):** Version exclusives or choice-locked Pokémon (e.g., fossils) requiring link cable trades.
 *
 * **Categories Executed:**
 * A. Catch logic (Local & Nearby via Graph Traversal)
 * B. Unobtainable / Exclusive logic
 * C. In-Game NPC Trades
 * D. Static Gifts
 * E. Evolutions (Level, Item, Happiness, Trade)
 * F. Breeding (Gen 2 Only)
 */

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
function generateCatchSuggestions(
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

    for (const lae of apiData.localEncounters) {
      const pid = lae.pid;
      // ⚡ Bolt: Early exit to prevent processing if the pokemon is already owned or a static gift
      if (STATIC_GIFT_DATA[pid] && myOtIds.has(pid)) continue;
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
            aid: re.aid,
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
      const bestDetails: EncounterDetail[] = [];
      for (let d = 0; d < bestE.d.length; d++) {
        const ed = bestE.d[d];
        if (!ed) continue;
        bestDetails.push({
          chance: ed.c,
          method: METHOD_NAMES[ed.m] || 'walk',
          minLevel: ed.min,
          maxLevel: ed.max,
          aid,
          time: ed.t,
        });
      }

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
}

/**
 * Evaluates non-wild encounter methods, specifically in-game NPC trades, static gifts,
 * and version-exclusive constraints.
 *
 * This function handles:
 * 1. **Unobtainables (Version Exclusives):** Marks Pokémon that cannot be caught in the current
 *    version with a low priority (10) unless the player owns a pre-evolution or there's an NPC trade.
 * 2. **NPC Trades:** Suggests trading with in-game NPCs. Priority is boosted (65 -> 85) if the
 *    player already possesses the requested offering Pokémon.
 * 3. **Static Gifts:** Suggests one-off encounters (like Eevee or Hitmonlee) based on badge counts
 *    and event flags extracted from the save file.
 *
 * It mutates the provided `suggestions` array directly for performance.
 *
 * @param queryTargets - The priority Pokémon IDs being evaluated.
 * @param saveData - The parsed save data to check event flags and badge requirements.
 * @param displayVersion - The text ID of the game version (e.g., 'red', 'silver').
 * @param ownedSet - The set of Pokémon IDs the player currently owns.
 * @param apiData - Pre-fetched game metadata including Pokémon evolution chains.
 * @param instancesBySpecies - A Map grouping all possessed Pokémon instances by their species ID. This allows O(1) checks to verify if the player has the pre-evolution, and if it is already holding a required evolution item.
 * @param suggestions - The shared array where new gift/trade suggestions are pushed.
 * @param missingIds - A set of all missing Pokémon IDs.
 */

/**
 * Evaluates version exclusives, in-game NPC trades, and static gift encounters.
 *
 * It mutates the provided `suggestions` array.
 * This mutation-in-place pattern is a critical architectural optimization (O(1) memory)
 * that prevents the O(N) garbage collection overhead of allocating and merging massive
 * arrays during the hot path.
 *
 * @param queryTargets - The top priority missing Pokémon IDs to evaluate.
 * @param saveData - The player's parsed save file, containing badges and event flags.
 * @param displayVersion - The current game version string.
 * @param ownedSet - A Set of Pokémon IDs the player already owns.
 * @param apiData - Pre-fetched metadata for Pokémon definitions.
 * @param instancesBySpecies - A Map of the player's physical Pokémon, used to check for required trade offerings or pre-evolutions.
 * @param suggestions - The shared array where new suggestions are pushed in-place.
 * @param missingIds - A Set of Pokémon IDs the player needs to obtain.
 */
function generateGiftAndTradeSuggestions(
  queryTargets: number[],
  saveData: SaveData,
  displayVersion: string,
  ownedSet: Set<number>,
  apiData: AssistantApiData,
  instancesBySpecies: Map<number, PokemonInstance[]>,
  suggestions: Suggestion[],
  missingIds: Set<number>,
) {
  // B. Unobtainable / Exclusive logic
  // Checks if the target is completely locked out of the current version (e.g. Red exclusives on Blue).
  // These are assigned the lowest base priority (10) since they require external action (link cable trades).
  // ⚡ Bolt: Convert O(N^2) array lookup to O(1) Set has for NPC trades
  const validNpcTradeIds = new Set<number>();
  for (let i = 0; i < STATIC_NPC_TRADE_DATA.length; i++) {
    const t = STATIC_NPC_TRADE_DATA[i];
    if (t && t.gen === saveData.generation && (!t.versions || t.versions.includes(displayVersion))) {
      validNpcTradeIds.add(t.receivedId);
    }
  }

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

      const isNpcTrade = validNpcTradeIds.has(pid);
      if (isNpcTrade) continue;

      // If they physically own a pre-evolution, they don't strictly need to trade, they can evolve it!
      const p = apiData.pokemonMetadata?.[pid];
      let hasPhysicalPreEvo = false;
      if (p?.efrm && p.efrm.length > 0) {
        // Iterate backwards through all ancestors (recursive ownership check)
        // The current logic only checked immediate parents, so if a player had Charmander,
        // Charizard might incorrectly be flagged as Unobtainable/Trade.
        for (let i = p.efrm.length - 1; i >= 0; i--) {
          const preId = p.efrm[i];
          if (preId !== undefined && instancesBySpecies.has(preId)) {
            hasPhysicalPreEvo = true;
            break;
          }
        }
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

    const hasOffered = instancesBySpecies.has(trade.offeredId);
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
  for (let i = 0; i < STATIC_GIFT_ENTRIES.length; i++) {
    const entry = STATIC_GIFT_ENTRIES[i];
    if (!entry) continue;
    const { giftId, gift } = entry;
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
}

/**
 * Evaluates Gen 2 Daycare breeding logic.
 * Checks if the player can breed a missing base Pokémon from an owned evolution.
 *
 * It mutates the provided `suggestions` array.
 * This mutation-in-place pattern is a critical architectural optimization (O(1) memory)
 * that prevents the O(N) garbage collection overhead of allocating and merging massive
 * arrays during the hot path.
 *
 * @param queryTargets - The top priority missing Pokémon IDs to evaluate.
 * @param saveData - The player's parsed save file, used to check Daycare status.
 * @param apiData - Pre-fetched metadata containing evolution chains.
 * @param instancesBySpecies - A Map of the player's physical Pokémon.
 * @param suggestions - The shared array where new breeding suggestions are pushed in-place.
 */
function generateBreedingSuggestions(
  queryTargets: number[],
  saveData: SaveData,
  apiData: AssistantApiData,
  instancesBySpecies: Map<number, PokemonInstance[]>,
  suggestions: Suggestion[],
) {
  // F. Breeding (Gen 2 Only)
  if (saveData.generation === 2) {
    queryTargets.forEach((targetId: number) => {
      const p = apiData.pokemonMetadata?.[targetId];
      if (!p) return;

      // Check if we are missing a base Pokemon, but we own an evolution of it
      let canBreed = false;
      let evolutionIdToBreed: number | null = null;

      // Only base Pokemon can be hatched from an egg
      if (p.efrm === undefined || p.efrm.length === 0) {
        // Look at all evolutions of the target (recursive)
        const stack = [...(p.eto || [])];
        while (stack.length > 0) {
          const evo = stack.pop();
          if (
            evo &&
            (instancesBySpecies.has(evo.id) || (saveData.daycare?.some((d) => d.speciesId === evo.id) ?? false))
          ) {
            canBreed = true;
            evolutionIdToBreed = evo.id;
            break;
          }
          if (evo?.eto && evo.eto.length > 0) {
            stack.push(...evo.eto);
          }
        }
      }

      if (canBreed && evolutionIdToBreed) {
        const isInDaycare = saveData.daycare?.some((d) => d.speciesId === evolutionIdToBreed) ?? false;

        let description = `Leave your #${evolutionIdToBreed} at the Daycare to get an Egg!`;
        let priority = 85;
        let title = `Breed: #${targetId}`;

        if (isInDaycare) {
          if (saveData.daycare && saveData.daycare.length === 2) {
            if (saveData.daycareHasEgg) {
              title = `Egg Ready: #${targetId}!`;
              description = `Pick up your Egg from the Daycare!`;
              priority = 95;
            } else {
              title = `Breeding in Progress: #${targetId}`;
              description = `Wait for an Egg from the Daycare!`;
              priority = 85;
            }
          } else {
            title = `Need Partner: #${targetId}`;
            description = `Leave a compatible partner (like Ditto) at the Daycare to get an Egg!`;
            priority = 80;
          }
        } else {
          description = `Leave your #${evolutionIdToBreed} and a compatible partner (like Ditto) at the Daycare to get an Egg!`;
        }

        suggestions.push({
          id: `breed-${targetId}`,
          category: 'Breed',
          title,
          description,
          pokemonId: targetId,
          priority,
        });
      }
    });
  }
}

/**
 * Evaluates the player's current boxes and party to find pre-evolutions that can be evolved
 * to obtain missing Pokédex entries.
 *
 * Checks against level requirements, required evolution items in the inventory,
 * time of day, and friendship levels.
 * Priority boosts significantly if the evolution criteria are actively met (e.g. required level reached).
 *
 * It mutates the provided `suggestions` array.
 * This mutation-in-place pattern is a critical architectural optimization (O(1) memory)
 * that prevents the O(N) garbage collection overhead of allocating and merging massive
 * arrays during the hot path.
 *
 * @param queryTargets - The top priority missing Pokémon IDs to evaluate.
 * @param saveData - The parsed save data for checking items, friendship, and daylight (tod).
 * @param apiData - Pre-fetched metadata containing evolution criteria (level, item, time of day).
 * @param instancesBySpecies - A Map of the player's physical Pokémon, used to find valid pre-evolutions.
 * @param suggestions - The shared array where new evolution suggestions are pushed in-place.
 * @param displayVersion - The current game version, used to handle special cases (like Yellow Pikachu refusing to evolve).
 * @param missingIds - A Set of Pokémon IDs the player needs to obtain.
 */
function findInstanceHoldingItem(
  instancesMap: Map<number, PokemonInstance[]>,
  itemId: number,
): PokemonInstance | undefined {
  for (const instances of instancesMap.values()) {
    for (let i = 0; i < instances.length; i++) {
      const inst = instances[i];
      if (inst && inst.item === itemId) {
        return inst;
      }
    }
  }
  return undefined;
}

function generateEvolutionSuggestions(
  queryTargets: number[],
  saveData: SaveData,
  apiData: AssistantApiData,
  instancesBySpecies: Map<number, PokemonInstance[]>,
  suggestions: Suggestion[],
  displayVersion: string,
  missingIds: Set<number>,
) {
  // E. Evolutions
  // Evaluates the player's current boxes and party to find pre-evolutions.
  // Priority boosts significantly if the evolution criteria are actively met (e.g. required level reached, evolution stone in inventory).

  queryTargets.forEach((targetId: number) => {
    const p = apiData.pokemonMetadata?.[targetId];
    if (!p) return;

    let closestOwnedParentId: number | undefined;
    let immediateEvoTargetId: number = targetId;

    for (let i = 0; i < p.efrm.length; i++) {
      const ancestorId = p.efrm[i];
      if (ancestorId !== undefined && instancesBySpecies.has(ancestorId)) {
        closestOwnedParentId = ancestorId;
        const nextTarget = i === 0 ? targetId : p.efrm[i - 1];
        if (nextTarget !== undefined) {
          immediateEvoTargetId = nextTarget;
        }
        break;
      }
    }

    if (closestOwnedParentId === undefined) return;
    const ownedInstances = instancesBySpecies.get(closestOwnedParentId) || [];
    if (ownedInstances.length === 0) return;

    const immediateEvoTarget = apiData.pokemonMetadata?.[immediateEvoTargetId];
    if (!immediateEvoTarget) return;

    // If we're looking at a multi-stage evolution (e.g., target is Charizard, immediate is Charmeleon)
    // AND the intermediate stage (Charmeleon) is ALSO missing from the Pokedex,
    // we should skip generating the suggestion for the final stage (Charizard) because
    // the engine will already generate an identical "Evolve Charmander -> Charmeleon" suggestion
    // when it evaluates Charmeleon as a target. This prevents redundant duplicates.
    if (immediateEvoTargetId !== targetId && missingIds.has(immediateEvoTargetId)) {
      return;
    }

    const details = immediateEvoTarget.det;
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
        (inst) => !(displayVersion === 'yellow' && closestOwnedParentId === 25 && inst.otName === saveData.trainerName),
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

      const isIntermediate = immediateEvoTargetId !== targetId;
      const pathTitlePrefix = isIntermediate ? `Path to #${targetId}` : 'Evolution';
      const evolveTargetText = isIntermediate ? ` into #${immediateEvoTargetId} to progress towards #${targetId}` : '';

      if (tr === EVO_TRIGGER.LEVEL_UP) {
        if (min_l) {
          const isReady = bestInstance.level >= min_l;
          let rpsMet = true;
          if (rps !== undefined && bestInstance.dvs && bestInstance.statExp) {
            const baseAtk = 35;
            const baseDef = 35;
            const calcAtk =
              Math.floor(
                (((baseAtk + bestInstance.dvs.atk) * 2 +
                  Math.floor(Math.min(Math.floor(Math.ceil(Math.sqrt(bestInstance.statExp.atk))), 255) / 4)) *
                  bestInstance.level) /
                  100,
              ) + 5;
            const calcDef =
              Math.floor(
                (((baseDef + bestInstance.dvs.def) * 2 +
                  Math.floor(Math.min(Math.floor(Math.ceil(Math.sqrt(bestInstance.statExp.def))), 255) / 4)) *
                  bestInstance.level) /
                  100,
              ) + 5;
            if (rps === 1) rpsMet = calcAtk > calcDef;
            else if (rps === -1) rpsMet = calcAtk < calcDef;
            else if (rps === 0) rpsMet = calcAtk === calcDef;
          }
          const isActuallyReady = isReady && rpsMet;
          let rpsReq = '';
          if (rps === 1) rpsReq = ', Atk > Def';
          else if (rps === -1) rpsReq = ', Atk < Def';
          else if (rps === 0) rpsReq = ', Atk = Def';
          let specificReq = `(needs Lv. ${min_l}${rpsReq})`;
          if (!rpsReq) specificReq = `(needs Lv. ${min_l})`;

          suggestions.push({
            id: `evo-lvl-${targetId}`,
            category: 'Evolve',
            title: isIntermediate ? pathTitlePrefix : `Level Up Evolution: #${targetId}`,
            description: isActuallyReady
              ? `Your Lv. ${bestInstance.level} pre-evolution is ready to evolve${evolveTargetText} ${specificReq}!`
              : `Your Lv. ${bestInstance.level} pre-evolution evolves at Lv. ${min_l}${evolveTargetText} ${specificReq}.`,
            pokemonId: targetId,
            priority: isActuallyReady ? 90 : 75,
          });
        } else if (min_h) {
          const todMsg = tod ? ` during the ${tod}` : '';
          const isFriendlyEnough = bestInstance.friendship !== undefined && bestInstance.friendship >= min_h;
          const friendshipStatus =
            bestInstance.friendship !== undefined ? ` (${bestInstance.friendship}/${min_h})` : '';

          suggestions.push({
            id: `evo-happy-${targetId}`,
            category: 'Evolve',
            title: isIntermediate
              ? pathTitlePrefix
              : isFriendlyEnough
                ? `Ready to Evolve: #${targetId}!`
                : `Happiness Evolution: #${targetId}`,
            description: isFriendlyEnough
              ? `Your pre-evolution is friendly enough${friendshipStatus}! Level it up${todMsg} to evolve${evolveTargetText}.`
              : `Level up your pre-evolution with high happiness${friendshipStatus} to evolve${todMsg}${evolveTargetText}!`,
            pokemonId: targetId,
            priority: isFriendlyEnough ? 90 : 80,
          });
        } else {
          const todMsg = tod ? ` during the ${tod}` : '';
          suggestions.push({
            id: `evo-lvl-any-${targetId}`,
            category: 'Evolve',
            title: isIntermediate ? pathTitlePrefix : `Level Up Evolution: #${targetId}`,
            description: `Level up your pre-evolution${todMsg} to evolve${evolveTargetText}!`,
            pokemonId: targetId,
            priority: 70,
          });
        }
      } else if (tr === EVO_TRIGGER.USE_ITEM && item) {
        const gameItemId = getGameItemId(item, saveData.generation);
        const hasStoneInBag =
          saveData.inventory.some((i) => i.id === gameItemId && i.quantity > 0) ||
          (saveData.pcItems?.some((i) => i.id === gameItemId && i.quantity > 0) ?? false);
        const otherHoldingInstance = hasStoneInBag
          ? undefined
          : findInstanceHoldingItem(instancesBySpecies, gameItemId);
        const hasStone = hasStoneInBag || !!otherHoldingInstance;
        const itemName = EVO_ITEM_NAMES[item] || 'item';

        let description = hasStone
          ? `Use your ${itemName} to evolve it${evolveTargetText}!`
          : `Find a ${itemName} to evolve it${evolveTargetText}.`;

        if (!hasStoneInBag && otherHoldingInstance) {
          description = `Take the ${itemName} held by your Pokémon (#${otherHoldingInstance.speciesId}) and use it to evolve it${evolveTargetText}!`;
        }

        suggestions.push({
          id: `evo-item-${targetId}-${item}`,
          category: 'Evolve',
          title: isIntermediate
            ? pathTitlePrefix
            : hasStone
              ? `Ready to Evolve: #${targetId}!`
              : `Item Needed: #${targetId}`,
          description,
          pokemonId: targetId,
          priority: hasStone ? 95 : 40,
        });
      } else if (tr === EVO_TRIGGER.TRADE) {
        if (held) {
          const gameHeldId = getGameItemId(held, saveData.generation);
          const hasHeldItemInBag =
            saveData.inventory.some((i) => i.id === gameHeldId && i.quantity > 0) ||
            (saveData.pcItems?.some((i) => i.id === gameHeldId && i.quantity > 0) ?? false);
          const holdingPreEvoInstance =
            evolvableInstances.find((inst) => inst.item === gameHeldId) ||
            ownedInstances.find((inst) => inst.item === gameHeldId);
          let otherHoldingInstance: PokemonInstance | undefined;
          if (!hasHeldItemInBag && !holdingPreEvoInstance) {
            otherHoldingInstance = findInstanceHoldingItem(instancesBySpecies, gameHeldId);
          }
          const hasHeldItem = hasHeldItemInBag || !!holdingPreEvoInstance || !!otherHoldingInstance;
          const itemName = EVO_ITEM_NAMES[held] || 'item';

          let description = `Find a ${itemName}, have your pre-evolution hold it, and trade to evolve${evolveTargetText}.`;
          if (holdingPreEvoInstance) {
            description = `Your pre-evolution is already holding the ${itemName}! Trade it to evolve${evolveTargetText}!`;
          } else if (hasHeldItemInBag) {
            description = `Have your pre-evolution hold the ${itemName} and trade it to evolve${evolveTargetText}!`;
          } else if (otherHoldingInstance) {
            description = `Take the ${itemName} held by your Pokémon (#${otherHoldingInstance.speciesId}), have your pre-evolution hold it, and trade to evolve${evolveTargetText}!`;
          }

          suggestions.push({
            id: `evo-trade-held-${targetId}`,
            category: 'Evolve',
            title: isIntermediate
              ? pathTitlePrefix
              : hasHeldItem
                ? `Ready to Trade Evolve: #${targetId}!`
                : `Item Needed for Trade: #${targetId}`,
            description,
            pokemonId: targetId,
            priority: hasHeldItem ? 90 : 45,
          });
        } else {
          suggestions.push({
            id: `evo-trade-${targetId}`,
            category: 'Evolve',
            title: isIntermediate ? pathTitlePrefix : `Trade Evolution: #${targetId}`,
            description: `Trade your pre-evolution to evolve it${evolveTargetText}!`,
            pokemonId: targetId,
            priority: 85,
          });
        }
      }
    }
  });
}

/**
 * The core orchestration function for the Assistant recommendation engine.
 *
 * This function processes the player's current save state and identifies up to 100 missing Pokémon
 * in the Pokédex (or Living Dex). It then delegates out to several categorical sub-generators
 * (Catch, Gift, Trade, Evolution, Breed) to aggregate actionable advice on how to obtain them.
 *
 * It is fully synchronous and relies on `fetchAssistantApiData` having already loaded all required
 * mapping and metadata into memory (passed via `apiData`). It extensively uses Sets and Map caching
 * internally to maintain O(1) lookups during array processing, preventing UI thread blockage.
 *
 * @param saveData - The parsed save data.
 * @param isLivingDex - Whether the engine should recommend catching duplicates for a Living Dex.
 * @param manualVersion - An optional version override provided by the user.
 * @param apiData - The pre-fetched data from IndexedDB (locations, encounters, etc.).
 * @param strategy - The generation-specific logic implementation (e.g. Gen 1 vs Gen 2 mechanical differences).
 * @returns An object containing an ordered array of deduplicated, prioritized `Suggestion`s and debug information.
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
        rejected.push({
          pokemonId: i,
          reason: 'Hall of Fame count is 0. Mewtwo is locked.',
          code: 'HOF_LOCKED',
        });
        continue;
      }
      missingIds.add(i);
    }
  }

  const effectiveVersion = manualVersion || saveData.gameVersion;
  const displayVersion = effectiveVersion === 'unknown' ? genConfig.defaultVersion : effectiveVersion;
  const displayVersionId = POKE_VERSION_MAP[displayVersion] || 1;
  // ⚡ Bolt: Use a manual loop instead of Array.from().slice() to eliminate intermediate array allocations
  const queryTargets: number[] = [];
  for (const pid of missingIds) {
    if (queryTargets.length >= 100) break;
    queryTargets.push(pid);
  }

  // Special Strategy-Specific Suggestions (e.g. Box full warning)
  const specialSuggestions = strategy.getSpecialSuggestions(saveData, Array.from(missingIds));
  suggestions.push(...specialSuggestions);

  const localPids = new Set<number>();

  const hasHeadbutt =
    saveData.inventory.some((i) => i.id === 192 && i.quantity > 0) ||
    (saveData.pcItems?.some((i) => i.id === 192 && i.quantity > 0) ?? false) ||
    allInstances.some((p) => p.moves?.includes(29));
  const hasRockSmash =
    saveData.inventory.some((i) => i.id === 198 && i.quantity > 0) ||
    (saveData.pcItems?.some((i) => i.id === 198 && i.quantity > 0) ?? false) ||
    allInstances.some((p) => p.moves?.includes(249));

  const hasSurf =
    saveData.inventory.some((i) => [198, 245, 341].includes(i.id) && i.quantity > 0) ||
    (saveData.pcItems?.some((i) => [198, 245, 341].includes(i.id) && i.quantity > 0) ?? false) ||
    allInstances.some((p) => p.moves?.includes(57));

  const hasOldRod =
    saveData.inventory.some((i) => [52, 69, 260].includes(i.id) && i.quantity > 0) ||
    (saveData.pcItems?.some((i) => [52, 69, 260].includes(i.id) && i.quantity > 0) ?? false);

  const hasGoodRod =
    saveData.inventory.some((i) => [53, 70, 261].includes(i.id) && i.quantity > 0) ||
    (saveData.pcItems?.some((i) => [53, 70, 261].includes(i.id) && i.quantity > 0) ?? false);

  const hasSuperRod =
    saveData.inventory.some((i) => [54, 71, 262].includes(i.id) && i.quantity > 0) ||
    (saveData.pcItems?.some((i) => [54, 71, 262].includes(i.id) && i.quantity > 0) ?? false);

  generateCatchSuggestions(
    apiData,
    displayVersionId,
    myOtIds,
    missingIds,
    queryTargets,
    saveData,
    strategy,
    suggestions,
    localPids,
  );

  // Filter out headbutt and rock-smash encounters if the player lacks the required TMs.
  // This is done as a post-processing step rather than during generation because
  // TM/HM possession is a global state, whereas encounter details are deeply nested.
  for (let i = suggestions.length - 1; i >= 0; i--) {
    const suggestion = suggestions[i];
    if (suggestion && suggestion.category === 'Catch' && suggestion.encounterInfo) {
      let hasValidEncounter = false;
      for (const pidStr in suggestion.encounterInfo) {
        const pid = parseInt(pidStr, 10);
        const details = suggestion.encounterInfo[pid];
        if (details) {
          const missingTools = new Set<string>();
          let hasAccessibleMethod = false;

          for (let dIdx = 0; dIdx < details.length; dIdx++) {
            const d = details[dIdx];
            if (d) {
              let methodAccessible = true;
              if (d.method === 'headbutt' && !hasHeadbutt) {
                methodAccessible = false;
                missingTools.add('Headbutt');
              } else if (d.method === 'rock-smash' && !hasRockSmash) {
                methodAccessible = false;
                missingTools.add('Rock Smash');
              } else if (d.method === 'surf' && !hasSurf) {
                methodAccessible = false;
                missingTools.add('Surf');
              } else if (d.method === 'old-rod' && !hasOldRod) {
                methodAccessible = false;
                missingTools.add('Old Rod');
              } else if (d.method === 'good-rod' && !hasGoodRod) {
                methodAccessible = false;
                missingTools.add('Good Rod');
              } else if (d.method === 'super-rod' && !hasSuperRod) {
                methodAccessible = false;
                missingTools.add('Super Rod');
              }

              if (methodAccessible) {
                hasAccessibleMethod = true;
              }
            }
          }

          if (!hasAccessibleMethod && missingTools.size > 0) {
            const warnings = Array.from(missingTools);
            const warningStr = `Requires ${warnings.join(' or ')}`;
            if (suggestion.warning) {
              suggestion.warning += `, ${warningStr}`;
            } else {
              suggestion.warning = warningStr;
            }
            // Penalize priority since the user lacks the required tools
            suggestion.priority = Math.min(suggestion.priority, 45);
          }

          hasValidEncounter = true;
        }
      }

      // If no valid encounters remain for this suggestion, remove it completely.
      // (This will only happen if there were actually zero encounter details generated originally)
      if (!hasValidEncounter) {
        suggestions.splice(i, 1);
        // Also remove from localPids so it can be picked up by other suggestions if applicable
        if (suggestion.pokemonIds) {
          for (const pid of suggestion.pokemonIds) {
            localPids.delete(pid);
          }
        } else if (suggestion.pokemonId) {
          localPids.delete(suggestion.pokemonId);
        }
      } else {
        // Update pokemonIds if some were completely filtered out
        if (suggestion.pokemonIds) {
          suggestion.pokemonIds = suggestion.pokemonIds.filter((pid) => {
            if (suggestion.encounterInfo?.[pid] !== undefined) {
              return true;
            } else {
              localPids.delete(pid);
              return false;
            }
          });
        }
      }
    }
  }

  // Organize physical instances by species to check for evolutions and prevent redundant exclusive suggestions.
  // Why? If a player needs a Raichu, we shouldn't just suggest catching Pikachu if they already have one in their PC.
  // Grouping by species ID (O(N) pass) allows sub-generators to do O(1) checks for pre-evolutions or specific forms.
  const instancesBySpecies = new Map<number, PokemonInstance[]>();
  for (const p of allInstances) {
    if (!instancesBySpecies.has(p.speciesId)) instancesBySpecies.set(p.speciesId, []);
    instancesBySpecies.get(p.speciesId)?.push(p);
  }

  generateGiftAndTradeSuggestions(
    queryTargets,
    saveData,
    displayVersion,
    ownedSet,
    apiData,
    instancesBySpecies,
    suggestions,
    missingIds,
  );

  generateBreedingSuggestions(queryTargets, saveData, apiData, instancesBySpecies, suggestions);

  generateEvolutionSuggestions(
    queryTargets,
    saveData,
    apiData,
    instancesBySpecies,
    suggestions,
    displayVersion,
    missingIds,
  );

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

  strategy.postProcessSuggestions?.(uniqueSuggestions);

  return { suggestions: uniqueSuggestions, debug: { rejected } };
}
