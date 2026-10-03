import type React from 'react';
import type { GameVersion } from './useSafariZoneSelection';

interface SafariTargetSelectionProps {
  version: GameVersion;
  setVersion: (v: GameVersion) => void;
  targetPokemon: number | null;
  setTargetPokemon: (id: number | null) => void;
}

export const SafariTargetSelection: React.FC<SafariTargetSelectionProps> = () => {
  return (
    <div data-testid="safari-target-selection-stub">
      <span className="text-sm text-zinc-500">TARGET SELECTION UI PENDING</span>
    </div>
  );
};
