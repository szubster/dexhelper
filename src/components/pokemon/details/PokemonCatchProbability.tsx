import { Target } from 'lucide-react';
import { useEffect, useMemo, useState } from 'react';
import type { PokeballType } from '../../../store';
import { cn } from '../../../utils/cn';
import { PanelWatermark } from '../../PanelWatermark';
import { SectionHeader } from '../../SectionHeader';
import { TacticalBadge } from '../../TacticalBadge';
import { TacticalPanel } from '../../TacticalPanel';

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
  const [isCalculating, setIsCalculating] = useState(false);

  const { finalChance, valueClassName } = useMemo(() => {
    let ballMult = 1;
    if (effectivePokeball === 'great') ballMult = 1.5;
    if (effectivePokeball === 'ultra' || effectivePokeball === 'safari') ballMult = 2;

    let statusBonus = 0;
    if (status === 'sleep_freeze') statusBonus = 10;
    if (status === 'paralyze_burn_poison') statusBonus = 5;

    const hpFactor = 1 + ((100 - hpPercent) / 100) * 2;
    const baseChance = (catchRate * ballMult * hpFactor) / 255;
    const chance = Math.min(100, baseChance * 100 + statusBonus);

    let colorClass = 'text-red-400 drop-shadow-[0_0_10px_rgba(248,113,113,0.5)]';
    if (chance >= 70) colorClass = 'text-emerald-400 drop-shadow-[0_0_10px_rgba(52,211,153,0.5)]';
    else if (chance >= 40) colorClass = 'text-amber-400 drop-shadow-[0_0_10px_rgba(251,191,36,0.5)]';

    return { finalChance: chance.toFixed(1), valueClassName: colorClass };
  }, [catchRate, effectivePokeball, hpPercent, status]);

  // biome-ignore lint/correctness/useExhaustiveDependencies: we want to trigger recalculate effect when input changes
  useEffect(() => {
    setIsCalculating(true);
    const timeout = setTimeout(() => {
      setIsCalculating(false);
    }, 400);
    return () => clearTimeout(timeout);
  }, [hpPercent, status]);

  return (
    <TacticalPanel variant="emerald" className="space-y-8 rounded-none border border-dashed p-8">
      <PanelWatermark icon={<Target size={120} />} />
      <div className="flex items-center justify-between">
        <SectionHeader colorClass="text-emerald-400" title="Catch Probability" icon={<Target size={14} />} />
        <TacticalBadge
          variant="emerald"
          className="border-emerald-500/30 bg-emerald-500/20 px-3 font-mono text-[10px] text-emerald-400"
        >
          RATING: {catchRate}
        </TacticalBadge>
      </div>

      <div className="space-y-6">
        <div className="space-y-3">
          <div className="flex justify-between font-black text-[10px] text-emerald-500/60 uppercase tracking-widest">
            <span>Target Integrity</span>
            <span className="font-mono text-emerald-400">{hpPercent}% HP</span>
          </div>

          <div className="relative flex w-full items-center gap-1 border border-white/5 border-dashed bg-black/60 p-1">
            {Array.from({ length: 10 }).map((_, i) => {
              const segmentValue = (i + 1) * 10;
              const isActive = hpPercent >= segmentValue;
              let segmentColor = 'bg-emerald-500 shadow-[0_0_10px_rgba(16,185,129,0.3)]';
              if (segmentValue <= 20) {
                segmentColor = 'bg-red-500 shadow-[0_0_10px_rgba(239,68,68,0.3)]';
              } else if (segmentValue <= 50) {
                segmentColor = 'bg-amber-500 shadow-[0_0_10px_rgba(245,158,11,0.3)]';
              }

              return (
                <button
                  // biome-ignore lint/suspicious/noArrayIndexKey: Array index is stable
                  key={`hp-segment-${i}`}
                  type="button"
                  aria-label={`Set HP to ${segmentValue}%`}
                  title={`Set HP to ${segmentValue}%`}
                  aria-pressed={isActive}
                  onClick={() => setHpPercent(segmentValue)}
                  className={cn(
                    'focus-visible:tactical-focus h-4 flex-1 rounded-none border-black border-r transition-all last:border-r-0',
                    isActive ? segmentColor : 'bg-zinc-800/40 hover:bg-white/10',
                  )}
                />
              );
            })}
          </div>
        </div>

        <div className="space-y-3 pt-2">
          <div className="flex font-black text-[10px] text-emerald-500/60 uppercase tracking-widest">
            <span>Target Status</span>
          </div>
          <div className="grid grid-cols-3 gap-2">
            {STATUS_OPTIONS.map((option) => {
              const isActive = status === option.id;
              let ledColor = 'bg-zinc-700 shadow-none';
              if (isActive) {
                if (option.id === 'none') ledColor = 'bg-emerald-400 shadow-[0_0_8px_rgba(52,211,153,0.8)]';
                else if (option.id === 'paralyze_burn_poison')
                  ledColor = 'bg-amber-400 shadow-[0_0_8px_rgba(251,191,36,0.8)]';
                else if (option.id === 'sleep_freeze') ledColor = 'bg-cyan-400 shadow-[0_0_8px_rgba(34,211,238,0.8)]';
              }

              return (
                <button
                  key={option.id}
                  type="button"
                  onClick={() => setStatus(option.id)}
                  className={cn(
                    'group relative flex flex-col items-center justify-center gap-2 border border-dashed p-3 transition-all active:scale-95',
                    isActive
                      ? 'border-white/30 bg-white/5'
                      : 'border-white/10 bg-black/40 hover:border-white/20 hover:bg-white/5',
                  )}
                >
                  <div className="mb-1 flex h-1 w-8 items-center justify-center border border-white/10 bg-black/80">
                    <div className={cn('h-full w-full transition-colors duration-300', ledColor)} />
                  </div>
                  <span
                    className={cn(
                      'font-mono text-[9px] uppercase tracking-widest transition-colors',
                      isActive ? 'text-white' : 'text-zinc-500 group-hover:text-zinc-400',
                    )}
                  >
                    {option.label}
                  </span>
                </button>
              );
            })}
          </div>
        </div>
      </div>

      <div className="flex flex-col gap-2 border-emerald-500/10 border-t pt-8">
        <div className="flex items-end justify-between">
          <div className="relative flex flex-col">
            <span className="mb-1 font-mono text-[10px] text-emerald-500/40 uppercase tracking-widest">
              Estimated Success
            </span>
            <div className="relative overflow-hidden">
              {isCalculating && (
                <div className="pointer-events-none absolute inset-0 z-10 animate-pulse bg-emerald-500/20 mix-blend-screen before:absolute before:inset-0 before:animate-[scan_1s_ease-in-out_infinite] before:bg-[linear-gradient(transparent,rgba(16,185,129,0.5),transparent)]" />
              )}
              <span
                className={cn(
                  'block font-black font-display text-5xl normal-case tracking-tighter transition-opacity duration-150',
                  valueClassName,
                  isCalculating ? 'opacity-30 blur-[2px]' : 'opacity-100 blur-0',
                )}
              >
                {isCalculating ? 'CALC...' : `${finalChance}%`}
              </span>
            </div>
          </div>
          <div className="flex flex-col items-end text-right">
            <div className="mb-2 flex h-10 w-10 items-center justify-center rounded-none border border-white/10 border-dashed bg-black/40">
              <div
                className={cn(
                  'h-6 w-6 rounded-none border-2',
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
    </TacticalPanel>
  );
}
