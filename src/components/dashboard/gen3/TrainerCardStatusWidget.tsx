import type React from 'react';
import { useGen3DashboardData } from '../../../contexts/Gen3DashboardDataContext';
import { TacticalCard } from '../../TacticalCard';
import { TacticalChecklistItem } from '../../TacticalChecklistItem';
import { TacticalHeaderDivider } from '../../TacticalHeaderDivider';

export const TrainerCardStatusWidget: React.FC = () => {
  const { trainerCard } = useGen3DashboardData();

  if (!trainerCard) {
    return null;
  }

  const { hasHallOfFame, hasHoennDex, hasNationalDex, hasContestMaster, hasBattleFrontier } = trainerCard;

  return (
    <TacticalCard>
      <TacticalHeaderDivider className="mb-4 border-zinc-700">
        <h2 className="font-mono text-sm font-bold tracking-widest text-zinc-400">TRAINER CARD UPGRADES</h2>
      </TacticalHeaderDivider>
      <div className="flex flex-col gap-2">
        <TacticalChecklistItem label="Hall of Fame Debut" acquired={hasHallOfFame} strikethroughWhenAcquired={false} />
        <TacticalChecklistItem
          label="Hoenn Pokédex Complete"
          acquired={hasHoennDex}
          strikethroughWhenAcquired={false}
        />
        <TacticalChecklistItem
          label="National Pokédex Complete"
          acquired={hasNationalDex}
          strikethroughWhenAcquired={false}
        />
        <TacticalChecklistItem
          label="Master Rank Contest Won"
          acquired={hasContestMaster}
          strikethroughWhenAcquired={false}
        />
        <TacticalChecklistItem
          label="Battle Frontier Gold Symbols"
          acquired={hasBattleFrontier}
          strikethroughWhenAcquired={false}
        />
      </div>
    </TacticalCard>
  );
};
