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
          'relative flex w-full items-center gap-2 overflow-hidden border-t border-dashed px-3 py-1.5',
          isShiny
            ? 'border-amber-500/50 bg-amber-500/10 text-amber-500/20'
            : 'border-emerald-500/50 bg-emerald-500/10 text-emerald-500/20',
        )}
      >
        <div
          className="absolute inset-0 opacity-20"
          style={{
            background:
              'repeating-linear-gradient(45deg, transparent, transparent 4px, currentColor 4px, currentColor 8px)',
          }}
        />
        <div
          className={cn(
            'relative z-10 flex h-2 w-2 items-center justify-center rounded-none border border-current text-opacity-80',
            isShiny ? 'animate-pulse text-amber-500' : 'text-emerald-500',
          )}
        >
          <div className="h-1 w-1 bg-current" />
        </div>
        <span
          className={cn(
            'relative z-10 font-black font-mono text-[9px] uppercase tracking-widest',
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
