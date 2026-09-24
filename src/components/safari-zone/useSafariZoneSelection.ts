import { useMemo, useState } from 'react';
import { Gen1SafariZone } from '../../engine/data/gen1/safariZone';
import { HoennSafariZone, KantoSafariZoneGen3 } from '../../engine/data/gen3/safariZone';
import type { SafariArea } from '../../engine/data/shared/safariZoneTypes';

export type GameVersion = 'red' | 'blue' | 'yellow' | 'ruby' | 'sapphire' | 'emerald' | 'firered' | 'leafgreen';

interface UseSafariZoneSelectionProps {
  initialVersion?: GameVersion;
  initialTargetPokemon?: number | null;
}

export function useSafariZoneSelection({
  initialVersion = 'emerald',
  initialTargetPokemon = null,
}: UseSafariZoneSelectionProps = {}) {
  const [version, setVersion] = useState<GameVersion>(initialVersion);
  const [targetPokemon, setTargetPokemon] = useState<number | null>(initialTargetPokemon);

  const availableAreas = useMemo(() => {
    let allAreas: SafariArea[] = [];
    if (['red', 'blue', 'yellow'].includes(version)) {
      allAreas = Gen1SafariZone;
    } else if (['ruby', 'sapphire', 'emerald'].includes(version)) {
      allAreas = HoennSafariZone;
    } else if (['firered', 'leafgreen'].includes(version)) {
      allAreas = KantoSafariZoneGen3;
    }

    if (targetPokemon === null) {
      return allAreas;
    }

    return allAreas.filter((area) => {
      const encounters = area.encounters[version];
      if (!encounters) return false;
      return encounters.some((encounter) => encounter.pokemon === targetPokemon);
    });
  }, [version, targetPokemon]);

  return {
    version,
    setVersion,
    targetPokemon,
    setTargetPokemon,
    availableAreas,
  };
}
