import { cn } from '../utils/cn';
import { CornerCrosshairs } from './CornerCrosshairs';
import { LcdGrid } from './LcdGrid';
import { ScanlineOverlay } from './ScanlineOverlay';
import { TacticalButton } from './TacticalButton';
import { TacticalLed } from './TacticalLed';

export interface ClearFiltersBadgeProps {
  isActive: boolean;
  onClick: () => void;
  className?: string;
}

export function ClearFiltersBadge({ isActive, onClick, className }: ClearFiltersBadgeProps) {
  return (
    <TacticalButton
      onClick={onClick}
      aria-pressed={isActive}
      aria-label="Clear filters"
      variant="sidebar"
      hasCrosshairs={true}
      className={cn(
        'group relative flex h-14 min-w-20 flex-col items-center justify-center overflow-hidden border-r-0 px-3 transition-all xl:min-w-25',
        isActive
          ? '!border-[var(--theme-primary)] bg-[var(--theme-primary)]/20 text-[var(--theme-primary)] shadow-[inset_0_0_15px_rgba(var(--theme-primary-rgb),0.2)]'
          : 'bg-zinc-900/90 text-zinc-500 hover:text-zinc-300',
        className,
      )}
    >
      <LcdGrid className="opacity-[0.03]" />
      <ScanlineOverlay className="opacity-0 transition-opacity group-hover:opacity-100" />
      <CornerCrosshairs className="h-1.5 w-1.5 opacity-40 group-hover:opacity-100" />

      {/* Left accent indicator bar */}
      <div
        className={cn(
          'absolute top-0 bottom-0 left-0 w-0.5 transition-colors duration-200',
          isActive ? 'bg-[var(--theme-primary)] shadow-[0_0_8px_var(--theme-primary)]' : 'bg-zinc-800',
        )}
      />

      {/* LED Dot */}
      {isActive ? (
        <TacticalLed variant="primary" pipe={false} position="top-1/2" className="relative left-0 mb-1" />
      ) : (
        <div className="mb-1 h-1.5 w-1.5 rounded-none bg-zinc-800" />
      )}

      <div className="flex flex-col items-center gap-0.5">
        <span className="font-mono text-[8px] uppercase tracking-wider opacity-60">[SYS.ALL]</span>
        <span className="font-bold font-mono text-[10px] tracking-wider">
          <span aria-hidden="true" className="opacity-50">
            [&nbsp;
          </span>
          ALL
          <span aria-hidden="true" className="opacity-50">
            &nbsp;]
          </span>
        </span>
      </div>
    </TacticalButton>
  );
}
