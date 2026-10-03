import React from 'react';
import { Gen1SafariZone } from '../../engine/data/gen1/safariZone';
import { HoennSafariZone, KantoSafariZoneGen3 } from '../../engine/data/gen3/safariZone';
import { SafariAreaMap } from './SafariAreaMap';
import { SafariTargetSelection } from './SafariTargetSelection';
import type { GameVersion } from './useSafariZoneSelection';
import { useSafariZoneSelection } from './useSafariZoneSelection';

interface Props {
  initialVersion: GameVersion;
}

export const SafariAreaHighlighter: React.FC<Props> = ({ initialVersion }) => {
  const { version, setVersion, targetPokemon, setTargetPokemon, availableAreas } = useSafariZoneSelection({
    initialVersion,
  });

  const allAreas = React.useMemo(() => {
    if (['red', 'blue', 'yellow'].includes(version)) return Gen1SafariZone;
    if (['ruby', 'sapphire', 'emerald'].includes(version)) return HoennSafariZone;
    if (['firered', 'leafgreen'].includes(version)) return KantoSafariZoneGen3;
    return [];
  }, [version]);

  return (
    <div className="flex flex-col gap-4">
      <div className="flex items-center justify-between border-zinc-800 border-b border-dashed pb-2">
        <h2 className="font-bold font-mono text-lg text-white uppercase tracking-tight">AREA RADAR</h2>
      </div>
      <SafariTargetSelection
        version={version}
        setVersion={setVersion}
        targetPokemon={targetPokemon}
        setTargetPokemon={setTargetPokemon}
      />
      <SafariAreaMap allAreas={allAreas} availableAreas={availableAreas} />
    </div>
  );
};
