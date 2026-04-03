import React from 'react';
import { MapPin, ArrowUpCircle, Target, AlertTriangle } from 'lucide-react';
import { staticEncounters } from '../../../utils/data';
import type { LocationAreaEncounter, VersionEncounterDetail, Encounter as PokeEncounter } from 'pokenode-ts';

interface PokemonLocationsProps {
  pokemonId: number;
  gameVersion: string;
  encounters: LocationAreaEncounter[];
  evoReq: any;
  loading: boolean;
}

export function PokemonLocations({ pokemonId, gameVersion, encounters, evoReq, loading }: PokemonLocationsProps) {
  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between border-b border-white/5 pb-4">
        <h3 className="text-[10px] font-black text-zinc-500 uppercase tracking-[0.3em] flex items-center gap-2">
          <MapPin size={14} /> Field Distribution
        </h3>
        <div className="px-3 py-1 bg-white/5 rounded-full text-[10px] font-black text-[var(--theme-primary)] uppercase tracking-widest border border-white/10 backdrop-blur-md">
          DATA-SRC: {gameVersion.toUpperCase()}
        </div>
      </div>
      
      {loading ? (
        <div className="h-40 glass-card bg-white/5 rounded-3xl border border-white/5 animate-pulse" />
      ) : (
        <div className="grid grid-cols-1 gap-3 relative z-10">
        {(() => {
          const staticEnc = staticEncounters[pokemonId]?.[gameVersion as keyof (typeof staticEncounters)[number]];
          const versionEnc = encounters.filter((e: LocationAreaEncounter) => e.version_details.some((v: VersionEncounterDetail) => v.version.name === gameVersion));
          
          if ((staticEnc && staticEnc.length > 0) || versionEnc.length > 0 || evoReq) {
            return (
              <>
                {evoReq && (
                  <div className="flex items-center justify-between p-4 bg-zinc-900 border border-white/5 rounded-2xl group hover:border-[var(--theme-primary)]/30 transition-all">
                    <div className="flex items-center gap-3">
                      <div className="p-2 bg-amber-500/10 rounded-lg text-amber-500"><ArrowUpCircle size={14} /></div>
                      <span className="text-xs font-bold uppercase tracking-wide group-hover:text-white transition-colors">
                        Available via Evolving {evoReq.fromName.toUpperCase()}
                      </span>
                    </div>
                    <span className="text-[8px] font-black text-amber-500/60 uppercase tracking-widest px-2 py-1 bg-amber-500/5 rounded-lg border border-amber-500/10">EVOLUTION</span>
                  </div>
                )}
                {staticEnc?.map((loc, i) => (
                  <div key={`static-${i}`} className="flex items-center justify-between p-4 bg-zinc-900 border border-white/5 rounded-2xl group hover:border-[var(--theme-primary)]/30 transition-all">
                    <div className="flex items-center gap-3">
                      <div className="p-2 bg-red-500/10 rounded-lg text-red-500"><Target size={14} /></div>
                      <span className="text-xs font-bold uppercase tracking-wide group-hover:text-white transition-colors">{loc}</span>
                    </div>
                    <span className="text-[8px] font-black text-red-500/60 uppercase tracking-widest px-2 py-1 bg-red-500/5 rounded-lg border border-red-500/10">STATIONARY</span>
                  </div>
                ))}
                {versionEnc.map((e: LocationAreaEncounter, i: number) => (
                  <div key={i} className="flex flex-col p-4 bg-zinc-900 border border-white/5 rounded-2xl group hover:border-[var(--theme-primary)]/30 transition-all space-y-3">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-3">
                        <div className="p-2 bg-[var(--theme-primary)]/10 rounded-lg text-[var(--theme-primary)]"><MapPin size={14} /></div>
                        <span className="text-xs font-bold uppercase tracking-wide group-hover:text-white transition-colors">
                          {e.location_area.name.replace(/-/g, ' ').toUpperCase()}
                        </span>
                      </div>
                      <div className="flex items-center gap-2">
                        {e.version_details.find((v: VersionEncounterDetail) => v.version.name === gameVersion)?.encounter_details.map((d: PokeEncounter, di: number) => (
                          <span key={di} className="text-[8px] font-black text-zinc-500 uppercase tracking-widest px-2 py-0.5 bg-white/5 rounded-md border border-white/5">
                            LV.{d.min_level}-{d.max_level}
                          </span>
                        ))}
                      </div>
                    </div>
                    <div className="flex flex-wrap gap-1.5 pl-1.5 border-l-2 border-[var(--theme-primary)]/20">
                      {e.version_details.find((v: VersionEncounterDetail) => v.version.name === gameVersion)?.encounter_details.map((d: PokeEncounter, di: number) => (
                        <span key={di} className="text-[8px] font-black text-[var(--theme-primary)]/70 uppercase">
                          • {d.method.name.replace('-', ' ')} ({d.chance}%)
                        </span>
                      ))}
                    </div>
                  </div>
                ))}
              </>
            );
          }

          // Fallback to other versions ONLY if missing in current (and no evolution path)
          return (
            <div className="space-y-3">
              <div className="text-[10px] font-black text-amber-500/60 uppercase tracking-widest flex items-center gap-2 mb-2 italic">
                <AlertTriangle size={12} /> Species unavailable in {gameVersion.toUpperCase()}. External cross-version extraction required.
              </div>
              {encounters.map((e: LocationAreaEncounter, i: number) => (
                <div key={i} className="flex flex-col p-4 bg-zinc-900/40 border border-white/5 rounded-2xl opacity-60">
                  <div className="flex items-center justify-between">
                    <span className="text-xs font-bold uppercase text-zinc-500">
                      {e.location_area.name.replace(/-/g, ' ').toUpperCase()}
                    </span>
                    <div className="flex gap-1">
                      {e.version_details.map((v: VersionEncounterDetail) => (
                        <span key={v.version.name} className="text-[7px] font-black bg-white/5 px-1.5 py-0.5 rounded border border-white/5 uppercase">
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
