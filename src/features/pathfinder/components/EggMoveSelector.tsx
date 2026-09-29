import { useQuery } from '@tanstack/react-query';
import type React from 'react';
import { useMemo } from 'react';
import { TacticalSelect } from '../../../components/TacticalSelect';
import { pokeDB } from '../../../db/PokeDB';
import { useAvailableEggMoves, useEggMove, useSetEggMove } from '../hooks';

export const EggMoveSelector: React.FC = () => {
  const eggMove = useEggMove();
  const setEggMove = useSetEggMove();
  const availableEggMoves = useAvailableEggMoves();

  const { data: moves } = useQuery({
    queryKey: ['movesBulk', availableEggMoves],
    queryFn: () => pokeDB.getMovesBulk(availableEggMoves),
    enabled: availableEggMoves.length > 0,
  });

  const validMoves = useMemo(() => {
    if (!moves) return [];
    return moves
      .filter((m): m is Exclude<typeof m, Error> => !(m instanceof Error))
      .sort((a, b) => a.name.localeCompare(b.name));
  }, [moves]);

  return (
    <div className="flex flex-col gap-2">
      <label htmlFor="target-egg-move" className="font-mono text-[10px] text-cyan-500 uppercase tracking-widest">
        Target Egg Move
      </label>
      <TacticalSelect
        id="target-egg-move"
        value={eggMove || ''}
        onChange={(e) => setEggMove(e.target.value ? Number(e.target.value) : null)}
        className="font-mono text-sm"
        disabled={availableEggMoves.length === 0}
      >
        <option value="">-- SELECT MOVE --</option>
        {validMoves.map((m) => (
          <option key={m.id} value={m.id}>
            {m.name.toUpperCase()}
          </option>
        ))}
      </TacticalSelect>
    </div>
  );
};
