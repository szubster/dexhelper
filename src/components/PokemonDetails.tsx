import { useQuery } from '@tanstack/react-query';
import { AlertCircle, CheckCircle2, Monitor, X } from 'lucide-react';
import React, { useEffect } from 'react';
import { dexDataLoader } from '../db/DexDataLoader';
import { POKE_VERSION_MAP } from '../db/schema';
import { stadiumRewardsSummary } from '../engine/data/shared/staticData';
import type { SaveData } from '../engine/saveParser/index';
import type { PokeballType } from '../store';
import { cn } from '../utils/cn';
import { getGenerationConfig } from '../utils/generationConfig';
import { CornerCrosshairs } from './CornerCrosshairs';
import { HoverScanner } from './HoverScanner';
import { LcdGrid } from './LcdGrid';
import { PokemonSprite } from './pokemon/PokemonSprite';
import { UnownDexPanel } from './pokemon/unown/UnownDexPanel';

// ⚡ Bolt: Lazy load heavy sub-components to reduce initial PokemonDetails chunk size
const PokemonLocations = React.lazy(() =>
  import('./pokemon/details/PokemonLocations').then((m) => ({ default: m.PokemonLocations })),
);
const PokemonEvolutions = React.lazy(() =>
  import('./pokemon/details/PokemonEvolutions').then((m) => ({ default: m.PokemonEvolutions })),
);
const PokemonCatchProbability = React.lazy(() =>
  import('./pokemon/details/PokemonCatchProbability').then((m) => ({ default: m.PokemonCatchProbability })),
);
// ⚡ Bolt: Lazy load PokemonCaughtDetails to reduce initial bundle size by splitting it into its own chunk
const PokemonCaughtDetails = React.lazy(() =>
  import('./pokemon/details/PokemonCaughtDetails').then((m) => ({ default: m.PokemonCaughtDetails })),
);

