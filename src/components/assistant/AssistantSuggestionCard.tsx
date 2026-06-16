import { Link } from '@tanstack/react-router';
import { Fish, Target, Trees, Waves } from 'lucide-react';
import React from 'react';
import type { EncounterDetail, Suggestion } from '../../engine/assistant/strategies/types';
import type { SaveData } from '../../engine/saveParser/index';
import { getGenerationConfig } from '../../utils/generationConfig';
import { CornerCrosshairs } from '../CornerCrosshairs';
import { HoverScanner } from '../HoverScanner';
import { LcdGrid } from '../LcdGrid';
import { PokemonSprite } from '../pokemon/PokemonSprite';
import { TacticalBadge } from '../TacticalBadge';

interface AssistantSuggestionCardProps {
  suggestion: Suggestion;
  style: { icon: React.ReactNode; color: string; bg: string };
  showDebug: boolean;
  saveData: SaveData;
  getPokemonName: (id: number) => string;
  areaNames?: Record<number, string> | undefined;
}

export function AssistantSuggestionCard({
  suggestion: s,
  style,
  showDebug,
  saveData,
  getPokemonName,
  areaNames,
}: AssistantSuggestionCardProps) {
  let title = s.title;
  let desc = s.description;

  // Replace all occurrences of #<id> with the actual Pokémon name
  const replacePids = (text: string) => {
    return text.replace(/#(\d+)/g, (_, idStr) => {
      const id = parseInt(idStr, 10);
      return getPokemonName(id);
    });
  };

  title = replacePids(title);
  desc = replacePids(desc);

  const hasMultiple = s.pokemonIds && s.pokemonIds.length > 0;

  const catchMethods = React.useMemo(() => {
    if (s.category !== 'Catch' || !s.pokemonIds) return [];

    const grouped = (s.pokemonIds || []).reduce<Record<string, { pid: number; enc: EncounterDetail }[]>>((acc, pid) => {
      const encs = s.category === 'Catch' && 'encounterInfo' in s ? s.encounterInfo?.[pid] : undefined;
      if (!encs || encs.length === 0) return acc;
      // ⚡ Bolt: Replace O(N log N) sort with O(N) linear scan to avoid array allocation
      let mainEnc = encs[0];
      if (!mainEnc) return acc;
      for (let i = 1; i < encs.length; i++) {
        const currentEnc = encs[i];
        if (currentEnc && currentEnc.chance > mainEnc.chance) mainEnc = currentEnc;
      }
      if (!mainEnc) return acc;
      const method = mainEnc.method;
      if (!acc[method]) acc[method] = [];
      acc[method]?.push({ pid, enc: mainEnc });
      return acc;
    }, {});

    return Object.entries(grouped);
  }, [s]);

  const CardContent = (
    <>
      {/* Radar / Scanline Background */}
      <div
        className="absolute inset-0 z-0 opacity-10"
        style={{
          backgroundImage:
            'repeating-linear-gradient(0deg, transparent, transparent 2px, rgba(255,255,255,0.1) 2px, rgba(255,255,255,0.1) 4px)',
        }}
      />
      <div
        className={`absolute -top-10 -right-10 h-32 w-32 rounded-none opacity-20 blur-[40px] transition-opacity group-hover:opacity-40 ${style.bg}`}
      />

      <div className="relative z-10 flex h-full flex-col gap-4 p-5">
        <div className="space-y-4">
          <div className="flex items-center justify-between">
            <div
              className={`flex items-center gap-1.5 border border-white/20 border-dashed px-2 py-1 font-black text-[9px] uppercase tracking-widest ${style.bg} ${style.color.replace('border-', 'text-')} shadow-sm backdrop-blur-md`}
            >
              {style.icon}
              {s.category}
              {showDebug && (
                <span className="ml-1 border-white/20 border-l border-dashed pl-1 text-[8px] opacity-70">
                  P: {s.priority}
                </span>
              )}
            </div>
            {s.pokemonId && (
              <div className="flex items-center gap-2">
                <span className="tactical-text flex items-center gap-1 font-black text-[8px] text-[var(--theme-primary)]">
                  <span className="h-1.5 w-1.5 animate-pulse bg-[var(--theme-primary)]" />[ TARGET ACQUIRED ]
                </span>
                <TacticalBadge className="px-1 py-0.5 font-mono text-[10px]">
                  PT.{s.pokemonId.toString().padStart(3, '0')}
                </TacticalBadge>
              </div>
            )}
          </div>

          <div className="h-px w-full border-zinc-800 border-b border-dashed" />

          <div className="space-y-2">
            <h3
              className={`font-bold font-mono text-white uppercase leading-tight ${s.category === 'Catch' ? 'text-lg' : 'text-sm'}`}
            >
              {title}
            </h3>
            <p className="max-w-[95%] font-mono text-[10px] text-zinc-400 uppercase leading-relaxed tracking-wide">
              {desc}
            </p>
          </div>

          {s.warning && (
            <div className="mt-2 flex w-max items-center gap-1.5 border border-amber-500/30 border-dashed bg-amber-500/10 px-2 py-1">
              <span className="tactical-text font-black text-[9px] text-amber-400">[ WARNING: {s.warning} ]</span>
            </div>
          )}
        </div>

        {s.pokemonId && (
          <div className="absolute right-4 bottom-4 h-20 w-20 origin-bottom-right transform opacity-30 transition-all duration-300 group-hover:scale-110 group-hover:opacity-100">
            <PokemonSprite
              pokemonId={s.pokemonId}
              generation={saveData.generation}
              alt="Sprite"
              className="h-full w-full object-contain drop-shadow-lg"
            />
          </div>
        )}

        {hasMultiple && (
          <div className={`relative z-20 mt-0 flex flex-col gap-4`}>
            {s.category === 'Catch' ? (
              catchMethods.map(([method, pokes]: [string, { pid: number; enc: EncounterDetail }[]]) => {
                const isRod = method.includes('rod');
                const isSurf = method === 'surf';
                const isGrass = method === 'walk';

                let isOwned = true;
                if (isRod) {
                  const genConfig = getGenerationConfig(saveData.generation);
                  const rodIds = genConfig.rodIds;
                  if (!rodIds) {
                    isOwned = false;
                  } else {
                    const rodId = method.includes('old')
                      ? rodIds.OLD
                      : method.includes('good')
                        ? rodIds.GOOD
                        : rodIds.SUPER;
                    isOwned =
                      saveData.inventory.some((i) => i.id === rodId) ||
                      (saveData.pcItems?.some((i) => i.id === rodId) ?? false);
                  }
                }
                const Icon = isRod ? Fish : isSurf ? Waves : isGrass ? Trees : Target;
                const label = method.replace(/-/g, ' ').toUpperCase();

                return (
                  <div
                    key={method}
                    className={`space-y-3 rounded-none border border-white/10 border-dashed bg-black/30 p-4 transition-opacity ${!isOwned ? 'opacity-40 grayscale-[0.5]' : ''}`}
                  >
                    <div className="flex items-center justify-between px-1">
                      <div className="flex items-center gap-2">
                        <Icon size={14} className={isOwned ? 'text-emerald-400' : 'text-zinc-500'} />
                        <span
                          className={`font-black font-mono text-[10px] tracking-wider ${isOwned ? 'text-zinc-300' : 'text-zinc-500'}`}
                        >
                          {label}
                        </span>
                      </div>
                      {!isOwned && (
                        <TacticalBadge variant="red" className="px-1.5 py-0.5 font-mono tracking-tighter">
                          [ MISSING_ROD ]
                        </TacticalBadge>
                      )}
                    </div>
                    <div className="flex flex-wrap gap-4">
                      {pokes.map(({ pid, enc }) => (
                        <div key={pid} className="group/sprite flex min-w-[56px] flex-col items-center gap-1.5">
                          <Link
                            to="/pokemon/$pokemonId"
                            params={{ pokemonId: pid.toString() }}
                            search={{ from: '/assistant' }}
                            className="relative flex h-14 w-14 items-center justify-center rounded-none border border-white/10 border-dashed bg-zinc-800/80 p-2 shadow-md transition-all hover:scale-110 hover:border-emerald-500/50 hover:bg-zinc-700 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--theme-primary)] focus-visible:ring-offset-2 focus-visible:ring-offset-zinc-950"
                            title={getPokemonName(pid)}
                            aria-label={`View details for ${getPokemonName(pid)}`}
                            onClick={(e) => e.stopPropagation()}
                          >
                            <PokemonSprite
                              pokemonId={pid}
                              generation={saveData.generation}
                              alt={getPokemonName(pid)}
                              className="h-full w-full object-contain"
                            />
                            <div className="absolute -top-1.5 -right-1.5 rounded-none border border-white/20 border-dashed bg-emerald-500 px-1.5 py-0.5 font-black font-mono text-[9px] text-white shadow-lg">
                              {enc.chance}%
                            </div>
                          </Link>
                          <div className="flex flex-col items-center leading-none">
                            <span className="font-black text-[9px] text-white transition-colors group-hover/sprite:text-emerald-400">
                              Lv. {enc.minLevel === enc.maxLevel ? enc.minLevel : `${enc.minLevel}-${enc.maxLevel}`}
                            </span>
                            {areaNames?.[enc.aid] && (
                              <span className="max-w-[80px] truncate text-center text-[8px] text-zinc-500 uppercase">
                                {areaNames[enc.aid]}
                              </span>
                            )}
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                );
              })
            ) : (
              <div className="flex flex-wrap gap-2">
                {(s.pokemonIds || []).slice(0, 8).map((pid) => (
                  <Link
                    key={pid}
                    to="/pokemon/$pokemonId"
                    params={{ pokemonId: pid.toString() }}
                    search={{ from: '/assistant' }}
                    className="group/sprite relative h-10 w-10 rounded-none border border-white/10 border-dashed bg-black/40 p-1 transition-all hover:scale-110 hover:border-white/40 hover:bg-black/60 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--theme-primary)] focus-visible:ring-offset-2 focus-visible:ring-offset-zinc-950"
                    title={getPokemonName(pid)}
                    aria-label={`View details for ${getPokemonName(pid)}`}
                    onClick={(e) => e.stopPropagation()}
                  >
                    <PokemonSprite
                      pokemonId={pid}
                      generation={saveData.generation}
                      alt={getPokemonName(pid)}
                      className="h-full w-full object-contain"
                    />
                  </Link>
                ))}
                {(s.pokemonIds?.length ?? 0) > 8 && (
                  <div className="flex h-10 w-10 items-center justify-center rounded-none border border-white/10 border-dashed bg-black/40 font-bold font-mono text-xs text-zinc-500">
                    +{(s.pokemonIds?.length ?? 0) - 8}
                  </div>
                )}
              </div>
            )}
          </div>
        )}
      </div>
    </>
  );

  const isCritical = title.includes('CRITICAL');

  return (
    <div
      data-testid="assistant-suggestion-card"
      className={`relative border-2 border-dashed ${isCritical ? 'animate-[pulse_2s_infinite] border-red-500/80' : 'border-zinc-700/80'} group overflow-hidden bg-zinc-950 shadow-lg transition-all duration-300 hover:-translate-y-1 hover:scale-[1.02] hover:border-[var(--theme-primary)]/50 ${!hasMultiple && s.pokemonId ? 'cursor-pointer' : ''}`}
    >
      {/* CRT Grid Overlay */}
      <LcdGrid className="opacity-10" color="var(--theme-primary)" />

      {/* Hover Scanner */}
      <HoverScanner />

      {/* Left glowing edge */}
      <div className={`absolute top-0 left-0 h-full w-1 ${style.bg.replace('/10', '/50')}`} />

      {/* Tactical Corner Crosshairs */}
      <CornerCrosshairs
        thickness={2}
        className="z-20 h-3 w-3 border-[var(--theme-primary)]/40 transition-colors group-hover:border-[var(--theme-primary)]"
      />

      {!hasMultiple && s.pokemonId ? (
        <Link
          to="/pokemon/$pokemonId"
          params={{ pokemonId: s.pokemonId.toString() }}
          search={{ from: '/assistant' }}
          className="block h-full w-full focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--theme-primary)] focus-visible:ring-offset-2 focus-visible:ring-offset-zinc-950"
        >
          {CardContent}
        </Link>
      ) : (
        <div className="h-full w-full">{CardContent}</div>
      )}
    </div>
  );
}
