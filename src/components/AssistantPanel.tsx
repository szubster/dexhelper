import React from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Sparkles, Target, Zap, Egg, Flag, Info, Loader2 } from 'lucide-react';
import { Suggestion, useAssistant } from '../hooks/useAssistant';
import { SaveData } from '../utils/saveParser';
import { Link } from '@tanstack/react-router';
import { useQuery } from '@tanstack/react-query';

interface AssistantPanelProps {
  saveData: SaveData;
  isLivingDex: boolean;
  manualVersion: string | null;
}

const CATEGORY_STYLES: Record<string, { icon: React.ReactNode, color: string, bg: string }> = {
  Catch: { icon: <Target size={16} className="text-emerald-400" />, color: 'border-emerald-500/30 text-emerald-100', bg: 'bg-emerald-500/10' },
  Evolve: { icon: <Zap size={16} className="text-blue-400" />, color: 'border-blue-500/30 text-blue-100', bg: 'bg-blue-500/10' },
  Trade: { icon: <Zap size={16} className="text-amber-400" />, color: 'border-amber-500/30 text-amber-100', bg: 'bg-amber-500/10' },
  Breed: { icon: <Egg size={16} className="text-pink-400" />, color: 'border-pink-500/30 text-pink-100', bg: 'bg-pink-500/10' },
  Progress: { icon: <Flag size={16} className="text-red-400" />, color: 'border-red-500/30 text-red-100', bg: 'bg-red-500/10' },
  Event: { icon: <Sparkles size={16} className="text-purple-400" />, color: 'border-purple-500/30 text-purple-100', bg: 'bg-purple-500/10' },
  Gift: { icon: <Zap size={16} className="text-indigo-400" />, color: 'border-indigo-500/30 text-indigo-100', bg: 'bg-indigo-500/10' },
  Utility: { icon: <Info size={16} className="text-zinc-400" />, color: 'border-zinc-500/30 text-zinc-100', bg: 'bg-zinc-500/10' },
};

