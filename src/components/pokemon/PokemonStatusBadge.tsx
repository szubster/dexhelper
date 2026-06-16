import React from 'react';
import { cn } from '../../utils/cn';

interface PokemonStatusBadgeProps {
  hasInStorage: boolean;
  isOwnedInDex: boolean;
  isSeenInDex: boolean;
  isShiny: boolean;
}

export const PokemonStatusBadge = React.memo(function PokemonStatusBadge({
  hasInStorage,
  isOwnedInDex,
  isSeenInDex,
  isShiny,
}: PokemonStatusBadgeProps) {
  if (hasInStorage) {
    return (
      <div
        className={cn(
          'flex w-full items-center justify-center border-t border-dashed py-1.5',
          isShiny ? 'border-amber-500/50 bg-amber-500/10' : 'border-emerald-500/50 bg-emerald-500/10',
        )}
      >
        <span className={cn('tactical-text font-black text-[8px]', isShiny ? 'text-amber-400' : 'text-emerald-400')}>
          [ SECURED ]
        </span>
      </div>
    );
  }

  if (isOwnedInDex) {
    return (
      <div className="flex w-full items-center justify-center border-amber-500/50 border-t border-dashed bg-amber-500/10 py-1.5">
        <span className="tactical-text font-black text-[8px] text-amber-400">[ DEX_ONLY ]</span>
      </div>
    );
  }

  if (isSeenInDex) {
    return (
      <div className="flex w-full items-center justify-center border-rose-500/50 border-t border-dashed bg-rose-500/10 py-1.5">
        <span className="tactical-text font-black text-[8px] text-rose-400">[ SEEN ]</span>
      </div>
    );
  }

  return (
    <div className="flex w-full items-center justify-center border-zinc-700 border-t border-dashed bg-white/5 py-1.5">
      <span className="tactical-text font-black text-[8px] text-zinc-600">[ UNKNOWN ]</span>
    </div>
  );
});
