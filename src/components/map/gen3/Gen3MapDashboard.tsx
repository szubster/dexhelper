import type React from 'react';
import { useGen3Map } from '../../../contexts/Gen3MapContext';

export const Gen3MapDashboard: React.FC = () => {
  const { state } = useGen3Map();

  return (
    <div className="grid w-full gap-4 rounded-none border border-neutral-700 border-dashed p-4 font-mono">
      <h2 className="border-neutral-700 border-b border-dashed pb-2 font-bold text-xl uppercase tracking-widest">
        Gen 3 Map Dashboard
      </h2>
      <div className="flex flex-col gap-2 text-sm">
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
  );
};
