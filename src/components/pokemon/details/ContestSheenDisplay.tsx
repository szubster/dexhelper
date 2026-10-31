import React from 'react';
import { cn } from '../../../utils/cn';
import { TacticalPanel } from '../../TacticalPanel';
import { TacticalProgressBar } from '../../TacticalProgressBar';

interface ContestSheenDisplayProps {
  sheen: number;
  className?: string;
}

export const ContestSheenDisplay: React.FC<ContestSheenDisplayProps> = React.memo(({ sheen, className }) => {
  const maxSheen = 255;
  const isMaxed = sheen >= maxSheen;

  return (
    <TacticalPanel
      variant={isMaxed ? 'emerald' : 'blue'}
      className={cn(
        'relative flex flex-col gap-1.5 border-l border-dashed border-zinc-800 !p-4 pl-3 transition-colors hover:border-zinc-500',
        className,
      )}
    >
      <TacticalProgressBar
        label="SHEEN"
        value={sheen}
        max={maxSheen}
        valueDisplay={
          <span className={cn('font-mono', isMaxed ? 'text-emerald-400' : 'text-zinc-500')}>
            {sheen} {isMaxed && '(MAX)'}
          </span>
        }
        colorClass={
          isMaxed
            ? 'bg-emerald-500 shadow-[0_0_5px_rgba(16,185,129,0.8)]'
            : 'bg-blue-500 shadow-[0_0_5px_rgba(59,130,246,0.8)]'
        }
        emptyColorClass={isMaxed ? 'bg-emerald-950/30' : 'bg-blue-950/30'}
        className="border-none !pl-0"
      />
    </TacticalPanel>
  );
});

ContestSheenDisplay.displayName = 'ContestSheenDisplay';
