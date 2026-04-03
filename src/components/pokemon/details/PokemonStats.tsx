import React from 'react';
import { Activity } from 'lucide-react';
import { motion } from 'motion/react';
import { getGenerationConfig } from '../../../utils/generationConfig';

interface PokemonStatsProps {
  pokemonData: any;
  saveData: any;
}

const contentVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: { 
    opacity: 1, 
    y: 0,
    transition: { type: "spring", damping: 20, stiffness: 100 }
  }
} as const;

export function PokemonStats({ pokemonData, saveData }: PokemonStatsProps) {
  if (!pokemonData) return null;

  return (
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
  );
}
