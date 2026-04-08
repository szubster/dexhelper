import { useQuery } from '@tanstack/react-query';
import { SaveData } from '../engine/saveParser/index';
import { getGenerationConfig } from '../utils/generationConfig';
import { fetchAssistantApiData, generateSuggestions } from '../engine/assistant/suggestionEngine';

export * from '../engine/assistant/strategies/types';

export function useAssistant(
  saveData: SaveData | null,
  isLivingDex: boolean,
  manualVersion?: string | null,
) {
  const maxDex = saveData ? getGenerationConfig(saveData.generation).maxDex : 0;
  const missingIds: number[] = [];
  const ownedSet = saveData
    ? isLivingDex
      ? new Set([...saveData.party, ...saveData.pc])
      : saveData.owned
    : new Set<number>();

  if (saveData) {
    for (let i = 1; i <= maxDex; i++) {
      if (!ownedSet.has(i)) {
        if (saveData.generation === 1 && i === 150 && (saveData.hallOfFameCount || 0) === 0)
          continue;
        missingIds.push(i);
      }
    }
  }
  const queryTargetsSlice = missingIds.slice(0, 30);

  const { data: apiData, isLoading: isLoadingEncounters } = useQuery({
    queryKey: [
      'assistantData',
      saveData?.generation,
      saveData?.currentMapId,
      queryTargetsSlice.join(','),
      saveData?.party?.join(','),
    ],
    queryFn: () => fetchAssistantApiData(saveData!, queryTargetsSlice),
    enabled: !!saveData,
  });

  const { suggestions, debug } = generateSuggestions(saveData, isLivingDex, manualVersion, apiData);
  return { suggestions, debug, isLoading: isLoadingEncounters };
}
