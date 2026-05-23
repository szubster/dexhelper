import { useQuery } from '@tanstack/react-query';
import { useNavigate } from '@tanstack/react-router';
import { Shield } from 'lucide-react';
import React from 'react';
import { useStore } from '../../store';
import { pokemonListQueryOptions } from '../../utils/pokemonQueries';
import { PokemonSprite } from '../pokemon/PokemonSprite';
import { TacticalCard } from '../TacticalCard';

export function AliveTeam() {
  const saveData = useStore((s) => s.saveData);
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

  if (!saveData || !pokemonList) return null;

  const aliveTeam = (saveData.partyDetails || []).filter((p) => (p.currentHp ?? 0) > 0);

  return (
    <div className="flex flex-col gap-6">
      <div className="flex items-center gap-3">
        <Shield className="h-5 w-5 text-emerald-500" />
        <h3 className="font-bold font-mono text-emerald-500 text-sm uppercase tracking-widest">SYS.ALIVE_TEAM</h3>
        <div className="h-px flex-1 border-emerald-900 border-b border-dashed bg-zinc-900"></div>
        <span className="font-black font-mono text-[10px] text-zinc-600 uppercase tracking-widest">
          {aliveTeam.length} MEMBERS
        </span>
      </div>

      <div className="grid grid-cols-2 gap-4 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6">
        {aliveTeam.length === 0 ? (
          <div className="col-span-full rounded-none border border-zinc-800 border-dashed bg-zinc-900/20 p-8 text-center font-mono text-xs text-zinc-500 uppercase">
            No surviving team members
          </div>
        ) : (
          aliveTeam.map((p, idx) => {
            const pokemon = pokemonMap.get(p.speciesId);
            if (!pokemon) return null;

            return (
              <TacticalCard
                // biome-ignore lint/suspicious/noArrayIndexKey: Array index is stable and required for duplicates
                key={`alive-${p.speciesId}-${idx}`}
                variant="storage-emerald"
                onClick={() => handleNavigate(pokemon.id)}
              >
                <div className="absolute top-3 left-3 font-bold font-mono text-[10px] text-zinc-600">LV.{p.level}</div>
                <div className="relative mb-4 flex h-20 w-20 items-center justify-center sm:h-24 sm:w-24">
                  <PokemonSprite
                    pokemonId={pokemon.id}
                    generation={saveData.generation}
                    isShiny={p.isShiny}
                    alt={pokemon.name}
                    className="h-full w-full object-contain drop-shadow-xl"
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
