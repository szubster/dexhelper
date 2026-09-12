import type React from 'react';
import type { SaveData } from '../../../engine/saveParser/parsers/common';
import { TacticalCard } from '../../TacticalCard';
import { TacticalChecklistItem } from '../../TacticalChecklistItem';

interface Props {
  saveData: SaveData;
}

export const Gen3TrainerCardDashboard: React.FC<Props> = ({ saveData }) => {
  if (saveData.generation !== 3 || !saveData.gen3TrainerCard) {
    return null;
  }

  const { hasHallOfFame, hasHoennDex, hasNationalDex, hasContestMaster, hasBattleFrontier } = saveData.gen3TrainerCard;

  return (
    <TacticalCard>
      <div className="mb-4 border-zinc-700 border-b border-dashed pb-2">
        <h2 className="font-bold font-mono text-sm text-zinc-400 tracking-widest">TRAINER CARD UPGRADES</h2>
      </div>
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
