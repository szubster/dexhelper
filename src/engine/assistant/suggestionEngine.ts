import { dexDataLoader } from '../../db/DexDataLoader';
import { pokeDB } from '../../db/PokeDB';
import {
  type CompactChainLink,
  type CompactEvolutionChain,
  ENCOUNTER_METHOD,
  EVO_TRIGGER,
  type GenericLocation,
  type LocationAreaEncounters,
  POKE_VERSION_MAP,
  type SpecificArea,
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
  missingChains: Record<number, CompactEvolutionChain | null>;
  ancestralEncounters: Record<number, Record<number, LocationAreaEncounters | null>>;
  partyEvolutions: Record<number, CompactEvolutionChain | null>;
  giftChains: Record<number, CompactEvolutionChain | null>;
  areaNames: Record<number, string>;
  allLocations: GenericLocation[];
  allAreas: SpecificArea[];
}

/**
 * Helper function to find all Pokemon IDs in an evolution chain.
 */
function _getChainIds(node: CompactChainLink): number[] {
  const id = node.sid;
  return [id, ...node.evolves_to.flatMap(_getChainIds)];
}

/**
 * Helper function to find all ancestors of a target Pokemon ID in an evolution chain.
 */
function _getAncestors(node: CompactChainLink, target: number, path: number[] = []): number[] | null {
  const id = node.sid;
  if (id === target) {
    return path;
  }
  for (const child of node.evolves_to) {
    const result = _getAncestors(child, target, [...path, id]);
    if (result) return result;
  }
  return null;
}

const isNotError = <T>(item: T | Error): item is T => !(item instanceof Error);

/**
 * Fetches all necessary data from local IndexedDB using DataLoader for batching.
 */
