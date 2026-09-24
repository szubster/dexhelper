import { useMemo } from 'react';
import { useStore } from '../store';
import { getGenerationConfig } from '../utils/generationConfig';

export function useLivingDexState() {
  const saveData = useStore((s) => s.saveData);
  const genConfig = saveData ? getGenerationConfig(saveData.generation) : null;
  const displayLimit = genConfig ? Math.min(genConfig.maxDex, 386) : 386;

  const partySet = useMemo(() => new Set(saveData?.party || []), [saveData?.party]);
  const pcSet = useMemo(() => new Set(saveData?.pc || []), [saveData?.pc]);

  const shinySpeciesIds = useMemo(() => {
    const set = new Set<number>();
    if (saveData) {
      for (let i = 0; i < saveData.partyDetails.length; i++) {
        const p = saveData.partyDetails[i];
        if (p?.isShiny) set.add(p.speciesId);
      }
      for (let i = 0; i < saveData.pcDetails.length; i++) {
        const p = saveData.pcDetails[i];
        if (p?.isShiny) set.add(p.speciesId);
      }
    }
    return set;
  }, [saveData]);

  const totalSecured = useMemo(() => {
    let count = 0;
    for (let id = 1; id <= displayLimit; id++) {
      if (partySet.has(id) || pcSet.has(id)) count++;
    }
    return count;
  }, [displayLimit, partySet, pcSet]);

  return {
    displayLimit,
    partySet,
    pcSet,
    shinySpeciesIds,
    totalSecured,
  };
}
