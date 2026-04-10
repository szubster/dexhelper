import { AlertTriangle, ArrowUpCircle, MapPin, Target } from 'lucide-react';
import type { LocationAreaEncounter, Encounter as PokeEncounter, VersionEncounterDetail } from 'pokenode-ts';
import { staticEncounters } from '../../../utils/data';

interface EvoReq {
  fromId: number;
  fromName: string;
  method: string;
}

interface PokemonLocationsProps {
  pokemonId: number;
  gameVersion: string;
  encounters: LocationAreaEncounter[];
  evoReq: EvoReq | null;
  loading: boolean;
}

export function PokemonLocations({ pokemonId, gameVersion, encounters, evoReq, loading }: PokemonLocationsProps) {
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
            const versionEnc = encounters.filter((e: LocationAreaEncounter) =>
              e.version_details.some((v: VersionEncounterDetail) => v.version.name === gameVersion),
            );

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
                  {versionEnc.map((e: LocationAreaEncounter) => {
                    const versionDetail = e.version_details.find(
                      (v: VersionEncounterDetail) => v.version.name === gameVersion,
                    );
                    return (
                      <div
                        key={e.location_area.name}
                        className="group flex flex-col space-y-3 rounded-2xl border border-white/5 bg-zinc-900 p-4 transition-all hover:border-[var(--theme-primary)]/30"
                      >
                        <div className="flex items-center justify-between">
                          <div className="flex items-center gap-3">
                            <div className="rounded-lg bg-[var(--theme-primary)]/10 p-2 text-[var(--theme-primary)]">
                              <MapPin size={14} />
                            </div>
                            <span className="font-bold text-xs uppercase tracking-wide transition-colors group-hover:text-white">
                              {e.location_area.name.replace(/-/g, ' ').toUpperCase()}
                            </span>
                          </div>
                          <div className="flex items-center gap-2">
                            {versionDetail?.encounter_details.map((d: PokeEncounter, di: number) => (
                              <span
                                // biome-ignore lint/suspicious/noArrayIndexKey: Array index is stable and required for duplicates
                                key={di}
                                className="rounded-md border border-white/5 bg-white/5 px-2 py-0.5 font-black text-[8px] text-zinc-500 uppercase tracking-widest"
                              >
                                LV.{d.min_level}-{d.max_level}
                              </span>
                            ))}
                          </div>
                        </div>
                        <div className="flex flex-wrap gap-1.5 border-[var(--theme-primary)]/20 border-l-2 pl-1.5">
                          {versionDetail?.encounter_details.map((d: PokeEncounter, di: number) => (
                            <span
                              // biome-ignore lint/suspicious/noArrayIndexKey: Array index is stable and required for duplicates
                              key={di}
                              className="font-black text-[8px] text-[var(--theme-primary)]/70 uppercase"
                            >
                              • {d.method.name.replace('-', ' ')} ({d.chance}%)
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
                {encounters.map((e: LocationAreaEncounter) => (
                  <div
                    key={e.location_area.name}
                    className="flex flex-col rounded-2xl border border-white/5 bg-zinc-900/40 p-4 opacity-60"
                  >
                    <div className="flex items-center justify-between">
                      <span className="font-bold text-xs text-zinc-500 uppercase">
                        {e.location_area.name.replace(/-/g, ' ').toUpperCase()}
                      </span>
                      <div className="flex gap-1">
                        {e.version_details.map((v: VersionEncounterDetail) => (
                          <span
                            key={v.version.name}
                            className="rounded border border-white/5 bg-white/5 px-1.5 py-0.5 font-black text-[7px] uppercase"
                          >
                            {v.version.name}
                          </span>
                        ))}
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
