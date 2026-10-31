import { TacticalButton } from '@dexhelper/ui';
import type React from 'react';
import { TacticalCheckbox } from '../../../components/TacticalCheckbox';
import { useGen3MapStore } from '../store';

export const Gen3MapControlPanel: React.FC = () => {
  const { layers, selectedFeatureId, toggleLayer, setSelectedFeatureId } = useGen3MapStore();

  return (
    <div className="tactical-panel flex w-full max-w-sm flex-col gap-4 rounded-none border-2 border-dashed p-4 font-mono">
      <h2 className="tactical-text border-b-2 border-dashed pb-2 text-xl">Gen 3 Map Controls</h2>

      <div className="flex flex-col gap-2">
        <h3 className="tactical-text text-lg">Layers</h3>

        <TacticalCheckbox
          label="Routes"
          checked={layers.routes}
          onChange={() => toggleLayer('routes')}
          data-testid="layer-routes"
        />

        <TacticalCheckbox
          label="Cities"
          checked={layers.cities}
          onChange={() => toggleLayer('cities')}
          data-testid="layer-cities"
        />

        <TacticalCheckbox
          label="POIs"
          checked={layers.pois}
          onChange={() => toggleLayer('pois')}
          data-testid="layer-pois"
        />
      </div>

      <div className="mt-2 flex flex-col gap-2 border-t-2 border-dashed pt-4">
        <h3 className="tactical-text text-lg">Selected Feature</h3>
        <p className="tactical-text" data-testid="selected-feature">
          {selectedFeatureId || 'None'}
        </p>

        <div className="flex gap-2">
          <TacticalButton onClick={() => setSelectedFeatureId('Route 101')}>Select Route 101</TacticalButton>
          <TacticalButton onClick={() => setSelectedFeatureId(null)}>Clear</TacticalButton>
        </div>
      </div>
    </div>
  );
};
