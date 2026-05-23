import { useQuery } from '@tanstack/react-query';
import { useNavigate } from '@tanstack/react-router';
import { Skull } from 'lucide-react';
import React from 'react';
import { getGraveyardPokemon } from '../../engine/nuzlocke/tracker';
import { useStore } from '../../store';
import { pokemonListQueryOptions } from '../../utils/pokemonQueries';
import { PokemonSprite } from '../pokemon/PokemonSprite';
import { TacticalCard } from '../TacticalCard';

export function Graveyard() {
  const saveData = useStore((s) => s.saveData);
  const nuzlockeGraveyardBox = useStore((s) => s.nuzlockeGraveyardBox);
  const navigate = useNavigate();

  const { data: pokemonList } = useQuery(pokemonListQueryOptions);

  const handleNavigate = React.useCallback(
    (id: number) => {
      void navigate({ to: `/pokemon/${id}`, search: { from: '/run' } });
    },
    [navigate],
  );

  const pokemonMap = React.useMemo(() => {
    const map = new Map<number, { id: number; name: string }>();
    (pokemonList || []).forEach((p) => {
      map.set(p.id, p);
    });
    return map;
  }, [pokemonList]);

  if (!saveData || !nuzlockeGraveyardBox || !pokemonList) return null;

  const graveyardPokemon = getGraveyardPokemon(saveData, nuzlockeGraveyardBox);

  return (
    <div className="flex flex-col gap-6">
      <div className="flex items-center gap-3">
        <Skull className="h-5 w-5 text-red-500" />
        <h3 className="font-bold font-mono text-red-500 text-sm uppercase tracking-widest">SYS.GRAVEYARD</h3>
        <div className="h-px flex-1 border-red-900 border-b border-dashed bg-zinc-900"></div>
        <span className="font-black font-mono text-[10px] text-zinc-600 uppercase tracking-widest">
          {graveyardPokemon.length} CASUALTIES
        </span>
      </div>

      <div className="grid grid-cols-2 gap-4 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6">
        {graveyardPokemon.length === 0 ? (
          <div className="col-span-full rounded-none border border-zinc-800 border-dashed bg-zinc-900/20 p-8 text-center font-mono text-xs text-zinc-500 uppercase">
            No casualties reported
          </div>
        ) : (
          graveyardPokemon.map((p, idx) => {
            const pokemon = pokemonMap.get(p.speciesId);
            if (!pokemon) return null;

            return (
              <TacticalCard
                // biome-ignore lint/suspicious/noArrayIndexKey: Array index is stable and required for duplicates
                key={`graveyard-${p.speciesId}-${idx}`}
                variant="storage-red"
                onClick={() => handleNavigate(pokemon.id)}
              >
                <div className="absolute top-3 left-3 font-bold font-mono text-[10px] text-zinc-600">LV.{p.level}</div>
                <div className="relative mb-4 flex h-20 w-20 items-center justify-center sm:h-24 sm:w-24">
                  <PokemonSprite
                    pokemonId={pokemon.id}
                    generation={saveData.generation}
                    isShiny={p.isShiny}
                    alt={pokemon.name}
                    className="h-full w-full object-contain opacity-50 drop-shadow-xl grayscale"
                  />
                  <Skull
                    size={48}
                    className="pointer-events-none absolute inset-0 z-20 m-auto text-red-500/50 drop-shadow-md"
                  />
                </div>
                <div className="w-full truncate px-1 text-center font-bold text-[10px] text-zinc-100 uppercase tracking-wider">
                  {pokemon.name}
                </div>
              </TacticalCard>
            );
          })
        )}
      </div>
    </div>
  );
}
