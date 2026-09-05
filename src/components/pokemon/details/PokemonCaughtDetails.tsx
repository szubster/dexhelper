import { Activity, Dna, MapPin, Sparkles } from 'lucide-react';
import React from 'react';
import { gen2Items, gen2Locations } from '../../../engine/data/gen2/legacyNameMap';
import { getContestRecommendations } from '../../../engine/gen3/contests/recommendation';
import { getNature } from '../../../engine/gen3/nature';
import type { PokemonInstance } from '../../../engine/saveParser/index';
import { useStore } from '../../../store';
import { getTimeCapsuleValidation } from '../../../utils/timeCapsule';
import { HoverScanner } from '../../HoverScanner';
import { LcdGrid } from '../../LcdGrid';
import { PokerusBadge } from '../../PokerusBadge';
import { SectionHeader } from '../../SectionHeader';
import { TacticalBadge } from '../../TacticalBadge';
import { TacticalPanel } from '../../TacticalPanel';

const ContestConditionStats = React.lazy(() =>
  import('../../ContestConditionStats').then((m) => ({ default: m.ContestConditionStats })),
);
const ContestRecommendationPanel = React.lazy(() =>
  import('../../ContestRecommendationPanel').then((m) => ({ default: m.ContestRecommendationPanel })),
);
const ContestRibbonsPanel = React.lazy(() =>
  import('./ContestRibbonsPanel').then((m) => ({ default: m.ContestRibbonsPanel })),
);
const ContestSheenDisplay = React.lazy(() =>
  import('./ContestSheenDisplay').then((m) => ({ default: m.ContestSheenDisplay })),
);

interface PokemonCaughtDetailsProps {
  yourPokemon: (PokemonInstance & { location: string })[];
}

