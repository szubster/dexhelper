import { Map as MapIcon } from 'lucide-react';
import { useMemo } from 'react';
import { Gen1SafariZone } from '../../engine/data/gen1/safariZone';
import { HoennSafariZone, KantoSafariZoneGen3 } from '../../engine/data/gen3/safariZone';
import type { SafariArea } from '../../engine/data/shared/safariZoneTypes';
import { TacticalBadge } from '../TacticalBadge';
import { TacticalPanel } from '../TacticalPanel';
import type { GameVersion } from './useSafariZoneSelection';

interface Props {
  version: GameVersion;
  availableAreas: SafariArea[];
  targetPokemon: number | null;
}

export function SafariAreaMap({ version, availableAreas, targetPokemon }: Props) {
  const allAreas = useMemo(() => {
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
      <div className="flex items-center justify-between border-zinc-800 border-b border-dashed pb-2">
        <div className="flex items-center gap-2">
          <MapIcon size={16} className="text-zinc-500" aria-hidden="true" />
          <h2 className="font-bold font-mono text-sm text-white uppercase tracking-tight">AREA MAP</h2>
        </div>
        <TacticalBadge variant="zinc">
          <span aria-hidden="true">[</span> {availableAreas.length} AREAS <span aria-hidden="true">]</span>
        </TacticalBadge>
      </div>

      <div className="grid grid-cols-2 gap-2 sm:grid-cols-4" data-testid="safari-area-map">
        {allAreas.map((area) => {
          const isTargeted = availableAreaNames.has(area.name);
          const hasPokemon = targetPokemon !== null;

          let variant: 'emerald' | 'zinc' = 'zinc';
          let label = 'INACTIVE';

          if (!hasPokemon) {
            variant = 'zinc';
            label = 'STANDBY';
          } else if (isTargeted) {
            variant = 'emerald';
            label = 'TARGET FOUND';
          } else {
            variant = 'zinc';
            label = 'NO SIGNAL';
          }

          return (
            <div
              key={area.name}
              className={`flex flex-col items-center justify-center border border-dashed p-3 font-mono transition-all duration-300 ${
                isTargeted && hasPokemon
                  ? 'border-emerald-500/50 bg-emerald-950/20 text-emerald-400'
                  : hasPokemon
                    ? 'border-zinc-800 bg-zinc-950 text-zinc-600'
                    : 'border-zinc-700 bg-zinc-900/50 text-zinc-400 hover:border-zinc-500 hover:text-zinc-300'
              }`}
            >
              <span className="mb-1 text-center font-bold text-xs uppercase">{area.name.replace(/-/g, ' ')}</span>
              <TacticalBadge variant={variant} dot={isTargeted && hasPokemon} pulse={isTargeted && hasPokemon}>
                <span aria-hidden="true">[</span> {label} <span aria-hidden="true">]</span>
              </TacticalBadge>
            </div>
          );
        })}
      </div>
    </TacticalPanel>
  );
}
