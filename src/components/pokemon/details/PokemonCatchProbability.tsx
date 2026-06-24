import { Target } from 'lucide-react';
import { useMemo, useState } from 'react';
import type { PokeballType } from '../../../store';
import { cn } from '../../../utils/cn';
import { DataPoint } from '../../DataPoint';
import { PanelWatermark } from '../../PanelWatermark';
import { SectionHeader } from '../../SectionHeader';
import { TacticalBadge } from '../../TacticalBadge';
import { TacticalPanel } from '../../TacticalPanel';
import { TacticalSegmentedControl } from '../../TacticalSegmentedControl';

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

          <div className="flex w-full items-center gap-1">
            {Array.from({ length: 10 }).map((_, i) => {
              const segmentValue = (i + 1) * 10;
              const isActive = hpPercent >= segmentValue;
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
                    'focus-visible:tactical-focus h-3 flex-1 rounded-none border border-white/5 border-dashed transition-all',
                    isActive
                      ? 'bg-emerald-500 shadow-[0_0_10px_rgba(16,185,129,0.3)]'
                      : 'bg-black/40 hover:bg-emerald-500/20',
                  )}
                />
              );
            })}
          </div>
        </div>

        <TacticalSegmentedControl<StatusType>
          ariaLabel="Target Status"
          containerClassName="grid grid-cols-3 gap-2 [&>div]:grid [&>div]:grid-cols-3 [&>div]:gap-2 [&>div]:border-none [&>button]:border"
          buttonBaseClassName="!border-dashed !border focus-visible:ring-emerald-500 py-3 text-[9px] active:scale-95"
          defaultActiveClassName="border-emerald-400 bg-emerald-500 text-zinc-950 shadow-[0_5px_15px_rgba(16,185,129,0.3)]"
          defaultInactiveClassName="border-white/10 bg-black/40 text-emerald-500/50 hover:border-emerald-500/40 hover:bg-emerald-500/10"
          selectedValue={status}
          onValueChange={(val) => setStatus(val)}
          items={STATUS_OPTIONS.map((item) => ({
            id: item.id,
            label: item.label,
          }))}
        />
      </div>

      <div className="flex flex-col gap-2 border-emerald-500/10 border-t pt-8">
        <div className="flex items-end justify-between">
          <DataPoint
            label="Estimated Success"
            labelClassName="mb-1 text-[10px] text-emerald-500/40"
            valueClassName={cn('font-black font-display text-5xl normal-case tracking-tighter', valueClassName)}
            value={`${finalChance}%`}
          />
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
