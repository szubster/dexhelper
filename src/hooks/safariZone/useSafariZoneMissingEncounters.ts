import { useMemo } from 'react';
import type { SafariArea } from '../../engine/data/shared/safariZoneTypes';
import { getMissingGen1SafariEncounters } from '../../engine/safariZone/gen1/missingEncounters';
import { getMissingGen3SafariEncounters } from '../../engine/safariZone/gen3/missingEncounters';
import { isGen3Save } from '../../engine/saveParser/parsers/common';
import { useStore } from '../../store';

export function useSafariZoneMissingEncounters(): SafariArea[] {
  const saveData = useStore((state) => state.saveData);

  return useMemo(() => {
    if (!saveData) return [];

    if (saveData.generation === 1) {
      return getMissingGen1SafariEncounters(saveData);
    }

    if (isGen3Save(saveData)) {
      return getMissingGen3SafariEncounters(saveData);
    }

    return [];
  }, [saveData]);
}
