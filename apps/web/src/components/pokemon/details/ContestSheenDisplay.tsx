import React from 'react';
import { cn } from '../../../utils/cn';
import { TacticalPanel } from '../../TacticalPanel';

interface ContestSheenDisplayProps {
  sheen: number;
  className?: string;
}

// ⚡ Bolt: Wrapped in React.memo and replaced Array.from().map() with a manual loop to prevent unnecessary re-renders and eliminate intermediate array allocations. Lifted invariant calculations out of the loop.
export const ContestSheenDisplay: React.FC<ContestSheenDisplayProps> = React.memo(({ sheen, className }) => {
  const maxSheen = 255;
  const isMaxed = sheen >= maxSheen;
  const segments = 15;

  const segmentElements = [];
  const ratio = sheen / maxSheen;
  const colorClass = isMaxed
    ? 'bg-emerald-500 shadow-[0_0_5px_rgba(16,185,129,0.8)]'
    : 'bg-blue-500 shadow-[0_0_5px_rgba(59,130,246,0.8)]';
  const emptyColorClass = isMaxed ? 'bg-emerald-950/30' : 'bg-blue-950/30';

  for (let i = 0; i < segments; i++) {
    const threshold = (i + 1) / segments;
    const isActive = ratio >= threshold;

    segmentElements.push(
      <div key={`sheen-segment-${i}`} className={cn('h-full flex-1', isActive ? colorClass : emptyColorClass)} />,
    );
  }

  return (
    <TacticalPanel
      variant={isMaxed ? 'emerald' : 'blue'}
      className={cn(
        '!p-4 relative flex flex-col gap-1.5 border-zinc-800 border-l border-dashed pl-3 transition-colors hover:border-zinc-500',
        className,
      )}
    >
      <div className="tactical-text flex justify-between text-[9px] text-zinc-400">
        <span className="font-black uppercase tracking-widest">[ SHEEN ]</span>
        <span className={cn('font-mono', isMaxed ? 'text-emerald-400' : 'text-zinc-500')}>
          {sheen} {isMaxed && '(MAX)'}
        </span>
      </div>
      {/* oxlint-disable jsx-a11y/prefer-tag-over-role */}
      <div
        className="flex h-2 w-full gap-px bg-black p-px"
        role="progressbar"
        aria-valuenow={sheen}
        aria-valuemax={maxSheen}
      >
        {segmentElements}
      </div>
    </TacticalPanel>
  );
});

ContestSheenDisplay.displayName = 'ContestSheenDisplay';
