import type React from 'react';
import { TacticalBlockHeader } from '../../../components/TacticalBlockHeader';
import { TacticalPanel } from '../../../components/TacticalPanel';
import { EggMoveSelector } from './EggMoveSelector';
import { TargetPokemonSelector } from './TargetPokemonSelector';

export const PathfinderSelectionPanel: React.FC = () => {
  return (
    <div className="flex flex-col gap-6">
      <TacticalPanel
        className="relative mt-4 flex flex-col gap-4 border-cyan-500/50 border-t-2 p-4 pt-6"
        variant="cyan"
      >
        <TacticalBlockHeader title="SMART EGG PATHFINDER" trackingLabel="SYS.BREEDING_PATH" />
        <div className="grid grid-cols-1 gap-4 lg:grid-cols-2">
          <TargetPokemonSelector />
          <EggMoveSelector />
        </div>
      </TacticalPanel>
    </div>
  );
};
