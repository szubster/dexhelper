import { Link } from '@tanstack/react-router';
import React from 'react';
import type { EncounterDetail, Suggestion } from '@dexhelper/engine/assistant/strategies/types';
import type { SaveData } from '@dexhelper/engine/saveParser/index';
import { objectEntries } from '../../utils/object';
import { CornerCrosshairs } from '../CornerCrosshairs';
import { HoverScanner } from '../HoverScanner';
import { LcdGrid } from '../LcdGrid';
import { PokemonSprite } from '../pokemon/PokemonSprite';
import { TacticalBadge } from '../TacticalBadge';
import { CatchMethodSection } from './CatchMethodSection';
import { PokemonListSection } from './PokemonListSection';

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

    const pokemonIds = s.pokemonIds || [];
    // ⚡ Bolt: Replace O(N) array allocation overhead within a hot execution path with explicit for loop
    const grouped: Record<string, { pid: number; enc: EncounterDetail }[]> = {};
    for (let j = 0; j < pokemonIds.length; j++) {
      const pid = pokemonIds[j];
      if (pid === undefined) continue;
      const acc = grouped;
      const encs = s.category === 'Catch' && 'encounterInfo' in s ? s.encounterInfo?.[pid] : undefined;
      if (!encs || encs.length === 0) continue;
      // ⚡ Bolt: Replace O(N log N) sort with O(N) linear scan to avoid array allocation
      let mainEnc = encs[0];
      if (!mainEnc) continue;
      for (let i = 1; i < encs.length; i++) {
        const currentEnc = encs[i];
        if (currentEnc && currentEnc.chance > mainEnc.chance) mainEnc = currentEnc;
      }
      if (!mainEnc) continue;
      const method = mainEnc.method;
      if (!acc[method]) acc[method] = [];
      acc[method]?.push({ pid: pid, enc: mainEnc });
    }

    return objectEntries(grouped);
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
              <CatchMethodSection
                catchMethods={catchMethods}
                saveData={saveData}
                areaNames={areaNames}
                getPokemonName={getPokemonName}
              />
            ) : (
              <PokemonListSection pokemonIds={s.pokemonIds || []} saveData={saveData} getPokemonName={getPokemonName} />
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
          className="focus-visible:tactical-focus block h-full w-full"
        >
          {CardContent}
        </Link>
      ) : (
        <div className="h-full w-full">{CardContent}</div>
      )}
    </div>
  );
}