export function AssistantPanel({ saveData, isLivingDex, manualVersion }: AssistantPanelProps) {
  const { suggestions, isLoading } = useAssistant(saveData, isLivingDex, manualVersion);
  
  const { data: pokemonList } = useQuery<{ id: number; name: string }[]>({
    queryKey: ['pokemonList'],
    enabled: false, // Don't fetch if missing, just read from cache
  });

  const getPokemonName = (id: number) => {
    if (!pokemonList) return `#${id}`;
    const p = pokemonList.find(x => x.id === id);
    return p ? p.name : `#${id}`;
  };

  return (
    <div className="flex-1 space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 bg-zinc-900 border border-zinc-800 p-6 rounded-[2rem] shadow-xl relative overflow-hidden">
        <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-emerald-500 via-amber-500 to-purple-500" />
        
        <div>
          <h2 className="text-2xl font-display font-black uppercase tracking-tight text-white flex items-center gap-3">
            <Sparkles className="text-amber-400" size={24} />
            AI Assistant
          </h2>
          <p className="text-xs font-bold text-zinc-500 uppercase tracking-widest mt-1">Smart suggestions based on your save file</p>
        </div>
      </div>

      {isLoading ? (
        <div className="flex items-center justify-center p-12 bg-zinc-900/50 rounded-[2rem] border border-zinc-800/50">
          <Loader2 className="animate-spin text-zinc-500" size={32} />
        </div>
      ) : suggestions.length === 0 ? (
        <div className="flex flex-col items-center justify-center p-12 bg-zinc-900/50 rounded-[2rem] border border-zinc-800/50 text-center">
          <Sparkles className="text-zinc-700 mb-4" size={48} />
          <h3 className="text-lg font-bold text-zinc-400 uppercase tracking-wide">You're all caught up!</h3>
          <p className="text-sm font-medium text-zinc-600 mt-2 max-w-sm">No new suggestions at the moment. Keep exploring to discover more Pokémon!</p>
        </div>
      ) : (
        <div className="space-y-8">
          {Object.entries(
            suggestions.reduce((acc, s) => {
              if (!acc[s.category]) acc[s.category] = [];
              acc[s.category].push(s);
              return acc;
            }, {} as Record<string, Suggestion[]>)
          // Custom sort order for categories
          ).sort(([a], [b]) => {
             const order = ['Catch', 'Gift', 'Evolve', 'Trade', 'Progress', 'Event', 'Utility'];
             return (order.indexOf(a) !== -1 ? order.indexOf(a) : 99) - (order.indexOf(b) !== -1 ? order.indexOf(b) : 99);
          }).map(([category, items]) => {
            const catStyle = CATEGORY_STYLES[category] || CATEGORY_STYLES.Utility;
            
            return (
              <div key={category} className="space-y-4">
                <div className="flex items-center gap-3 px-2">
                  <div className={`p-2 rounded-xl border ${catStyle.bg} ${catStyle.color.replace('border-', 'text-')}`}>
                    {catStyle.icon}
                  </div>
                  <h3 className="text-xl font-display font-black text-white uppercase tracking-widest">
                    {category === 'Catch' ? 'Wild Encounters' : 
                     category === 'Trade' ? 'Trade Required' : 
                     category}
                  </h3>
                </div>

                <motion.div 
                  initial="hidden"
                  animate="show"
                  variants={{
                    hidden: { opacity: 0 },
                    show: {
                      opacity: 1,
                      transition: { staggerChildren: 0.1 }
                    }
                  }}
                  className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4"
                >
                  <AnimatePresence>
                    {items.map((s) => {
                      const style = CATEGORY_STYLES[s.category] || CATEGORY_STYLES.Utility;
                      
                      let title = s.title;
                      let desc = s.description;
                      if (s.pokemonId) {
                        const name = getPokemonName(s.pokemonId);
                        title = title.replace(new RegExp(`#${s.pokemonId}`, 'g'), name);
                        desc = desc.replace(new RegExp(`#${s.pokemonId}`, 'g'), name);
                      }

                      const hasMultiple = s.pokemonIds && s.pokemonIds.length > 0;

                      const CardContent = (
                        <>
                          <div className={`absolute -top-10 -right-10 w-32 h-32 rounded-full blur-[40px] opacity-20 group-hover:opacity-40 transition-opacity ${style.bg.replace('bg-', 'bg-')}`} />
                          
                          <div className="relative z-10 flex flex-col h-full justify-between p-5">
                            <div>
                              <div className="flex items-center justify-between mb-3">
                                <div className={`px-2 py-1 rounded-md text-[9px] font-black uppercase tracking-widest flex items-center gap-1.5 border border-white/10 ${style.bg} ${style.color.replace('border-', 'text-')}`}>
                                  {style.icon}
                                  {s.category}
                                </div>
                                {s.pokemonId && (
                                  <div className="text-[10px] font-mono font-bold text-zinc-500">#{s.pokemonId.toString().padStart(3, '0')}</div>
                                )}
                              </div>

                              <h3 className="text-sm font-bold text-white mb-2 leading-tight">
                                {title}
                              </h3>
                              
                              <p className="text-xs font-medium text-zinc-400 leading-relaxed max-w-[90%]">
                                {desc}
                              </p>
                            </div>

                            {s.pokemonId && (
                              <div className="absolute bottom-2 right-2 w-16 h-16 opacity-30 group-hover:opacity-100 group-hover:scale-110 transition-all duration-300 transform origin-bottom-right">
                                <img 
                                  src={`https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/versions/generation-i/red-blue/transparent/${s.pokemonId}.png`}
                                  alt="Sprite"
                                  className="w-full h-full object-contain pixelated drop-shadow-lg"
                                />
                              </div>
                            )}

                            {hasMultiple && (
                              <div className="mt-4 flex flex-wrap gap-2 relative z-20">
                                {s.pokemonIds!.slice(0, 8).map(pid => (
                                  <Link 
                                    key={pid} 
                                    to="/pokemon/$pokemonId" 
                                    params={{ pokemonId: pid.toString() }}
                                    className="w-10 h-10 bg-black/40 rounded-lg p-1 border border-white/5 hover:border-white/40 hover:scale-110 hover:bg-black/60 transition-all group/sprite relative"
                                    title={getPokemonName(pid)}
                                    // Make sure clicking the inline link doesn't trigger parent clicks (though parent isn't clickable here anymore)
                                    onClick={(e) => e.stopPropagation()} 
                                  >
                                    <img 
                                      src={`https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/versions/generation-i/red-blue/transparent/${pid}.png`}
                                      alt={getPokemonName(pid)}
                                      className="w-full h-full object-contain pixelated"
                                    />
                                  </Link>
                                ))}
                                {s.pokemonIds!.length > 8 && (
                                  <div className="w-10 h-10 bg-black/40 rounded-lg flex items-center justify-center border border-white/5 text-xs font-bold text-zinc-500">
                                    +{s.pokemonIds!.length - 8}
                                  </div>
                                )}
                              </div>
                            )}
                          </div>
                        </>
                      );

                      const isCritical = title.includes('CRITICAL');

                      return (
                        <motion.div
                          key={s.id}
                          layout
                          variants={{
                            hidden: { opacity: 0, scale: 0.9, y: 20 },
                            show: { opacity: 1, scale: 1, y: 0, transition: { type: 'spring', damping: 20 } }
                          }}
                          whileHover={{ y: -4, scale: 1.02 }}
                          // only pointer cursor if it's a single item link
                          className={`relative rounded-2xl border ${isCritical ? 'border-red-500 animate-[pulse_2s_infinite]' : style.color} bg-zinc-900 shadow-lg transition-all overflow-hidden group ${!hasMultiple && s.pokemonId ? 'cursor-pointer' : ''}`}
                        >
                          {!hasMultiple && s.pokemonId ? (
                            <Link to="/pokemon/$pokemonId" params={{ pokemonId: s.pokemonId.toString() }} className="block w-full h-full">
                              {CardContent}
                            </Link>
                          ) : (
                            <div className="w-full h-full">
                              {CardContent}
                            </div>
                          )}
                        </motion.div>
                      );
                    })}
                  </AnimatePresence>
                </motion.div>
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
}
