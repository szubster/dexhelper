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
import {
  generateBreedingSuggestions,
  generateCatchSuggestions,
  generateEvolutionSuggestions,
  generateGiftAndTradeSuggestions,
} from './generators';
import type {
  AssistantApiData,
  AssistantStrategy,
  EncounterDetail,
  RejectedSuggestion,
  Suggestion,
} from './strategies/types';

// ⚡ Bolt: Eliminate O(N) tuple allocation and string parsing by pre-calculating static gift arrays
const STATIC_GIFT_PIDS = Object.keys(STATIC_GIFT_DATA).map((id) => parseInt(id, 10));
export const STATIC_GIFT_ENTRIES = Object.entries(STATIC_GIFT_DATA).map(([idStr, gift]) => ({
  giftId: parseInt(idStr, 10),
  gift,
}));

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
  // ⚡ Bolt: Removed .filter().some() to prevent closures and O(N) intermediate array allocations
  const localEncounters: LocationAreaEncounters[] = [];
  if (localAid) {
    for (let i = 0; i < allEncounters.length; i++) {
      const lae = allEncounters[i];
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

  const missingEncounters: Record<number, LocationAreaEncounters | null> = {};
  const ancestralEncounters: Record<number, Record<number, LocationAreaEncounters | null>> = {};

  // ⚡ Bolt: Prevent intermediate array tuple allocations during map construction
  const encountersByPid = new Map<number, LocationAreaEncounters>();
  for (let i = 0; i < allEncounters.length; i++) {
    const e = allEncounters[i];
    if (e) encountersByPid.set(e.pid, e);
  }

  // Fill missingEncounters
  for (const pid of queryTargets) {
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
          // ⚡ Bolt: Replaced .filter() with loop to prevent closures and array allocations
          const filteredDetails: EncounterDetail[] = [];
          for (let dIdx = 0; dIdx < details.length; dIdx++) {
            const d = details[dIdx];
            if (d) {
              if (d.method === 'headbutt' && !hasHeadbutt) continue;
              if (d.method === 'rock-smash' && !hasRockSmash) continue;
              filteredDetails.push(d);
            }
          }
          suggestion.encounterInfo[pid] = filteredDetails;

          if (filteredDetails.length > 0) {
            hasValidEncounter = true;
          } else {
            delete suggestion.encounterInfo[pid];
          }
        }
      }

      // If no valid encounters remain for this suggestion, remove it completely.
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
    STATIC_GIFT_ENTRIES,
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
