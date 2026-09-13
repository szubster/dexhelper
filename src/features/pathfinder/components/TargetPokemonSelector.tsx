import { useQuery } from '@tanstack/react-query';
import type React from 'react';
import { useMemo } from 'react';
import { TacticalSelect } from '../../../components/TacticalSelect';
import { pokeDB } from '../../../db/PokeDB';
import { useSetTargetPokemon, useTargetPokemon } from '../hooks';

export const TargetPokemonSelector: React.FC = () => {
  const targetPokemon = useTargetPokemon();
  const setTargetPokemon = useSetTargetPokemon();

  const { data: pokemonList } = useQuery({
    queryKey: ['allPokemon'],
    queryFn: () => pokeDB.getAllPokemon(),
  });

  const sortedPokemon = useMemo(() => {
    if (!pokemonList) return [];
    return [...pokemonList].sort((a, b) => a.n.localeCompare(b.n));
  }, [pokemonList]);

  return (
    <div className="flex flex-col gap-2">
      <label htmlFor="target-species" className="font-mono text-[10px] text-cyan-500 uppercase tracking-widest">
        Target Species
      </label>
      <TacticalSelect
        id="target-species"
        value={targetPokemon || ''}
        onChange={(e) => setTargetPokemon(e.target.value ? Number(e.target.value) : null)}
        className="font-mono text-sm"
      >
        <option value="">-- SELECT TARGET --</option>
        {sortedPokemon.map((p) => (
          <option key={p.id} value={p.id}>
            {p.n.toUpperCase()}
          </option>
        ))}
      </TacticalSelect>
    </div>
  );
};
