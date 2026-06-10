import { useNavigate } from '@tanstack/react-router';
import { CircleDot, Monitor, Sparkles } from 'lucide-react';
import React from 'react';
import type { SaveData } from '../engine/saveParser';
import { cn } from '../utils/cn';
import type { PokemonListItem } from '../utils/pokemonQueries';
import { DataPoint } from './DataPoint';
import { HoverScanner } from './HoverScanner';
import { LcdGrid } from './LcdGrid';
import { PokemonSprite } from './pokemon/PokemonSprite';
import { PokemonStatusBadge } from './pokemon/PokemonStatusBadge';
import { TacticalCard } from './TacticalCard';
import { TelemetryDecoration } from './TelemetryDecoration';

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
      className="!p-0"
    >
      <TelemetryDecoration
        label={pokemon.name}
        className="top-0 right-0 left-0 justify-center border-r-0 border-l-0"
        textClassName={cn(isUnseen ? 'text-zinc-700' : isShiny ? 'text-amber-400' : 'text-white')}
        dotClassName={cn(isUnseen ? 'hidden' : '')}
      />

      {/* Sprite Container */}
      <div className="relative mt-6 flex aspect-square items-center justify-center overflow-hidden border-zinc-800 border-b border-dashed bg-black/40 transition-colors group-hover:bg-black/60">
        {/* LCD Grid Background */}
        <LcdGrid className="opacity-[0.05]" />

        {isShiny && (
          <div className="absolute -top-1 -right-1 z-10 animate-[spin_4s_linear_infinite] text-amber-400 drop-shadow-[0_0_8px_rgba(251,191,36,0.5)]">
            <Sparkles size={16} fill="currentColor" className="animate-[pulse_4s_cubic-bezier(0.4,0,0.6,1)_infinite]" />
          </div>
        )}

        <HoverScanner />

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
      </div>

      <div className="flex w-full divide-x divide-dashed divide-zinc-800">
        <div className="flex-1 p-2">
          <DataPoint
            label="ID"
            value={pokemon.id.toString().padStart(3, '0')}
            labelClassName="text-[7px]"
            valueClassName="text-[10px]"
          />
        </div>
        {saveData && !isUnseen && (
          <div className="flex items-center justify-center p-2">
            <div className="flex gap-1.5">
              {inParty && <CircleDot size={12} className="animate-pulse text-rose-500" />}
              {inPC && <Monitor size={12} className="text-[var(--theme-primary)]" />}
            </div>
          </div>
        )}
      </div>

      {saveData && (
        <PokemonStatusBadge
          hasInStorage={hasInStorage}
          isOwnedInDex={isOwnedInDex}
          isSeenInDex={isSeenInDex}
          isShiny={isShiny}
        />
      )}
    </TacticalCard>
  );
});
