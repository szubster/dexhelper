import { useQuery } from '@tanstack/react-query';
import { AlertCircle, CheckCircle2, Monitor, Sparkles, X } from 'lucide-react';
import React, { useEffect } from 'react';
import { dexDataLoader } from '../db/DexDataLoader';
import { type CompactChainLink, POKE_VERSION_MAP, REVERSE_METHOD_MAP } from '../db/schema';
import type { SaveData } from '../engine/saveParser/index';
import type { GameVersion, PokeballType } from '../store';
import { cn } from '../utils/cn';
import { stadiumRewardsSummary } from '../utils/data';
import { getGenerationConfig } from '../utils/generationConfig';
import { CornerCrosshairs } from './CornerCrosshairs';
import { PokemonCatchProbability } from './pokemon/details/PokemonCatchProbability';
import { PokemonCaughtDetails } from './pokemon/details/PokemonCaughtDetails';
import { PokemonEvolutions } from './pokemon/details/PokemonEvolutions';
import { PokemonLocations } from './pokemon/details/PokemonLocations';
import { PokemonSprite } from './pokemon/PokemonSprite';

interface PokemonDetailsProps {
  pokemonId: number;
  pokemonName: string;
  gameVersion: GameVersion;
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
  const encountersRaw = allData?.enc;
  const encounters = React.useMemo(() => encountersRaw || [], [encountersRaw]);
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
      const versionId = POKE_VERSION_MAP[version] || 0;
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
      <div
        role="dialog"
        aria-modal="true"
        className="slide-in-from-bottom-[100%] sm:zoom-in-95 relative flex h-[95vh] w-full animate-in flex-col overflow-hidden rounded-none border-[var(--theme-primary)]/30 border-t-2 bg-zinc-950/95 shadow-[0_0_50px_rgba(var(--theme-primary-rgb),0.1)] duration-500 ease-out sm:h-[85vh] sm:max-w-5xl sm:border-2"
      >
        <div className="scanline-overlay pointer-events-none absolute inset-0 opacity-20" />

        {/* Header Section */}
        <div className="relative shrink-0 border-[var(--theme-primary)]/20 border-b bg-gradient-to-b from-[var(--theme-primary)]/5 to-transparent p-6 sm:p-10">
          <div className="flex flex-col items-center justify-between gap-6 sm:flex-row sm:items-end">
            <div className="flex flex-col items-center gap-6 sm:flex-row sm:items-center sm:gap-10">
              <div className="group relative">
                <div className="zoom-in-50 fade-in relative flex h-32 w-32 animate-in items-center justify-center overflow-hidden rounded-none border border-[var(--theme-primary)]/40 border-dashed bg-black/60 fill-mode-both shadow-[0_0_30px_rgba(0,0,0,0.8)] transition-colors delay-100 duration-500 group-hover:border-[var(--theme-primary)] group-hover:bg-black/80 sm:h-40 sm:w-40">
                  <div
                    className="pointer-events-none absolute inset-0 opacity-10"
                    style={{
                      backgroundImage: 'radial-gradient(circle, var(--theme-primary) 1px, transparent 1px)',
                      backgroundSize: '4px 4px',
                    }}
                  />
                  <div className="pointer-events-none absolute inset-0 bg-gradient-to-b from-transparent via-[var(--theme-primary)]/20 to-transparent opacity-0 transition-opacity group-hover:animate-[scan_2s_linear_infinite] group-hover:opacity-100" />
                  <PokemonSprite
                    pokemonId={pokemonId}
                    generation={saveData?.generation ?? 1}
                    isShiny={isShiny}
                    alt={pokemonName}
                    className="relative z-10 h-24 w-24 object-contain drop-shadow-[0_0_15px_rgba(var(--theme-primary-rgb),0.4)] transition-transform duration-500 group-hover:scale-110 sm:h-32 sm:w-32"
                  />
                  <CornerCrosshairs
                    thickness={2}
                    className="h-3 w-3 border-[var(--theme-primary)]/60 transition-colors group-hover:border-[var(--theme-primary)]"
                  />
                </div>

                {isShiny && (
                  <div className="absolute -top-3 -right-3 z-20 animate-[pulse_3s_ease-in-out_infinite] rounded-none border border-amber-500/50 bg-amber-500/20 p-2 text-amber-400 shadow-[0_0_20px_rgba(245,158,11,0.5)] backdrop-blur-sm">
                    <Sparkles size={18} />
                  </div>
                )}
              </div>

              <div className="text-center sm:text-left">
                <div className="slide-in-from-bottom-4 fade-in flex animate-in flex-col fill-mode-both delay-200 duration-500">
                  <span className="mb-2 font-black font-mono text-[10px] text-[var(--theme-primary)] uppercase tracking-[0.4em]">
                    [ SUBJECT_ID: {pokemonId.toString().padStart(3, '0')} ]
                  </span>
                  <h2 className="mb-4 font-black font-display text-4xl text-white uppercase leading-none tracking-widest drop-shadow-[0_0_10px_rgba(255,255,255,0.2)] sm:text-6xl">
                    {pokemonName}
                  </h2>
                  <div className="flex flex-wrap justify-center gap-2 sm:justify-start">
                    {stadiumReward && (
                      <div className="flex items-center gap-1.5 rounded-none border border-blue-500/50 border-dashed bg-blue-500/10 px-3 py-1 font-mono text-[10px] text-blue-400 uppercase tracking-widest backdrop-blur-md">
                        <Monitor size={12} /> Stadium Reward
                      </div>
                    )}

                    {saveData && (
                      <div
                        className={cn(
                          'flex items-center gap-2 rounded-none border border-dashed px-3 py-1 font-mono text-[10px] uppercase tracking-[0.2em] backdrop-blur-md',
                          yourPokemon.length > 0
                            ? 'border-emerald-500/50 bg-emerald-500/10 text-emerald-400'
                            : 'border-red-500/50 bg-red-500/10 text-red-500',
                        )}
                      >
                        {yourPokemon.length > 0 ? (
                          <>
                            <CheckCircle2 size={12} className="animate-pulse" />
                            Status: Secured
                          </>
                        ) : (
                          <>
                            <AlertCircle size={12} />
                            Status: Unsecured
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
              title="Close details"
              className="group absolute top-6 right-6 rounded-none border border-white/20 bg-black/40 p-3 transition-all hover:border-[var(--theme-primary)] hover:bg-[var(--theme-primary)]/20 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--theme-primary)] focus-visible:ring-offset-2 focus-visible:ring-offset-zinc-950 active:scale-95 sm:relative sm:top-auto sm:right-auto"
            >
              <X size={20} className="text-zinc-400 transition-colors group-hover:text-[var(--theme-primary)]" />
            </button>
          </div>
        </div>

        <div className="custom-scrollbar flex-1 overflow-y-auto p-6 sm:p-10">
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
