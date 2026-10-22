import type React from 'react';
import { useGen3DashboardData } from '../../../contexts/Gen3DashboardDataContext';
import { TacticalCard } from '../../TacticalCard';
import { TacticalChecklistItem } from '../../TacticalChecklistItem';
import { TacticalHeaderDivider } from '../../TacticalHeaderDivider';

export const MissedMilestonesWidget: React.FC = () => {
  const { missedMasterBall, missedLegendaries } = useGen3DashboardData();

  if (!missedMasterBall && missedLegendaries.length === 0) {
    return null;
  }

  return (
    <TacticalCard>
      <TacticalHeaderDivider className="mb-4 border-zinc-700">
        <h2 className="font-bold font-mono text-sm text-zinc-400 tracking-widest">MISSED MILESTONES</h2>
      </TacticalHeaderDivider>
      <div className="flex flex-col gap-2">
        {missedMasterBall && (
          <TacticalChecklistItem label="Master Ball" acquired={false} strikethroughWhenAcquired={false} />
        )}
        {missedLegendaries.map((legendary) => (
          <TacticalChecklistItem key={legendary} label={legendary} acquired={false} strikethroughWhenAcquired={false} />
        ))}
      </div>
    </TacticalCard>
  );
};
