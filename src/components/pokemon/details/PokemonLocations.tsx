import { AlertTriangle, ArrowUpCircle, MapPin, Target } from 'lucide-react';
import type { CompactEncounter, CompactEncounterDetail } from '../../../db/schema';
import { POKE_VERSION_MAP, REVERSE_METHOD_MAP } from '../../../db/schema';
import { GEN1_AID_TO_NAME, GEN1_MAP_TO_AID } from '../../../engine/data/gen1/assistantData';
import { staticEncounters } from '../../../utils/data';

interface EvoReq {
  fromId: number;
  fromName: string;
  method: string;
}

interface PokemonLocationsProps {
  pokemonId: number;
  gameVersion: string;
  encounters: CompactEncounter[];
  evoReq: EvoReq | null;
  loading: boolean;
}

export function PokemonLocations({ pokemonId, gameVersion, encounters, evoReq, loading }: PokemonLocationsProps) {
  const currentVersionId = POKE_VERSION_MAP[gameVersion.toLowerCase()];

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between border-white/5 border-b pb-4">
        <h3 className="flex items-center gap-2 font-black text-[10px] text-zinc-500 uppercase tracking-[0.3em]">
          <MapPin size={14} /> Field Distribution
        </h3>
        <div className="rounded-full border border-white/10 bg-white/5 px-3 py-1 font-black text-[10px] text-[var(--theme-primary)] uppercase tracking-widest backdrop-blur-md">
          DATA-SRC: {gameVersion.toUpperCase()}
        </div>
      </div>

      {loading ? (
        <div className="glass-card h-40 animate-pulse rounded-3xl border border-white/5 bg-white/5" />
      ) : (
        <div className="relative z-10 grid grid-cols-1 gap-3">
          {(() => {
            const staticEnc = staticEncounters[pokemonId]?.[gameVersion as keyof (typeof staticEncounters)[number]];
            const versionEnc = encounters.filter((e) => e.v === currentVersionId);

            if ((staticEnc && staticEnc.length > 0) || versionEnc.length > 0 || evoReq) {
              return (
                <>
                  {evoReq && (
                    <div className="group flex items-center justify-between rounded-2xl border border-white/5 bg-zinc-900 p-4 transition-all hover:border-[var(--theme-primary)]/30">
                      <div className="flex items-center gap-3">
                        <div className="rounded-lg bg-amber-500/10 p-2 text-amber-500">
                          <ArrowUpCircle size={14} />
                        </div>
                        <span className="font-bold text-xs uppercase tracking-wide transition-colors group-hover:text-white">
                          Available via Evolving {evoReq.fromName.toUpperCase()}
                        </span>
                      </div>
                      <span className="rounded-lg border border-amber-500/10 bg-amber-500/5 px-2 py-1 font-black text-[8px] text-amber-500/60 uppercase tracking-widest">
                        EVOLUTION
                      </span>
                    </div>
                  )}
                  {staticEnc?.map((loc, i) => (
                    <div
                      // biome-ignore lint/suspicious/noArrayIndexKey: Array index is stable and required for duplicates
                      key={`static-${i}`}
                      className="group flex items-center justify-between rounded-2xl border border-white/5 bg-zinc-900 p-4 transition-all hover:border-[var(--theme-primary)]/30"
                    >
                      <div className="flex items-center gap-3">
                        <div className="rounded-lg bg-red-500/10 p-2 text-red-500">
                          <Target size={14} />
                        </div>
                        <span className="font-bold text-xs uppercase tracking-wide transition-colors group-hover:text-white">
                          {loc}
                        </span>
                      </div>
                      <span className="rounded-lg border border-red-500/10 bg-red-500/5 px-2 py-1 font-black text-[8px] text-red-500/60 uppercase tracking-widest">
                        STATIONARY
                      </span>
                    </div>
                  ))}
                  {versionEnc.map((e) => {
                    return (
                      <div
                        key={`${e.aid}-${e.v}`}
                        className="group flex flex-col space-y-3 rounded-2xl border border-white/5 bg-zinc-900 p-4 transition-all hover:border-[var(--theme-primary)]/30"
                      >
                        <div className="flex items-center justify-between">
                          <div className="flex items-center gap-3">
                            <div className="rounded-lg bg-[var(--theme-primary)]/10 p-2 text-[var(--theme-primary)]">
                              <MapPin size={14} />
                            </div>
                            <span className="font-bold text-xs uppercase tracking-wide transition-colors group-hover:text-white">
                              {(() => {
                                const aidToName = GEN1_AID_TO_NAME as Record<number, string>;
                                const mapToAid = GEN1_MAP_TO_AID as Record<number, number>;
                                const mappedAid = mapToAid[e.aid];
                                return (
                                  (mappedAid !== undefined ? aidToName[mappedAid] : null) ||
                                  aidToName[e.aid] ||
                                  `AREA #${e.aid}`
                                ).toUpperCase();
                              })()}
                            </span>
                          </div>
                          <div className="flex items-center gap-2">
                            {e.d.map((d: CompactEncounterDetail, di: number) => (
                              <span
                                // biome-ignore lint/suspicious/noArrayIndexKey: Array index is stable and required for duplicates
                                key={di}
                                className="rounded-md border border-white/5 bg-white/5 px-2 py-0.5 font-black text-[8px] text-zinc-500 uppercase tracking-widest"
                              >
                                LV.{d.min}-{d.max}
                              </span>
                            ))}
                          </div>
                        </div>
                        <div className="flex flex-wrap gap-1.5 border-[var(--theme-primary)]/20 border-l-2 pl-1.5">
                          {e.d.map((d: CompactEncounterDetail, di: number) => (
                            <span
                              // biome-ignore lint/suspicious/noArrayIndexKey: Array index is stable and required for duplicates
                              key={di}
                              className="font-black text-[8px] text-[var(--theme-primary)]/70 uppercase"
                            >
                              • {REVERSE_METHOD_MAP[d.m]?.replace('-', ' ')} ({d.c}%)
                            </span>
                          ))}
                        </div>
                      </div>
                    );
                  })}
                </>
              );
            }

            // Fallback to other versions ONLY if missing in current (and no evolution path)
            return (
              <div className="space-y-3">
                <div className="mb-2 flex items-center gap-2 font-black text-[10px] text-amber-500/60 uppercase italic tracking-widest">
                  <AlertTriangle size={12} /> Species unavailable in {gameVersion.toUpperCase()}. External cross-version
                  extraction required.
                </div>
                {encounters.map((e) => (
                  <div
                    key={`${e.aid}-${e.v}`}
                    className="flex flex-col rounded-2xl border border-white/5 bg-zinc-900/40 p-4 opacity-60"
                  >
                    <div className="flex items-center justify-between">
                      <span className="font-bold text-xs text-zinc-500 uppercase">
                        {(() => {
                          const aidToName = GEN1_AID_TO_NAME as Record<number, string>;
                          const mapToAid = GEN1_MAP_TO_AID as Record<number, number>;
                          const mappedAid = mapToAid[e.aid];
                          return (
                            (mappedAid !== undefined ? aidToName[mappedAid] : null) ||
                            aidToName[e.aid] ||
                            `AREA #${e.aid}`
                          ).toUpperCase();
                        })()}
                      </span>
                      <div className="flex gap-1">
                        <span className="rounded border border-white/5 bg-white/5 px-1.5 py-0.5 font-black text-[7px] uppercase">
                          V-ID: {e.v}
                        </span>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            );
          })()}
        </div>
      )}
    </div>
  );
}
