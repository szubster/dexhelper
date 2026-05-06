import { Target } from 'lucide-react';
import { useState } from 'react';
import type { PokeballType } from '../../../store';
import { cn } from '../../../utils/cn';
import { GlassCard } from '../../GlassCard';

interface PokemonCatchProbabilityProps {
  catchRate: number;
  effectivePokeball: PokeballType;
}

const STATUS_OPTIONS = [
  { id: 'none', label: 'Healthy' },
  { id: 'paralyze_burn_poison', label: 'Debuff' },
  { id: 'sleep_freeze', label: 'Incapacitated' },
] as const;

type StatusType = (typeof STATUS_OPTIONS)[number]['id'];

export function PokemonCatchProbability({ catchRate, effectivePokeball }: PokemonCatchProbabilityProps) {
  const [hpPercent, setHpPercent] = useState<number>(100);
  const [status, setStatus] = useState<StatusType>('none');

  return (
    <GlassCard variant="emerald" className="space-y-8 rounded-[2.5rem] p-8">
      <div className="absolute top-0 right-0 p-4 opacity-5">
        <Target size={120} />
      </div>
      <div className="flex items-center justify-between">
        <h3 className="flex items-center gap-2 font-black text-[10px] text-emerald-400 uppercase tracking-[0.3em]">
          <Target size={14} /> Catch Probability
        </h3>
        <div className="rounded-full border border-emerald-500/30 bg-emerald-500/20 px-3 py-1 font-black font-mono text-[10px] text-emerald-400">
          RATING: {catchRate}
        </div>
      </div>

      <div className="space-y-6">
        <div className="space-y-3">
          <div className="flex justify-between font-black text-[10px] text-emerald-500/60 uppercase tracking-widest">
            <span>Target Integrity</span>
            <span className="font-mono text-emerald-400">{hpPercent}% HP</span>
          </div>
          <input
            type="range"
            min="1"
            max="100"
            value={hpPercent}
            aria-label="Target HP Percentage"
            onChange={(e) => setHpPercent(Number(e.target.value))}
            className="h-2 w-full cursor-pointer appearance-none rounded-full border border-white/5 bg-black/40 accent-emerald-500 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-emerald-500 focus-visible:ring-offset-2 focus-visible:ring-offset-zinc-950"
          />
        </div>

        <div className="grid grid-cols-3 gap-2" role="radiogroup" aria-label="Target Status">
          {STATUS_OPTIONS.map((item) => (
            // biome-ignore lint/a11y/useSemanticElements: custom segmented control using radio role
            <button
              type="button"
              key={item.id}
              role="radio"
              aria-checked={status === item.id}
              onClick={() => setStatus(item.id)}
              className={cn(
                'rounded-2xl border py-3 font-black text-[9px] uppercase tracking-widest outline-none transition-all focus-visible:ring-2 focus-visible:ring-emerald-500 focus-visible:ring-offset-2 focus-visible:ring-offset-zinc-950 active:scale-95',
                status === item.id
                  ? 'border-emerald-400 bg-emerald-500 text-white shadow-[0_5px_15px_rgba(16,185,129,0.3)]'
                  : 'border-white/5 bg-black/20 text-emerald-500/50 hover:border-emerald-500/20',
              )}
            >
              {item.label}
            </button>
          ))}
        </div>
      </div>

      <div className="flex flex-col gap-2 border-emerald-500/10 border-t pt-8">
        <div className="flex items-end justify-between">
          <div className="flex flex-col">
            <span className="mb-1 font-black text-[10px] text-emerald-500/40 uppercase tracking-widest">
              Estimated Success
            </span>
            <span className="font-black font-display text-5xl text-emerald-400 tracking-tighter">
              {(() => {
                let ballMult = 1;
                if (effectivePokeball === 'great') ballMult = 1.5;
                if (effectivePokeball === 'ultra' || effectivePokeball === 'safari') ballMult = 2;
                let statusBonus = 0;
                if (status === 'sleep_freeze') statusBonus = 10;
                if (status === 'paralyze_burn_poison') statusBonus = 5;
                const hpFactor = 1 + ((100 - hpPercent) / 100) * 2;
                const baseChance = (catchRate * ballMult * hpFactor) / 255;
                return Math.min(100, baseChance * 100 + statusBonus).toFixed(1);
              })()}%
            </span>
          </div>
          <div className="flex flex-col items-end text-right">
            <div className="mb-2 flex h-10 w-10 items-center justify-center rounded-full border border-white/10 bg-black/40">
              <div
                className={cn(
                  'h-6 w-6 rounded-full border-2',
                  effectivePokeball === 'safari'
                    ? 'border-emerald-500 bg-emerald-500/20 shadow-[0_0_10px_rgba(16,185,129,0.5)]'
                    : effectivePokeball === 'ultra'
                      ? 'border-yellow-500 bg-yellow-500/20 shadow-[0_0_10px_rgba(234,179,8,0.5)]'
                      : effectivePokeball === 'great'
                        ? 'border-blue-500 bg-blue-500/20 shadow-[0_0_10px_rgba(59,130,246,0.5)]'
                        : 'border-red-500 bg-red-500/20 shadow-[0_0_10px_rgba(239,68,68,0.5)]',
                )}
              />
            </div>
            <span className="font-black text-[10px] text-zinc-500 uppercase tracking-widest">
              {effectivePokeball.toUpperCase()} BALL
            </span>
          </div>
        </div>
      </div>
    </GlassCard>
  );
}
