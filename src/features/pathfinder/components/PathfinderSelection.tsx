import { useQuery } from '@tanstack/react-query';
import type React from 'react';
import { useMemo } from 'react';
import { TacticalSelect } from '../../../components/TacticalSelect';
import { pokeDB } from '../../../db/PokeDB';
import { useAvailableEggMoves, useEggMove, useSetEggMove, useSetTargetPokemon, useTargetPokemon } from '../hooks';

export const PathfinderSelection: React.FC = () => {
  const targetPokemon = useTargetPokemon();
  const setTargetPokemon = useSetTargetPokemon();
  const eggMove = useEggMove();
  const setEggMove = useSetEggMove();
  const availableEggMoves = useAvailableEggMoves();

  const { data: pokemonList } = useQuery({
    queryKey: ['allPokemonList'],
    queryFn: () => pokeDB.getAllPokemon(),
  });

  const sortedPokemon = useMemo(() => {
    if (!pokemonList) return [];
    return [...pokemonList].sort((a, b) => a.n.localeCompare(b.n));
  }, [pokemonList]);

  const { data: eggMoveDetails } = useQuery({
    queryKey: ['eggMoveDetails', availableEggMoves],
    queryFn: async () => {
      const moves = await Promise.all(
        availableEggMoves.map(async (moveId) => {
          const moveData = await pokeDB.getMove(moveId);
          return { id: moveId, name: moveData?.name || `Move ${moveId}` };
        }),
      );
      return moves.sort((a, b) => a.name.localeCompare(b.name));
    },
    enabled: availableEggMoves.length > 0,
  });

  return (
    <div className="flex flex-col gap-4 font-mono">
      <div className="flex flex-col gap-1">
        <label htmlFor="target-species" className="font-bold text-[10px] text-zinc-500 uppercase">
          Target Species
        </label>
        <TacticalSelect
          id="target-species"
          value={targetPokemon ?? ''}
          onChange={(e) => setTargetPokemon(e.target.value ? Number(e.target.value) : null)}
          className="w-full rounded-none border-dashed text-sm"
        >
          <option value="">Select Pokémon...</option>
          {sortedPokemon.map((p) => (
            <option key={p.id} value={p.id}>
              {p.n.toUpperCase()}
            </option>
          ))}
        </TacticalSelect>
      </div>

      <div className="flex flex-col gap-1">
        <label htmlFor="target-egg-move" className="font-bold text-[10px] text-zinc-500 uppercase">
          Target Egg Move
        </label>
        <TacticalSelect
          id="target-egg-move"
          value={eggMove ?? ''}
          onChange={(e) => setEggMove(e.target.value ? Number(e.target.value) : null)}
          disabled={!targetPokemon || availableEggMoves.length === 0}
          className="w-full rounded-none border-dashed text-sm"
        >
          <option value="">Select Egg Move...</option>
          {eggMoveDetails?.map((m) => (
            <option key={m.id} value={m.id}>
              {m.name?.toUpperCase() ?? m.id.toString()}
            </option>
          ))}
        </TacticalSelect>
      </div>
    </div>
  );
};