import { ScanlineOverlay } from './ScanlineOverlay';
import { ShinyBadge } from './ShinyBadge';
import { TacticalIconButton } from './TacticalIconButton';
import { TacticalModal } from './TacticalModal';

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

    // ⚡ Bolt: Fused .map() and .filter() into a single pass to prevent intermediate object allocations
    const result: { id: number; name: string; method: string }[] = [];
    const maxDex = saveData ? getGenerationConfig(saveData.generation).maxDex : Number.POSITIVE_INFINITY;

    for (let i = 0; i < evos.length; i++) {
      const evo = evos[i];
      if (!evo) continue;

      const id = evo.id;
      if (id > maxDex) continue;

      let methodStr = 'Unknown';
      const d = evo.det[0];
      if (d) {
        if (d.tr === 1) methodStr = d.ml ? `Level ${d.ml}` : 'Level up';
        else if (d.tr === 3) methodStr = 'Use Item';
        else if (d.tr === 2) methodStr = 'Trade';
      }

      result.push({
        id,
        name: nameMap?.[id] || 'Next Form',
        method: methodStr,
      });
    }
    return result;
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

  // ⚡ Bolt: Pre-group encounters by versionId into a Map to avoid O(N) array filtering on every getLocationsForVersion invocation
  const encountersByVersion = React.useMemo(() => {
    const map = new Map<number, typeof encounters>();
    for (const enc of encounters) {
      const arr = map.get(enc.v) || [];
      arr.push(enc);
      map.set(enc.v, arr);
    }
    return map;
  }, [encounters]);

  const genConfig = saveData ? getGenerationConfig(saveData.generation) : getGenerationConfig(1);
  const displayVersion = gameVersion === 'unknown' ? genConfig.defaultVersion : gameVersion;

  const isSafariNative = React.useMemo(() => {
    // ⚡ Bolt: Eliminate O(N) array and string allocations by directly iterating over version encounters to check for Safari Zone
    const versionId = POKE_VERSION_MAP[displayVersion] || 0;
    const versionEncounters = encountersByVersion.get(versionId) || [];
    for (let i = 0; i < versionEncounters.length; i++) {
      const enc = versionEncounters[i];
      if (enc) {
        const name = areaNames?.[enc.aid] || `Area #${enc.aid}`;
        if (name.toLowerCase().includes('safari zone')) {
          return true;
        }
      }
    }
    return false;
  }, [displayVersion, encountersByVersion, areaNames]);

  const effectivePokeball = isSafariNative ? 'safari' : defaultPokeball;

  let hasPreEvo = false;
  if (evoReq && saveData) {
    const preEvoInStorage = saveData.party.includes(evoReq.fromId) || saveData.pc.includes(evoReq.fromId);
    const preEvoOwned = saveData.owned.has(evoReq.fromId);
    hasPreEvo = isLivingDex ? preEvoInStorage : preEvoOwned;
  }

  const stadiumReward = stadiumRewardsSummary[pokemonId];

  // ⚡ Bolt: Use a single pass and memoize to avoid O(N) intermediate array allocations and prevent re-evaluating on every render
  const yourPokemon = React.useMemo(() => {
    if (!saveData) return [];
    const result = [];
    for (const p of saveData.partyDetails) {
      if (p.speciesId === pokemonId) {
        result.push({ ...p, location: 'Party' as const });
      }
    }
    for (const p of saveData.pcDetails) {
      if (p.speciesId === pokemonId) {
        result.push({ ...p, location: 'PC' as const });
      }
    }
    return result;
  }, [saveData, pokemonId]);

  const isShiny = yourPokemon.some((p) => p.isShiny);
  const isShinyCarrier = !isShiny && yourPokemon.some((p) => p.isShinyCarrier);

  return (
    <TacticalModal
      isOpen={true}
      onClose={onClose}
      ariaLabel={`Details for ${pokemonName}`}
      containerClassName="items-end p-0 sm:items-center sm:p-4"
      backdropClassName="bg-black/90 backdrop-blur-xl"
      dialogClassName="slide-in-from-bottom-[100%] flex h-[95vh] flex-col overflow-hidden rounded-none border-[var(--theme-primary)]/30 border-t-2 bg-zinc-950/95 shadow-[0_0_50px_rgba(var(--theme-primary-rgb),0.1)] ease-out sm:h-[85vh] sm:max-w-6xl sm:border-2"
    >
      <ScanlineOverlay />

      {/* Top Header / Target Lock Section - Hardware Diagnostic Console */}
      <div className="relative flex shrink-0 flex-col items-center border-[var(--theme-primary)]/30 border-b-2 bg-zinc-950 p-4 sm:flex-row sm:items-stretch sm:justify-start sm:p-6 lg:p-8">
        {/* Deep Hardware Background */}
        <div className="absolute inset-0 z-0 bg-[var(--theme-primary)]/5">
          <LcdGrid className="opacity-[0.03]" />
          <ScanlineOverlay opacityClass="opacity-10" />
        </div>

        {/* Heavy Mechanical Brackets */}
        <div className="pointer-events-none absolute inset-0 z-10 border-[4px] border-[var(--theme-primary)]/10 border-dashed" />

        {/* Hardware hazard stripe lip */}
        <div
          className="absolute top-0 right-0 left-0 z-20 h-2 opacity-30"
          style={{
            backgroundImage:
              'repeating-linear-gradient(45deg, var(--theme-primary) 25%, transparent 25%, transparent 50%, var(--theme-primary) 50%, var(--theme-primary) 75%, transparent 75%, transparent)',
            backgroundSize: '16px 16px',
          }}
        />

        <div className="relative z-30 flex w-full flex-col items-center gap-6 sm:flex-row sm:gap-8">
          <div className="group relative shrink-0">
            {/* Enlarged Sprite Container with Matrix Targeting */}
            <div className="zoom-in-50 fade-in group/target relative flex h-40 w-40 animate-in items-center justify-center overflow-hidden rounded-none border-2 border-[var(--theme-primary)]/40 bg-black/80 fill-mode-both shadow-[0_0_40px_rgba(0,0,0,0.9)] transition-all delay-100 duration-500 hover:border-[var(--theme-primary)] hover:bg-black/90 sm:h-48 sm:w-48">
              <LcdGrid className="opacity-15" color="var(--theme-primary)" />
              <HoverScanner />

              {/* Matrix Targeting Rings */}
              <div className="absolute inset-4 rounded-full border border-[var(--theme-primary)]/10 transition-all duration-700 group-hover/target:animate-[spin_4s_linear_infinite] group-hover/target:border-[var(--theme-primary)]/40 group-hover/target:shadow-[0_0_15px_rgba(var(--theme-primary-rgb),0.3)]" />
              <div className="absolute inset-8 rounded-full border border-[var(--theme-primary)]/10 border-dashed transition-all duration-500 group-hover/target:animate-[spin_3s_linear_infinite_reverse] group-hover/target:border-[var(--theme-primary)]/30 group-hover/target:shadow-[0_0_10px_rgba(var(--theme-primary-rgb),0.2)]" />

              {/* Glitch Overlay on Hover */}
              <div className="pointer-events-none absolute inset-0 z-0 bg-[repeating-linear-gradient(0deg,transparent,transparent_2px,rgba(var(--theme-primary-rgb),0.05)_2px,rgba(var(--theme-primary-rgb),0.05)_4px)] opacity-0 transition-opacity duration-300 group-hover/target:opacity-100" />

              <PokemonSprite
                pokemonId={pokemonId}
                generation={saveData?.generation ?? 1}
                isShiny={isShiny}
                alt={pokemonName}
                className="relative z-10 h-[65%] w-[65%] object-contain drop-shadow-[0_0_20px_rgba(var(--theme-primary-rgb),0.5)] transition-transform duration-500 group-hover/target:scale-110 group-hover/target:drop-shadow-[0_0_30px_rgba(var(--theme-primary-rgb),0.8)]"
              />
              <CornerCrosshairs
                thickness={2}
                className="h-4 w-4 border-[var(--theme-primary)]/50 transition-colors group-hover/target:border-[var(--theme-primary)]"
              />
            </div>

            <div className="absolute -bottom-4 left-1/2 -translate-x-1/2">
              <ShinyBadge isShiny={isShiny} isShinyCarrier={isShinyCarrier} size="md" />
            </div>
          </div>

          <div className="flex w-full flex-col justify-center text-center sm:text-left">
            <div className="slide-in-from-bottom-4 fade-in flex animate-in flex-col fill-mode-both delay-200 duration-500">
              <div className="mb-1 flex items-center justify-between pr-24">
                <div className="flex items-center gap-2">
                  <span className="font-black font-mono text-[11px] text-[var(--theme-primary)]/70 uppercase tracking-[0.5em]">
                    [ SUBJECT_ID: {pokemonId.toString().padStart(3, '0')} ]
                  </span>
                  <div className="hidden h-[2px] w-12 bg-gradient-to-r from-[var(--theme-primary)]/50 to-transparent sm:block" />
                </div>

                {/* Simulated LED Status Indicator */}
                <div className="hidden items-center gap-2 sm:flex">
                  <div
                    className={cn(
                      'h-2 w-2 rounded-none shadow-[0_0_8px]',
                      yourPokemon.length > 0 ? 'bg-emerald-500 shadow-emerald-500/80' : 'bg-red-500 shadow-red-500/80',
                    )}
                  />
                  <span className="font-mono text-[8px] text-zinc-500">SYS.LINK</span>
                </div>
              </div>

              <h2 className="mb-2 break-words break-all font-black font-display text-5xl text-white uppercase leading-none tracking-widest drop-shadow-[0_0_15px_rgba(255,255,255,0.3)] sm:break-normal sm:text-6xl lg:text-7xl">
                {pokemonName}
              </h2>

              {/* Raw Telemetry Data Trace */}
              <div className="mb-6 hidden font-mono text-[9px] text-[var(--theme-primary)]/40 tracking-widest sm:block">
                {'> '}TRACE: 0x{(pokemonId * 255).toString(16).toUpperCase().padStart(4, '0')} | FLG:{' '}
                {yourPokemon.length > 0 ? '1' : '0'} | GEN: {saveData?.generation ?? 'N/A'}
              </div>

              <div className="flex flex-wrap justify-center gap-3 sm:justify-start">
                {stadiumReward && (
                  <div className="flex items-center gap-2 border-[2px] border-blue-500/50 border-dashed bg-blue-950/40 px-4 py-2 font-black font-mono text-[10px] text-blue-400 uppercase tracking-widest shadow-[inset_0_0_10px_rgba(59,130,246,0.2)]">
                    <Monitor size={14} className="text-blue-500" /> STADIUM_REWARD
                  </div>
                )}

                {saveData && (
                  <div
                    className={cn(
                      'flex items-center gap-2 border-[2px] border-dashed px-4 py-2 font-black font-mono text-[10px] uppercase tracking-[0.2em] shadow-[inset_0_0_10px_rgba(0,0,0,0.5)] transition-colors',
                      yourPokemon.length > 0
                        ? 'border-emerald-500/60 bg-emerald-950/40 text-emerald-400'
                        : 'border-red-500/60 bg-red-950/40 text-red-500',
                    )}
                  >
                    {yourPokemon.length > 0 ? (
                      <>
                        <CheckCircle2 size={14} className="animate-[pulse_2s_ease-in-out_infinite] text-emerald-500" />
                        SECURED
                      </>
                    ) : (
                      <>
                        <AlertCircle size={14} className="text-red-500" />
                        UNSECURED
                      </>
                    )}
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>

      <TacticalIconButton
        onClick={onClose}
        aria-label="Close details"
        title="Close details"
        className="group absolute top-4 right-4 z-50 rounded-none border border-white/20 bg-black/40 p-2 hover:border-[var(--theme-primary)] hover:bg-[var(--theme-primary)]/20 active:scale-95 sm:top-6 sm:right-6 sm:p-3"
      >
        <X size={20} className="text-zinc-400 transition-colors group-hover:text-[var(--theme-primary)]" />
      </TacticalIconButton>

      {/* Main Data Matrix Grid */}
      <div className="custom-scrollbar relative flex-1 overflow-y-auto bg-zinc-950/40 p-4 sm:p-6 lg:p-8">
        <div className="grid grid-cols-1 gap-6 xl:grid-cols-2 xl:gap-8">
          {/* Left Column Data Feed */}
          <div className="flex flex-col gap-6 xl:gap-8">
            {catchRate !== null && (
              <React.Suspense fallback={<div className="tactical-skeleton h-24" />}>
                <PokemonCatchProbability catchRate={catchRate} effectivePokeball={effectivePokeball} />
              </React.Suspense>
            )}

            <React.Suspense fallback={<div className="tactical-skeleton h-48" />}>
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
            </React.Suspense>
          </div>

          {/* Right Column Data Feed */}
          <div className="flex flex-col gap-6 xl:gap-8">
            <React.Suspense fallback={<div className="tactical-skeleton h-48" />}>
              <PokemonCaughtDetails yourPokemon={yourPokemon} />
            </React.Suspense>
            {pokemonId === 201 && saveData?.generation === 2 && <UnownDexPanel yourPokemon={yourPokemon} />}

            <React.Suspense fallback={<div className="tactical-skeleton h-48" />}>
              <PokemonLocations
                pokemonId={pokemonId}
                gameVersion={gameVersion}
                encounters={encounters}
                areaNames={areaNames}
                evoReq={evoReq}
                loading={loading}
              />
            </React.Suspense>
          </div>
        </div>
      </div>
    </TacticalModal>
  );
}
