import type React from 'react';
import { cn } from '../../../utils/cn';
import { TacticalPanel } from '../../TacticalPanel';

interface ContestSheenDisplayProps {
  sheen: number;
  className?: string;
}

export const ContestSheenDisplay: React.FC<ContestSheenDisplayProps> = ({ sheen, className }) => {
  const maxSheen = 255;
  const percentage = Math.min(Math.max((sheen / maxSheen) * 100, 0), 100);
  const isMaxed = sheen >= maxSheen;

  return (
    <TacticalPanel
      variant={isMaxed ? 'emerald' : 'blue'}
      className={cn('flex flex-col gap-2 p-4 font-mono', className)}
    >
      <div className="flex items-center justify-between font-semibold text-xs uppercase tracking-wider">
        <span className="text-zinc-400">Sheen</span>
        <span className={cn(isMaxed ? 'text-emerald-400' : 'text-zinc-300')}>
          {sheen} / {maxSheen} {isMaxed && '(MAX)'}
        </span>
      </div>
      <div className="h-2 w-full bg-zinc-800/50 outline outline-1 outline-zinc-700">
        <div
          className={cn('h-full transition-all duration-500', isMaxed ? 'bg-emerald-500' : 'bg-blue-500')}
          style={{ width: `${percentage}%` }}
        />
      </div>
    </TacticalPanel>
  );
};
