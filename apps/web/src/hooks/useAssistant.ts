import { useQuery } from '@tanstack/react-query';
import { useMemo } from 'react';
import { getStrategy } from '@dexhelper/engine/assistant/strategies/index';
import { fetchAssistantApiData, generateSuggestions } from '@dexhelper/engine/assistant/suggestionEngine';
import { RouteRadarController } from '@dexhelper/engine/radar/RouteRadarController';
import type { SaveData } from '@dexhelper/engine/saveParser/index';
import { getGenerationConfig } from '../utils/generationConfig';

/**
 * A React hook that orchestrates the Pokémon suggestion engine.
 * It identifies missing Pokémon, fetches necessary encounter data from IndexedDB,
 * and generates prioritized recommendations asynchronously.
 *
 * @param saveData - The parsed save data of the current game.
 * @param isLivingDex - If true, evaluates "owned" based on physical storage (PC/Party) instead of Pokédex flags.
 * @param manualVersion - An optional version override if heuristics detected the wrong game.
 * @returns An object containing the generated suggestions, loading state, and area name mappings.
 *
 * @example
 * const { suggestions, isLoading } = useAssistant(saveData, false, 'red');
 */
export function useAssistant(saveData: SaveData | null, isLivingDex: boolean, manualVersion?: string | null) {
  // ⚡ Bolt: Memoized expensive missing ID and owned set calculations to prevent redundant work on every render
  const queryTargetsSlice = useMemo(() => {
    const maxDex = saveData ? getGenerationConfig(saveData.generation).maxDex : 0;
    const missingIds: number[] = [];

    // If building a Living Dex, the internal Pokédex 'owned' flag isn't sufficient.
    // We must verify the player physically possesses the Pokémon in their Party or PC.
    const ownedSet = saveData
      ? isLivingDex
        ? new Set([...saveData.party, ...saveData.pc])
        : saveData.owned
      : new Set<number>();

    if (saveData) {
      for (let i = 1; i <= maxDex; i++) {
        if (!ownedSet.has(i)) {
          // Mewtwo (150) is physically inaccessible in Gen 1 until the Elite Four is defeated.
          if (saveData.generation === 1 && i === 150 && (saveData.hallOfFameCount || 0) === 0) continue;
          missingIds.push(i);
        }
      }
    }

    // Limit the synchronous engine to evaluating the first 30 missing Pokémon at a time.
    // This prevents massive batched queries to IndexedDB and keeps the UI responsive.
    return missingIds.slice(0, 30);
  }, [saveData, isLivingDex]);

  const { data: queryData, isLoading } = useQuery({
    queryKey: [
      'assistantData',
      saveData?.generation,
      saveData?.currentMapId,
      queryTargetsSlice.join(','),
      saveData?.party?.join(','),
      isLivingDex,
      manualVersion,
    ],
    queryFn: async () => {
      if (!saveData) throw new Error('No save data');
      const apiData = await fetchAssistantApiData(saveData, queryTargetsSlice);
      const strategy = await getStrategy(saveData.generation);
      const suggestionsResult = await generateSuggestions(saveData, isLivingDex, manualVersion, apiData, strategy);
      return { apiData, ...suggestionsResult };
    },
    enabled: !!saveData,
  });

  const suggestions = queryData?.suggestions ?? [];
  const debug = queryData?.debug ?? { rejected: [] };
  const areaNames = queryData?.apiData?.areaNames;

  const heatmap = useMemo(() => {
    const controller = new RouteRadarController();
    return controller.calculateHeatmap(suggestions);
  }, [suggestions]);

  return {
    suggestions,
    debug,
    isLoading: isLoading,
    areaNames,
    heatmap,
  };
}
