import { cn } from '../utils/cn';
import { CornerCrosshairs } from './CornerCrosshairs';
import { LcdGrid } from './LcdGrid';
import { ScanlineOverlay } from './ScanlineOverlay';
import { TacticalLed } from './TacticalLed';

export type FilterBadgeVariant = 'cyan' | 'emerald' | 'amber' | 'red' | 'purple' | 'blue';

export interface FilterBadgeProps {
  isActive: boolean;
  label: string;
  variant?: FilterBadgeVariant;
  codeTag?: string;
  count?: number;
  className?: string;
}

export function FilterBadge({ isActive, label, variant = 'cyan', codeTag, count, className }: FilterBadgeProps) {
  const variantStyles = {
    cyan: {
      active: 'border-cyan-500/80 bg-cyan-950/40 text-cyan-300 shadow-[inset_0_0_12px_rgba(6,182,212,0.2)]',
      activeBar: 'bg-cyan-400 shadow-[0_0_8px_rgba(34,211,238,0.8)]',
      activeCount: 'border-cyan-500/60 bg-cyan-900/50 text-cyan-200',
      ledVariant: 'primary' as const,
    },
    emerald: {
      active: 'border-emerald-500/80 bg-emerald-950/40 text-emerald-300 shadow-[inset_0_0_12px_rgba(16,185,129,0.2)]',
      activeBar: 'bg-emerald-400 shadow-[0_0_8px_rgba(52,211,153,0.8)]',
      activeCount: 'border-emerald-500/60 bg-emerald-900/50 text-emerald-200',
      ledVariant: 'emerald' as const,
    },
    amber: {
      active: 'border-amber-500/80 bg-amber-950/40 text-amber-300 shadow-[inset_0_0_12px_rgba(245,158,11,0.2)]',
      activeBar: 'bg-amber-400 shadow-[0_0_8px_rgba(251,191,36,0.8)]',
      activeCount: 'border-amber-500/60 bg-amber-900/50 text-amber-200',
      ledVariant: 'amber' as const,
    },
    red: {
      active: 'border-red-500/80 bg-red-950/40 text-red-300 shadow-[inset_0_0_12px_rgba(239,68,68,0.2)]',
      activeBar: 'bg-red-400 shadow-[0_0_8px_rgba(248,113,113,0.8)]',
      activeCount: 'border-red-500/60 bg-red-900/50 text-red-200',
      ledVariant: 'red' as const,
    },
    purple: {
      active: 'border-purple-500/80 bg-purple-950/40 text-purple-300 shadow-[inset_0_0_12px_rgba(168,85,247,0.2)]',
      activeBar: 'bg-purple-400 shadow-[0_0_8px_rgba(192,132,252,0.8)]',
      activeCount: 'border-purple-500/60 bg-purple-900/50 text-purple-200',
      ledVariant: 'purple' as const,
    },
    blue: {
      active: 'border-blue-500/80 bg-blue-950/40 text-blue-300 shadow-[inset_0_0_12px_rgba(59,130,246,0.2)]',
      activeBar: 'bg-blue-400 shadow-[0_0_8px_rgba(96,165,250,0.8)]',
      activeCount: 'border-blue-500/60 bg-blue-900/50 text-blue-200',
      ledVariant: 'blue' as const,
    },
  };

  const currentVariant = variantStyles[variant] || variantStyles.cyan;
  const resolvedCodeTag = codeTag ?? '[SYS.FLT]';

  return (
    <div
      className={cn(
        'tactical-panel group relative inline-flex h-10 items-center justify-between overflow-hidden border border-dashed px-2.5 py-1 transition-all duration-200',
        isActive
          ? currentVariant.active
          : 'border-zinc-800 bg-zinc-950/80 text-zinc-500 hover:border-zinc-700 hover:text-zinc-300',
        className,
      )}
    >
      <LcdGrid className="opacity-[0.03]" />
      <ScanlineOverlay className="opacity-0 transition-opacity group-hover:opacity-100" />
      <CornerCrosshairs className="h-1.5 w-1.5 opacity-40 group-hover:opacity-100" />

      {/* Left accent bar */}
      <div
        className={cn(
          'absolute top-0 bottom-0 left-0 w-0.5 transition-colors duration-200',
          isActive ? currentVariant.activeBar : 'bg-zinc-800',
        )}
      />

      {/* Content layout */}
      <div className="relative z-10 flex items-center gap-2 pl-1">
        {/* LED dot when active */}
        {isActive ? (
          <TacticalLed
            variant={currentVariant.ledVariant}
            pipe={false}
            position="top-1/2"
            className="relative left-0 shrink-0"
          />
        ) : (
          <div className="h-1.5 w-1.5 shrink-0 rounded-none bg-zinc-800" />
        )}

        <div className="flex items-center gap-1.5">
          <span className="font-mono text-[8px] uppercase tracking-wider opacity-60">{resolvedCodeTag}</span>
          <span className="inline-flex items-center whitespace-nowrap font-mono font-semibold text-[10px] tracking-wider">
            <span aria-hidden="true" className="opacity-50">
              [&nbsp;
            </span>
            {label}
            <span aria-hidden="true" className="opacity-50">
              &nbsp;]
            </span>
          </span>
        </div>

        {typeof count === 'number' && (
          <span
            className={cn(
              'ml-1 border border-dashed px-1 font-bold font-mono text-[9px] tracking-tight',
              isActive ? currentVariant.activeCount : 'border-zinc-800 bg-zinc-900 text-zinc-600',
            )}
          >
            {count}
          </span>
        )}
      </div>
    </div>
  );
}
