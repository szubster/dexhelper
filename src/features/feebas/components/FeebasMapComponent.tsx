import { Map as MapIcon } from 'lucide-react';
import { EmptyState } from '../../../components/EmptyState';
import { TacticalBlockHeader } from '../../../components/TacticalBlockHeader';
import { isGen3Save } from '../../../engine/saveParser/parsers/common';
import { useStore } from '../../../store';

export function FeebasMapComponent() {
  const saveData = useStore((s) => s.saveData);

  if (!saveData || !isGen3Save(saveData)) {
    return <EmptyState icon={<MapIcon size={24} />} label="NO FEEBAS TILE DATA AVAILABLE" />;
  }

  const tiles = saveData.gen3FeebasTiles;

  if (!tiles || tiles.length === 0) {
    return <EmptyState icon={<MapIcon size={24} />} label="NO FEEBAS TILE DATA AVAILABLE" />;
  }

  return (
    <div className="flex flex-col gap-4">
      <TacticalBlockHeader
        title="Feebas Tile Locator (Route 119)"
        trackingLabel="SYS.FEEBAS.LOC"
        icon={<MapIcon size={12} />}
      />

      <div className="flex flex-col gap-2 border border-zinc-800 border-dashed bg-zinc-900/50 p-4">
        <h3 className="font-mono text-sm text-zinc-400">ACTIVE TILES [{tiles.length}]</h3>
        <div className="grid grid-cols-2 gap-2 sm:grid-cols-3">
          {tiles.map((tile, i) => (
            <div
              // biome-ignore lint/suspicious/noArrayIndexKey: Reacting to a static array of raw coordinates
              key={`${tile[0]}-${tile[1]}-${i}`}
              className="flex items-center justify-between border border-zinc-800 bg-zinc-900 px-3 py-2"
            >
              <span className="font-mono text-xs text-zinc-500">TILE {i + 1}</span>
              <span className="font-mono text-green-400 text-sm">
                X: {tile[0]} / Y: {tile[1]}
              </span>
            </div>
          ))}
        </div>
        <p className="mt-2 font-mono text-xs text-zinc-500">[ DATA SOURCED FROM CURRENT SEED ]</p>
      </div>
    </div>
  );
}
