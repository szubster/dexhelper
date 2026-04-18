import { useQuery } from '@tanstack/react-query';
import { AlertCircle, CheckCircle2, Monitor, Sparkles, X } from 'lucide-react';
import React, { useEffect } from 'react';
import { dexDataLoader } from '../db/DexDataLoader';
import { type CompactChainLink, POKE_VERSION_MAP, REVERSE_METHOD_MAP } from '../db/schema';
import type { SaveData } from '../engine/saveParser/index';
import type { PokeballType } from '../store';
import { cn } from '../utils/cn';
import { stadiumRewardsSummary } from '../utils/data';
import { getGenerationConfig } from '../utils/generationConfig';
import { PokemonCatchProbability } from './pokemon/details/PokemonCatchProbability';
import { PokemonCaughtDetails } from './pokemon/details/PokemonCaughtDetails';
import { PokemonEvolutions } from './pokemon/details/PokemonEvolutions';
import { PokemonLocations } from './pokemon/details/PokemonLocations';

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

  const pokemon = allData?.pokemon;
  const encounters = allData?.enc || [];
  const nameMap = allData?.nameMap;
  const areaNames = allData?.areaNames;

  const catchRate = pokemon?.cr ?? null;

  const evoReq = React.useMemo(() => {
    if (!pokemon || pokemon.efrm.length === 0) return null;

    const fromId = pokemon.efrm[0];
    if (fromId === undefined) return null;
    if (saveData && fromId > getGenerationConfig(saveData.generation).maxDex) return null;

    let methodStr = 'Unknown';

    const details = pokemon.det;
    if (details && details.length > 0) {
      const d = details[0];
      if (!d) return null;
      if (d.tr === 1) methodStr = d.ml ? `Level ${d.ml}` : 'Level up';
      else if (d.tr === 3) methodStr = 'Use Item';
      else if (d.tr === 2) methodStr = 'Trade';
    }

    return {
      fromId,
      fromName: nameMap?.[fromId] || 'Earlier Form',
      method: methodStr,
    };
  }, [pokemon, nameMap, saveData]);

  const evolvesTo = React.useMemo(() => {
    if (!pokemon) return [];

    const evos = pokemon.eto;
    if (!evos || evos.length === 0) return [];

    return evos
      .map((evo: CompactChainLink) => {
        const id = evo.id;
        if (saveData && id > getGenerationConfig(saveData.generation).maxDex) return null;

        let methodStr = 'Unknown';
        const d = evo.det[0];
        if (d) {
          if (d.tr === 1) methodStr = d.ml ? `Level ${d.ml}` : 'Level up';
          else if (d.tr === 3) methodStr = 'Use Item';
          else if (d.tr === 2) methodStr = 'Trade';
        }
        return {
          id,
          name: nameMap?.[id] || 'Next Form',
          method: methodStr,
        };
      })
      .filter((evo): evo is { id: number; name: string; method: string } => evo !== null);
  }, [pokemon, nameMap, saveData]);

  const breedingInfo = React.useMemo(() => {
    if (!pokemon?.baby) return null;
    if (saveData && !getGenerationConfig(saveData.generation).hasBreeding) return null;

    const rootId = pokemon.efrm.length > 0 ? pokemon.efrm[pokemon.efrm.length - 1] : pokemon.id;

    if (rootId === undefined) return null;

    return {
      parentIds: [rootId],
      parentNames: [nameMap?.[rootId] || 'Evolution Line'],
      method: 'Breed evolved form',
    };
  }, [pokemon, saveData, nameMap]);

  const getLocationsForVersion = React.useCallback(
    (version: string) => {
      const versionId = (POKE_VERSION_MAP as Record<string, number>)[version] || 0;
      const versionEncounters = encounters.filter((e) => e.v === versionId);

      return versionEncounters.flatMap((enc) => {
        return enc.d.map((detail) => {
          const name = areaNames?.[enc.aid] || `Area #${enc.aid}`;

          return {
            name,
            details: `${detail.c}% chance, Lv ${detail.min}-${detail.max} (${REVERSE_METHOD_MAP[detail.m] || 'Walk'})`,
          };
        });
      });
    },
    [encounters, areaNames],
  );

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

      {/* Dynamic Ambient Glow Backdrop */}
      <img
        src={genConfig.spriteUrl(pokemonId, isShiny)}
        alt=""
        className="pointer-events-none fixed inset-0 -z-10 h-full w-full object-cover opacity-20 blur-[100px] saturate-200"
        aria-hidden="true"
      />

      <div
        role="dialog"
        aria-modal="true"
        className="slide-in-from-bottom-[100%] sm:zoom-in-95 relative flex h-[95vh] w-full animate-in flex-col overflow-hidden rounded-t-[2.5rem] border-white/10 border-t bg-zinc-950/80 shadow-2xl backdrop-blur-md duration-500 ease-out sm:h-[85vh] sm:max-w-5xl sm:rounded-[3rem] sm:border"
      >
        <div className="scanline-overlay pointer-events-none absolute inset-0 opacity-20" />

        {/* Holographic Projection Hero Section */}
        <div className="relative flex min-h-[40vh] shrink-0 flex-col items-center justify-center border-white/5 border-b bg-gradient-to-b from-white/5 to-transparent p-6 pb-8 sm:min-h-[45vh] sm:p-12 sm:pb-12">
          <button
            type="button"
            onClick={onClose}
            aria-label="Close details"
            className="group absolute top-6 right-6 z-50 rounded-2xl border border-white/10 bg-white/5 p-4 transition-all hover:bg-white/10 active:scale-95"
          >
            <X size={24} className="text-zinc-400 transition-colors group-hover:text-white" />
          </button>

          <div className="relative mt-8 flex w-full max-w-lg flex-col items-center justify-center sm:mt-4">
            {/* Holographic Projector Base & Sprite */}
            <div className="relative mb-10 flex h-48 w-full items-center justify-center sm:h-56">
              {/* Glow Pillar */}
              <div className="pointer-events-none absolute bottom-0 h-[150%] w-32 bg-gradient-to-t from-[var(--theme-primary)]/30 to-transparent blur-xl sm:w-48" />

              {/* Projector Base */}
              <div className="absolute bottom-0 flex h-8 w-40 -translate-y-1/2 transform items-center justify-center rounded-[100%] border border-[var(--theme-primary)]/40 bg-zinc-900 shadow-[0_0_30px_rgba(var(--theme-primary-rgb),0.5)] sm:w-56">
                <div className="h-4 w-32 animate-pulse rounded-[100%] bg-[var(--theme-primary)]/30 blur-sm sm:w-48" />
                <div className="absolute inset-0 rounded-[100%] border-[var(--theme-primary)]/60 border-t" />
              </div>

              {/* The Hologram Sprite */}
              <div className="relative z-10 animate-[float_4s_ease-in-out_infinite]">
                <img
                  src={genConfig.spriteUrl(pokemonId, isShiny)}
                  alt={pokemonName}
                  className="pixelated relative z-10 h-32 w-32 object-contain drop-shadow-[0_10px_25px_rgba(0,0,0,0.5)] sm:h-48 sm:w-48"
                  style={{ imageRendering: 'pixelated' }}
                  referrerPolicy="no-referrer"
                />
                {/* Holographic Scanlines overlay on sprite */}
                <div className="pointer-events-none absolute inset-0 bg-[length:100%_4px] bg-[linear-gradient(transparent_50%,rgba(var(--theme-primary-rgb),0.1)_50%)] mix-blend-overlay" />

                {isShiny && (
                  <div className="absolute -top-4 -right-4 z-20 animate-[pulse_3s_ease-in-out_infinite] rounded-full border border-amber-500/30 bg-amber-500/20 p-2 text-amber-300 shadow-[0_0_30px_rgba(245,158,11,0.6)] backdrop-blur-sm">
                    <Sparkles size={24} />
                  </div>
                )}
              </div>
            </div>

            {/* Typography */}
            <div className="slide-in-from-bottom-4 fade-in flex w-full animate-in flex-col items-center fill-mode-both text-center delay-200 duration-500">
              <span className="mb-3 rounded-full border border-[var(--theme-primary)]/20 bg-[var(--theme-primary)]/10 px-4 py-1 font-black font-mono text-[var(--theme-primary)] text-sm uppercase tracking-[0.5em] shadow-[0_0_15px_rgba(var(--theme-primary-rgb),0.2)]">
                Index No. {pokemonId.toString().padStart(3, '0')}
              </span>
              <h2 className="mb-6 font-black font-display text-5xl text-white uppercase leading-none tracking-tighter drop-shadow-[0_0_15px_rgba(255,255,255,0.3)] sm:text-7xl">
                {pokemonName}
              </h2>

              <div className="flex flex-wrap justify-center gap-3">
                {stadiumReward && (
                  <div className="flex items-center gap-2 rounded-full border border-blue-500/30 bg-blue-500/20 px-5 py-2 font-black text-blue-300 text-xs uppercase tracking-widest shadow-[0_0_15px_rgba(59,130,246,0.3)] backdrop-blur-md">
                    <Monitor size={14} /> Stadium Reward
                  </div>
                )}

                {saveData && (
                  <div
                    className={cn(
                      'flex items-center gap-2 rounded-full border px-5 py-2 font-black text-xs uppercase tracking-[0.2em] shadow-lg backdrop-blur-md',
                      yourPokemon.length > 0
                        ? 'border-emerald-500/40 bg-emerald-500/20 text-emerald-300 shadow-emerald-500/20'
                        : 'border-red-500/40 bg-red-500/20 text-red-400 shadow-red-500/20',
                    )}
                  >
                    {yourPokemon.length > 0 ? (
                      <>
                        <CheckCircle2 size={14} className="animate-pulse" />
                        Collection Secured
                      </>
                    ) : (
                      <>
                        <AlertCircle size={14} />
                        Missing from Collection
                      </>
                    )}
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>

        <div className="custom-scrollbar flex-1 overflow-y-auto bg-zinc-950/40 p-6 sm:p-10">
          <div className="grid grid-cols-1 gap-12 lg:grid-cols-12">
            {/* Left Column: Catching */}
            <div className="space-y-10 lg:col-span-5">
              {catchRate !== null && (
                <PokemonCatchProbability catchRate={catchRate} effectivePokeball={effectivePokeball} />
              )}
            </div>

            {/* Right Column: Details & Locations */}
            <div className="space-y-12 lg:col-span-7">
              <PokemonCaughtDetails yourPokemon={yourPokemon} />

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
                areaNames={areaNames}
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
