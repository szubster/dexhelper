import { useMemo } from 'react';
import type { SafariArea } from '../../engine/data/shared/safariZoneTypes';
import { getMissingSafariEncounters } from '../../engine/safariZone/missingEncounters';
import { useStore } from '../../store';

export function useSafariZoneMissingEncounters(): SafariArea[] {
  const saveData = useStore((state) => state.saveData);

  return useMemo(() => {
    if (!saveData) return [];
    return getMissingSafariEncounters(saveData);
  }, [saveData]);
}
