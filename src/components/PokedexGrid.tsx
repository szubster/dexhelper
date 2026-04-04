import React, { useMemo } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Monitor, CircleDot, Sparkles, ChevronRight } from 'lucide-react';
import { useStore } from '../store';
import { useNavigate } from '@tanstack/react-router';
import { getGenerationConfig } from '../utils/generationConfig';

export function PokedexGrid({ pokemonList }: { pokemonList: { id: number; name: string }[] }) {
  const saveData = useStore((s) => s.saveData);
  const isLivingDex = useStore((s) => s.isLivingDex);
  const searchTerm = useStore((s) => s.searchTerm);
  const filters = useStore((s) => s.filters);
  const navigate = useNavigate();

  const filtersSet = React.useMemo(() => new Set(filters), [filters]);
  const genConfig = saveData ? getGenerationConfig(saveData.generation) : null;
  const displayLimit = genConfig?.maxDex ?? 151;

  const partySet = React.useMemo(() => new Set(saveData?.party || []), [saveData?.party]);
  const pcSet = React.useMemo(() => new Set(saveData?.pc || []), [saveData?.pc]);
  const shinyPartySet = React.useMemo(() => new Set(saveData?.partyDetails.filter(p => p.isShiny).map(p => p.speciesId) || []), [saveData?.partyDetails]);
  const shinyPcSet = React.useMemo(() => new Set(saveData?.pcDetails.filter(p => p.isShiny).map(p => p.speciesId) || []), [saveData?.pcDetails]);

  const finalPokemon = pokemonList.slice(0, displayLimit).filter(pokemon => {
    if (!saveData || filtersSet.size === 0) return true;

    const inParty = partySet.has(pokemon.id);
    const inPC = pcSet.has(pokemon.id);
    const hasInStorage = inParty || inPC;

    if (filtersSet.has('secured') && hasInStorage) return true;
    if (filtersSet.has('missing') && !hasInStorage) return true;
    if (filtersSet.has('dex-only') && (saveData.owned.has(pokemon.id) && !hasInStorage)) return true;

    return false;
  }).filter(pokemon => {
    if (!searchTerm) return true;
    const term = searchTerm.toLowerCase();
    return pokemon.name.toLowerCase().includes(term) || pokemon.id.toString().includes(term);
  });

  const shinySpeciesIds = useMemo(() => {
    const set = new Set<number>();
    if (saveData) {
      saveData.partyDetails.forEach(p => {
        if (p.isShiny) set.add(p.speciesId);
      });
      saveData.pcDetails.forEach(p => {
        if (p.isShiny) set.add(p.speciesId);
      });
    }
    return set;
  }, [saveData]);

  return (
    <div className="grid-container grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 xl:grid-cols-8 pb-20">
      <AnimatePresence mode="popLayout">
        {finalPokemon.map((pokemon, idx) => {
          const inParty = saveData ? partySet.has(pokemon.id) : false;
          const inPC = saveData ? pcSet.has(pokemon.id) : false;
          const hasInStorage = inParty || inPC;

          const isOwnedInDex = saveData ? saveData.owned.has(pokemon.id) : false;
          const isSeenInDex = saveData ? saveData.seen.has(pokemon.id) : false;

          const isOwned = saveData ? (isLivingDex ? hasInStorage : (isOwnedInDex || hasInStorage)) : false;
          const hadButLost = saveData ? (isOwnedInDex && !hasInStorage) : false;

          const isSeen = saveData ? (isSeenInDex || isOwned || hasInStorage) : false;
          const isUnseen = saveData && !isSeen;
          const isSeenNotOwned = saveData && isSeen && !isOwned;

          const isShiny = shinySpeciesIds.has(pokemon.id);

          return (
            <motion.div
              layout
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.9 }}
              transition={{ delay: (idx % 20) * 0.02 }}
              key={pokemon.id}
              onClick={() => navigate({ to: `/pokemon/${pokemon.id}`, search: { from: '/' } })}
              whileHover={{ y: -6, transition: { duration: 0.15 } }}
              whileTap={{ scale: 0.97 }}
              className={`glass-card pokemon-card flex-col flex relative ${
                isUnseen ? 'pokemon-card-unseen' : ''
              } ${
                hadButLost ? "pokemon-card-had-lost" : isOwned ? (isShiny ? "pokemon-card-owned-shiny" : "pokemon-card-owned") : ""
              }`}
            >
              {/* Card Header: Num & Icons */}
              <div className="pokemon-card-header">
                <div className="pokemon-id-badge">
                  <span className="text-[9px] font-black uppercase tracking-tighter" style={{ color: '#71717a' }}>ID</span>
                  <span className="text-[10px] font-mono font-black" style={{ color: '#d4d4d8' }}>
                    {pokemon.id.toString().padStart(3, '0')}
                  </span>
                </div>

                {saveData && !isUnseen && (
                  <div className="flex gap-1">
                    {inParty && <CircleDot size={12} color="#f43f5e" className="animate-pulse" />}
                    {inPC && <Monitor size={12} color="var(--theme-primary)" />}
                  </div>
                )}
              </div>

              {/* Sprite Container */}
              <div className="pokemon-sprite-container">
                {/* LCD Grid Background */}
                <div className="absolute inset-0 pointer-events-none" style={{ opacity: 0.05, backgroundImage: 'radial-gradient(circle, white 1px, transparent 1px)', backgroundSize: '4px 4px' }} />

                {isShiny && (
                  <motion.div
                    animate={{ rotate: 360, scale: [1, 1.2, 1] }}
                    transition={{ repeat: Infinity, duration: 4, ease: "linear" }}
                    className="absolute z-10"
                    style={{ top: '-0.25rem', right: '-0.25rem', color: '#fbbf24', filter: 'drop-shadow(0 0 8px rgba(251,191,36,0.5))' }}
                  >
                    <Sparkles size={16} fill="currentColor" />
                  </motion.div>
                )}

                <img
                  src={genConfig
                    ? genConfig.spriteUrl(pokemon.id, isShiny)
                    : `https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/versions/generation-i/red-blue/transparent/${pokemon.id}.png`
                  }
                  alt={pokemon.name}
                  className={`pixelated pokemon-sprite ${isUnseen ? 'unseen' : ''} ${isSeenNotOwned ? 'seen-not-owned' : ''}`}
                  loading="lazy"
                  onError={(e) => {
                    e.currentTarget.src = (genConfig?.fallbackSpriteUrl ?? getGenerationConfig(1).fallbackSpriteUrl)(pokemon.id);
                  }}
                />

                {/* Scanline overlay for sprite */}
                <div className="scanline-overlay absolute inset-0 pointer-events-none" style={{ opacity: 0.2 }} />
              </div>

              {/* Card Footer: Name & Status */}
              <div className="flex-col flex gap-2">
                <h3 className={`pokemon-name ${isUnseen ? 'unseen' : ''} ${isShiny ? 'shiny' : ''}`}>
                  {pokemon.name}
                </h3>

                {saveData && (
                  <div className="flex justify-center">
                    {hasInStorage ? (
                      <div className={`status-badge ${isShiny ? 'status-badge-secured-shiny' : 'status-badge-secured'}`}>
                        <div className="dot" style={{ width: '4px', height: '4px', borderRadius: '9999px' }} />
                        <span className="text text-[8px] font-black uppercase tracking-tighter">Secured</span>
                      </div>
                    ) : isOwnedInDex ? (
                      <div className="status-badge status-badge-dex-only">
                        <div className="dot" style={{ width: '4px', height: '4px', borderRadius: '9999px' }} />
                        <span className="text text-[8px] font-black uppercase tracking-tighter">Dex Only</span>
                      </div>
                    ) : isSeenInDex ? (
                      <div className="status-badge status-badge-seen">
                        <div className="dot" style={{ width: '4px', height: '4px', borderRadius: '9999px' }} />
                        <span className="text text-[8px] font-black uppercase tracking-tighter">Seen</span>
                      </div>
                    ) : (
                      <div className="status-badge status-badge-unknown">
                        <span className="text text-[8px] font-black uppercase tracking-tighter">Unknown</span>
                      </div>
                    )}
                  </div>
                )}
              </div>

              {/* Corner Accent */}
              <div className="card-chevron">
                <ChevronRight size={14} color="var(--theme-primary)" />
              </div>
            </motion.div>
          );
        })}
      </AnimatePresence>
    </div>
  );
}
