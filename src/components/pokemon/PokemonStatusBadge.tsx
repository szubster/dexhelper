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
          'flex items-center gap-1.5 rounded-none border border-dashed px-2.5 py-1',
          isShiny ? 'border-amber-500/50 bg-amber-500/10' : 'border-emerald-500/50 bg-emerald-500/10',
        )}
      >
        <span
          className={cn(
            'font-black font-mono text-[8px] uppercase tracking-widest',
            isShiny ? 'text-amber-400' : 'text-emerald-400',
          )}
        >
          [ SECURED ]
        </span>
      </div>
    );
  }

  if (isOwnedInDex) {
    return (
      <div className="flex items-center gap-1.5 rounded-none border border-amber-500/50 border-dashed bg-amber-500/10 px-2.5 py-1">
        <span className="font-black font-mono text-[8px] text-amber-400 uppercase tracking-widest">[ DEX_ONLY ]</span>
      </div>
    );
  }

  if (isSeenInDex) {
    return (
      <div className="flex items-center gap-1.5 rounded-none border border-rose-500/50 border-dashed bg-rose-500/10 px-2.5 py-1">
        <span className="font-black font-mono text-[8px] text-rose-400 uppercase tracking-widest">[ SEEN ]</span>
      </div>
    );
  }

  return (
    <div className="flex items-center gap-1.5 rounded-none border border-zinc-700 border-dashed bg-white/5 px-2.5 py-1">
      <span className="font-black font-mono text-[8px] text-zinc-600 uppercase tracking-widest">[ UNKNOWN ]</span>
    </div>
  );
});
