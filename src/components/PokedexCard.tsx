import { useNavigate } from '@tanstack/react-router';
import { ChevronRight, CircleDot, Monitor, Sparkles } from 'lucide-react';
import React from 'react';
import type { SaveData } from '../engine/saveParser';
import { cn } from '../utils/cn';
import type { PokemonListItem } from '../utils/pokemonQueries';
import { PokemonSprite } from './pokemon/PokemonSprite';
import { TacticalBadge } from './TacticalBadge';
import { TacticalCard } from './TacticalCard';

interface PokedexCardProps {
  pokemon: PokemonListItem;
  idx: number;
  saveData: SaveData | null;
  isLivingDex: boolean;
  partySet: Set<number>;
  pcSet: Set<number>;
  shinySpeciesIds: Set<number>;
}

// ⚡ Bolt: Wrapped PokedexCard in React.memo to prevent unnecessary re-renders when parent PokedexGrid updates.
// This prevents up to 251 (Gen 2 max dex) unneeded DOM re-evaluations on every search keystroke, significantly reducing main thread blocking time.
export const PokedexCard = React.memo(function PokedexCard({
  pokemon,
  idx,
  saveData,
  isLivingDex,
  partySet,
  pcSet,
  shinySpeciesIds,
}: PokedexCardProps) {
  const navigate = useNavigate();

  const inParty = saveData ? partySet.has(pokemon.id) : false;
  const inPC = saveData ? pcSet.has(pokemon.id) : false;
  const hasInStorage = inParty || inPC;

  const isOwnedInDex = saveData ? saveData.owned.has(pokemon.id) : false;
  const isSeenInDex = saveData ? saveData.seen.has(pokemon.id) : false;

  const isOwned = saveData ? (isLivingDex ? hasInStorage : isOwnedInDex || hasInStorage) : false;

  const isSeen = saveData ? isSeenInDex || isOwned || hasInStorage : false;
  const isUnseen = saveData && !isSeen;
  const isSeenNotOwned = saveData && isSeen && !isOwned;

  const isShiny = shinySpeciesIds.has(pokemon.id);

  let variant: 'default' | 'emerald' | 'amber' = 'default';
  if (hasInStorage) {
    variant = 'emerald';
  } else if (saveData?.owned.has(pokemon.id)) {
    variant = 'amber';
  }

  return (
    <TacticalCard
      ariaLabel={`View details for ${pokemon.name}`}
      title={`View details for ${pokemon.name}`}
      testId="pokedex-card"
      pokemonId={pokemon.id}
      onClick={() => navigate({ to: `/pokemon/${pokemon.id}`, search: { from: '/' } })}
      variant={variant}
      style={{ animationDelay: `${(idx % 20) * 0.02}s` }}
    >
      {/* Card Header: Num & Icons */}
      <div className="mb-3 flex items-center justify-between">
        <TacticalBadge variant="zinc" className="gap-1 rounded-full px-2 py-0.5 tracking-tighter">
          <span className="text-[9px]">ID</span>
          <span className="font-mono text-[10px] text-zinc-300">{pokemon.id.toString().padStart(3, '0')}</span>
        </TacticalBadge>

        {saveData && !isUnseen && (
          <div className="flex gap-1">
            {inParty && <CircleDot size={12} className="animate-pulse text-rose-500" />}
            {inPC && <Monitor size={12} className="text-[var(--theme-primary)]" />}
          </div>
        )}
      </div>

      {/* Sprite Container */}
      <div className="relative mb-4 flex aspect-square items-center justify-center overflow-hidden border border-white/5 bg-black/40 transition-colors group-hover:bg-black/60">
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

        <PokemonSprite
          pokemonId={pokemon.id}
          generation={saveData?.generation ?? 1}
          isShiny={isShiny}
          alt={pokemon.name}
          className={cn(
            'z-10 h-[85%] w-[85%] object-contain transition-all duration-500',
            isUnseen
              ? 'opacity-10 brightness-0'
              : isSeenNotOwned
                ? 'opacity-50 grayscale'
                : 'drop-shadow-[0_0_15px_rgba(255,255,255,0.1)] group-hover:scale-110',
          )}
        />

        {/* Scanline overlay for sprite */}
        <div className="scanline-overlay pointer-events-none absolute inset-0 opacity-20" />

        {/* Scanner overlay on hover */}
        <div className="pointer-events-none absolute inset-0 bg-gradient-to-b from-transparent via-[var(--theme-primary)]/20 to-transparent opacity-0 transition-opacity group-hover:animate-[scan_2s_linear_infinite] group-hover:opacity-100" />
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
              <TacticalBadge
                variant={isShiny ? 'amber' : 'emerald'}
                className={cn('rounded-lg px-2.5 py-1 tracking-tighter')}
              >
                <div className={cn('h-1 w-1 rounded-full', isShiny ? 'bg-amber-400' : 'bg-emerald-500')} />
                Secured
              </TacticalBadge>
            ) : isOwnedInDex ? (
              <TacticalBadge variant="amber" className="rounded-lg px-2.5 py-1 tracking-tighter">
                <div className="h-1 w-1 rounded-full bg-amber-500" />
                Dex Only
              </TacticalBadge>
            ) : isSeenInDex ? (
              <TacticalBadge variant="rose" className="rounded-lg px-2.5 py-1 tracking-tighter">
                <div className="h-1 w-1 rounded-full bg-rose-500" />
                Seen
              </TacticalBadge>
            ) : (
              <TacticalBadge variant="zinc" className="rounded-lg px-2.5 py-1 text-zinc-600 tracking-tighter">
                Unknown
              </TacticalBadge>
            )}
          </div>
        )}
      </div>

      {/* Corner Accent */}
      <div className="absolute right-[-10px] bottom-[-10px] p-4 opacity-0 transition-opacity group-hover:opacity-100">
        <ChevronRight size={14} className="text-[var(--theme-primary)]" />
      </div>
    </TacticalCard>
  );
});
