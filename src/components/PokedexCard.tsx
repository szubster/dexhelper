import { useNavigate } from '@tanstack/react-router';
import { ChevronRight, CircleDot, Monitor, Sparkles } from 'lucide-react';
import type { SaveData } from '../engine/saveParser';
import { cn } from '../utils/cn';
import { getGenerationConfig } from '../utils/generationConfig';

export interface PokedexCardProps {
  pokemon: { id: number; name: string };
  idx: number;
  saveData: SaveData | null;
  isLivingDex: boolean;
  partySet: Set<number>;
  pcSet: Set<number>;
  shinySpeciesIds: Set<number>;
  genConfig: ReturnType<typeof getGenerationConfig> | null;
}

export function PokedexCard({
  pokemon,
  idx,
  saveData,
  isLivingDex,
  partySet,
  pcSet,
  shinySpeciesIds,
  genConfig,
}: PokedexCardProps) {
  const navigate = useNavigate();

  const inParty = saveData ? partySet.has(pokemon.id) : false;
  const inPC = saveData ? pcSet.has(pokemon.id) : false;
  const hasInStorage = inParty || inPC;

  const isOwnedInDex = saveData ? saveData.owned.has(pokemon.id) : false;
  const isSeenInDex = saveData ? saveData.seen.has(pokemon.id) : false;

  const isOwned = saveData ? (isLivingDex ? hasInStorage : isOwnedInDex || hasInStorage) : false;
  const _hadButLost = saveData ? isOwnedInDex && !hasInStorage : false;

  const isSeen = saveData ? isSeenInDex || isOwned || hasInStorage : false;
  const isUnseen = saveData && !isSeen;
  const isSeenNotOwned = saveData && isSeen && !isOwned;

  const isShiny = shinySpeciesIds.has(pokemon.id);

  return (
    <button
      type="button"
      aria-label={`View details for ${pokemon.name}`}
      data-testid="pokedex-card"
      data-pokemon-id={pokemon.id}
      onClick={() => navigate({ to: `/pokemon/${pokemon.id}`, search: { from: '/' } })}
      className={cn(
        'group relative w-full cursor-pointer rounded-3xl border-2 p-4 text-left transition-all duration-500 hover:scale-[1.02] active:scale-[0.98]',
        hasInStorage
          ? 'border-emerald-500/30 bg-zinc-900 hover:border-emerald-500/50 hover:shadow-[0_0_30px_rgba(16,185,129,0.15)]'
          : 'border-white/5 bg-zinc-900 hover:border-white/10 hover:shadow-[0_0_30px_rgba(255,255,255,0.05)]',
        saveData?.owned.has(pokemon.id) && !hasInStorage && 'border-amber-500/30 hover:border-amber-500/50',
      )}
      style={{ animationDelay: `${(idx % 20) * 0.02}s` }}
    >
      {/* Card Header: Num & Icons */}
      <div className="mb-3 flex items-center justify-between">
        <div className="flex items-center gap-1 rounded-full border border-white/5 bg-white/5 px-2 py-0.5">
          <span className="font-black text-[9px] text-zinc-500 uppercase tracking-tighter">ID</span>
          <span className="font-black font-mono text-[10px] text-zinc-300">
            {pokemon.id.toString().padStart(3, '0')}
          </span>
        </div>

        {saveData && !isUnseen && (
          <div className="flex gap-1">
            {inParty && <CircleDot size={12} className="animate-pulse text-rose-500" />}
            {inPC && <Monitor size={12} className="text-[var(--theme-primary)]" />}
          </div>
        )}
      </div>

      {/* Sprite Container */}
      <div className="relative mb-4 flex aspect-square items-center justify-center overflow-hidden rounded-2xl bg-black/20 transition-colors group-hover:bg-black/40">
        {/* LCD Grid Background */}
        <div
          className="pointer-events-none absolute inset-0 opacity-[0.05]"
          style={{
            backgroundImage: 'radial-gradient(circle, white 1px, transparent 1px)',
            backgroundSize: '4px 4px',
          }}
        />

        {isShiny && (
          <div className="absolute -top-1 -right-1 z-10 animate-[spin_4s_linear_infinite] text-amber-400 drop-shadow-[0_0_8px_rgba(251,191,36,0.5)]">
            <Sparkles size={16} fill="currentColor" className="animate-[pulse_4s_cubic-bezier(0.4,0,0.6,1)_infinite]" />
          </div>
        )}

        <img
          src={
            genConfig
              ? genConfig.spriteUrl(pokemon.id, isShiny)
              : `https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/versions/generation-i/red-blue/transparent/${pokemon.id}.png`
          }
          alt={pokemon.name}
          className={cn(
            'pixelated z-10 h-[85%] w-[85%] object-contain transition-all duration-500',
            isUnseen
              ? 'opacity-10 brightness-0'
              : isSeenNotOwned
                ? 'opacity-50 grayscale'
                : 'drop-shadow-[0_0_15px_rgba(255,255,255,0.1)] group-hover:scale-110',
          )}
          loading="lazy"
          onError={(e) => {
            e.currentTarget.src = (genConfig?.fallbackSpriteUrl ?? getGenerationConfig(1).fallbackSpriteUrl)(
              pokemon.id,
            );
          }}
        />

        {/* Scanline overlay for sprite */}
        <div className="scanline-overlay pointer-events-none absolute inset-0 opacity-20" />
      </div>

      {/* Card Footer: Name & Status */}
      <div className="space-y-2">
        <h3
          className={cn(
            'truncate text-center font-black text-[10px] uppercase tracking-widest sm:text-[11px]',
            isUnseen ? 'text-zinc-700' : isShiny ? 'text-amber-400' : 'text-white',
          )}
        >
          {pokemon.name}
        </h3>

        {saveData && (
          <div className="flex justify-center">
            {hasInStorage ? (
              <div
                className={cn(
                  'flex items-center gap-1.5 rounded-lg border px-2.5 py-1',
                  isShiny ? 'border-amber-500/20 bg-amber-500/10' : 'border-emerald-500/20 bg-emerald-500/10',
                )}
              >
                <div className={cn('h-1 w-1 rounded-full', isShiny ? 'bg-amber-400' : 'bg-emerald-500')} />
                <span
                  className={cn(
                    'font-black text-[8px] uppercase tracking-tighter',
                    isShiny ? 'text-amber-400' : 'text-emerald-400',
                  )}
                >
                  Secured
                </span>
              </div>
            ) : isOwnedInDex ? (
              <div className="flex items-center gap-1.5 rounded-lg border border-amber-500/20 bg-amber-500/10 px-2.5 py-1">
                <div className="h-1 w-1 rounded-full bg-amber-500" />
                <span className="font-black text-[8px] text-amber-400 uppercase tracking-tighter">Dex Only</span>
              </div>
            ) : isSeenInDex ? (
              <div className="flex items-center gap-1.5 rounded-lg border border-rose-500/20 bg-rose-500/10 px-2.5 py-1">
                <div className="h-1 w-1 rounded-full bg-rose-500" />
                <span className="font-black text-[8px] text-rose-400 uppercase tracking-tighter">Seen</span>
              </div>
            ) : (
              <div className="flex items-center gap-1.5 rounded-lg border border-white/5 bg-white/5 px-2.5 py-1">
                <span className="font-black text-[8px] text-zinc-600 uppercase tracking-tighter">Unknown</span>
              </div>
            )}
          </div>
        )}
      </div>

      {/* Corner Accent */}
      <div className="absolute right-[-10px] bottom-[-10px] p-4 opacity-0 transition-opacity group-hover:opacity-100">
        <ChevronRight size={14} className="text-[var(--theme-primary)]" />
      </div>
    </button>
  );
}
