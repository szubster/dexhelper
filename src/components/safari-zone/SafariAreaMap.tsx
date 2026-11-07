import { TacticalBadge } from '@dexhelper/ui';
import React from 'react';
import { Gen1SafariZone } from '../../engine/data/gen1/safariZone';
import { HoennSafariZone, KantoSafariZoneGen3 } from '../../engine/data/gen3/safariZone';
import { TacticalCard } from '../TacticalCard';
import { TacticalPanel } from '../TacticalPanel';
import type { useSafariZoneSelection } from './useSafariZoneSelection';

interface Props {
  selection: ReturnType<typeof useSafariZoneSelection>;
}

export function SafariAreaMap({ selection }: Props) {
  const { version, availableAreas, targetPokemon } = selection;

  const allAreas = React.useMemo(() => {
    if (['red', 'blue', 'yellow'].includes(version)) {
      return Gen1SafariZone;
    }
    if (['ruby', 'sapphire', 'emerald'].includes(version)) {
      return HoennSafariZone;
    }
    if (['firered', 'leafgreen'].includes(version)) {
      return KantoSafariZoneGen3;
    }
    return [];
  }, [version]);

  const availableAreaNames = new Set(availableAreas.map((a) => a.name));

  return (
    <TacticalPanel className="flex flex-col gap-4 p-4" variant="default">
      <div className="flex items-center justify-between border-b border-dashed border-zinc-800 pb-2">
        <h2 className="font-mono text-lg font-bold tracking-tight text-white uppercase">AREA MAP</h2>
        <TacticalBadge variant="emerald">[ {availableAreas.length} AREAS ]</TacticalBadge>
      </div>
      <div className="grid grid-cols-2 gap-3 sm:grid-cols-3">
        {allAreas.map((area) => {
          const isAvailable = availableAreaNames.has(area.name);
          return (
            <TacticalCard
              key={area.name}
              variant={isAvailable ? 'emerald' : 'default'}
              className={`p-3 ${!isAvailable && targetPokemon !== null ? 'opacity-30' : ''}`}
            >
              <div className="flex h-full flex-col items-center justify-center text-center">
                <span className="font-mono text-xs font-bold text-white uppercase">{area.name.replace(/-/g, ' ')}</span>
              </div>
            </TacticalCard>
          );
        })}
      </div>
    </TacticalPanel>
  );
}
