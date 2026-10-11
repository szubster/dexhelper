import type React from 'react';
import type { Gen3Pokeblock } from '../../engine/saveParser/gen3/pokeblock/types';
import type { Gen3SaveData } from '../../engine/saveParser/parsers/common';
import { useStore } from '../../store';
import { TacticalBlockHeader } from '../TacticalBlockHeader';
import { TacticalPanel } from '../TacticalPanel';

export const Gen3PokeblocksDashboard: React.FC = () => {
  const saveData = useStore((s) => s.saveData);

  if (saveData?.generation !== 3) {
    return null;
  }

  const gen3Data = saveData as Gen3SaveData;
  const pokeblocks = gen3Data.gen3Pokeblocks;

  if (!pokeblocks || pokeblocks.length === 0) {
    return null;
  }

  return (
    <div className="flex flex-col gap-2">
      <TacticalBlockHeader title="POKÉBLOCKS" trackingLabel="POKEBLOCKS" />
      <TacticalPanel className="p-4">
        <div className="custom-scrollbar max-h-[300px] overflow-y-auto pr-2">
          {pokeblocks.map((block: Gen3Pokeblock, idx: number) => (
            // biome-ignore lint/suspicious/noArrayIndexKey: Safe here since list order is fixed
            <div key={idx} className="mb-2 flex flex-col border border-gray-700 border-dashed bg-black/40 p-2">
              <div className="font-mono text-gray-300 text-xs">
                Pokéblock #{idx + 1} - Color: {block.color}
              </div>
              <div className="mt-2 grid grid-cols-5 gap-1 text-center font-mono text-[10px] text-gray-400">
                <div className="flex flex-col">
                  <span className="text-red-400">Spicy:</span>
                  <span>{block.spicy}</span>
                </div>
                <div className="flex flex-col">
                  <span className="text-blue-400">Dry:</span>
                  <span>{block.dry}</span>
                </div>
                <div className="flex flex-col">
                  <span className="text-pink-400">Sweet:</span>
                  <span>{block.sweet}</span>
                </div>
                <div className="flex flex-col">
                  <span className="text-green-400">Bitter:</span>
                  <span>{block.bitter}</span>
                </div>
                <div className="flex flex-col">
                  <span className="text-yellow-400">Sour:</span>
                  <span>{block.sour}</span>
                </div>
              </div>
              <div className="mt-2 border-gray-800 border-t border-dashed pt-1 font-mono text-[10px] text-gray-500">
                Feel: {block.feel}
              </div>
            </div>
          ))}
        </div>
      </TacticalPanel>
    </div>
  );
};
