import { Link } from '@tanstack/react-router';
import type { SaveData } from '@dexhelper/engine/saveParser/index';
import { PokemonSprite } from '../pokemon/PokemonSprite';

export function PokemonListSection({
  pokemonIds,
  saveData,
  getPokemonName,
}: {
  pokemonIds: number[];
  saveData: SaveData;
  getPokemonName: (id: number) => string;
}) {
  return (
    <div className="flex flex-wrap gap-2">
      {(pokemonIds || []).slice(0, 8).map((pid) => (
        <Link
          key={pid}
          to="/pokemon/$pokemonId"
          params={{ pokemonId: pid.toString() }}
          search={{ from: '/assistant' }}
          className="group/sprite focus-visible:tactical-focus relative h-10 w-10 rounded-none border border-white/10 border-dashed bg-black/40 p-1 transition-all hover:scale-110 hover:border-white/40 hover:bg-black/60"
          title={getPokemonName(pid)}
          aria-label={`View details for ${getPokemonName(pid)}`}
          onClick={(e) => e.stopPropagation()}
        >
          <PokemonSprite
            pokemonId={pid}
            generation={saveData.generation}
            alt={getPokemonName(pid)}
            className="h-full w-full object-contain"
          />
        </Link>
      ))}
      {(pokemonIds?.length ?? 0) > 8 && (
        <div className="flex h-10 w-10 items-center justify-center rounded-none border border-white/10 border-dashed bg-black/40 font-bold font-mono text-xs text-zinc-500">
          +{(pokemonIds?.length ?? 0) - 8}
        </div>
      )}
    </div>
  );
}
