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
import { PokemonCatchProbability } from './pokemon/details/PokemonCatchProbability';
import { PokemonCaughtDetails } from './pokemon/details/PokemonCaughtDetails';
import { PokemonEvolutions } from './pokemon/details/PokemonEvolutions';
import { PokemonLocations } from './pokemon/details/PokemonLocations';
import { PokemonSprite } from './pokemon/PokemonSprite';
import { UnownDexPanel } from './pokemon/unown/UnownDexPanel';
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
      containerClassName="p-0"
      backdropClassName="bg-black/95 backdrop-blur-3xl"
      dialogClassName="slide-in-from-bottom-[100%] flex h-[100dvh] w-[100dvw] flex-col overflow-hidden rounded-none border-none bg-zinc-950 shadow-none ease-out"
    >
      <ScanlineOverlay opacityClass="opacity-10 pointer-events-none" />

      {/* Sleek Top Tactical Bar */}
      <div className="relative flex shrink-0 items-center justify-between border-[var(--theme-primary)]/40 border-b bg-gradient-to-r from-zinc-950 via-zinc-900 to-zinc-950 p-4 shadow-md sm:px-6">
        {/* Hardware hazard stripe lip */}
        <div
          className="absolute top-0 right-0 left-0 h-[2px] opacity-40"
          style={{
            backgroundImage:
              'repeating-linear-gradient(45deg, var(--theme-primary) 25%, transparent 25%, transparent 50%, var(--theme-primary) 50%, var(--theme-primary) 75%, transparent 75%, transparent)',
            backgroundSize: '8px 8px',
          }}
        />

        <div className="flex items-center gap-4 sm:gap-6">
          <div className="flex items-center gap-2">
            <span className="animate-pulse font-black font-mono text-[10px] text-[var(--theme-primary)] uppercase tracking-[0.4em]">
              [ ID:{pokemonId.toString().padStart(3, '0')} ]
            </span>
            <div className="hidden h-4 w-px bg-zinc-700 sm:block" />
          </div>

          <h2 className="font-black font-display text-2xl text-white uppercase leading-none tracking-widest sm:text-3xl">
            {pokemonName}
          </h2>

          <div className="hidden flex-wrap items-center gap-2 sm:flex">
            {stadiumReward && (
              <div className="tactical-text flex items-center gap-1.5 rounded-none border border-blue-500/50 border-dashed bg-blue-500/10 px-2 py-1 text-[9px] text-blue-400">
                <Monitor size={10} /> STADIUM
              </div>
            )}

            {saveData && (
              <div
                className={cn(
                  'flex items-center gap-1.5 rounded-none border border-dashed px-2 py-1 font-mono text-[9px] uppercase tracking-[0.2em]',
                  yourPokemon.length > 0
                    ? 'border-emerald-500/50 bg-emerald-500/10 text-emerald-400'
                    : 'border-red-500/50 bg-red-500/10 text-red-500',
                )}
              >
                {yourPokemon.length > 0 ? (
                  <>
                    <CheckCircle2 size={10} className="animate-pulse" />
                    SECURED
                  </>
                ) : (
                  <>
                    <AlertCircle size={10} />
                    UNSECURED
                  </>
                )}
              </div>
            )}
          </div>
        </div>

        <TacticalIconButton
          onClick={onClose}
          aria-label="Close terminal"
          title="Close terminal"
          className="group flex items-center gap-2 rounded-none border border-red-500/30 bg-red-500/10 px-3 py-1.5 hover:border-red-500 hover:bg-red-500/20 active:scale-95"
        >
          <span className="hidden font-black font-mono text-[10px] text-red-400 uppercase tracking-widest transition-colors group-hover:text-red-300 sm:inline-block">
            CLOSE SYS
          </span>
          <X size={16} className="text-red-400 transition-colors group-hover:text-red-300" />
        </TacticalIconButton>
      </div>

      {/* Main 3-Column Asset Matrix */}
      <div className="custom-scrollbar relative flex-1 overflow-y-auto bg-[radial-gradient(ellipse_at_center,rgba(0,0,0,0)_0%,rgba(0,0,0,0.6)_100%)] p-4 sm:p-6 lg:p-8">
        <div className="flex flex-col gap-6 xl:flex-row xl:gap-8">
          {/* Column 1: Target Lock Visuals (Fixed width on wide screens) */}
          <div className="flex flex-col gap-6 xl:w-[350px] xl:shrink-0">
            {/* Massive Sprite Container */}
            <div className="group relative">
              <div className="zoom-in-50 fade-in relative flex aspect-square w-full animate-in items-center justify-center overflow-hidden rounded-none border border-[var(--theme-primary)]/40 border-dashed bg-black/40 fill-mode-both shadow-[inset_0_0_40px_rgba(0,0,0,0.8)] transition-colors duration-500 hover:bg-black/60">
                <LcdGrid className="opacity-10" color="var(--theme-primary)" />
                <HoverScanner />
                <PokemonSprite
                  pokemonId={pokemonId}
                  generation={saveData?.generation ?? 1}
                  isShiny={isShiny}
                  alt={pokemonName}
                  className="relative z-10 h-[60%] w-[60%] object-contain drop-shadow-[0_0_20px_rgba(var(--theme-primary-rgb),0.5)] transition-transform duration-700 group-hover:scale-[1.15]"
                />
                <CornerCrosshairs
                  thickness={2}
                  className="h-6 w-6 border-[var(--theme-primary)]/60 transition-colors group-hover:border-[var(--theme-primary)]"
                />

                {/* HUD Overlay Elements */}
                <div className="absolute top-2 left-2 flex flex-col gap-1">
                  <span className="font-mono text-[8px] text-[var(--theme-primary)]/70 uppercase">FOV: 120</span>
                  <span className="font-mono text-[8px] text-[var(--theme-primary)]/70 uppercase">MAG: x2.4</span>
                </div>
                <div className="absolute right-2 bottom-2 font-mono text-[8px] text-[var(--theme-primary)]/70 uppercase">
                  REC {'//'} 00:00:00
                </div>
              </div>
              <ShinyBadge isShiny={isShiny} isShinyCarrier={isShinyCarrier} size="md" />
            </div>

            {catchRate !== null && (
              <PokemonCatchProbability catchRate={catchRate} effectivePokeball={effectivePokeball} />
            )}
          </div>

          {/* Column 2: Biometrics & Geolocation (Flexible width) */}
          <div className="flex flex-1 flex-col gap-6 xl:gap-8">
            <PokemonCaughtDetails yourPokemon={yourPokemon} />
            {pokemonId === 201 && saveData?.generation === 2 && <UnownDexPanel yourPokemon={yourPokemon} />}

            <PokemonLocations
              pokemonId={pokemonId}
              gameVersion={gameVersion}
              encounters={encounters}
              areaNames={areaNames}
              evoReq={evoReq}
              loading={loading}
            />
          </div>

          {/* Column 3: Evolutionary Trajectory (Fixed width on wide screens) */}
          <div className="flex flex-col gap-6 xl:w-[400px] xl:shrink-0">
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
          </div>
        </div>
      </div>
    </TacticalModal>
  );
}
