import { Award } from 'lucide-react';
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
    <div className="relative z-10 space-y-2 border-white/5 border-t pt-4">
      <span className="flex items-center gap-1 font-black text-[8px] text-zinc-500 uppercase tracking-widest">
        <Award size={8} /> Contest Ribbons
      </span>
      <div className="flex flex-wrap gap-2">
        {objectEntries(ribbons).map(([key, rank]) => {
          if (rank === 0 || !rankMap[rank]) return null;

          return <ContestRibbonBadge key={key} type={conditionMap[key]} rank={rankMap[rank]} />;
        })}
      </div>
    </div>
  );
}
