import type React from 'react';
import { PokeblockColor } from '../../../engine/saveParser/gen3/pokeblock/types';
import type { SaveData } from '../../../engine/saveParser/parsers/common';
import { TacticalPanel } from '../../TacticalPanel';
import { TelemetryDecoration } from '../../TelemetryDecoration';

export interface Gen3PokeblocksDashboardProps {
  saveData: SaveData;
}

const POKEBLOCK_COLOR_NAMES: Record<number, string> = {
  [PokeblockColor.Red]: 'RED',
  [PokeblockColor.Blue]: 'BLUE',
  [PokeblockColor.Pink]: 'PINK',
  [PokeblockColor.Green]: 'GREEN',
  [PokeblockColor.Yellow]: 'YELLOW',
  [PokeblockColor.Purple]: 'PURPLE',
  [PokeblockColor.Indigo]: 'INDIGO',
  [PokeblockColor.Brown]: 'BROWN',
  [PokeblockColor.LiteBlue]: 'LITE BLUE',
  [PokeblockColor.Olive]: 'OLIVE',
  [PokeblockColor.Gray]: 'GRAY',
  [PokeblockColor.Black]: 'BLACK',
  [PokeblockColor.White]: 'WHITE',
  [PokeblockColor.Gold]: 'GOLD',
};

export const Gen3PokeblocksDashboard: React.FC<Gen3PokeblocksDashboardProps> = ({ saveData }) => {
  if (
    saveData.generation !== 3 ||
    !saveData.gen3Pokeblocks ||
    saveData.gameVersion === 'firered' ||
    saveData.gameVersion === 'leafgreen'
  ) {
    return null;
  }

  const pokeblocks = saveData.gen3Pokeblocks.filter((p) => p.color !== 0);

  if (pokeblocks.length === 0) {
    return null;
  }

  return (
    <TacticalPanel className="mt-4 flex flex-col gap-4 border-[var(--theme-primary)]/50 border-t-2 p-4 pt-6">
      <TelemetryDecoration label="SYS.POKEBLOCKS" className="-top-[17px] left-[-1px]" />

      <div className="z-10 flex items-center justify-between">
        <span className="tactical-text font-black text-lg text-white">POKÉBLOCKS</span>
      </div>

      <div className="z-10 grid grid-cols-1 gap-2 md:grid-cols-2 lg:grid-cols-4">
        {pokeblocks.map((pokeblock, i) => (
          <div
            // Array indices aren't recommended for keys, but since pokeblocks don't have unique IDs
            // and this is a read-only list from a save file block that won't be reordered client-side,
            // it's acceptable here. We append a prefix to satisfy linting.
            // biome-ignore lint/suspicious/noArrayIndexKey: List is read-only and static once parsed from save data.
            key={`pokeblock-${i}`}
            className={`flex items-center justify-between rounded-none border-2 border-[var(--theme-primary)] border-dashed bg-[var(--theme-primary)]/10 p-2 font-mono text-[var(--theme-primary)] text-xs`}
          >
            <span className="truncate">{POKEBLOCK_COLOR_NAMES[pokeblock.color] || 'UNKNOWN'} POKÉBLOCK</span>
            <span className="flex-shrink-0 font-black">[X]</span>
          </div>
        ))}
      </div>
    </TacticalPanel>
  );
};
