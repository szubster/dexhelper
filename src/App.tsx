import React, { useState, useEffect } from 'react';
import { useQuery } from '@tanstack/react-query';
import { motion, AnimatePresence } from 'motion/react';
import { 
  Upload, Monitor, CircleDot, Eye, Check, Ghost, Filter, 
  Settings2, Archive, AlertTriangle, Sparkles, 
  LayoutGrid, Database, X, ChevronRight,
  Info, Trash2, RefreshCw
} from 'lucide-react';
import { parseSaveFile, SaveData, GameVersion } from './utils/saveParser';
import { PokemonDetails } from './components/PokemonDetails';
import { pokeapi } from './utils/pokeapi';

interface Pokemon {
  id: number;
  name: string;
}

type FilterType = 'caught' | 'uncaught' | 'lost';
export type PokeballType = 'poke' | 'great' | 'ultra' | 'safari' | 'heavy' | 'lure' | 'fast' | 'friend' | 'moon' | 'love' | 'level';

const missingPokemon: Record<string, number[]> = {
  red: [27, 28, 37, 38, 52, 53, 69, 70, 71, 126, 127],
  blue: [23, 24, 43, 44, 45, 56, 57, 58, 59, 123, 125],
  yellow: [13, 14, 15, 23, 24, 26, 52, 53, 109, 110, 124, 125, 126],
  gold: [13, 14, 15, 37, 38, 52, 53, 165, 166, 225, 227, 231, 232],
  silver: [10, 11, 12, 56, 57, 58, 59, 167, 168, 207, 216, 217, 226],
  crystal: [37, 38, 56, 57, 179, 180, 181, 203, 223, 224]
};

