import {
  AlertTriangle,
  ArrowUpCircle,
  Crosshair,
  Fish,
  Navigation,
  Radar,
  Satellite,
  Target,
  Trees,
  Waves,
} from 'lucide-react';
import { useMemo } from 'react';
import type { CompactEncounter, CompactEncounterDetail } from '../../../db/schema';
import { POKE_VERSION_MAP, REVERSE_METHOD_MAP } from '../../../db/schema';
import { isValidStaticGameVersion, staticEncounters } from '../../../engine/data/shared/staticData';
import { cn } from '../../../utils/cn';
import { DataLabel } from '../../DataLabel';
import { SectionHeader } from '../../SectionHeader';
import { TacticalBadge } from '../../TacticalBadge';
import { TacticalBlockHeader } from '../../TacticalBlockHeader';
import { TacticalNode } from '../../TacticalNode';
import { TacticalPanel } from '../../TacticalPanel';
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
      <div className="flex items-center justify-between border-[var(--theme-primary)]/20 border-b-2 border-dashed pb-4">
        <SectionHeader
          title="Geospatial Telemetry"
          icon={<Satellite size={16} className="animate-pulse text-[var(--theme-primary)]" />}
          colorClass="text-[var(--theme-primary)]"
        />
        <div className="hidden items-center gap-2 sm:flex">
          <Radar size={14} className="animate-[spin_3s_linear_infinite] text-[var(--theme-primary)]" />
          <TacticalBadge
            variant="primary"
            className="border-[var(--theme-primary)]/30 bg-[var(--theme-primary)]/10 px-3 text-[10px] text-[var(--theme-primary)] backdrop-blur-md"
          >
            [ SAT-LINK: {gameVersion.toUpperCase()} ]
          </TacticalBadge>
        </div>
      </div>

      {loading ? (
        <TacticalPanel className="h-40 animate-pulse rounded-none border border-dashed" />
      ) : (
        <div className="relative z-10 grid grid-cols-1 gap-4" data-testid="location-list">
          {hasEncounters ? (
            <>
              {evoReq && (
                <LocationRow
                  icon={<ArrowUpCircle size={14} />}
                  iconColorClass="text-amber-400 bg-amber-400/10 border-amber-400/30"
                  label={`LINK: EVOLVE ${evoReq.fromName.toUpperCase()}`}
                  badge={
                    <TacticalBadge variant="amber" className="py-0.5 text-[9px]">
                      [ EVOLUTION ]
                    </TacticalBadge>
                  }
                  variant="amber"
                />
              )}
              {staticEnc?.map((loc, i) => (
                <LocationRow
                  // biome-ignore lint/suspicious/noArrayIndexKey: Array index is stable and required for duplicates
                  key={`static-${i}`}
                  icon={<Target size={14} />}
                  iconColorClass="text-red-500 bg-red-500/10 border-red-500/30"
                  label={loc}
                  badge={
                    <TacticalBadge variant="red" className="py-0.5 text-[9px]">
                      [ STATIONARY ]
                    </TacticalBadge>
                  }
                  variant="red"
                />
              ))}
              {versionEnc.map((e) => (
                <GeospatialNode
                  key={`${e.aid}-${e.v}`}
                  encounter={e}
                  areaName={areaNames?.[e.aid] || `AREA #${e.aid}`}
                />
              ))}
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
    <TacticalNode variant="primary">
      <div className="flex flex-col gap-4 p-4 pl-6">
        {/* Header */}
        <TacticalBlockHeader
          variant="primary"
          icon={<Crosshair size={10} />}
          trackingLabel={`[ ZONE_ID: ${e.aid.toString().padStart(3, '0')} ]`}
          title={areaName.toUpperCase()}
          trailingIcon={<Navigation size={14} />}
          className="border-zinc-800/50"
        />

        {/* Vectors */}
        <div className="flex flex-col gap-2">
          <DataLabel>[ DETECTION VECTORS ]</DataLabel>
          <div className="grid grid-cols-1 gap-2 md:grid-cols-2">
            {e.d.map((d: CompactEncounterDetail, di: number) => {
              const methodStr = REVERSE_METHOD_MAP[d.m]?.toLowerCase() || 'unknown';
              const isRod = methodStr.includes('rod');
              const isSurf = methodStr === 'surf';
              const isGrass = methodStr === 'walk';
              const Icon = isRod ? Fish : isSurf ? Waves : isGrass ? Trees : Target;

              const blocks = Math.ceil(d.c / 10);

              return (
                <div
                  // biome-ignore lint/suspicious/noArrayIndexKey: Array index is stable and required for duplicates
                  key={di}
                  className="relative flex items-center gap-3 border border-zinc-800 border-dashed bg-zinc-950/80 p-2 transition-colors hover:border-[var(--theme-primary)]/40"
                >
                  <div className="flex h-8 w-8 items-center justify-center border border-white/5 bg-black text-[var(--theme-primary)]">
                    <Icon size={14} />
                  </div>
                  <div className="flex flex-1 flex-col gap-1.5 pr-2">
                    <div className="flex items-center justify-between">
                      <span className="font-bold font-mono text-[10px] text-zinc-300 uppercase">
                        {methodStr.replace('-', ' ')}
                      </span>
                      <span className="border border-[var(--theme-primary)]/20 bg-[var(--theme-primary)]/10 px-1 font-black font-mono text-[10px] text-[var(--theme-primary)]">
                        LV.{d.min}
                        {d.min !== d.max ? `-${d.max}` : ''}
                      </span>
                    </div>
                    <div className="flex items-center gap-2">
                      <div className="flex flex-1 gap-[2px]">
                        {Array.from({ length: 10 }).map((_, i) => (
                          <div
                            // biome-ignore lint/suspicious/noArrayIndexKey: Array index is stable and required for duplicates
                            key={i}
                            className={cn(
                              'h-1.5 flex-1 rounded-none',
                              i < blocks
                                ? 'bg-[var(--theme-primary)] shadow-[0_0_5px_rgba(var(--theme-primary-rgb),0.5)]'
                                : 'bg-zinc-800',
                            )}
                          />
                        ))}
                      </div>
                      <span className="w-7 text-right font-black text-[9px] text-[var(--theme-primary)]">{d.c}%</span>
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
