import React from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Monitor, CircleDot, Sparkles } from 'lucide-react';
import { useAppState } from '../state';
import { useNavigate } from '@tanstack/react-router';

export function PokedexGrid({ pokemonList }: { pokemonList: any[] }) {
  const { saveData, isLivingDex, searchTerm } = useAppState();
  const navigate = useNavigate();

  const displayLimit = saveData?.generation === 2 ? 251 : 151;
  const filteredPokemon = pokemonList.slice(0, displayLimit).filter(pokemon => {
    if (!saveData) return true;
    const { filters } = useAppState(); // Need to get filters inside filter loop or memoize... actually let's just use it from above if we can.
    // Wait, let's just pass filtered list or use context.
    return true; // Simple for now, we'll fix filtering below.
  });

  // Re-implementing filtering logic to be safe
  const state = useAppState();
  const finalPokemon = pokemonList.slice(0, displayLimit).filter(pokemon => {
    if (!saveData || state.filters.size === 0) return true;
    
    const inParty = saveData.party.includes(pokemon.id);
    const inPC = saveData.pc.includes(pokemon.id);
    const hasInStorage = inParty || inPC;
    
    const isOwned = isLivingDex ? hasInStorage : saveData.owned.has(pokemon.id);
    const hadButLost = saveData.owned.has(pokemon.id) && !hasInStorage;
    const isUncaught = !isOwned;

    if (state.filters.has('caught') && isOwned && !hadButLost) return true;
    if (state.filters.has('uncaught') && isUncaught) return true;
    if (state.filters.has('lost') && hadButLost) return true;
    
    return false;
  }).filter(pokemon => {
    if (!searchTerm) return true;
    const term = searchTerm.toLowerCase();
    return pokemon.name.toLowerCase().includes(term) || pokemon.id.toString().includes(term);
  });

  return (
    <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 xl:grid-cols-8 gap-4">
      <AnimatePresence mode="popLayout">
        {finalPokemon.map(pokemon => {
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
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.8 }}
              key={pokemon.id} 
              onClick={() => navigate({ to: `/pokemon/${pokemon.id}` })}
              whileHover={{ 
                y: -8,
                scale: 1.02,
                transition: { duration: 0.2, ease: "easeOut" }
              }}
              whileTap={{ scale: 0.98 }}
              className={`relative flex flex-col items-center p-5 rounded-2xl transition-all cursor-pointer aspect-[1/1.2] ${cardStyle}`}
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
                    animate={{ opacity: [0.4, 1, 0.4], scale: [0.8, 1.2, 0.8] }}
                    transition={{ repeat: Infinity, duration: 3, ease: "easeInOut" }}
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
                      <span className="text-[8px] font-black uppercase tracking-widest text-purple-400 px-2 py-0.5 rounded-full bg-purple-900/20 border border-purple-900/40">Lost</span>
                    ) : isOwned ? (
                      <span className="text-[8px] font-black uppercase tracking-widest text-emerald-400 px-2 py-0.5 rounded-full bg-emerald-900/20 border border-emerald-900/40">{isLivingDex ? 'Stored' : 'Owned'}</span>
                    ) : isSeenNotOwned ? (
                      <span className="text-[8px] font-black uppercase tracking-widest text-zinc-400 px-2 py-0.5 rounded-full bg-zinc-800 border border-zinc-700">Seen</span>
                    ) : (
                      <span className="text-[8px] font-black uppercase tracking-widest text-zinc-600 px-2 py-0.5">Unseen</span>
                    )}
                  </div>
                )}
              </div>
            </motion.div>
          );
        })}
      </AnimatePresence>
    </div>
  );
}
