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
import { type LocationAreaEncounters, POKE_VERSION_MAP, type PokemonMetadata } from '../../db/schema';
import { getGenerationConfig } from '../../utils/generationConfig';
import { buildInventoryBySpecies, extractAllInstances } from '../breeding/inventoryTools';
import { STATIC_GIFT_DATA as STATIC_GIFT_DATA_GEN1 } from '../data/gen1/assistantData';
import { STATIC_GIFT_DATA as STATIC_GIFT_DATA_GEN2 } from '../data/gen2/assistantData';
import { STATIC_GIFT_DATA as STATIC_GIFT_DATA_GEN3 } from '../data/gen3/assistantData';
import type { SaveData } from '../saveParser/index';
import { generateBreedingSuggestions } from './generators/breedGenerator';
// Generators
import { generateCatchSuggestions } from './generators/catchGenerator';
import { generateEvolutionSuggestions } from './generators/evolutionGenerator';
import { generateGiftAndTradeSuggestions } from './generators/tradeGenerator';
import { getStrategy } from './strategies';
import type { AssistantStrategy, RejectedSuggestion, Suggestion } from './strategies/types';
import type { AssistantApiData } from './suggestionEngineTypes';
import { extractPlayerTools, filterSuggestionsByMissingTools } from './utils/encounterTools';

// ⚡ Bolt: Eliminate O(N) tuple allocation and string parsing by pre-calculating static gift arrays
const STATIC_GIFT_PIDS_GEN1 = Object.keys(STATIC_GIFT_DATA_GEN1).map((id) => parseInt(id, 10));
const STATIC_GIFT_PIDS_GEN2 = Object.keys(STATIC_GIFT_DATA_GEN2).map((id) => parseInt(id, 10));
const STATIC_GIFT_PIDS_GEN3 = Object.keys(STATIC_GIFT_DATA_GEN3).map((id) => parseInt(id, 10));

/**
 * Elective: Fetches all necessary background data from local IndexedDB to power the suggestion engine.
 *
 * @param saveData - The parsed save data containing the player's party and current location.
 * @param queryTargets - Array of Pokémon IDs (PIDs) that are missing and need to be evaluated.
 * @returns A structured `AssistantApiData` object containing pre-fetched encounters, metadata, and maps.
 *
 * @example
 * const apiData = await fetchAssistantApiData(saveData, [1, 4, 7]);
 */
export async function fetchAssistantApiData(saveData: SaveData, queryTargets: number[]) {
  const allLocations = await pokeDB.getLocations();

  const strategy = await getStrategy(saveData.generation);
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
  const giftPids =
    saveData.generation === 3
      ? STATIC_GIFT_PIDS_GEN3
      : saveData.generation === 2
        ? STATIC_GIFT_PIDS_GEN2
        : STATIC_GIFT_PIDS_GEN1;
  const allNeededPids = [...new Set([...queryTargets, ...partyPids, ...giftPids])];

  const allPokemon = await dexDataLoader.pokemon.loadMany(allNeededPids);
  const pokemonMetadata: Record<number, PokemonMetadata | null> = {};

  for (let idx = 0; idx < allNeededPids.length; idx++) {
    const pid = allNeededPids[idx];
    if (pid !== undefined) {
      const p = allPokemon[idx];
      pokemonMetadata[pid] = p && !(p instanceof Error) ? p : null;
    }
  }

  // Pre-fetch ancestral encounters
  const allAncestorPids = new Set<number>();
  for (let i = 0; i < queryTargets.length; i++) {
    const pid = queryTargets[i];
    if (pid === undefined) continue;
    const p = pokemonMetadata[pid];
    if (p?.efrm) {
      for (let j = 0; j < p.efrm.length; j++) {
        const ancestorId = p.efrm[j];
        if (ancestorId !== undefined) {
          allAncestorPids.add(ancestorId);
        }
      }
    }
  }

  const ancestorEncountersArray = await pokeDB.getEncountersBulk(Array.from(allAncestorPids));
  const ancestorEncountersByPid = new Map<number, LocationAreaEncounters>();
  for (let i = 0; i < ancestorEncountersArray.length; i++) {
    const e = ancestorEncountersArray[i];
    if (e && !(e instanceof Error)) {
      ancestorEncountersByPid.set(e.pid, e);
    }
  }

  for (let i = 0; i < queryTargets.length; i++) {
    const targetPid = queryTargets[i];
    if (targetPid === undefined) continue;
    const p = pokemonMetadata[targetPid];
    if (p?.efrm && p.efrm.length > 0) {
      ancestralEncounters[targetPid] = {};
      for (let j = 0; j < p.efrm.length; j++) {
        const ancestorId = p.efrm[j];
        if (ancestorId !== undefined) {
          const enc = ancestorEncountersByPid.get(ancestorId);
          if (enc) {
            ancestralEncounters[targetPid][ancestorId] = enc;
          }
        }
      }
    }
  }

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
 * The core orchestration function for the Assistant recommendation engine.
 *
 * Now updated to be an asynchronous function to support dynamic database querying of items.
 *
 * @param saveData - The parsed save data. Can be null if no save is loaded.
 * @param isLivingDex - Whether the player is tracking a Living Dex (verifies party/PC physically) rather than Pokédex flags.
 * @param manualVersion - An optional version override string to use instead of the auto-detected version.
 * @param apiData - The pre-fetched lookup tables and metadata generated by `fetchAssistantApiData`.
 * @param strategy - The generation-specific strategy object handling map layouts and mechanical rules.
 * @returns An object containing the sorted array of `Suggestion`s and debug information.
 *
 * @example
 * const strategy = await getStrategy(saveData.generation);
 * const suggestions = await generateSuggestions(saveData, false, undefined, apiData, strategy);
 */
export async function generateSuggestions(
  saveData: SaveData | null,
  isLivingDex: boolean,
  manualVersion: string | null | undefined,
  apiData: AssistantApiData | null,
  strategy: AssistantStrategy,
): Promise<{ suggestions: Suggestion[]; debug: { rejected: RejectedSuggestion[] } }> {
  const suggestions: Suggestion[] = [];
  const rejected: RejectedSuggestion[] = [];
  if (!saveData || !apiData) return { suggestions, debug: { rejected } };

  const genConfig = getGenerationConfig(saveData.generation);
  const maxDex = genConfig.maxDex;
  const missingIds = new Set<number>();

  const ownedSet = isLivingDex
    ? new Set([...(saveData.party || []), ...(saveData.pc || [])])
    : saveData.owned || new Set<number>();

  const allInstances = extractAllInstances(saveData);
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
  const queryTargets: number[] = [];
  for (const pid of missingIds) {
    if (queryTargets.length >= 100) break;
    queryTargets.push(pid);
  }

  const specialSuggestions = strategy.getSpecialSuggestions(saveData, Array.from(missingIds));
  suggestions.push(...specialSuggestions);

  const localPids = new Set<number>();

  const playerTools = extractPlayerTools(saveData, allInstances);

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

  filterSuggestionsByMissingTools(suggestions, playerTools, localPids);

  const instancesBySpecies = buildInventoryBySpecies(allInstances);

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

  await generateEvolutionSuggestions(
    queryTargets,
    saveData,
    apiData,
    instancesBySpecies,
    suggestions,
    displayVersion,
    missingIds,
  );

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
