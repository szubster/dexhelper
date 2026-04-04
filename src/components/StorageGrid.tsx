import React from 'react';
import { motion } from 'motion/react';
import { Sparkles } from 'lucide-react';
import { useStore } from '@nanostores/react';
import * as Store from '../store';
import { getGenerationConfig } from '../utils/generationConfig';
import { ReactQueryProvider } from './ReactQueryProvider';

const containerVariants = {
  hidden: { opacity: 0 },
  show: { opacity: 1, transition: { staggerChildren: 0.02, delayChildren: 0.1 } }
} as const;

const itemVariants = {
  hidden: { opacity: 0, y: 20, scale: 0.95 },
  show: { opacity: 1, y: 0, scale: 1, transition: { type: "spring", damping: 20, stiffness: 100 } }
} as const;

export function StorageGrid({ pokemonList }: { pokemonList: { id: number; name: string }[] }) {
  const saveData = useStore(Store.saveData);

  const pokemonMap = React.useMemo(() => {
    const map = new Map<number, { id: number; name: string }>();
    pokemonList.forEach(p => map.set(p.id, p));
    return map;
  }, [pokemonList]);

  if (!saveData) return null;

  const genConfig = getGenerationConfig(saveData.generation);
  const storageLocations = ['Party', 'Daycare', ...Array.from({ length: genConfig.boxCount }, (_, i) => `Box ${i + 1}`)];

  return (
    <ReactQueryProvider>
    <motion.div variants={containerVariants} initial="hidden" animate="show" className="space-y-16">
      {storageLocations.map(location => {
        const pokemonInLocation = [...saveData.partyDetails, ...saveData.pcDetails].filter(p => p.storageLocation === location);
        if (pokemonInLocation.length === 0) return null;

        return (
          <motion.div variants={itemVariants} key={location} className="space-y-8">
            <div className="flex items-center gap-6">
              <h2 className="text-3xl font-display font-black uppercase tracking-tight text-white">{location}</h2>
              <div className="h-px flex-1 bg-zinc-900"></div>
              <span className="text-[10px] font-black text-zinc-600 uppercase tracking-widest">{pokemonInLocation.length} Units</span>
            </div>

            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6 gap-4">
              {pokemonInLocation.map((p, idx) => {
                const pokemon = pokemonMap.get(p.speciesId);
                if (!pokemon) return null;

                let cardStyle = 'bg-zinc-900 border border-zinc-800 hover:border-zinc-700 shadow-sm';
                if (p.isShiny) {
                  cardStyle = 'bg-amber-900/10 border border-amber-500/30 hover:bg-amber-900/20';
                } else if (location === 'Party') {
                  cardStyle = 'bg-red-900/10 border border-red-900/30 hover:bg-red-900/20';
                } else {
                  cardStyle = 'bg-emerald-900/10 border border-emerald-900/30 hover:bg-emerald-900/20';
                }

                return (
                  <motion.div
                    layout
                    key={`${location}-${idx}`}
                    whileHover={{ y: -4 }}
                    whileTap={{ scale: 0.96 }}
                    className={`relative flex flex-col items-center p-5 rounded-2xl transition-all cursor-pointer ${cardStyle}`}
                  >
                    <a href={`/pokemon/${pokemon.id}?from=/storage`} className="absolute inset-0 z-20">
                      <span className="sr-only">View {pokemon.name}</span>
                    </a>
                    <div className="absolute top-3 left-3 text-[10px] font-mono font-bold text-zinc-600">LV.{p.level}</div>
                    <div className="absolute top-3 right-3 flex flex-col gap-1.5 items-end">
                      {p.isShiny && <Sparkles size={14} className="text-amber-400 drop-shadow-sm" />}
                      {p.otName && <div className="text-[8px] font-black text-zinc-500 bg-zinc-950 px-1.5 py-0.5 rounded border border-zinc-800 truncate max-w-[60px]">{p.otName}</div>}
                    </div>
                    <div className="w-20 h-20 sm:w-24 sm:h-24 mb-4 flex items-center justify-center relative">
                      <img
                        src={genConfig.spriteUrl(pokemon.id, p.isShiny)}
                        alt={pokemon.name}
                        className="w-full h-full object-contain drop-shadow-xl pixelated"
                        style={{ imageRendering: 'pixelated' }}
                      />
                    </div>
                    <div className="text-center font-bold uppercase tracking-wider text-[10px] text-zinc-100 truncate w-full px-1">{pokemon.name}</div>
                  </motion.div>
                );
              })}
            </div>
          </motion.div>
        );
      })}
    </motion.div>
    </ReactQueryProvider>
  );
}
