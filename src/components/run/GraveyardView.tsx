import { Ghost } from 'lucide-react';
import type { PokemonInstance } from '../../engine/saveParser/parsers/common';
import { PokemonSprite } from '../pokemon/PokemonSprite';
import { TacticalCard } from '../TacticalCard';

export interface GraveyardViewProps {
  graveyard: PokemonInstance[];
  generation: number;
}

export function GraveyardView({ graveyard, generation }: GraveyardViewProps) {
  return (
    <div className="flex flex-col gap-3">
      <h3 className="flex items-center gap-2 font-bold font-mono text-sm text-zinc-500 uppercase tracking-widest">
        <Ghost className="h-4 w-4" />
        SYS.GRAVEYARD
      </h3>
      <div className="grid grid-cols-2 gap-3 sm:grid-cols-3 md:grid-cols-6">
        {graveyard.map((pokemon, idx) => (
          <TacticalCard
            // biome-ignore lint/suspicious/noArrayIndexKey: Graveyard members might not have unique identifiers
            key={`grave-${idx}-${pokemon.speciesId}`}
            variant="default"
            className="flex flex-col items-center rounded-none border-zinc-900/50 border-dashed bg-zinc-950/20 p-3 opacity-80 grayscale hover:border-zinc-500/50"
          >
            <div className="relative mb-2 h-16 w-16">
              <PokemonSprite
                pokemonId={pokemon.speciesId}
                generation={generation}
                isShiny={pokemon.isShiny}
                className="h-full w-full object-contain"
              />
            </div>
            <div className="flex w-full flex-col items-center">
              <span className="w-full truncate text-center font-bold text-[10px] text-zinc-400 uppercase tracking-wider">
                {pokemon.otName ? pokemon.otName : `ID: ${pokemon.speciesId.toString().padStart(3, '0')}`}
              </span>
              <div className="mt-1 flex w-full items-center justify-between px-1">
                <span className="font-mono text-[9px] text-zinc-600">LVL {pokemon.level}</span>
                <span className="font-bold font-mono text-[9px] text-red-900/70">DEAD</span>
              </div>
            </div>
          </TacticalCard>
        ))}
        {graveyard.length === 0 && (
          <div className="col-span-full flex flex-col items-center justify-center rounded-none border border-zinc-800/50 border-dashed bg-zinc-950/20 p-8 text-center">
            <Ghost className="mb-3 h-8 w-8 text-zinc-600" />
            <span className="font-bold font-mono text-sm text-zinc-500 uppercase tracking-widest">
              NO CASUALTIES RECORDED
            </span>
          </div>
        )}
      </div>
    </div>
  );
}
