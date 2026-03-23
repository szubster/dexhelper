import React, { useState, useEffect } from 'react';
import { useQuery, useQueries } from '@tanstack/react-query';
import { X, MapPin, AlertCircle, Info, ArrowUpCircle, CheckCircle2, XCircle, Target, AlertTriangle, Sparkles, Package, Heart, Activity, Zap, ChevronRight, CircleDot, Monitor, Ghost, Eye, Check } from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';
import { staticEncounters, stadiumRewardsData, stadiumRewardsSummary } from '../utils/data';
import { gen2Items, gen2Locations } from '../utils/legacyNameMap';
import { SaveData } from '../utils/saveParser';
import { pokeapi } from '../utils/pokeapi';
import { PokeballType } from '../state';
import { getGenerationConfig } from '../utils/generationConfig';
import { clsx, type ClassValue } from 'clsx';
import { twMerge } from 'tailwind-merge';

function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

function calculateHiddenPower(dvs: { atk: number, def: number, spd: number, spc: number }) {
  const typeMap = [
    'Fighting', 'Flying', 'Poison', 'Ground', 'Rock', 'Bug', 'Ghost', 'Steel',
    'Fire', 'Water', 'Grass', 'Electric', 'Psychic', 'Ice', 'Dragon', 'Dark'
  ];
  
  const typeIndex = 4 * (dvs.atk % 4) + (dvs.def % 4);
  const hpType = typeMap[typeIndex];
  
  const v = dvs.spc >= 8 ? 1 : 0;
  const w = dvs.spd >= 8 ? 1 : 0;
  const x = dvs.def >= 8 ? 1 : 0;
  const y = dvs.atk >= 8 ? 1 : 0;
  const z = dvs.spc % 4;
  
  const hpPower = Math.floor((5 * (v + 2*w + 4*x + 8*y) + z) / 2) + 31;
  
  return { type: hpType, power: hpPower };
}

// Static data moved to data.ts

interface EncounterDetail {
  chance: number;
  max_level: number;
  min_level: number;
  method: { name: string };
}

interface Encounter {
  location_area: { name: string };
  version_details: {
    version: { name: string };
    encounter_details: EncounterDetail[];
  }[];
}

interface EvoRequirement {
  fromId: number;
  fromName: string;
  method: string;
}

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

const modalVariants = {
  hidden: { opacity: 0, scale: 0.95, y: 40 },
  visible: { 
    opacity: 1, 
    scale: 1, 
    y: 0,
    transition: {
      type: "spring",
      damping: 25,
      stiffness: 300,
      staggerChildren: 0.05,
      delayChildren: 0.1
    }
  },
  exit: { 
    opacity: 0, 
    scale: 0.95, 
    y: 40,
    transition: { duration: 0.2 }
  }
} as const;

const contentVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: { 
    opacity: 1, 
    y: 0,
    transition: { type: "spring", damping: 20, stiffness: 100 }
  }
} as const;

