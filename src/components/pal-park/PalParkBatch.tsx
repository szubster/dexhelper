import type React from 'react';
import type { PalParkBatchedPokemon } from '../../engine/palPark/batch/batchUtils';
import { cn } from '../../utils/cn';
import { DataLabel } from '../DataLabel';
import { PokemonSprite } from '../pokemon/PokemonSprite';
import { TacticalCard } from '../TacticalCard';
import { TacticalPanel } from '../TacticalPanel';

interface PalParkBatchProps {
  batch: PalParkBatchedPokemon[];
  batchIndex: number;
  className?: string;
}

export const PalParkBatch: React.FC<PalParkBatchProps> = ({ batch, batchIndex, className }) => {
  return (
    <TacticalPanel className={cn('mb-4 p-4', className)} variant="default">
      <div className="mb-4 flex items-center justify-between">
        <h3 className="font-bold font-mono text-sm text-zinc-300 uppercase tracking-widest">
          Batch {batchIndex + 1} <span className="text-zinc-500">[{batch.length}/6]</span>
        </h3>
      </div>

      <div className="grid grid-cols-2 gap-4 md:grid-cols-3">
        {batch.map((p) => (
          <TacticalCard
            key={p.pokemon.hash}
            className="flex flex-col items-center justify-center gap-3 p-3 hover:border-zinc-500/50"
            variant="storage-default"
          >
            <div className="relative flex h-16 w-16 items-center justify-center">
              <PokemonSprite
                pokemonId={p.pokemon.speciesId}
                generation={3}
                isShiny={p.pokemon.isShiny}
                className="h-12 w-12"
              />
            </div>

            <div className="flex w-full flex-col items-center gap-1">
              <span className="font-bold font-mono text-xs text-zinc-200">
                {p.pokemon.nickname || p.pokemon.otName || '???'}
              </span>
              <div className="mt-1 flex gap-2">
                <DataLabel>Box {p.location.box}</DataLabel>
                {p.location.slot !== undefined && p.location.slot !== 0 && (
                  <DataLabel>Slot {p.location.slot}</DataLabel>
                )}
              </div>
            </div>
          </TacticalCard>
        ))}

        {/* Fill remaining slots if batch < 6 */}
        {Array.from({ length: Math.max(0, 6 - batch.length) }).map((_, i) => (
          <div
            // biome-ignore lint/suspicious/noArrayIndexKey: Empty filler slots do not have unique IDs
            key={`empty-${i}`}
            className="flex h-[120px] items-center justify-center rounded-none border border-zinc-800 border-dashed bg-zinc-900/30 opacity-50"
          >
            <span className="font-mono text-xs text-zinc-600">EMPTY SLOT</span>
          </div>
        ))}
      </div>
    </TacticalPanel>
  );
};
