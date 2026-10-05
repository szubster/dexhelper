import { ScanlineOverlay } from '@dexhelper/ui';
import { ShieldAlert, Zap } from 'lucide-react';
import React, { useMemo } from 'react';
import type { PokemonInstance } from '../../engine/saveParser/parsers/common';
import { PokemonSprite } from '../pokemon/PokemonSprite';
import { TacticalPanel } from '../TacticalPanel';
import { TelemetryDecoration } from '../TelemetryDecoration';

export interface AliveTeamViewProps {
  team: PokemonInstance[];
  generation: number;
}

// ⚡ Bolt: Pre-allocated indices array to avoid intermediate array allocations on every render pass
const HP_SEGMENT_INDICES = Array.from({ length: 10 }, (_, i) => i);

// ⚡ Bolt: Wrapped in React.memo to prevent unnecessary re-renders when parent states change without team or generation changing
export const AliveTeamView = React.memo(function AliveTeamView({ team, generation }: AliveTeamViewProps) {
  // ⚡ Bolt: Memoize filtered alive team to avoid array allocation on every re-render
  const aliveTeam = useMemo(() => team.filter((p) => p.currentHp !== 0), [team]);

  return (
    <TacticalPanel variant="emerald" className="mb-6 p-4 sm:p-6">
      <TelemetryDecoration label="SYS.ALIVE_TEAM" className="-top-3 left-4" />

      <div className="mt-4 grid grid-cols-2 gap-3 sm:grid-cols-3 md:grid-cols-6">
        {aliveTeam.map((pokemon, idx) => {
          const maxHp = pokemon.currentHp && pokemon.currentHp > 0 ? Math.max(pokemon.currentHp, 100) : 100; // Mock Max HP for visual
          const hpPercent = pokemon.currentHp ? Math.min((pokemon.currentHp / maxHp) * 100, 100) : 100;

          return (
            <div
              // biome-ignore lint/suspicious/noArrayIndexKey: Team members might not have unique identifiers
              key={`alive-${idx}-${pokemon.speciesId}`}
              className="group relative flex flex-col items-center border border-emerald-500/30 border-dashed bg-emerald-950/10 p-3 transition-colors hover:border-emerald-400/80"
            >
              <div className="absolute top-0 left-0 h-1 w-1 border-emerald-500/50 border-t border-l" />
              <div className="absolute top-0 right-0 h-1 w-1 border-emerald-500/50 border-t border-r" />
              <div className="absolute bottom-0 left-0 h-1 w-1 border-emerald-500/50 border-b border-l" />
              <div className="absolute right-0 bottom-0 h-1 w-1 border-emerald-500/50 border-r border-b" />

              <div className="relative mb-2 flex h-16 w-16 items-center justify-center">
                <PokemonSprite
                  pokemonId={pokemon.speciesId}
                  generation={generation}
                  isShiny={pokemon.isShiny}
                  className="z-10 h-full w-full object-contain drop-shadow-[0_0_8px_rgba(16,185,129,0.3)] transition-transform group-hover:scale-110"
                />
                <ScanlineOverlay />
              </div>

              <div className="flex w-full flex-col items-center">
                <span className="w-full truncate text-center font-black text-[10px] text-zinc-300 uppercase tracking-wider">
                  {pokemon.otName ? pokemon.otName : `ID: ${pokemon.speciesId.toString().padStart(3, '0')}`}
                </span>

                <div className="mt-2 w-full space-y-1">
                  <div className="tactical-text flex items-center justify-between px-1 text-[9px]">
                    <span className="text-zinc-500">LVL {pokemon.level}</span>
                    <span className="font-bold text-emerald-400">{pokemon.currentHp} HP</span>
                  </div>

                  {/* Segmented HP Bar */}
                  <div className="flex h-1.5 w-full gap-[1px] bg-black/40">
                    {HP_SEGMENT_INDICES.map((i) => (
                      <div
                        key={i}
                        className={`h-full flex-1 ${
                          i < Math.ceil(hpPercent / 10)
                            ? 'bg-emerald-500 shadow-[0_0_5px_rgba(16,185,129,0.8)]'
                            : 'bg-emerald-950/30'
                        }`}
                      />
                    ))}
                  </div>
                </div>
              </div>

              <Zap
                size={10}
                className="absolute top-2 right-2 text-emerald-500/50 opacity-0 transition-opacity group-hover:animate-pulse group-hover:opacity-100"
              />
            </div>
          );
        })}
        {aliveTeam.length === 0 && (
          <div className="col-span-full">
            <TacticalPanel
              variant="red"
              className="flex animate-pulse flex-col items-center justify-center p-12 text-center"
            >
              <ShieldAlert className="mb-4 h-12 w-12 text-red-500 drop-shadow-[0_0_15px_rgba(239,68,68,0.8)]" />
              <span className="font-black font-mono text-red-500 text-xl uppercase tracking-[0.3em] drop-shadow-md">
                CRITICAL_FAILURE
              </span>
              <span className="tactical-text mt-2 font-black text-[10px] text-red-400/80">
                [ TEAM_WIPE_DETECTED ] No vital signs found
              </span>
            </TacticalPanel>
          </div>
        )}
      </div>
    </TacticalPanel>
  );
});
