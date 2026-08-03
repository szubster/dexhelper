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

import { STATIC_GIFT_DATA as STATIC_GIFT_DATA_GEN1 } from '../data/gen1/assistantData';
import { STATIC_GIFT_DATA as STATIC_GIFT_DATA_GEN2 } from '../data/gen2/assistantData';
import { STATIC_GIFT_DATA as STATIC_GIFT_DATA_GEN3 } from '../data/gen3/assistantData';
import type { PokemonInstance, SaveData } from '../saveParser/index';
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
 * Fetches all necessary background data from local IndexedDB to power the suggestion engine.
 *
 * @param saveData - The parsed save data containing the player's current state, inventory, and party.
 * @param queryTargets - An array of Pokemon IDs (Pokedex numbers) the engine is actively trying to find suggestions for.
 * @returns {Promise<AssistantApiData>} An object containing grouped maps, locations, encounters, and pokemon metadata required for the engine's synchronous pass.
 *
 * @remarks
 * **Why this design?**
 * The suggestion engine must execute synchronously to avoid React state tearing and UI thread freezes.
 * If the engine queried IndexedDB iteratively (e.g. `await getEncounter(id)`) inside the evaluation loop,
 * the massive volume of promises would cause severe N+1 query overhead. By pre-fetching all required
 * domain data upfront via `DataLoader` batches, `generateSuggestions` operates purely in memory.
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

  // ⚡ Bolt: Avoid N+1 and massive O(N) overhead by bulk querying specific ids instead of getAll.
  // Why Sets? Ensures unique PIDs, minimizing the database payload size and transmission time from IndexedDB.
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

  // ⚡ Bolt: Replaced .forEach with for loop to avoid closure creation and function call overhead.
  // Why? Iterating manually prevents the V8 engine from constantly allocating new closure scopes,
  // which causes GC (Garbage Collection) pauses when processing hundreds of Pokémon in a tight loop.
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

  // ⚡ Bolt: Removed Object.fromEntries(map(...)) chain to prevent intermediate array allocations
  // Why? Transforming arrays iteratively directly into an object creates 0 intermediate tuples, reducing memory overhead from O(N) to O(1).
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
 * This function processes the player's current save state and identifies up to 100 missing Pokémon
 * in the Pokédex (or Living Dex). It then delegates out to several categorical sub-generators
 * (Catch, Gift, Trade, Evolution, Breed) to aggregate actionable advice on how to obtain them.
 *
 * **Architecture Note:**
 * This function is fully synchronous. It relies on `fetchAssistantApiData` having already loaded all required
 * mapping and metadata into memory (`apiData`). It extensively uses Sets and Map caching internally to
 * maintain O(1) lookups during array processing, preventing UI thread blockage on low-end devices.
 *
 * @param saveData - The parsed binary save data indicating the player's progress, location, and inventory.
 * @param isLivingDex - If true, evaluates missing Pokémon based on exact physical quantity rather than just Pokédex flags (e.g., needing 3 Bulbasaur lines instead of just 1 Venusaur).
 * @param manualVersion - Optional manual override for game version if auto-detection falls back to "unknown".
 * @param apiData - The pre-fetched, complete database of Pokémon metadata, evolution rules, and encounter tables.
 * @param strategy - The generation-specific strategy object containing mechanical rules (Gen 1 vs Gen 2 vs Gen 3).
 * @returns An object containing the final sorted list of `suggestions`, and a `debug` payload containing `rejected` reasons for Pokémon that were filtered out (e.g., version exclusives).
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
  // ⚡ Bolt: Optimize O(n) array includes to O(1) Set has
  // Why Sets? Set.has() is O(1) whereas Array.includes() is O(N), critical for tight lookup loops.
  const missingIds = new Set<number>();

  const ownedSet = isLivingDex
    ? new Set([...(saveData.party || []), ...(saveData.pc || [])])
    : saveData.owned || new Set<number>();

  const allInstances = [...(saveData.partyDetails || []), ...(saveData.pcDetails || [])];
  // ⚡ Bolt: Removed .filter().map() chain to prevent intermediate array allocations
  // Why? Single manual iteration eliminates transient tuple objects, reducing GC spikes.
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
  // ⚡ Bolt: Use a manual loop instead of Array.from().slice() to eliminate intermediate array allocations.
  // Why? We strictly limit queryTargets to 100 to prevent the UI thread from freezing when evaluating massive
  // encounter graphs (e.g. processing a fresh save file where nearly all Pokémon are missing).
  const queryTargets: number[] = [];
  for (const pid of missingIds) {
    if (queryTargets.length >= 100) break;
    queryTargets.push(pid);
  }

  // === PHASE 1: Core Target Generation ===

  // Special Strategy-Specific Suggestions (e.g. Box full warning)
  // Processed first so they can bypass the standard encounter generation logic if necessary.
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

  // === PHASE 2: Post-Processing & Global State Filtering ===
  // Filter out HM/Item dependent encounters (like Headbutt, Surf, Fishing) if the player lacks the required tools.
  // Why is this done as a post-processing step rather than during generation?
  // `generateCatchSuggestions` iterates through thousands of granular encounter nodes deep within the graph.
  // Pushing HM possession checks (global state) down into every individual encounter loop would severely
  // degrade performance. Instead, we generate all *potential* catch suggestions first, and then do a single
  // O(N) sweep over the final high-level suggestions to prune the impossible ones.
  filterSuggestionsByMissingTools(suggestions, playerTools, localPids);

  // === PHASE 3: Context-Aware Suggestions (Gifts, Trades, Evolutions) ===
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

  // ⚡ Bolt: Eliminate O(N) array tuple allocation during suggestion deduplication.
  // Why? We manually iterate and set Map values instead of `Array.from(new Set(suggestions))`
  // because generating a massive intermediate array of tuples would cause significant garbage collection pauses.
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
