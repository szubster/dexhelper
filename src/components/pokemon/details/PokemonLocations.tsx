import {
  Activity,
  AlertTriangle,
  ArrowUpCircle,
  Binary,
  Compass,
  Crosshair,
  Fish,
  Radar,
  Radio,
  Satellite,
  Target,
  Trees,
  Waves,
} from 'lucide-react';
import { useMemo } from 'react';
import type { CompactEncounter, CompactEncounterDetail } from '../../../db/schema';
import { POKE_VERSION_MAP, REVERSE_METHOD_MAP } from '../../../db/schema';
import { isValidStaticGameVersion, staticEncounters } from '../../../engine/data/shared/staticData';
import { DataLabel } from '../../DataLabel';
import { ScanlineOverlay } from '../../ScanlineOverlay';
import { SectionHeader } from '../../SectionHeader';
import { TacticalBadge } from '../../TacticalBadge';
import { TacticalNode } from '../../TacticalNode';
import { TelemetryDecoration } from '../../TelemetryDecoration';
import { LocationRow } from './LocationRow';

interface EvoReq {
  fromId: number;
  fromName: string;
  method: string;
}

interface PokemonLocationsProps {
  pokemonId: number;
  gameVersion: string;
  encounters: CompactEncounter[];
  areaNames: Record<number, string> | undefined;
  evoReq: EvoReq | null;
  loading: boolean;
}

export function PokemonLocations({
  pokemonId,
  gameVersion,
  encounters,
  areaNames,
  evoReq,
  loading,
}: PokemonLocationsProps) {
  const currentVersionId = POKE_VERSION_MAP[gameVersion.toLowerCase()];
  const staticEnc = isValidStaticGameVersion(gameVersion) ? staticEncounters[pokemonId]?.[gameVersion] : undefined;
  // ⚡ Bolt: Memoize versionEnc filtering to prevent unneeded array allocations on every render
  const versionEnc = useMemo(() => encounters.filter((e) => e.v === currentVersionId), [encounters, currentVersionId]);
  const hasEncounters = (staticEnc && staticEnc.length > 0) || versionEnc.length > 0 || evoReq;

  return (
    <div className="space-y-6">
      <div className="relative flex items-center justify-between overflow-hidden border-[var(--theme-primary)]/20 border-b-2 border-dashed pb-4">
        {/* Animated scanning line behind header */}
        <div className="absolute inset-0 z-0 -translate-x-full animate-[shimmer_3s_infinite] bg-gradient-to-r from-transparent via-[var(--theme-primary)]/10 to-transparent" />

        <div className="relative z-10">
          <SectionHeader
            title="Geospatial Telemetry"
            icon={<Satellite size={16} className="animate-pulse text-[var(--theme-primary)]" />}
            colorClass="text-[var(--theme-primary)]"
          />
        </div>
        <div className="relative z-10 hidden items-center gap-3 sm:flex">
          <div className="flex gap-1 font-mono text-[8px] text-[var(--theme-primary)]/50 opacity-70">
            <span>0F A4 3B 9C</span>
          </div>
          <Radar size={14} className="animate-[spin_4s_linear_infinite] text-[var(--theme-primary)]" />
          <TacticalBadge
            variant="primary"
            className="border-[var(--theme-primary)]/40 bg-[var(--theme-primary)]/15 px-3 py-1 font-black text-[10px] text-[var(--theme-primary)] shadow-[0_0_10px_rgba(var(--theme-primary-rgb),0.2)] backdrop-blur-md"
          >
            [ SAT-LINK: {gameVersion.toUpperCase()} ]
          </TacticalBadge>
        </div>
      </div>

      {loading ? (
        <div className="flex flex-col gap-2">
          <div className="tactical-skeleton h-10 w-1/3" />
          <div className="tactical-skeleton h-40" />
        </div>
      ) : (
        <div className="relative z-10 grid grid-cols-1 gap-6" data-testid="location-list">
          {hasEncounters ? (
            <>
              {evoReq && (
                <div className="group relative overflow-hidden border border-amber-500/30 border-dashed bg-amber-950/20 p-4">
                  <div className="absolute top-0 right-0 p-1 opacity-20 transition-opacity group-hover:opacity-100">
                    <Binary size={12} className="text-amber-500" />
                  </div>
                  <TelemetryDecoration label="EVOLUTION_PROTOCOL" className="top-0 left-4 text-amber-500/50" />

                  <LocationRow
                    icon={<ArrowUpCircle size={16} className="animate-pulse" />}
                    iconColorClass="text-amber-400 bg-amber-400/10 border-amber-400/40"
                    label={`LINK: EVOLVE ${evoReq.fromName.toUpperCase()}`}
                    badge={
                      <TacticalBadge
                        variant="amber"
                        className="py-0.5 text-[9px] shadow-[0_0_8px_rgba(251,191,36,0.2)]"
                      >
                        [ EVOLUTION ]
                      </TacticalBadge>
                    }
                    variant="amber"
                  />
                </div>
              )}
              {staticEnc?.map((loc, i) => (
                <div
                  // biome-ignore lint/suspicious/noArrayIndexKey: Array index is stable and required for duplicates
                  key={`static-${i}`}
                  className="group relative overflow-hidden border border-red-500/30 border-dashed bg-red-950/20 p-4"
                >
                  <ScanlineOverlay opacityClass="opacity-10" />
                  <TelemetryDecoration label="STATIC_ENCOUNTER" className="top-0 left-4 text-red-500/50" />

                  <LocationRow
                    icon={<Target size={16} className="animate-[pulse_2s_ease-in-out_infinite]" />}
                    iconColorClass="text-red-500 bg-red-500/10 border-red-500/40"
                    label={loc}
                    badge={
                      <TacticalBadge variant="red" className="py-0.5 text-[9px] shadow-[0_0_8px_rgba(239,68,68,0.2)]">
                        [ STATIONARY ]
                      </TacticalBadge>
                    }
                    variant="red"
                  />
                </div>
              ))}

              <div className="flex flex-col gap-4">
                {versionEnc.length > 0 && (
                  <div className="mb-2 flex items-center gap-2">
                    <Radio size={12} className="animate-pulse text-[var(--theme-primary)]" />
                    <span className="font-mono text-[10px] text-[var(--theme-primary)] uppercase tracking-widest">
                      [ FIELD_DEPLOYMENT_ZONES ]
                    </span>
                    <div className="h-[1px] flex-1 border-[var(--theme-primary)]/20 border-b border-dashed" />
                  </div>
                )}
                {versionEnc.map((e) => (
                  <GeospatialNode
                    key={`${e.aid}-${e.v}`}
                    encounter={e}
                    areaName={areaNames?.[e.aid] || `AREA #${e.aid}`}
                  />
                ))}
              </div>
            </>
          ) : (
            <FallbackLocations gameVersion={gameVersion} encounters={encounters} areaNames={areaNames} />
          )}
        </div>
      )}
    </div>
  );
}

