import { useQueries, useQuery } from '@tanstack/react-query';
import { AlertCircle, CheckCircle2, MapPin, Monitor, Sparkles, X } from 'lucide-react';
import type { LocationAreaEncounter, VersionEncounterDetail } from 'pokenode-ts';
import React, { useEffect } from 'react';
import type { SaveData } from '../engine/saveParser/index';
import type { PokeballType } from '../store';
import { cn } from '../utils/cn';
import { stadiumRewardsSummary, staticEncounters } from '../utils/data';
import { getGenerationConfig } from '../utils/generationConfig';
import { pokeapi } from '../utils/pokeapi';
import { PokemonCatchProbability } from './pokemon/details/PokemonCatchProbability';
import { PokemonCaughtDetails } from './pokemon/details/PokemonCaughtDetails';
import { PokemonEvolutions } from './pokemon/details/PokemonEvolutions';
import { PokemonLocations } from './pokemon/details/PokemonLocations';
import { PokemonStats } from './pokemon/details/PokemonStats';

// Static data moved to data.ts

// Static data moved to data.ts

interface PokemonDetailsProps {
  pokemonId: number;
  pokemonName: string;
  gameVersion: string;
  saveData: SaveData | null;
  isLivingDex: boolean;
  pokeball: PokeballType;
  onClose: () => void;
  onNavigate: (id: number, name: string) => void;
}

// gen2Items and gen2Locations moved to data.ts

const _modalVariants = {
  hidden: { opacity: 0, scale: 0.95, y: 40 },
  visible: {
    opacity: 1,
    scale: 1,
    y: 0,
    transition: {
      type: 'spring',
      damping: 25,
      stiffness: 300,
      staggerChildren: 0.05,
      delayChildren: 0.1,
    },
  },
  exit: {
    opacity: 0,
    scale: 0.95,
    y: 40,
    transition: { duration: 0.2 },
  },
} as const;

const _contentVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { type: 'spring', damping: 20, stiffness: 100 },
  },
} as const;

