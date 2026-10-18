import type React from 'react';
import { useGen3MapStore } from '../store';

export const Gen3MapControlPanel: React.FC = () => {
  const { layers, selectedFeatureId, toggleLayer, setSelectedFeatureId } = useGen3MapStore();

  return (
    <div className="tactical-panel flex w-full max-w-sm flex-col gap-4 rounded-none border-2 border-dashed p-4 font-mono">
      <h2 className="tactical-text border-b-2 border-dashed pb-2 text-xl">Gen 3 Map Controls</h2>

      <div className="flex flex-col gap-2">
        <h3 className="tactical-text text-lg">Layers</h3>

        <label className="flex cursor-pointer items-center gap-2">
          <input
            type="checkbox"
            className="h-4 w-4 rounded-none border-dashed bg-transparent"
            checked={layers.routes}
            onChange={() => toggleLayer('routes')}
            data-testid="layer-routes"
          />
          <span className="tactical-text">Routes</span>
        </label>

        <label className="flex cursor-pointer items-center gap-2">
          <input
            type="checkbox"
            className="h-4 w-4 rounded-none border-dashed bg-transparent"
            checked={layers.cities}
            onChange={() => toggleLayer('cities')}
            data-testid="layer-cities"
          />
          <span className="tactical-text">Cities</span>
        </label>

        <label className="flex cursor-pointer items-center gap-2">
          <input
            type="checkbox"
            className="h-4 w-4 rounded-none border-dashed bg-transparent"
            checked={layers.pois}
            onChange={() => toggleLayer('pois')}
            data-testid="layer-pois"
          />
          <span className="tactical-text">POIs</span>
        </label>
      </div>

      <div className="mt-2 flex flex-col gap-2 border-t-2 border-dashed pt-4">
        <h3 className="tactical-text text-lg">Selected Feature</h3>
        <p className="tactical-text" data-testid="selected-feature">
          {selectedFeatureId || 'None'}
        </p>

        <div className="flex gap-2">
          <button
            type="button"
            className="tactical-button rounded-none border-2 border-dashed px-4 py-2 hover:bg-white/10"
            onClick={() => setSelectedFeatureId('Route 101')}
          >
            Select Route 101
          </button>
          <button
            type="button"
            className="tactical-button rounded-none border-2 border-dashed px-4 py-2 hover:bg-white/10"
            onClick={() => setSelectedFeatureId(null)}
          >
            Clear
          </button>
        </div>
      </div>
    </div>
  );
};
