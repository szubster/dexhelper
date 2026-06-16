import { Award } from 'lucide-react';
import React from 'react';
import { cn } from '../../../utils/cn';

export type ContestConditionType = 'Cool' | 'Beauty' | 'Cute' | 'Smart' | 'Tough';
export type ContestRibbonRank = 'Normal' | 'Super' | 'Hyper' | 'Master';

export interface ContestRibbonBadgeProps extends React.HTMLAttributes<HTMLDivElement> {
  type: ContestConditionType;
  rank: ContestRibbonRank;
}

const typeColorMap: Record<ContestConditionType, string> = {
  Cool: 'text-red-500 border-red-500/50 bg-red-500/10',
  Beauty: 'text-blue-500 border-blue-500/50 bg-blue-500/10',
  Cute: 'text-pink-500 border-pink-500/50 bg-pink-500/10',
  Smart: 'text-emerald-500 border-emerald-500/50 bg-emerald-500/10',
  Tough: 'text-amber-500 border-amber-500/50 bg-amber-500/10',
};

const rankColorMap: Record<ContestRibbonRank, string> = {
  Normal: 'text-zinc-400',
  Super: 'text-zinc-200',
  Hyper: 'text-yellow-400',
  Master: 'text-purple-400',
};

const getTooltipText = (type: ContestConditionType, rank: ContestRibbonRank) => {
  return `${type} Contest - ${rank} Rank Ribbon`;
};

export const ContestRibbonBadge = React.forwardRef<HTMLDivElement, ContestRibbonBadgeProps>(
  ({ type, rank, className, ...props }, ref) => {
    return (
      <div
        ref={ref}
        title={getTooltipText(type, rank)}
        className={cn(
          'inline-flex items-center gap-1.5 rounded-none border border-dashed px-2 py-1 font-mono text-xs uppercase tracking-widest',
          typeColorMap[type],
          className,
        )}
        {...props}
      >
        <Award className={cn('h-3.5 w-3.5', rankColorMap[rank])} aria-hidden="true" />
        <span className="font-bold">{type}</span>
        <span className="text-[10px] opacity-80">{rank}</span>
      </div>
    );
  },
);

ContestRibbonBadge.displayName = 'ContestRibbonBadge';
