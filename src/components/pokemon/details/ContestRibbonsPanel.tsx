import { ShieldCheck } from 'lucide-react';
import type { Gen3Ribbons } from '../../../engine/saveParser/parsers/common';
import { objectEntries } from '../../../utils/object';
import { type ContestConditionType, ContestRibbonBadge, type ContestRibbonRank } from './ContestRibbonBadge';

interface ContestRibbonsPanelProps {
  ribbons: Gen3Ribbons;
}

const rankMap: Record<number, ContestRibbonRank> = {
  1: 'Normal',
  2: 'Super',
  3: 'Hyper',
  4: 'Master',
};

const conditionMap: Record<keyof Gen3Ribbons, ContestConditionType> = {
  cool: 'Cool',
  beauty: 'Beauty',
  cute: 'Cute',
  smart: 'Smart',
  tough: 'Tough',
};

export function ContestRibbonsPanel({ ribbons }: ContestRibbonsPanelProps) {
  const hasRibbons = Object.values(ribbons).some((rank) => rank > 0);

  if (!hasRibbons) {
    return null;
  }

  return (
    <div className="relative z-10 flex flex-col gap-3 pt-2">
      <div className="flex items-center justify-between border-zinc-800 border-b border-dashed pb-2">
        <span className="flex items-center gap-2 font-black text-[10px] text-zinc-500 uppercase tracking-widest">
          <ShieldCheck size={12} className="text-zinc-400" /> [ ACQUIRED_RIBBONS ]
        </span>
      </div>
      <div className="grid grid-cols-1 gap-3 sm:grid-cols-2 xl:grid-cols-3">
        {objectEntries(ribbons).map(([key, rank]) => {
          if (rank === 0 || !rankMap[rank]) return null;

          return <ContestRibbonBadge key={key} type={conditionMap[key]} rank={rankMap[rank]} />;
        })}
      </div>
    </div>
  );
}
