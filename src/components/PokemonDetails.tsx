import { useQuery } from '@tanstack/react-query';
import { AlertCircle, CheckCircle2, MapPin, Monitor, Sparkles, X } from 'lucide-react';
import React, { useEffect } from 'react';
import { dexDataLoader } from '../db/DexDataLoader';
import {
  type CompactEvolutionChain,
  type PokemonCompact,
  REVERSE_METHOD_MAP,
  REVERSE_VERSION_MAP,
  type SpeciesCompact,
} from '../db/schema';
import type { SaveData } from '../engine/saveParser/index';
import type { PokeballType } from '../store';
import { cn } from '../utils/cn';
import { stadiumRewardsSummary } from '../utils/data';
import { getGenerationConfig } from '../utils/generationConfig';
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

  const { data: allData, isLoading: loading } = useQuery({
    queryKey: ['pokemon-details', pokemonId],
    queryFn: () => dexDataLoader.getPokemonDetails(pokemonId),
  });

  const pokemonData = allData?.pokemon as PokemonCompact | undefined;
  const speciesData = allData?.species as SpeciesCompact | undefined;
  const encounters = allData?.encounters || [];
  const evolutionData = allData?.evolutionChain as CompactEvolutionChain | undefined;

  const catchRate = speciesData?.cr ?? null;
  const genderRate = speciesData?.gr ?? -1;

  const evoReq = React.useMemo(() => {
    if (!speciesData?.pre || !evolutionData) return null;

    const fromId = speciesData.pre;
    let methodStr = 'Unknown';

    const findEvoDetails = (node: any): any[] | null => {
      if (node.sid === pokemonId) return node.details;
      for (const next of node.evolves_to) {
        const found = findEvoDetails(next);
        if (found) return found;
      }
      return null;
    };

    const details = findEvoDetails(evolutionData.chain);
    if (details && details.length > 0) {
      const d = details[0];
      if (d.tr === 1) methodStr = d.min_l ? `Level ${d.min_l}` : 'Level up';
      else if (d.tr === 3) methodStr = 'Use Item';
      else if (d.tr === 2) methodStr = 'Trade';
    }

    return {
      fromId,
      fromName: 'Earlier Form',
      method: methodStr,
    };
  }, [speciesData, evolutionData, pokemonId]);

  const evolvesTo = React.useMemo(() => {
    if (!speciesData || !evolutionData) return [];

    const findEvolutions = (node: any): any[] | null => {
      if (node.sid === pokemonId) return node.evolves_to;
      for (const next of node.evolves_to) {
        const found = findEvolutions(next);
        if (found) return found;
      }
      return null;
    };

    const evos = findEvolutions(evolutionData.chain);
    if (!evos) return [];

    return evos
      .map((evo: any) => {
        const id = evo.sid;
        if (saveData && id > getGenerationConfig(saveData.generation).maxDex) return null;

        let methodStr = 'Unknown';
        const d = evo.details[0];
        if (d) {
          if (d.tr === 1) methodStr = d.min_l ? `Level ${d.min_l}` : 'Level up';
          else if (d.tr === 3) methodStr = 'Use Item';
          else if (d.tr === 2) methodStr = 'Trade';
        }
        return {
          id,
          name: 'Next Form',
          method: methodStr,
        };
      })
      .filter((evo): evo is { id: number; name: string; method: string } => evo !== null);
  }, [speciesData, evolutionData, pokemonId, saveData]);

  const breedingInfo = React.useMemo(() => {
    if (!speciesData?.baby || !evolutionData) return null;
    if (saveData && !getGenerationConfig(saveData.generation).hasBreeding) return null;

    return {
      parentIds: [evolutionData.chain.sid],
      parentNames: ['Evolution Line'],
      method: 'Breed evolved form',
    };
  }, [speciesData, evolutionData, saveData]);

  const getLocationsForVersion = React.useCallback(
    (version: string) => {
      const versionId = (REVERSE_VERSION_MAP as any)[version] || 0;
      const versionEncounters = encounters.filter((e) => e.v === versionId);

      return versionEncounters.flatMap((enc) => {
        return enc.d.map((detail) => ({
          name: enc.slug.replace(/-/g, ' ').replace(/\b\w/g, (l) => l.toUpperCase()),
          details: `${detail.c}% chance, Lv ${detail.min}-${detail.max} (${REVERSE_METHOD_MAP[detail.m] || 'Walk'})`,
        }));
      });
    },
    [encounters],
  );

  const _redLocations = getLocationsForVersion('red');
  const _blueLocations = getLocationsForVersion('blue');
  const _yellowLocations = getLocationsForVersion('yellow');
  const _goldLocations = getLocationsForVersion('gold');
  const _silverLocations = getLocationsForVersion('silver');
  const _crystalLocations = getLocationsForVersion('crystal');

  const _renderLocations = (locations: { name: string; details: string }[], colorClass: string) => {
    if (locations.length === 0) {
      return (
        <div className="flex items-center gap-2 py-4 font-black text-[10px] text-zinc-600 uppercase tracking-widest">
          <AlertCircle size={14} /> Not found in the wild
        </div>
      );
    }
    return (
      <div className="custom-scrollbar max-h-64 space-y-3 overflow-y-auto pr-2">
        {locations.map((loc) => (
          <div
            key={loc.name}
            className="group rounded-2xl border border-zinc-900 bg-zinc-950 p-4 transition-all hover:border-zinc-800"
          >
            <div className="mb-2 flex items-center gap-3">
              <div className={`rounded-lg bg-zinc-900 p-1.5 ${colorClass}`}>
                <MapPin size={14} />
              </div>
              <span className="font-black text-xs text-zinc-100 uppercase tracking-tight">{loc.name}</span>
            </div>
            <div className="pl-8 font-bold font-mono text-[10px] text-zinc-500 leading-relaxed">{loc.details}</div>
          </div>
        ))}
      </div>
    );
  };

  const genConfig = saveData ? getGenerationConfig(saveData.generation) : getGenerationConfig(1);

  const displayVersion = gameVersion === 'unknown' ? genConfig.defaultVersion : gameVersion;

  const isSafariNative = React.useMemo(() => {
    const locations = getLocationsForVersion(displayVersion) || [];
    return locations.some((loc) => loc.name.toLowerCase().includes('safari zone'));
  }, [displayVersion, getLocationsForVersion]);

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
    <div className="fade-in fixed inset-0 z-50 flex animate-in items-end justify-center p-0 duration-300 sm:items-center sm:p-4">
      <div aria-hidden="true" className="absolute inset-0 bg-black/90 backdrop-blur-xl" onClick={onClose} />
      <div
        role="dialog"
        aria-modal="true"
        className="slide-in-from-bottom-[100%] sm:zoom-in-95 relative flex h-[95vh] w-full animate-in flex-col overflow-hidden rounded-t-[2.5rem] border-white/10 border-t bg-zinc-950/90 shadow-2xl duration-500 ease-out sm:h-[85vh] sm:max-w-5xl sm:rounded-[3rem] sm:border"
      >
        {/* Scanline Overlay */}
        <div className="scanline-overlay pointer-events-none absolute inset-0 opacity-20" />

        {/* Header Section */}
        <div className="relative shrink-0 border-white/5 border-b bg-gradient-to-b from-white/5 to-transparent p-6 sm:p-10">
          <div className="flex flex-col items-center justify-between gap-6 sm:flex-row sm:items-end">
            <div className="flex flex-col items-center gap-6 sm:flex-row sm:items-center sm:gap-10">
              <div className="group relative">
                <div className="glass-card zoom-in-50 fade-in relative flex h-32 w-32 animate-in items-center justify-center overflow-hidden rounded-3xl border-white/10 bg-zinc-900/50 fill-mode-both shadow-2xl delay-100 duration-500 sm:h-40 sm:w-40">
                  <div className="absolute inset-0 bg-gradient-to-tr from-[var(--theme-primary)]/10 to-transparent" />
                  <img
                    src={genConfig.spriteUrl(pokemonId, isShiny)}
                    alt={pokemonName}
                    className="pixelated relative z-10 h-24 w-24 object-contain drop-shadow-[0_0_15px_rgba(255,255,255,0.2)] sm:h-32 sm:w-32"
                    style={{ imageRendering: 'pixelated' }}
                    referrerPolicy="no-referrer"
                  />
                  {/* Digital corner accents */}
                  <div className="absolute top-2 left-2 h-3 w-3 border-white/20 border-t-2 border-l-2" />
                  <div className="absolute top-2 right-2 h-3 w-3 border-white/20 border-t-2 border-r-2" />
                  <div className="absolute bottom-2 left-2 h-3 w-3 border-white/20 border-b-2 border-l-2" />
                  <div className="absolute right-2 bottom-2 h-3 w-3 border-white/20 border-r-2 border-b-2" />
                </div>

                {isShiny && (
                  <div className="absolute -top-3 -right-3 z-20 animate-[pulse_3s_ease-in-out_infinite] rounded-xl bg-amber-500 p-2 text-white shadow-[0_0_20px_rgba(245,158,11,0.5)]">
                    <Sparkles size={18} />
                  </div>
                )}
              </div>

              <div className="text-center sm:text-left">
                <div className="slide-in-from-bottom-4 fade-in flex animate-in flex-col fill-mode-both delay-200 duration-500">
                  <span className="mb-2 font-black font-mono text-xs text-zinc-500 uppercase tracking-[0.4em]">
                    Index No. {pokemonId.toString().padStart(3, '0')}
                  </span>
                  <h2 className="mb-4 font-black font-display text-4xl text-white uppercase leading-none tracking-tighter drop-shadow-sm sm:text-6xl">
                    {pokemonName}
                  </h2>
                  <div className="flex flex-wrap justify-center gap-2 sm:justify-start">
                    {stadiumReward && (
                      <div className="flex items-center gap-1.5 rounded-full border border-blue-500/20 bg-blue-500/10 px-4 py-1.5 font-black text-[10px] text-blue-400 uppercase tracking-widest backdrop-blur-md">
                        <Monitor size={12} /> Stadium Reward
                      </div>
                    )}

                    {saveData && (
                      <div
                        className={cn(
                          'flex items-center gap-2 rounded-full border px-4 py-1.5 font-black text-[10px] uppercase tracking-[0.2em] backdrop-blur-md',
                          yourPokemon.length > 0
                            ? 'border-emerald-500/30 bg-emerald-500/10 text-emerald-400'
                            : 'border-red-500/30 bg-red-500/10 text-red-500',
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
              type="button"
              onClick={onClose}
              aria-label="Close details"
              className="group absolute top-6 right-6 rounded-2xl border border-white/10 bg-white/5 p-4 transition-all hover:bg-white/10 active:scale-95 sm:relative sm:top-auto sm:right-auto"
            >
              <X size={24} className="text-zinc-400 transition-colors group-hover:text-white" />
            </button>
          </div>
        </div>

        <div className="custom-scrollbar flex-1 overflow-y-auto p-6 sm:p-10">
          <div className="grid grid-cols-1 gap-12 lg:grid-cols-12">
            {/* Left Column: Stats & Catching */}
            <div className="space-y-10 lg:col-span-5">
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
            <div className="space-y-12 lg:col-span-7">
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
