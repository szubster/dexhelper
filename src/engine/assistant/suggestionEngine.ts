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

import { STATIC_GIFT_DATA } from '../data/gen1/assistantData';
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
const STATIC_GIFT_PIDS = Object.keys(STATIC_GIFT_DATA).map((id) => parseInt(id, 10));

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

  // ⚡ Bolt: Avoid N+1 and massive O(N) overhead by bulk querying specific ids instead of getAll.
  // We use Sets to ensure unique PIDs, minimizing the database payload.
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

  // ⚡ Bolt: Replaced .forEach with for loop to avoid closure creation and function call overhead.
  // Iterating manually prevents the V8 engine from constantly allocating new closure scopes,
  // which is critical when processing hundreds of Pokémon in a tight loop.
  for (let idx = 0; idx < allNeededPids.length; idx++) {
    const pid = allNeededPids[idx];
    if (pid !== undefined) {
      const p = allPokemon[idx];
      pokemonMetadata[pid] = p && !(p instanceof Error) ? p : null;
    }
  }

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
  // ⚡ Bolt: Use a manual loop instead of Array.from().slice() to eliminate intermediate array allocations.
  // We strictly limit queryTargets to 100 to prevent the UI thread from freezing when evaluating massive
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
  // We manually iterate and set Map values instead of `Array.from(new Set(suggestions))`
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