function GeospatialNode({ encounter: e, areaName }: { encounter: CompactEncounter; areaName: string }) {
  return (
    <TacticalNode variant="primary" className="group relative overflow-hidden">
      {/* Background sweep animation */}
      <div className="pointer-events-none absolute top-0 bottom-0 left-0 w-24 animate-[sweep_4s_ease-in-out_infinite_alternate] bg-gradient-to-r from-[var(--theme-primary)]/5 to-transparent" />

      <div className="flex flex-col gap-4 p-5">
        {/* Header */}
        <div className="flex items-start justify-between border-zinc-800 border-b border-dashed pb-3">
          <div className="flex flex-col gap-1">
            <div className="flex items-center gap-2">
              <Crosshair size={12} className="text-[var(--theme-primary)]" />
              <span className="font-mono text-[9px] text-zinc-500 uppercase tracking-widest">
                ZONE_ID: {e.aid.toString().padStart(3, '0')}
              </span>
            </div>
            <h4 className="flex items-center gap-2 font-black font-display text-lg text-white uppercase tracking-wider">
              {areaName.toUpperCase()}
            </h4>
          </div>
          <div className="flex flex-col items-end gap-1 opacity-60">
            <Compass size={14} className="text-[var(--theme-primary)]" />
            <span className="font-mono text-[8px] text-[var(--theme-primary)]">LAT/LONG OK</span>
          </div>
        </div>

        {/* Vectors */}
        <div className="relative z-10 flex flex-col gap-3">
          <div className="flex items-center justify-between">
            <DataLabel>DEPLOYMENT VECTORS</DataLabel>
            <span className="font-mono text-[8px] text-zinc-600">
              VECTORS_FOUND:{e.d.length.toString().padStart(2, '0')}
            </span>
          </div>

          <div className="grid grid-cols-1 gap-3 md:grid-cols-2 lg:grid-cols-3">
            {e.d.map((d: CompactEncounterDetail, di: number) => {
              const methodStr = REVERSE_METHOD_MAP[d.m]?.toLowerCase() || 'unknown';
              const isRod = methodStr.includes('rod');
              const isSurf = methodStr === 'surf';
              const isGrass = methodStr === 'walk';
              const Icon = isRod ? Fish : isSurf ? Waves : isGrass ? Trees : Target;

              return (
                <div
                  // biome-ignore lint/suspicious/noArrayIndexKey: Array index is stable and required for duplicates
                  key={di}
                  className="group/vector relative flex flex-col gap-2 border border-zinc-800 bg-black/40 p-3 transition-all hover:border-[var(--theme-primary)]/60 hover:bg-[var(--theme-primary)]/5"
                >
                  {/* Corner Accents */}
                  <div className="absolute top-0 left-0 h-1.5 w-1.5 border-[var(--theme-primary)]/40 border-t border-l group-hover/vector:border-[var(--theme-primary)]" />
                  <div className="absolute right-0 bottom-0 h-1.5 w-1.5 border-[var(--theme-primary)]/40 border-r border-b group-hover/vector:border-[var(--theme-primary)]" />

                  <div className="flex items-center gap-3">
                    <div className="flex h-10 w-10 shrink-0 items-center justify-center border border-[var(--theme-primary)]/30 bg-[var(--theme-primary)]/10 text-[var(--theme-primary)] shadow-[inset_0_0_10px_rgba(var(--theme-primary-rgb),0.1)] transition-colors group-hover/vector:bg-[var(--theme-primary)]/20">
                      <Icon size={16} />
                    </div>

                    <div className="flex flex-1 flex-col gap-1 overflow-hidden">
                      <div className="flex w-full items-center justify-between">
                        <span className="truncate font-bold font-mono text-[11px] text-zinc-200 uppercase">
                          {methodStr.replace('-', ' ')}
                        </span>
                      </div>

                      <div className="flex items-center gap-1 font-mono text-[10px]">
                        <span className="text-zinc-500">LVL</span>
                        <span className="font-black text-[var(--theme-primary)]">
                          {d.min}
                          {d.min !== d.max ? `-${d.max}` : ''}
                        </span>
                      </div>
                    </div>
                  </div>

                  <div className="mt-1 flex items-center justify-between border-zinc-800 border-t border-dashed pt-2">
                    <div className="flex items-end gap-1">
                      <Activity size={10} className="text-emerald-500/70" />
                      <span className="font-mono text-[9px] text-zinc-500">PROBABILITY</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <div className="font-black font-mono text-[var(--theme-primary)] text-sm drop-shadow-[0_0_4px_rgba(var(--theme-primary-rgb),0.5)]">
                        {d.c}%
                      </div>

                      {/* Mini visual indicator */}
                      <div className="flex h-3 w-12 overflow-hidden border border-zinc-800 bg-black">
                        <div className="h-full bg-[var(--theme-primary)]/80" style={{ width: `${d.c}%` }} />
                      </div>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </TacticalNode>
  );
}

function FallbackLocations({
  gameVersion,
  encounters,
  areaNames,
}: {
  gameVersion: string;
  encounters: CompactEncounter[];
  areaNames: Record<number, string> | undefined;
}) {
  return (
    <div className="space-y-3 border border-red-500/30 border-dashed bg-red-950/10 p-4">
      <div className="mb-2 flex items-center gap-2 font-black text-[10px] text-amber-500/80 uppercase tracking-widest">
        <AlertTriangle size={14} className="animate-pulse text-amber-400" />[ SYS.ERR: TARGET NOT IN JURISDICTION (
        {gameVersion.toUpperCase()}) ]
      </div>
      <p className="mb-4 pl-6 font-mono text-[9px] text-zinc-400 uppercase">
        External cross-version extraction required from the following coordinates:
      </p>
      <div className="grid grid-cols-1 gap-2 pl-6 sm:grid-cols-2">
        {encounters.map((e) => (
          <div
            key={`${e.aid}-${e.v}`}
            className="flex flex-col rounded-none border border-zinc-800 border-dashed bg-zinc-950 p-3 transition-colors hover:border-amber-500/30"
          >
            <div className="flex items-center justify-between">
              <span className="font-bold text-[10px] text-zinc-300 uppercase tracking-wide">
                {(areaNames?.[e.aid] || `AREA #${e.aid}`).toUpperCase()}
              </span>
              <TacticalBadge variant="amber" className="border-amber-500/20 bg-amber-500/5 px-1.5 py-0.5 text-[8px]">
                V-ID: {e.v}
              </TacticalBadge>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