export function PokemonCaughtDetails({ yourPokemon }: PokemonCaughtDetailsProps) {
  const generation = useStore((s) => s.saveData?.generation);

  if (yourPokemon.length === 0) return null;

  return (
    <div className="slide-in-from-bottom-4 fade-in animate-in space-y-6 fill-mode-both duration-500">
      <SectionHeader title="Biometric Signatures" icon={<Dna size={14} className="text-emerald-500" />} />
      <div className="grid grid-cols-1 gap-6 sm:grid-cols-2">
        {yourPokemon.map((p, i) => {
          const themeColor = p.isShiny ? 'text-amber-500' : p.isShinyCarrier ? 'text-cyan-500' : 'text-emerald-500';
          const themeBorder = p.isShiny
            ? 'border-amber-500/30'
            : p.isShinyCarrier
              ? 'border-cyan-500/30'
              : 'border-emerald-500/30';
          const themeBg = p.isShiny ? 'bg-amber-500/10' : p.isShinyCarrier ? 'bg-cyan-500/10' : 'bg-emerald-500/10';

          return (
            <TacticalPanel
              key={`${p.storageLocation}-${p.slot || i}`}
              variant={p.isShiny ? 'amber' : p.isShinyCarrier ? 'cyan' : 'emerald'}
              className="group !p-0 relative flex flex-col gap-0 rounded-none border-[2px] border-dashed"
            >
              <LcdGrid className="opacity-[0.05]" />
              <HoverScanner />

              {/* Hardware Mounting Brackets */}
              <div className="absolute top-0 left-0 h-2 w-2 border-white/20 border-t-2 border-l-2" />
              <div className="absolute top-0 right-0 h-2 w-2 border-white/20 border-t-2 border-r-2" />
              <div className="absolute bottom-0 left-0 h-2 w-2 border-white/20 border-b-2 border-l-2" />
              <div className="absolute right-0 bottom-0 h-2 w-2 border-white/20 border-r-2 border-b-2" />

              <div
                className={`flex items-center justify-between border-b border-dashed ${themeBorder} ${themeBg} px-4 py-2`}
              >
                <div className="flex items-center gap-2">
                  <div
                    className={`h-2 w-2 animate-pulse rounded-none ${p.isShiny ? 'bg-amber-500' : p.isShinyCarrier ? 'bg-cyan-500' : 'bg-emerald-500'}`}
                  />
                  <span className={`font-black font-mono text-[10px] tracking-widest ${themeColor}`}>
                    {p.isShiny
                      ? 'SYS.ANOMALY_DETECTED'
                      : p.isShinyCarrier
                        ? 'SYS.CARRIER_DETECTED'
                        : 'SYS.STANDARD_ISSUE'}
                  </span>
                </div>
                <span className={`font-mono text-[8px] opacity-60 ${themeColor}`}>
                  ID: {(p.personalityValue || 0).toString(16).padStart(8, '0').toUpperCase()}
                </span>
              </div>

              <div className="relative z-10 flex items-stretch border-white/10 border-b border-dashed bg-black/60">
                <div className={`flex flex-col justify-center border-r border-dashed ${themeBorder} p-4 text-center`}>
                  <span className="font-mono text-[10px] text-zinc-500 uppercase tracking-widest">LEVEL</span>
                  <div className="font-black font-display text-4xl text-white tracking-tighter drop-shadow-[0_0_10px_rgba(255,255,255,0.2)]">
                    {(p.level ?? 0).toString().padStart(2, '0')}
                  </div>
                </div>

                <div className="flex flex-1 flex-col justify-center p-4">
                  <div className="mb-2 flex items-center gap-2">
                    <TacticalBadge
                      variant="primary"
                      className="border-[var(--theme-primary)]/30 bg-[var(--theme-primary)]/20 px-2 py-0.5 font-mono text-[9px] uppercase tracking-widest"
                    >
                      {p.location}
                    </TacticalBadge>
                    {p.slot && (
                      <TacticalBadge
                        variant="zinc"
                        className="border-white/10 bg-white/5 px-2 py-0.5 font-mono text-[9px] text-zinc-400 uppercase tracking-widest"
                      >
                        SLOT_{p.slot.toString().padStart(2, '0')}
                      </TacticalBadge>
                    )}
                  </div>

                  {/* Decorative telemetry bar */}
                  <div className="flex h-1.5 w-full gap-0.5 opacity-50">
                    {Array.from({ length: 12 }).map((_, idx) => {
                      // Deterministic selection based on index to prevent flickering during re-renders
                      const isActive = (idx * 7) % 3 === 0;
                      // Use a synthetic unique key built from slot identity and explicitly named subcomponent rather than bare index loop
                      const blockId = `telemetry-block-${idx.toString(16)}`;
                      return (
                        <div
                          key={`telemetry-${p.storageLocation}-${p.slot || i}-${blockId}`}
                          className={`h-full flex-1 ${isActive ? (p.isShiny ? 'bg-amber-500' : p.isShinyCarrier ? 'bg-cyan-500' : 'bg-emerald-500') : 'bg-white/10'}`}
                        />
                      );
                    })}
                  </div>
                </div>

                <div className={`flex items-center justify-center border-l border-dashed p-4 ${themeBorder}`}>
                  <div className="opacity-80 transition-transform duration-500 group-hover:scale-110">
                    {p.isShiny ? (
                      <Sparkles size={32} className="text-amber-500 drop-shadow-[0_0_10px_rgba(245,158,11,0.5)]" />
                    ) : p.isShinyCarrier ? (
                      <Dna size={32} className="text-cyan-500 drop-shadow-[0_0_10px_rgba(34,211,238,0.5)]" />
                    ) : (
                      <Activity size={32} className="text-emerald-500 drop-shadow-[0_0_10px_rgba(16,185,129,0.5)]" />
                    )}
                  </div>
                </div>
              </div>

              <div className="relative z-10 grid grid-cols-2 gap-[1px] bg-white/10">
                {p.otName && (
                  <div className="flex flex-col gap-1 bg-zinc-950/80 p-3">
                    <span className="font-mono text-[8px] text-zinc-500 uppercase tracking-widest">OT_ID</span>
                    <span className="truncate font-mono text-[11px] text-zinc-300">{p.otName}</span>
                  </div>
                )}

                {p.item !== undefined && p.item > 0 ? (
                  <div className="flex flex-col gap-1 bg-zinc-950/80 p-3">
                    <span className="font-mono text-[8px] text-zinc-500 uppercase tracking-widest">HELD_ITEM</span>
                    <span className="truncate font-mono text-[11px] text-zinc-300">{gen2Items[p.item]}</span>
                  </div>
                ) : (
                  <div className="flex flex-col gap-1 bg-zinc-950/80 p-3">
                    <span className="font-mono text-[8px] text-zinc-600 uppercase tracking-widest">HELD_ITEM</span>
                    <span className="font-mono text-[11px] text-zinc-600">NONE</span>
                  </div>
                )}

                {p.friendship !== undefined && (
                  <div className="flex flex-col gap-1 bg-zinc-950/80 p-3">
                    <span className="font-mono text-[8px] text-zinc-500 uppercase tracking-widest">SYNC_RATE</span>
                    <div className="flex items-center gap-2">
                      <span className="font-mono text-[11px] text-rose-400">{p.friendship} PT</span>
                      <div className="h-1 flex-1 bg-zinc-800">
                        <div
                          className="h-full bg-rose-500"
                          style={{ width: `${Math.min(100, (p.friendship / 255) * 100)}%` }}
                        />
                      </div>
                    </div>
                  </div>
                )}

                {p.pokerus !== undefined && (
                  <div className="flex flex-col gap-1 bg-zinc-950/80 p-3">
                    <span className="font-mono text-[8px] text-zinc-500 uppercase tracking-widest">POKERUS_STRAIN</span>
                    <div className="flex items-center gap-2">
                      <PokerusBadge strain={p.pokerus.strain} />
                      {p.pokerus.daysRemaining !== undefined && (
                        <span className="font-mono text-[9px] text-zinc-500">[{p.pokerus.daysRemaining}D]</span>
                      )}
                    </div>
                  </div>
                )}
              </div>

              {generation === 2 && (
                <div className="relative z-10 border-white/10 border-t border-dashed bg-black/80 p-3">
                  <TimeCapsuleBadge speciesId={p.speciesId} moves={p.moves} />
                </div>
              )}

              {p.caughtData && (
                <div className="relative z-10 flex items-center justify-between border-white/10 border-t border-dashed bg-[var(--theme-primary)]/5 p-3">
                  <span className="flex items-center gap-1 font-mono text-[9px] text-zinc-500 uppercase tracking-widest">
                    <MapPin size={10} className="text-[var(--theme-primary)]" /> EXTR.PT
                  </span>
                  <span className="truncate font-black font-mono text-[10px] text-[var(--theme-primary)] uppercase tracking-tight">
                    {gen2Locations[p.caughtData.location] || 'UNKNOWN ZONE'}
                  </span>
                </div>
              )}

              {p.ribbons && generation === 3 && (
                <div className="relative z-10 border-white/10 border-t border-dashed bg-black/40 p-4">
                  <React.Suspense fallback={<div className="h-24 w-full animate-pulse bg-white/5" />}>
                    <ContestRibbonsPanel ribbons={p.ribbons} />
                  </React.Suspense>
                </div>
              )}

              {p.condition && generation === 3 && (
                <div className="relative z-10 flex flex-col gap-4 border-white/10 border-t border-dashed bg-black/40 p-4">
                  <React.Suspense fallback={<div className="h-64 w-full animate-pulse bg-white/5" />}>
                    <ContestConditionStats
                      cool={p.condition.cool}
                      beauty={p.condition.beauty}
                      cute={p.condition.cute}
                      smart={p.condition.smart}
                      tough={p.condition.tough}
                    />
                    {p.condition.sheen !== undefined && <ContestSheenDisplay sheen={p.condition.sheen} />}
                    {p.personalityValue !== undefined && (
                      <ContestRecommendationPanel
                        recommendations={getContestRecommendations(
                          getNature(p.personalityValue),
                          p.condition,
                          p.condition.sheen ?? 0,
                        )}
                        sheen={p.condition.sheen}
                      />
                    )}
                  </React.Suspense>
                </div>
              )}
            </TacticalPanel>
          );
        })}
      </div>
    </div>
  );
}

function TimeCapsuleBadge({ speciesId, moves }: { speciesId: number; moves: number[] }) {
  const validation = getTimeCapsuleValidation(speciesId, moves);

  if (validation.isEligible) {
    return (
      <TacticalBadge variant="emerald" className="w-full justify-center rounded-none font-mono text-[9px] uppercase">
        [ TIME CAPSULE COMPATIBLE ]
      </TacticalBadge>
    );
  }

  return (
    <TacticalBadge variant="red" className="w-full justify-center rounded-none font-mono text-[9px] uppercase">
      {validation.reason}
    </TacticalBadge>
  );
}
