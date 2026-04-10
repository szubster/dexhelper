import { Activity } from 'lucide-react';
import type { Pokemon, PokemonStat } from 'pokenode-ts';
import { useEffect, useState } from 'react';
import type { SaveData } from '../../../engine/saveParser/index';
import { getGenerationConfig } from '../../../utils/generationConfig';

interface PokemonStatsProps {
  pokemonData: Pokemon;
  saveData: SaveData | null;
}

export function PokemonStats({ pokemonData, saveData }: PokemonStatsProps) {
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!pokemonData) return null;

  return (
    <div className="slide-in-from-bottom-4 fade-in animate-in space-y-5 fill-mode-both duration-500">
      <h3 className="flex items-center gap-2 font-black text-[10px] text-zinc-500 uppercase tracking-[0.3em]">
        <Activity size={14} className="text-[var(--theme-primary)]" /> Combat Analysis
      </h3>
      <div className="grid grid-cols-1 gap-3">
        {pokemonData.stats.map((s: PokemonStat) => {
          const statName =
            s.stat.name === 'special-attack'
              ? 'SPC'
              : s.stat.name === 'special-defense'
                ? 'SPD'
                : s.stat.name === 'hp'
                  ? 'HP'
                  : s.stat.name === 'attack'
                    ? 'ATK'
                    : s.stat.name === 'defense'
                      ? 'DEF'
                      : s.stat.name === 'speed'
                        ? 'SPE'
                        : s.stat.name;

          if (
            saveData &&
            getGenerationConfig(saveData.generation).hasUnifiedSpecial &&
            s.stat.name === 'special-defense'
          )
            return null;

          const maxVal = 255;
          const percentage = (s.base_stat / maxVal) * 100;

          return (
            <div key={s.stat.name} className="flex items-center gap-4">
              <div className="w-8 font-black font-mono text-[10px] text-zinc-400 uppercase">{statName}</div>
              <div className="relative h-2 flex-1 overflow-hidden rounded-full border border-white/5 bg-zinc-900">
                <div
                  className="relative h-full bg-gradient-to-r from-[var(--theme-primary)]/50 to-[var(--theme-primary)] transition-all duration-1000 ease-out"
                  style={{ width: mounted ? `${percentage}%` : '0%' }}
                >
                  <div className="lcd-flicker absolute inset-0 opacity-30" />
                </div>
              </div>
              <div className="w-10 text-right font-black font-mono text-white text-xs">{s.base_stat}</div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
