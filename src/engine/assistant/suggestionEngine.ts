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

import { STATIC_GIFT_DATA, STATIC_NPC_TRADE_DATA } from '../data/gen1/assistantData';
import { getUnobtainableReason } from '../exclusives/gen1Exclusives';
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

  // Fill missingEncounters
  for (const pid of queryTargets) {
    const enc = allEncounters.find((e) => e.pid === pid);
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
  const missingIds: number[] = [];
  const missingIdsSet = new Set<number>();

  const ownedSet = isLivingDex
    ? new Set([...(saveData.party || []), ...(saveData.pc || [])])
    : saveData.owned || new Set<number>();

  const allInstances = [...(saveData.partyDetails || []), ...(saveData.pcDetails || [])];
  const myOtIds = new Set(
    allInstances.filter((p) => p.otName === saveData.trainerName).map((p: PokemonInstance) => p.speciesId),
  );

  for (let i = 1; i <= maxDex; i++) {
    if (!ownedSet.has(i)) {
      if (saveData.generation === 1 && i === 150 && (saveData.hallOfFameCount || 0) === 0) {
        rejected.push({ pokemonId: i, reason: 'Hall of Fame count is 0. Mewtwo is locked.', code: 'HOF_LOCKED' });
        continue;
      }
      missingIds.push(i);
      missingIdsSet.add(i);
    }
  }

  const effectiveVersion = manualVersion || saveData.gameVersion;
  const displayVersion = effectiveVersion === 'unknown' ? genConfig.defaultVersion : effectiveVersion;
  const displayVersionId = POKE_VERSION_MAP[displayVersion] || 1;
  const queryTargets = missingIds.slice(0, 100);

  // Special Strategy-Specific Suggestions (e.g. Box full warning)
  const specialSuggestions = strategy.getSpecialSuggestions(saveData, missingIds);
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

      if (missingIdsSet.has(pid)) {
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
    let bestDetails: EncounterDetail[] = [];

    for (const e of encData.enc) {
      if (e.v !== displayVersionId) continue;

      const distInfo = strategy.getMapDistance(saveData.currentMapId, e.aid, apiData.allLocations);
      if (distInfo && distInfo.distance < bestDist) {
        bestDist = distInfo.distance;
        bestAreaName = distInfo.name;
        bestDetails = e.d.map((ed) => ({
          chance: ed.c,
          method: METHOD_NAMES[ed.m] || 'walk',
          minLevel: ed.min,
          maxLevel: ed.max,
          aid: e.aid,
        }));
      }
    }

    if (bestDist < 8) {
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

  // B. Unobtainable / Exclusive logic
  // Checks if the target is completely locked out of the current version (e.g. Red exclusives on Blue).
  // These are assigned the lowest base priority (10) since they require external action (link cable trades).
  const pidsWithExclusives = new Set<number>();
  for (const pid of queryTargets) {
    const reason = getUnobtainableReason(pid, displayVersion, ownedSet.size, ownedSet);
    if (reason) {
      pidsWithExclusives.add(pid);

      const isNpcTrade = STATIC_NPC_TRADE_DATA.some(
        (t) =>
          t.receivedId === pid && t.gen === saveData.generation && (!t.versions || t.versions.includes(displayVersion)),
      );
      if (isNpcTrade) continue;

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
    if (!missingIdsSet.has(trade.receivedId)) continue;

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

  // D. Evolutions
  // Evaluates the player's current boxes and party to find pre-evolutions.
  // Priority boosts significantly if the evolution criteria are actively met (e.g. required level reached, evolution stone in inventory).
  const instancesBySpecies = new Map<number, PokemonInstance[]>();
  for (const p of allInstances) {
    if (!instancesBySpecies.has(p.speciesId)) instancesBySpecies.set(p.speciesId, []);
    instancesBySpecies.get(p.speciesId)?.push(p);
  }

  queryTargets.forEach((targetId: number) => {
    const p = apiData.pokemonMetadata?.[targetId];
    if (!p) return;

    const parentId = p.efrm[0];
    if (parentId === undefined) return;
    const ownedInstances = instancesBySpecies.get(parentId) || [];
    if (ownedInstances.length === 0) return;

    const bestInstance = ownedInstances.reduce((prev, current) => (prev.level > current.level ? prev : current));
    const isYellowStarterPikachu =
      displayVersion === 'yellow' && parentId === 25 && bestInstance.otName === saveData.trainerName;
    if (isYellowStarterPikachu) return;

    const details = p.det;
    const detail = details?.[0];
    if (!detail) return;

    const tr = detail.tr;
    const min_l = detail.ml;
    const min_h = detail.mh;
    const item = detail.item;
    const tod = detail.time === 1 ? 'day' : detail.time === 2 ? 'night' : undefined;

    if (tr === EVO_TRIGGER.LEVEL_UP) {
      if (min_l) {
        const isReady = bestInstance.level >= min_l;
        const specificReq = `(needs Lv. ${min_l})`;

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
        suggestions.push({
          id: `evo-happy-${targetId}`,
          category: 'Evolve',
          title: `Happiness Evolution: #${targetId}`,
          description: `Level up your pre-evolution with high happiness to evolve${todMsg}!`,
          pokemonId: targetId,
          priority: 80,
        });
      }
    } else if (tr === EVO_TRIGGER.USE_ITEM && item) {
      const hasStone = saveData.inventory.some((i) => i.id === item && i.quantity > 0);
      suggestions.push({
        id: `evo-item-${targetId}`,
        category: 'Evolve',
        title: hasStone ? `Ready to Evolve: #${targetId}!` : `Item Needed: #${targetId}`,
        description: hasStone ? `Use your item to evolve it!` : `Find the right item to evolve it.`,
        pokemonId: targetId,
        priority: hasStone ? 95 : 40,
      });
    } else if (tr === EVO_TRIGGER.TRADE) {
      suggestions.push({
        id: `evo-trade-${targetId}`,
        category: 'Evolve',
        title: `Trade Evolution: #${targetId}`,
        description: `Trade your pre-evolution to evolve it!`,
        pokemonId: targetId,
        priority: 85,
      });
    }
  });

  const uniqueSuggestions = Array.from(new Map(suggestions.map((item) => [item.id, item])).values());
  uniqueSuggestions.sort((a, b) => b.priority - a.priority);
  return { suggestions: uniqueSuggestions, debug: { rejected } };
}
