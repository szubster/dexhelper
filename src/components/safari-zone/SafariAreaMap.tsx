import type React from 'react';
import type { SafariArea } from '../../engine/data/shared/safariZoneTypes';
import { TacticalPanel } from '../TacticalPanel';

interface SafariAreaMapProps {
  allAreas: SafariArea[];
  availableAreas: SafariArea[];
}

export const SafariAreaMap: React.FC<SafariAreaMapProps> = ({ allAreas, availableAreas }) => {
  const availableAreaNames = new Set(availableAreas.map((a) => a.name));

  return (
    <div className="grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-3" data-testid="safari-area-map">
      {allAreas.map((area) => {
        const isAvailable = availableAreaNames.has(area.name);
        return (
          <TacticalPanel
            key={area.name}
            variant={isAvailable ? 'emerald' : 'default'}
            className="flex flex-col gap-2 p-4"
            data-testid={`safari-area-${area.name}`}
            data-available={isAvailable}
          >
            <h3 className="break-all font-bold font-mono text-sm text-white uppercase tracking-tight">
              {area.name.replace(/-/g, ' ')}
            </h3>
            <div className="font-mono text-xs text-zinc-400">{isAvailable ? 'TARGET DETECTED' : 'NO SIGNAL'}</div>
          </TacticalPanel>
        );
      })}
    </div>
  );
};
