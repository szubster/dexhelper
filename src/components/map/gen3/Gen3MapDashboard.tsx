import type React from 'react';
import { useGen3Map } from '../../../contexts/Gen3MapContext';
import { Gen3MapControlPanel } from '../../../features/gen3-map';

export const Gen3MapDashboard: React.FC = () => {
  const { state } = useGen3Map();

  return (
    <div className="grid w-full gap-4 rounded-none border border-dashed border-neutral-700 p-4 font-mono">
      <h2 className="border-b border-dashed border-neutral-700 pb-2 text-xl font-bold tracking-widest uppercase">
        Gen 3 Map Dashboard
      </h2>
      <div className="flex gap-4">
        <Gen3MapControlPanel />
        <div className="flex flex-grow flex-col gap-2 text-sm">
          <div className="flex justify-between">
            <span className="text-neutral-400">Zoom Level:</span>
            <span>{state.zoomLevel}</span>
          </div>
          <div className="flex justify-between">
            <span className="text-neutral-400">Selected Location ID:</span>
            <span>{state.selectedLocationId !== null ? state.selectedLocationId : 'None'}</span>
          </div>
        </div>
      </div>
    </div>
  );
};
