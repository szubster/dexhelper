import React, { useState } from 'react';
import { Target } from 'lucide-react';
import { cn } from '../../../utils/cn';
import type { PokeballType } from '../../../store';

interface PokemonCatchProbabilityProps {
  catchRate: number;
  effectivePokeball: PokeballType;
}

export function PokemonCatchProbability({ catchRate, effectivePokeball }: PokemonCatchProbabilityProps) {
  const [hpPercent, setHpPercent] = useState<number>(100);
  const [status, setStatus] = useState<'none' | 'sleep_freeze' | 'paralyze_burn_poison'>('none');

  return (
    <div className="glass-card bg-emerald-500/5 border-emerald-500/10 rounded-[2.5rem] p-8 space-y-8 relative overflow-hidden">
      <div className="absolute top-0 right-0 p-4 opacity-5">
        <Target size={120} />
      </div>
      <div className="flex items-center justify-between">
        <h3 className="text-[10px] font-black text-emerald-400 uppercase tracking-[0.3em] flex items-center gap-2">
          <Target size={14} /> Catch Probability
        </h3>
        <div className="px-3 py-1 bg-emerald-500/20 rounded-full text-[10px] font-mono font-black text-emerald-400 border border-emerald-500/30">
          RATING: {catchRate}
        </div>
      </div>

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
  );
}
