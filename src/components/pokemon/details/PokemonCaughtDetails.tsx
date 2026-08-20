import { Activity, Dna, MapPin, Sparkles } from 'lucide-react';
import { gen2Items, gen2Locations } from '../../../engine/data/gen2/legacyNameMap';
import { getContestRecommendations } from '../../../engine/gen3/contests/recommendation';
import { getNature } from '../../../engine/gen3/nature';
import type { PokemonInstance } from '../../../engine/saveParser/index';
import { useStore } from '../../../store';
import { getTimeCapsuleValidation } from '../../../utils/timeCapsule';
import { ContestConditionStats } from '../../ContestConditionStats';
import { ContestRecommendationPanel } from '../../ContestRecommendationPanel';
import { DataLabel } from '../../DataLabel';
import { HoverScanner } from '../../HoverScanner';
import { LcdGrid } from '../../LcdGrid';
import { PokerusBadge } from '../../PokerusBadge';
import { SectionHeader } from '../../SectionHeader';
import { TacticalBadge } from '../../TacticalBadge';
import { TacticalPanel } from '../../TacticalPanel';
import { TelemetryDecoration } from '../../TelemetryDecoration';
import { ContestRibbonsPanel } from './ContestRibbonsPanel';
import { ContestSheenDisplay } from './ContestSheenDisplay';

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
        {yourPokemon.map((p, i) => (
          <TacticalPanel
            key={`${p.storageLocation}-${p.slot || i}`}
            variant={p.isShiny ? 'amber' : p.isShinyCarrier ? 'cyan' : 'emerald'}
            className="group !p-0 relative flex flex-col gap-0 rounded-none border border-dashed"
          >
            <LcdGrid className="opacity-[0.03]" />
            <HoverScanner />

            <TelemetryDecoration
              label={p.isShiny ? 'ANOMALY DETECTED' : p.isShinyCarrier ? 'CARRIER ANOMALY' : 'STANDARD ISSUE'}
              className="top-0 right-0 left-0 justify-center border-r-0 border-l-0"
              textClassName={p.isShiny ? 'text-amber-400' : p.isShinyCarrier ? 'text-cyan-400' : 'text-emerald-500'}
            />

            <div className="relative z-10 mt-6 flex items-start justify-between border-white/5 border-b border-dashed bg-black/40 p-4">
              <div className="flex flex-col">
                <span className="font-mono text-[10px] text-zinc-500 uppercase tracking-widest">
                  [ SECURITY CLEARANCE ]
                </span>
                <div className="font-black font-display text-4xl text-white tracking-tighter">LV.{p.level}</div>
                <div className="mt-1 flex items-center gap-2">
                  <TacticalBadge
                    variant="primary"
                    className="border-[var(--theme-primary)]/30 bg-[var(--theme-primary)]/20 px-2 py-0.5 text-[9px] leading-none"
                  >
                    {p.location}
                  </TacticalBadge>
                  {p.slot && (
                    <TacticalBadge
                      variant="zinc"
                      className="border-white/10 bg-white/5 px-2 py-0.5 text-[9px] text-zinc-500 leading-none"
                    >
                      Slot {p.slot}
                    </TacticalBadge>
                  )}
                </div>
              </div>
              <div className="opacity-80 mix-blend-screen transition-transform duration-500 group-hover:scale-110">
                {p.isShiny ? (
                  <Sparkles size={48} className="text-amber-500 drop-shadow-[0_0_15px_rgba(245,158,11,0.5)]" />
                ) : p.isShinyCarrier ? (
                  <Dna size={48} className="text-cyan-500 drop-shadow-[0_0_15px_rgba(34,211,238,0.5)]" />
                ) : (
                  <Activity size={48} className="text-emerald-500 drop-shadow-[0_0_15px_rgba(16,185,129,0.5)]" />
                )}
              </div>
            </div>

            <div className="relative z-10 flex flex-1 flex-col justify-center gap-0 border-white/10 border-l-2 border-dashed bg-zinc-950/40 p-4">
              {p.otName && (
                <div className="relative flex items-center gap-3 border-zinc-700 border-l-2 border-dashed pb-3 pl-3 before:absolute before:top-2 before:-left-[2px] before:h-1 before:w-1 before:bg-zinc-500">
                  <DataLabel>OT_ID</DataLabel>
                  <span className="truncate font-mono text-[11px] text-zinc-300">{p.otName}</span>
                </div>
              )}
              {p.item !== undefined && p.item > 0 && (
                <div className="relative flex items-center gap-3 border-zinc-700 border-l-2 border-dashed py-3 pl-3 before:absolute before:top-4 before:-left-[2px] before:h-1 before:w-1 before:bg-zinc-500">
                  <DataLabel>HELD_ITEM</DataLabel>
                  <span className="truncate font-mono text-[11px] text-zinc-300">{gen2Items[p.item]}</span>
                </div>
              )}
              {p.friendship !== undefined && (
                <div className="relative flex items-center gap-3 border-zinc-700 border-l-2 border-dashed pt-3 pl-3 before:absolute before:top-4 before:-left-[2px] before:h-1 before:w-1 before:bg-zinc-500">
                  <DataLabel>SYNC_RATE</DataLabel>
                  <span className="font-mono text-[11px] text-rose-400">{p.friendship} PT</span>
                </div>
              )}
              {p.pokerus !== undefined && (
                <div className="relative flex items-center gap-3 border-zinc-700 border-l-2 border-dashed pt-3 pl-3 before:absolute before:top-4 before:-left-[2px] before:h-1 before:w-1 before:bg-zinc-500">
                  <DataLabel>POKERUS_STRAIN</DataLabel>
                  <PokerusBadge strain={p.pokerus.strain} />
                  {p.pokerus.daysRemaining !== undefined && (
                    <span className="font-mono text-[11px] text-zinc-400">
                      (DAYS_REMAINING: {p.pokerus.daysRemaining})
                    </span>
                  )}
                </div>
              )}
            </div>

            {generation === 2 && (
              <div className="relative z-10 border-white/5 border-t border-dashed bg-black/60 p-4">
                <TimeCapsuleBadge speciesId={p.speciesId} moves={p.moves} />
              </div>
            )}

            {p.caughtData && (
              <div className="relative z-10 flex items-center justify-between border-white/5 border-t border-dashed bg-zinc-900/40 p-4">
                <span className="flex items-center gap-1 font-black text-[8px] text-zinc-500 uppercase tracking-widest">
                  <MapPin size={10} className="text-[var(--theme-primary)]" /> EXTRACTION POINT
                </span>
                <span className="truncate font-black text-[10px] text-[var(--theme-primary)] uppercase tracking-tight">
                  {gen2Locations[p.caughtData.location] || 'UNKNOWN ZONE'}
                </span>
              </div>
            )}

            {p.ribbons && generation === 3 && (
              <div className="relative z-10 border-white/5 border-t border-dashed bg-black/40 p-4">
                <ContestRibbonsPanel ribbons={p.ribbons} />
              </div>
            )}

            {p.condition && generation === 3 && (
              <div className="relative z-10 flex flex-col gap-4 border-white/5 border-t border-dashed bg-black/40 p-4">
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
              </div>
            )}
          </TacticalPanel>
        ))}
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