export function PokemonDetails({
  pokemonId,
  pokemonName,
  gameVersion,
  saveData,
  isLivingDex,
  pokeball: defaultPokeball,
  onClose,
  onNavigate,
}: PokemonDetailsProps) {
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose();
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [onClose]);

  const queries = useQueries({
    queries: [
      {
        queryKey: ['encounters', pokemonId],
        queryFn: () => pokeapi.getPokemonEncounterAreasByName(pokemonId),
      },
      {
        queryKey: ['pokemon', pokemonId],
        queryFn: () => pokeapi.getPokemonByName(pokemonId),
      },
      {
        queryKey: ['species', pokemonId],
        queryFn: () => pokeapi.getPokemonSpeciesByName(pokemonId),
      },
    ],
  });

  // Calculator state moved to PokemonCatchProbability

  const _encountersReady = queries[0].isSuccess;
  const _pokemonReady = queries[1].isSuccess;
  const _speciesReady = queries[2].isSuccess;

  const encounters = queries[0].data || [];
  const pokemonData = queries[1].data;
  const speciesData = queries[2].data;

  const catchRate = speciesData?.capture_rate ?? null;
  const _genderRate = speciesData?.gender_rate ?? -1;

  const { data: evolutionData } = useQuery({
    queryKey: ['evolution', speciesData?.evolution_chain?.url],
    queryFn: () => pokeapi.resource(speciesData!.evolution_chain.url),
    enabled: !!speciesData?.evolution_chain?.url,
  });

  const evoReq = React.useMemo(() => {
    if (!speciesData?.evolves_from_species || !evolutionData) return null;

    const fromName = speciesData.evolves_from_species.name;
    const fromId = parseInt(speciesData.evolves_from_species.url.split('/').filter(Boolean).pop() || '0', 10);

    // For saves from gens that don't have this pre-evolution, ignore it (e.g., baby Pokemon in Gen 1)
    if (saveData && fromId > getGenerationConfig(saveData.generation).maxDex) return null;

    let methodStr = 'Unknown';

    const findEvoDetails = (chain: any): any => {
      if (chain.species.name === pokemonName.toLowerCase()) {
        return chain.evolution_details[0];
      }
      for (const next of chain.evolves_to) {
        const found = findEvoDetails(next);
        if (found) return found;
      }
      return null;
    };

    const details = findEvoDetails(evolutionData.chain);
    if (details) {
      if (details.trigger?.name === 'level-up') {
        methodStr = details.min_level ? `Level ${details.min_level}` : 'Level up';
      } else if (details.trigger?.name === 'use-item') {
        methodStr = details.item?.name?.replace(/-/g, ' ').replace(/\b\w/g, (l: string) => l.toUpperCase()) || 'Item';
      } else if (details.trigger?.name === 'trade') {
        methodStr = 'Trade';
      }
    }

    return {
      fromId,
      fromName: fromName.charAt(0).toUpperCase() + fromName.slice(1),
      method: methodStr,
    };
  }, [speciesData, evolutionData, pokemonName, saveData]);

  const evolvesTo = React.useMemo(() => {
    if (!speciesData || !evolutionData) return null;

    const findEvolutions = (chain: any): any[] => {
      if (chain.species.name === pokemonName.toLowerCase()) {
        return chain.evolves_to
          .map((evo: any) => {
            const id = parseInt(evo.species.url.split('/').filter(Boolean).pop() || '0', 10);
            // For saves from gens that don't have this evolution, ignore it
            if (saveData && id > getGenerationConfig(saveData.generation).maxDex) return null;

            let methodStr = 'Unknown';
            const details = evo.evolution_details[0];
            if (details) {
              if (details.trigger?.name === 'level-up') {
                methodStr = details.min_level ? `Level ${details.min_level}` : 'Level up';
              } else if (details.trigger?.name === 'use-item') {
                methodStr =
                  details.item?.name?.replace(/-/g, ' ').replace(/\b\w/g, (l: string) => l.toUpperCase()) || 'Item';
              } else if (details.trigger?.name === 'trade') {
                methodStr = 'Trade';
              }
            }
            return {
              id,
              name: evo.species.name.charAt(0).toUpperCase() + evo.species.name.slice(1),
              method: methodStr,
            };
          })
          .filter(Boolean);
      }
      for (const next of chain.evolves_to) {
        const found = findEvolutions(next);
        if (found.length > 0) return found;
      }
      return [];
    };

    return findEvolutions(evolutionData.chain);
  }, [speciesData, evolutionData, pokemonName, saveData]);

  const breedingInfo = React.useMemo(() => {
    if (!speciesData?.is_baby || !evolutionData) return null;

    // Only show breeding info for gens that support it
    if (saveData && !getGenerationConfig(saveData.generation).hasBreeding) return null;

    const parents: { id: number; name: string }[] = [];

    const traverse = (node: any) => {
      if (node.species.name !== speciesData.name) {
        const id = parseInt(node.species.url.split('/').filter(Boolean).pop() || '0', 10);
        parents.push({
          id,
          name: node.species.name.charAt(0).toUpperCase() + node.species.name.slice(1),
        });
      }
      node.evolves_to?.forEach(traverse);
    };
    traverse(evolutionData.chain);

    return {
      parentIds: parents.map((p) => p.id),
      parentNames: parents.map((p) => p.name),
      method: 'Breed evolved form with Ditto or same egg group',
    };
  }, [speciesData, evolutionData, saveData?.generation, saveData]);

  const loading = queries.some((q) => q.isLoading) || (!!speciesData?.evolution_chain?.url && !evolutionData);

  const getLocationsForVersion = (version: string) => {
    const locations: { name: string; details: string }[] = [];

    const staticData = staticEncounters[pokemonId];
    if (staticData && staticData[version as keyof typeof staticData]) {
      staticData[version as keyof typeof staticData]!.forEach((loc) => {
        locations.push({ name: loc, details: 'Static Encounter / Gift / Trade' });
      });
    }

    encounters.forEach((enc: LocationAreaEncounter) => {
      const versionDetail = enc.version_details.find((vd: VersionEncounterDetail) => vd.version.name === version);
      if (versionDetail) {
        let name = enc.location_area.name
          .replace(/-/g, ' ')
          .replace(/\b\w/g, (l: string) => l.toUpperCase())
          .replace(' Area', '')
          .replace('Kanto ', '')
          .replace('Johto ', '');

        const methodMap = new Map<string, { chance: number; min: number; max: number; conditions: string[] }>();
        versionDetail.encounter_details.forEach((detail: any) => {
          const method = detail.method.name.replace(/-/g, ' ');
          const conditions = detail.condition_values.map((cv: any) => cv.name.replace(/-/g, ' '));
          const key = `${method}${conditions.length > 0 ? ` (${conditions.join(', ')})` : ''}`;

          const existing = methodMap.get(key);
          if (existing) {
            existing.chance += detail.chance;
            existing.min = Math.min(existing.min, detail.min_level);
            existing.max = Math.max(existing.max, detail.max_level);
          } else {
            methodMap.set(key, {
              chance: detail.chance,
              min: detail.min_level,
              max: detail.max_level,
              conditions,
            });
          }
        });

        const detailStrings = Array.from(methodMap.entries()).map(([key, data]) => {
          const lvl = data.min === data.max ? `Lv ${data.min}` : `Lv ${data.min}-${data.max}`;
          return `${data.chance}% chance, ${lvl} (${key})`;
        });

        locations.push({ name, details: detailStrings.join(' | ') });
      }
    });

    return locations;
  };

  const _redLocations = getLocationsForVersion('red');
  const _blueLocations = getLocationsForVersion('blue');
  const _yellowLocations = getLocationsForVersion('yellow');
  const _goldLocations = getLocationsForVersion('gold');
  const _silverLocations = getLocationsForVersion('silver');
  const _crystalLocations = getLocationsForVersion('crystal');

  const _renderLocations = (locations: { name: string; details: string }[], colorClass: string) => {
    if (locations.length === 0) {
      return (
        <div className="text-[10px] text-zinc-600 uppercase tracking-widest font-black flex items-center gap-2 py-4">
          <AlertCircle size={14} /> Not found in the wild
        </div>
      );
    }
    return (
      <div className="space-y-3 max-h-64 overflow-y-auto pr-2 custom-scrollbar">
        {locations.map((loc, i) => (
          <div
            key={i}
            className="group bg-zinc-950 p-4 rounded-2xl border border-zinc-900 hover:border-zinc-800 transition-all"
          >
            <div className="flex items-center gap-3 mb-2">
              <div className={`p-1.5 rounded-lg bg-zinc-900 ${colorClass}`}>
                <MapPin size={14} />
              </div>
              <span className="text-xs font-black uppercase tracking-tight text-zinc-100">{loc.name}</span>
            </div>
            <div className="text-[10px] text-zinc-500 pl-8 leading-relaxed font-mono font-bold">{loc.details}</div>
          </div>
        ))}
      </div>
    );
  };

  const genConfig = saveData ? getGenerationConfig(saveData.generation) : getGenerationConfig(1);

  const displayVersion = gameVersion === 'unknown' ? genConfig.defaultVersion : gameVersion;

  const currentGenVersions = genConfig.versions.map((v) => v.id);

  const allVersionLocations = currentGenVersions.reduce(
    (acc, v) => {
      acc[v] = getLocationsForVersion(v);
      return acc;
    },
    {} as Record<string, { name: string; details: string }[]>,
  );

  const isSafariNative = React.useMemo(() => {
    const locations = allVersionLocations[displayVersion] || [];
    return locations.some((loc) => loc.name.toLowerCase().includes('safari zone'));
  }, [allVersionLocations, displayVersion]);

  const effectivePokeball = isSafariNative ? 'safari' : defaultPokeball;

  let hasPreEvo = false;
  if (evoReq && saveData) {
    const preEvoInStorage = saveData.party.includes(evoReq.fromId) || saveData.pc.includes(evoReq.fromId);
    const preEvoOwned = saveData.owned.has(evoReq.fromId);
    hasPreEvo = isLivingDex ? preEvoInStorage : preEvoOwned;
  }

  const stadiumReward = stadiumRewardsSummary[pokemonId];

  const _getGender = (atkDV: number, rate: number) => {
    if (rate === -1) return 'Genderless';
    if (rate === 0) return 'Male';
    if (rate === 8) return 'Female';
    return atkDV < rate * 2 ? 'Female' : 'Male';
  };

  const _getUnownForm = (dvs: { atk: number; def: number; spd: number; spc: number }) => {
    const formValue =
      ((dvs.atk & 0x06) << 5) | ((dvs.def & 0x06) << 3) | ((dvs.spd & 0x06) << 1) | ((dvs.spc & 0x06) >> 1);
    const letterIndex = Math.floor(formValue / 10);
    return String.fromCharCode(65 + letterIndex);
  };

  const yourPokemon = saveData
    ? [
        ...saveData.partyDetails.filter((p) => p.speciesId === pokemonId).map((p) => ({ ...p, location: 'Party' })),
        ...saveData.pcDetails.filter((p) => p.speciesId === pokemonId).map((p) => ({ ...p, location: 'PC' })),
      ]
    : [];

  const isShiny = yourPokemon.some((p) => p.isShiny);

  return (
    <div
      className="fixed inset-0 z-50 flex items-end sm:items-center justify-center p-0 sm:p-4 animate-in fade-in duration-300"
      onClick={onClose}
    >
      <div className="absolute inset-0 bg-black/90 backdrop-blur-xl" />
      <div
        onClick={(e) => e.stopPropagation()}
        className="bg-zinc-950/90 w-full h-[95vh] sm:h-[85vh] sm:max-w-5xl rounded-t-[2.5rem] sm:rounded-[3rem] border-t sm:border border-white/10 shadow-2xl overflow-hidden flex flex-col relative animate-in slide-in-from-bottom-[100%] sm:zoom-in-95 duration-500 ease-out"
      >
        {/* Scanline Overlay */}
        <div className="absolute inset-0 pointer-events-none scanline-overlay opacity-20" />

        {/* Header Section */}
        <div className="relative p-6 sm:p-10 border-b border-white/5 bg-gradient-to-b from-white/5 to-transparent shrink-0">
          <div className="flex flex-col sm:flex-row items-center sm:items-end justify-between gap-6">
            <div className="flex flex-col sm:flex-row items-center sm:items-center gap-6 sm:gap-10">
              <div className="relative group">
                <div className="w-32 h-32 sm:w-40 sm:h-40 glass-card bg-zinc-900/50 rounded-3xl border-white/10 flex items-center justify-center overflow-hidden relative shadow-2xl animate-in zoom-in-50 fade-in duration-500 delay-100 fill-mode-both">
                  <div className="absolute inset-0 bg-gradient-to-tr from-[var(--theme-primary)]/10 to-transparent" />
                  <img
                    src={genConfig.spriteUrl(pokemonId, isShiny)}
                    alt={pokemonName}
                    className="w-24 h-24 sm:w-32 sm:h-32 object-contain pixelated drop-shadow-[0_0_15px_rgba(255,255,255,0.2)] relative z-10"
                    style={{ imageRendering: 'pixelated' }}
                    referrerPolicy="no-referrer"
                  />
                  {/* Digital corner accents */}
                  <div className="absolute top-2 left-2 w-3 h-3 border-t-2 border-l-2 border-white/20" />
                  <div className="absolute top-2 right-2 w-3 h-3 border-t-2 border-r-2 border-white/20" />
                  <div className="absolute bottom-2 left-2 w-3 h-3 border-b-2 border-l-2 border-white/20" />
                  <div className="absolute bottom-2 right-2 w-3 h-3 border-b-2 border-r-2 border-white/20" />
                </div>

                {isShiny && (
                  <div className="absolute -top-3 -right-3 p-2 bg-amber-500 rounded-xl shadow-[0_0_20px_rgba(245,158,11,0.5)] text-white z-20 animate-[pulse_3s_ease-in-out_infinite]">
                    <Sparkles size={18} />
                  </div>
                )}
              </div>

              <div className="text-center sm:text-left">
                <div className="flex flex-col animate-in slide-in-from-bottom-4 fade-in duration-500 delay-200 fill-mode-both">
                  <span className="text-xs font-black text-zinc-500 uppercase tracking-[0.4em] mb-2 font-mono">
                    Index No. {pokemonId.toString().padStart(3, '0')}
                  </span>
                  <h2 className="text-4xl sm:text-6xl font-display font-black uppercase tracking-tighter text-white leading-none mb-4 drop-shadow-sm">
                    {pokemonName}
                  </h2>
                  <div className="flex flex-wrap justify-center sm:justify-start gap-2">
                    {pokemonData?.types.map((t: any) => (
                      <span
                        key={t.type.name}
                        className="px-4 py-1.5 bg-white/5 border border-white/10 rounded-full text-[10px] font-black uppercase tracking-widest text-zinc-300 backdrop-blur-md"
                      >
                        {t.type.name}
                      </span>
                    ))}
                    {stadiumReward && (
                      <div className="px-4 py-1.5 bg-blue-500/10 border border-blue-500/20 rounded-full text-[10px] font-black text-blue-400 uppercase tracking-widest flex items-center gap-1.5 backdrop-blur-md">
                        <Monitor size={12} /> Stadium Reward
                      </div>
                    )}

                    {saveData && (
                      <div
                        className={cn(
                          'px-4 py-1.5 rounded-full text-[10px] font-black uppercase tracking-[0.2em] flex items-center gap-2 backdrop-blur-md border',
                          yourPokemon.length > 0
                            ? 'bg-emerald-500/10 border-emerald-500/30 text-emerald-400'
                            : 'bg-red-500/10 border-red-500/30 text-red-500',
                        )}
                      >
                        {yourPokemon.length > 0 ? (
                          <>
                            <CheckCircle2 size={12} className="animate-pulse" />
                            Collection Secured
                          </>
                        ) : (
                          <>
                            <AlertCircle size={12} />
                            Missing from Collection
                          </>
                        )}
                      </div>
                    )}
                  </div>
                </div>
              </div>
            </div>

            <button
              onClick={onClose}
              aria-label="Close details"
              className="absolute top-6 right-6 sm:relative sm:top-auto sm:right-auto p-4 bg-white/5 hover:bg-white/10 border border-white/10 rounded-2xl transition-all group active:scale-95"
            >
              <X size={24} className="text-zinc-400 group-hover:text-white transition-colors" />
            </button>
          </div>
        </div>

        <div className="flex-1 overflow-y-auto custom-scrollbar p-6 sm:p-10">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12">
            {/* Left Column: Stats & Catching */}
            <div className="lg:col-span-5 space-y-10">
              {/* Stats & Power Readout */}
              <div className="space-y-8">
                {pokemonData && <PokemonStats pokemonData={pokemonData} saveData={saveData} />}
              </div>

              {/* Catch Rate Calc */}
              {catchRate !== null && (
                <PokemonCatchProbability catchRate={catchRate} effectivePokeball={effectivePokeball} />
              )}
            </div>

            {/* Right Column: Details & Locations */}
            <div className="lg:col-span-7 space-y-12">
              <PokemonCaughtDetails yourPokemon={yourPokemon} saveData={saveData} />

              {/* Evolution & Procurement Strategy */}
              <PokemonEvolutions
                evoReq={evoReq}
                evolvesTo={evolvesTo || []}
                breedingInfo={breedingInfo}
                hasPreEvo={hasPreEvo}
                onNavigate={onNavigate}
                yourPokemonLength={yourPokemon.length}
                pokemonId={pokemonId}
                gameVersion={gameVersion}
                saveData={saveData}
              />

              <PokemonLocations
                pokemonId={pokemonId}
                gameVersion={gameVersion}
                encounters={encounters}
                evoReq={evoReq}
                loading={loading}
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
