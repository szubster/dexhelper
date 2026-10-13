import type { PokemonInstance } from '../engine/saveParser/parsers/common';
import { usePokerusSpreadPlanner } from '../hooks/usePokerusSpreadPlanner';
import { cn } from '../utils/cn';
import { PokerusBadge } from './PokerusBadge';

interface PokerusSpreadPlannerProps {
  initialParty: (PokemonInstance | null)[];
  className?: string;
}

export function PokerusSpreadPlanner({ initialParty, className }: PokerusSpreadPlannerProps) {
  const { party, swapSlots, atRiskIndices } = usePokerusSpreadPlanner(initialParty);

  return (
    <div
      className={cn(
        'flex flex-col gap-2 border border-zinc-800 border-dashed bg-zinc-950 p-4 font-mono text-zinc-300',
        className,
      )}
    >
      <h2 className="mb-2 border-zinc-800 border-b border-dashed pb-2 font-bold text-sm uppercase">
        Pokérus Spread Planner
      </h2>

      <div className="mb-4 flex items-center justify-between border border-yellow-500/50 border-dashed bg-yellow-500/10 px-2 py-1 text-xs text-yellow-400">
        <span>[WARNING]</span>
        <span>Clock approaching midnight. Curing possible.</span>
      </div>

      <div className="flex flex-col gap-2">
        {party.map((pokemon, index) => {
          const isAtRisk = atRiskIndices.includes(index);
          const hasPokerus = pokemon?.pokerus !== undefined;
          const isContagious = pokemon?.pokerus && pokemon.pokerus.daysRemaining > 0;
          const isCured = pokemon?.pokerus && pokemon.pokerus.daysRemaining === 0;

          return (
            <div
              // biome-ignore lint/suspicious/noArrayIndexKey: order is semantically fixed to 6 party slots
              key={index}
              className={cn(
                'flex items-center justify-between border border-zinc-800 border-dashed p-2',
                isAtRisk && 'border-pink-500/50 bg-pink-500/10',
                isContagious && 'border-pink-500/80',
                isCured && 'border-zinc-700',
              )}
            >
              <div className="flex items-center gap-4">
                <span className="w-4 text-zinc-500">#{index + 1}</span>
                <span className="font-bold">
                  {pokemon ? pokemon.nickname || `Species ${pokemon.speciesId}` : '--- EMPTY ---'}
                </span>
              </div>

              <div className="flex items-center gap-2">
                {isAtRisk && <span className="text-[10px] text-pink-400 uppercase">[AT RISK]</span>}
                {hasPokerus && pokemon.pokerus && <PokerusBadge strain={pokemon.pokerus.strain} />}
                {pokemon && index > 0 && (
                  <button
                    type="button"
                    onClick={() => swapSlots(index, index - 1)}
                    className="ml-2 border border-zinc-700 border-dashed px-1 text-xs hover:bg-zinc-800"
                    title="Move up"
                  >
                    ↑
                  </button>
                )}
                {pokemon && index < 5 && (
                  <button
                    type="button"
                    onClick={() => swapSlots(index, index + 1)}
                    className="ml-1 border border-zinc-700 border-dashed px-1 text-xs hover:bg-zinc-800"
                    title="Move down"
                  >
                    ↓
                  </button>
                )}
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