export function PokemonDetails({ pokemonId, pokemonName, gameVersion, saveData, isLivingDex, pokeball: defaultPokeball, onClose, onNavigate }: PokemonDetailsProps) {
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
      }
    ]
  });

  // Calculator state
  const [hpPercent, setHpPercent] = useState<number>(100);
  const [status, setStatus] = useState<'none' | 'sleep_freeze' | 'paralyze_burn_poison'>('none');

  const encountersReady = queries[0].isSuccess;
  const pokemonReady = queries[1].isSuccess;
  const speciesReady = queries[2].isSuccess;

  const encounters = queries[0].data || [];
  const pokemonData = queries[1].data;
  const speciesData = queries[2].data;

  const catchRate = speciesData?.capture_rate ?? null;
  const genderRate = speciesData?.gender_rate ?? -1;

  const { data: evolutionData } = useQuery({
    queryKey: ['evolution', speciesData?.evolution_chain?.url],
    queryFn: () => pokeapi.resource(speciesData!.evolution_chain.url),
    enabled: !!speciesData?.evolution_chain?.url,
  });

  const evoReq = React.useMemo(() => {
    if (!speciesData?.evolves_from_species || !evolutionData) return null;
    
    const fromName = speciesData.evolves_from_species.name;
    const fromId = parseInt(speciesData.evolves_from_species.url.split('/').filter(Boolean).pop() || '0');
    
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
      method: methodStr
    };
  }, [speciesData, evolutionData, pokemonName, saveData]);

  const evolvesTo = React.useMemo(() => {
    if (!speciesData || !evolutionData) return null;
    
    const findEvolutions = (chain: any): any[] => {
      if (chain.species.name === pokemonName.toLowerCase()) {
        return chain.evolves_to.map((evo: any) => {
          const id = parseInt(evo.species.url.split('/').filter(Boolean).pop() || '0');
          // For saves from gens that don't have this evolution, ignore it
          if (saveData && id > getGenerationConfig(saveData.generation).maxDex) return null;
          
          let methodStr = 'Unknown';
          const details = evo.evolution_details[0];
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
            id,
            name: evo.species.name.charAt(0).toUpperCase() + evo.species.name.slice(1),
            method: methodStr
          };
        }).filter(Boolean);
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
    
    const parents: { id: number, name: string }[] = [];

    const traverse = (node: any) => {
      if (node.species.name !== speciesData.name) {
        const id = parseInt(node.species.url.split('/').filter(Boolean).pop() || '0');
        parents.push({ id, name: node.species.name.charAt(0).toUpperCase() + node.species.name.slice(1) });
      }
      node.evolves_to?.forEach(traverse);
    };
    traverse(evolutionData.chain);
    
    return {
      parentIds: parents.map(p => p.id),
      parentNames: parents.map(p => p.name),
      method: 'Breed evolved form with Ditto or same egg group'
    };
  }, [speciesData, evolutionData]);

  const loading = queries.some(q => q.isLoading) || (!!speciesData?.evolution_chain?.url && !evolutionData);

  const getLocationsForVersion = (version: string) => {
    const locations: { name: string, details: string }[] = [];
    
    const staticData = staticEncounters[pokemonId];
    if (staticData && staticData[version as keyof typeof staticData]) {
      staticData[version as keyof typeof staticData]!.forEach(loc => {
        locations.push({ name: loc, details: 'Static Encounter / Gift / Trade' });
      });
    }

    encounters.forEach(enc => {
      const versionDetail = enc.version_details.find(vd => vd.version.name === version);
      if (versionDetail) {
        let name = enc.location_area.name
          .replace(/-/g, ' ')
          .replace(/\b\w/g, l => l.toUpperCase())
          .replace(' Area', '')
          .replace('Kanto ', '')
          .replace('Johto ', '');

        const methodMap = new Map<string, { chance: number, min: number, max: number, conditions: string[] }>();
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
            methodMap.set(key, { chance: detail.chance, min: detail.min_level, max: detail.max_level, conditions });
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

  const redLocations = getLocationsForVersion('red');
  const blueLocations = getLocationsForVersion('blue');
  const yellowLocations = getLocationsForVersion('yellow');
  const goldLocations = getLocationsForVersion('gold');
  const silverLocations = getLocationsForVersion('silver');
  const crystalLocations = getLocationsForVersion('crystal');

  const renderLocations = (locations: {name: string, details: string}[], colorClass: string) => {
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
          <div key={i} className="group bg-zinc-950 p-4 rounded-2xl border border-zinc-900 hover:border-zinc-800 transition-all">
            <div className="flex items-center gap-3 mb-2">
              <div className={`p-1.5 rounded-lg bg-zinc-900 ${colorClass}`}>
                <MapPin size={14} />
              </div>
              <span className="text-xs font-black uppercase tracking-tight text-zinc-100">{loc.name}</span>
            </div>
            <div className="text-[10px] text-zinc-500 pl-8 leading-relaxed font-mono font-bold">
              {loc.details}
            </div>
          </div>
        ))}
      </div>
    );
  };

  const genConfig = saveData ? getGenerationConfig(saveData.generation) : getGenerationConfig(1);

  const displayVersion = gameVersion === 'unknown' ? genConfig.defaultVersion : gameVersion;

  const currentGenVersions = genConfig.versions.map(v => v.id);

  const allVersionLocations = currentGenVersions.reduce((acc, v) => {
    acc[v] = getLocationsForVersion(v);
    return acc;
  }, {} as Record<string, {name: string, details: string}[]>);

  const isSafariNative = React.useMemo(() => {
    const locations = allVersionLocations[displayVersion] || [];
    return locations.some(loc => loc.name.toLowerCase().includes('safari zone'));
  }, [allVersionLocations, displayVersion]);

  const effectivePokeball = isSafariNative ? 'safari' : defaultPokeball;

  
  let hasPreEvo = false;
  if (evoReq && saveData) {
    const preEvoInStorage = saveData.party.includes(evoReq.fromId) || saveData.pc.includes(evoReq.fromId);
    const preEvoOwned = saveData.owned.has(evoReq.fromId);
    hasPreEvo = isLivingDex ? preEvoInStorage : preEvoOwned;
  }

  const stadiumReward = stadiumRewardsSummary[pokemonId];

  const getGender = (atkDV: number, rate: number) => {
    if (rate === -1) return 'Genderless';
    if (rate === 0) return 'Male';
    if (rate === 8) return 'Female';
    return atkDV < (rate * 2) ? 'Female' : 'Male';
  };

  const getUnownForm = (dvs: { atk: number, def: number, spd: number, spc: number }) => {
    const formValue = ((dvs.atk & 0x06) << 5) | ((dvs.def & 0x06) << 3) | ((dvs.spd & 0x06) << 1) | ((dvs.spc & 0x06) >> 1);
    const letterIndex = Math.floor(formValue / 10);
    return String.fromCharCode(65 + letterIndex);
  };

  const yourPokemon = saveData ? [
    ...saveData.partyDetails.filter(p => p.speciesId === pokemonId).map(p => ({ ...p, location: 'Party' })),
    ...saveData.pcDetails.filter(p => p.speciesId === pokemonId).map(p => ({ ...p, location: 'PC' }))
  ] : [];

  const isShiny = yourPokemon.some(p => p.isShiny);

  return (
    <motion.div 
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="fixed inset-0 z-50 flex items-end sm:items-center justify-center bg-black/90 backdrop-blur-xl p-0 sm:p-4"
      onClick={onClose}
    >
      <motion.div 
        variants={modalVariants}
        initial="hidden"
        animate="visible"
        exit="exit"
        onClick={(e) => e.stopPropagation()}
        className="bg-zinc-950/90 w-full h-[95vh] sm:h-[85vh] sm:max-w-5xl rounded-t-[2.5rem] sm:rounded-[3rem] border-t sm:border border-white/10 shadow-2xl overflow-hidden flex flex-col relative"
      >
        {/* Scanline Overlay */}
        <div className="absolute inset-0 pointer-events-none scanline-overlay opacity-20" />
        
        {/* Header Section */}
        <div className="relative p-6 sm:p-10 border-b border-white/5 bg-gradient-to-b from-white/5 to-transparent shrink-0">
          <div className="flex flex-col sm:flex-row items-center sm:items-end justify-between gap-6">
            <div className="flex flex-col sm:flex-row items-center sm:items-center gap-6 sm:gap-10">
              <div className="relative group">
                <motion.div 
                  variants={contentVariants} 
                  className="w-32 h-32 sm:w-40 sm:h-40 glass-card bg-zinc-900/50 rounded-3xl border-white/10 flex items-center justify-center overflow-hidden relative shadow-2xl"
                >
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
                </motion.div>
                
                {isShiny && (
                  <motion.div 
                    animate={{ 
                      opacity: [0.6, 1, 0.6],
                      scale: [0.9, 1.1, 0.9],
                    }}
                    transition={{ repeat: Infinity, duration: 3, ease: "easeInOut" }}
                    className="absolute -top-3 -right-3 p-2 bg-amber-500 rounded-xl shadow-[0_0_20px_rgba(245,158,11,0.5)] text-white z-20"
                  >
                    <Sparkles size={18} />
                  </motion.div>
                )}
              </div>

              <div className="text-center sm:text-left">
                <motion.div variants={contentVariants} className="flex flex-col">
                  <span className="text-xs font-black text-zinc-500 uppercase tracking-[0.4em] mb-2 font-mono">Index No. {pokemonId.toString().padStart(3, '0')}</span>
                  <h2 className="text-4xl sm:text-6xl font-display font-black uppercase tracking-tighter text-white leading-none mb-4 drop-shadow-sm">
                    {pokemonName}
                  </h2>
                  <div className="flex flex-wrap justify-center sm:justify-start gap-2">
                    {pokemonData?.types.map((t: any) => (
                      <span key={t.type.name} className="px-4 py-1.5 bg-white/5 border border-white/10 rounded-full text-[10px] font-black uppercase tracking-widest text-zinc-300 backdrop-blur-md">
                        {t.type.name}
                      </span>
                    ))}
                    {stadiumReward && (
                      <div className="px-4 py-1.5 bg-blue-500/10 border border-blue-500/20 rounded-full text-[10px] font-black text-blue-400 uppercase tracking-widest flex items-center gap-1.5 backdrop-blur-md">
                        <Monitor size={12} /> Stadium Reward
                      </div>
                    )}
                    
                    {saveData && (
                      <div className={cn(
                        "px-4 py-1.5 rounded-full text-[10px] font-black uppercase tracking-[0.2em] flex items-center gap-2 backdrop-blur-md border",
                        yourPokemon.length > 0
                          ? "bg-emerald-500/10 border-emerald-500/30 text-emerald-400"
                          : "bg-red-500/10 border-red-500/30 text-red-500"
                      )}>
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
                </motion.div>
              </div>
            </div>

            <button 
              onClick={onClose}
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
                {pokemonData && (
                  <motion.div variants={contentVariants} className="space-y-5">
                    <h3 className="text-[10px] font-black text-zinc-500 uppercase tracking-[0.3em] flex items-center gap-2">
                       <Activity size={14} className="text-[var(--theme-primary)]" /> Combat Analysis
                    </h3>
                    <div className="grid grid-cols-1 gap-3">
                      {pokemonData.stats.map((s: any) => {
                        const statName = s.stat.name === 'special-attack' ? 'SPC' : 
                                        s.stat.name === 'special-defense' ? 'SPD' : 
                                        s.stat.name === 'hp' ? 'HP' :
                                        s.stat.name === 'attack' ? 'ATK' :
                                        s.stat.name === 'defense' ? 'DEF' :
                                        s.stat.name === 'speed' ? 'SPE' : s.stat.name;
                        
                        if (saveData && getGenerationConfig(saveData.generation).hasUnifiedSpecial && s.stat.name === 'special-defense') return null;
                        
                        const maxVal = 255;
                        const percentage = (s.base_stat / maxVal) * 100;

                        return (
                          <div key={s.stat.name} className="flex items-center gap-4">
                            <div className="w-8 text-[10px] font-black text-zinc-400 uppercase font-mono">{statName}</div>
                            <div className="flex-1 h-2 bg-zinc-900 rounded-full overflow-hidden border border-white/5 relative">
                              <motion.div 
                                initial={{ width: 0 }}
                                animate={{ width: `${percentage}%` }}
                                transition={{ duration: 1, ease: "easeOut" }}
                                className="h-full bg-gradient-to-r from-[var(--theme-primary)]/50 to-[var(--theme-primary)] relative"
                              >
                                <div className="absolute inset-0 lcd-flicker opacity-30" />
                              </motion.div>
                            </div>
                            <div className="w-10 text-right text-xs font-mono font-black text-white">{s.base_stat}</div>
                          </div>
                        );
                      })}
                    </div>
                  </motion.div>
                )}
              </div>

              {/* Catch Rate Calc */}
              {catchRate !== null && (
                <div className="glass-card bg-emerald-500/5 border-emerald-500/10 rounded-[2.5rem] p-8 space-y-8 relative overflow-hidden">
                  <div className="absolute top-0 right-0 p-4 opacity-5">
                    <Target size={120} />
                  </div>
                  <motion.div variants={contentVariants} className="flex items-center justify-between">
                    <h3 className="text-[10px] font-black text-emerald-400 uppercase tracking-[0.3em] flex items-center gap-2">
                      <Target size={14} /> Catch Probability
                    </h3>
                    <div className="px-3 py-1 bg-emerald-500/20 rounded-full text-[10px] font-mono font-black text-emerald-400 border border-emerald-500/30">
                      RATING: {catchRate}
                    </div>
                  </motion.div>

                  <div className="space-y-6">
                    <div className="space-y-3">
                      <div className="flex justify-between text-[10px] font-black uppercase tracking-widest text-emerald-500/60">
                        <span>Target Integrity</span>
                        <span className="text-emerald-400 font-mono">{hpPercent}% HP</span>
                      </div>
                      <input 
                        type="range" 
                        min="1" 
                        max="100" 
                        value={hpPercent}
                        onChange={(e) => setHpPercent(Number(e.target.value))}
                        className="w-full accent-emerald-500 h-2 bg-black/40 rounded-full appearance-none cursor-pointer border border-white/5"
                      />
                    </div>

                    <div className="grid grid-cols-3 gap-2">
                      {[
                        { id: 'none', label: 'Healthy' },
                        { id: 'paralyze_burn_poison', label: 'Debuff' },
                        { id: 'sleep_freeze', label: 'Incapacitated' }
                      ].map((item) => (
                        <button 
                          key={item.id}
                          onClick={() => setStatus(item.id as any)}
                          className={cn(
                            "py-3 text-[9px] font-black uppercase tracking-widest rounded-2xl border transition-all active:scale-95",
                            status === item.id 
                              ? 'bg-emerald-500 border-emerald-400 text-white shadow-[0_5px_15px_rgba(16,185,129,0.3)]' 
                              : 'bg-black/20 border-white/5 text-emerald-500/50 hover:border-emerald-500/20'
                          )}
                        >
                          {item.label}
                        </button>
                      ))}
                    </div>
                  </div>

                  <div className="pt-8 border-t border-emerald-500/10 flex flex-col gap-2">
                    <div className="flex items-end justify-between">
                      <div className="flex flex-col">
                        <span className="text-[10px] font-black text-emerald-500/40 uppercase tracking-widest mb-1">Estimated Success</span>
                        <span className="text-5xl font-display font-black text-emerald-400 tracking-tighter">
                          {(() => {
                            let ballMult = 1;
                            if (effectivePokeball === 'great') ballMult = 1.5;
                            if (effectivePokeball === 'ultra' || effectivePokeball === 'safari') ballMult = 2;
                            let statusBonus = 0;
                            if (status === 'sleep_freeze') statusBonus = 10;
                            if (status === 'paralyze_burn_poison') statusBonus = 5;
                            const hpFactor = 1 + ((100 - hpPercent) / 100) * 2;
                            const baseChance = (catchRate * ballMult * hpFactor) / 255;
                            return Math.min(100, (baseChance * 100) + statusBonus).toFixed(1);
                          })()}%
                        </span>
                      </div>
                      <div className="flex flex-col items-end text-right">
                        <div className="w-10 h-10 rounded-full bg-black/40 border border-white/10 flex items-center justify-center mb-2">
                           <div className={cn(
                             "w-6 h-6 rounded-full border-2",
                             effectivePokeball === 'safari' ? 'bg-emerald-500/20 border-emerald-500 shadow-[0_0_10px_rgba(16,185,129,0.5)]' :
                             effectivePokeball === 'ultra' ? 'bg-yellow-500/20 border-yellow-500 shadow-[0_0_10px_rgba(234,179,8,0.5)]' :
                             effectivePokeball === 'great' ? 'bg-blue-500/20 border-blue-500 shadow-[0_0_10px_rgba(59,130,246,0.5)]' :
                             'bg-red-500/20 border-red-500 shadow-[0_0_10px_rgba(239,68,68,0.5)]'
                           )} />
                        </div>
                        <span className="text-[10px] font-black text-zinc-500 uppercase tracking-widest">
                          {effectivePokeball.toUpperCase()} BALL
                        </span>
                      </div>
                    </div>
                  </div>
                </div>
              )}
            </div>

            {/* Right Column: Details & Locations */}
            <div className="lg:col-span-7 space-y-12">
              {/* Your Pokemon */}
              {yourPokemon.length > 0 && (
                <div className="space-y-6">
                  <motion.h3 variants={contentVariants} className="text-[10px] font-black text-zinc-500 uppercase tracking-[0.3em] flex items-center gap-2">
                    <CheckCircle2 size={14} className="text-emerald-500" /> Discovered Units
                  </motion.h3>
                  <motion.div variants={contentVariants} className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    {yourPokemon.map((p, i) => (
                      <div key={i} className="glass-card bg-white/5 p-6 rounded-[2rem] border border-white/10 space-y-5 relative overflow-hidden group">
                        <div className="absolute top-0 right-0 p-3 opacity-10 group-hover:scale-110 transition-transform">
                           {p.isShiny ? <Sparkles size={40} className="text-amber-400" /> : <CircleDot size={40} className="text-white/20" />}
                        </div>

                        <div className="flex justify-between items-start relative z-10">
                          <div>
                            <div className="text-2xl font-display font-black text-white tracking-tighter">LV.{p.level}</div>
                            <div className="flex gap-2 items-center mt-1">
                              <div className="px-2 py-0.5 bg-[var(--theme-primary)]/20 rounded-md border border-[var(--theme-primary)]/30">
                                <span className="text-[9px] font-black text-[var(--theme-primary)] uppercase tracking-widest leading-none">{p.location}</span>
                              </div>
                              {p.slot && (
                                <div className="px-2 py-0.5 bg-white/5 rounded-md border border-white/10">
                                  <span className="text-[9px] font-black text-zinc-500 uppercase tracking-widest leading-none">Slot {p.slot}</span>
                                </div>
                              )}
                            </div>
                          </div>
                        </div>
                        
                        <div className="grid grid-cols-2 gap-x-4 gap-y-2 relative z-10">
                          {p.otName && (
                            <div className="flex flex-col">
                              <span className="text-[8px] font-black text-zinc-500 uppercase tracking-widest">Original Trainer</span>
                              <span className="text-[10px] font-bold text-zinc-200 uppercase truncate">{p.otName}</span>
                            </div>
                          )}
                          {p.item !== undefined && p.item > 0 && (
                            <div className="flex flex-col">
                              <span className="text-[8px] font-black text-zinc-500 uppercase tracking-widest">Held Item</span>
                              <span className="text-[10px] font-bold text-zinc-200 uppercase truncate">{gen2Items[p.item]}</span>
                            </div>
                          )}
                          {p.friendship !== undefined && (
                            <div className="flex flex-col">
                              <span className="text-[8px] font-black text-zinc-500 uppercase tracking-widest">Friendship</span>
                              <span className="text-[10px] font-bold text-rose-400">{p.friendship} pt</span>
                            </div>
                          )}
                          {saveData && getGenerationConfig(saveData.generation).hasHiddenPower && p.dvs && (
                            <div className="flex flex-col">
                              <span className="text-[8px] font-black text-zinc-500 uppercase tracking-widest">Hidden Power</span>
                              <span className="text-[10px] font-bold text-blue-400 uppercase">{calculateHiddenPower(p.dvs).type}</span>
                            </div>
                          )}
                        </div>

                        {p.caughtData && (
                          <div className="pt-4 border-t border-white/5 space-y-1 relative z-10">
                            <span className="text-[8px] font-black text-zinc-500 uppercase tracking-widest flex items-center gap-1">
                              <MapPin size={8} /> Origin Point
                            </span>
                            <div className="text-[10px] font-black text-zinc-300 uppercase tracking-tight truncate">{gen2Locations[p.caughtData.location] || 'UNKNOWN ZONE'}</div>
                          </div>
                        )}
                      </div>
                    ))}
                  </motion.div>
                </div>
              )}

              {/* Evolution & Procurement Strategy */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                {yourPokemon.length === 0 && (
                   <div className="glass-card bg-red-500/5 border-red-500/10 rounded-[2rem] p-6 space-y-4 relative overflow-hidden group col-span-1 sm:col-span-2">
                     <div className="absolute top-0 right-0 p-4 opacity-5 group-hover:scale-110 transition-transform">
                        <AlertTriangle size={80} />
                     </div>
                     <h3 className="text-[10px] font-black text-red-400 uppercase tracking-[0.3em] flex items-center gap-2 relative z-10">
                       <AlertTriangle size={14} /> Procurement Strategy
                     </h3>
                     <div className="text-sm font-bold text-zinc-300 leading-relaxed relative z-10 pr-12">
                       Species missing from Living Dex. Priority retrieval recommended via 
                       {evoReq ? (
                         <> <button onClick={() => onNavigate(evoReq.fromId, evoReq.fromName)} className="text-red-400 hover:text-white underline decoration-red-500/30 underline-offset-4 transition-colors">Evolving {evoReq.fromName.toUpperCase()}</button>.</>
                       ) : (
                         <> field capture or specialized interaction.</>
                       )}
                       {(() => {
                        const rewardObj = (stadiumRewardsData as Record<number, any>)[pokemonId];
                        if (!rewardObj) return null;
                        const gen = saveData?.generation || (['gold', 'silver', 'crystal'].includes(gameVersion) ? 2 : 1);
                        const rewards = (gen === 2 ? rewardObj.stadium2 : rewardObj.stadium1) as string[] | undefined;
                        if (!rewards || rewards.length === 0) return null;
                        return (
                          <div className="mt-2 flex flex-wrap gap-2">
                            {rewards.map((r, i) => (
                              <span key={i} className="px-2 py-0.5 bg-red-500/10 border border-red-500/20 text-[9px] font-black text-red-500 rounded-md">
                                STADIUM {gen} REWARD: {r.toUpperCase()}
                              </span>
                            ))}
                          </div>
                        );
                      })()}
                    </div>
                   </div>
                )}

                {evoReq && (
                  <div className="glass-card bg-purple-500/5 border-purple-500/10 rounded-[2rem] p-6 space-y-4 relative overflow-hidden group">
                    <div className="absolute top-0 right-0 p-4 opacity-5 group-hover:rotate-12 transition-transform">
                      <ArrowUpCircle size={80} />
                    </div>
                    <h3 className="text-[10px] font-black text-purple-400 uppercase tracking-[0.3em] flex items-center gap-2 relative z-10">
                      <ArrowUpCircle size={14} /> Evolution
                    </h3>
                    <div className="text-xs font-bold text-zinc-300 leading-relaxed relative z-10">
                      FROM <button onClick={() => onNavigate(evoReq.fromId, evoReq.fromName)} className="text-white hover:text-purple-400 underline decoration-purple-500/30 underline-offset-4 transition-colors">{evoReq.fromName.toUpperCase()}</button>
                      <div className="text-[10px] text-purple-400/60 mt-1 uppercase font-black">METHOD: {evoReq.method}</div>
                    </div>
                    <div className={cn(
                      "inline-flex items-center gap-2 px-3 py-1.5 rounded-xl text-[10px] font-black uppercase tracking-widest relative z-10",
                      hasPreEvo ? 'bg-emerald-500/10 text-emerald-500' : 'bg-red-500/10 text-red-500'
                    )}>
                      {hasPreEvo ? <Check size={12} /> : <X size={12} />} {hasPreEvo ? 'OWNED' : 'UNAVAILABLE'}
                    </div>
                  </div>
                )}

                {evolvesTo && evolvesTo.length > 0 && (
                  <div className="glass-card bg-blue-500/5 border-blue-500/10 rounded-[2rem] p-6 space-y-4 relative overflow-hidden group">
                    <div className="absolute top-0 right-0 p-4 opacity-5 group-hover:-rotate-12 transition-transform">
                      <ChevronRight size={80} />
                    </div>
                    <h3 className="text-[10px] font-black text-blue-400 uppercase tracking-[0.3em] flex items-center gap-2 relative z-10">
                      <ChevronRight size={14} /> Transformations
                    </h3>
                    <div className="space-y-4 relative z-10">
                      {evolvesTo.map(evo => (
                        <div key={evo.id} className="text-xs font-bold text-zinc-300 leading-relaxed">
                          TO <button onClick={() => onNavigate(evo.id, evo.name)} className="text-white hover:text-blue-400 underline decoration-blue-500/30 underline-offset-4 transition-colors">{evo.name.toUpperCase()}</button>
                          <div className="text-[10px] text-blue-400/60 mt-1 uppercase font-black">VIA {evo.method}</div>
                        </div>
                      ))}
                    </div>
                  </div>
                )}

                {breedingInfo && (
                  <div className="glass-card bg-pink-500/5 border-pink-500/10 rounded-[2rem] p-6 space-y-4 relative overflow-hidden group col-span-1 sm:col-span-2">
                    <div className="absolute top-0 right-0 p-4 opacity-5 group-hover:scale-110 transition-transform">
                      <Heart size={80} />
                    </div>
                    <h3 className="text-[10px] font-black text-pink-400 uppercase tracking-[0.3em] flex items-center gap-2 relative z-10">
                      <Heart size={14} /> Breeding Protocol
                    </h3>
                    <div className="text-xs font-bold text-zinc-300 leading-relaxed relative z-10">
                      CROSS-REF: {breedingInfo.parentNames.map((name, i) => (
                        <React.Fragment key={name}>
                          <button 
                            onClick={() => onNavigate(breedingInfo.parentIds[i], name)}
                            className="text-white hover:text-pink-400 underline decoration-pink-500/30 underline-offset-4 transition-colors"
                          >
                            {name.toUpperCase()}
                          </button>
                          {i < breedingInfo.parentNames.length - 1 ? ', ' : ''}
                        </React.Fragment>
                      ))}
                    </div>
                    <div className="text-[9px] font-black text-pink-400/60 uppercase tracking-widest bg-pink-500/5 p-3 rounded-xl border border-pink-500/10 leading-relaxed relative z-10 italic">
                      {breedingInfo.method}
                    </div>
                  </div>
                )}
              </div>

              {/* Locations */}
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
                    const versionEnc = encounters.filter(e => e.version_details.some(v => v.version.name === gameVersion));
                    
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
                          {versionEnc.map((e, i) => (
                            <div key={i} className="flex flex-col p-4 bg-zinc-900 border border-white/5 rounded-2xl group hover:border-[var(--theme-primary)]/30 transition-all space-y-3">
                              <div className="flex items-center justify-between">
                                <div className="flex items-center gap-3">
                                  <div className="p-2 bg-[var(--theme-primary)]/10 rounded-lg text-[var(--theme-primary)]"><MapPin size={14} /></div>
                                  <span className="text-xs font-bold uppercase tracking-wide group-hover:text-white transition-colors">
                                    {e.location_area.name.replace(/-/g, ' ').toUpperCase()}
                                  </span>
                                </div>
                                <div className="flex items-center gap-2">
                                  {e.version_details.find(v => v.version.name === gameVersion)?.encounter_details.map((d, di) => (
                                    <span key={di} className="text-[8px] font-black text-zinc-500 uppercase tracking-widest px-2 py-0.5 bg-white/5 rounded-md border border-white/5">
                                      LV.{d.min_level}-{d.max_level}
                                    </span>
                                  ))}
                                </div>
                              </div>
                              <div className="flex flex-wrap gap-1.5 pl-1.5 border-l-2 border-[var(--theme-primary)]/20">
                                {e.version_details.find(v => v.version.name === gameVersion)?.encounter_details.map((d, di) => (
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
                        {encounters.map((e, i) => (
                          <div key={i} className="flex flex-col p-4 bg-zinc-900/40 border border-white/5 rounded-2xl opacity-60">
                            <div className="flex items-center justify-between">
                              <span className="text-xs font-bold uppercase text-zinc-500">
                                {e.location_area.name.replace(/-/g, ' ').toUpperCase()}
                              </span>
                              <div className="flex gap-1">
                                {e.version_details.map(v => (
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
            </div>
          </div>
        </div>
      </motion.div>
    </motion.div>
  );
}
