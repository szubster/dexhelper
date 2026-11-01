import { Map as MapIcon } from 'lucide-react';
import { useMemo } from 'react';
import { EmptyState } from '../../../components/EmptyState';
import { TacticalBlockHeader } from '../../../components/TacticalBlockHeader';
import { isFeebasWaterTile, ROUTE_119_HEIGHT, ROUTE_119_WIDTH } from '../../../engine/gen3/mapData/route119';
import { isGen3Save } from '../../../engine/saveParser/parsers/common';
import { useStore } from '../../../store';

export function Route119Map() {
  const saveData = useStore((s) => s.saveData);

  const tiles = useMemo(() => {
    if (!saveData || !isGen3Save(saveData) || !saveData.gen3FeebasTiles) {
      return null;
    }
    return saveData.gen3FeebasTiles;
  }, [saveData]);

  // Pre-calculate active tile set for faster lookup
  const activeTileSet = useMemo(() => {
    const set = new Set<string>();
    if (tiles) {
      for (const tile of tiles) {
        set.add(`${tile[0]},${tile[1]}`);
      }
    }
    return set;
  }, [tiles]);

  // Generate grid
  const grid = useMemo(() => {
    const rows = [];
    for (let y = 0; y < ROUTE_119_HEIGHT; y++) {
      const cols = [];
      for (let x = 0; x < ROUTE_119_WIDTH; x++) {
        const isWater = isFeebasWaterTile(x, y);
        const isActive = activeTileSet.has(`${x},${y}`);

        let tileClass = 'w-2 h-2 border-[0.5px] border-zinc-900/30 ';

        if (isActive) {
          tileClass += 'bg-green-500 z-10 scale-150 rounded-none animate-pulse border-dashed border-zinc-400';
        } else if (isWater) {
          tileClass += 'bg-blue-900/40 hover:bg-blue-800/60 rounded-none';
        } else {
          tileClass += 'bg-zinc-900/20 rounded-none';
        }

        cols.push(
          <div
            key={`${x}-${y}`}
            className={tileClass}
            title={isWater ? `Water Tile: [${x}, ${y}]` : `Land: [${x}, ${y}]`}
          />,
        );
      }
      rows.push(
        <div key={`row-${y}`} className="flex">
          {cols}
        </div>,
      );
    }
    return rows;
  }, [activeTileSet]);

  if (!tiles || tiles.length === 0) {
    return <EmptyState icon={<MapIcon size={24} />} label="NO FEEBAS TILE DATA AVAILABLE" />;
  }

  return (
    <div className="flex flex-col gap-4">
      <TacticalBlockHeader
        title="Route 119 Layout (Visual Map)"
        trackingLabel="SYS.MAP.R119"
        icon={<MapIcon size={12} />}
      />

      <div className="tactical-panel flex justify-center p-4">
        <div className="custom-scrollbar max-h-[600px] overflow-auto border border-dashed border-zinc-800 bg-black p-2">
          <div className="flex flex-col gap-0 select-none">{grid}</div>
        </div>
      </div>
    </div>
  );
}