export async function fetchAssistantApiData(saveData: SaveData, queryTargets: number[]) {
  const allAreas = await pokeDB.getAllAreas();
  const allLocations = await pokeDB.getLocations();

  const strategy = saveData.generation === 1 ? (await import('./strategies/gen1Strategy')).gen1Strategy : null;
  const localAid = strategy ? strategy.resolveMapAid(saveData, allLocations, allAreas) : null;

  const allEncounters = await pokeDB.getAllEncounters();
  const localEncounters = localAid ? allEncounters.filter((lae) => lae.encounters.some((e) => e.aid === localAid)) : [];

  const missingEncounters: Record<number, LocationAreaEncounters | null> = {};
  const missingChains: Record<number, CompactEvolutionChain | null> = {};
  const ancestralEncounters: Record<number, Record<number, LocationAreaEncounters | null>> = {};

  // Fill missingEncounters
  for (const pid of queryTargets) {
    const enc = allEncounters.find((e) => e.pid === pid);
    if (enc) missingEncounters[pid] = enc;
  }

  // 1. Get Pokemon details (now includes CID directly)
  const pokemons = await dexDataLoader.pokemon.loadMany(queryTargets);
  const cids = pokemons
    .filter(isNotError)
    .map((p) => p?.cid)
    .filter((cid): cid is number => !!cid);

  // 2. Load Chains
  const chains = await dexDataLoader.chains.loadMany([...new Set(cids)]);
  const validChains = chains.filter(isNotError);

  // Map back to pid -> chain
  queryTargets.forEach((pid, idx) => {
    const p = pokemons[idx];
    if (isNotError(p) && p) {
      const chain = validChains.find((c) => c?.id === p.cid);
      missingChains[pid] = chain ?? null;
    }
  });

  const partyPids = saveData.party || [];
  const partyPokemons = await dexDataLoader.pokemon.loadMany(partyPids);
  const partyCids = partyPokemons
    .filter(isNotError)
    .map((p) => p?.cid)
    .filter((cid): cid is number => !!cid);
  const partyChains = await dexDataLoader.chains.loadMany([...new Set(partyCids)]);
  const validPartyChains = partyChains.filter(isNotError);

  const partyEvolutions: Record<number, CompactEvolutionChain | null> = {};
  partyPids.forEach((pid, idx) => {
    const p = partyPokemons[idx];
    if (isNotError(p) && p) {
      const chain = validPartyChains.find((c) => c?.id === p.cid);
      partyEvolutions[pid] = chain ?? null;
    }
  });

  const giftPids = Object.keys(STATIC_GIFT_DATA).map((id) => parseInt(id, 10));
  const giftPokemons = await dexDataLoader.pokemon.loadMany(giftPids);
  const giftCids = giftPokemons
    .filter(isNotError)
    .map((p) => p?.cid)
    .filter((cid): cid is number => !!cid);
  const giftChainsFull = await dexDataLoader.chains.loadMany([...new Set(giftCids)]);
  const validGiftChains = giftChainsFull.filter(isNotError);

  const giftChains: Record<number, CompactEvolutionChain | null> = {};
  giftPids.forEach((pid, idx) => {
    const p = giftPokemons[idx];
    if (isNotError(p) && p) {
      const chain = validGiftChains.find((c) => c?.id === p.cid);
      giftChains[pid] = chain ?? null;
    }
  });

  return {
    localAid,
    localEncounters: localEncounters ?? null,
    missingEncounters,
    missingChains,
    ancestralEncounters,
    partyEvolutions,
    giftChains,
    areaNames: Object.fromEntries(allAreas.map((a) => [a.id, a.n])),
    allLocations,
    allAreas,
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
  const missingIds: number[] = [];

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
    }
  }

  const effectiveVersion = manualVersion || saveData.gameVersion;
  const displayVersion = effectiveVersion === 'unknown' ? genConfig.defaultVersion : effectiveVersion;
  const displayVersionId = POKE_VERSION_MAP[displayVersion] || 1;
  const queryTargets = missingIds.slice(0, 100);

  const localPids: number[] = [];
  // A. Catch logic
  if (apiData.localEncounters && apiData.localEncounters.length > 0 && apiData.localAid) {
    const localAid = apiData.localAid;

    const localEncounterInfo: Record<number, EncounterDetail[]> = {};

    for (const lae of apiData.localEncounters) {
      const pid = lae.pid;
      const relevantEncounters = lae.encounters.filter((e) => e.aid === localAid && e.v === displayVersionId);
      if (relevantEncounters.length === 0) continue;

      if (STATIC_GIFT_DATA[pid] && myOtIds.has(pid)) continue;

      if (missingIds.includes(pid)) {
        localPids.push(pid);
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

    if (localPids.length > 0) {
      suggestions.push({
        id: 'catch-local',
        category: 'Catch',
        title: 'Catch Right Here',
        description: `You are at ${saveData.currentMapName || 'your current location'}! There are ${localPids.length} missing Pokémon right here.`,
        pokemonIds: localPids,
        priority: 120,
        encounterInfo: localEncounterInfo,
      });
    }
  }

  // A2. Nearby logic
  for (const pid of queryTargets) {
    if (localPids.includes(pid)) continue;

    const encData = apiData.missingEncounters[pid];
    if (!encData?.encounters) continue;

    let bestDist = 999;
    let bestAreaName = '';
    let bestDetails: EncounterDetail[] = [];

    for (const e of encData.encounters) {
      if (e.v !== displayVersionId) continue;

      const distInfo = strategy.getMapDistance(saveData.currentMapId, e.aid, apiData.allLocations, apiData.allAreas);
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

  // Trades
  for (const trade of STATIC_NPC_TRADE_DATA) {
    if (trade.gen !== saveData.generation) continue;
    if (trade.versions && !trade.versions.includes(displayVersion)) continue;
    if (!missingIds.includes(trade.receivedId)) continue;

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

  // Evolutions
  const instancesBySpecies = new Map<number, PokemonInstance[]>();
  for (const p of allInstances) {
    if (!instancesBySpecies.has(p.speciesId)) instancesBySpecies.set(p.speciesId, []);
    instancesBySpecies.get(p.speciesId)?.push(p);
  }

  queryTargets.forEach((targetId: number) => {
    const chain = apiData.missingChains?.[targetId];
    if (!chain) return;

    const findNodeAndParent = (
      node: CompactChainLink,
      parent: CompactChainLink | null = null,
    ): { targetNode: CompactChainLink; parentNode: CompactChainLink | null } | null => {
      if (!node) return null;
      if (node.sid === targetId) return { targetNode: node, parentNode: parent };
      if (node.evolves_to) {
        for (const child of node.evolves_to) {
          const res = findNodeAndParent(child, node);
          if (res) return res;
        }
      }
      return null;
    };

    const nodes = findNodeAndParent(chain.chain);
    if (!nodes?.parentNode) return;

    const parentId = nodes.parentNode.sid;
    const ownedInstances = instancesBySpecies.get(parentId) || [];
    if (ownedInstances.length === 0) return;

    const bestInstance = ownedInstances.reduce((prev, current) => (prev.level > current.level ? prev : current));
    const isYellowStarterPikachu =
      displayVersion === 'yellow' && parentId === 25 && bestInstance.otName === saveData.trainerName;
    if (isYellowStarterPikachu) return;

    const details = nodes.targetNode.details;
    const detail = details?.[0];
    if (!detail) return;

    const tr = detail.tr;
    const min_l = detail.min_l;
    const min_h = detail.min_h;
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
      const hasStone = saveData.inventory.some((i) => i.id === item);
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