export default function App() {
  const [saveData, setSaveData] = useState<SaveData | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [filters, setFilters] = useState<Set<FilterType>>(() => {
    const saved = localStorage.getItem('filters');
    if (saved) {
      try {
        return new Set(JSON.parse(saved));
      } catch (e) {
        return new Set();
      }
    }
    return new Set();
  });
  const [selectedPokemon, setSelectedPokemon] = useState<Pokemon | null>(null);
  const [manualVersion, setManualVersion] = useState<GameVersion | null>(() => {
    const saved = localStorage.getItem('manualVersion');
    return saved ? (saved as GameVersion) : null;
  });
  const [isLivingDex, setIsLivingDex] = useState(() => {
    const saved = localStorage.getItem('isLivingDex');
    return saved ? JSON.parse(saved) : false;
  });
  const [globalPokeball, setGlobalPokeball] = useState<PokeballType>(() => {
    const saved = localStorage.getItem('globalPokeball');
    return saved ? (saved as PokeballType) : 'poke';
  });
  const [viewMode, setViewMode] = useState<'pokedex' | 'storage'>(() => {
    const saved = localStorage.getItem('viewMode');
    return saved ? (saved as 'pokedex' | 'storage') : 'pokedex';
  });
  const [isSettingsOpen, setIsSettingsOpen] = useState(false);

  useEffect(() => {
    localStorage.setItem('filters', JSON.stringify(Array.from(filters)));
  }, [filters]);

  useEffect(() => {
    if (manualVersion) {
      localStorage.setItem('manualVersion', manualVersion);
    } else {
      localStorage.removeItem('manualVersion');
    }
  }, [manualVersion]);

  useEffect(() => {
    localStorage.setItem('isLivingDex', JSON.stringify(isLivingDex));
  }, [isLivingDex]);

  useEffect(() => {
    localStorage.setItem('globalPokeball', globalPokeball);
  }, [globalPokeball]);

  useEffect(() => {
    localStorage.setItem('viewMode', viewMode);
  }, [viewMode]);

  useEffect(() => {
    // Load saved data from localStorage
    const savedFile = localStorage.getItem('last_save_file');
    if (savedFile) {
      try {
        const binaryString = window.atob(savedFile);
        const len = binaryString.length;
        const bytes = new Uint8Array(len);
        for (let i = 0; i < len; i++) {
          bytes[i] = binaryString.charCodeAt(i);
        }
        const data = parseSaveFile(bytes.buffer);
        setSaveData(data);
      } catch (err) {
        console.error("Failed to load saved file from localStorage:", err);
        localStorage.removeItem('last_save_file');
      }
    }
  }, []);

  const { data: pokemonList = [] } = useQuery({
    queryKey: ['pokemonList'],
    queryFn: async () => {
      const data = await pokeapi.getPokemonsList({ limit: 251, offset: 0 });
      return data.results.map((p: any, index: number) => ({
        id: index + 1,
        name: p.name.charAt(0).toUpperCase() + p.name.slice(1),
      }));
    }
  });

  const handleFileUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (!file) return;

    const reader = new FileReader();
    reader.onload = (e) => {
      try {
        const buffer = e.target?.result as ArrayBuffer;
        const data = parseSaveFile(buffer);
        setSaveData(data);
        setError(null);
        setSelectedPokemon(null);
        setManualVersion(null);

        // Save to localStorage
        let binary = '';
        const bytes = new Uint8Array(buffer);
        const len = bytes.byteLength;
        for (let i = 0; i < len; i++) {
          binary += String.fromCharCode(bytes[i]);
        }
        localStorage.setItem('last_save_file', window.btoa(binary));
      } catch (err: any) {
        setError(err.message || "Failed to parse save file.");
        setSaveData(null);
      }
    };
    reader.readAsArrayBuffer(file);
  };

  const toggleFilter = (f: FilterType) => {
    const newFilters = new Set(filters);
    if (newFilters.has(f)) {
      newFilters.delete(f);
    } else {
      newFilters.add(f);
    }
    setFilters(newFilters);
  };

  const displayLimit = saveData?.generation === 2 ? 251 : 151;
  const filteredPokemon = pokemonList.slice(0, displayLimit).filter(pokemon => {
    if (!saveData || filters.size === 0) return true;
    
    const inParty = saveData.party.includes(pokemon.id);
    const inPC = saveData.pc.includes(pokemon.id);
    const hasInStorage = inParty || inPC;
    
    // In Living Dex mode, "Owned" means it's currently in your PC or Party
    const isOwned = isLivingDex ? hasInStorage : saveData.owned.has(pokemon.id);
    
    // "Lost" means you had it in your pokedex, but it's not in your storage right now
    const hadButLost = saveData.owned.has(pokemon.id) && !hasInStorage;
    const isUncaught = !isOwned;

    if (filters.has('caught') && isOwned && !hadButLost) return true;
    if (filters.has('uncaught') && isUncaught) return true;
    if (filters.has('lost') && hadButLost) return true;
    
    return false;
  });

  const effectiveVersion = manualVersion || saveData?.gameVersion || 'unknown';

  return (
    <div className="min-h-screen bg-zinc-950 text-zinc-100 font-sans selection:bg-red-500/30 pb-24 sm:pb-0">
      <div className="max-w-[1600px] mx-auto">
        {/* Minimal Header */}
        <header className="p-6 sm:p-10 flex flex-col sm:flex-row items-center justify-between gap-6">
          <motion.div 
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-center sm:text-left"
          >
            <h1 className="text-3xl sm:text-5xl font-display font-black tracking-tight text-white">
              {saveData ? (saveData.generation === 2 ? 'GEN II' : 'GEN I') : 'RETRO'}
              <span className="text-red-600">DEX</span>
            </h1>
            {saveData && (
              <div className="flex items-center justify-center sm:justify-start gap-2 mt-2">
                <span className="px-2 py-0.5 bg-zinc-900 border border-zinc-800 rounded text-[10px] font-mono font-bold text-zinc-400 uppercase tracking-widest">
                  {saveData.trainerName}
                </span>
                <span className="px-2 py-0.5 bg-zinc-900 border border-zinc-800 rounded text-[10px] font-mono font-bold text-zinc-400 uppercase tracking-widest">
                  ID: {saveData.trainerId}
                </span>
                <span className="px-2 py-0.5 bg-red-900/20 border border-red-900/30 rounded text-[10px] font-mono font-bold text-red-400 uppercase tracking-widest">
                  {effectiveVersion}
                </span>
              </div>
            )}
          </motion.div>

          {!saveData ? (
            <motion.label 
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              className="w-full sm:w-auto inline-flex items-center justify-center gap-3 bg-red-600 hover:bg-red-500 text-white px-8 py-4 rounded-2xl cursor-pointer transition-all shadow-xl shadow-red-600/20 font-bold uppercase tracking-widest text-xs"
            >
              <Upload size={20} />
              Upload Save File
              <input type="file" accept=".sav" className="hidden" onChange={handleFileUpload} />
            </motion.label>
          ) : (
            <div className="flex gap-3 w-full sm:w-auto">
              <button 
                onClick={() => setIsSettingsOpen(true)}
                className="flex-1 sm:flex-none inline-flex items-center justify-center gap-2 bg-zinc-900 hover:bg-zinc-800 text-zinc-300 px-5 py-3 rounded-xl border border-zinc-800 transition-all font-bold uppercase tracking-widest text-[10px]"
              >
                <Settings2 size={16} />
                Settings
              </button>
              <label className="flex-1 sm:flex-none inline-flex items-center justify-center gap-2 bg-zinc-900 hover:bg-zinc-800 text-zinc-300 px-5 py-3 rounded-xl border border-zinc-800 cursor-pointer transition-all font-bold uppercase tracking-widest text-[10px]">
                <RefreshCw size={16} />
                Switch
                <input type="file" accept=".sav" className="hidden" onChange={handleFileUpload} />
              </label>
            </div>
          )}
        </header>

        {error && (
          <div className="mx-4 mb-4 text-red-400 bg-red-400/10 p-4 rounded-xl border border-red-400/20 flex items-center gap-3">
            <AlertTriangle size={20} />
            <span className="text-sm font-medium">{error}</span>
          </div>
        )}

        {/* Quick Filters - Horizontal Scroll on Mobile */}
        {saveData && (
          <div className="px-6 mb-8 overflow-x-auto no-scrollbar">
            <div className="flex gap-3 min-w-max pb-2">
              <button
                onClick={() => setFilters(new Set())}
                className={`px-6 py-2.5 rounded-full text-[10px] font-black uppercase tracking-widest transition-all flex items-center gap-2 border-2 ${
                  filters.size === 0 
                    ? 'bg-red-600 border-red-500 text-white shadow-lg shadow-red-600/20' 
                    : 'bg-zinc-900 border-zinc-800 text-zinc-500 hover:text-zinc-300'
                }`}
              >
                All
              </button>
              {(['caught', 'uncaught', 'lost'] as FilterType[]).map(f => (
                <button
                  key={f}
                  onClick={() => toggleFilter(f)}
                  className={`px-6 py-2.5 rounded-full text-[10px] font-black uppercase tracking-widest transition-all flex items-center gap-2 border-2 ${
                    filters.has(f)
                      ? 'bg-red-600 border-red-500 text-white shadow-lg shadow-red-600/20' 
                      : 'bg-zinc-900 border-zinc-800 text-zinc-500 hover:text-zinc-300'
                  }`}
                >
                  {f}
                </button>
              ))}
            </div>
          </div>
        )}

        <main className="px-4 pb-12">
          {viewMode === 'pokedex' ? (
            <motion.div 
              layout
              className={`grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 xl:grid-cols-8 gap-4 ${selectedPokemon ? 'hidden md:grid' : ''}`}
            >
              {filteredPokemon.map(pokemon => {
              const inParty = saveData ? saveData.party.includes(pokemon.id) : false;
              const inPC = saveData ? saveData.pc.includes(pokemon.id) : false;
              const hasInStorage = inParty || inPC;
              
              const isOwnedInDex = saveData ? saveData.owned.has(pokemon.id) : false;
              const isSeenInDex = saveData ? saveData.seen.has(pokemon.id) : false;

              const isOwned = saveData ? (isLivingDex ? hasInStorage : (isOwnedInDex || hasInStorage)) : false;
              const hadButLost = saveData ? (isOwnedInDex && !hasInStorage) : false;
              
              const isSeen = saveData ? (isSeenInDex || isOwned || hasInStorage) : false;
              const isUnseen = saveData && !isSeen;
              const isSeenNotOwned = saveData && isSeen && !isOwned;
              
              const isSelected = selectedPokemon?.id === pokemon.id;

              // Check if shiny in storage
              const isShiny = saveData ? (saveData.partyDetails.some(p => p.speciesId === pokemon.id && p.isShiny) || saveData.pcDetails.some(p => p.speciesId === pokemon.id && p.isShiny)) : false;

              let cardStyle = 'bg-zinc-900 border border-zinc-800 hover:border-zinc-700 shadow-sm';
              if (saveData) {
                if (hadButLost) {
                  cardStyle = 'bg-purple-900/10 border border-purple-900/30 hover:bg-purple-900/20';
                } else if (isOwned) {
                  if (isShiny) {
                    cardStyle = 'bg-amber-900/10 border border-amber-500/30 hover:bg-amber-900/20';
                  } else {
                    cardStyle = 'bg-emerald-900/10 border border-emerald-900/30 hover:bg-emerald-900/20';
                  }
                } else if (isUnseen) {
                  cardStyle = 'bg-zinc-900/50 border border-zinc-800/50 opacity-60';
                }
              }

              if (isSelected) {
                cardStyle = 'bg-zinc-800 border-2 border-red-600 shadow-xl shadow-red-600/10';
              }

              let imgStyle = 'drop-shadow-xl';
              if (saveData) {
                if (isUnseen) {
                  imgStyle = 'brightness-0 opacity-10';
                } else if (isSeenNotOwned) {
                  imgStyle = 'grayscale contrast-75 opacity-40';
                }
              }

              return (
                <motion.div 
                  layout
                  key={pokemon.id} 
                  onClick={() => setSelectedPokemon(pokemon)}
                  whileHover={{ y: -4 }}
                  whileTap={{ scale: 0.96 }}
                  className={`relative flex flex-col items-center p-5 rounded-2xl transition-all cursor-pointer ${cardStyle}`}
                >
                  <div className="absolute top-3 left-3 text-[10px] font-mono font-bold text-zinc-600">
                    #{pokemon.id.toString().padStart(3, '0')}
                  </div>
                  
                  {saveData && !isUnseen && (
                    <div className="absolute top-3 right-3 flex flex-col gap-1.5">
                      {inParty && <span title="In Party"><CircleDot size={12} className="text-rose-500" /></span>}
                      {inPC && <span title="In PC"><Monitor size={12} className="text-blue-400" /></span>}
                    </div>
                  )}

                  <div className="w-20 h-20 sm:w-24 sm:h-24 mb-4 flex items-center justify-center relative">
                    {isShiny && (
                      <motion.div 
                        animate={{ scale: [1, 1.2, 1], rotate: [0, 10, -10, 0] }}
                        transition={{ repeat: Infinity, duration: 2 }}
                        className="absolute -top-2 -right-2 text-amber-400 drop-shadow-sm"
                      >
                        <Sparkles size={16} />
                      </motion.div>
                    )}
                    <img 
                      src={saveData?.generation === 2 
                        ? `https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/versions/generation-ii/crystal/transparent/${isShiny ? 'shiny/' : ''}${pokemon.id}.png`
                        : `https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/versions/generation-i/red-blue/transparent/${pokemon.id}.png`
                      }
                      alt={pokemon.name}
                      className={`w-full h-full object-contain transition-all duration-500 ${imgStyle} pixelated`}
                      style={{ imageRendering: 'pixelated' }}
                      loading="lazy"
                      referrerPolicy="no-referrer"
                      onError={(e) => {
                        e.currentTarget.src = `https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/${pokemon.id}.png`;
                      }}
                    />
                  </div>

                  <div className="text-center w-full">
                    <h3 className={`text-xs font-bold uppercase tracking-wider truncate ${isUnseen ? 'text-zinc-600' : isShiny ? 'text-amber-400' : 'text-zinc-100'}`}>
                      {pokemon.name}
                    </h3>
                    
                    {saveData && (
                      <div className="mt-2.5 flex justify-center">
                        {hadButLost ? (
                          <span className="text-[8px] font-black uppercase tracking-widest text-purple-400 px-2 py-0.5 rounded-full bg-purple-900/20 border border-purple-900/40">
                            Lost
                          </span>
                        ) : isOwned ? (
                          <span className="text-[8px] font-black uppercase tracking-widest text-emerald-400 px-2 py-0.5 rounded-full bg-emerald-900/20 border border-emerald-900/40">
                            {isLivingDex ? 'Stored' : 'Owned'}
                          </span>
                        ) : isSeenNotOwned ? (
                          <span className="text-[8px] font-black uppercase tracking-widest text-zinc-400 px-2 py-0.5 rounded-full bg-zinc-800 border border-zinc-700">
                            Seen
                          </span>
                        ) : (
                          <span className="text-[8px] font-black uppercase tracking-widest text-zinc-600 px-2 py-0.5">
                            Unseen
                          </span>
                        )}
                      </div>
                    )}
                  </div>
                </motion.div>
              );
            })}
            </motion.div>
          ) : (
            <motion.div 
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className={`flex-1 space-y-16 ${selectedPokemon ? 'hidden md:block' : ''}`}
            >
              {saveData && (
                ['Party', 'Daycare', ...Array.from({ length: saveData.generation === 2 ? 14 : 12 }, (_, i) => `Box ${i + 1}`)].map(location => {
                  const pokemonInLocation = [...saveData.partyDetails, ...saveData.pcDetails]
                    .filter(p => p.storageLocation === location);
                  
                  if (pokemonInLocation.length === 0) return null;

                  return (
                    <div key={location} className="space-y-8">
                      <div className="flex items-center gap-6">
                        <h2 className="text-3xl font-display font-black uppercase tracking-tight text-white">
                          {location}
                        </h2>
                        <div className="h-px flex-1 bg-zinc-900"></div>
                        <span className="text-[10px] font-black text-zinc-600 uppercase tracking-widest">{pokemonInLocation.length} Units</span>
                      </div>
                      
                      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6 gap-4">
                        {pokemonInLocation.map((p, idx) => {
                          const pokemon = pokemonList.find(pl => pl.id === p.speciesId);
                          if (!pokemon) return null;
                          
                          const isSelected = selectedPokemon?.id === pokemon.id;
                          let cardStyle = 'bg-zinc-900 border border-zinc-800 hover:border-zinc-700 shadow-sm';
                          if (p.isShiny) {
                            cardStyle = 'bg-amber-900/10 border border-amber-500/30 hover:bg-amber-900/20';
                          } else if (location === 'Party') {
                            cardStyle = 'bg-red-900/10 border border-red-900/30 hover:bg-red-900/20';
                          } else {
                            cardStyle = 'bg-emerald-900/10 border border-emerald-900/30 hover:bg-emerald-900/20';
                          }

                          if (isSelected) {
                            cardStyle = 'bg-zinc-800 border-2 border-red-600 shadow-xl shadow-red-600/10';
                          }

                          return (
                            <motion.div 
                              layout
                              key={`${location}-${idx}`} 
                              onClick={() => setSelectedPokemon(pokemon)}
                              whileHover={{ y: -4 }}
                              whileTap={{ scale: 0.96 }}
                              className={`relative flex flex-col items-center p-5 rounded-2xl transition-all cursor-pointer ${cardStyle}`}
                            >
                              <div className="absolute top-3 left-3 text-[10px] font-mono font-bold text-zinc-600">
                                LV.{p.level}
                              </div>
                              
                              <div className="absolute top-3 right-3 flex flex-col gap-1.5 items-end">
                                {p.isShiny && <Sparkles size={14} className="text-amber-400 drop-shadow-sm" />}
                                {p.otName && <div className="text-[8px] font-black text-zinc-500 bg-zinc-950 px-1.5 py-0.5 rounded border border-zinc-800 truncate max-w-[60px]">{p.otName}</div>}
                              </div>

                              <div className="w-20 h-20 sm:w-24 sm:h-24 mb-4 flex items-center justify-center relative">
                                <img 
                                  src={saveData?.generation === 2 
                                    ? `https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/versions/generation-ii/crystal/transparent/${p.isShiny ? 'shiny/' : ''}${pokemon.id}.png`
                                    : `https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/versions/generation-i/red-blue/transparent/${pokemon.id}.png`
                                  }
                                  alt={pokemon.name}
                                  className="w-full h-full object-contain drop-shadow-xl pixelated"
                                  style={{ imageRendering: 'pixelated' }}
                                  referrerPolicy="no-referrer"
                                />
                              </div>
                              
                              <div className="text-center font-bold uppercase tracking-wider text-[10px] text-zinc-100 truncate w-full px-1">
                                {pokemon.name}
                              </div>
                            </motion.div>
                          );
                        })}
                      </div>
                    </div>
                  );
                })
              )}
            </motion.div>
          )}

          {selectedPokemon && (
            <div className="fixed inset-0 z-50 md:relative md:inset-auto md:z-auto md:w-[400px] lg:w-[500px] xl:w-[600px] shrink-0 md:sticky md:top-8">
              <PokemonDetails 
                pokemonId={selectedPokemon.id}
                pokemonName={selectedPokemon.name}
                gameVersion={effectiveVersion}
                saveData={saveData}
                isLivingDex={isLivingDex}
                pokeball={globalPokeball}
                onClose={() => setSelectedPokemon(null)}
              />
            </div>
          )}
        </main>
      </div>

      {/* Bottom Navigation */}
      {saveData && (
        <nav className="fixed bottom-0 left-0 right-0 z-40 bg-zinc-950/80 backdrop-blur-xl border-t border-zinc-900 px-8 py-4 sm:hidden shadow-2xl">
          <div className="flex justify-between items-center max-w-md mx-auto">
            <button 
              onClick={() => setViewMode('pokedex')}
              className={`flex flex-col items-center gap-1.5 transition-all ${viewMode === 'pokedex' ? 'text-red-500' : 'text-zinc-600'}`}
            >
              <div className={`p-1 rounded-lg transition-colors ${viewMode === 'pokedex' ? 'bg-red-500/10' : ''}`}>
                <LayoutGrid size={22} />
              </div>
              <span className="text-[9px] font-black uppercase tracking-widest">Dex</span>
            </button>
            <button 
              onClick={() => setViewMode('storage')}
              className={`flex flex-col items-center gap-1.5 transition-all ${viewMode === 'storage' ? 'text-red-500' : 'text-zinc-600'}`}
            >
              <div className={`p-1 rounded-lg transition-colors ${viewMode === 'storage' ? 'bg-red-500/10' : ''}`}>
                <Database size={22} />
              </div>
              <span className="text-[9px] font-black uppercase tracking-widest">Storage</span>
            </button>
            <button 
              onClick={() => setIsSettingsOpen(true)}
              className={`flex flex-col items-center gap-1.5 transition-all ${isSettingsOpen ? 'text-blue-500' : 'text-zinc-600'}`}
            >
              <div className={`p-1 rounded-lg transition-colors ${isSettingsOpen ? 'bg-blue-500/10' : ''}`}>
                <Settings2 size={22} />
              </div>
              <span className="text-[9px] font-black uppercase tracking-widest">Menu</span>
            </button>
          </div>
        </nav>
      )}

      {/* Settings Modal */}
      <AnimatePresence>
        {isSettingsOpen && (
          <div className="fixed inset-0 z-[60] flex items-end sm:items-center justify-center p-0 sm:p-4">
            <motion.div 
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="absolute inset-0 bg-black/80 backdrop-blur-sm" 
              onClick={() => setIsSettingsOpen(false)} 
            />
            <motion.div 
              initial={{ y: '100%' }}
              animate={{ y: 0 }}
              exit={{ y: '100%' }}
              transition={{ type: 'spring', damping: 25, stiffness: 200 }}
              className="relative w-full sm:max-w-md bg-zinc-900 rounded-t-[2.5rem] sm:rounded-[2.5rem] border-t sm:border border-zinc-800 shadow-2xl overflow-hidden"
            >
              <div className="p-8 border-b border-zinc-800 flex items-center justify-between">
                <div>
                  <h2 className="text-2xl font-display font-black uppercase tracking-tight">Menu</h2>
                  <p className="text-[10px] font-bold text-zinc-500 uppercase tracking-widest mt-1">Configure your experience</p>
                </div>
                <button onClick={() => setIsSettingsOpen(false)} className="p-3 bg-zinc-800 hover:bg-zinc-700 rounded-full transition-colors text-zinc-400">
                  <X size={20} />
                </button>
              </div>
              
              <div className="p-8 space-y-8 max-h-[70vh] overflow-y-auto custom-scrollbar">
                {/* Legend */}
                <div className="space-y-4">
                  <h3 className="text-[10px] font-black text-zinc-500 uppercase tracking-widest flex items-center gap-2">
                    <Info size={12} /> Legend
                  </h3>
                  <div className="grid grid-cols-2 gap-3">
                    {[
                      { icon: <CircleDot size={14} className="text-rose-500" />, label: 'In Party' },
                      { icon: <Monitor size={14} className="text-blue-400" />, label: 'In PC' },
                      { icon: <Check size={14} className="text-emerald-400" />, label: 'Owned' },
                      { icon: <Ghost size={14} className="text-purple-400" />, label: 'Lost' }
                    ].map((item, i) => (
                      <div key={i} className="flex items-center gap-3 bg-zinc-950 p-3 rounded-xl border border-zinc-800 text-[11px] font-bold">
                        {item.icon} {item.label}
                      </div>
                    ))}
                  </div>
                </div>

                {/* Controls */}
                <div className="space-y-4">
                  <div className="flex items-center justify-between p-4 bg-zinc-950 rounded-2xl border border-zinc-800">
                    <div className="flex items-center gap-3">
                      <div className="p-2 bg-blue-500/10 rounded-lg"><Settings2 size={18} className="text-blue-500" /></div>
                      <span className="text-xs font-bold uppercase tracking-wider">Version</span>
                    </div>
                    <select 
                      value={effectiveVersion}
                      onChange={(e) => setManualVersion(e.target.value as GameVersion)}
                      className="bg-zinc-900 border border-zinc-800 rounded-xl px-4 py-2 text-xs font-bold text-zinc-200 outline-none focus:border-blue-500 transition-colors"
                    >
                      <option value="unknown">Auto</option>
                      {(!saveData || saveData.generation === 1) && (
                        <>
                          <option value="red">Red</option>
                          <option value="blue">Blue</option>
                          <option value="yellow">Yellow</option>
                        </>
                      )}
                      {(!saveData || saveData.generation === 2) && (
                        <>
                          <option value="gold">Gold</option>
                          <option value="silver">Silver</option>
                          <option value="crystal">Crystal</option>
                        </>
                      )}
                    </select>
                  </div>

                  <div className="flex items-center justify-between p-4 bg-zinc-950 rounded-2xl border border-zinc-800">
                    <div className="flex items-center gap-3">
                      <div className="p-2 bg-purple-500/10 rounded-lg"><Archive size={18} className="text-purple-500" /></div>
                      <span className="text-xs font-bold uppercase tracking-wider">Living Dex</span>
                    </div>
                    <button 
                      onClick={() => setIsLivingDex(!isLivingDex)}
                      className={`relative inline-flex h-7 w-12 items-center rounded-full transition-colors ${isLivingDex ? 'bg-emerald-600' : 'bg-zinc-800'}`}
                    >
                      <span className={`inline-block h-5 w-5 transform rounded-full bg-white transition-transform ${isLivingDex ? 'translate-x-6' : 'translate-x-1'}`} />
                    </button>
                  </div>

                  <div className="flex items-center justify-between p-4 bg-zinc-950 rounded-2xl border border-zinc-800">
                    <div className="flex items-center gap-3">
                      <div className="p-2 bg-amber-500/10 rounded-lg"><CircleDot size={18} className="text-amber-500" /></div>
                      <span className="text-xs font-bold uppercase tracking-wider">Ball Style</span>
                    </div>
                    <select 
                      value={globalPokeball}
                      onChange={(e) => setGlobalPokeball(e.target.value as PokeballType)}
                      className="bg-zinc-900 border border-zinc-800 rounded-xl px-4 py-2 text-xs font-bold text-zinc-200 outline-none focus:border-amber-500 transition-colors"
                    >
                      <option value="poke">Poké Ball</option>
                      <option value="great">Great Ball</option>
                      <option value="ultra">Ultra Ball</option>
                      <option value="safari">Safari Ball</option>
                      <option value="heavy">Heavy Ball</option>
                      <option value="lure">Lure Ball</option>
                      <option value="fast">Fast Ball</option>
                      <option value="friend">Friend Ball</option>
                      <option value="moon">Moon Ball</option>
                      <option value="love">Love Ball</option>
                      <option value="level">Level Ball</option>
                    </select>
                  </div>
                </div>

                <button 
                  onClick={() => {
                    localStorage.removeItem('last_save_file');
                    setSaveData(null);
                    setSelectedPokemon(null);
                    setManualVersion(null);
                    setIsSettingsOpen(false);
                  }}
                  className="w-full flex items-center justify-center gap-3 p-5 bg-red-600/10 text-red-500 rounded-2xl border border-red-600/20 font-bold uppercase tracking-widest text-[10px] hover:bg-red-600/20 transition-all group"
                >
                  <Trash2 size={16} className="group-hover:rotate-12 transition-transform" /> 
                  Clear Stored Save
                </button>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>

    </div>
  );
}
