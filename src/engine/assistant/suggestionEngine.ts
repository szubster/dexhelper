import type { ChainLink, EvolutionChain, LocationAreaEncounter, PokemonEncounter } from 'pokenode-ts';
import { getGenerationConfig } from '../../utils/generationConfig';
import { pokeapi } from '../../utils/pokeapi';
import { GEN1_MAP_TO_SLUG, STATIC_GIFT_DATA } from '../data/gen1/assistantData';
import type { PokemonInstance, SaveData } from '../saveParser/index';
import { generateCatchSuggestions } from './generators/catchGenerator';
import { generateEvolutionSuggestions } from './generators/evolutionGenerator';
import { generateGiftSuggestions } from './generators/giftGenerator';
import { generateTradeSuggestions } from './generators/tradeGenerator';
import type { SuggestionContext } from './generators/types';
import { generateUtilitySuggestions } from './generators/utilityGenerator';
import type { RejectedSuggestion, Suggestion } from './strategies/types';
import { parseIdFromUrl } from './utils';

export { parseIdFromUrl }; // re-exporting in case other modules depend on it via suggestionEngine

export interface AssistantApiData {
  localEncounters: PokemonEncounter[];
  missingEncounters: Record<number, LocationAreaEncounter[]>;
  missingChains: Record<number, EvolutionChain>;
  ancestralEncounters: Record<number, Record<number, LocationAreaEncounter[]>>;
  partyEvolutions: Record<number, EvolutionChain>;
  giftChains: Record<number, EvolutionChain>;
}

/**
 * Helper function to find all ancestors of a target Pokemon ID in an evolution chain.
 */
function getAncestors(node: ChainLink, target: number, path: number[] = []): number[] | null {
  const id = parseIdFromUrl(node.species.url);
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

  let localEncounters: PokemonEncounter[] = [];
  if (localSlug) {
    try {
      const areaData = await pokeapi.resource(`https://pokeapi.co/api/v2/location-area/${localSlug}`);
      localEncounters = areaData.pokemon_encounters || [];
    } catch (e) {
      console.error('Local area fetch failed', e);
    }
  }

  const missingEncounters: Record<number, LocationAreaEncounter[]> = {};
  const missingChains: Record<number, EvolutionChain> = {};
  const ancestralEncounters: Record<number, Record<number, LocationAreaEncounter[]>> = {};

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

  const partyEvolutions: Record<number, EvolutionChain> = {};
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

  const giftChains: Record<number, EvolutionChain> = {};
  const giftPromises = Object.keys(STATIC_GIFT_DATA).map(async (pidStr) => {
    const pid = parseInt(pidStr, 10);
    try {
      const species = await pokeapi.resource(`https://pokeapi.co/api/v2/pokemon-species/${pid}`);
      const chainUrl = species.evolution_chain.url;
      const chain = await pokeapi.resource(chainUrl);
      giftChains[pid] = chain;
    } catch (e) {
      console.error('Gift fetch failed', pid, e);
    }
  });

  await Promise.all([...missingPromises, ...partyPromises, ...giftPromises]);

  const uniqueAncestors = new Set<number>();
  const pidAncestors: Record<number, number[]> = {};

  for (const pid of queryTargets) {
    if (missingChains[pid]) {
      const ancestors = getAncestors(missingChains[pid].chain, pid) || [];
      if (ancestors.length > 0) {
        pidAncestors[pid] = ancestors;
        for (const a of ancestors) {
          uniqueAncestors.add(a);
        }
      }
    }
  }

  const ancestorData: Record<number, LocationAreaEncounter[]> = {};
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
    giftChains,
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
  apiData: AssistantApiData | null,
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

  const context: SuggestionContext = {
    saveData,
    apiData,
    missingIds,
    ownedSet,
    ownedCount,
    allInstances,
    myOtIds,
    displayVersion,
    queryTargets,
    suggestions,
    rejected,
    unobtainableCount: 0,
  };

  generateCatchSuggestions(context);
  generateTradeSuggestions(context);
  generateGiftSuggestions(context);
  generateUtilitySuggestions(context);
  generateEvolutionSuggestions(context);

  const uniqueSuggestions = Array.from(new Map(suggestions.map((item) => [item.id, item])).values());
  uniqueSuggestions.sort((a, b) => b.priority - a.priority);
  return { suggestions: uniqueSuggestions, debug: { rejected } };
}
