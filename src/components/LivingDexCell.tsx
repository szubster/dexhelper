import { useNavigate } from '@tanstack/react-router';
import { CircleDot, Monitor, Sparkles } from 'lucide-react';
import React, { useCallback } from 'react';
import { cn } from '../utils/cn';
import { LcdGrid } from './LcdGrid';

interface LivingDexCellProps {
  id: number;
  inParty: boolean;
  inPC: boolean;
  isShiny: boolean;
}

export const LivingDexCell = React.memo(function LivingDexCell({ id, inParty, inPC, isShiny }: LivingDexCellProps) {
  const navigate = useNavigate();
  const isSecured = inParty || inPC;

  const handleClick = useCallback(() => {
    void navigate({ to: '/pokemon/$pokemonId', params: { pokemonId: id.toString() } });
  }, [id, navigate]);

  return (
    <button
      type="button"
      onClick={handleClick}
      data-testid="pokedex-card"
      data-pokemon-id={id}
      className={cn(
        'group relative flex aspect-square w-full cursor-pointer flex-col items-center justify-center overflow-hidden rounded-none border border-dashed text-left transition-all duration-300',
        isSecured
          ? 'border-cyan-500/50 bg-cyan-950/20 hover:border-cyan-400 hover:bg-cyan-900/40'
          : 'border-zinc-800 bg-black/40 hover:border-zinc-700',
      )}
    >
      <LcdGrid className="opacity-[0.03]" />

      <div className="absolute inset-0 z-0 bg-gradient-to-b from-transparent to-black/40" />

      {/* Target Crosshairs in Corners */}
      <div className="absolute top-1 left-1 h-1.5 w-1.5 rounded-none border-zinc-500/50 border-t border-l transition-colors group-hover:border-cyan-500/50" />
      <div className="absolute top-1 right-1 h-1.5 w-1.5 rounded-none border-zinc-500/50 border-t border-r transition-colors group-hover:border-cyan-500/50" />
      <div className="absolute right-1 bottom-1 h-1.5 w-1.5 rounded-none border-zinc-500/50 border-r border-b transition-colors group-hover:border-cyan-500/50" />
      <div className="absolute bottom-1 left-1 h-1.5 w-1.5 rounded-none border-zinc-500/50 border-b border-l transition-colors group-hover:border-cyan-500/50" />

      {isShiny && (
        <div className="absolute top-1.5 left-1.5 z-10 animate-[spin_4s_linear_infinite] text-amber-400 drop-shadow-[0_0_8px_rgba(251,191,36,0.5)]">
          <Sparkles size={8} fill="currentColor" className="animate-[pulse_4s_cubic-bezier(0.4,0,0.6,1)_infinite]" />
        </div>
      )}

      {isSecured && (
        <div className="absolute top-1.5 right-1.5 flex items-center gap-1">
          {inParty && <CircleDot size={8} className="animate-pulse text-rose-500" />}
          {inPC && <Monitor size={8} className="text-cyan-400" />}
        </div>
      )}

      <div className="relative z-10 flex flex-col items-center">
        <span
          className={cn(
            'font-black font-mono text-xl tracking-tighter sm:text-2xl',
            isSecured ? 'text-cyan-400 drop-shadow-[0_0_8px_rgba(34,211,238,0.3)]' : 'text-zinc-600',
          )}
        >
          {id.toString().padStart(3, '0')}
        </span>
      </div>

      {isSecured && (
        <div className="absolute bottom-1.5 w-full px-2">
          <div className="h-[1px] w-full bg-cyan-500/30">
            <div
              className="h-full w-1/3 animate-[slide_2s_ease-in-out_infinite] bg-cyan-400 shadow-[0_0_5px_rgba(34,211,238,0.8)]"
              style={{ animationName: 'slideRight' }}
            />
          </div>
        </div>
      )}
    </button>
  );
});
